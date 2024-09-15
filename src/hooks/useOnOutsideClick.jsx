/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

// useOnOutsideClick.ts

import { useContext, useEffect, useRef } from "react";

import HiddenSubtreePassiveContext from "../context/HiddenSubtreePassiveContext";
import { isWithinThreshold } from "../helpers/pointerEventDistance";

function useOnOutsideClick(onOutsideClick, options) {
  const ref = useRef(null);
  const hiddenSubtreeContext = useContext(HiddenSubtreePassiveContext);
  const pointerDownEvent = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (onOutsideClick === null || element === null) return;

    const { isTargetEligible, triggerOutsideClickOnDrag = false } =
      options || {};

    function isOutsideClick(target) {
      return (
        target instanceof Node &&
        element instanceof Node &&
        !element.contains(target) &&
        (isTargetEligible === null || isTargetEligible(target))
      );
    }

    function handlePointerDown(event) {
      if (event.isPrimary) {
        const isOutside = isOutsideClick(event.target);
        if (isOutside) {
          pointerDownEvent.current = event;
        }
      }
    }

    function handlePointerUp(event) {
      const isOutside = isOutsideClick(event.target);
      if (pointerDownEvent.current !== null && isOutside && event.isPrimary) {
        const _isWithinThreshold = isWithinThreshold(
          pointerDownEvent.current,
          event
        );
        if (_isWithinThreshold || triggerOutsideClickOnDrag) {
          onOutsideClick(event);
        }
      }
      pointerDownEvent.current = null;
    }

    function handleClick(event) {
      if (isOutsideClick(event.target)) {
        onOutsideClick(event);
      }
    }

    const supportsPointerEvents = "PointerEvent" in window;
    let isListening = false;

    function startListening() {
      if (!isListening) {
        if (supportsPointerEvents) {
          document.addEventListener("pointerup", handlePointerUp);
          document.addEventListener("pointerdown", handlePointerDown);
        } else {
          document.addEventListener("click", handleClick);
        }
        isListening = true;
      }
    }

    function stopListening() {
      if (isListening) {
        if (supportsPointerEvents) {
          document.removeEventListener("pointerup", handlePointerUp);
          document.removeEventListener("pointerdown", handlePointerDown);
        } else {
          document.removeEventListener("click", handleClick);
        }
        isListening = false;
      }
    }

    const hiddenState = hiddenSubtreeContext.getCurrentState();
    if (!hiddenState.hiddenOrBackgrounded) {
      startListening();
    }

    const unsubscribe = hiddenSubtreeContext.subscribeToChanges((state) => {
      if (state.hiddenOrBackgrounded) {
        setTimeout(() => {
          stopListening();
        }, 0);
      } else {
        startListening();
      }
    });

    return () => {
      unsubscribe.remove();
      stopListening();
    };
  }, [onOutsideClick, hiddenSubtreeContext, options]);

  return ref;
}

export default useOnOutsideClick;
