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
import EmojiRendererData from "EmojiRendererData";
import UnicodeUtils from "UnicodeUtils";

// eslint-disable-next-line max-params
function findSplitPointForText(
  text,
  maxLength,
  maxLines = 8,
  truncationThreshold = 0
) {
  let splitPoint = null;
  const lines = text.split("\n");
  const textLength = UnicodeUtils.strlen(text);

  if (textLength > maxLength && textLength - maxLength > truncationThreshold) {
    splitPoint = maxLength;
  }

  if (lines.length > maxLines) {
    const lengthUpToMaxLines = lines.slice(0, maxLines).join("\n").length;
    splitPoint =
      splitPoint !== null
        ? Math.min(lengthUpToMaxLines, splitPoint)
        : lengthUpToMaxLines;
  }

  if (splitPoint === null) {
    return null;
  } else {
    const adjustedSplitPoint =
      splitPoint + adjustSplitPointForEmoji(text, splitPoint);
    return adjustedSplitPoint < textLength ? adjustedSplitPoint : null;
  }
}

function adjustSplitPointForEmoji(text, splitPoint) {
  const isZWJ = EmojiRendererData.isZWJ(
    UnicodeUtils.charAt(text, splitPoint - 1).codePointAt(0)
  );
  return calculateAdditionalOffset(text, isZWJ ? splitPoint - 1 : splitPoint);
}

function calculateAdditionalOffset(text, splitPoint) {
  const char = UnicodeUtils.charAt(text, splitPoint);
  if (char !== "") {
    const codePoint = char.codePointAt(0);
    if (
      EmojiRendererData.isEmojiModifier(codePoint) ||
      EmojiRendererData.isEmojiVariationSelector(codePoint) ||
      EmojiRendererData.isTextVariationSelector(codePoint)
    ) {
      return 1 + calculateAdditionalOffset(text, splitPoint + 1);
    } else if (EmojiRendererData.isZWJ(codePoint)) {
      const nextChar = UnicodeUtils.charAt(text, splitPoint + 1);
      if (EmojiRendererData.isEmojiModifierBase(nextChar.codePointAt(0))) {
        return 2 + calculateAdditionalOffset(text, splitPoint + 2);
      }
    }
  }
  return 0;
}

export { findSplitPointForText };
