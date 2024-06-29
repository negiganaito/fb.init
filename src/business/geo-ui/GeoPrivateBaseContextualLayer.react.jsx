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
import React, {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Locale from "fbjs/lib/Locale";

import BaseContextualLayerOrientationContext from "../../context/BaseContextualLayerOrientationContext";
import BaseContextualLayerAnchorRootContext from "../contexts/BaseContextualLayerAnchorRootContext";
import isElementFixedOrSticky from "../helpers/isElementFixedOrSticky";
import mergeRefs from "../helpers/mergeRefs";

import { makeGeoComponent } from "./GeoPrivateMakeComponent";

const { isRTL } = Locale;

const defaultStyles = {
  root: {
    left: "xu96u03",
    marginRight: "xm80bdy",
    position: "x10l6tqk",
    top: "x13vifvy",
    $$css: true,
  },
};

function getBoundingClientRect(element) {
  const rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    top: rect.top,
  };
}

function getPositionedParent(element) {
  const style = getComputedStyle(element);
  if (style?.getPropertyValue("position") !== "static") {
    return element;
  }

  const offsetParent = element.offsetParent;
  const documentElement = element.ownerDocument.documentElement;

  return offsetParent || documentElement;
}

const OFFSET = 8;

function getIntersection(rect1, rect2) {
  return rect1.bottom < rect2.top ||
    rect2.bottom < rect1.top ||
    rect1.right < rect2.left ||
    rect2.right < rect2.left
    ? null
    : {
        bottom: Math.min(rect1.bottom, rect2.bottom),
        left: Math.max(rect1.left, rect2.left),
        right: Math.min(rect1.right, rect2.right),
        top: Math.max(rect1.top, rect2.top),
      };
}

function alignPosition(position) {
  switch (position) {
    case "stretch-end":
    case "stretch-start":
      return "stretch";
    default:
      return position;
  }
}

function adjustPosition(viewport, context, currentPosition) {
  if (currentPosition === "above" || currentPosition === "below") {
    const bottomDiff = viewport.bottom - context.bottom;
    const topDiff = context.top - viewport.top;
    return topDiff < bottomDiff ? "below" : "above";
  } else {
    const rtlStart = isRTL ? "start" : "end";
    const rtlEnd = isRTL ? "end" : "start";
    const leftDiff = context.left - viewport.left;
    const rightDiff = viewport.right - context.right;
    return rightDiff < leftDiff ? rtlStart : rtlEnd;
  }
}

