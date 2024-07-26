/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const WAErr = (message) => {
  const error = new Error(message);
  if (error.stack === undefined) {
    try {
      throw error;
    } catch (e) {}
  }
  return error;
};

export default WAErr;
