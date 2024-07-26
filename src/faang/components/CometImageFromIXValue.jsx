/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";
import { stylex } from "@stylexjs/stylex";
import { testID } from "testID";

import coerceImageishSprited from "../../helpers/coerceImageishSprited";
import coerceImageishURL from "../../helpers/coerceImageishURL";
import { CometVisualCompletionAttributes } from "../../helpers/CometVisualCompletionAttributes";
import { xplatToDOMRef } from "../../helpers/xplatToDOMRef";

import BaseImage from "./BaseImage";
import { processSpritedImagesForSSRPreload } from "./CometSSRBackgroundImageUtils";
import RecoverableViolationWithComponentStack from "./RecoverableViolationWithComponentStack";

const CometImageFromIXValue = forwardRef((props, ref) => {
  const { alt = "", isDecorative, objectFit, source, testid, xstyle } = props;

  processSpritedImagesForSSRPreload(source);

  const spritedImage = coerceImageishSprited(source);
  if (spritedImage !== null) {
    const className = stylex(xstyle);
    return (
      <i
        {...CometVisualCompletionAttributes}
        {...testID(testid)}
        aria-hidden={isDecorative}
        aria-label={alt === "" ? null : alt}
        className={
          spritedImage.type === "css"
            ? className !== ""
              ? `${spritedImage.className} ${className}`
              : spritedImage.className
            : className
        }
        ref={ref}
        role={alt === "" ? null : "img"}
        style={spritedImage.type === "cssless" ? spritedImage.style : undefined}
      />
    );
  }

  const imageURL = coerceImageishURL(source);
  if (imageURL !== null) {
    return (
      <BaseImage
        alt={alt}
        draggable={false}
        height={objectFit === "cover" ? "100%" : imageURL.height}
        isDecorative={isDecorative}
        objectFit={objectFit}
        ref={xplatToDOMRef(ref)}
        src={imageURL.uri}
        testid={undefined}
        width={objectFit === "cover" ? "100%" : imageURL.width}
        xstyle={xstyle}
      />
    );
  }

  return (
    <RecoverableViolationWithComponentStack
      errorMessage="asset provided to CometImageFromIXValue cannot be transformed by Haste"
      projectName="comet_ui"
    />
  );
});

CometImageFromIXValue.displayName = `CometImageFromIXValue [from ${module.id}]`;

export default CometImageFromIXValue;