const BaseContextualLayer = ({
  align = "start",
  autoFocus,
  autoRestoreFocus,
  children,
  containerRef,
  containFocus = false,
  "data-testid": dataTestId = "ContextualLayerRoot",
  disableAutoAlign = false,
  disableAutoFlip = false,
  hidden = false,
  imperativeRef,
  onIndeterminatePosition,
  position = "below",
  xstyle,
  context,
  contextRef,
  ...restProps
}) => {
  const isPositionInitialized = useRef(false);
  const [currentPosition, setCurrentPosition] = useState(position);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [adjustment, setAdjustment] = useState(null);
  const [isIndeterminate, setIsIndeterminate] = useState(false);

  const layerRef = useRef(null);
  const sizeRef = useRef(null);

  const anchorRootContext = useContext(BaseContextualLayerAnchorRootContext);
  const scrollableAreaContext = useContext(BaseScrollableAreaContext);
  const viewportMarginsContext = useContext(BaseViewportMarginsContext);
  const hiddenSubtreeContext = useContext(HiddenSubtreeContext);
  const hiddenSubtreeHidden = hiddenSubtreeContext.hidden || hidden;

  const isRTL = useMemo(() => Locale.isRTL(), []);

  const recomputePosition = useCallback(() => {
    const layer = layerRef.current;
    const html = document.documentElement;
    let contextElement = context;
    if (!context && !contextElement && contextRef) {
      contextElement = contextRef.current;
    }
    if (!layer || !contextElement || disableAutoFlip || !html) return;

    const contextRect = getBoundingClientRect(contextElement);
    const layerRect = getBoundingClientRect(layer);
    const viewportRect = {
      bottom: html.clientHeight - viewportMarginsContext.bottom - OFFSET,
      left: viewportMarginsContext.left + OFFSET,
      right: html.clientWidth - viewportMarginsContext.right - OFFSET,
      top: viewportMarginsContext.top + OFFSET,
    };
    const layerHeight = layerRect.bottom - layerRect.top;
    const layerWidth = layerRect.right - layerRect.left;
    sizeRef.current = { height: layerHeight, width: layerWidth };

    const rtlStart = isRTL ? "start" : "end";
    const rtlEnd = isRTL ? "end" : "start";

    const positionAbove =
      currentPosition === "above" && layerRect.top < viewportRect.top;
    const positionBelow =
      currentPosition === "below" && layerRect.bottom > viewportRect.bottom;
    const positionStart =
      currentPosition === rtlStart && layerRect.left < viewportRect.left;
    const positionEnd =
      currentPosition === rtlEnd && layerRect.right > viewportRect.right;

    if (positionAbove || positionBelow || positionStart || positionEnd) {
      setCurrentPosition(
        adjustPosition(viewportRect, contextRect, currentPosition)
      );
    }
  }, [
    disableAutoFlip,
    currentPosition,
    context,
    contextRef,
    viewportMarginsContext.bottom,
    viewportMarginsContext.left,
    viewportMarginsContext.right,
    viewportMarginsContext.top,
  ]);

  // eslint-disable-next-line complexity
  const updateLayerPosition = useCallback(() => {
    const html = document.documentElement;
    const anchorRoot = anchorRootContext.current;
    if (!html || !anchorRoot) return;

    const positionedParent = getPositionedParent(anchorRoot);
    if (!positionedParent) return;

    let contextElement = context;
    if (!context && !contextElement && contextRef) {
      contextElement = contextRef.current;
    }
    if (!contextElement) return;

    const isAnchorFixedOrSticky = isElementFixedOrSticky(anchorRoot);
    const isContextFixedOrSticky =
      !isAnchorFixedOrSticky && isElementFixedOrSticky(contextElement);

    const scrollableRects = scrollableAreaContext
      .map((area) => area.getDOMNode())
      .filter(Boolean)
      .filter((node) => positionedParent.contains(node))
      .reduce(
        (acc, node) =>
          acc ? getIntersection(acc, getBoundingClientRect(node)) : null,
        getBoundingClientRect(contextElement)
      );

    if (
      !scrollableRects ||
      (scrollableRects.left === 0 && scrollableRects.right === 0)
    ) {
      setIsIndeterminate(true);
      onIndeterminatePosition && onIndeterminatePosition();
      return;
    }

    const viewportRect = isContextFixedOrSticky
      ? { bottom: html.clientHeight, left: 0, right: html.clientWidth, top: 0 }
      : getBoundingClientRect(positionedParent);

    const currentSize = sizeRef.current;
    let _adjusment;
    if (isPositionInitialized.current && currentSize && !disableAutoAlign) {
      const viewportRect = {
        bottom: html.clientHeight - viewportMarginsContext.bottom - OFFSET,
        left: viewportMarginsContext.left + OFFSET,
        right: html.clientWidth - viewportMarginsContext.right - OFFSET,
        top: viewportMarginsContext.top + OFFSET,
      };

      if (currentPosition === "start" || currentPosition === "end") {
        let start;
        let end;
        if (align === "middle") {
          const middle = (scrollableRects.bottom + scrollableRects.top) / 2;
          start = middle - currentSize.height / 2;
          end = middle + currentSize.height / 2;
        } else if (align === "start" || align === "stretch-start") {
          start = scrollableRects.top;
          end = scrollableRects.top + currentSize.height;
        } else if (align === "end" || align === "stretch-end") {
          start = scrollableRects.bottom - currentSize.height;
          end = scrollableRects.bottom;
        }

        if (start !== null && end !== null) {
          if (start < viewportRect.top) {
            const diff = scrollableRects.bottom - start;
            const viewportDiff = viewportRect.top - start;
            _adjusment = Math.min(diff, viewportDiff);
          } else if (end > viewportRect.bottom) {
            const diff = scrollableRects.top - end;
            const viewportDiff = viewportRect.bottom - end;
            _adjusment = Math.max(diff, viewportDiff);
          }
        }
      } else if (currentPosition === "above" || currentPosition === "below") {
        let start;
        let end;
        const rtlStart = isRTL ? "start" : "end";
        const rtlEnd = isRTL ? "end" : "start";
        if (align === "middle") {
          const middle = (scrollableRects.right + scrollableRects.left) / 2;
          start = middle - currentSize.width / 2;
          end = middle + currentSize.width / 2;
        } else if (align === rtlEnd || align === `stretch-${rtlEnd}`) {
          start = scrollableRects.left;
          end = scrollableRects.left + currentSize.width;
        } else if (align === rtlStart || align === `stretch-${rtlStart}`) {
          start = scrollableRects.right - currentSize.width;
          end = scrollableRects.right;
        }

        if (start !== null && end !== null) {
          if (start < viewportRect.left) {
            const diff = scrollableRects.right - start;
            const viewportDiff = viewportRect.left - start;
            _adjusment = Math.min(diff, viewportDiff);
          } else if (end > viewportRect.right) {
            const diff = scrollableRects.left - end;
            const viewportDiff = viewportRect.right - end;
            _adjusment = Math.max(diff, viewportDiff);
          }
        }
      }
    }

    const positioningStyles =
      getGeoPrivateBaseContextualLayerPositioningStyles_DEPRECATED({
        adjustment: _adjusment,
        align: alignPosition(align),
        contextRect: scrollableRects,
        fixed: isContextFixedOrSticky,
        offsetRect: viewportRect,
        position: currentPosition,
      });

    const layer = layerRef.current;
    if (layer) {
      Object.keys(positioningStyles).forEach((key) => {
        const value = positioningStyles[key];
        value !== null
          ? layer.style.setProperty(key, value)
          : layer.style.removeProperty(key);
      });
    }

    isPositionInitialized.current = true;
    setIsIndeterminate(false);
    setHeight(scrollableRects.bottom - scrollableRects.top);
    setWidth(scrollableRects.right - scrollableRects.left);
    setAdjustment(_adjusment);
  }, [
    anchorRootContext,
    context,
    contextRef,
    scrollableAreaContext,
    disableAutoAlign,
    align,
    currentPosition,
    onIndeterminatePosition,
    viewportMarginsContext,
    isRTL,
  ]);

  useImperativeHandle(
    imperativeRef,
    () => ({
      reposition: ({ autoflip = false } = {}) => {
        if (autoflip) {
          recomputePosition();
        }
        updateLayerPosition();
      },
    }),
    [updateLayerPosition, recomputePosition]
  );

  const resizeObserver = useResizeObserver((entry) => {
    const { height, width } = entry;
    sizeRef.current = { height, width };
  });

  const isHidden = hidden || isIndeterminate;

  const layerRefCallback = useCallback(
    (element) => {
      layerRef.current = element;
      if (element && !isHidden) {
        if (!isPositionInitialized.current) {
          updateLayerPosition();
        }
        recomputePosition();
        updateLayerPosition();
      } else if (!element) {
        isPositionInitialized.current = false;
      }
    },
    [isHidden, updateLayerPosition, recomputePosition]
  );

  const combinedRefs = useMemo(
    () => mergeRefs(layerRefCallback, resizeObserver, containerRef),
    [resizeObserver, containerRef]
  );

  const orientationContextValue = useMemo(
    () => ({ align: alignPosition(align), position: currentPosition }),
    [align, currentPosition]
  );

  const contextSizeValue = useMemo(
    () => (height !== null && width !== null ? { height, width } : null),
    [height, width]
  );

  const initialPositionRef = useRef(position);

  useLayoutEffect(() => {
    if (position !== initialPositionRef.current) {
      setCurrentPosition(position);
      recomputePosition();
      updateLayerPosition();
      initialPositionRef.current = position;
    }
  }, [position, updateLayerPosition, recomputePosition]);

  useEffect(() => {
    if (hiddenSubtreeHidden) return;

    const handleResize = () => {
      recomputePosition();
      updateLayerPosition();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [hiddenSubtreeHidden, recomputePosition, updateLayerPosition]);

  useEffect(() => {
    if (hiddenSubtreeHidden) return;

    const scrollableAreas = scrollableAreaContext
      .map((area) => area.getDOMNode())
      .filter(Boolean);

    if (scrollableAreas.length > 0) {
      scrollableAreas.forEach((area) =>
        area.addEventListener("scroll", updateLayerPosition, {
          passive: true,
        })
      );

      return () => {
        scrollableAreas.forEach((area) =>
          area.removeEventListener("scroll", updateLayerPosition, {
            passive: true,
          })
        );
      };
    }

    window.addEventListener("scroll", updateLayerPosition, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateLayerPosition, {
        passive: true,
      });
    };
  }, [hiddenSubtreeHidden, updateLayerPosition, scrollableAreaContext]);

  return (
    <GeoPrivateBasePortal target={anchorRootContext.current}>
      <LegacyHidden
        htmlAttributes={{
          "data-testid": dataTestId,
          className: stylex(defaultStyles.root, xstyle),
        }}
        mode={isHidden ? "hidden" : "visible"}
        ref={combinedRefs}
      >
        <FocusRegion
          autoFocusQuery={
            !isHidden && (autoFocus ?? containFocus)
              ? focusScopeQueries.headerFirstTabbableSecondScopeQuery
              : null
          }
          autoRestoreFocus={autoRestoreFocus ?? !isHidden}
          containFocusQuery={
            isHidden ? null : focusScopeQueries.tabbableScopeQuery
          }
          recoverFocusQuery={
            isHidden
              ? null
              : focusScopeQueries.headerFirstTabbableSecondScopeQuery
          }
        >
          <BaseContextualLayerAnchorRoot>
            <BaseContextualLayerContextSizeContext.Provider
              value={contextSizeValue}
            >
              <BaseContextualLayerLayerAdjustmentContext.Provider
                value={adjustment}
              >
                <BaseContextualLayerOrientationContext.Provider
                  value={orientationContextValue}
                >
                  {children}
                </BaseContextualLayerOrientationContext.Provider>
              </BaseContextualLayerLayerAdjustmentContext.Provider>
            </BaseContextualLayerContextSizeContext.Provider>
          </BaseContextualLayerAnchorRoot>
        </FocusRegion>
      </LegacyHidden>
    </GeoPrivateBasePortal>
  );
};

BaseContextualLayer.displayName = `${
  BaseContextualLayer.name
} [from ${"BaseContextualLayerId"}]`;
const BaseContextualLayerComponent = makeGeoComponent(
  "BaseContextualLayer",
  BaseContextualLayer
);
export default BaseContextualLayerComponent;
