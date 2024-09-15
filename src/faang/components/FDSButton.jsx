/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useContext, useRef } from "react";

import CometGHLRenderingContext from "../../context/CometGHLRenderingContext";
import isBlueprintStylesEnabled from "../../helpers/isBlueprintStylesEnabled";
import mergeRefs from "../../helpers/mergeRefs";
import useCometTheme from "../../hooks/useCometTheme";

import BaseStyledButton from "./BaseStyledButton";
import FDSIcon from "./FDSIcon";
import FDSText from "./FDSText";
import FDSTooltip from "./FDSTooltip";

const styles = {
  contentDisabled: { opacity: "xuzhngd",  },
  darkOverlay: { backgroundColor: "x18l40ae", color: "x14ctfv",  },
  darkOverlayPressed: { backgroundColor: "x1lxk4cn",  },
  disabled: { backgroundColor: "xwcfey6",  },
  fdsOverrideBlack: { backgroundColor: "xal61yo",  },
  fdsOverrideCollaborativePostCTA: {
    backgroundColor: "x14hiurz",
    mixBlendMode: "x1nor908",
    ,
  },
  fdsOverrideNegative: { backgroundColor: "x1ciooss",  },
  fdsOverridePositive: { backgroundColor: "xv9rvxn",  },
  overlay: { backgroundColor: "x14hiurz",  },
  overlayDeemphasized: { backgroundColor: "x1f2gare",  },
  overlayDisabled: { backgroundColor: "x1ahlmzr",  },
  overlayOverlayPressed: { backgroundColor: "xiwuv7k",  },
  paddingIconOnly: {
    paddingEnd: "x1jdnuiz",
    paddingLeft: null,
    paddingRight: null,
    paddingStart: "x1x99re3",
    ,
  },
  primary: { backgroundColor: "xtvsq51",  },
  primaryDeemphasized: { backgroundColor: "x1hr4nm9",  },
  primaryOverlayPressed: { backgroundColor: "x1iutvsz",  },
  secondary: { backgroundColor: "x1qhmfi1",  },
  secondaryDeemphasized: { backgroundColor: "xjbqb8w",  },
  sizeLarge: { height: "x1fq8qgq",  },
  sizeMedium: { height: "x1r1pt67",  },
};

const sizeStyles = {
  sizeLarge: { borderRadius: "xjufhxy", height: "x1whk3tm",  },
  sizeMedium: { borderRadius: "x17se2pc", height: "xfumdyt",  },
};

const buttonStyles = {
  primary: {
    iconColor: "white",
    overlayPressedStyle: styles.primaryOverlayPressed,
    textColor: "white",
    ":deemphasized": {
      iconColor: "highlight",
      overlayPressedStyle: styles.primaryDeemphasizedOverlayPressed,
      textColor: "highlight",
    },
    ":disabled": { iconColor: "disabled", textColor: "disabled" },
  },
  secondary: {
    iconColor: "primary",
    overlayPressedStyle: styles.secondaryOverlayPressed,
    textColor: "secondary",
    ":deemphasized": {
      iconColor: "highlight",
      overlayPressedStyle: styles.secondaryDeemphasizedOverlayPressed,
      textColor: "highlight",
    },
    ":disabled": { iconColor: "disabled", textColor: "disabled" },
  },
  overlay: {
    iconColor: "primary",
    overlayPressedStyle: styles.overlayOverlayPressed,
    textColor: "primary",
    ":deemphasized": {
      iconColor: "white",
      overlayPressedStyle: styles.overlayDeemphasizedOverlayPressed,
      textColor: "white",
    },
    ":disabled": { iconColor: "disabled", textColor: "disabled" },
  },
  "dark-overlay": {
    iconColor: "white",
    overlayPressedStyle: styles.darkOverlayPressed,
    textColor: "white",
    ":deemphasized": {
      iconColor: "white",
      overlayPressedStyle: styles.overlayDeemphasizedOverlayPressed,
      textColor: "white",
    },
    ":disabled": { iconColor: "disabled", textColor: "disabled" },
  },
};

