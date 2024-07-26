/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback, useContext, useRef, useState } from "react";
import stylex from "@stylexjs/stylex";
import joinClasses from "fbjs/lib/joinClasses";
import gkx from "gkx";

import useWebPressableTouchStartHandler from "../../business/hooks/useWebPressableTouchStartHandler";
import WebPressableGroupContext from "../../context/WebPressableGroupContext";
import useMergeRefs from "../../hooks/useMergeRefs";

import { usePressability } from "./Pressability";

const accessibilityRoles = ["menuitem", "tab", "none"];
const tagMap = {
  article: "article",
  banner: "header",
  complementary: "aside",
  contentinfo: "footer",
  figure: "figure",
  form: "form",
  heading: "h1",
  label: "label",
  link: "a",
  list: "ul",
  listitem: "li",
  main: "main",
  navigation: "nav",
  none: "div",
  region: "section",
};

function getTag(role, link) {
  let tag = "div";
  if (
    (link?.url !== null && link?.url !== "#") ||
    (accessibilityRoles.includes(role) && link?.url !== null)
  ) {
    tag = "a";
  } else if (role !== null) {
    tag = tagMap[role] ?? tag;
  }
  return tag;
}

const shouldHandleClick = (event) => {
  const target = event.target;
  const tagName = target.tagName;
  const isInteractiveElement =
    target.isContentEditable ||
    (tagName === "A" && target.href !== null) ||
    ["BUTTON", "INPUT", "SELECT", "TEXTAREA"].includes(tagName);
  const isAccessibleRole = [
    "button",
    "combobox",
    "menuitem",
    "menuitemradio",
    "option",
  ].includes(target.getAttribute("role"));

  if (target.tabIndex === 0 && !isInteractiveElement) {
    const key = event.key;
    if (key === "Enter") return true;
    if ((key === " " || key === "Spacebar") && isAccessibleRole) return true;
  }
  return false;
};

const isDocumentContains = (element) => {
  return typeof document !== "undefined" &&
    typeof document.contains === "function"
    ? document.contains(element)
    : false;
};

const hasParentAnchor = (element) => {
  let el = element;
  while (el !== null) {
    if (el.tagName === "A" && el.href !== null) return true;
    el = el.parentNode;
  }
  return false;
};

const shouldPreventDefault = (event, preventDefault) => {
  const { altKey, ctrlKey, currentTarget, metaKey, shiftKey, target } = event;
  const isInteractiveElement = hasParentAnchor(
    isDocumentContains(target) ? target : currentTarget
  );
  const isModifiedKey = altKey || ctrlKey || metaKey || shiftKey;
  return preventDefault !== false && isInteractiveElement && !isModifiedKey;
};

