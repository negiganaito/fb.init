/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

function findSplitPoint(text, position) {
  let splitPosition = position;
  while (splitPosition >= 0) {
    if (
      text.charAt(splitPosition) === " " ||
      text.charAt(splitPosition) === "\n"
    )
      break;
    splitPosition -= 1;
  }
  if (text.charAt(position) !== "\n") {
    splitPosition += 1;
  } else {
    splitPosition = position + 1;
  }
  const substring = text.substring(splitPosition);
  const spaceMatch = substring.search(/\s/);
  const truncatedEntityEndIndex = spaceMatch + splitPosition - 1;
  return { truncatedEntityEndIndex, truncatedEntityOffset: splitPosition };
}

function getTruncatedEntityRangesAfterExpandingSeeMore(
  entityRanges,
  text,
  splitPosition
) {
  const newEntityRanges = [];
  const { truncatedEntityEndIndex, truncatedEntityOffset } = findSplitPoint(
    text,
    splitPosition
  );
  let hasTruncatedEntity = false;
  let updatedOffset = truncatedEntityOffset;

  for (const range of entityRanges) {
    const { entity, entity_type, length, offset } = range;
    if (
      offset !== null &&
      length !== null &&
      entity !== null &&
      entity.__typename !== null
    ) {
      newEntityRanges.push({ entity, entity_type, length, offset });
      if (
        !hasTruncatedEntity &&
        offset + length >= truncatedEntityEndIndex &&
        updatedOffset >= offset
      ) {
        updatedOffset = offset;
        hasTruncatedEntity = true;
      }
    }
  }
  if (!hasTruncatedEntity) {
    newEntityRanges.push({
      entity: { __typename: "SeeMoreTruncation" },
      entity_type: "SEE_MORE_ANCHOR",
      length: 0,
      offset: updatedOffset,
    });
  }
  return { newEntityRanges, newTruncatedEntityOffset: updatedOffset };
}

function splitEntityRangesIntoRegularAndHiddenParts(
  entityRanges,
  splitPosition
) {
  const entitiesBeforeTruncatedOffset = [];
  const entitiesFromTruncatedOffset = [];
  if (splitPosition !== null) {
    for (const range of entityRanges) {
      const { entity, entity_type, length, offset } = range;
      if (
        offset !== null &&
        length !== null &&
        entity !== null &&
        entity.__typename !== null
      ) {
        if (offset < splitPosition) {
          entitiesBeforeTruncatedOffset.push({
            entity,
            entity_type,
            length,
            offset,
          });
          if (offset + length > splitPosition) {
            entitiesFromTruncatedOffset.push({
              entity,
              entity_type,
              length: offset + length - splitPosition,
              offset: 0,
            });
          }
        } else {
          entitiesFromTruncatedOffset.push({
            entity,
            entity_type,
            length,
            offset: offset - splitPosition,
          });
        }
      }
    }
  }
  return {
    entitiesBeforeTruncatedOffset,
    entitiesFromTruncatedOffset,
  };
}

function getEntityRangesWithTruncatedEntityAndSplitIntoTwoParts(
  entityRanges,
  text,
  splitPosition
) {
  const truncatedEntityRanges = getTruncatedEntityRangesAfterExpandingSeeMore(
    entityRanges,
    text,
    splitPosition
  );
  const splitEntities = splitEntityRangesIntoRegularAndHiddenParts(
    truncatedEntityRanges.newEntityRanges,
    truncatedEntityRanges.newTruncatedEntityOffset
  );
  return {
    ...splitEntities,
    newTruncatedEntityOffset: truncatedEntityRanges.newTruncatedEntityOffset,
  };
}

function filterParagraphsGetTruncatedLinesEntityRangesAndIndex(
  isExpanded,
  paragraphs,
  splitPositionRef
) {
  let filteredEntitiesBeforeTruncatedPosition = [];
  let filteredEntitiesFromTruncatedPosition = [];
  let hiddenContentOffset = -1;
  let truncatedLineIndex = -1;
  let truncatedParagraphIndex = -1;

  if (!isExpanded) {
    return {
      filteredEntitiesBeforeTruncatedPosition,
      filteredEntitiesFromTruncatedPosition,
      hiddenContentOffset,
      truncatedLineIndex,
      truncatedParagraphIndex,
    };
  }

  let accumulatedLength = 0;
  let splitPosition = null;

  if (splitPositionRef.current !== null) {
    splitPosition = splitPositionRef.current;
  }

  for (
    let paragraphIndex = 0;
    paragraphIndex < paragraphs.length;
    paragraphIndex++
  ) {
    const paragraph = paragraphs[paragraphIndex];
    if (Array.isArray(paragraph) && splitPosition !== null) {
      for (let lineIndex = 0; lineIndex < paragraph.length; lineIndex++) {
        const { ranges, text } = paragraph[lineIndex];
        const lineLength = text.length;
        const remainingLength = splitPosition - accumulatedLength;

        accumulatedLength += lineLength;
        if (
          truncatedParagraphIndex < 0 &&
          remainingLength >= 0 &&
          accumulatedLength >= splitPosition
        ) {
          truncatedParagraphIndex = paragraphIndex;
          truncatedLineIndex = lineIndex;

          const truncatedEntities =
            getEntityRangesWithTruncatedEntityAndSplitIntoTwoParts(
              ranges,
              text,
              remainingLength
            );
          filteredEntitiesBeforeTruncatedPosition =
            truncatedEntities.entitiesBeforeTruncatedOffset;
          filteredEntitiesFromTruncatedPosition =
            truncatedEntities.entitiesFromTruncatedOffset;
          hiddenContentOffset = truncatedEntities.newTruncatedEntityOffset;
          break;
        }
      }
    }
    if (truncatedParagraphIndex >= 0 && truncatedLineIndex >= 0) break;
  }

  return {
    filteredEntitiesBeforeTruncatedPosition,
    filteredEntitiesFromTruncatedPosition,
    hiddenContentOffset,
    truncatedLineIndex,
    truncatedParagraphIndex,
  };
}

export default {
  getTruncatedEntityRangesAfterExpandingSeeMore,
  splitEntityRangesIntoRegularAndHiddenParts,
  getEntityRangesWithTruncatedEntityAndSplitIntoTwoParts,
  filterParagraphsGetTruncatedLinesEntityRangesAndIndex,
};
