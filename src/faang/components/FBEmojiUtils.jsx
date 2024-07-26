/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import EmojiRendererData from "./EmojiRendererData";
import { SupportedEmoji3 } from "./SupportedEmoji3";

const emojiVariationSelectorRegex = /_fe0f/g;
const emojiModifiers = [127995, 127996, 127997, 127998, 127999];

export function codepointsToString(codepoints) {
  return codepoints
    .map((codepoint) => String.fromCodePoint(codepoint))
    .join("");
}

export function getKeyFromCodepoints(codepoints) {
  return codepoints
    .filter((codepoint) => codepoint.length > 0)
    .map((codepoint) => codepoint.codePointAt(0).toString(16))
    .join("_")
    .replace(emojiVariationSelectorRegex, "");
}

export function getSupportedKey(codepoints) {
  const key = getKeyFromCodepoints(codepoints);
  if (key === null) return null;
  return SupportedEmoji3[key] ? key : null;
}

export function normalizeKey(key) {
  return key.replace(emojiVariationSelectorRegex, "");
}

export function getSupportedModifierSequences(codepoints) {
  const sequences = [];
  if (!EmojiRendererData.isEmojiModifierBase(codepoints[0])) return sequences;

  emojiModifiers.forEach((modifier) => {
    const sequence = codepoints.reduce((acc, codepoint) => {
      if (
        acc.length &&
        EmojiRendererData.isEmojiVariationSelector(codepoint) &&
        EmojiRendererData.isEmojiModifier(acc[acc.length - 1])
      ) {
        return acc;
      }
      acc.push(codepoint);
      if (EmojiRendererData.isEmojiModifierBase(codepoint)) {
        acc.push(modifier);
      }
      return acc;
    }, []);

    if (getSupportedKey(sequence.map((cp) => String.fromCodePoint(cp)))) {
      sequences.push(sequence);
    }
  });

  return sequences;
}
