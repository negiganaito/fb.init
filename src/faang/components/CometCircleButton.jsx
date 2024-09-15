/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";

import CometPressable from "./CometPressable";
import ComponentWithDataAttributes from "./ComponentWithDataAttributes";
import FDSIcon from "./FDSIcon";

const styles = {
  pressableOverlayPressed: {
    backgroundColor: "x1lxk4cn",
    ,
  },
  root: {
    alignItems: "x6s0dn4",
    borderTopStartRadius: "xzolkzo",
    borderTopEndRadius: "x12go9s9",
    borderBottomEndRadius: "x1rnf11y",
    borderBottomStartRadius: "xprq8jg",
    borderTopWidth: "x972fbf",
    borderEndWidth: 0,
    borderBottomWidth: 0,
    borderStartWidth: 0,
    boxSizing: "x9f619",
    display: "x78zum5",
    justifyContent: "xl56j7k",
    paddingTop: 0,
    paddingEnd: 0,
    paddingBottom: 0,
    paddingStart: 0,
    position: "relative",
    ,
  },
};

const sizes = {
  24: {
    height: "xxk0z11",
    width: "xvy4d1p",
    ,
  },
  28: {
    height: "x1fgtraw",
    width: "xgd8bvy",
    ,
  },
  32: {
    height: "x10w6t97",
    width: "x1td3qas",
    ,
  },
  36: {
    height: "xc9qbxq",
    width: "x14qfxbe",
    ,
  },
  40: {
    height: "x1vqgdyp",
    width: "x100vrsf",
    ,
  },
  48: {
    height: "xsdox4t",
    width: "x1useyqa",
    ,
  },
};

const colors = {
  "dark-overlay": {
    backgroundColor: "x18l40ae",
    color: "x14ctfv",
    ,
  },
  deemphasized: {
    backgroundColor: "xjbqb8w",
    ,
  },
  "deemphasized-overlay": {
    backgroundColor: "x1hr4nm9",
    ,
  },
  normal: {
    backgroundColor: "x1qhmfi1",
    ,
  },
  overlay: {
    backgroundColor: "x9bbmet",
    boxShadow: "x10f5nwc",
    color: "xi81zsa",
    ,
  },
  "overlay-floating": {
    backgroundColor: "x1l31dnx",
    boxShadow: "x1qeybcx",
    ,
  },
  "overlay-raised": {
    backgroundColor: "x9bbmet",
    boxShadow: "x1k54i6l",
    color: "xi81zsa",
    ,
  },
  "primary-background-overlay": {
    backgroundColor: "xtvsq51",
    ,
  },
};

const disabledColors = {
  "dark-overlay": {
    backgroundColor: "x18l40ae",
    ,
  },
  deemphasized: {
    backgroundColor: "xjbqb8w",
    ,
  },
  "deemphasized-overlay": {
    backgroundColor: "x1f2gare",
    ,
  },
  normal: {
    backgroundColor: "xwcfey6",
    ,
  },
  overlay: {
    backgroundColor: "x1ahlmzr",
    borderTopWidth: "x972fbf",
    borderEndWidth: 0,
    borderBottomWidth: 0,
    borderStartWidth: 0,
    boxShadow: "xxnfx33",
    color: "x1dntmbh",
    ,
  },
  "primary-background-overlay": {
    backgroundColor: "xtvsq51",
    ,
  },
};

const iconSizes = {
  24: 12,
  28: 16,
  32: 16,
  36: 20,
  40: 20,
  48: 24,
};

const largeIconSizes = {
  24: 20,
  28: 20,
  32: 24,
  36: 28,
  40: 32,
  48: 32,
};

const getColor = (type) => {
  switch (type) {
    case "primary-background-overlay":
    case "dark-overlay":
      return "white";
    case "deemphasized-overlay":
      return "highlight";
    default:
      return "primary";
  }
};

const CometCircleButton = forwardRef((props, ref) => {
  const {
    color,
    dataAttributes,
    disabled = false,
    focusable,
    icon,
    iconRatio,
    label,
    linkProps,
    onFocusIn,
    onFocusOut,
    onHoverIn,
    onHoverOut,
    onPress,
    onPressIn,
    onPressOut,
    overlayHoveredStyle,
    size,
    // testid,
    testOnly_pressed,
    type = "normal",
    ...rest
  } = props;

  const iconColor = disabled
    ? "disabled"
    : color !== null
    ? color
    : getColor(type);
  const iconSize =
    iconRatio === "large" ? largeIconSizes[size] : iconSizes[size];
  const xstyle = [
    styles.root,
    sizes[size],
    colors[type],
    disabled &&
      disabledColors[
        type === "overlay-raised" || type === "overlay-floating"
          ? "overlay"
          : type
      ],
  ];

  const button = (
    <CometPressable
      {...rest}
      aria-label={label}
      disabled={disabled}
      focusable={focusable}
      linkProps={linkProps}
      onFocusIn={onFocusIn}
      onFocusOut={onFocusOut}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      overlayHoveredStyle={overlayHoveredStyle}
      overlayPressedStyle={styles.pressableOverlayPressed}
      overlayRadius="50%"
      pressedStyleValue={{ scale: 0.96 }}
      ref={ref}
      testOnly_pressed={testOnly_pressed}
      xstyle={xstyle}
    >
      <FDSIcon color={iconColor} icon={icon} size={iconSize} />
    </CometPressable>
  );

  return dataAttributes !== null ? (
    <ComponentWithDataAttributes dataAttributes={dataAttributes}>
      {button}
    </ComponentWithDataAttributes>
  ) : (
    button
  );
});

CometCircleButton.displayName = `${CometCircleButton.name}`;

export default CometCircleButton;
