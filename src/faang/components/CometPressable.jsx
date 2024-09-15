/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable complexity */

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { stylex } from "@stylexjs/stylex";

import CometContainerPressableContext from "../../context/CometContainerPressableContext";
import CometDangerouslySuppressInteractiveElementsContext from "../../context/CometDangerouslySuppressInteractiveElementsContext";
import useMergeRefs from "../../hooks/useMergeRefs";

import { BaseButton } from "./BaseButton.react";
import BaseLink from "./BaseLink.react";
// import { BasePlaceholderContext } from "BasePlaceholderContext";
import CometPressableOverlay from "./CometPressableOverlay.react";

const styles = {
  defaultCursor: { cursor: "xt0e3qv" },
  expanding: { display: "x78zum5" },
  focusRing: { boxShadow: "x18bame2", outline: "xvetz19 x1a2a7pz" },
  focusRingInset: { boxShadow: "xpud6h4" },
  hideOutline: { outline: "x1a2a7pz" },
  linkBase: { display: "x1rg5ohu" },
  root: {
    borderTopStartRadius: "x1o1ewxj",
    borderTopEndRadius: "x3x9cwd",
    borderBottomEndRadius: "x1e5q0jg",
    borderBottomStartRadius: "x13rtm0m",
    display: 0,
    flexDirection: "x1q0g3np",
    userSelect: "x87ps6o",
    ":hover_textDecoration": "x1lku1pv",
  },
  root_DEPRECATED: {
    borderTopStartRadius: "x1o1ewxj",
    borderTopEndRadius: "x3x9cwd",
    borderBottomEndRadius: "x1e5q0jg",
    borderBottomStartRadius: "x13rtm0m",
    position: "relative",
    userSelect: "x87ps6o",
    ":hover_textDecoration": "x1lku1pv",
  },
  zIndex: { zIndex: "x1vjfegm" },
};

