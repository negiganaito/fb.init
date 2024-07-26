/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useMemo } from "react";

import Bootloader from "../helpers/Bootloader";

import useCometPreloaderBase from "./useCometPreloaderBase";

function isMouseEvent(event) {
  return event.pointerType === "mouse";
}

// eslint-disable-next-line max-params
function useCometPreloader(
  preloaderType,
  onLoad,
  onHoverIn,
  onHoverOut,
  preloaderCallbacks
) {
  const preloaderFunctions = useMemo(() => {
    const lowSignalPreloaderCallback = (resource) => {
      Bootloader.forceFlush();
      preloaderCallbacks?.lowSignalPreloaderCallback?.(resource);
    };

    const highSignalPreloaderCallback = (resource) => {
      Bootloader.forceFlush();
      preloaderCallbacks?.highSignalPreloaderCallback?.(resource);
    };

    return { highSignalPreloaderCallback, lowSignalPreloaderCallback };
  }, [preloaderCallbacks]);

  const preloader = useCometPreloaderBase(
    preloaderType,
    onLoad,
    onHoverIn,
    onHoverOut,
    preloaderFunctions
  );
  const {
    onHighIntentPreloader,
    onHoverInPreloader,
    onHoverMovePreloader,
    onHoverOutPreloader,
    onPressInPreloader,
  } = preloader;

  const handlePressIn = useCallback(
    (event) => {
      if (!isMouseEvent(event)) return;
      onPressInPreloader(event);
    },
    [onPressInPreloader]
  );

  return {
    onHighIntentPreloader,
    onHoverInPreloader,
    onHoverMovePreloader,
    onHoverOutPreloader,
    onPressInPreloader: handlePressIn,
  };
}

export default useCometPreloader;
