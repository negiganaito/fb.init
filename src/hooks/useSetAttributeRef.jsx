/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback } from "react";

const useSetAttributeRef = (attribute, value) => {
  return useCallback(
    (element) => {
      if (element !== null) {
        element.setAttribute(attribute, value);
      }
    },
    [attribute, value]
  );
};

export default useSetAttributeRef;
