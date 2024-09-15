/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import FBLogger from "./FBLogger";

// eslint-disable-next-line max-params
function unrecoverableViolation(message, blameModule, options = {}, context) {
  const { error } = options;
  let logger = FBLogger(blameModule);

  if (error) {
    logger = logger.catching(error);
  } else {
    logger = logger.blameToPreviousFrame();
  }

  const blameFrames = context?.blameToPreviousFrame ?? 0;
  for (let i = 0; i < blameFrames; ++i) {
    logger = logger.blameToPreviousFrame();
  }

  const categoryKey = context?.categoryKey;
  if (categoryKey !== null) {
    logger = logger.addToCategoryKey(categoryKey);
  }

  return logger.mustfixThrow(message);
}

export default unrecoverableViolation;
