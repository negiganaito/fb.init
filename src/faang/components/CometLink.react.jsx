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
import React, { forwardRef, useContext } from "react";
import { html } from "react-strict-dom";

import isCometRouterUrl from "../../helpers/isCometRouterUrl";

import BaseLink from "./BaseLink.react";
import CometDangerouslySuppressInteractiveElementsContext from "./CometDangerouslySuppressInteractiveElementsContext";
import { CometTextContextProviderNonNull } from "./CometTextContext.react";
import CometTextTypography from "./CometTextTypography.react";

const styles = {
  disabled: {
    color: "x1dntmbh",
    textDecorationLine: "x1ubmc1d xkrqix3",
    $$css: true,
  },
  root: {
    color: "x1heor9g",
    textDecorationLine: "x1sur9pj xkrqix3",
    $$css: true,
  },
};

const colors = {
  blueLink: { color: "x1fey0fg", $$css: true },
  disabled: { color: "x1dntmbh", $$css: true },
  highlight: { color: "x1qq9wsj", $$css: true },
  negative: { color: "x1a1m0xk", $$css: true },
  positive: { color: "x6u5lvz", $$css: true },
  primary: { color: "xzsf02u", $$css: true },
  secondary: { color: "xi81zsa", $$css: true },
  tertiary: { color: "x12scifz", $$css: true },
  white: { color: "x14ctfv", $$css: true },
};

const weights = {
  bold: { fontWeight: "x1xlr1w8", $$css: true },
  medium: { fontWeight: "xk50ysn", $$css: true },
  normal: { fontWeight: "xo1l8bm", $$css: true },
  semibold: { fontWeight: "x1s688f", $$css: true },
};

const displays = {
  block: { display: "x1lliihq", $$css: true },
  "inline-block": { display: "x1rg5ohu", $$css: true },
};

// eslint-disable-next-line complexity
const CometLink = forwardRef((props, ref) => {
  const {
    color,
    disabled = false,
    display = "inline",
    fbclid,
    href,
    lynxMode,
    role,
    target,
    weight,
    xstyle,
    ...rest
  } = props;

  const textContext = useContext(CometTextContextProviderNonNull);
  const suppressInteractiveElementsContext = useContext(
    CometDangerouslySuppressInteractiveElementsContext
  );

  const isExternal =
    target === "_blank" ||
    (target === null &&
      href !== null &&
      href !== "#" &&
      !isCometRouterUrl(href));

  const resolvedColor =
    color ??
    (textContext !== null ? getColor(textContext.type, isExternal) : "inherit");

  const resolvedWeight =
    weight ??
    (textContext !== null
      ? getWeight(textContext.type, isExternal)
      : "inherit");

  const resolvedRole =
    role === null && (href === null || href === "#") ? "button" : role;

  return suppressInteractiveElementsContext ? (
    // eslint-disable-next-line react/jsx-pascal-case
    <html.span
      ref={ref}
      style={[
        resolvedColor !== "inherit" && colors[resolvedColor],
        resolvedWeight !== "inherit" && weights[resolvedWeight],
        disabled && styles.disabled,
        display !== "inline" && displays[display],
      ]}
      {...rest}
    >
      {props.children}
    </html.span>
  ) : (
    <BaseLink
      {...rest}
      disabled={disabled}
      display="inline"
      fbclid={fbclid}
      href={href}
      lynxMode={lynxMode}
      ref={ref}
      role={resolvedRole}
      target={isExternal ? "_blank" : target}
      xstyle={[
        styles.root,
        resolvedColor !== "inherit" && colors[resolvedColor],
        resolvedWeight !== "inherit" && weights[resolvedWeight],
        disabled && styles.disabled,
        display !== "inline" && displays[display],
        xstyle,
      ]}
    />
  );
});

CometLink.displayName = "CometLink";

function getColor(type, isExternal) {
  switch (type) {
    case "headline3":
    case "headline4":
    case "body1":
    case "body2":
    case "body3":
    case "body4":
      return isExternal ? "blueLink" : "primary";
    case "meta1":
    case "meta2":
    case "meta3":
    case "meta4":
      return isExternal ? "blueLink" : "inherit";
    default:
      return "inherit";
  }
}

function getWeight(type, isExternal) {
  if (!isExternal) {
    const typographyType = getTypographyType(type);
    return CometTextTypography[typographyType].fontWeight;
  }
  return "inherit";
}

function getTypographyType(type) {
  switch (type) {
    case "headline3":
      return "headlineEmphasized3";
    case "headline4":
      return "headlineEmphasized4";
    case "body1":
      return "bodyLink1";
    case "body2":
      return "bodyLink2";
    case "body3":
      return "bodyLink3";
    case "body4":
      return "bodyLink4";
    default:
      return type;
  }
}

export default CometLink;
