/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useEffect, useMemo, useRef } from "react";

import { useLayoutEffect_SAFE_FOR_SSR } from "../../hooks/useLayoutEffect_SAFE_FOR_SSR";

import ReactEventHelpers from "./ReactEventHelpers";
import ReactEventHookPropagation from "./ReactEventHookPropagation";
import { ReactUseEvent_React } from "./ReactUseEvent.react";

const globalFocusVisibleEvents = ReactEventHelpers.hasPointerEvents
  ? ["keydown", "pointermove", "pointerdown", "pointerup"]
  : [
      "keydown",
      "mousedown",
      "mousemove",
      "mouseup",
      "touchmove",
      "touchstart",
      "touchend",
    ];

const useEventProps = {
  passive: true,
};

// Global state for tracking focus visible and emulation of mouse
let isGlobalFocusVisible = true;
let hasTrackedGlobalFocusVisible = false;

const _5403 = false;

function trackGlobalFocusVisible() {
  globalFocusVisibleEvents.forEach((type) => {
    window.addEventListener(type, handleGlobalFocusVisibleEvent, true);
  });
}

function isValidKey(nativeEvent) {
  const { metaKey, altKey, ctrlKey } = nativeEvent;
  return !(metaKey || (!ReactEventHelpers.isMac && altKey) || ctrlKey);
}

function isTextInput(nativeEvent) {
  const { key, target } = nativeEvent;
  if (key === "Tab" || key === "Escape") return false;
  const { isContentEditable, tagName } = target;
  return tagName === "INPUT" || tagName === "TEXTAREA" || isContentEditable;
}

function handleGlobalFocusVisibleEvent(
  nativeEvent // MouseEvent | TouchEvent | KeyboardEvent
) {
  if (nativeEvent.type === "keydown") {
    if (isValidKey(nativeEvent)) {
      isGlobalFocusVisible = true;
    }
  } else {
    const nodeName = nativeEvent.target.nodeName;
    // Safari calls mousemove/pointermove events when you tab out of the active
    // Safari frame.
    if (nodeName === "HTML") return;
    // Handle all the other mouse/touch/pointer events
    isGlobalFocusVisible = false;
  }
}

function handleFocusVisibleTargetEvents(event, callback) {
  if (event.type === "keydown") {
    const { nativeEvent } = event;
    if (isValidKey(nativeEvent) && !isTextInput(nativeEvent)) {
      callback(true);
    }
  } else {
    isGlobalFocusVisible = false;
    callback(false);
  }
}

function setFocusVisibleListeners(focusVisibleHandles, focusTarget, callback) {
  focusVisibleHandles.forEach((focusVisibleHandle) => {
    focusVisibleHandle.setListener(focusTarget, (event) =>
      handleFocusVisibleTargetEvents(event, callback)
    );
  });
}

function useFocusVisibleInputHandles() {
  const mousedownHandle = ReactUseEvent_React("mousedown", useEventProps);
  const pointTouchHandle = ReactUseEvent_React(
    ReactEventHelpers.hasPointerEvents ? "pointerdown" : "touchstart",
    useEventProps
  );
  const keydownHandle = ReactUseEvent_React("keydown", useEventProps);

  return useMemo(
    () => [mousedownHandle, pointTouchHandle, keydownHandle],
    [keydownHandle, mousedownHandle, pointTouchHandle]
  );
}

function useFocusLifecycles() {
  useEffect(() => {
    hasTrackedGlobalFocusVisible ||
      ((hasTrackedGlobalFocusVisible = true), trackGlobalFocusVisible());
  }, []);
}

