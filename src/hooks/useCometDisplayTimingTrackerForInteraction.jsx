/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import * as React from "react";
import { getCurrentVCTraces } from "cr:449";
import { InteractionTracingMetrics } from "InteractionTracingMetrics";
import performanceNow from "performanceNow";

export default function useCometDisplayTimingTrackerForInteraction({
  element,
  isPersistent = false,
  interactionId,
}) {
  const elementRef = React.useRef(null);

  const onElementMount = React.useCallback(
    (mountedElement) => {
      if (element && elementRef.current !== mountedElement) {
        elementRef.current = mountedElement;
        if (mountedElement) {
          const startTime = performanceNow();

          if (interactionId) {
            InteractionTracingMetrics.addMountPoint(
              interactionId,
              startTime,
              mountedElement
            );
          } else {
            InteractionTracingMetrics.currentInteractionLogger().forEach(
              (logger) => {
                InteractionTracingMetrics.addMountPoint(
                  logger.traceId,
                  startTime,
                  mountedElement
                );
              }
            );
          }

          if (!isPersistent && getCurrentVCTraces) {
            const traces = getCurrentVCTraces();
            traces.forEach((trace) => {
              if (trace.interactionType !== "INTERACTION") {
                trace.excludeElement(mountedElement);
              }
            });
          }
        }
      }
    },
    [interactionId, isPersistent, element]
  );

  return onElementMount;
}
