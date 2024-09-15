/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
class ImageIconSource {
  // eslint-disable-next-line max-params
  constructor(src, width, height, resizeStrategy = "cover") {
    this.$$typeof = "fb.imageiconsource";
    this.src = src;
    this.width = width;
    this.height = height;
    this.resizeStrategy = resizeStrategy;
  }
}

export default ImageIconSource;
