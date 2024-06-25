/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useEffect, useRef } from "react";

import { ReactUseEvent_React } from "../components/ReactUseEvent.react";

import ReactEventHelpers from "./ReactEventHelpers";
import ReactEventHookPropagation from "./ReactEventHookPropagation";

const passiveOptions = {
  passive: true,
};

export function useHover(targetElement, options) {
  const { disabled, onHoverStart, onHoverMove, onHoverEnd, onHoverChange } =
    options;

  const touchstartEvent = ReactUseEvent_React("touchstart", passiveOptions);
  const mouseoverEvent = ReactUseEvent_React("mouseover", passiveOptions);
  const mouseoutEvent = ReactUseEvent_React("mouseout", passiveOptions);
  const mousemoveEvent = ReactUseEvent_React("mousemove", passiveOptions);
  const pointeroverEvent = ReactUseEvent_React("pointerover", passiveOptions);
  const pointeroutEvent = ReactUseEvent_React("pointerout", passiveOptions);
  const pointermoveEvent = ReactUseEvent_React("pointermove", passiveOptions);
  const pointercancelEvent = ReactUseEvent_React(
    "pointercancel",
    passiveOptions
  );

  const stateRef = useRef({
    isHovered: false,
    isTouched: false,
  });

  useEffect(() => {
    const target = targetElement.current;
    const state = stateRef.current;

    if (target && state !== null) {
      target._hoverEventTarget = true;

      const documentElement = document;

      const handleHoverStart = (event) => {
        if (disabled) {
          handlePointerCancel(event);
          return;
        }

        if (
          ReactEventHookPropagation.hasEventHookPropagationStopped(
            event,
            "useHover"
          )
        ) {
          return;
        }

        ReactEventHookPropagation.stopEventHookPropagation(event, "useHover");

        if (!state.isHovered && !isHovered(target, event.relatedTarget)) {
          state.isHovered = true;

          if (onHoverStart) {
            onHoverStart(createHoverEvent("hoverstart", event, target));
          }

          if (onHoverChange) {
            onHoverChange(true);
          }

          if (ReactEventHelpers.hasPointerEvents) {
            pointermoveEvent.setListener(documentElement, handlePointerMove);
            pointercancelEvent.setListener(
              documentElement,
              handlePointerCancel
            );
            pointeroutEvent.setListener(documentElement, handlePointerOut);
          } else {
            mouseoutEvent.setListener(documentElement, handlePointerOut);
          }
        }
      };

      const handlePointerCancel = (event) => {
        stateRef.isTouched = false;

        if (ReactEventHelpers.hasPointerEvents) {
          pointermoveEvent.setListener(documentElement, null);
          pointercancelEvent.setListener(documentElement, null);
          pointeroutEvent.setListener(documentElement, null);
        } else {
          mouseoutEvent.setListener(documentElement, null);
        }

        handlePointerOut(event);
      };

      const handlePointerOut = (event) => {
        if (stateRef.isHovered && !isHovered(target, event.relatedTarget)) {
          state.isHovered = false;

          if (onHoverEnd) {
            onHoverEnd(createHoverEvent("hoverend", event, target));
          }

          if (onHoverChange) {
            onHoverChange(false);
          }

          handlePointerCancel(event);
        }
      };

      const handlePointerMove = (event) => {
        stateRef.isTouched = false;

        if (disabled) {
          handlePointerCancel(event);
          return;
        }

        stateRef.isHovered &&
          onHoverMove &&
          onHoverMove(createHoverEvent("hoverend", event, target));
      };

      if (ReactEventHelpers.hasPointerEvents) {
        pointeroverEvent.setListener(target, (e) => {
          e.pointerType !== "touch" && handleHoverStart(e);
        });
      } else {
        mouseoverEvent.setListener(target, (e) => {
          stateRef.isTouched || handleHoverStart(e);
        });
        touchstartEvent.setListener(target, () => {
          stateRef.isTouched = true;
        });
        mousemoveEvent.setListener(documentElement, handlePointerMove);
      }

      if (stateRef.isHovered && ReactEventHelpers.hasPointerEvents) {
        pointermoveEvent.setListener(documentElement, handlePointerMove);
        pointercancelEvent.setListener(documentElement, handlePointerCancel);
        pointeroutEvent.setListener(documentElement, handlePointerOut);
      } else {
        mouseoutEvent.setListener(documentElement, handlePointerOut);
      }
    }
  }, [
    disabled,
    onHoverStart,
    onHoverMove,
    onHoverEnd,
    onHoverChange,
    touchstartEvent,
    mouseoverEvent,
    mouseoutEvent,
    mousemoveEvent,
    pointeroverEvent,
    pointeroutEvent,
    pointermoveEvent,
    pointercancelEvent,
    targetElement,
  ]);
}

function createHoverEvent(type, event, target) {
  return {
    clientX: event.clientX,
    clientY: event.clientY,
    pageX: event.pageX,
    pageY: event.pageY,
    screenX: event.screenX,
    screenY: event.screenY,
    target,
    timeStamp: event.timeStamp,
    type,
    x: event.clientX,
    y: event.clientY,
  };
}

function isHovered(target, relatedTarget) {
  while (relatedTarget !== null) {
    if (relatedTarget === target) {
      return true;
    }
    if (relatedTarget._hoverEventTarget) {
      return false;
    }
    relatedTarget = relatedTarget.parentNode;
  }
  return false;
}
