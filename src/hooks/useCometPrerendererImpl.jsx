/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useMemo, useState } from "react";
import emptyFunction from "fbjs/lib/emptyFunction";

import useCometPreloader from "./useCometPreloader";

const preload = (resource) => {
  if (resource) {
    typeof resource === "function" ? resource() : resource.preload();
  }
};

const useCometPrerendererImpl = (
  preloadTrigger,
  isVisible,
  preloadResource,
  onHighIntentPreload,
  onError
  // eslint-disable-next-line max-params
) => {
  const [shouldPrerender, setShouldPrerender] = useState(false);
  const [isHighIntentPreloading, setIsHighIntentPreloading] = useState(false);

  const handlePreload = useCallback(
    () => preload(preloadResource),
    [preloadResource]
  );
  const handleHighIntentPreload = useCallback(
    () => preload(onHighIntentPreload),
    [onHighIntentPreload]
  );

  const handleLowSignalPreload = useCallback(
    (event) => {
      if (event === "onhoverin" && preloadTrigger === "tooltip") {
        setShouldPrerender(true);
      }
    },
    [preloadTrigger]
  );

  const handleHighSignalPreload = useCallback(
    (event) => {
      if (event === "onhoverin" && preloadTrigger === "button_aggressive") {
        setShouldPrerender(true);
      } else if (
        event === "onpressin" &&
        (preloadTrigger === "button" || preloadTrigger === "button_aggressive")
      ) {
        setShouldPrerender(true);
      }
    },
    [preloadTrigger]
  );

  const preloaderCallbacks = useMemo(
    () => ({
      highSignalPreloaderCallback: handleHighSignalPreload,
      lowSignalPreloaderCallback: handleLowSignalPreload,
    }),
    [handleHighSignalPreload, handleLowSignalPreload]
  );

  const {
    onHighIntentPreloader,
    onHoverInPreloader,
    onHoverOutPreloader,
    onPressInPreloader,
  } = useCometPreloader(
    preloadTrigger,
    handlePreload,
    handleHighIntentPreload,
    onError,
    preloaderCallbacks
  );

  const handleHoverIn = useCallback(
    (event) => {
      onHoverInPreloader(event);
    },
    [onHoverInPreloader]
  );

  const handleHoverOut = useCallback(() => {
    onHoverOutPreloader();
    setShouldPrerender(false);
  }, [onHoverOutPreloader]);

  const handlePressIn = useCallback(
    (event) => {
      onPressInPreloader(event);
    },
    [onPressInPreloader]
  );

  const handleHighIntent = useCallback(
    (event) => {
      onHighIntentPreloader(event);
      setIsHighIntentPreloading(event);
    },
    [onHighIntentPreloader]
  );

  if (preloadTrigger === null) {
    return [
      { isVisible, shouldPrerender: false },
      emptyFunction,
      emptyFunction,
      emptyFunction,
      emptyFunction,
    ];
  }

  const prerenderingProps = {
    isVisible,
    shouldPrerender: shouldPrerender || isHighIntentPreloading,
  };

  return [
    prerenderingProps,
    handleHoverIn,
    handleHoverOut,
    handlePressIn,
    handleHighIntent,
  ];
};

export default useCometPrerendererImpl;
