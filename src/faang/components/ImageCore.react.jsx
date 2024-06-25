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
import React, { forwardRef } from "react";
import joinClasses from "fbjs/lib/joinClasses";
import URI from "fbjs/lib/URI";

import coerceImageishSprited from "../../business/helpers/coerceImageishSprited";
import coerceImageishURL from "../../business/helpers/coerceImageishURL";
import { CometVisualCompletionAttributes } from "../../business/helpers/CometVisualCompletionAttributes";
import getImageSourceURLFromImageish from "../../business/helpers/getImageSourceURLFromImageish";
import warnUnsupportedProp from "../../business/helpers/warnUnsupportedProp";

const defaultProps = {
  alt: "",
};

function resolveSrc(src) {
  return src instanceof URI ? src.toString() : src;
}

function ImageComponent(props) {
  const { forwardedRef, ...restProps } = props;
  const className = joinClasses(restProps.className, "img");
  const src = resolveSrc(restProps.src);

  if (src === null) {
    return <img {...restProps} className={className} ref={forwardedRef} />;
  }

  const spritedImage = coerceImageishSprited(src);
  const altText =
    !!spritedImage && restProps.alt !== null && String(restProps.alt) !== "" ? (
      <u>{restProps.alt}</u>
    ) : null;

  if (typeof src === "string") {
    return (
      // eslint-disable-next-line react/void-dom-elements-no-children
      <img
        {...restProps}
        className={className}
        ref={forwardedRef}
        src={src}
        children={altText}
      />
    );
  }

  if (spritedImage) {
    const { style, ...otherProps } = restProps;
    return (
      <i
        {...otherProps}
        {...CometVisualCompletionAttributes.CSS_IMG}
        className={joinClasses(
          className,
          spritedImage.type === "css" ? spritedImage.className : undefined
        )}
        ref={forwardedRef}
        style={
          spritedImage.type === "cssless"
            ? { ...style, ...spritedImage.style }
            : style
        }
        children={altText}
      />
    );
  }

  const imageSourceURL = getImageSourceURLFromImageish(src);
  const imageURL = coerceImageishURL(src);

  return restProps.width === undefined &&
    restProps.height === undefined &&
    imageURL ? (
    // eslint-disable-next-line react/void-dom-elements-no-children
    <img
      {...restProps}
      className={className}
      height={imageURL.height}
      src={imageSourceURL}
      ref={forwardedRef}
      width={imageURL.width}
      children={altText}
    />
  ) : (
    // eslint-disable-next-line react/void-dom-elements-no-children
    <img
      {...restProps}
      className={className}
      ref={forwardedRef}
      src={imageSourceURL}
      children={altText}
    />
  );
}

ImageComponent.displayName = "ImageCore";
ImageComponent.defaultProps = defaultProps;

const ImageCore = forwardRef((props, ref) => {
  if (Object.prototype.hasOwnProperty.call(props, "source")) {
    warnUnsupportedProp("ImageCore", "source", "Did you mean `src`?");
  }
  return <ImageComponent {...props} forwardedRef={ref} />;
});

export default ImageCore;
