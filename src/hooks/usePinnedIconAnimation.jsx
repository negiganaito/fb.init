/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useEffect, useRef, useState } from "react";

import useDebouncedValue from "./useDebouncedValue";

const styles = {
  mountAnimationIncoming: {
    animationDuration: "x5hsz1j",
    animationName: "x1ko8byu",
    animationTimingFunction: "x4hg4is",
    ,
  },
  mountAnimationOutgoing: {
    animationDuration: "x5hsz1j",
    animationName: "x1c78tyx",
    animationTimingFunction: "x4hg4is",
    ,
  },
  unmountAnimation: {
    animationDuration: "x5hsz1j",
    animationFillMode: "x10e4vud",
    animationName: "xvma63k",
    animationTimingFunction: "x4hg4is",
    ,
  },
};

const usePinnedIconAnimation = (isPinned, isOutgoing) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const prevIsPinnedRef = useRef(isPinned);
  const mountAnimation = isOutgoing
    ? styles.mountAnimationOutgoing
    : styles.mountAnimationIncoming;

  useEffect(() => {
    if (isPinned !== prevIsPinnedRef.current) {
      setShouldAnimate(true);
    }
    prevIsPinnedRef.current = isPinned;
  }, [isPinned]);

  return {
    mountAnimation: shouldAnimate ? mountAnimation : null,
    shouldShow: useDebouncedValue(isPinned, 200),
    unmountAnimation: styles.unmountAnimation,
  };
};

export default usePinnedIconAnimation;
