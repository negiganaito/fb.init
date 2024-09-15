/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import fbt from "fbt";

import MWXMessageReplyBubble from "./MWXMessageReplyBubble";

const MWV2ReplyError = ({ outgoing }) => {
  return (
    <MWXMessageReplyBubble fontStyle="italic" outgoing={outgoing}>
      {fbt._("__JHASH__962PS6SI-P2__JHASH__")}
    </MWXMessageReplyBubble>
  );
};

MWV2ReplyError.displayName = `MWV2ReplyError`;

export default MWV2ReplyError;
