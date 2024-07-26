/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const imageSet = new Set();
const preloadedImages = new Set();

function addImage(url) {
  imageSet.add(url);
}

function clearImageCollection() {
  imageSet.clear();
}

function imagesToHTMLLinkString() {
  if (!imageSet || imageSet.size === 0) return "";

  const linkTags = [];
  imageSet.forEach((url) => {
    if (!preloadedImages.has(url)) {
      linkTags.push(`<link rel="preload" as="image" href="${url}" />`);
      preloadedImages.add(url);
    }
  });

  return linkTags.join("\n");
}

export { addImage, clearImageCollection, imagesToHTMLLinkString };
