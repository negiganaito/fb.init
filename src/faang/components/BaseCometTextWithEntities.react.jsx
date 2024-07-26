/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback, useRef, useState } from "react";
import stylex from "@stylexjs/stylex";
import UnicodeUtils from "fbjs/lib/UnicodeUtils";
import gkx from "gkx";

import killswitch from "../../business/helpers/killswitch";

import CometSeeMoreExpandingUtils from "./CometSeeMoreExpandingUtils";
import { findSplitPointForText } from "./CometSplitPointForText.react";
import CometTextWithEntitiesBase from "./CometTextWithEntitiesBase.react";
import CometTrackingNodeProvider from "./CometTrackingNodeProvider.react";
import { FocusRegion } from "./FocusRegion.react";
import { focusableScopeQuery } from "./focusScopeQueries";
import getTextDirectionAttribute from "./getTextDirectionAttribute";

const DEFAULT_MAX_LENGTH = 800;
const DEFAULT_MAX_LINES = 8;
const DEFAULT_TRUNCATION_FACTOR = 0.6;
const DEFAULT_TRUNCATION_THRESHOLD = 20;

const styles = {
  paragraph: {
    marginTop: "xdj266r",
    marginEnd: "x11i5rnm",
    marginBottom: "xat24cr",
    marginStart: "x1mh8g0r",
    wordWrap: "x1vvkbs",
    $$css: true,
  },
  paragraphSpaced: { marginTop: "xtlvy1s", $$css: true },
  preserveWhiteSpace: { whiteSpace: "x126k92a", $$css: true },
};

const textAlignStyles = {
  auto: { textAlign: "start" },
  center: { textAlign: "center" },
  ltr: { textAlign: "left" },
  rtl: { textAlign: "right" },
};

const extractEntities = (ranges) => {
  return ranges
    .filter(
      (range) =>
        range !== null &&
        range.offset !== null &&
        range.length !== null &&
        range.entity !== null &&
        range.entity.__typename !== null
    )
    .map((range) => ({
      entity: range.entity,
      entity_is_weak_reference: range.entity_is_weak_reference ?? null,
      length: range.length,
      offset: range.offset,
    }));
};

const adjustEntities = (entities, start, length) => {
  return entities
    .map((entity) => ({
      ...entity,
      offset: entity.offset - start,
    }))
    .filter((entity) => entity.offset >= 0 && entity.offset < length);
};

const splitTextIntoParagraphs = (text, ranges) => {
  let currentOffset = 0;
  return text
    .split("\n")
    .map((paragraph) => {
      const paragraphLength = UnicodeUtils.strlen(paragraph);
      const adjustedRanges = adjustEntities(
        ranges,
        currentOffset,
        paragraphLength
      );
      currentOffset += paragraphLength + 1;
      return { ranges: adjustedRanges, text: paragraph };
    })
    .filter((paragraph) => paragraph.text.trim() !== "");
};

const processTextWithLineBreaks = (text, ranges, withLineBreaks) => {
  let currentOffset = 0;
  return text.split(/(?=\n\s*\n)/).reduce((acc, block) => {
    const match = block.match(/(^\n\s*\n)?([^]*$)/) || [];
    const prefix = match[1] || "";
    const content = match[2] || block;
    const adjustedRanges = adjustEntities(
      ranges,
      currentOffset + prefix.length,
      UnicodeUtils.strlen(content)
    );
    currentOffset += UnicodeUtils.strlen(block);

    if (withLineBreaks) {
      const paragraphs = splitTextIntoParagraphs(content, adjustedRanges);
      return acc.concat(paragraphs);
    } else {
      acc.push({ ranges: adjustedRanges, text: content });
      return acc;
    }
  }, []);
};

