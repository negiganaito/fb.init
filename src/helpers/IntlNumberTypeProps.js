/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { NUMBER_ONE, NUMBER_OTHER } from "./IntlVariations";

const IntlCLDRNumberType05 = {
  getVariation: (number) => {
    if (number === 1) {
      return NUMBER_ONE;
    } else {
      return NUMBER_OTHER;
    }
  },
};

export default IntlCLDRNumberType05;
