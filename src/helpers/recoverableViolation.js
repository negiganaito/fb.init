/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import FBLogger from "./FBLogger";

// eslint-disable-next-line max-params
const recoverableViolation = (message, context, options = {}, extra) => {
  let logger = FBLogger.FBLogger(context);

  if (options.error) {
    logger = logger.catching(options.error);
  } else {
    logger = logger.blameToPreviousFrame();
  }

  const categoryKey = extra?.categoryKey;
  if (categoryKey !== null) {
    logger = logger.addToCategoryKey(categoryKey);
  }

  const trackOnly = extra?.trackOnly ?? false;
  if (trackOnly) {
    logger.debug(message);
  } else {
    logger.mustfix(message);
  }

  return null;
};

export default recoverableViolation;