function useFocus(focusTargetRef, props) {
  const { disabled, onBlur, onFocus, onFocusChange, onFocusVisibleChange } =
    props;

  const stateRef = useRef({
    isFocused: false,
    isFocusVisible: false,
  });

  const focusHandle = ReactUseEvent_React("focusin", useEventProps);
  const blurHandle = ReactUseEvent_React("focusout", useEventProps);
  const focusVisibleHandles = useFocusVisibleInputHandles();

  useLayoutEffect_SAFE_FOR_SSR(() => {
    const focusTarget = focusTargetRef.current;
    const state = stateRef.current; // EventTarget | ReactScopeInstance

    if (focusTarget !== null && state !== null && focusTarget.nodeType === 1) {
      // Handle focus visible
      setFocusVisibleListeners(
        focusVisibleHandles,
        focusTarget,
        (isFocusVisible) => {
          if (state.isFocused && state.isFocusVisible !== isFocusVisible) {
            state.isFocusVisible = isFocusVisible;
            if (onFocusVisibleChange) {
              onFocusVisibleChange(isFocusVisible);
            }
          }
        }
      );

      // Handle focus
      focusHandle.setListener(focusTarget, (event) => {
        if (!_5403 && disabled === true) {
          return;
        }

        if (
          ReactEventHookPropagation.hasEventHookPropagationStopped(
            event,
            "useFocus"
          )
        )
          return;
        ReactEventHookPropagation.stopEventHookPropagation(event, "useFocus");

        if (!state.isFocused && focusTarget === event.target) {
          state.isFocused = true;
          state.isFocusVisible = isGlobalFocusVisible;
          if (onFocus) {
            onFocus(event);
          }
          if (onFocusChange) {
            onFocusChange(true);
          }
          if (state.isFocusVisible && onFocusVisibleChange) {
            onFocusVisibleChange(true);
          }
        }
      });

      // Handle blur
      blurHandle.setListener(focusTarget, (event) => {
        if (!_5403 && disabled === true) return;
        if (
          ReactEventHookPropagation.hasEventHookPropagationStopped(
            event,
            "useFocus"
          )
        )
          return;
        ReactEventHookPropagation.stopEventHookPropagation(event, "useFocus");

        if (state.isFocused) {
          state.isFocused = false;
          if (onBlur) {
            onBlur(event);
          }
          if (onFocusChange) {
            onFocusChange(false);
          }
          state.isFocusVisible &&
            onFocusVisibleChange &&
            onFocusVisibleChange(false);
          state.isFocusVisible = isGlobalFocusVisible;
        }
      });
    }
  }, [
    blurHandle,
    disabled,
    focusHandle,
    focusTargetRef,
    focusVisibleHandles,
    onBlur,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
  ]);

  useEffect(() => {
    const focusTarget = focusTargetRef.current;
    const state = stateRef.current;
    return function () {
      if (
        focusTargetRef.current === null &&
        state !== null &&
        state.isFocused
      ) {
        state.isFocused = false;
        const blurEvent = new window.FocusEvent("blur");
        Object.defineProperty(blurEvent, "target", {
          value: focusTarget,
        });

        if (onBlur) {
          onBlur(blurEvent);
        }

        if (onFocusChange) {
          onFocusChange(false);
        }

        if (state.isFocusVisible && onFocusVisibleChange) {
          onFocusVisibleChange(false);
        }

        state.isFocusVisible = isGlobalFocusVisible;
      }
    };
  });

  // Mount/Unmount logic
  useFocusLifecycles();
}

