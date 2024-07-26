/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import baseTextTransformAllStrings from "../../helpers/baseTextTransformAllStrings";

import CometEmojiWithContextualSize from "./CometEmojiWithContextualSize";
import { render } from "./EmojiRenderer";

const CometEmojiTransform = (options = {}) => {
  const { size } = options;
  return (text, context) => {
    let index = 0;
    return baseTextTransformAllStrings(
      text,
      (emojiText, key) => {
        return render(emojiText, (emoji) => (
          <CometEmojiWithContextualSize
            emoji={emoji}
            size={size}
            key={`${key}-${index++}`}
          />
        ));
      },
      context
    );
  };
};

export default CometEmojiTransform;