const getButtonStyle = (type, { disabled, reduceEmphasis }) => {
  const style = buttonStyles[type] || buttonStyles.primary;
  if (disabled) return style[":disabled"] || style;
  if (reduceEmphasis) return style[":deemphasized"] || style;
  return style;
};

// eslint-disable-next-line complexity
const FDSButton = forwardRef((props, ref) => {
  const {
    addOnPrimary,
    addOnSecondary,
    disabled = false,
    icon,
    id,
    label,
    labelIsHidden = false,
    linkProps,
    onFocusIn,
    onFocusOut,
    onHoverIn,
    onHoverOut,
    onPress,
    onPressIn,
    onPressOut,
    padding = "normal",
    reduceEmphasis = false,
    size = "medium",
    suppressHydrationWarning = false,
    testid,
    testOnly_pressed = false,
    tooltip,
    tooltipPosition = "above",
    type = "primary",
    ...rest
  } = props;

  const { iconColor, overlayPressedStyle, textColor } = getButtonStyle(type, {
    disabled,
    reduceEmphasis,
  });

  const internalRef = useRef(null);
  const [ThemeProvider, toggleTheme] = useCometTheme("light");
  const context = useContext(CometGHLRenderingContext);
  const isContextEnabled = linkProps !== null && context;

  const ariaLabel = props["aria-label"] || label;
  const displayLabel = labelIsHidden ? null : (
    <FDSText
      color={textColor}
      numberOfLines={1}
      type={size === "large" ? "button1" : "button2"}
    >
      {label}
    </FDSText>
  );

  const buttonContent = (
    <BaseStyledButton
      {...rest}
      addOnEnd={addOnSecondary}
      addOnStart={addOnPrimary}
      aria-label={isContextEnabled ? undefined : ariaLabel}
      content={displayLabel}
      contentXstyle={[
        type === "overlay" && disabled && styles.contentDisabled,
        type === "overlay" && toggleTheme,
        size === "medium" &&
          (isBlueprintStylesEnabled()
            ? sizeStyles.sizeMedium
            : styles.sizeMedium),
        size === "large" &&
          (isBlueprintStylesEnabled()
            ? sizeStyles.sizeLarge
            : styles.sizeLarge),
        icon && labelIsHidden && styles.paddingIconOnly,
      ]}
      disabled={disabled}
      icon={
        icon && <FDSIcon color={iconColor} icon={icon} isDecorative size={16} />
      }
      id={id}
      linkProps={linkProps}
      onFocusIn={onFocusIn}
      onFocusOut={onFocusOut}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      overlayPressedStyle={overlayPressedStyle}
      padding={padding}
      ref={mergeRefs(internalRef, ref)}
      suppressHydrationWarning={suppressHydrationWarning}
      testOnly_pressed={testOnly_pressed}
      testid={testid}
      xstyle={[
        type === "primary" && styles.primary,
        type === "primary" && reduceEmphasis && styles.primaryDeemphasized,
        type === "secondary" && styles.secondary,
        type === "secondary" && reduceEmphasis && styles.secondaryDeemphasized,
        type === "fdsOverride_black" && styles.fdsOverrideBlack,
        type === "fdsOverride_negative" && styles.fdsOverrideNegative,
        type === "fdsOverride_positive" && styles.fdsOverridePositive,
        type === "fdsOverride_collaborativePostCTA" &&
          styles.fdsOverrideCollaborativePostCTA,
        type === "overlay" && styles.overlay,
        type === "overlay" && reduceEmphasis && styles.overlayDeemphasized,
        disabled && styles.disabled,
        type === "overlay" && disabled && styles.overlayDisabled,
        type === "dark-overlay" && styles.darkOverlay,
      ]}
    />
  );

  let content =
    type === "overlay" ? (
      <ThemeProvider>{buttonContent}</ThemeProvider>
    ) : (
      buttonContent
    );

  return tooltip ? (
    <FDSTooltip position={tooltipPosition} tooltip={tooltip}>
      {content}
    </FDSTooltip>
  ) : (
    content
  );
});

FDSButton.displayName = `${FDSButton.name} [from ${module.id}]`;

export default FDSButton;
