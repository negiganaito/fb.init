/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import EmoticonsList from "./EmoticonsList";

const customEmoticons = ["LIKE", "PACMAN", "FACE_WITH_COLON_THREE"];

function parseEmoticons(input) {
  const emoticons = [];
  const regex = new RegExp(EmoticonsList.regexp);
  let offset = 0;
  let match = input.match(regex);

  while (match !== null) {
    const [fullMatch, prefix, emoticonChars] = match;
    const charsArray = emoticonChars.split("");
    let emoticonKey = EmoticonsList.emotes[emoticonChars];
    emoticonKey = EmoticonsList.emoji[emoticonKey];

    emoticons.push({
      chars: charsArray,
      isCustom: customEmoticons.includes(emoticonKey),
      key: emoticonKey,
      offset: offset + match.index + prefix.length,
    });

    offset += match.index + fullMatch.length;
    match = input.slice(offset).match(regex);
  }

  return emoticons;
}

function renderEmoticons(input, renderStandard, renderCustom) {
  const parsedEmoticons = parseEmoticons(input);
  const renderedOutput = [];
  let lastIndex = 0;

  parsedEmoticons.forEach(({ offset, chars, isCustom, key }) => {
    if (offset > lastIndex) {
      renderedOutput.push(input.substring(lastIndex, offset));
    }

    renderedOutput.push(
      isCustom ? renderCustom(key, chars) : renderStandard(key)
    );

    lastIndex = offset + chars.length;
  });

  renderedOutput.push(input.substring(lastIndex));
  return renderedOutput;
}

export { parseEmoticons as parse, renderEmoticons as render };
