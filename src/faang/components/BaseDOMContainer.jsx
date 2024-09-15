/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, memo, useLayoutEffect, useRef } from "react";

import useMergeRefs from "../../hooks/useMergeRefs";

const BaseDOMContainer = forwardRef(({ node }, ref) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (node !== null && container !== null) {
      container.appendChild(node);
      return () => {
        container.removeChild(node);
      };
    }
  }, [node]);

  const mergedRef = useMergeRefs(ref, containerRef);

  return <div ref={mergedRef} />;
});

BaseDOMContainer.displayName = `BaseDOMContainer [from ${__filename}]`;

export default memo(BaseDOMContainer);
