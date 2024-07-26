/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable complexity */

import { getUTF16Length } from "fbjs/lib/UnicodeUtils";

import EmojiRendererData from "./EmojiRendererData";

const DEFAULT = 0;
const NON_SPACING_MARK = 1;
const VARIATION_SELECTOR = 2;
const EMOJI_MODIFIER = 3;
const EMOJI_MODIFIER_BASE = 4;
const TAG_SPEC = 5;
const ZWJ = 6;
const REGIONAL_INDICATOR = 7;
const TEXT = 8;
const END = 9;
const TEXT_VARIATION_SELECTOR = 10;

const isEmojiRenderable = (emojiArray) => {
  const firstChar = emojiArray[0];
  if (firstChar === undefined) return false;

  const lastIndex = emojiArray.length - 1;
  const lastChar = emojiArray[lastIndex];
  if (lastChar) {
    const lastCharCode = lastChar.charCodeAt(0);
    if (EmojiRendererData.isTagSpec(lastCharCode)) return false;
  }

  const firstCharCode = firstChar.charCodeAt(0);
  if (EmojiRendererData.isSymbol(firstCharCode) && emojiArray.length < 2)
    return false;

  if (EmojiRendererData.isText(firstCharCode)) {
    if (emojiArray.length === 1) return false;
    if (emojiArray.length === 2) {
      return EmojiRendererData.isNonSpacingCombiningMark(
        emojiArray[1].charCodeAt(0)
      );
    }

    let index = 1;
    if (
      EmojiRendererData.isEmojiVariationSelector(
        emojiArray[index].charCodeAt(0)
      )
    )
      index++;

    while (index < emojiArray.length) {
      if (
        !EmojiRendererData.isNonSpacingCombiningMark(
          emojiArray[index].charCodeAt(0)
        )
      )
        return false;
      index++;
    }
    return true;
  }

  return true;
};

const parseEmoji = (text, limit = null) => {
  let result = null;
  const parsedEmojis = [];
  let state = REGIONAL_INDICATOR;
  let position = 0;
  const textLength = text.length;

  while (position < textLength) {
    const codePoint = text.codePointAt(position);
    const utf16Length = getUTF16Length(text, position);
    const substr = text.substr(position, utf16Length);

    switch (state) {
      case END:
        if (EmojiRendererData.isRegionalIndicator(codePoint)) {
          state = EMOJI_MODIFIER;
        } else {
          state = REGIONAL_INDICATOR;
        }
        break;
      case EMOJI_MODIFIER_BASE:
        if (EmojiRendererData.isEmojiModifier(codePoint)) {
          state = EMOJI_MODIFIER;
          break;
        }
      // eslint-disable-next-line no-fallthrough
      case DEFAULT:
        if (EmojiRendererData.isZWJ(codePoint)) {
          state = ZWJ;
        } else if (EmojiRendererData.isEmojiVariationSelector(codePoint)) {
          state = VARIATION_SELECTOR;
        } else if (EmojiRendererData.isTextVariationSelector(codePoint)) {
          state = TEXT_VARIATION_SELECTOR;
        } else if (EmojiRendererData.isNonSpacingCombiningMark(codePoint)) {
          state = NON_SPACING_MARK;
        } else if (EmojiRendererData.isTagSpec(codePoint)) {
          state = TAG_SPEC;
        } else {
          state = REGIONAL_INDICATOR;
        }
        break;
      case NON_SPACING_MARK:
      case VARIATION_SELECTOR:
        if (EmojiRendererData.isNonSpacingCombiningMark(codePoint)) break;
      // eslint-disable-next-line no-fallthrough
      case EMOJI_MODIFIER:
      case TAG_SPEC:
        if (EmojiRendererData.isZWJ(codePoint)) {
          state = ZWJ;
        } else if (EmojiRendererData.isTagSpec(codePoint)) {
          state = TAG_SPEC;
        } else {
          state = REGIONAL_INDICATOR;
        }
        break;
      case ZWJ:
        if (
          !EmojiRendererData.isTagSpec(codePoint) &&
          !EmojiRendererData.isTagTerm(codePoint)
        ) {
          state = REGIONAL_INDICATOR;
        }
        break;
      case REGIONAL_INDICATOR:
        if (EmojiRendererData.isRegionalIndicator(codePoint)) {
          state = END;
        } else if (EmojiRendererData.isEmojiModifierBase(codePoint)) {
          state = EMOJI_MODIFIER_BASE;
        } else if (EmojiRendererData.isEmoji(codePoint)) {
          state = DEFAULT;
        } else {
          state = REGIONAL_INDICATOR;
        }
        break;
      case TEXT_VARIATION_SELECTOR:
        if (EmojiRendererData.isNonSpacingCombiningMark(codePoint)) {
          state = NON_SPACING_MARK;
        } else if (EmojiRendererData.isEmojiVariationSelector(codePoint)) {
          state = VARIATION_SELECTOR;
        } else {
          state = REGIONAL_INDICATOR;
        }
        break;
      default:
        state = REGIONAL_INDICATOR;
        break;
    }

    if (state === REGIONAL_INDICATOR) {
      if (EmojiRendererData.isRegionalIndicator(codePoint)) {
        state = END;
      } else if (EmojiRendererData.isEmojiModifierBase(codePoint)) {
        state = EMOJI_MODIFIER_BASE;
      } else if (EmojiRendererData.isText(codePoint)) {
        state = TEXT;
      } else if (EmojiRendererData.isEmoji(codePoint)) {
        state = DEFAULT;
      }

      if (state !== REGIONAL_INDICATOR) {
        if (result !== null && isEmojiRenderable(result.emoji)) {
          parsedEmojis.push(result);
        }
        if (limit !== null && limit === parsedEmojis.length) {
          result = null;
          break;
        }
        result = { emoji: [substr], length: utf16Length, offset: position };
      }
    } else if (result !== null) {
      result.emoji.push(substr);
      result.length += utf16Length;
    }

    position += utf16Length;
  }

  if (result !== null && isEmojiRenderable(result.emoji)) {
    parsedEmojis.push(result);
  }

  return parsedEmojis;
};

const render = (text, callback) => {
  const parsedEmojis = parseEmoji(text);
  const parts = [];
  let currentIndex = 0;

  parsedEmojis.forEach(({ emoji, offset, length }) => {
    if (offset > currentIndex) {
      parts.push(text.substr(currentIndex, offset - currentIndex));
    }

    const renderedEmoji = callback(emoji);
    if (renderedEmoji !== null) {
      parts.push(renderedEmoji);
    }

    currentIndex = offset + length;
  });

  parts.push(text.substr(currentIndex, text.length - currentIndex));

  return parts;
};

const containsEmoji = (text) => parseEmoji(text, 1).length === 1;

const countEmoji = (text) => parseEmoji(text).length;

export { containsEmoji, countEmoji, parseEmoji as parse, render };
