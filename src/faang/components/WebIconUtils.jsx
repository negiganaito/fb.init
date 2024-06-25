/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import coerceImageishSprited from "../../business/helpers/coerceImageishSprited";
import coerceImageishURL from "../../business/helpers/coerceImageishURL";
import getImageSourceURLFromImageish from "../../business/helpers/getImageSourceURLFromImageish";
import isFalsey from "../../business/helpers/isFalsey";
import memoizeWithArgsWeak from "../../business/helpers/memoizeWithArgsWeak";

const regex = /(?:\([\'\"]?)(.*?)(?:[\'\"]?\))/;

function getSrcFromIcon(icon) {
  let srcURL = getImageSourceURLFromImageish(icon.src);
  if (srcURL) return srcURL;

  const sprite = getSpriteStyle(icon);
  return sprite?.url ? regex.exec(sprite.url)?.[1] : null;
}

function getSizeFromIcon(icon) {
  if (typeof icon.src === "string" || coerceImageishURL(icon.src)) {
    return { width: icon.size, height: icon.size };
  }

  const sprite = getSpriteStyle(icon);
  if (!sprite) return null;

  const [width, height] = parseSize(sprite.size);
  return width !== null && height !== null ? { width, height } : null;
}

function getPositionFromIcon(icon) {
  if (coerceImageishURL(icon.src)) {
    return { x: 0, y: 0 };
  }

  const sprite = getSpriteStyle(icon);
  if (!sprite) return null;

  const [x, y] = parseSize(sprite.position);
  return x !== null && y !== null ? { x, y } : null;
}

const getSpriteStyle = memoizeWithArgsWeak((iconSrc) => {
  const sprited = coerceImageishSprited(iconSrc);
  if (!sprited) return null;

  if (sprited.type === "cssless") {
    return {
      position: sprited.style.backgroundPosition,
      size: sprited.style.backgroundSize,
      url: sprited.style.backgroundImage,
    };
  }

  const body = document?.body;
  if (!body) return null;

  const div = document.createElement("div");
  div.className = sprited.className;
  div.style.display = "none";
  body.appendChild(div);

  const computedStyle = getComputedStyle(div);
  const spriteStyle = {
    position: computedStyle.backgroundPosition,
    size: computedStyle.backgroundSize,
    url: computedStyle.backgroundImage,
  };

  body.removeChild(div);
  return spriteStyle;
}, "WebIconGetSpriteStyle");

function parseSize(size) {
  if (isFalsey(size) || size.includes("auto")) return [undefined, undefined];

  const [width, height] = size.split(" ");
  return [parseFloat(width), parseFloat(height)];
}

export { getPositionFromIcon, getSizeFromIcon, getSrcFromIcon };
