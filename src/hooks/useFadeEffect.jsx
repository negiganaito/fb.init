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
import { useCallback, useLayoutEffect, useReducer, useRef } from "react";

import useDoubleEffectHack_DO_NOT_USE_THIS_IS_TRACKED from "./useDoubleEffectHack_DO_NOT_USE_THIS_IS_TRACKED";

const TIMEOUT_MS = 1000;

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        isTransitioning: true,
        shouldBeVisible: action.shouldBeVisible,
      };
    case "finish":
      return {
        ...state,
        isTransitioning: false,
      };
    default:
      return state;
  }
}

export default function useFadeEffect(visible) {
  const nodeRef = useRef(null);
  const timeoutIdRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  const [state, dispatch] = useReducer(reducer, {
    isTransitioning: false,
    shouldBeVisible: false,
  });

  const { isTransitioning, shouldBeVisible } = state;

  useDoubleEffectHack_DO_NOT_USE_THIS_IS_TRACKED(() => {
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
      if (animationFrameIdRef.current !== null) {
        window.cancelAnimationFrame(animationFrameIdRef.current);
      }
    }
  }, []);

  const finishTransition = useCallback(() => {
    dispatch({ type: "finish" });
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  }, []);

  const startTransition = useCallback(
    (shouldBeVisible) => {
      if (animationFrameIdRef.current !== null) {
        window.cancelAnimationFrame(animationFrameIdRef.current);
      }
      animationFrameIdRef.current = window.requestAnimationFrame(() => {
        dispatch({ type: "start", shouldBeVisible });
        animationFrameIdRef.current = null;
        if (timeoutIdRef.current !== null) {
          clearTimeout(timeoutIdRef.current);
        }
        timeoutIdRef.current = setTimeout(finishTransition, TIMEOUT_MS);
      });
    },
    [finishTransition]
  );

  const visibleRef = useRef(false);

  useLayoutEffect(() => {
    if (
      visibleRef.current !== visible &&
      (!visible || nodeRef.current !== null)
    ) {
      startTransition(visible);
    }
    visibleRef.current = visible;
  }, [visible, startTransition]);

  const setNodeRef = useCallback(
    (node) => {
      const prevNode = nodeRef.current;
      nodeRef.current = node;
      if (node !== null) {
        if (node.addEventListener !== null) {
          node.addEventListener("transitionend", finishTransition);
          node.addEventListener("webkitTransitionEnd", finishTransition);
        }
        if (visibleRef.current === true) {
          startTransition(true);
        }
      } else if (prevNode !== null && prevNode.removeEventListener !== null) {
        prevNode.removeEventListener("transitionend", finishTransition);
        prevNode.removeEventListener("webkitTransitionEnd", finishTransition);
      }
    },
    [finishTransition, startTransition]
  );

  const show = isTransitioning || shouldBeVisible || visible;

  return [show, shouldBeVisible, setNodeRef];
}