const CometPressable = React.forwardRef(
  (
    {
      allowClickEventPropagation,
      children,
      className_DEPRECATED,
      cursorDisabled = false,
      xstyle,
      disabled = false,
      display,
      expanding = display === "block",
      hideFocusOverlay = false,
      hideHoverOverlay = false,
      isContainerTarget = false,
      linkProps,
      onFocusChange,
      onFocusIn,
      onFocusOut,
      onFocusVisibleChange,
      onHoverChange,
      onHoverIn,
      onHoverMove,
      onHoverOut,
      onPress,
      onPressChange,
      onPressIn,
      onPressOut,
      preventContextMenu,
      overlayDisabled = false,
      overlayOffset,
      overlayFocusRingPosition,
      overlayFocusVisibleStyle,
      overlayHoveredStyle,
      overlayPressedStyle,
      overlayRadius,
      suppressFocusRing = false,
      testOnly_pressed = false,
      testid,
      pressedStyleValue,
      style,
      ...rest
    },
    ref
  ) => {
    const [pressed, setPressed] = useState(testOnly_pressed);
    const [focused, setFocused] = useState(false);
    const [focusVisible, setFocusVisible] = useState(false);
    const [hovered, setHovered] = useState(false);

    const handlePressChange = useCallback(
      (value) => {
        setPressed(value || testOnly_pressed);
        onPressChange && onPressChange(value);
      },
      [onPressChange, testOnly_pressed]
    );

    const handleFocusChange = useCallback(
      (value) => {
        setFocused(value);
        onFocusChange && onFocusChange(value);
      },
      [onFocusChange]
    );

    const handleFocusVisibleChange = useCallback(
      (value) => {
        setFocusVisible(value);
        onFocusVisibleChange && onFocusVisibleChange(value);
      },
      [onFocusVisibleChange]
    );

    const handleHoverChange = useCallback(
      (value) => {
        setHovered(value);
        onHoverChange && onHoverChange(value);
      },
      [onHoverChange]
    );

    const overlay = !overlayDisabled ? (
      <CometPressableOverlay
        focusRingPosition={overlayFocusRingPosition}
        focusVisible={!hideFocusOverlay && focusVisible}
        focusVisibleStyle={overlayFocusVisibleStyle}
        hovered={!hideHoverOverlay && hovered}
        hoveredStyle={overlayHoveredStyle}
        offset={overlayOffset}
        pressed={pressed}
        pressedStyle={overlayPressedStyle}
        radius={overlayRadius}
        showFocusRing={true}
      />
    ) : null;

    const content =
      typeof children === "function" ? (
        children({ disabled, focused, focusVisible, hovered, overlay, pressed })
      ) : (
        <>
          {children}
          {overlay}
        </>
      );

    const computedXstyle =
      typeof xstyle === "function"
        ? xstyle({ disabled, focused, focusVisible, hovered, pressed })
        : xstyle;

    const containerPressableContext = useContext(
      CometContainerPressableContext
    );
    const suppressInteractiveElementsContext = useContext(
      CometDangerouslySuppressInteractiveElementsContext
    );

    const shouldShowFocusRing =
      focusVisible &&
      (hideFocusOverlay || overlayDisabled) &&
      !suppressFocusRing;

    const rootStyles = [
      display === "inline" ? styles.root_DEPRECATED : styles.root,
      cursorDisabled === true && styles.defaultCursor,
      expanding && styles.expanding,
      linkProps !== null && styles.linkBase,
      !focusVisible && styles.hideOutline,
      computedXstyle,
      shouldShowFocusRing &&
        (overlayFocusRingPosition === "inset"
          ? styles.focusRingInset
          : styles.focusRing),
      containerPressableContext !== null && styles.zIndex,
    ];

    let pressedStyle = {};
    if (pressed && pressedStyleValue !== null) {
      const { opacity, scale } = pressedStyleValue;
      if (opacity !== null) {
        pressedStyle = { opacity };
      }
      if (scale !== null) {
        pressedStyle = { ...pressedStyle, transform: `scale(${scale})` };
      }
    }

    const combinedStyle = { ...style, ...pressedStyle };

    const pressableProps = {
      onBlur: onFocusOut,
      onClick: onPress,
      onFocus: onFocusIn,
      onFocusChange: handleFocusChange,
      onFocusVisibleChange: handleFocusVisibleChange,
      onHoverChange: handleHoverChange,
      onHoverEnd: onHoverOut,
      onHoverMove: onHoverMove,
      onHoverStart: onHoverIn,
      onPressChange: handlePressChange,
      onPressEnd: onPressOut,
      onPressStart: onPressIn,
    };

    const containerRef = useRef(null);
    const elementRef = useRef(null);

    useEffect(() => {
      if (isContainerTarget && containerPressableContext) {
        containerPressableContext.onMount(
          {
            onContextMenu: (event) => {
              if (preventContextMenu === true) {
                event.preventDefault();
              }
              rest.onContextMenu && rest.onContextMenu(event);
            },
            onPress: () => {
              const element = elementRef.current;
              element && element.click();
            },
            target: linkProps?.target,
            url: linkProps?.url,
          },
          containerRef
        );
      }
    }, [
      containerPressableContext,
      isContainerTarget,
      rest,
      preventContextMenu,
      linkProps?.url,
      linkProps?.target,
    ]);

    const mergedRef = useMergeRefs(ref, elementRef);

    // const basePlaceholderContext = useContext(BasePlaceholderContext);

    if (suppressInteractiveElementsContext) {
      const Component = display === "inline" ? "span" : "div";
      return (
        <Component
          className={className_DEPRECATED}
          display={display === "inline" ? display : "block"}
          preventContextMenu={preventContextMenu}
          {...rest}
          xstyle={stylex(rootStyles)}
          data-testid={undefined}
          ref={mergedRef}
          style={combinedStyle}
        >
          {content}
        </Component>
      );
    }

    if (linkProps !== null) {
      const { url, ...otherLinkProps } = linkProps;
      const linkPropsWithHref = { ...otherLinkProps, href: url };
      return (
        <BaseLink
          {...pressableProps}
          {...rest}
          {...linkPropsWithHref}
          className_DEPRECATED={className_DEPRECATED}
          disabled={disabled}
          display={display === "inline" ? display : "block"}
          fbclid={linkProps.fbclid}
          preventContextMenu={preventContextMenu}
          ref={mergedRef}
          style={combinedStyle}
          suppressFocusRing={true}
          testid={undefined}
          xstyle={rootStyles}
        >
          {content}
        </BaseLink>
      );
    }

    return (
      <BaseButton
        {...pressableProps}
        {...rest}
        allowClickEventPropagation={allowClickEventPropagation}
        className_DEPRECATED={className_DEPRECATED}
        disabled={disabled}
        display={display === "inline" ? display : "block"}
        preventContextMenu={preventContextMenu}
        ref={mergedRef}
        style={combinedStyle}
        suppressFocusRing={true}
        testid={undefined}
        xstyle={rootStyles}
      >
        {content}
      </BaseButton>
    );
  }
);

CometPressable.displayName = `CometPressable`;

export default CometPressable;
