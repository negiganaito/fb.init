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
import React, { forwardRef, useContext } from "react";
import {
  DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE,
  fbicon,
  GeoBaseText,
  GeoGlimmer,
  GeoPlatformIcon,
  GeoPrivateIcon,
  GeoPrivateMakeComponent,
  GeoPrivateMediaItemAddOn,
  GeoPrivateMediaItemContext,
  GeoPrivateMediaItemGroupContext,
  GeoPrivateMediaItemStatusAddOn,
  GeoPrivateMediaItemSurfaceContext,
  GeoPrivatePlatformIconUtils,
  isFalsey,
  stylex,
  useGeoPrivateMediaLoadingStatus,
  useGeoTheme,
} from "path/to/your/modules";

const styles = {
  root: {
    display: "x1lliihq",
    position: "x1n2onr6",
    flexShrink: "x2lah0s",
    $$css: true,
  },
  glimmer: {
    start: "x17qophe",
    left: null,
    right: null,
    position: "x10l6tqk",
    top: "x13vifvy",
    zIndex: "x1vjfegm",
    $$css: true,
  },
};

function getClassNames({ ratio, size }) {
  const theme = useGeoTheme();
  const selectBorderRadius = theme.selectBorderRadius;
  const selectSize = theme.selectSize;
  return [
    styles.root,
    selectSize({ size, ratio }),
    selectBorderRadius({ context: ratio === "circle" ? "rounded" : "content" }),
  ];
}

const GeoMediaItem = (props) => {
  const {
    containerRef,
    "data-testid": dataTestId,
    description,
    fit = "none",
    hasMediaBackground = true,
    isDisabled = false,
    isLoading = false,
    media,
    platform,
    ratio = "square",
    size = 32,
    status,
    xstyle,
  } = props;

  const isImage = isElementImage(media);
  const groupContext = useContext(GeoPrivateMediaItemGroupContext);
  const mediaItemContext = useContext(GeoPrivateMediaItemContext);
  const {
    isLoading: mediaIsLoading,
    onLoad,
    ref: mediaRef,
  } = useGeoPrivateMediaLoadingStatus(media);

  const effectiveIsLoading = isLoading || (media && mediaIsLoading);
  const classNames = getClassNames({
    size: groupContext.size ?? size,
    ratio: groupContext.ratio ?? ratio,
  });

  if (!effectiveIsLoading && !media) return null;

  return (
    <div
      className={stylex(classNames, xstyle)}
      data-testid={dataTestId}
      ref={containerRef}
    >
      <Wrapper size={groupContext.size ?? size}>
        {effectiveIsLoading ? (
          <GeoGlimmer
            shape={groupContext.ratio === "circle" ? "rounded" : "rectangle"}
            xstyle={styles.glimmer}
          />
        ) : null}
        {media ? (
          <MediaContent
            description={description}
            fit={fit}
            hasMediaBackground={hasMediaBackground}
            isDisabled={isDisabled}
            isImage={isImage}
            isLoading={effectiveIsLoading}
            media={media}
            onLoad={onLoad}
            ref={mediaRef}
            size={groupContext.size ?? size}
          />
        ) : null}
      </Wrapper>
      {!mediaItemContext.isOverflowItem && status ? (
        <GeoPrivateMediaItemStatusAddOn
          ratio={groupContext.ratio ?? ratio}
          size={groupContext.size ?? size}
          status={status}
        />
      ) : null}
      {!mediaItemContext.isOverflowItem && platform ? (
        <PlatformIcon
          platform={platform}
          ratio={groupContext.ratio ?? ratio}
          size={groupContext.size ?? size}
        />
      ) : null}
    </div>
  );
};

GeoMediaItem.displayName = `${GeoMediaItem.name}`;

const wrapperStyles = {
  wrapper: {
    borderTopStartRadius: "x1o1ewxj",
    borderTopEndRadius: "x3x9cwd",
    borderBottomEndRadius: "x1e5q0jg",
    borderBottomStartRadius: "x13rtm0m",
    height: "x5yr21d",
    position: "x1n2onr6",
    width: "xh8yej3",
    $$css: true,
  },
  denseStroke: {
    paddingTop: "x4p5aij",
    paddingEnd: "x19um543",
    paddingBottom: "x1j85h84",
    paddingStart: "x1m6msm",
    $$css: true,
  },
  sparseStroke: {
    paddingTop: "x1nn3v0j",
    paddingEnd: "xg83lxy",
    paddingBottom: "x1120s5i",
    paddingStart: "x1h0ha7o",
    $$css: true,
  },
};

