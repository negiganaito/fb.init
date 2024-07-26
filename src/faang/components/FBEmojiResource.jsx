/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { EmojiImageURL } from "EmojiImageURL";
import { EmojiRenderer } from "EmojiRenderer";
import { FBEmojiUtils } from "FBEmojiUtils";
import { SupportedEmoji3 } from "SupportedEmoji3";
import { SupportedEmojiExtended } from "SupportedEmojiExtended";
import { SupportedFacebookEmoji } from "SupportedFacebookEmoji";

function normalizeKey(key) {
  const normalizedKey = FBEmojiUtils.normalizeKey(key);
  return SupportedFacebookEmoji[normalizedKey] || SupportedEmoji3[normalizedKey]
    ? normalizedKey
    : null;
}

function getEmojiType(key) {
  if (SupportedEmoji3[key]) return "EMOJI_3";
  if (SupportedFacebookEmoji[key]) return "FB_EMOJI";
  return null;
}

class FBEmojiResource {
  constructor(key) {
    this.key = key;
  }

  getImageURL(size) {
    const key = this.key;

    if (SupportedEmojiExtended[key]) {
      return EmojiImageURL.getFBEmojiExtendedURL(key, size);
    }

    const emojiType = getEmojiType(key);
    switch (emojiType) {
      case "EMOJI_3":
        return EmojiImageURL.getEmoji3URL(key, size);
      case "FB_EMOJI":
        return EmojiImageURL.getFBEmojiURL(key, size);
    }

    return null;
  }

  static firstFromText(text) {
    const parsed = EmojiRenderer.parse(text);
    return parsed.length === 0
      ? null
      : FBEmojiResource.fromCodepoints(parsed[0].emoji);
  }

  static fromCodepoints(codepoints) {
    const key = normalizeKey(FBEmojiUtils.getKeyFromCodepoints(codepoints));
    return key === null ? null : new FBEmojiResource(key);
  }
}

export default FBEmojiResource;
