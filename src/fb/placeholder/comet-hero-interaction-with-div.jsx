/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
import { LegacyHidden } from "@fb-unknown/index";

export const CometHeroInteractionWithDiv = forwardRef(
  ({ children, className, hidden, htmlAttributes, pageletAriaProps }, ref) => {
    return jsx(LegacyHidden, {
      htmlAttributes: {
        className,
        onMouseLeave: !htmlAttributes ? void 0 : htmlAttributes.onMouseLeave,
        style: !htmlAttributes ? void 0 : htmlAttributes.style,
        ...pageletAriaProps,
      },
      mode: hidden === !0 ? "hidden" : "visible",
      ref,
      children,
    });
  }
);
