/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import fbt from "fbt";
import gkx from "gkx";

import MWXTextReact from "./MWXText.react";
import RollCallPromptType from "./RollCallPromptType";

const MWChatPromptFlyoutDisclaimer = ({ promptType }) => {
  const isFeatureEnabled = gkx("23420");

  return (
    <div className="xyamay9 x1l90r2v x2b8uid">
      <MWXTextReact type="meta4">
        {isFeatureEnabled
          ? promptType === RollCallPromptType.TEXT
            ? fbt("__JHASH__1b6dQcj_nOc__JHASH__")
            : fbt("__JHASH__TBziAJEAe-m__JHASH__")
          : fbt("__JHASH__oEdtqK8h88D__JHASH__")}
      </MWXTextReact>
    </div>
  );
};

MWChatPromptFlyoutDisclaimer.displayName =
  "MWChatPromptFlyoutDisclaimer [from 226]";

export default MWChatPromptFlyoutDisclaimer;