const BaseCometTextWithEntities = ({
  maxLength = DEFAULT_MAX_LENGTH,
  maxLines = DEFAULT_MAX_LINES,
  ranges = [],
  text,
  truncationFactor_DEPRECATED = DEFAULT_TRUNCATION_FACTOR,
  truncationStyle = "none",
  truncationThreshold = DEFAULT_TRUNCATION_THRESHOLD,
  withLineBreaks = false,
  withParagraphs = false,
  onToggleExpanded,
  seeMoreFragment,
  expanded,
  preserveWhiteSpace = false,
  align,
  maintainExpansionState = false,
  ...props
}) => {
  const [isExpanded, setExpanded] = useState(expanded ?? false);
  const splitPointRef = useRef(-1);

  const toggleExpanded = useCallback(() => {
    if (!maintainExpansionState) {
      setExpanded((prev) => !prev);
    }
    onToggleExpanded?.();
  }, [onToggleExpanded, maintainExpansionState]);

  const entityRanges = extractEntities(ranges);
  let displayText = text;
  if (truncationStyle !== "none" && !isExpanded) {
    const splitPoint = findSplitPointForText(
      text,
      maxLength * truncationFactor_DEPRECATED,
      maxLines,
      truncationThreshold
    );
    if (splitPoint !== null) {
      displayText = UnicodeUtils.substring(text, 0, splitPoint);
      const adjustedEntities = adjustEntities(
        entityRanges,
        0,
        UnicodeUtils.strlen(displayText)
      );
      entityRanges.splice(0, entityRanges.length, ...adjustedEntities);
      splitPointRef.current = splitPoint;
    }
  }

  const seeMoreElement = seeMoreFragment ? (
    <CometTrackingNodeProvider trackingNode={44}>
      {seeMoreFragment(isExpanded, splitPointRef.current, toggleExpanded)}
    </CometTrackingNodeProvider>
  ) : null;

  if (!withParagraphs) {
    if (gkx("24279") && isExpanded && splitPointRef.current !== null) {
      const {
        entitiesBeforeTruncatedOffset,
        entitiesFromTruncatedOffset,
        newTruncatedEntityOffset,
      } =
        CometSeeMoreExpandingUtils.getEntityRangesWithTruncatedEntityAndSplitIntoTwoParts(
          entityRanges,
          displayText,
          splitPointRef.current
        );
      return (
        <>
          <CometTextWithEntitiesBase
            ranges={entitiesBeforeTruncatedOffset}
            text={displayText.substring(0, newTruncatedEntityOffset)}
            {...props}
          />
          <FocusRegion autoFocusQuery={focusableScopeQuery}>
            <CometTextWithEntitiesBase
              ranges={entitiesFromTruncatedOffset}
              text={displayText.substring(newTruncatedEntityOffset)}
              {...props}
            />
          </FocusRegion>
        </>
      );
    }
    return (
      <>
        <CometTextWithEntitiesBase
          ranges={entityRanges}
          text={displayText}
          {...props}
        />
        {seeMoreElement}
      </>
    );
  }

  const paragraphs = processTextWithLineBreaks(
    displayText,
    entityRanges,
    withLineBreaks
  );
  if (!killswitch("COMET_MESSAGE_EMPTY_PARAGRAPH_FILTERING")) {
    paragraphs.filter(
      (paragraph) => !Array.isArray(paragraph) || paragraph.length > 0
    );
  }

  const {
    filteredEntitiesBeforeTruncatedPosition,
    filteredEntitiesFromTruncatedPosition,
    hiddenContentOffset,
    truncatedLineIndex,
    truncatedParagraphIndex,
  } =
    CometSeeMoreExpandingUtils.filterParagraphsGetTruncatedLinesEntityRangesAndIndex(
      isExpanded,
      paragraphs,
      splitPointRef
    );

  return (
    <>
      {paragraphs.map((paragraph, paragraphIndex) => (
        <div
          key={paragraphIndex}
          className={stylex(
            styles.paragraph,
            paragraphIndex !== 0 && styles.paragraphSpaced,
            preserveWhiteSpace && styles.preserveWhiteSpace
          )}
        >
          {Array.isArray(paragraph) ? (
            paragraph.map((line, lineIndex) => {
              const { ranges, text } = line;
              const direction =
                align === "center" ? align : getTextDirectionAttribute(text);
              return (
                <div
                  key={lineIndex}
                  dir={direction}
                  style={textAlignStyles[direction]}
                >
                  {isExpanded &&
                  truncatedParagraphIndex === paragraphIndex &&
                  truncatedLineIndex === lineIndex ? (
                    <>
                      <CometTextWithEntitiesBase
                        ranges={filteredEntitiesBeforeTruncatedPosition}
                        text={text.substring(0, hiddenContentOffset)}
                        {...props}
                      />
                      <FocusRegion autoFocusQuery={focusableScopeQuery}>
                        <CometTextWithEntitiesBase
                          ranges={filteredEntitiesFromTruncatedPosition}
                          text={text.substring(hiddenContentOffset)}
                          {...props}
                        />
                      </FocusRegion>
                    </>
                  ) : (
                    <CometTextWithEntitiesBase
                      ranges={ranges}
                      text={text}
                      {...props}
                    />
                  )}
                  {paragraphIndex === paragraphs.length - 1 &&
                  lineIndex === paragraph.length - 1
                    ? seeMoreElement
                    : null}
                </div>
              );
            })
          ) : (
            <>
              <CometTextWithEntitiesBase
                ranges={paragraph.ranges}
                text={paragraph.text}
                {...props}
              />
              {paragraphIndex === paragraphs.length - 1 ? seeMoreElement : null}
            </>
          )}
        </div>
      ))}
    </>
  );
};

BaseCometTextWithEntities.displayName = `BaseCometTextWithEntities [from BaseCometTextWithEntities]`;

export default BaseCometTextWithEntities;
