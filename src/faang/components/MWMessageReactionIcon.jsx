/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import stylex from "@stylexjs/stylex";
import fbt from "fbt";

import { MessageActions } from "./MWChatColors";

const MWMessageReactionIcon = ({ size = 16, viewBox = "0 0 16 16" }) => {
  return (
    <svg
      fill="none"
      height={size}
      viewBox={viewBox}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{fbt("__JHASH__Wo2O5nlXhKT__JHASH__")}</title>
      <path
        className={stylex(MessageActions.styles.svgFill)}
        d="M12.48 0.64C12.48 0.286538 12.7665 0 13.12 0C13.4735 0 13.76 0.286538 13.76 0.64V2.08C13.76 2.16837 13.8316 2.24 13.92 2.24H15.36C15.7135 2.24 16 2.52654 16 2.88C16 3.23346 15.7135 3.52 15.36 3.52H13.92C13.8316 3.52 13.76 3.59163 13.76 3.68V5.12C13.76 5.47346 13.4735 5.76 13.12 5.76C12.7665 5.76 12.48 5.47346 12.48 5.12V3.68C12.48 3.59163 12.4084 3.52 12.32 3.52H10.88C10.5265 3.52 10.24 3.23346 10.24 2.88C10.24 2.52654 10.5265 2.24 10.88 2.24H12.32C12.4084 2.24 12.48 2.16837 12.48 2.08V0.64Z"
      />
      <path
        className={stylex(MessageActions.styles.svgFill)}
        clipRule="evenodd"
        d="M8.96 2.42705C8.96 2.28386 8.86505 2.15735 8.726 2.12317C8.18582 1.99041 7.62113 1.92 7.04 1.92C3.15192 1.92 0 5.07192 0 8.96C0 12.8481 3.15192 16 7.04 16C10.9281 16 14.08 12.8481 14.08 8.96C14.08 8.37887 14.0096 7.81418 13.8768 7.274C13.8427 7.13495 13.7161 7.04 13.573 7.04H13.12C12.0596 7.04 11.2 6.18039 11.2 5.12C11.2 4.94327 11.0567 4.8 10.88 4.8C9.81961 4.8 8.96 3.94039 8.96 2.88V2.42705ZM4.63999 6.4C4.03999 6.4 3.67999 6.88 3.67999 7.68C3.67999 8.48 4.03999 8.96 4.63999 8.96C5.23999 8.96 5.59999 8.48 5.59999 7.68C5.59999 6.88 5.23999 6.4 4.63999 6.4ZM9.43999 6.4C8.83999 6.4 8.47999 6.88 8.47999 7.68C8.47999 8.48 8.83999 8.96 9.43999 8.96C10.04 8.96 10.4 8.48 10.4 7.68C10.4 6.88 10.04 6.4 9.43999 6.4ZM10.56 11.2C10.56 12.48 8.96 13.76 7.04 13.76C5.12 13.76 3.52 12.48 3.52 11.2C3.52 11.0233 3.66327 10.88 3.84 10.88H10.24C10.4167 10.88 10.56 11.0233 10.56 11.2Z"
        fillRule="evenodd"
      />
    </svg>
  );
};

MWMessageReactionIcon.displayName = `${MWMessageReactionIcon.name} [from ${module.id}]`;

export default MWMessageReactionIcon;
