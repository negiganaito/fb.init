/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import FbtPureStringResult from "./FbtPureStringResult";

const getFbsResult = (result) => {
  return new FbtPureStringResult(result.contents, result.errorListener);
};

export default getFbsResult;