function getWrapperStyle(size) {
  return size < 48 ? "dense" : "sparse";
}

const Wrapper = ({ size, children }) => {
  const groupContext = useContext(GeoPrivateMediaItemGroupContext);
  const theme = useGeoTheme();
  const selectStaticBackgroundColor = theme.selectStaticBackgroundColor;
  const isDense = getWrapperStyle(size) === "dense";
  const styles = [
    wrapperStyles.wrapper,
    selectStaticBackgroundColor({ surface: "content" }),
    isDense ? wrapperStyles.denseStroke : wrapperStyles.sparseStroke,
  ];

  return groupContext.hasStroke ? (
    <div className={stylex(styles)}>
      <div className="x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x5yr21d x1n2onr6 xh8yej3">
        {children}
      </div>
    </div>
  ) : (
    { children }
  );
};

Wrapper.displayName = `${Wrapper.name}`;

const mediaContentStyles = {
  root: {
    position: "x10l6tqk",
    overflowX: "x6ikm8r",
    overflowY: "x10wlt62",
    top: "x13vifvy",
    start: "x17qophe",
    left: null,
    right: null,
    width: "xh8yej3",
    height: "x5yr21d",
    borderTopStartRadius: "x1o1ewxj",
    borderTopEndRadius: "x3x9cwd",
    borderBottomEndRadius: "x1e5q0jg",
    borderBottomStartRadius: "x13rtm0m",
    $$css: true,
  },
  loading: { opacity: "xg01cxk", $$css: true },
  backgroundTransparent: { backgroundColor: "xjbqb8w", $$css: true },
  fitNone: {
    ":not([stylex-hack]) > *_left": "xosibs0",
    ":not([stylex-hack]) > *_start": null,
    ":not([stylex-hack]) > *_end": null,
    ":not([stylex-hack]) > *_position": "xt24udd",
    ":not([stylex-hack]) > *_top": "xw53kvy",
    ":not([stylex-hack]) > *_transform": "x1dka6rp",
    $$css: true,
  },
  fit: {
    ":not([stylex-hack]) img_height": "xtd80it",
    ":not([stylex-hack]) img_start": "x1jgp7su",
    ":not([stylex-hack]) img_left": null,
    ":not([stylex-hack]) img_right": null,
    ":not([stylex-hack]) img_position": "x1q1rkhy",
    ":not([stylex-hack]) img_top": "x18tuezv",
    ":not([stylex-hack]) img_width": "x1xuqjiz",
    $$css: true,
  },
  fitCover: { ":not([stylex-hack]) img_objectFit": "xhl3afg", $$css: true },
  fitContain: { ":not([stylex-hack]) img_objectFit": "x1o3kp5p", $$css: true },
  presentational: { pointerEvents: "x47corl", $$css: true },
  disabled: { opacity: "xbyyjgo", $$css: true },
};

const MediaContent = forwardRef(
  // eslint-disable-next-line complexity
  (
    {
      description,
      fit,
      hasMediaBackground,
      isDisabled,
      isImage,
      isLoading,
      media,
      onLoad,
      size,
    },
    ref
  ) => {
    const mediaItemContext = useContext(GeoPrivateMediaItemContext);
    const surfaceContext = useContext(GeoPrivateMediaItemSurfaceContext);
    const theme = useGeoTheme();
    const selectStaticBackgroundColor = theme.selectStaticBackgroundColor;
    const isPresentational =
      !isImage && media?.type !== "svg" && media?.type !== "img";
    const classNames = [
      mediaContentStyles.root,
      isDisabled && mediaContentStyles.disabled,
      isLoading && mediaContentStyles.loading,
      (!isImage || fit === "none") && mediaContentStyles.fitNone,
      isImage && fit !== "none" && mediaContentStyles.fit,
      isImage && fit === "cover" && mediaContentStyles.fitCover,
      isImage && fit === "contain" && mediaContentStyles.fitContain,
      isPresentational && mediaContentStyles.presentational,
      !isLoading &&
        surfaceContext !== "none" &&
        selectStaticBackgroundColor({ surface: "wash" }),
      !isImage &&
        hasMediaBackground === false &&
        mediaContentStyles.backgroundTransparent,
    ];

    return (
      <div
        aria-label={description}
        className={stylex(classNames)}
        // eslint-disable-next-line react/no-unknown-property
        onLoad={onLoad}
        ref={ref}
        role={
          isFalsey(description) && isPresentational ? "presentation" : "img"
        }
      >
        {media}
        {mediaItemContext.isOverflowItem && (
          <OverflowIcon
            overflowCount={mediaItemContext.overflowCount}
            size={size}
            variant={mediaItemContext.variant}
          />
        )}
      </div>
    );
  }
);

