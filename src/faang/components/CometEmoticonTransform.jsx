/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import baseTextTransformAllStrings from "../../helpers/baseTextTransformAllStrings";

import CometEmojiWithContextualSize from "./CometEmojiWithContextualSize";
import { render } from "./EmoticonRenderer";
import FBEmojiResource from "./FBEmojiResource";
import { codepointsToString } from "./FBEmojiUtils";

export default function CometEmoticonTransform({ size } = {}) {
  return function transformEmoticons(text, keyPrefix) {
    let uniqueKey = 0;

    return baseTextTransformAllStrings(
      text,
      (emoticonText, key) => {
        return render(
          emoticonText,
          (codepoints) => (
            <CometEmojiWithContextualSize
              emoji={[
                codepointsToString(
                  codepoints.split("_").map((hex) => Number(`0x${hex}`))
                ),
              ]}
              resource={new FBEmojiResource(codepoints)}
              size={size}
              key={`${key}-${uniqueKey++}`}
            />
          ),
          (resourceKey, emoji) => (
            <CometEmojiWithContextualSize
              emoji={emoji}
              resource={new FBEmojiResource(resourceKey)}
              size={size}
              key={`${key}-${uniqueKey++}`}
            />
          )
        );
      },
      keyPrefix
    );
  };
}