function useFocusWithin(
  focusWithinTargetRef,
  {
    disabled,
    onAfterBlurWithin,
    onBeforeBlurWithin,
    onBlurWithin,
    onFocusWithin,
    onFocusWithinChange,
    onFocusWithinVisibleChange,
  }
) {
  // Setup controlled state for this useFocus hook
  const stateRef = useRef({
    isFocused: false,
    isFocusVisible: false,
  });

  const focusHandle = ReactUseEvent_React("focusin", useEventProps);
  const blurHandle = ReactUseEvent_React("focusout", useEventProps);
  const afterBlurHandle = ReactUseEvent_React("afterblur", useEventProps);
  const beforeBlurHandle = ReactUseEvent_React("beforeblur", useEventProps);

  const focusVisibleHandles = useFocusVisibleInputHandles();

  const useFocusWithinRef = useCallback(
    (focusWithinTarget) => {
      if (typeof focusWithinTargetRef === "function") {
        focusWithinTargetRef(focusWithinTarget);
      } else {
        focusWithinTargetRef.current = focusWithinTarget;
      }

      // typeof focusWithinTargetRef === "function" ? focusWithinTargetRef(focusWithinTarget) : focusWithinTargetRef.current = focusWithinTarget;
      const state = stateRef.current;

      if (focusWithinTarget !== null && state !== null) {
        setFocusVisibleListeners(
          focusVisibleHandles,
          // $FlowFixMe focusWithinTarget is not null here
          focusWithinTarget,
          (isFocusVisible) => {
            if (state.isFocused && state.isFocusVisible !== isFocusVisible) {
              state.isFocusVisible = isFocusVisible;
              if (onFocusWithinVisibleChange) {
                onFocusWithinVisibleChange(isFocusVisible);
              }
            }
          }
        );

        // Handle focus
        // $FlowFixMe focusWithinTarget is not null here
        focusHandle.setListener(focusWithinTarget, (event) => {
          if (!_5403 && disabled === true) {
            return;
          }
          if (
            ReactEventHookPropagation.hasEventHookPropagationStopped(
              event,
              "useFocusWithin"
            )
          ) {
            return;
          }

          if (!state.isFocused /* || state.isFocused */) {
            state.isFocused = true;
            state.isFocusVisible = isGlobalFocusVisible;
            if (onFocusWithinChange) {
              onFocusWithinChange(true);
            }
            if (state.isFocusVisible && onFocusWithinVisibleChange) {
              onFocusWithinVisibleChange(true);
            }
          }

          if (!state.isFocusVisible && isGlobalFocusVisible) {
            state.isFocusVisible = isGlobalFocusVisible;
            if (onFocusWithinVisibleChange) {
              onFocusWithinVisibleChange(true);
            }
          }

          if (onFocusWithin) {
            onFocusWithin(event);
          }
        });

        // Handle blur
        // $FlowFixMe focusWithinTarget is not null here
        blurHandle.setListener(focusWithinTarget, (event) => {
          if (!_5403 && disabled === true) {
            return;
          }
          const { relatedTarget } = event.nativeEvent;
          if (
            ReactEventHookPropagation.hasEventHookPropagationStopped(
              event,
              "useFocusWithin"
            )
          ) {
            return;
          }

          if (
            state.isFocused &&
            !ReactEventHelpers.isRelatedTargetWithin(
              focusWithinTarget,
              relatedTarget
            )
          ) {
            state.isFocused = false;
            if (onFocusWithinChange) {
              onFocusWithinChange(false);
            }
            if (state.isFocusVisible && onFocusWithinVisibleChange) {
              onFocusWithinVisibleChange(false);
            }
            if (onBlurWithin) {
              onBlurWithin(event);
            }
          } else {
            ReactEventHookPropagation.stopEventHookPropagation(
              event,
              "useFocusWithin"
            );
          }
        });

        // Handle before blur. This is a special
        // React provided event.
        // $FlowFixMe focusWithinTarget is not null here
        beforeBlurHandle.setListener(focusWithinTarget, (event) => {
          if (!_5403 && disabled === true) {
            return;
          }
          if (onBeforeBlurWithin) {
            onBeforeBlurWithin(event);
            afterBlurHandle.setListener(document, (afterBlurEvent) => {
              if (onAfterBlurWithin) {
                onAfterBlurWithin(afterBlurEvent);
              }
              // Clear listener on document
              afterBlurHandle.setListener(document, undefined);
            });
          }
        });
      }
    },
    [
      afterBlurHandle,
      beforeBlurHandle,
      blurHandle,
      disabled,
      focusHandle,
      focusVisibleHandles,
      focusWithinTargetRef,
      onAfterBlurWithin,
      onBeforeBlurWithin,
      onBlurWithin,
      onFocusWithin,
      onFocusWithinChange,
      onFocusWithinVisibleChange,
    ]
  );

  // Mount/Unmount logic
  useFocusLifecycles();

  return useFocusWithinRef;
}

const ReactFocusEvent_React = {
  useFocus,
  useFocusWithin,
};

export default ReactFocusEvent_React;
export { useFocus, useFocusWithin };
