/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable react/jsx-pascal-case */

import React, { forwardRef, useMemo } from "react";
import stylex from "@stylexjs/stylex";
import fbt from "fbt";

import BaseIsDecorativeContext from "../../context/BaseIsDecorativeContext";
import IconSource from "../../helpers/IconSource";
import TintableIconSource from "../../helpers/TintableIconSource";

import BaseImage_DEPRECATED from "./BaseImage_DEPRECATED";
import CometPressable from "./CometPressable";
import CometSVGIcon from "./CometSVGIcon";
import FDSTintedIcon from "./FDSTintedIcon";
import ImageIconSource from "./ImageIconSource";
import { EmojiIcon, LegacySVGIcon, SVGIcon } from "./SVGIcon";

const styles = {
  button: {
    appearance: "none",
    backgroundColor: "transparent",
    borderTopStyle: "solid",
    borderEndStyle: "solid",
    borderBottomStyle: "solid",
    borderStartStyle: "solid",
    borderTopWidth: 0,
    borderEndWidth: 0,
    borderBottomWidth: 0,
    borderStartWidth: 0,
    display: 0,
    marginTop: 0,
    marginEnd: 0,
    marginBottom: 0,
    marginStart: 0,
    paddingTop: 0,
    paddingEnd: 0,
    paddingBottom: 0,
    paddingStart: 0,
    position: "relative",
    verticalAlign: "bottom",
    "::after_borderTopStartRadius": "50%",
    "::after_borderTopEndRadius": "50%",
    "::after_borderBottomEndRadius": "50%",
    "::after_borderBottomStartRadius": "50%",
    "::after_bottom": "-8px",
    "::after_content": "",
    "::after_end": "x10pfhc2",
    "::after_left": null,
    "::after_right": null,
    "::after_position": "x1j6awrg",
    "::after_start": "x1v53gu8",
    "::after_top": "x1tfg27r",
    "::after_zIndex": "xitxdhh",
  },
  image: {
    verticalAlign: "x1b0d499",
  },
  imageContain: {
    objectFit: "xz74otr",
  },
  imageCover: {
    objectFit: "xl1xv1r",
  },
  pressed: {
    transform: "x1n5d1j9",
  },
};

const FDSIcon = forwardRef((props, ref) => {
  const {
    alt = "",
    color = "primary",
    disabled = false,
    disableOverlay_DEPRECATED = false,
    draggable,
    focusable,
    hideHoverOverlay = false,
    icon,
    id,
    isDecorative = false,
    linkProps,
    onHoverIn,
    onHoverOut,
    onPress,
    onPressIn,
    onPressOut,
    size = 8,
    testid,
    testOnly_pressed = false,
    xstyle,
    ...rest
  } = props;

  const isPressable = onPress !== null || linkProps !== null;
  const ariaLabel = rest["aria-label"];
  const altText = useMemo(() => {
    if (
      !isPressable &&
      (typeof ariaLabel === "string" || fbt.isFbtInstance(ariaLabel))
    ) {
      return ariaLabel;
    }
    return isDecorative ? "" : alt;
  }, [ariaLabel, isDecorative, isPressable, alt]);

  const iconSource = useMemo(() => {
    if (icon instanceof TintableIconSource) return icon;
    if (icon instanceof ImageIconSource) return icon;
    if (icon instanceof IconSource) return icon;
    if (typeof icon === "object" && icon.$$typeof === "fb.tintableiconsource") {
      return new TintableIconSource(icon.domain, icon.src, icon.size);
    }
    if (typeof icon === "object" && icon.$$typeof === "fb.iconsource") {
      return new IconSource(icon.domain, icon.src, icon.size);
    }
    if (typeof icon === "object" && icon.$$typeof === "fb.imageiconsource") {
      return new ImageIconSource(
        icon.src,
        icon.width,
        icon.height,
        icon.resizeStrategy
      );
    }
    return icon;
  }, [icon]);

  const iconColor = disabled ? "disabled" : color;

  const iconElement = (() => {
    if (iconSource instanceof TintableIconSource) {
      return (
        <FDSTintedIcon
          alt={altText}
          color={getColor(iconColor)}
          draggable={draggable}
          icon={iconSource}
          id={id}
          ref={isPressable ? ref : undefined}
          testid={testid}
          xstyle={xstyle}
        />
      );
    }
    if (iconSource instanceof ImageIconSource) {
      return (
        <BaseImage_DEPRECATED
          alt={altText}
          className={stylex(
            styles.image,
            iconSource.resizeStrategy === "contain" && styles.imageContain,
            iconSource.resizeStrategy === "cover" && styles.imageCover,
            xstyle
          )}
          draggable={draggable}
          id={id}
          ref={isPressable ? ref : undefined}
          src={iconSource.src}
          style={{ height: iconSource.height, width: iconSource.width }}
          testid={testid}
        />
      );
    }
    if (iconSource instanceof IconSource) {
      return (
        <BaseImage_DEPRECATED
          alt={altText}
          className={stylex(styles.image, xstyle)}
          draggable={draggable}
          height={iconSource.size}
          id={id}
          ref={isPressable ? ref : undefined}
          src={iconSource.src}
          width={iconSource.size}
        />
      );
    }
    if (iconSource instanceof LegacySVGIcon) {
      return (
        <iconSource.component
          alt={altText}
          color={iconColor}
          data-testid={testid}
          id={id}
          size={size}
        />
      );
    }
    if (iconSource instanceof SVGIcon) {
      return (
        <CometSVGIcon
          alt={altText}
          color={iconColor}
          component={iconSource.component}
          data-testid={testid}
          id={id}
          size={size}
        />
      );
    }
    if (iconSource instanceof EmojiIcon) {
      return (
        <iconSource.component
          emoji={iconSource.codepoints}
          size={size === 112 ? 128 : size}
        />
      );
    }
    return (
      <CometSVGIcon
        alt={altText}
        color={iconColor}
        component={iconSource}
        data-testid={testid}
        id={id}
        size={size}
      />
    );
  })();

  const content = isDecorative ? (
    <BaseIsDecorativeContext.Provider value>
      {iconElement}
    </BaseIsDecorativeContext.Provider>
  ) : (
    iconElement
  );

  return isPressable ? (
    <CometPressable
      {...rest}
      disabled={disabled}
      focusable={focusable}
      hideHoverOverlay={hideHoverOverlay}
      linkProps={linkProps}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      overlayDisabled={disableOverlay_DEPRECATED}
      overlayOffset={8}
      overlayRadius="50%"
      ref={ref}
      testOnly_pressed={testOnly_pressed}
      testid={testid}
      xstyle={(state) => [styles.button, state.pressed && styles.pressed]}
    >
      {content}
    </CometPressable>
  ) : (
    content
  );
});

FDSIcon.displayName = `${FDSIcon.name}`;

const colorMap = {
  positive: "positive",
  negative: "negative",
  disabled: "disabled",
  highlight: "accent",
  secondary: "secondary",
  tertiary: "placeholder",
  white: "white",
  primary: "primary",
  warning: "warning",
  blueLink: "blueLink",
  primaryAccent: "primaryAccent",
  default: "black",
};

const getColor = (color) => colorMap[color] || colorMap.default;

export default FDSIcon;