// eslint-disable-next-line complexity
const PressableText = (props) => {
  const ref = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const groupContext = useContext(WebPressableGroupContext);

  const {
    accessibilityLabel,
    accessibilityRelationship,
    accessibilityRole,
    accessibilityState,
    children,
    className_DEPRECATED,
    direction,
    disabled,
    focusable,
    forwardedRef,
    link,
    nativeID,
    onBlur,
    onContextMenu,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    onPress,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    preventContextMenu,
    preventDefault,
    selectable,
    style,
    suppressFocusRing,
    testID,
    testOnly_state,
    xstyle,
    ...otherProps
  } = props;

  const tag = getTag(accessibilityRole, link);
  const isDisabled = disabled === true || accessibilityState?.disabled === true;
  const isHidden = accessibilityState?.hidden;
  const isAnchor = tag === "a" && !isDisabled;

  const state = {
    disabled: isDisabled || testOnly_state?.disabled === true || false,
    focused: isFocused || testOnly_state?.focused === true || false,
    focusVisible:
      (isFocusVisible && suppressFocusRing !== true) ||
      testOnly_state?.focusVisible === true ||
      false,
    hovered: isHovered || testOnly_state?.hovered === true || false,
    pressed: isPressed || testOnly_state?.pressed === true || false,
  };

  const childrenContent =
    typeof children === "function" ? children(state) : children;
  const classNameContent =
    typeof className_DEPRECATED === "function"
      ? className_DEPRECATED(state)
      : className_DEPRECATED;
  const styleContent = typeof style === "function" ? style(state) : style;
  const xstyleContent = typeof xstyle === "function" ? xstyle(state) : xstyle;

  usePressability(ref, {
    disabled: isDisabled,
    onBlur,
    onContextMenu,
    onFocus,
    onFocusChange: wrapCallback(setIsFocused, onFocusChange),
    onFocusVisibleChange: wrapCallback(setIsFocusVisible, onFocusVisibleChange),
    onHoverChange: wrapCallback(setIsHovered, onHoverChange),
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    onPressChange: wrapCallback(setIsPressed, onPressChange),
    onPressEnd,
    onPressMove,
    onPressStart,
    preventContextMenu,
    preventDefault: preventDefault === null ? true : preventDefault,
  });

  const handleClick = useCallback(
    (event) => {
      onPress && onPress(event);
      (onPress || link !== null) && event.stopPropagation();
      shouldPreventDefault(event, preventDefault) &&
        event.nativeEvent.preventDefault();
    },
    [link, onPress, preventDefault]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (shouldHandleClick(event)) {
        const key = event.key;
        (key === " " || key === "Spacebar") && event.preventDefault();
        onPress && (onPress(event), event.stopPropagation());
      }
    },
    [onPress]
  );

  const mergedRef = useMergeRefs(ref, forwardedRef);
  useWebPressableTouchStartHandler(ref, groupContext, handleClick);

  const tabIndex = determineTabIndex(
    tag,
    isDisabled,
    accessibilityRole,
    focusable
  );
  const download =
    link?.download === true || (typeof link?.download === "string" && isAnchor)
      ? link.download
      : undefined;
  const rel = isAnchor ? link?.rel : undefined;
  const href = isAnchor ? link?.url : undefined;
  const target = isAnchor ? link?.target : undefined;

  const role =
    accessibilityRole === "none" ? "presentation" : accessibilityRole;
  const finalStyle = stylex(
    [
      styles.root,
      selectable === false && styles.notSelectable,
      state.disabled && styles.disabled,
      !state.focusVisible && styles.focusNotVisible,
      state.focusVisible && isAnchor && styles.linkFocusRing,
      xstyleContent,
      groupContext && styles.rootInGroup,
    ],
    styleContent
  );

  return React.createElement(tag, {
    ...otherProps,
    "aria-activedescendant": accessibilityRelationship?.activedescendant,
    "aria-busy": accessibilityState?.busy,
    "aria-checked": accessibilityState?.checked,
    "aria-controls": accessibilityRelationship?.controls,
    "aria-current": accessibilityRelationship?.current,
    "aria-describedby": accessibilityRelationship?.describedby,
    "aria-details": accessibilityRelationship?.details,
    "aria-disabled":
      isDisabled && role !== "presentation" ? isDisabled : undefined,
    "aria-expanded": accessibilityState?.expanded,
    "aria-haspopup": accessibilityRelationship?.haspopup,
    "aria-hidden": isHidden,
    "aria-invalid": accessibilityState?.invalid,
    "aria-label": accessibilityLabel,
    "aria-labelledby": accessibilityRelationship?.labelledby,
    "aria-owns": accessibilityRelationship?.owns,
    "aria-pressed": accessibilityState?.pressed,
    "aria-readonly": accessibilityState?.readonly,
    "aria-required": accessibilityState?.required,
    "aria-selected": accessibilityState?.selected,
    attributionsrc: isAnchor ? link?.attributionsrc : undefined,
    children: childrenContent,
    className: joinClasses(finalStyle, classNameContent),
    "data-testid": testID,
    dir: direction !== "none" ? direction : undefined,
    download,
    href,
    id: nativeID,
    onClick: isDisabled ? undefined : handleClick,
    onKeyDown: isDisabled ? undefined : handleKeyDown,
    ref: mergedRef,
    rel,
    role,
    style: styleContent,
    tabIndex,
    target,
  });
};

PressableText.displayName = `${PressableText.name} [from ${
  import.meta.env.VITE_APP_ID
}]import useMergeRefs from '../../hooks/useMergeRefs';
`;

function wrapCallback(setState, callback) {
  return useCallback(
    (event) => {
      setState(event);
      callback && callback(event);
    },
    [callback, setState]
  );
}

const styles = {
  disabled: { cursor: "x1h6gzvc", $$css: true },
  focusNotVisible: { outline: "x1a2a7pz", $$css: true },
  linkFocusRing: { outline: "x1gje4rg", $$css: true },
  notSelectable: { userSelect: "x87ps6o", $$css: true },
  root: {
    WebkitTapHighlightColor: "x1i10hfl",
    backgroundColor: "xjbqb8w",
    borderTopStyle: "x1ejq31n",
    borderEndStyle: "xd10rxx",
    borderBottomStyle: "x1sy0etr",
    borderStartStyle: "x17r0tee",
    borderTopWidth: "x972fbf",
    borderEndWidth: "xcfux6l",
    borderBottomWidth: "x1qhh985",
    borderStartWidth: "xm0m39n",
    boxSizing: "x9f619",
    cursor: "x1ypdohk",
    display: "xt0psk2",
    listStyle: "xe8uvvx",
    marginTop: "xdj266r",
    marginEnd: "x11i5rnm",
    marginBottom: "xat24cr",
    marginStart: "x1mh8g0r",
    paddingTop: "xexx8yu",
    paddingEnd: "x4uap5",
    paddingBottom: "x18d9i69",
    paddingStart: "xkhd6sd",
    textAlign: "x16tdsg8",
    textDecoration: "x1hl2dhg",
    touchAction: "xggy1nq",
    $$css: true,
  },
  rootInGroup: { touchAction: "x5ve5x3", $$css: true },
};

export default PressableText;

// eslint-disable-next-line max-params
function determineTabIndex(tag, isDisabled, accessibilityRole, focusable) {
  if (tag === "a" || accessibilityRole === "button") {
    if (gkx("21059")) {
      return !isDisabled && focusable !== false && accessibilityRole !== "none"
        ? 0
        : -1;
    }
    return isDisabled ? -1 : 0;
  }
  return !isDisabled && focusable !== false && accessibilityRole !== "none"
    ? 0
    : undefined;
}
