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
import React, { forwardRef } from "react";

import CometPressable from "./CometPressable";

const styles = {
  button: {
    appearance: "xjyslct",
    backgroundColor: "xjbqb8w",
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "x972fbf",
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
    "::after_position": "x1j6awrg",
    "::after_start": "x1v53gu8",
    "::after_top": "x1tfg27r",
    "::after_zIndex": "xitxdhh",
    $$css: !0,
  },
  image: {
    verticalAlign: "x1b0d499",
    $$css: !0,
  },
  imageContain: {
    objectFit: "xz74otr",
    $$css: !0,
  },
  imageCover: {
    objectFit: "xl1xv1r",
    $$css: !0,
  },
  pressed: {
    transform: "x1n5d1j9",
    $$css: !0,
  },
};

function CometIcon(
  {
    alt = "",
    color = "primary",
    disabled = false,
    disableOverlay_DEPRECATED = false,
    draggable,
    focusable,
    hideHoverOverlay = false,
    icon,
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
  },
  ref
) {
  const _icon = parseFlightIcon(icon);
  const _testid = onPress === null ? testid : undefined;
  color = disabled === true ? "disabled" : color;

  const isClickable = onPress !== null || linkProps !== null;
  const _alt = (!isClickable && rest["aria-label"]) || alt;

  const refCallback = ref;

  const iconComponent =
    icon instanceof TintableIconSource ? (
      <CometTintedIcon
        alt={_alt}
        color={getColor(color)}
        draggable={draggable}
        icon={_icon}
        ref={refCallback}
        testid={undefined}
        xstyle={xstyle}
      />
    ) : icon instanceof ImageIconSource ? (
      <BaseImage_DEPRECATED
        alt={alt}
        className={stylex(
          styles.image,
          icon.resizeStrategy === "contain" && styles.imageContain,
          icon.resizeStrategy === "cover" && styles.imageCover,
          xstyle
        )}
        draggable={draggable}
        ref={refCallback}
        src={icon.src}
        style={{ height: icon.height, width: icon.width }}
        testid={undefined}
      />
    ) : icon instanceof IconSource ? (
      <BaseImage_DEPRECATED
        alt={alt}
        className={stylex(styles.image, xstyle)}
        draggable={draggable}
        height={icon.size}
        ref={refCallback}
        src={icon.src}
        width={icon.size}
      />
    ) : icon instanceof SVGIcon.LegacySVGIcon ? (
      React.createElement(icon.component, {
        alt: alt,
        color: color,
        size: size,
        "data-testid": _testid,
      })
    ) : icon instanceof SVGIcon.SVGIcon ? (
      <CometSVGIcon
        alt={alt}
        color={color}
        component={icon.component}
        size={size}
      />
    ) : (
      <CometSVGIcon alt={alt} color={color} component={icon} size={size} />
    );

  return isClickable ? (
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
      ref={refCallback}
      testOnly_pressed={testOnly_pressed}
      testid={undefined}
      xstyle={(pressed) => [styles.button, pressed && styles.pressed]}
    >
      {iconComponent}
    </CometPressable>
  ) : (
    iconComponent
  );
}

function getColor(color) {
  switch (color) {
    case "positive":
      return "positive";
    case "negative":
      return "negative";
    case "disabled":
      return "disabled";
    case "highlight":
      return "accent";
    case "secondary":
      return "secondary";
    case "tertiary":
      return "placeholder";
    case "white":
      return "white";
    case "primary":
      return "primary";
    case "warning":
      return "warning";
    case "blueLink":
      return "blueLink";
    default:
      return "black";
  }
}

export default forwardRef(CometIcon);
