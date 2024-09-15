/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const check = {
  max: (a, b) => a <= b,
  min: (a, b) => a >= b,
};

let dimensions = null;
const useMatchViewportResults = [];

function getDimension(dimension) {
  if (dimension === "width") {
    return dimensions?.width_px;
  } else if (dimension === "height") {
    return dimensions?.height_px;
  }
}

function getDimensionsGuess() {
  return dimensions;
}

function setDimensions(dim) {
  dimensions = dim;
}

// eslint-disable-next-line max-params
function addUseMatchViewportResult(dimension, numPixels, operation, result) {
  const index = useMatchViewportResults.findIndex(
    (item) =>
      item.dimension === dimension &&
      item.operation === operation &&
      item.result === result
  );

  if (index === -1) {
    useMatchViewportResults.push({ dimension, numPixels, operation, result });
  } else {
    const isMinMaxTrue =
      (operation === "min" && result === true) ||
      (operation === "max" && result === false);
    const currentPixels = useMatchViewportResults[index].numPixels;
    useMatchViewportResults[index].numPixels = isMinMaxTrue
      ? Math.max(currentPixels, numPixels)
      : Math.min(currentPixels, numPixels);
  }
}

export {
  addUseMatchViewportResult,
  check,
  getDimension,
  getDimensionsGuess,
  setDimensions,
  useMatchViewportResults,
};
