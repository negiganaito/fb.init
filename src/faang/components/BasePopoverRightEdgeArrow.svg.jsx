/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

const BasePopoverRightEdgeArrow = (props) => {
  return (
    <svg
      aria-hidden={true}
      height={21}
      viewBox="0 0 12 21"
      width={12}
      {...props}
    >
      {props.children !== null && <defs>{props.children}</defs>}
      <path
        d="M20.685.12c-2.229.424-4.278 1.914-6.181 3.403L5.4 10.94c-2.026 2.291-5.434.62-5.4-2.648V.12Z"
        transform="rotate(-90 10.498 10.488)"
      />
    </svg>
  );
};

BasePopoverRightEdgeArrow.displayName = `BasePopoverRightEdgeArrow [from ${__filename}]`;
BasePopoverRightEdgeArrow._isSVG = true;

export default BasePopoverRightEdgeArrow;
