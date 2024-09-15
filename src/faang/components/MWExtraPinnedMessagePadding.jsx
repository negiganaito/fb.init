/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import useMWPIsMessagePinned from "../../hooks/useMWPIsMessagePinned";

import { MWPMessageListColumnVerticalRhythm } from "./MWPMessageListColumn.react";

function MWExtraPinnedMessagePadding({ nextMessage }) {
  const isMessagePinned = useMWPIsMessagePinned(nextMessage);

  if (isMessagePinned) {
    return <MWPMessageListColumnVerticalRhythm height={6} />;
  }

  return null;
}

MWExtraPinnedMessagePadding.displayName = `${MWExtraPinnedMessagePadding.name}`;

export default MWExtraPinnedMessagePadding;
