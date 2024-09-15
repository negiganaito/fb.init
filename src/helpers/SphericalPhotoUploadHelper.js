/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const shouldResize360 = (type, dimensions, maxSize) => {
  return (
    dimensions &&
    Math.max(dimensions.x, dimensions.y) > maxSize &&
    type !== "cubestrip"
  );
};

const shouldRecompress360 = (type, size, maxSize) => {
  return size !== null && size > maxSize && type !== "cubestrip";
};

export { shouldRecompress360, shouldResize360 };
