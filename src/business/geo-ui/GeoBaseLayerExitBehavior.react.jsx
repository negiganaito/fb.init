/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useCallback, useRef } from "react";

import useGeoPrivateLayerBehavior from "../hooks/useGeoPrivateLayerBehavior";

const GeoBaseLayerExitBehavior = ({ children, delay = 0, onExit }) => {
  const timeoutRef = useRef(null);
  const cleanupRef = useRef(null);

  const clearTimeoutCallback = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
  }, []);

  const setTimeoutCallback = useCallback(() => {
    timeoutRef.current = window.setTimeout(onExit, delay);
  }, [delay, onExit]);

  const handleRef = useCallback(
    (node) => {
      cleanupRef.current?.();
      cleanupRef.current = null;

      if (node !== null) {
        node.addEventListener("mouseenter", clearTimeoutCallback);
        node.addEventListener("mouseleave", setTimeoutCallback);

        cleanupRef.current = () => {
          node.removeEventListener("mouseenter", clearTimeoutCallback);
          node.removeEventListener("mouseleave", setTimeoutCallback);
        };
      }
    },
    [clearTimeoutCallback, setTimeoutCallback]
  );

  const LayerBehavior = useGeoPrivateLayerBehavior({ ref: handleRef });

  return LayerBehavior(children);
};

GeoBaseLayerExitBehavior.displayName = `${GeoBaseLayerExitBehavior.name}`;

export default GeoBaseLayerExitBehavior;
