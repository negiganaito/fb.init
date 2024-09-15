/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { ofNumber } from "../faang/components/LSIntEnum";

import { equal } from "./I64";

const isUnjoinedCMThread = (a) => {
  return (
    equal(a, ofNumber(19)) || equal(a, ofNumber(24)) || equal(a, ofNumber(22))
  );
};

export { isUnjoinedCMThread };