function isElementImage(element) {
  if (!React.isValidElement(element)) return false;
  const internalElement =
    DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE(element);
  if (!internalElement || !internalElement.props) return false;
  if (
    internalElement.type === React.Fragment &&
    internalElement.props.children
  ) {
    return React.Children.toArray(internalElement.props.children).some(
      isElementImage
    );
  } else {
    return (
      typeof internalElement.props === "object" &&
      internalElement.props.src &&
      (typeof internalElement.props.src === "string" ||
        (typeof internalElement.props.src === "object" &&
          typeof internalElement.props.src.valueOf === "string"))
    );
  }
}

const addonStyles = {
  root: { position: "x10l6tqk", zIndex: "x1vjfegm", $$css: true },
};

const PlatformIcon = ({ platform, ratio, size }) => {
  const addonSize = GeoPrivateMediaItemAddOn.getAddonSize(size);
  return (
    <GeoPrivateMediaItemAddOn
      mediaRatio={ratio}
      mediaSize={size}
      position="below"
      shape={GeoPrivatePlatformIconUtils.getIconShape(platform)}
      xstyle={addonStyles.root}
    >
      <GeoPlatformIcon platform={platform} size={addonSize} />
    </GeoPrivateMediaItemAddOn>
  );
};

PlatformIcon.displayName = `${PlatformIcon.name}`;

const overflowStyles = {
  overlay: {
    position: "x10l6tqk",
    height: "x5yr21d",
    width: "xh8yej3",
    top: "x13vifvy",
    start: "x17qophe",
    borderTopStartRadius: "x1o1ewxj",
    borderTopEndRadius: "x3x9cwd",
    borderBottomEndRadius: "x1e5q0jg",
    borderBottomStartRadius: "x13rtm0m",
    overflowX: "x6ikm8r",
    overflowY: "x10wlt62",
    display: "x78zum5",
    alignItems: "x6s0dn4",
    justifyContent: "xl56j7k",
    $$css: true,
  },
};

const OverflowIcon = ({ overflowCount, size, variant = "ellipses" }) => {
  const theme = useGeoTheme();
  const selectStaticBackgroundColor = theme.selectStaticBackgroundColor;
  const icon = getIconBySize(size);
  const textSize = getTextSizeBySize(size);

  return (
    <div
      className={stylex([
        selectStaticBackgroundColor({ surface: "overlay" }),
        overflowStyles.overlay,
      ])}
    >
      {variant === "ellipses" ? (
        <GeoPrivateIcon color="inverted" icon={icon} />
      ) : (
        <GeoBaseText color="inverted" size={textSize} textAlign="center">
          {getOverflowText(size, overflowCount)}
        </GeoBaseText>
      )}
    </div>
  );
};

OverflowIcon.displayName = `${OverflowIcon.name}`;

function getIconBySize(size) {
  switch (size) {
    case 16:
      return fbicon("1253039", 8);
    case 24:
      return fbicon("484385", 12);
    case 30:
    case 32:
    case 41:
      return fbicon("484386", 16);
    default:
      return fbicon("484388", 24);
  }
}

function getTextSizeBySize(size) {
  switch (size) {
    case 16:
    case 24:
    case 30:
    case 32:
      return "accent";
    case 41:
    case 48:
      return "value";
    default:
      return "header1";
  }
}

function getMaxOverflowCount(size) {
  switch (size) {
    case 16:
    case 24:
      return 9;
    case 30:
    case 32:
    case 41:
    case 48:
      return 99;
    case 62:
    case 64:
      return 999;
    case 94:
    case 96:
      return 9999;
    default:
      return 99;
  }
}

function getOverflowText(size, overflowCount) {
  const maxCount = getMaxOverflowCount(size);
  return overflowCount !== null && overflowCount > maxCount
    ? `${maxCount}+`
    : `+${overflowCount ?? 0}`;
}

const GeoMediaItemComponent = GeoPrivateMakeComponent.makeGeoComponent(
  "GeoMediaItem",
  GeoMediaItem
);

export default GeoMediaItemComponent;
