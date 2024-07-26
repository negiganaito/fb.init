/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import CometEmoji from "./CometEmoji";
import { useCometTextContext } from "./CometTextContext.react";
import CometTextTypography from "./CometTextTypography.react";

const sizeMap = new Map([
  [16, 16],
  [20, 16],
  [24, 20],
  [28, 24],
  [32, 30],
  [38, 32],
]);

function getDefaultSize() {
  const context = useCometTextContext();
  const type = context?.type ?? "body4";
  let lineHeight = 16;
  if (type in CometTextTypography) {
    lineHeight = CometTextTypography[type].lineHeight;
  }
  return sizeMap.get(lineHeight) ?? 16;
}

function CometEmojiWithContextualSize(props) {
  const defaultSize = getDefaultSize();
  const size = props.size ?? defaultSize;
  return props.renderCustomEmoji ? (
    props.renderCustomEmoji(size)
  ) : (
    <CometEmoji {...props} size={size} />
  );
}

CometEmojiWithContextualSize.displayName = `${CometEmojiWithContextualSize.name} [from ${__filename}]`;

export default CometEmojiWithContextualSize;
