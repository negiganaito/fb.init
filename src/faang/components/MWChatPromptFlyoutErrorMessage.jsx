/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import fbt from "fbt";

import MWXTextReact from "./MWXText.react";

const MWChatPromptFlyoutErrorMessage = () => {
  return (
    <div className="x1l90r2v x2b8uid">
      <MWXTextReact color="negative" type="meta4">
        {fbt("__JHASH__BNDx1mX2nlz__JHASH__")}
      </MWXTextReact>
    </div>
  );
};

MWChatPromptFlyoutErrorMessage.displayName = "MWChatPromptFlyoutErrorMessage";

export default MWChatPromptFlyoutErrorMessage;
