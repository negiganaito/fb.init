/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import emptyFunction from "fbjs/lib/emptyFunction";
import joinClasses from "fbjs/lib/joinClasses";

import useBoolean from "../../hooks/useBoolean";
import useOnUpdateEffect from "../../hooks/useOnUpdateEffect";
import AbstractSidebarNavigationActiveContext from "../contexts/AbstractSidebarNavigationActiveContext";
import AbstractSidebarNavigationDisplayContext from "../contexts/AbstractSidebarNavigationDisplayContext";
import useShallowEqualMemo from "../hooks/useShallowEqualMemo";

const TIMEOUT_MS = 300;

const AbstractSidebarNavigation = ({
  actions,
  children,
  className,
  containerRef,
  "data-testid": dataTestId,
  flyout = null,
  footer,
  header,
  isCollapsed,
  isCollapsible = false,
  isExpandableOnHover = false,
  isExpansionPersistent = false,
  isUniquelyExpandable = false,
  onChange,
  onCollapsedChange,
  onHoveredChange,
  style,
  value,
}) => {
  const activeContext = useMemo(
    () => ({
      onChange,
      value,
    }),
    [onChange, value]
  );

  const {
    state,
    cancelExpandRequest,
    freeze,
    onCollapse,
    onExpand,
    onMouseEnter,
    onMouseLeave,
    unfreeze,
  } = useSidebarNavigationState(
    onCollapsedChange,
    onHoveredChange,
    isCollapsed
  );

  const collapsed = isCollapsed ?? (isCollapsible && state.isCollapsed);
  const hovered = isExpandableOnHover && collapsed && state.isHovered;
  const actualCollapsed = collapsed && !hovered;

  const displayContextValue = useShallowEqualMemo({
    cancelExpandRequest,
    freeze,
    isCollapsed: actualCollapsed,
    isCollapsible,
    isExpandableOnHover,
    isExpansionPersistent,
    isHovered: hovered,
    isUniquelyExpandable,
    onCollapse,
    onExpand,
    requestExpand: onMouseEnter,
    unfreeze,
  });

  return (
    <div
      className={joinClasses(
        className,
        `${actualCollapsed ? "_739b" : ""}${actualCollapsed ? "" : " _739c"}${
          hovered ? " _7_o9" : ""
        }`
      )}
      ref={containerRef}
      style={style}
      onMouseEnter={isExpandableOnHover ? onMouseEnter : null}
      onMouseLeave={isExpandableOnHover ? onMouseLeave : null}
      data-testid={dataTestId}
    >
      <AbstractSidebarNavigationActiveContext.Provider value={activeContext}>
        <AbstractSidebarNavigationDisplayContext.Provider
          value={displayContextValue}
        >
          {flyout}
          {header}
          {children}
          {actions !== null && <ul className="_739d">{actions}</ul>}
          {footer}
        </AbstractSidebarNavigationDisplayContext.Provider>
      </AbstractSidebarNavigationActiveContext.Provider>
    </div>
  );
};

AbstractSidebarNavigation.displayName = `${AbstractSidebarNavigation.name}`;

function sidebarNavigationReducer(state, action) {
  switch (action.type) {
    case "hoverOn":
      return state.isHoverable ? { ...state, isHovered: true } : state;
    case "hoverOff":
      return { ...state, isHovered: false, isHoverable: true };
    case "collapse":
      return {
        ...state,
        isCollapsed: true,
        isHovered: false,
        isHoverable: false,
      };
    case "expand":
      return { ...state, isCollapsed: false };
    default:
      return state;
  }
}

function usePreviousValue(value, isFrozen) {
  const ref = useRef(value);
  useEffect(() => {
    if (!isFrozen) {
      ref.current = value;
    }
  }, [value, isFrozen]);
  return isFrozen ? ref.current : value;
}

function useSidebarNavigationState(
  onCollapsedChange = emptyFunction,
  onHoveredChange = emptyFunction,
  isCollapsed
) {
  const [state, dispatch] = useReducer(sidebarNavigationReducer, {
    isCollapsed: false,
    isHovered: false,
    isHoverable: true,
  });
  const [isFrozen, freeze, unfreeze] = useBoolean(false);

  const previousState = usePreviousValue(state, isFrozen);
  const actualCollapsed = isCollapsed ?? previousState.isCollapsed;

  const handleCollapseChange = useCallbackRef(onCollapsedChange);
  const handleHoverChange = useCallbackRef(onHoveredChange);

  useOnUpdateEffect(() => {
    handleHoverChange?.(previousState.isHovered);
  }, [previousState.isHovered, handleHoverChange]);

  const onCollapse = useCallback(() => {
    dispatch({ type: "collapse" });
    if (!actualCollapsed) handleCollapseChange?.(true);
  }, [actualCollapsed, handleCollapseChange]);

  const onExpand = useCallback(() => {
    dispatch({ type: "expand" });
    if (actualCollapsed) handleCollapseChange?.(false);
  }, [actualCollapsed, handleCollapseChange]);

  const cancelExpandRequest = useCallback(() => {
    window.clearTimeout(timeoutRef.current);
  }, []);

  const onMouseEnter = useCallback(() => {
    cancelExpandRequest();
    timeoutRef.current = window.setTimeout(
      () => dispatch({ type: "hoverOn" }),
      TIMEOUT_MS
    );
  }, [cancelExpandRequest]);

  const onMouseLeave = useCallback(() => {
    cancelExpandRequest();
    timeoutRef.current = window.setTimeout(
      () => dispatch({ type: "hoverOff" }),
      TIMEOUT_MS
    );
  }, [cancelExpandRequest]);

  const timeoutRef = useRef(null);
  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  return {
    state: { ...previousState, isCollapsed: actualCollapsed },
    cancelExpandRequest,
    freeze,
    onCollapse,
    onExpand,
    onMouseEnter,
    onMouseLeave,
    unfreeze,
  };
}

function useCallbackRef(callback) {
  const ref = useRef(callback);
  useLayoutEffect(() => {
    ref.current = callback;
  }, [callback]);
  return useCallback((...args) => ref.current(...args), []);
}

export default AbstractSidebarNavigation;
