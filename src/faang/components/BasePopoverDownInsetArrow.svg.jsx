/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

const BasePopoverDownInsetArrow = (props) => {
  return (
    <svg
      aria-hidden={true}
      height={12}
      viewBox="0 0 25 12"
      width={25}
      {...props}
    >
      {props.children !== null && <defs>{props.children}</defs>}
      <path d="M24.453.001c-2.791.32-5.922 1.53-7.78 3.455l-9.62 7.023c-2.45 2.54-5.78 1.645-5.78-2.487V1.983C1.273 1.089.746.32 0 0h24.453v.001Z" />
    </svg>
  );
};

BasePopoverDownInsetArrow.displayName = `BasePopoverDownInsetArrow [from ${__filename}]`;
BasePopoverDownInsetArrow._isSVG = true;

export default BasePopoverDownInsetArrow;
