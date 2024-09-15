/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useEffect, useLayoutEffect, useRef } from "react";

import CometThrottle from "../faang/components/CometThrottle";

import useStable from "./useStable";

function useThrottledComet(callback, delay = 100) {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const throttledCallback = useStable(() => {
    return CometThrottle(function () {
      if (callbackRef.current) {
        callbackRef.current(arguments);
      }
    }, delay);
  });

  useEffect(() => {
    return () => {
      throttledCallback.cancel();
    };
  }, [throttledCallback]);

  return throttledCallback;
}

export default useThrottledComet;
