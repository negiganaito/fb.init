/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useEffect } from "react";
import UserAgent from "fbjs/lib/UserAgent";

import { makeEventOptions } from "../helpers/passiveEventListenerUtil";

import useDynamicCallbackDANGEROUS from "./useDynamicCallbackDANGEROUS";

const isSafari =
  UserAgent.isBrowser("Safari") || UserAgent.isBrowser("Mobile Safari");

const disableUserSelect = (window) => {
  const body = window?.document?.body;
  if (body === null) return;

  body.style.webkitUserSelect = "none";
  const eventOptions = makeEventOptions({
    passive: true,
  });

  const handleTouchEnd = () => {
    body.style.webkitUserSelect = "";
    document.removeEventListener("touchend", handleTouchEnd, eventOptions);
  };

  document.addEventListener("touchend", handleTouchEnd, eventOptions);
  return handleTouchEnd;
};

function useWebPressableTouchStartHandler(ref, pressableHandler, callback) {
  const dynamicCallback = useDynamicCallbackDANGEROUS(callback);

  useEffect(() => {
    if (!pressableHandler && !isSafari) return;

    const element = ref.current;
    const body = window?.document?.body;
    if (
      !element ||
      !body ||
      !element.addEventListener ||
      !document.contains(element)
    )
      return;

    let touchEndHandler;
    let touchStartHandler;

    if (pressableHandler) {
      pressableHandler.register(element, dynamicCallback);

      touchStartHandler = (event) => {
        event.preventDefault();
        pressableHandler.onTouchStart();
      };
    }

    const combinedHandler = (event) => {
      touchStartHandler?.(event);
      touchEndHandler = disableUserSelect(window);
    };

    const eventOptions = touchStartHandler
      ? makeEventOptions({
          passive: !pressableHandler,
        })
      : null;

    if (combinedHandler && eventOptions !== null) {
      element.addEventListener("touchstart", combinedHandler, eventOptions);
    }

    return () => {
      touchEndHandler?.();
      pressableHandler?.unRegister(element);
      if (combinedHandler && eventOptions !== null) {
        element.removeEventListener(
          "touchstart",
          combinedHandler,
          eventOptions
        );
      }
    };
  }, [dynamicCallback, ref, pressableHandler]);
}

export default useWebPressableTouchStartHandler;
