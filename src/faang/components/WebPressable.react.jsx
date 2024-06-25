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
  useMemo,
  useRef,
  useState,
} from "react";
// import gkx from "gkx";
import stylex from "@stylexjs/stylex";
import joinClasses from "fbjs/lib/joinClasses";

import justknobx from "../../business/helpers/justknobx";
import useWebPressableTouchStartHandler from "../../business/hooks/useWebPressableTouchStartHandler";
import WebPressableGroupContext from "../../context/WebPressableGroupContext";

import { usePressability } from "./WebPressability";

const roleToElement = {
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

const interactiveRoles = ["menuitem", "tab", "none"];

const shouldUseAnchor = (role, link) =>
  interactiveRoles.includes(role || "") && link !== null && link.url !== null;

const getAccessibilityRole = (role) => {
  switch (role) {
    case "none":
      return "presentation";
    case "label":
      return undefined;
    default:
      return role;
  }
};

const isValidKeyDownPress = (event) => {
  const { key, target } = event;
  const { tagName, isContentEditable } = target;
  const isInteractiveElement =
    isContentEditable ||
    (tagName === "A" && target.href !== null) ||
    ["BUTTON", "INPUT", "SELECT", "TEXTAREA"].includes(tagName);
  const role = target.getAttribute("role");

  if (target.tabIndex === 0 && !isInteractiveElement) {
    if (key === "Enter") {
      return true;
    }
    if (
      (key === " " || key === "Spacebar") &&
      [
        "button",
        "checkbox",
        "combobox",
        "menuitem",
        "menuitemcheckbox",
        "menuitemradio",
        "option",
        "radio",
        "switch",
        "tab",
      ].includes(role || "")
    ) {
      return true;
    }
  }
  return false;
};

const isDocumentContains = (element) =>
  typeof document !== "undefined" &&
  typeof document.contains === "function" &&
  document.contains(element);

const isElementAnchor = (element) => {
  while (element !== null) {
    if (element.tagName === "A" && element.href !== null) {
      return true;
    }
    element = element.parentNode;
  }
  return false;
};

const shouldPreventDefault = (event, allowClickEventPropagation) => {
  const { altKey, ctrlKey, metaKey, shiftKey, currentTarget, target } = event;
  const element = justknobx("_450")
    ? isDocumentContains(target)
      ? target
      : currentTarget
    : target;
  const isAnchor = isElementAnchor(element);
  const isModifiedClick = altKey || ctrlKey || metaKey || shiftKey;

  return allowClickEventPropagation !== false && isAnchor && !isModifiedClick;
};

// eslint-disable-next-line complexity
const WebPressable = ({
  accessibilityLabel,
  accessibilityRelationship,
  accessibilityRole,
  accessibilityState,
  accessibilityValue,
  allowClickEventPropagation = false,
  children,
  className_DEPRECATED,
  disabled,
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
  onKeyDown,
  onPress,
  onPressChange,
  onPressEnd,
  onPressMove,
  onPressStart,
  preventContextMenu,
  preventDefault = true,
  style,
  suppressFocusRing = false,
  tabbable,
  testID,
  testOnly_state,
  xstyle,
  ...rest
}) => {
  const ref = useRef < HTMLElement > null;
  const [focusVisible, setFocusVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const groupContext = useContext(WebPressableGroupContext);

  const state = {
    disabled:
      disabled === true || accessibilityState?.disabled === true || false,
    focusVisible:
      focusVisible || testOnly_state?.focusVisible === true || false,
    focused: focused || testOnly_state?.focused === true || false,
    hovered: hovered || testOnly_state?.hovered === true || false,
    pressed: pressed || testOnly_state?.pressed === true || false,
  };

  const elementType = shouldUseAnchor(accessibilityRole, link)
    ? "a"
    : roleToElement[accessibilityRole || "none"] || "div";

  const pressabilityConfig = useMemo(
    () => ({
      disabled: state.disabled,
      onBlur,
      onContextMenu,
      onFocus,
      onFocusChange: wrapHandler(setFocused, onFocusChange),
      onFocusVisibleChange: wrapHandler(setFocusVisible, onFocusVisibleChange),
      onHoverChange: wrapHandler(setHovered, onHoverChange),
      onHoverEnd,
      onHoverMove,
      onHoverStart,
      onPressChange: wrapHandler(setPressed, onPressChange),
      onPressEnd,
      onPressMove,
      onPressStart,
      preventContextMenu,
      preventDefault,
    }),
    [
      state.disabled,
      onBlur,
      onContextMenu,
      onFocus,
      onFocusChange,
      onFocusVisibleChange,
      onHoverChange,
      onHoverEnd,
      onHoverMove,
      onHoverStart,
      onPressChange,
      onPressEnd,
      onPressMove,
      onPressStart,
      preventContextMenu,
      preventDefault,
    ]
  );

  usePressability(ref, pressabilityConfig);

  const handleClick = useCallback(
    (event) => {
      onPress && onPress(event);
      if (onPress || link !== null) {
        allowClickEventPropagation !== true && event.stopPropagation();
      }
      if (shouldPreventDefault(event, preventDefault)) {
        event.nativeEvent.preventDefault();
      }
    },
    [onPress, link, preventDefault]
  );

  const handleKeyDown = useCallback(
    (event) => {
      onKeyDown && onKeyDown(event);
      if (isValidKeyDownPress(event)) {
        const key = event.key;
        if (key === " " || key === "Spacebar") {
          event.preventDefault();
        }
        onPress && (onPress(event), event.stopPropagation());
      }
    },
    [onKeyDown, onPress]
  );

  const combinedRef = useCallback(
    (element) => {
      ref.current = element;
      if (typeof forwardedRef === "function") {
        forwardedRef(element);
      } else if (forwardedRef) {
        forwardedRef.current = element;
      }
    },
    [forwardedRef]
  );

  useWebPressableTouchStartHandler(ref, groupContext, handleClick);

  const GKX_21059 = true;
  const tabIndex = GKX_21059
    ? accessibilityState?.hidden !== true && tabbable !== false
      ? 0
      : undefined
    : state.disabled !== true &&
      accessibilityState?.hidden !== true &&
      tabbable !== false
    ? 0
    : undefined;

  const download =
    link &&
    (link.download === true || typeof link.download === "string") &&
    elementType === "a"
      ? link.download
      : undefined;

  return React.createElement(elementType, {
    ...rest,
    "aria-activedescendant": accessibilityRelationship?.activedescendant,
    "aria-busy": accessibilityState?.busy,
    "aria-checked": accessibilityState?.checked,
    "aria-controls": accessibilityRelationship?.controls,
    "aria-current": accessibilityRelationship?.current,
    "aria-describedby": accessibilityRelationship?.describedby,
    "aria-details": accessibilityRelationship?.details,
    "aria-disabled":
      state.disabled === true && accessibilityRole !== "none"
        ? state.disabled
        : undefined,
    "aria-errormessage": accessibilityRelationship?.errormessage,
    "aria-expanded": accessibilityState?.expanded,
    "aria-haspopup": accessibilityRelationship?.haspopup,
    "aria-hidden": accessibilityState?.hidden,
    "aria-invalid": accessibilityState?.invalid,
    "aria-label": accessibilityLabel,
    "aria-labelledby": accessibilityRelationship?.labelledby,
    "aria-modal": accessibilityState?.modal,
    "aria-orientation": accessibilityState?.orientation,
    "aria-owns": accessibilityRelationship?.owns,
    "aria-pressed": accessibilityState?.pressed,
    "aria-readonly": accessibilityState?.readonly,
    "aria-required": accessibilityState?.required,
    "aria-selected": accessibilityState?.selected,
    "aria-valuemax": accessibilityValue?.max,
    "aria-valuemin": accessibilityValue?.min,
    "aria-valuenow": accessibilityValue?.now,
    "aria-valuetext": accessibilityValue?.text,
    attributionsrc: elementType === "a" ? link?.attributionsrc : undefined,
    children: typeof children === "function" ? children(state) : children,
    className: joinClasses(
      stylex(
        x.root,
        state.disabled && x.disabled,
        (!state.focusVisible || suppressFocusRing) && x.focusNotVisible,
        state
      ),
      typeof className_DEPRECATED === "function"
        ? className_DEPRECATED(state)
        : className_DEPRECATED
    ),
    download,
    href: elementType === "a" ? link?.url : undefined,
    id: nativeID,
    onClick: state.disabled ? undefined : handleClick,
    onKeyDown: state.disabled ? undefined : handleKeyDown,
    ref: combinedRef,
    rel: elementType === "a" ? link?.rel : undefined,
    role: getAccessibilityRole(accessibilityRole),
    style: typeof style === "function" ? style(state) : style,
    tabIndex,
    target: elementType === "a" ? link?.target : undefined,
  });
};

WebPressable.displayName = `${WebPressable.name}`;

function wrapHandler(setter, handler) {
  return useCallback(
    (event) => {
      setter(event.type === "focus" || event.type === "focusin");
      handler && handler(event);
    },
    [handler, setter]
  );
}

const x = {
  disabled: {
    cursor: "x1h6gzvc",
    $$css: true,
  },
  focusNotVisible: {
    outlineStyle: "x1t137rt",
    $$css: true,
  },
  root: {
    WebkitTapHighlightColor: "x1i10hfl",
    alignItems: "x1qjc9v5",
    backgroundColor: "xjbqb8w",
    borderTopColor: "xjqpnuy",
    borderEndColor: "xa49m3k",
    borderBottomColor: "xqeqjp1",
    borderStartColor: "x2hbi6w",
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "x972fbf",
    borderEndWidth: "xcfux6l",
    borderBottomWidth: "x1qhh985",
    borderStartWidth: "xm0m39n",
    boxSizing: "x9f619",
    cursor: "x1ypdohk",
    display: "x78zum5",
    flexBasis: "xdl72j9",
    flexDirection: "xdt5ytf",
    flexShrink: "x2lah0s",
    listStyle: "xe8uvvx",
    marginTop: "xdj266r",
    marginEnd: "x11i5rnm",
    marginBottom: "xat24cr",
    marginStart: "x1mh8g0r",
    minHeight: "x2lwn1j",
    minWidth: "xeuugli",
    paddingTop: "xexx8yu",
    paddingEnd: "x4uap5",
    paddingBottom: "x18d9i69",
    paddingStart: "xkhd6sd",
    position: "x1n2onr6",
    textAlign: "x16tdsg8",
    textDecoration: "x1hl2dhg",
    touchAction: "xggy1nq",
    zIndex: "x1ja2u2z",
    $$css: true,
  },
  rootInGroup: {
    touchAction: "x5ve5x3",
    $$css: true,
  },
};

export default WebPressable;
