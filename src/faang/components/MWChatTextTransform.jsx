/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import CometEmojiTransform from "./CometEmojiTransform";
import CometEmoticonTransform from "./CometEmoticonTransform";
import MAWUnvaultTransform from "./MAWUnvaultTransform";

const emoticonTransform = CometEmoticonTransform();
const emojiTransform = CometEmojiTransform();
const textTransformsNoVault = [emoticonTransform, emojiTransform];

const textTransforms =
  MAWUnvaultTransform !== null
    ? [...textTransformsNoVault, MAWUnvaultTransform()]
    : textTransformsNoVault;

function textTransformsWithOptions(text) {
  return [CometEmoticonTransform(text), CometEmojiTransform(text)];
}

export {
  emojiTransform,
  emoticonTransform,
  textTransforms,
  textTransformsNoVault,
  textTransformsWithOptions,
};
