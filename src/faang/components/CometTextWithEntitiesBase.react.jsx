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
import React, { Fragment } from "react";
import { gkx } from "gkx";
import { UnicodeUtils } from "UnicodeUtils";

function sortRanges(ranges) {
  return Array.from(ranges).sort(
    (a, b) => a.offset - b.offset || b.length - a.length
  );
}

function applyTransforms(text, transforms) {
  return transforms !== null
    ? transforms.reduce((text, transform) => transform(text), text)
    : text;
}

applyTransforms.displayName = `${applyTransforms.name} [from applyTransforms]`;

// eslint-disable-next-line max-params
function renderEntity(
  entity,
  entityIsWeakReference,
  entityType,
  subElements,
  originalText,
  transformed,
  key,
  renderers,
  transformFns
) {
  const typename = entity.__typename;
  const rendererFns = Object.prototype.hasOwnProperty.call(renderers, typename)
    ? renderers[typename].concat(transformFns)
    : transformFns;

  return (
    <Fragment key={key}>
      {rendererFns && rendererFns.length > 0
        ? rendererFns.reduce(
            (children, fn) =>
              fn(
                children,
                entity,
                entityType,
                originalText,
                entityIsWeakReference
              ),
            transformed
          )
        : subElements}
    </Fragment>
  );
}

renderEntity.displayName = `${renderEntity.name} [from renderEntity}]`;

// eslint-disable-next-line max-params
function processSubElements(
  text,
  start,
  end,
  entity,
  entityIsWeakReference,
  entityType,
  renderers,
  subElements,
  stack,
  transformFns,
  globalTransforms,
  index
) {
  const substr = UnicodeUtils.substr(text, start, end - start);
  const subElementsLength = stack.length;

  if (substr.length > 0) {
    subElements.push(
      <Fragment key={`c${start}_${subElementsLength}_${index}`}>
        {applyTransforms(substr, transformFns)}
      </Fragment>
    );
  }

  const lastElement = stack.pop();
  stack[stack.length - 1].subElements.push(
    renderEntity(
      entity,
      entityIsWeakReference,
      entityType,
      subElements,
      substr,
      subElements,
      `${start}_${subElementsLength}_${index}`,
      renderers,
      globalTransforms
    )
  );

  return lastElement;
}

