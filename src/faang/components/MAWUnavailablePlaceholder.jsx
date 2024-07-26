/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import fbt from "path-to-fbt";

import MWV2TombstonedMessage from "./MWV2TombstonedMessage";

const MAWUnavailablePlaceholder = ({ isOutgoing }) => {
  const gkx_2161 = true;
  const message = gkx_2161
    ? fbt._("__JHASH__bLtIFgZUFni__JHASH__")
    : fbt._("__JHASH__M9fzIhDqITQ__JHASH__");

  return (
    <MWV2TombstonedMessage isOutgoing={isOutgoing}>
      {message}
    </MWV2TombstonedMessage>
  );
};

MAWUnavailablePlaceholder.displayName = `${MAWUnavailablePlaceholder.name}`;

export default MAWUnavailablePlaceholder;
