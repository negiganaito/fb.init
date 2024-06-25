/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useMemo } from "react";

import mergeRefs from "../business/helpers/mergeRefs";

const useMergeRefs = (...args) => {
  return useMemo(() => {
    return mergeRefs(...args);
  }, [...args]);
};

export default useMergeRefs;
