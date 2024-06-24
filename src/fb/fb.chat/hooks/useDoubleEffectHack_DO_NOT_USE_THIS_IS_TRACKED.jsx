/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useEffect, useRef } from "react";

const useDoubleEffectHack_DO_NOT_USE_THIS_IS_TRACKED = (effect, deps) => {
  const timeoutRef = useRef(null);
  const effectRef = useRef();

  useEffect(() => {
    const handleCleanup = () => {
      timeoutRef.current = null;
      const effectResult = effectRef.current;
      effectResult && effectResult();
    };

    const timeoutId = timeoutRef.current;
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutRef.current = null;
    } else {
      effectRef.current = effect();
    }

    return () => {
      timeoutRef.current = setTimeout(handleCleanup, 0);
    };
  }, []);
};

export default useDoubleEffectHack_DO_NOT_USE_THIS_IS_TRACKED;
