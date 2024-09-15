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
  useReducer,
  useRef,
  useState,
} from "react";
import { gkx } from "gkx";

import BaseContextualLayerAnchorRootContext from "../../context/BaseContextualLayerAnchorRootContext";
import BaseContextualLayerAvailableHeightContext from "../../context/BaseContextualLayerAvailableHeightContext";
import BaseContextualLayerContextSizeContext from "../../context/BaseContextualLayerContextSizeContext";
import BaseContextualLayerLayerAdjustmentContext from "../../context/BaseContextualLayerLayerAdjustmentContext";
import BaseContextualLayerOrientationContext from "../../context/BaseContextualLayerOrientationContext";
import BaseLinkNestedPressableContext from "../../context/BaseLinkNestedPressableContext";
import BaseScrollableAreaContext from "../../context/BaseScrollableAreaContext";
import BaseViewportMarginsContext from "../../context/BaseViewportMarginsContext";
import { FDSTextContextProvider } from "../../context/FDSTextContext";
import HiddenSubtreeContext from "../../context/HiddenSubtreeContext";
import LayoutAnimationBoundaryContext from "../../context/LayoutAnimationBoundaryContext";
import getComputedStyle from "../../helpers/getComputedStyle";
import isElementFixedOrSticky from "../../helpers/isElementFixedOrSticky";
import justknobx from "../../helpers/justknobx";
import Locale from "../../helpers/Locale";
import mergeRefs from "../../helpers/mergeRefs";
import useLayoutAnimationEvents from "../../hooks/useLayoutAnimationEvents";
import useResizeObserver from "../../hooks/useResizeObserver";

import BaseContextualLayerAnchorRoot from "./BaseContextualLayerAnchorRoot";
import BaseContextualLayerDefaultContainer from "./BaseContextualLayerDefaultContainer";
import BasePortal from "./BasePortal";
import calculateBaseContextualLayerPosition from "./calculateBaseContextualLayerPosition";
import { FocusRegion } from "./FocusRegion.react";
import {
  headerFirstTabbableSecondScopeQuery,
  tabbableScopeQuery,
} from "./focusScopeQueries";
import { LayoutAnimationEventType } from "./LayoutAnimationEvents";

const VIEWPORT_MARGIN = 8;
const IS_RTL = Locale.isRTL();
const styles = {
  root: {
    left: "xu96u03",
    start: null,
    end: null,
    marginRight: "xm80bdy",
    marginStart: null,
    marginEnd: null,
    position: "x10l6tqk",
    top: "x13vifvy",
    ,
  },
  rootReflowToPosition: {
    marginRight: "x1yf7rl7",
    marginStart: null,
    marginEnd: null,
    top: "x80663w",
    ,
  },
};

function getRect(element) {
  const rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    top: rect.top,
  };
}

function getScrollTop(scrollableAreas) {
  return (
    scrollableAreas[scrollableAreas.length - 1]?.getDOMNode()?.scrollTop ??
    window.pageYOffset
  );
}

function getScrollLeft(scrollableAreas) {
  return (
    scrollableAreas[scrollableAreas.length - 1]?.getDOMNode()?.scrollLeft ??
    window.pageXOffset
  );
}

function getOffsetParent(element) {
  const style = getComputedStyle(element);
  return style !== null && style.getPropertyValue("position") !== "static"
    ? element
    : (element instanceof HTMLElement && element.offsetParent) ||
        element.ownerDocument.documentElement;
}

function getIntersection(rect1, rect2) {
  if (
    rect1.bottom < rect2.top ||
    rect2.bottom < rect1.top ||
    rect1.right < rect2.left ||
    rect2.right < rect1.left
  ) {
    return null;
  }
  return {
    bottom: Math.min(rect1.bottom, rect2.bottom),
    left: Math.max(rect1.left, rect2.left),
    right: Math.min(rect1.right, rect2.right),
    top: Math.max(rect1.top, rect2.top),
  };
}

function initializeState(initialPosition) {
  return {
    adjustment: null,
    availableHeight: null,
    contextSize: null,
    isPositionIndeterminate: false,
    position: initialPosition,
  };
}

