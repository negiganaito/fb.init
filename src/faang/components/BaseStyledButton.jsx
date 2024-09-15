/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useRef } from "react";

import stylex from "../../helpers/stylex";
import { makeNamespace } from "../../helpers/stylex-compat";

import BaseRow from "./BaseRow";
import BaseRowItem from "./BaseRowItem";
import CometPressable from "./CometPressable";

const styles = {
  button: {
    boxSizing: "x9f619",
    display: 0,
    flexDirection: "xdt5ytf",
    justifyContent: "xl56j7k",
    position: "relative",
    width: "xh8yej3",
    ,
  },
  content: {
    borderTopStartRadius: "xi112ho",
    borderTopEndRadius: "x17zwfj4",
    borderBottomEndRadius: "x585lrc",
    borderBottomStartRadius: "x1403ito",
    borderTopWidth: "x972fbf",
    borderEndWidth: 0,
    borderBottomWidth: 0,
    borderStartWidth: 0,
    boxSizing: "x9f619",
    paddingEnd: "xn6708d",
    paddingLeft: null,
    paddingRight: null,
    paddingStart: "x1ye3gou",
    ,
  },
  disabled: {
    backgroundColor: "xwcfey6",
    ,
  },
  item: {
    alignItems: "x6s0dn4",
    display: "x78zum5",
    flexShrink: "x2lah0s",
    marginEnd: "x1fbi1t2",
    marginLeft: null,
    marginRight: null,
    marginStart: "xl8fo4v",
    ,
  },
  offset: {
    alignItems: "x6s0dn4",
    display: "x78zum5",
    justifyContent: "xl56j7k",
    marginEnd: "x1608yet",
    marginStart: "xljgi0e",
    width: "x1e0frkt",
    ,
  },
  paddingWide: {
    paddingEnd: "xbxaen2",
    paddingLeft: null,
    paddingRight: null,
    paddingStart: "x1u72gb5",
    ,
  },
  sizeLargeItem: {
    marginEnd: "x185m5pd",
    marginLeft: null,
    marginRight: null,
    marginStart: "xmly5ks",
    ,
  },
  sizeLargeOffset: {
    marginEnd: "x3fpzix",
    marginStart: "xxdpisx",
    ,
  },
};

const BaseStyledButton = forwardRef(
  (
    {
      addOnAbsolute,
      addOnEnd,
      addOnStart,
      content,
      contentXstyle,
      disabled = false,
      display = "inline",
      focusable,
      icon,
      id,
      linkProps,
      onFocusIn,
      onFocusOut,
      onHoverIn,
      onHoverOut,
      onPress,
      onPressIn,
      onPressOut,
      overlayHoveredStyle,
      overlayPressedStyle,
      padding = "normal",
      size = "medium",
      suppressHydrationWarning = false,
      testid,
      testOnly_pressed = false,
      xstyle,
      ...rest
    },
    ref
  ) => {
    const buttonRef = useRef(null);

    const handlePressIn = (event) => {
      if (buttonRef.current) {
        const button = buttonRef.current;
        if (button instanceof HTMLDivElement) {
          button.style.transform = `scale(${Math.max(
            0.96,
            (button.offsetWidth - 10) / button.offsetWidth
          )})`;
        }
      }
      if (typeof onPressIn === "function") {
        onPressIn(event);
      }
    };

    const handlePressOut = (event) => {
      if (buttonRef.current) {
        const button = buttonRef.current;
        if (button instanceof HTMLDivElement) {
          button.style.transform = "none";
        }
      }
      if (typeof onPressOut === "function") {
        onPressOut(event);
      }
    };

    const [style1, style2] = composeStyles(xstyle);

    const contentMarkup = (
      <BaseRow
        align="center"
        ref={buttonRef}
        role="none"
        verticalAlign="center"
        xstyle={[
          styles.content,
          padding === "wide" && styles.paddingWide,
          disabled && styles.disabled,
          style2,
          contentXstyle,
        ]}
      >
        <div
          className={stylex([
            styles.offset,
            size === "large" && styles.sizeLargeOffset,
          ])}
        >
          {addOnStart || icon ? (
            <BaseRowItem
              role="none"
              useDeprecatedStyles={true}
              xstyle={[styles.item, size === "large" && styles.sizeLargeItem]}
            >
              {addOnStart || icon}
            </BaseRowItem>
          ) : null}
          {content ? (
            <BaseRowItem
              role="none"
              useDeprecatedStyles={true}
              xstyle={[styles.item, size === "large" && styles.sizeLargeItem]}
            >
              {content}
            </BaseRowItem>
          ) : null}
          {addOnEnd ? (
            <BaseRowItem
              role="none"
              useDeprecatedStyles={true}
              xstyle={[styles.item, size === "large" && styles.sizeLargeItem]}
            >
              {addOnEnd}
            </BaseRowItem>
          ) : null}
        </div>
        {addOnAbsolute}
      </BaseRow>
    );

    return (
      <CometPressable
        {...rest}
        disabled={disabled}
        display={display}
        focusable={focusable}
        id={id}
        linkProps={linkProps}
        onFocusIn={onFocusIn}
        onFocusOut={onFocusOut}
        onHoverIn={onHoverIn}
        onHoverOut={onHoverOut}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        overlayHoveredStyle={overlayHoveredStyle}
        overlayPressedStyle={overlayPressedStyle}
        ref={ref}
        suppressHydrationWarning={suppressHydrationWarning}
        testOnly_pressed={testOnly_pressed}
        testid={undefined}
        xstyle={[styles.button, style1]}
      >
        {contentMarkup}
      </CometPressable>
    );
  }
);

BaseStyledButton.displayName = `BaseStyledButton [from ${
  process.env.FB_APP_ID || "unknown"
}]`;

export default BaseStyledButton;

const weakMap = new WeakMap();

function composeStyles(style) {
  if (!style) return [{}, {}];

  const cached = weakMap.get(style);
  if (cached) return cached;

  const composed = stylex.compose(style);
  const inlineStyles = {
    alignSelf: composed.alignSelf,
    cursor: composed.cursor,
    flexBasis: composed.flexBasis,
    flexGrow: composed.flexGrow,
    flexShrink: composed.flexShrink,
    height: composed.height,
    justifySelf: composed.justifySelf,
    margin: composed.margin,
    marginBottom: composed.marginBottom,
    marginEnd: composed.marginEnd,
    marginStart: composed.marginStart,
    marginTop: composed.marginTop,
    maxHeight: composed.maxHeight,
    maxWidth: composed.maxWidth,
    minHeight: composed.minHeight,
    minWidth: composed.minWidth,
    position: composed.position,
    width: composed.width,
  };

  const inlineStyle = {};
  for (const key in inlineStyles) {
    if (inlineStyles[key] !== undefined) {
      inlineStyle[key] = inlineStyles[key];
    }
  }

  const namespaces = [makeNamespace(inlineStyle), makeNamespace(composed)];
  weakMap.set(style, namespaces);
  return namespaces;
}
