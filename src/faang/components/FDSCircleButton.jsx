/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";

import CometPressable from "./CometPressable.react";
import ComponentWithDataAttributes from "./ComponentWithDataAttributes.react";
import FDSIcon from "./FDSIcon";

const styles = {
  pressableOverlayPressed: {
    backgroundColor: "var(--non-media-pressed)",
  },
  root: {
    alignItems: "center",
    borderTopStartRadius: "999px",
    borderTopEndRadius: "999px",
    borderBottomEndRadius: "999px",
    borderBottomStartRadius: "999px",
    borderTopWidth: 0,
    borderEndWidth: 0,
    borderBottomWidth: 0,
    borderStartWidth: 0,
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    paddingTop: 0,
    paddingEnd: 0,
    paddingBottom: 0,
    paddingStart: 0,
    position: "relative",
  },
};

const sizes = {
  24: { height: "24px", width: "24px" },
  28: { height: "28px", width: "28px" },
  32: { height: "32px", width: "32px" },
  36: { height: "36px", width: "36px" },
  40: { height: "40px", width: "40px" },
  48: { height: "48px", width: "48px" },
};

const colors = {
  "dark-overlay": {
    backgroundColor: "var(--always-dark-overlay)",
    color: "var(--always-white)",
  },
  deemphasized: { backgroundColor: "transparent" },
  "deemphasized-overlay": {
    backgroundColor: "var(--primary-deemphasized-button-background)",
  },
  normal: {
    backgroundColor: "var(--secondary-button-background)",
  },
  overlay: {
    backgroundColor: "var(--popover-background)",
    boxShadow: "0 0 0 1px var(--shadow-1)",
    color: "var(--secondary-text)",
  },
  "overlay-floating": {
    backgroundColor: "var(--secondary-button-background-floating)",
    boxShadow: "0 2px 4px var(--shadow-1),0 12px 28px var(--shadow-2)",
  },
  "overlay-raised": {
    backgroundColor: "var(--popover-background)",
    boxShadow: "0 2px 8px var(--shadow-1),0 0 0 1px var(--shadow-1)",
    color: "var(--secondary-text)",
  },
  "primary-background-overlay": {
    backgroundColor: "var(--primary-button-background)",
  },
};

const disabledColors = {
  "dark-overlay": { backgroundColor: "x18l40ae" },
  deemphasized: { backgroundColor: "transparent" },
  "deemphasized-overlay": { backgroundColor: "x1f2gare" },
  normal: { backgroundColor: "xwcfey6" },
  overlay: {
    backgroundColor: "var(--progress-ring-on-media-background)",
    borderTopWidth: 0,
    borderEndWidth: 0,
    borderBottomWidth: 0,
    borderStartWidth: 0,
    boxShadow: "0 2px 4px var(--shadow-1)",
    color: "var(--disabled-text)",
  },
  "primary-background-overlay": {
    backgroundColor: "var(--primary-button-background)",
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

const FDSCircleButton = forwardRef((props, ref) => {
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
    showDynamicHover,
    size,
    // testid,
    testOnly_pressed,
    type = "normal",
    ...rest
  } = props;

  const dataAttributesObj =
    dataAttributes !== null
      ? Object.keys(dataAttributes).reduce((acc, key) => {
          if (acc !== null && key !== null) {
            acc[`data-${key}`] = dataAttributes[key];
          }
          return acc;
        }, {})
      : null;

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
      showDynamicHover={showDynamicHover}
      testOnly_pressed={testOnly_pressed}
      testid={undefined}
      xstyle={[
        styles.root,
        sizes[size],
        colors[type],
        disabled &&
          disabledColors[
            type === "overlay-raised" || type === "overlay-floating"
              ? "overlay"
              : type
          ],
      ]}
    >
      <FDSIcon
        color={disabled ? "disabled" : color ?? getIconColor(type)}
        icon={icon}
        size={iconRatio === "large" ? largeIconSizes[size] : iconSizes[size]}
      />
    </CometPressable>
  );

  return dataAttributesObj !== null ? (
    <ComponentWithDataAttributes dataAttributes={dataAttributes}>
      {button}
    </ComponentWithDataAttributes>
  ) : (
    button
  );
});

FDSCircleButton.displayName = `FDSCircleButton [from ${module.id}]`;

function getIconColor(type) {
  switch (type) {
    case "primary-background-overlay":
    case "dark-overlay":
      return "white";
    case "deemphasized-overlay":
      return "highlight";
    default:
      return "primary";
  }
}

export default FDSCircleButton;
