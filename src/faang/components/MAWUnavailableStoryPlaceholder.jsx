/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import fbt from "path-to-fbt";

import MWV2TombstonedMessage from "./MWV2TombstonedMessage";

const MAWUnavailableStoryPlaceholder = ({ isOutgoing }) => {
  return (
    <MWV2TombstonedMessage isOutgoing={isOutgoing}>
      {fbt._("__JHASH__pGZ-I0iz-G0__JHASH__")}
    </MWV2TombstonedMessage>
  );
};

MAWUnavailableStoryPlaceholder.displayName = `${MAWUnavailableStoryPlaceholder.name}`;

export default MAWUnavailableStoryPlaceholder;
