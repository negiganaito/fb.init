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
import { useEffect, useRef } from "react";

import useShallowArrayEqualMemo from "./useShallowArrayEqualMemo";

function containsNode(containerRef, node) {
  return containerRef?.current?.contains(node) ?? false;
}

function someContainerContainsNode(containerRefs, node) {
  return containerRefs.some((ref) => containsNode(ref, node));
}

// eslint-disable-next-line max-params
function useGeoMouseListeners(
  onMouseOver,
  onMouseOut,
  onMouseMove,
  containerRefs
) {
  const memoizedRefs = useShallowArrayEqualMemo(containerRefs);
  const isMouseInside = useRef(false);

  useEffect(() => {
    if (memoizedRefs === null || (onMouseOver === null && onMouseOut === null))
      return;

    const handleMouseOver = (event) => {
      if (
        !isMouseInside.current &&
        someContainerContainsNode(memoizedRefs, event.target)
      ) {
        isMouseInside.current = true;
        onMouseOver?.(event);
      }
    };

    const handleMouseOut = (event) => {
      if (
        isMouseInside.current &&
        someContainerContainsNode(memoizedRefs, event.target) &&
        !someContainerContainsNode(memoizedRefs, event.relatedTarget)
      ) {
        isMouseInside.current = false;
        onMouseOut?.();
      }
    };

    const handleMouseMove = (event) => {
      if (
        isMouseInside.current &&
        someContainerContainsNode(memoizedRefs, event.target)
      ) {
        onMouseMove?.();
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [memoizedRefs, onMouseOver, onMouseOut, onMouseMove]);
}

export default useGeoMouseListeners;
