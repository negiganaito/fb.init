/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { of_string, one, zero } from "../../helpers/I64";

import { codeArrayToUnicode } from "./EmojiFormat.bs";
import LSEmojiSetsType from "./LSEmojiSetsType";
import { ofNumber } from "./LSIntEnum";

const defaultStaticReactions = [
  {
    categoryIdx: of_string("6"),
    emoji: "❤",
    emojiIdx: zero,
    sortKey: zero,
    type_: ofNumber(LSEmojiSetsType.USER_GENERATED),
  },
  {
    categoryIdx: zero,
    emoji: "😆",
    emojiIdx: of_string("4"),
    sortKey: one,
    type_: ofNumber(LSEmojiSetsType.USER_GENERATED),
  },
  {
    categoryIdx: zero,
    emoji: "😮",
    emojiIdx: of_string("84"),
    sortKey: of_string("2"),
    type_: ofNumber(LSEmojiSetsType.USER_GENERATED),
  },
  {
    categoryIdx: zero,
    emoji: "😢",
    emojiIdx: of_string("48"),
    sortKey: of_string("3"),
    type_: ofNumber(LSEmojiSetsType.USER_GENERATED),
  },
  {
    categoryIdx: zero,
    emoji: "😡",
    emojiIdx: of_string("52"),
    sortKey: of_string("4"),
    type_: ofNumber(LSEmojiSetsType.USER_GENERATED),
  },
  {
    categoryIdx: zero,
    emoji: "👍",
    emojiIdx: of_string("131"),
    sortKey: of_string("5"),
    type_: ofNumber(LSEmojiSetsType.USER_GENERATED),
  },
  {
    categoryIdx: zero,
    emoji: "👎",
    emojiIdx: of_string("132"),
    sortKey: of_string("6"),
    type_: ofNumber(LSEmojiSetsType.USER_GENERATED),
  },
];

const defaultCustomizableReactions = defaultStaticReactions.slice(0, 6);

const heartType1 = codeArrayToUnicode([10084, 65039]);
const heartType2 = codeArrayToUnicode([10084]);

const isHeart = (emoji) => emoji === heartType1 || emoji === heartType2;

const CUSTOM_REACTIONS_NUM = 6;

export {
  CUSTOM_REACTIONS_NUM,
  defaultCustomizableReactions,
  defaultStaticReactions,
  heartType1,
  heartType2,
  isHeart,
};
