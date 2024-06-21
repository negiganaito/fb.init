/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext, useMemo } from "react";
import { GeoSSRSafeIdsContext } from "GeoSSRSafeIdsContext";
import { useShallowEqualMemo } from "useShallowEqualMemo";

const attributeMap = new Map([["htmlFor", "for"]]);

function setAttributes(attributes, useRefs) {
  const result = {
    ref: null,
  };

  if (useRefs) {
    result.ref = (element) => {
      if (element === null) return;

      for (const [key, valueSet] of attributes) {
        const value = Array.from(valueSet).join(" ");
        if (value === null) continue;

        const attributeName = attributeMap.get(key) ?? key;
        element.setAttribute(attributeName, value);
      }
    };
  } else {
    for (const [key, valueSet] of attributes) {
      const value = Array.from(valueSet).join(" ");
      if (value === null) continue;

      const attributeName = attributeMap.get(key) ?? key;
      result[attributeName] = value;
    }
  }

  return result;
}

function useApplyGeoDomIDsDirectly(attributes) {
  const useRefs = useContext(GeoSSRSafeIdsContext);
  const memoizedAttributes = useShallowEqualMemo(attributes);

  return useMemo(() => {
    const attributeMap = new Map();

    Object.keys(memoizedAttributes).forEach((key) => {
      const value = memoizedAttributes[key];
      if (value === null) return;

      attributeMap.set(key, new Set([value]));
    });

    return setAttributes(attributeMap, useRefs);
  }, [useRefs, memoizedAttributes]);
}

export { useApplyGeoDomIDsDirectly };
