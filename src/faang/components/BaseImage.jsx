/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import { stylex } from "@stylexjs/stylex";
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";
import testID from "testID";

import mergeRefs from "../../helpers/mergeRefs";

import { addImage } from "./CometSSRPreloadImageCollection";

const objectFitStyles = {
  contain: { objectFit: "x19kjcj4", $$css: true },
  cover: { objectFit: "xl1xv1r", $$css: true },
  fill: { objectFit: "xz74otr", $$css: true },
};

const BaseImage = forwardRef((props, ref) => {
  const {
    alt = "",
    "aria-labelledby": ariaLabelledby,
    elementtiming,
    isDecorative,
    objectFit = "fill",
    onLoad,
    referrerPolicy = "origin-when-cross-origin",
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

  if (!ExecutionEnvironment.canUseDOM && src) {
    addImage(src);
  }

  useEffect(() => {
    const imgElement = internalRef.current;
    if (onLoad && imgElement && imgElement.complete) {
      onLoad();
    }
  }, [onLoad]);

  // if (src === "") {
  //   return (
  //     <RecoverableViolationWithComponentStack
  //       errorMessage="Invalid src provided to image"
  //       projectName="comet_ui"
  //     />
  //   );
  // }

  return (
    <img
      {...restProps}
      {...testID(testid)}
      alt={alt}
      aria-hidden={isDecorative}
      aria-labelledby={ariaLabelledby}
      className={stylex(objectFitStyles[objectFit], xstyle)}
      elementtiming={elementtiming}
      onLoad={onLoad}
      ref={mergedRef}
      referrerPolicy={referrerPolicy}
      sizes={sizes}
      src={src}
      srcSet={srcSet}
    />
  );
});

BaseImage.displayName = `${BaseImage.name} [from ${__filename}]`;

export default BaseImage;