function positionReducer(state, action) {
  switch (action.type) {
    case "determine_direction":
      if (
        state.position !== action.position ||
        state.availableHeight !== action.availableHeight
      ) {
        return {
          ...state,
          availableHeight: action.availableHeight,
          position: action.position,
        };
      }
      break;
    case "reposition":
      if (
        state.adjustment !== action.adjustment ||
        state.contextSize?.height !== action.contextSize?.height ||
        state.contextSize?.width !== action.contextSize?.width
      ) {
        return {
          ...state,
          adjustment: action.adjustment,
          contextSize: action.contextSize,
          isPositionIndeterminate: false,
        };
      }
      break;
    case "position_indeterminate":
      return { ...state, isPositionIndeterminate: true };
    case "position_changed":
      if (state.position !== action.position) {
        return { ...state, position: action.position };
      }
      break;
  }
  return state;
}

const BaseContextualLayer = React.forwardRef(
  (
    {
      align = "start",
      disableAutoAlign = false,
      children,
      containFocus = false,
      customContainer = BaseContextualLayerDefaultContainer,
      disableAutoFlip = false,
      hidden = false,
      imperativeRef,
      onEscapeFocusRegion,
      onIndeterminatePosition,
      presencePayload,
      reflowToPosition = false,
      position = "below",
      restoreFocus = true,
      stopClickPropagation = false,
      xstyle,
      ...rest
    },
    ref
  ) => {
    const CustomContainer = customContainer;
    const [state, dispatch] = useReducer(
      positionReducer,
      position,
      initializeState
    );
    const {
      adjustment,
      availableHeight,
      contextSize,
      isPositionIndeterminate,
      position: currentPosition,
    } = state;

    const anchorRoot = useContext(BaseContextualLayerAnchorRootContext);
    const scrollableAreas = useContext(BaseScrollableAreaContext);
    const viewportMargins = useContext(BaseViewportMarginsContext);
    const layoutAnimationBoundary = useContext(LayoutAnimationBoundaryContext);

    const [isAnimating, setIsAnimating] = useState(false);
    const { hidden: hiddenFromContext } = useContext(HiddenSubtreeContext);
    const isHidden = hiddenFromContext || hidden;

    const layerRef = useRef(null);
    const contextSizeRef = useRef(null);

    const getContext = useCallback(() => {
      return rest.context_DEPRECATED === null && rest.contextRef !== null
        ? rest.contextRef.current
        : rest.context_DEPRECATED;
    }, [rest.contextRef, rest.context_DEPRECATED]);

    const getViewportRects = useCallback(() => {
      const root = document.documentElement;
      if (root === null) return;
      return {
        bottom: root.clientHeight - viewportMargins.bottom - VIEWPORT_MARGIN,
        left: viewportMargins.left + VIEWPORT_MARGIN,
        right: root.clientWidth - viewportMargins.right - VIEWPORT_MARGIN,
        top: viewportMargins.top + VIEWPORT_MARGIN,
      };
    }, [
      viewportMargins.bottom,
      viewportMargins.left,
      viewportMargins.right,
      viewportMargins.top,
    ]);

    // eslint-disable-next-line complexity
    const determineDirection = useCallback(() => {
      const layer = layerRef.current;
      const context = getContext();
      const viewportRects = getViewportRects();
      if (layer === null || context === null || viewportRects === null) return;

      const contextRect = getRect(context);
      const layerRect = getRect(layer);
      const layerHeight = layerRect.bottom - layerRect.top;
      const layerWidth = layerRect.right - layerRect.left;

      const startPosition = IS_RTL ? "start" : "end";
      const endPosition = IS_RTL ? "end" : "start";
      let newPosition = currentPosition;
      let availableHeight = null;

      if (!disableAutoFlip) {
        if (currentPosition === "above" || currentPosition === "below") {
          if (
            currentPosition === "above" &&
            contextRect.top - layerHeight < viewportRects.top &&
            contextRect.bottom + layerHeight < viewportRects.bottom
          ) {
            newPosition = "below";
          } else if (
            currentPosition === "above" &&
            getScrollTop(scrollableAreas) + contextRect.top < layerHeight
          ) {
            newPosition = "below";
          } else if (
            currentPosition === "below" &&
            contextRect.bottom + layerHeight > viewportRects.bottom &&
            contextRect.top - layerHeight > viewportRects.top
          ) {
            newPosition = "above";
          }
        } else if (currentPosition === "start" || currentPosition === "end") {
          if (
            currentPosition === endPosition &&
            contextRect.left - layerWidth < viewportRects.left &&
            contextRect.right + layerWidth < viewportRects.right
          ) {
            newPosition = startPosition;
          } else if (
            currentPosition === startPosition &&
            contextRect.right + layerWidth > viewportRects.right &&
            contextRect.left - layerWidth > viewportRects.left
          ) {
            newPosition = endPosition;
          }
        }
      }

      if (newPosition === "above" || newPosition === "below") {
        availableHeight =
          newPosition === "above"
            ? contextRect.top - viewportRects.top
            : viewportRects.bottom - contextRect.bottom;
      }

      contextSizeRef.current = { height: layerHeight, width: layerWidth };
      dispatch({
        availableHeight,
        position: newPosition,
        type: "determine_direction",
      });
    }, [
      getContext,
      getViewportRects,
      currentPosition,
      disableAutoFlip,
      scrollableAreas,
    ]);

    // eslint-disable-next-line complexity
    const reposition = useCallback(() => {
      const root = document.documentElement;
      const anchorElement = anchorRoot.current;
      const viewportRects = getViewportRects();
      const context = getContext();

      if (
        root === null ||
        anchorElement === null ||
        viewportRects === null ||
        context === null
      )
        return;

      const offsetParent = getOffsetParent(anchorElement);
      if (offsetParent === null) return;

      const isFixed = isElementFixedOrSticky(anchorElement);
      const isContextFixed =
        !isFixed && context.nodeType === 1 && isElementFixedOrSticky(context);

      const contextRect = scrollableAreas
        .map((area) => area.getDOMNode())
        .filter(Boolean)
        .filter((node) => offsetParent.contains(node))
        .reduce(
          (acc, node) => getIntersection(acc, getRect(node)),
          getRect(context)
        );

      if (
        contextRect === null ||
        (contextRect.left === 0 && contextRect.right === 0)
      ) {
        dispatch({ type: "position_indeterminate" });
        onIndeterminatePosition && onIndeterminatePosition();
        return;
      }

      const offsetRect = isContextFixed
        ? {
            bottom: root.clientHeight,
            left: 0,
            right: root.clientWidth,
            top: 0,
          }
        : getRect(offsetParent);

      const { adjustment, style, translatePositionY } =
        calculateBaseContextualLayerPosition({
          align,
          contextRect,
          contextualLayerSize: disableAutoAlign ? null : contextSizeRef.current,
          fixed: isContextFixed,
          offsetRect,
          position: currentPosition,
          screenRect: viewportRects,
        });

      const layer = layerRef.current;
      let finalStyle = style;
      const isReflowSheet = gkx("7742");
      const MARGIN = 8;

      if (justknobx._("432")) {
        const bottomSpace = offsetRect.bottom - translatePositionY;
        const overflowY = (contextSizeRef.current?.height ?? 0) - bottomSpace;
        let adjustedTranslateY = translatePositionY;
        if (overflowY > 0) {
          adjustedTranslateY = translatePositionY - overflowY - MARGIN;
        }

        finalStyle =
          reflowToPosition === true
            ? {
                height: null,
                left: MARGIN + "px",
                position: isContextFixed ? "fixed" : "absolute",
                right: MARGIN + "px",
                top: adjustedTranslateY + "px",
                transform: `translateX(${getScrollLeft(scrollableAreas)}px)`,
                "z-index": isReflowSheet ? "299" : "3",
              }
            : {
                ...style,
                left: null,
                position: null,
                right: null,
                top: null,
                "z-index": null,
              };
      }

      if (layer !== null) {
        Object.keys(finalStyle).forEach((key) => {
          const value = finalStyle[key];
          value !== null
            ? layer.style.setProperty(key, value)
            : layer.style.removeProperty(key);
        });
      }

      dispatch({
        adjustment,
        contextSize: {
          height: contextRect.bottom - contextRect.top,
          width: contextRect.right - contextRect.left,
        },
        type: "reposition",
      });
    }, [
      anchorRoot,
      getViewportRects,
      getContext,
      scrollableAreas,
      align,
      disableAutoAlign,
      currentPosition,
      onIndeterminatePosition,
      reflowToPosition,
    ]);

    const handleLayoutAnimationEvent = useCallback(
      (event) => {
        if (event === LayoutAnimationEventType.Start) {
          setIsAnimating(true);
        }
        if (event === LayoutAnimationEventType.Stop) {
          setIsAnimating(false);
          reposition();
        }
      },
      [reposition, setIsAnimating]
    );

    useLayoutEffect(() => {
      if (
        layoutAnimationBoundary !== null &&
        layoutAnimationBoundary.getIsAnimating()
      ) {
        handleLayoutAnimationEvent(LayoutAnimationEventType.Start);
      }
    }, [layoutAnimationBoundary, handleLayoutAnimationEvent]);

    useLayoutAnimationEvents(handleLayoutAnimationEvent);

    useImperativeHandle(
      imperativeRef,
      () => ({
        reposition: (options) => {
          if (!isHidden) {
            options = options || {};
            const { autoflip = false } = options;
            autoflip && determineDirection();
            reposition();
          }
        },
      }),
      [isHidden, reposition, determineDirection]
    );

    const handleResize = useResizeObserver(({ height, width }) => {
      contextSizeRef.current = { height, width };
      reposition();
    });

    const prevPositionRef = useRef(position);
    useLayoutEffect(() => {
      if (position !== prevPositionRef.current) {
        dispatch({ position, type: "position_changed" });
        if (!isHidden) {
          determineDirection();
          reposition();
        }
        prevPositionRef.current = position;
      }
    });

    const handleLayerRef = useCallback(
      (node) => {
        layerRef.current = node;
        if (node !== null && !isHidden) {
          determineDirection();
          reposition();
        }
      },
      [isHidden, determineDirection, reposition]
    );

    useEffect(() => {
      if (isHidden) return;
      const handleResize = () => {
        determineDirection();
        reposition();
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [isHidden, determineDirection, reposition]);

    useEffect(() => {
      if (isHidden) return;
      const scrollableNodes = scrollableAreas
        .map((area) => area.getDOMNode())
        .filter(Boolean);
      if (scrollableNodes.length > 0) {
        scrollableNodes.forEach((node) =>
          node.addEventListener("scroll", reposition, { passive: true })
        );
        return () => {
          scrollableNodes.forEach((node) =>
            node.removeEventListener("scroll", reposition, { passive: true })
          );
        };
      }
    }, [isHidden, reposition, scrollableAreas]);

    useEffect(() => {
      if (window.addEventListener === null || isHidden) return;
      window.addEventListener("scroll", reposition, { passive: true });
      return () => {
        window.removeEventListener("scroll", reposition, { passive: true });
      };
    }, [isHidden, reposition]);

    const combinedRef = useMemo(
      () => mergeRefs(handleLayerRef, handleResize, ref),
      [handleLayerRef, handleResize, ref]
    );

    const contextValue = useMemo(
      () => ({ align, position: currentPosition }),
      [align, currentPosition]
    );

    const isLayerHidden = hidden || isPositionIndeterminate || isAnimating;

    return (
      <BasePortal target={anchorRoot.current}>
        <CustomContainer
          hidden={isLayerHidden}
          presencePayload={presencePayload}
          ref={combinedRef}
          stopClickPropagation={stopClickPropagation}
          testid={undefined}
          xstyle={[
            styles.root,
            reflowToPosition === true ? styles.rootReflowToPosition : null,
            xstyle,
          ]}
        >
          <FocusRegion
            autoFocusQuery={
              !isLayerHidden && containFocus
                ? headerFirstTabbableSecondScopeQuery
                : null
            }
            autoRestoreFocus={!isLayerHidden && restoreFocus}
            containFocusQuery={
              !isLayerHidden && containFocus ? tabbableScopeQuery : null
            }
            onEscapeFocusRegion={onEscapeFocusRegion}
            recoverFocusQuery={
              isLayerHidden ? null : headerFirstTabbableSecondScopeQuery
            }
          >
            <BaseContextualLayerAnchorRoot>
              <BaseContextualLayerContextSizeContext.Provider
                value={contextSize}
              >
                <BaseContextualLayerLayerAdjustmentContext.Provider
                  value={adjustment}
                >
                  <BaseContextualLayerAvailableHeightContext.Provider
                    value={availableHeight}
                  >
                    <BaseContextualLayerOrientationContext.Provider
                      value={contextValue}
                    >
                      <BaseLinkNestedPressableContext.Provider value={false}>
                        <FDSTextContextProvider color={null} type={null}>
                          {children}
                        </FDSTextContextProvider>
                      </BaseLinkNestedPressableContext.Provider>
                    </BaseContextualLayerOrientationContext.Provider>
                  </BaseContextualLayerAvailableHeightContext.Provider>
                </BaseContextualLayerLayerAdjustmentContext.Provider>
              </BaseContextualLayerContextSizeContext.Provider>
            </BaseContextualLayerAnchorRoot>
          </FocusRegion>
        </CustomContainer>
      </BasePortal>
    );
  }
);

BaseContextualLayer.displayName = `BaseContextualLayer [from ${__filename}]`;

export default BaseContextualLayer;