// eslint-disable-next-line complexity
const CometTextWithEntitiesBase = ({
  ranges = [],
  renderers,
  transforms = [],
  text,
  disableRangeSort = false,
}) => {
  const sortedRenderers = renderers ?? {};
  let currentOffset = 0;
  const defaultRenderers = Object.prototype.hasOwnProperty.call(
    sortedRenderers,
    "*"
  )
    ? sortedRenderers["*"]
    : [];
  const sortedRanges = disableRangeSort ? ranges : sortRanges(ranges);

  const stack = [
    {
      entity: { __typename: "" },
      entity_is_weak_reference: false,
      entityType: "",
      length: text.length,
      offset: 0,
      subElements: [],
    },
  ];

  if (!gkx("24280")) {
    for (let i = 0; i < sortedRanges.length; ++i) {
      const range = sortedRanges[i];
      const { entity, entity_is_weak_reference, entity_type, length, offset } =
        range;

      if (currentOffset >= text.length || offset > text.length) break;

      let currentRange = stack[stack.length - 1];
      let {
        entity: currentEntity,
        entity_is_weak_reference: currentEntityIsWeakReference,
        entityType: currentEntityType,
        length: currentLength,
        offset: currentOffsetInRange,
        subElements: currentSubElements,
      } = currentRange;
      let currentRangeEnd = currentOffsetInRange + currentLength;

      while (currentRangeEnd <= offset && stack.length > 1) {
        processSubElements(
          text,
          currentOffset,
          currentRangeEnd,
          currentEntity,
          currentEntityIsWeakReference,
          currentEntityType,
          sortedRenderers,
          currentSubElements,
          stack,
          transforms,
          defaultRenderers,
          i
        );
        currentOffset = currentRangeEnd;

        currentRange = stack[stack.length - 1];
        currentEntity = currentRange.entity;
        currentEntityIsWeakReference = currentRange.entity_is_weak_reference;
        currentEntityType = currentRange.entityType;
        currentLength = currentRange.length;
        currentOffsetInRange = currentRange.offset;
        currentSubElements = currentRange.subElements;
        currentRangeEnd = currentOffsetInRange + currentLength;
      }

      if (currentOffset < offset) {
        stack[stack.length - 1].subElements.push(
          <Fragment key={`c${currentOffset}_${stack.length}`}>
            {applyTransforms(
              UnicodeUtils.substr(text, currentOffset, offset - currentOffset),
              transforms
            )}
          </Fragment>
        );
        currentOffset = offset;
      }

      if (
        currentOffsetInRange <= offset &&
        currentRangeEnd >= offset + length
      ) {
        stack.push({
          entity,
          entity_is_weak_reference: entity_is_weak_reference ?? null,
          entityType: entity_type ?? null,
          length,
          offset,
          subElements: [],
        });
      } else {
        const substr = UnicodeUtils.substr(text, offset, length);
        const transformed = applyTransforms(substr, transforms);

        stack[stack.length - 1].subElements.push(
          renderEntity(
            entity,
            entity_is_weak_reference ?? null,
            entity_type ?? null,
            substr,
            substr,
            transformed,
            `${currentOffset}_${stack.length}`,
            sortedRenderers,
            defaultRenderers
          )
        );

        currentOffset = offset + length;
      }
    }
  } else {
    const events = sortedRanges
      .flatMap((range) => [
        { index: range.offset, range, type: "start" },
        { index: range.offset + range.length, range, type: "end" },
      ])
      .sort((a, b) => {
        if (a.index !== b.index) return a.index - b.index;
        if (a.range.length === 0 && b.range.length !== 0) return 1;
        if (a.range.length !== 0 && b.range.length === 0) return -1;
        if (a.type !== b.type)
          return a.range === b.range
            ? b.type === "start"
              ? 1
              : -1
            : b.type === "end"
            ? 1
            : -1;
        return a.type === "start"
          ? b.range.length - a.range.length
          : a.range.length - b.range.length;
      });

    let eventIndex = 0;

    while (eventIndex < events.length) {
      const event = events[eventIndex];

      if (currentOffset >= text.length || event.index > text.length) break;

      if (event.type === "start") {
        if (event.index > currentOffset) {
          const substr = UnicodeUtils.substr(
            text,
            currentOffset,
            event.index - currentOffset
          );
          stack[stack.length - 1].subElements.push(
            <Fragment key={`c${currentOffset}_${stack.length}`}>
              {applyTransforms(substr, transforms)}
            </Fragment>
          );
        }

        stack.push({
          entity: event.range.entity,
          entity_is_weak_reference:
            event.range.entity_is_weak_reference ?? null,
          entityType: event.range.entity_type ?? null,
          length: event.range.length,
          offset: event.range.offset,
          subElements: [],
        });

        eventIndex++;
        currentOffset = event.index;
      } else {
        const endEventSet = new Set();
        const processEndEvent = () => {
          const currentEvent = events[eventIndex];
          eventIndex++;

          let matchedRange = null;
          endEventSet.forEach((range) => {
            if (range.entity === currentEvent.range.entity) {
              matchedRange = range;
            }
          });

          if (matchedRange) {
            endEventSet.delete(matchedRange);
          } else if (stack.length > 1) {
            let rangeToProcess = stack[stack.length - 1];
            const {
              entity,
              entity_is_weak_reference,
              entityType,
              subElements,
            } = rangeToProcess;

            rangeToProcess = processSubElements(
              text,
              currentOffset,
              event.index,
              entity,
              entity_is_weak_reference,
              entityType,
              sortedRenderers,
              subElements,
              stack,
              transforms,
              defaultRenderers,
              events.length - eventIndex
            );
            currentOffset = event.index;

            while (
              stack.length > 1 &&
              rangeToProcess.entity !== currentEvent.range.entity
            ) {
              endEventSet.add(rangeToProcess);
              rangeToProcess = stack[stack.length - 1];
            }
          }
        };

        let nextEvent = events[eventIndex];
        while (
          nextEvent &&
          nextEvent.index === event.index &&
          nextEvent.type === "end"
        ) {
          processEndEvent();
          nextEvent = events[eventIndex];
        }

        currentOffset = event.index;
        const remainingRanges = Array.from(endEventSet);
        for (let i = remainingRanges.length - 1; i >= 0; i--) {
          const range = remainingRanges[i];
          stack.push({
            entity: range.entity,
            entity_is_weak_reference: range.entity_is_weak_reference,
            entityType: range.entityType,
            length: range.offset + range.length - currentOffset,
            offset: currentOffset,
            subElements: [],
          });
        }
      }
    }
  }

  while (stack.length > 1) {
    const lastRange = stack[stack.length - 1];
    const {
      entity,
      entity_is_weak_reference,
      entityType,
      length,
      offset,
      subElements,
    } = lastRange;
    const rangeEnd = offset + length;

    processSubElements(
      text,
      currentOffset,
      rangeEnd,
      entity,
      entity_is_weak_reference,
      entityType,
      sortedRenderers,
      subElements,
      stack,
      transforms,
      defaultRenderers,
      stack.length
    );
    currentOffset = rangeEnd;
  }

  if (currentOffset < text.length) {
    const remainingSubElements = stack[stack.length - 1].subElements;
    remainingSubElements.push(
      <Fragment key={`c${currentOffset}`}>
        {applyTransforms(UnicodeUtils.substr(text, currentOffset), transforms)}
      </Fragment>
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{stack[stack.length - 1].subElements}</>;
};

CometTextWithEntitiesBase.displayName = `${CometTextWithEntitiesBase.name} [from CometTextWithEntitiesBase]`;

export default CometTextWithEntitiesBase;
