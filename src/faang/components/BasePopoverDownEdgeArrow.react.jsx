/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

const BasePopoverDownEdgeArrow = (props) => {
  return (
    <svg
      aria-hidden={true}
      height={12}
      viewBox="0 0 21 12"
      width={21}
      {...props}
    >
      {props.children !== null && <defs>{props.children}</defs>}
      <path d="M21 0c-2.229.424-4.593 2.034-6.496 3.523L5.4 10.94c-2.026 2.291-5.434.62-5.4-2.648V0h21Z" />
    </svg>
  );
};

BasePopoverDownEdgeArrow.displayName = `BasePopoverDownEdgeArrow [from ${__filename}]`;
BasePopoverDownEdgeArrow._isSVG = true;

export default BasePopoverDownEdgeArrow;
