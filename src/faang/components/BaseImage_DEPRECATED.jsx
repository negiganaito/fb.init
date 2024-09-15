/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, {
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import joinClasses from "fbjs/lib/joinClasses";

import BaseIsDecorativeContext from "../../context/BaseIsDecorativeContext";
import coerceImageishSprited from "../../helpers/coerceImageishSprited";
import coerceImageishURL from "../../helpers/coerceImageishURL";
import { CometVisualCompletionAttributes } from "../../helpers/CometVisualCompletionAttributes";
import gkx from "../../helpers/gkx";
import mergeRefs from "../../helpers/mergeRefs";

import { processSpritedImagesForSSRPreload } from "./CometSSRBackgroundImageUtils";
import RecoverableViolationWithComponentStack from "./RecoverableViolationWithComponentStack";

const ELEMENT_TIMING_ID = "2";

function isValidSrc(src) {
  return (
    src !== null &&
    typeof src === "string" &&
    src !== "" &&
    src !== "[object Object]"
  );
}

const BaseImage = forwardRef((props, ref) => {
  const { alt, testid, src, onLoad, ...rest } = props;
  const internalRef = useRef(null);
  const mergedRef = useMemo(
    () => mergeRefs(internalRef, ref),
    [internalRef, ref]
  );
  const isDecorative = useContext(BaseIsDecorativeContext);

  const computedAlt = alt === "" && isDecorative === true ? true : undefined;

  useEffect(() => {
    if (
      onLoad !== null &&
      internalRef.current instanceof HTMLImageElement &&
      internalRef.current.complete
    ) {
      onLoad();
    }
  }, [onLoad, src]);

  processSpritedImagesForSSRPreload(src);
  const sprited = coerceImageishSprited(src);
  const imageURL = coerceImageishURL(src);

  if (imageURL !== null && imageURL.uri !== null) {
    if (!isValidSrc(imageURL.uri)) {
      return (
        <RecoverableViolationWithComponentStack
          errorMessage="Invalid src provided as imageish uri"
          projectName="comet_ui"
        />
      );
    }
    return (
      <img
        {...rest}
        alt={alt ?? ""}
        aria-hidden={computedAlt}
        height={rest.height ?? imageURL.height}
        ref={mergedRef}
        src={imageURL.uri}
        width={rest.width ?? imageURL.width}
      />
    );
  } else if (sprited !== null) {
    const { className, style, ...spriteRest } = rest;
    const computedClassName = joinClasses(
      className,
      sprited.type === "css" ? sprited.className : undefined
    );
    const computedStyle =
      sprited.type === "cssless" ? { ...style, ...sprited.style } : style;

    return (
      <i
        {...CometVisualCompletionAttributes.CSS_IMG}
        {...spriteRest}
        aria-hidden={computedAlt}
        aria-label={alt === "" ? null : alt}
        className={computedClassName}
        ref={mergedRef}
        role={alt === "" ? null : "img"}
        style={computedStyle}
      />
    );
  }

  if (!isValidSrc(rest.src)) {
    return (
      <RecoverableViolationWithComponentStack
        errorMessage="Invalid src provided to image"
        projectName="comet_ui"
      />
    );
  }

  const elementTiming = gkx("22879") ? ELEMENT_TIMING_ID : undefined;

  // eslint-disable-next-line max-params
  function handleProfilerRender(
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) {
    if (gkx("2010754") && phase === "mount" && internalRef.current !== null) {
      gkx("2010754").trackImagePerf(
        internalRef.current,
        commitTime,
        typeof rest.src === "string" ? rest.src : "",
        { mutationType: "reactCommit" }
      );
    }
  }

  const imgElement = (
    <img
      {...rest}
      alt={alt ?? ""}
      aria-hidden={computedAlt}
      elementtiming={elementTiming}
      ref={mergedRef}
    />
  );

  return gkx("22879") ? (
    <React.Profiler id={ELEMENT_TIMING_ID} onRender={handleProfilerRender}>
      {imgElement}
    </React.Profiler>
  ) : (
    imgElement
  );
});

BaseImage.displayName = "BaseImage";

export default BaseImage;
