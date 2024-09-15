/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

const WorkplaceChatFilled12 = (props) => {
  return (
    <svg
      viewBox="0 0 12 13"
      width="1em"
      height="1em"
      fill="currentColor"
      {...props}
    >
      {props.title && <title>{props.title}</title>}
      {props.children && <defs>{props.children}</defs>}
      <g fillRule="evenodd" transform="translate(-450 -1073)">
        <path d="M456 1073.5a6 6 0 0 0-5.144 9.09l-.856 2.91 3.065-.766A6 6 0 1 0 456 1073.5" />
      </g>
    </svg>
  );
};

WorkplaceChatFilled12.displayName = `${WorkplaceChatFilled12.name} [from ${module.id}]`;
WorkplaceChatFilled12._isSVG = true;

export default WorkplaceChatFilled12;
