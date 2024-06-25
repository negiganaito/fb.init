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
import { useEffect, useRef } from "react";

import ReactEventHelpers from "./ReactEventHelpers"; // Assuming this is the correct import path
import ReactEventHookPropagation from "./ReactEventHookPropagation"; // Assuming this is the correct import path
import { ReactUseEvent_React } from "./ReactUseEvent.react";

const passiveOptions = { passive: true };

// eslint-disable-next-line max-params
function createPressEvent(type, buttons, pointerType, event, target) {
  return {
    altKey: event.altKey,
    buttons: buttons,
    clientX: event.clientX,
    clientY: event.clientY,
    ctrlKey: event.ctrlKey,
    defaultPrevented: event.defaultPrevented,
    metaKey: event.metaKey,
    pageX: event.pageX,
    pageY: event.pageY,
    pointerType: pointerType,
    screenX: event.screenX,
    screenY: event.screenY,
    shiftKey: event.shiftKey,
    target: target,
    timeStamp: event.timeStamp,
    type: type,
    x: event.clientX,
    y: event.clientY,
    preventDefault: function () {
      this.defaultPrevented = true;
      event.preventDefault();
    },
    stopPropagation: function () {
      event.stopPropagation();
    },
  };
}

export function usePress(
  ref,
  { disabled, onPressStart, onPressMove, onPressEnd, onPressChange }
) {
  const stateRef = useRef({
    isPressed: false,
    isPressActive: false,
    pointerId: null,
    bounds: null,
    pointerType: "",
    buttons: 0,
    activationEvent: null,
  });

  const pointerDownEvent = ReactUseEvent_React("pointerdown");
  const pointerMoveEvent = ReactUseEvent_React("pointermove", passiveOptions);
  const pointerUpEvent = ReactUseEvent_React("pointerup", passiveOptions);
  const pointerCancelEvent = ReactUseEvent_React(
    "pointercancel",
    passiveOptions
  );
  const mouseDownEvent = ReactUseEvent_React("mousedown");
  const mouseUpEvent = ReactUseEvent_React("mouseup", passiveOptions);
  const mouseMoveEvent = ReactUseEvent_React("mousemove", passiveOptions);
  const dragStartEvent = ReactUseEvent_React("dragstart", passiveOptions);
  const focusOutEvent = ReactUseEvent_React("focusout", passiveOptions);

  useEffect(() => {
    const element = ref.current;
    const state = stateRef.current;

    if (element !== null) {
      const documentRef = document;

      const handlePointerDown = (event) => {
        if (disabled === true) {
          handleRelease(event);
          return;
        }

        if (
          ReactEventHookPropagation.eventHookPropagationStopped(
            event,
            "usePress"
          )
        )
          return;
        ReactEventHookPropagation.stopEventHookPropagation(event, "usePress");

        if (
          event.buttons === 2 ||
          event.buttons > 4 ||
          (ReactEventHelpers.isMac &&
            event.pointerType === "mouse" &&
            event.ctrlKey)
        ) {
          return;
        }

        state.buttons = event.buttons;

        if (event.button === 1) {
          state.buttons = 4;
        }

        handlePress(event);
      };

      const handlePress = (event) => {
        if (!state.isPressed) {
          const pointerId =
            event.pointerId !== undefined ? event.pointerId : null;
          const pointerType = event.pointerType || "mouse";

          state.isPressed = true;
          state.isPressActive = true;
          state.pointerId = pointerId;
          state.pointerType = pointerType;
          state.activationEvent = event;

          if (pointerType !== "mouse") {
            state.bounds = element.getBoundingClientRect();
          }

          onPressStart &&
            onPressStart(
              createPressEvent(
                "pressstart",
                state.buttons,
                pointerType,
                event,
                element
              )
            );
          onPressChange && onPressChange(true);

          if (ReactEventHelpers.hasPointerEvents) {
            pointerUpEvent.setListener(documentRef, handleRelease);
            pointerMoveEvent.setListener(documentRef, handleMove);
            pointerCancelEvent.setListener(documentRef, handleRelease);
          } else {
            mouseMoveEvent.setListener(documentRef, handleMove);
            mouseUpEvent.setListener(documentRef, handleRelease);
            dragStartEvent.setListener(documentRef, handleRelease);
          }
        }
      };

      const handlePressRelease = (event) => {
        if (state.isPressed) {
          state.isPressed = false;
          onPressEnd &&
            onPressEnd(
              createPressEvent(
                "pressend",
                state.buttons,
                state.pointerType,
                event,
                element
              )
            );
          onPressChange && onPressChange(false);
        }
      };

      const handleRelease = (event) => {
        state.isPressActive = false;
        state.bounds = null;
        state.activationEvent = null;

        handlePressRelease(event);

        if (ReactEventHelpers.hasPointerEvents) {
          pointerUpEvent.setListener(documentRef, null);
          pointerMoveEvent.setListener(documentRef, null);
          pointerCancelEvent.setListener(documentRef, null);
        } else {
          mouseMoveEvent.setListener(documentRef, null);
          mouseUpEvent.setListener(documentRef, null);
          dragStartEvent.setListener(documentRef, null);
        }
      };

      const handleMove = (event) => {
        if (disabled === true) {
          handleRelease(event);
          return;
        }

        if (!state.isPressActive) return;

        const pointerType = state.pointerType;
        const isPressed = state.isPressed;
        let insideBounds = false;

        if (pointerType === "mouse") {
          const target = event.target;
          insideBounds = element.contains(target);
        } else {
          const pointerId = event.pointerId;
          const bounds = state.bounds;

          if (pointerId !== state.pointerId || bounds === null) return;

          const clientX = event.clientX;
          const clientY = event.clientY;

          const { top, left, right, bottom } = bounds;

          if (
            clientX >= left &&
            clientX <= right &&
            clientY >= top &&
            clientY <= bottom
          ) {
            insideBounds = true;
          }
        }

        if (insideBounds) {
          if (isPressed) {
            onPressMove &&
              onPressMove(
                createPressEvent(
                  "pressmove",
                  state.buttons,
                  pointerType,
                  event,
                  element
                )
              );
          } else {
            handlePress(event);
          }
        } else {
          if (isPressed) {
            handlePressRelease(event);
          }
        }
      };

      const handleFocusOut = (event) => {
        const activationEvent = state.activationEvent;
        if (event.target === element && activationEvent !== null) {
          handleRelease(activationEvent);
        }
      };

      if (ReactEventHelpers.hasPointerEvents) {
        pointerDownEvent.setListener(element, handlePointerDown);
      } else {
        mouseDownEvent.setListener(element, handlePointerDown);
      }

      focusOutEvent.setListener(element, handleFocusOut);

      if (state.isPressActive) {
        if (ReactEventHelpers.hasPointerEvents) {
          pointerUpEvent.setListener(documentRef, handleRelease);
          pointerMoveEvent.setListener(documentRef, handleMove);
          pointerCancelEvent.setListener(documentRef, handleRelease);
        } else {
          mouseMoveEvent.setListener(documentRef, handleMove);
          mouseUpEvent.setListener(documentRef, handleRelease);
          dragStartEvent.setListener(documentRef, handleRelease);
        }
      }

      return () => {
        const activationEvent = state.activationEvent;
        if (ref.current === null && activationEvent !== null) {
          handleRelease(activationEvent);
        }
      };
    }
  }, [disabled, focusOutEvent, mouseDownEvent, mouseMoveEvent, mouseUpEvent]);
}
