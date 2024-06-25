/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

function mergeRefs(...refs) {
  return function (ref) {
    refs.forEach((r) => {
      if (r === null) return;
      if (typeof r === "function") {
        r(ref);
        return;
      }
      if (typeof r === "object") {
        r.current = ref;
        return;
      }
      console.log(
        `mergeRefs cannot handle Refs of type boolean, number or string, received ref ${String(
          r
        )}`,
        "comet_ui"
      );
    });
  };
}

export default mergeRefs;
