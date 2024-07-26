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
import React, { useContext, useEffect, useRef, useState } from "react";
import BaseView from "BaseView.react";
// import { gkx } from "gkx";
import { intersectionObserverEntryIsIntersecting } from "intersectionObserverEntryIsIntersecting";
// import { nullIntersectionObserverEntryLogger } from "nullIntersectionObserverEntryLogger";
// import { unrecoverableViolation } from "unrecoverableViolation";
import { useVirtualizationContext } from "useVirtualizationContext";
import { VirtualizationContext } from "VirtualizationContext";

import justknobx from "../../business/helpers/justknobx";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import useMergeRefs from "../../hooks/useMergeRefs";

const styles = {
  invisible: {
    display: "x1s85apg",
    $$css: true,
  },
};

const MAX_HEIGHT = 4000;
const DEFAULT_MARGIN = 0;
const JUSTKNOBX_1003 = justknobx._("1003");

function cleanString(str) {
  return typeof str.replace === "function"
    ? str.replace(/\n/g, " ").replace(/\s+/g, " ")
    : "";
}

function hasNativeIntersectionObserver() {
  if (typeof IntersectionObserver !== "function") return false;
  return typeof IntersectionObserver.toString !== "function"
    ? false
    : cleanString(IntersectionObserver.toString()).endsWith(
        "{ [native code] }"
      );
}

const hasNativeObserver = hasNativeIntersectionObserver();

const CometVirtualization = ({
  children,
  disableHidding,
  leftRightMargin = DEFAULT_MARGIN,
  pinChildrenOnInteraction,
  pinChildrenWithPlayer,
  topBottomMargin = MAX_HEIGHT,
  unmountHiddenChildren,
}) => {
  const ref = useRef(null);
  const intersectionObserverRef = useRef(null);
  const hiddenSubtreeContext = useContext(HiddenSubtreePassiveContext);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [height, setHeight] = useState(null);
  const prevShouldRender = usePrevious(shouldRender);
  const virtContext = useVirtualizationContext();

  useEffect(() => {
    const shouldSetHeight = height === null && !shouldRender;
    if (intersectionObserverRef.current !== null && shouldSetHeight) {
      setHeight(intersectionObserverRef.current.getBoundingClientRect().height);
    }
  }, [shouldRender, height, prevShouldRender]);

  const onIntersection = (entries) => {
    console.log(entries[0], `IntersectionObserverEntry is null.`);
    const { hiddenOrBackgrounded_FIXME } =
      hiddenSubtreeContext.getCurrentState();
    if (intersectionObserverEntryIsIntersecting(entries[0])) {
      setHeight(null);
      setShouldRender(true);
    } else if (!hiddenOrBackgrounded_FIXME) {
      setShouldRender(false);
    }
  };

  const rootMargin = {
    bottom: topBottomMargin,
    left: leftRightMargin,
    right: leftRightMargin,
    top: topBottomMargin,
  };

  const observerRef = useIntersectionObserver(onIntersection, {
    root: null,
    rootMargin,
    scrollMargin: { ...rootMargin },
    threshold: 0,
  });

  const mergedRef = useMergeRefs(observerRef, ref);

  const style =
    shouldRender && height !== null && unmountHiddenChildren !== false
      ? { minHeight: height }
      : undefined;

  const shouldHide = !shouldRender && height !== null;
  const hasScrollAnchor = useHasScrollAnchor();
  const shouldUseObserver = hasScrollAnchor ? mergedRef : undefined;

  const onInteraction = () => {
    if (pinChildrenOnInteraction === true) {
      setIsVisible(true);
    }
  };

  const hasPlayer =
    (pinChildrenWithPlayer ?? false) && virtContext.hasFlag("HAS_PLAYER");
  const shouldUnmount =
    hasNativeObserver &&
    JUSTKNOBX_1003 &&
    unmountHiddenChildren === true &&
    shouldHide &&
    !isVisible &&
    !virtContext.hasPin() &&
    !hasPlayer;
  const shouldHideDiv = !((disableHidding ?? false) || false) && shouldHide;

  return (
    <VirtualizationContext.Provider value={virtContext}>
      <div
        className="x78zum5 xdt5ytf"
        data-testid={undefined}
        onClickCapture={onInteraction}
        onFocusCapture={onInteraction}
        onKeyPressCapture={onInteraction}
        ref={shouldUseObserver}
        style={style}
      >
        <BaseView
          hidden={shouldHideDiv}
          ref={intersectionObserverRef}
          xstyle={shouldHideDiv && styles.invisible}
        >
          {shouldUnmount ? null : (
            <HiddenSubtreeContextProvider isHidden={shouldHideDiv}>
              {children}
            </HiddenSubtreeContextProvider>
          )}
        </BaseView>
      </div>
    </VirtualizationContext.Provider>
  );
};

CometVirtualization.displayName =
  CometVirtualization.name + " [from " + __filename + "]";

export default CometVirtualization;

function useHasScrollAnchor() {
  const [hasAnchor, setHasAnchor] = useState(null);

  useEffect(() => {
    if (hasAnchor === null) {
      setHasAnchor(() => {
        const documentElement = document?.documentElement;
        if (documentElement === null) {
          console.log(
            "Scroll anchoring feature detection called in an environment without a documentElement",
            "comet_infra"
          );
        }
        return documentElement.style.overflowAnchor !== null;
      });
    }
  }, [hasAnchor]);

  return hasAnchor ?? false;
}
