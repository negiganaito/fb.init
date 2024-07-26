/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useMemo, useRef } from "react";

import mergeRefs from "../../helpers/mergeRefs";
import { xplatToDOMRef } from "../../helpers/xplatToDOMRef";
import useFeedImageErrorEventLoggerCbs from "../../hooks/useFeedImageErrorEventLoggerCbs";

import BaseImage from "./BaseImage";
import CometImageFromIXValue from "./CometImageFromIXValue";

const CometImage = forwardRef((props, ref) => {
  const {
    alt,
    objectFit,
    onError,
    onLoad,
    sizes,
    src,
    srcSet,
    testid,
    xstyle,
    ...restProps
  } = props;

  const internalRef = useRef(null);
  const mergedRef = useMemo(
    () => mergeRefs(internalRef, ref),
    [internalRef, ref]
  );

  const errorLoggerCallbacks = useFeedImageErrorEventLoggerCbs({
    onError,
    onLoad,
    src,
  });
  const handleError = errorLoggerCallbacks._onError;
  const handleLoad = errorLoggerCallbacks._onLoad;

  if (typeof src === "string") {
    const baseImage = (
      <BaseImage
        {...restProps}
        alt={alt}
        objectFit={objectFit}
        onError={handleError}
        onLoad={handleLoad}
        ref={xplatToDOMRef(mergedRef)}
        sizes={sizes}
        src={src}
        srcSet={srcSet}
        testid={undefined}
        xstyle={xstyle}
      />
    );

    return baseImage;
  }

  return (
    <CometImageFromIXValue
      alt={alt}
      objectFit={objectFit}
      ref={mergedRef}
      source={src}
      testid={undefined}
      xstyle={xstyle}
    />
  );
});

CometImage.displayName = `${CometImage.name} [from ${__filename}]`;

export default CometImage;
