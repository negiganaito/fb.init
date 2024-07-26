/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useEffect, useRef } from "react";

import JSScheduler from "../helpers/JSScheduler";
import { setTimeoutAtPriority_DO_NOT_USE } from "../helpers/setTimeoutCometInternals";

const HOVER_IN = "onhoverin";
const PRESS_IN = "onpressin";
const HIGH_INTENT = "onhighintent";
const DEFAULT_DELAY = 50;

// eslint-disable-next-line max-params
function useCometPreloaderBase(
  preloaderType,
  preloaderCallback,
  onHoverOutCallback,
  onPressCallback,
  additionalCallbacks = {}
) {
  const highSignalTimeoutRef = useRef(null);
  const lowSignalTimeoutRef = useRef(null);
  const cleanupHoverInRef = useRef(null);
  const cleanupPressInRef = useRef(null);

  const { highSignalPreloaderCallback, lowSignalPreloaderCallback } =
    additionalCallbacks;

  const setHighSignalTimeout = (callback) => {
    highSignalTimeoutRef.current = setTimeoutAtPriority_DO_NOT_USE(
      JSScheduler.priorities.unstable_UserBlocking,
      callback,
      DEFAULT_DELAY
    );
  };

  const setLowSignalTimeout = (callback) => {
    lowSignalTimeoutRef.current = setTimeout(callback, DEFAULT_DELAY);
  };

  const handleHoverIn = useCallback(() => {
    if (
      (preloaderType === "tooltip" ||
        preloaderType === "button" ||
        preloaderType === "button_aggressive") &&
      preloaderCallback
    ) {
      const callback = () => {
        if (preloaderType === "tooltip") {
          onHoverOutCallback?.();
          highSignalPreloaderCallback?.(HOVER_IN);
          preloaderCallback?.();
        } else if (
          preloaderType === "button" ||
          preloaderType === "button_aggressive"
        ) {
          preloaderCallback?.();
          lowSignalPreloaderCallback?.(HOVER_IN);
        }
      };
      setHighSignalTimeout(callback);
    }
    if (preloaderType === "button_aggressive") {
      const callback = () => {
        onHoverOutCallback?.();
        highSignalPreloaderCallback?.(HOVER_IN);
      };
      setLowSignalTimeout(callback);
    }
  }, [
    onHoverOutCallback,
    highSignalPreloaderCallback,
    preloaderCallback,
    lowSignalPreloaderCallback,
    preloaderType,
  ]);

  const handleHoverOut = useCallback(() => {
    clearTimeout(highSignalTimeoutRef.current);
    clearTimeout(lowSignalTimeoutRef.current);
    highSignalTimeoutRef.current = null;
    lowSignalTimeoutRef.current = null;
    onPressCallback?.();
    cleanupHoverInRef.current?.();
    cleanupPressInRef.current?.();
  }, [onPressCallback]);

  const handlePressIn = useCallback(() => {
    if (preloaderType === "button" || preloaderType === "button_aggressive") {
      onHoverOutCallback?.();
      highSignalPreloaderCallback?.(PRESS_IN);
    }
  }, [highSignalPreloaderCallback, onHoverOutCallback, preloaderType]);

  const handleHighIntent = useCallback(
    (isHighIntent) => {
      JSScheduler.scheduleSpeculativeCallback(() => {
        if (isHighIntent) {
          onHoverOutCallback?.();
          preloaderCallback?.();
          lowSignalPreloaderCallback?.(HIGH_INTENT);
          highSignalPreloaderCallback?.(HIGH_INTENT);
        }
      });
    },
    [
      onHoverOutCallback,
      highSignalPreloaderCallback,
      preloaderCallback,
      lowSignalPreloaderCallback,
    ]
  );

  const handleHoverMove = useCallback(() => {
    const callback = () => {
      onHoverOutCallback?.();
      highSignalPreloaderCallback?.(HOVER_IN);
    };
    clearTimeout(lowSignalTimeoutRef.current);
    setLowSignalTimeout(callback);
  }, [onHoverOutCallback, highSignalPreloaderCallback]);

  useEffect(() => {
    return () => {
      cleanupHoverInRef.current?.();
      cleanupPressInRef.current?.();
      clearTimeout(highSignalTimeoutRef.current);
    };
  }, []);

  return {
    onHighIntentPreloader: handleHighIntent,
    onHoverInPreloader: handleHoverIn,
    onHoverMovePreloader: handleHoverMove,
    onHoverOutPreloader: handleHoverOut,
    onPressInPreloader: handlePressIn,
  };
}

export default useCometPreloaderBase;
