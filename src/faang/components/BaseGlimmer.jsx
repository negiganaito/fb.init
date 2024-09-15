/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback, useState } from "react";

import useVisibilityObserver from "../../hooks/useVisibilityObserver";

import BaseLoadingStateElement from "./BaseLoadingStateElement";

const styles = {
  paused: { animationPlayState: "xorstpt",  },
  root: {
    animationDirection: "x1iq0kzc",
    animationDuration: "x1i9sevy",
    animationIterationCount: "xa4qsjk",
    animationName: "x43zylw",
    animationTimingFunction: "x1ag7td9",
    opacity: "x11fwcs0",
    ,
  },
};

const BaseGlimmer = ({ children, index, xstyle }) => {
  const [isPaused, setIsPaused] = useState(true);

  const handleHidden = useCallback((event) => {
    if (event.hiddenReason !== "COMPONENT_UNMOUNTED") {
      setIsPaused(true);
    }
  }, []);

  const handleVisible = useCallback(() => {
    setIsPaused(false);
  }, []);

  const observerRef = useVisibilityObserver({
    onHidden: handleHidden,
    onVisible: handleVisible,
  });

  const animationDelay = `calc(${
    index % 10
  } * var(--glimmer-stagger-time, 200ms))`;

  return (
    <BaseLoadingStateElement
      ref={observerRef}
      style={{ animationDelay }}
      xstyle={[styles.root, isPaused && styles.paused, xstyle]}
    >
      {children}
    </BaseLoadingStateElement>
  );
};

BaseGlimmer.displayName = `${BaseGlimmer.name} [from ${module.id}]`;
export default BaseGlimmer;
