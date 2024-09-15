/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { MetaConfig } from "MetaConfig";

import {
  CUSTOM_REACTIONS_NUM,
  defaultCustomizableReactions,
  defaultStaticReactions,
  heartType1,
  heartType2,
  isHeart,
} from "./MWChatMessengerReactionsUtils";

const getHarmfulEmojisForBroadcastChannels = () => {
  const harmfulEmojis = MetaConfig._("58");
  return new Set(
    harmfulEmojis.split(",").map((emoji) => ({
      codepoints: [emoji.codePointAt(0)],
      id: emoji,
    }))
  );
};

export {
  CUSTOM_REACTIONS_NUM,
  defaultCustomizableReactions,
  defaultStaticReactions,
  getHarmfulEmojisForBroadcastChannels,
  heartType1,
  heartType2,
  isHeart,
};
