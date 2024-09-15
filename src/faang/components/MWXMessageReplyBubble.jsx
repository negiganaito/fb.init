/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import fbt from "fbt";

import stylex from "../../helpers/stylex";

import CometScreenReaderText from "./CometScreenReaderText";
import MWXMessageBubble from "./MWXMessageBubble";
import MWXTextReact from "./MWXText.react";

const styles = {
  content: {
    overflowWrap: "x1mzt3pk",
    paddingBottom: "x1l90r2v",
    paddingTop: "x1iorvi4",
  },
  italic: {
    fontStyle: "x1k4tb9n",
  },
};

const MWXMessageReplyBubble = ({
  children,
  fontStyle = "normal",
  outgoing,
}) => {
  return (
    <MWXMessageBubble
      align={outgoing ? "right" : "left"}
      color="quoted"
      connectBottom={true}
      connectTop={false}
      precedesXMA={false}
    >
      <CometScreenReaderText text={fbt._("__JHASH__pLiiclD1jc1__JHASH__")} />
      <MWXTextReact color="secondary" type="body4">
        <div
          className={stylex(
            styles.content,
            fontStyle === "italic" && styles.italic
          )}
          data-testid={undefined}
        >
          {children}
        </div>
      </MWXTextReact>
    </MWXMessageBubble>
  );
};

MWXMessageReplyBubble.displayName = `MWXMessageReplyBubble [from ${__filename}]`;

export default MWXMessageReplyBubble;
