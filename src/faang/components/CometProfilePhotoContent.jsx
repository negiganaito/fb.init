/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useId } from "react";
import BaseSvgImage from "BaseSvgImage.react";
import CometProfilePhotoAddOn from "CometProfilePhotoAddOn.react";
// import CometSSRSuspendOnServer from "CometSSRSuspendOnServer.react";
// import LazyCometProfileVideoSection from "LazyCometProfileVideoSection.react";
import stylex from "stylex";

import {
  IGNORE,
  IGNORE_DYNAMIC,
} from "../../helpers/CometVisualCompletionConstants";
import {
  getBadgePosition,
  getBadgeSizeAndStrokeWidth,
  getStoryRingSize,
} from "../../helpers/profilePhotoUtils";
import useSetAttributeRef from "../../hooks/useSetAttributeRef";

// import CometErrorBoundary from "./CometErrorBoundary";
import CometImage from "./CometImage.react";
import CometLoadingAnimation from "./CometLoadingAnimation";
import CometProfilePhotoNotificationBadge from "./CometProfilePhotoNotificationBadge";
// import CometPlaceholder from "./CometPlaceholder.react";
import CometSSRReplaceContentOnHydrationAndBreakEventReplaying from "./CometSSRReplaceContentOnHydrationAndBreakEventReplaying";

const styles = {
  badge: {
    borderTopStartRadius: "50%",
    borderTopEndRadius: "50%",
    borderBottomEndRadius: "50%",
    borderBottomStartRadius: "50%",
    position: "x10l6tqk",
    zIndex: "xhtitgo",
  },
  badgeWithBorder: {
    borderTopColor: "x1aoij9j",
    borderEndColor: "xxpsvdv",
    borderBottomColor: "x2e7n7m",
    borderStartColor: "x9387xi",
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
  },
  badgeWithLastActiveTime: {
    bottom: "x1ey2m1c",
    display: "x78zum5",
    end: "xds687c",
    start: "x17qophe",
    justifyContent: "x13a6bvl",
  },
  badgeWithShadow: {
    boxShadow: "x14ihvte",
  },
  insetSVG: {
    fill: "none",
    stroke: "var(--media-inner-border)",
    strokeWidth: "2",
  },
  photo: {
    verticalAlign: "bottom",
  },
  photoCircle: {
    borderTopStartRadius: "50%",
    borderTopEndRadius: "50%",
    borderBottomEndRadius: "50%",
    borderBottomStartRadius: "50%",
  },
  photoRoundedRect: {
    borderTopStartRadius: "8px",
    borderTopEndRadius: "8px",
    borderBottomEndRadius: "8px",
    borderBottomStartRadius: "8px",
  },
  storyRingBlue: {
    stroke: "x1p5r69i",
  },
  storyRingGray: {
    stroke: "var(--divider)",
  },
  storyRingGreen: {
    stroke: "var(--positive)",
  },
  storyRingRed: {
    stroke: "3",
  },
  storyRingSize2: {
    strokeWidth: "2",
  },
  storyRingSize3: {
    strokeWidth: "3",
  },
  storyRingSize4: {
    strokeWidth: "4",
  },
  svgOverlay: {
    fill: "var(--media-pressed)",
  },
  videoContainer: {
    WebkitMaskImage: "-webkit-radial-gradient(white,black)",
    overflowX: "hidden",
    overflowY: "hidden",
  },
  videoContainerRectRounded: {
    borderTopStartRadius: "8px",
    borderTopEndRadius: "8px",
    borderBottomEndRadius: "8px",
    borderBottomStartRadius: "8px",
  },
  videoContainerRounded: {
    borderTopStartRadius: "50%",
    borderTopEndRadius: "50%",
    borderBottomEndRadius: "50%",
    borderBottomStartRadius: "50%",
  },
};

// eslint-disable-next-line complexity
const CometProfilePhotoContent = ({
  addOn,
  addOnTopEnd,
  alt,
  children,
  cursorDisabled,
  forwardRef,
  isOverlapped,
  linkProps,
  onHoverIn,
  onHoverOut,
  onPress,
  onPressIn,
  overlay,
  pressed,
  preview,
  profileVideo,
  shape,
  shouldShowCloseFriendsBadge,
  size,
  source,
  storyStatus,
  testid,
  testOnly_pressed,
  ...rest
}) => {
  const id = useId();
  const setIdRef = useSetAttributeRef("id", id);
  // const maskId = `url(#${id})`;
  // const setMaskRef = useSetAttributeRef("mask", maskId);
  const storyRingSize = storyStatus !== "none" ? getStoryRingSize(size) : 0;
  const badgePosition = getBadgePosition(size / 2, true);
  const [badgeSize, badgeStrokeWidth] = getBadgeSizeAndStrokeWidth(
    size,
    addOn?.type
  );
  const isLastActiveTimeBadge =
    addOn?.type === "lastActiveTimeBadge" && size > 28;
  const badgeStyle = isLastActiveTimeBadge
    ? {}
    : getBadgePosition(size / 2, false);

  const badge = addOn ? (
    <div
      className={stylex(
        styles.badge,
        isLastActiveTimeBadge && styles.badgeWithLastActiveTime,
        size === 60 && addOn.type === "activityBadge" && styles.badgeWithShadow,
        addOn.type === "activityBadge" &&
          (profileVideo !== null || addOn.withBorder === true) &&
          styles.badgeWithBorder
      )}
      {...IGNORE}
      style={{
        ...badgeStyle,
        borderWidth: profileVideo !== null ? badgeStrokeWidth : undefined,
      }}
    >
      <CometProfilePhotoAddOn addOn={addOn} pressed={pressed} size={size} />
    </div>
  ) : null;

  const notificationBadge = addOnTopEnd ? (
    <div
      className={stylex(styles.badge)}
      data-testid={undefined}
      style={badgePosition}
    >
      <CometProfilePhotoNotificationBadge number={addOnTopEnd.number} />
    </div>
  ) : null;

  const image =
    typeof source.uri === "string" ? (
      <BaseSvgImage
        src={source.uri}
        style={{
          height: size - storyRingSize * 4,
          width: size - storyRingSize * 4,
        }}
        x={2 * storyRingSize}
        y={2 * storyRingSize}
      />
    ) : (
      <CometImage
        alt={alt}
        height={size - 4 * storyRingSize}
        src={source.uri}
        testid={undefined}
        width={size - 4 * storyRingSize}
        xstyle={[
          styles.photo,
          shape === "circle" && styles.photoCircle,
          shape === "roundedRect" && styles.photoRoundedRect,
        ]}
      />
    );

  const svgContent =
    typeof source.uri === "string" ? (
      <svg
        aria-hidden={alt === null}
        aria-label={alt}
        className={stylex(styles.photo)}
        {...IGNORE_DYNAMIC}
        data-testid={undefined}
        role={alt !== null ? "img" : "none"}
        style={{ height: size, width: size }}
      >
        <mask id={id} ref={setIdRef} suppressHydrationWarning>
          {shape === "circle" ? (
            <circle cx={size / 2} cy={size / 2} fill="white" r={size / 2} />
          ) : (
            <rect
              cy={size / 2}
              fill="white"
              height={size}
              rx={shape === "square" ? 0 : 8}
              ry={shape === "square" ? 0 : 8}
              width={size}
              x={0}
              y={0}
            />
          )}
          <CometSSRReplaceContentOnHydrationAndBreakEventReplaying
            useSuspenseDirectlyForSVG
          >
            {badge !== null &&
              addOn?.type !== "trigger" &&
              addOn?.type !== "lastActiveTimeBadge" &&
              addOn?.backgroundColor !== "none" && (
                <circle
                  cx={
                    badgeStyle.left !== null
                      ? badgeStyle.left
                      : size -
                        (badgeStyle.right !== null ? badgeStyle.right : 0)
                  }
                  cy={
                    badgeStyle.top !== null
                      ? badgeStyle.top
                      : size -
                        (badgeStyle.bottom !== null ? badgeStyle.bottom : 0)
                  }
                  {...IGNORE}
                  fill="black"
                  r={Math.max(
                    addOn?.type === "activityBadge" ? 8 : 0,
                    badgeSize / 2 + badgeStrokeWidth
                  )}
                />
              )}
          </CometSSRReplaceContentOnHydrationAndBreakEventReplaying>
          {notificationBadge !== null &&
            addOnTopEnd !== null &&
            addOnTopEnd.type === "notificationBadge" && (
              <rect
                height={22}
                rx={11}
                ry={11}
                width={
                  addOnTopEnd.number <= 9
                    ? 22
                    : addOnTopEnd.number <= 99
                    ? 33
                    : 44
                }
                x={
                  badgePosition.left !== null
                    ? badgePosition.left -
                      (addOnTopEnd.number <= 9
                        ? 11
                        : addOnTopEnd.number <= 99
                        ? 22
                        : 33)
                    : size -
                      (badgePosition.right !== null ? badgePosition.right : 0) -
                      11
                }
                y={
                  badgePosition.top !== null
                    ? badgePosition.top - 11
                    : size -
                      (badgePosition.bottom !== null
                        ? badgePosition.bottom
                        : 0) -
                      11
                }
              />
            )}
          {storyStatus === "uploading" && (size === 36 || size === 60) ? (
            <circle
              cx={size / 2}
              cy={size / 2}
              fill="transparent"
              r={size / 2 - Number(storyRingSize)}
              stroke="black"
              strokeWidth={storyRingSize * 2}
            />
          ) : (
            storyStatus !== "none" &&
            storyRingSize > 0 && (
              <circle
                cx={size / 2}
                cy={size / 2}
                fill="transparent"
                r={size / 2 - 1.5 * storyRingSize}
                stroke="black"
                strokeWidth={storyRingSize}
              />
            )
          )}
          {isOverlapped === true && (
            <circle
              cx={-size / 2 + 4}
              cy={size / 2}
              fill="black"
              r={size / 2 + 2}
            />
          )}
        </mask>
        {/* <g mask={maskId} ref={setMaskRef} suppressHydrationWarning>
          {profileVideo !== null ? (
            <CometErrorBoundary fallback={() => image}>
              <CometPlaceholder fallback={image}>
                <CometSSRSuspendOnServer>
                  <foreignObject
                    height="100%"
                    width="100%"
                    x={2 * storyRingSize}
                    y={2 * storyRingSize}
                  >
                    <div
                      className={stylex(
                        styles.videoContainer,
                        shape === "roundedRect" &&
                          styles.videoContainerRectRounded,
                        shape === "circle" && styles.videoContainerRounded
                      )}
                      style={{
                        height: size - storyRingSize * 4,
                        width: size - storyRingSize * 4,
                      }}
                    >
                      <LazyCometProfileVideoSection
                        linkProps={linkProps}
                        onHoverIn={onHoverIn}
                        onHoverOut={onHoverOut}
                        onPress={onPress}
                        onPressIn={onPressIn}
                        profileVideo={profileVideo}
                        size={size - storyRingSize * 4}
                        thumbnailUri={source.uri}
                        {...rest}
                      />
                    </div>
                  </foreignObject>
                </CometSSRSuspendOnServer>
              </CometPlaceholder>
            </CometErrorBoundary>
          ) : (
            image
          )}
          {shape === "circle" ? (
            <circle
              className={stylex(styles.insetSVG, pressed && styles.svgOverlay)}
              cx={size / 2}
              cy={size / 2}
              r={size / 2}
            />
          ) : (
            <rect
              className={stylex(styles.insetSVG, pressed && styles.svgOverlay)}
              cy={size / 2}
              fill="white"
              height={size}
              rx={shape === "square" ? 0 : 8}
              ry={shape === "square" ? 0 : 8}
              width={size}
              x={0}
              y={0}
            />
          )}
          {storyStatus === "uploading" && (size === 36 || size === 60)
            ? null
            : storyStatus !== "none" &&
              storyRingSize > 0 && (
                <circle
                  className={stylex(
                    storyStatus === "unseen" &&
                      (shouldShowCloseFriendsBadge === true
                        ? styles.storyRingGreen
                        : styles.storyRingBlue),
                    storyStatus === "seen" && styles.storyRingGray,
                    storyStatus === "live" && styles.storyRingRed,
                    storyRingSize === 4 && styles.storyRingSize4,
                    storyRingSize === 3 && styles.storyRingSize3,
                    storyRingSize === 2 && styles.storyRingSize2
                  )}
                  cx={size / 2}
                  cy={size / 2}
                  fill="transparent"
                  r={size / 2 - storyRingSize / 2}
                  stroke="var(--accent)"
                  strokeWidth={storyRingSize}
                />
              )}
        </g> */}
        {storyStatus === "uploading" && (size === 36 || size === 60) && (
          <g
            style={{
              transform: `scale(${(size - Math.floor(size / 30)) / size})`,
            }}
          >
            <CometLoadingAnimation size={size} />
          </g>
        )}
      </svg>
    ) : (
      image
    );

  return (
    <div className="x1rg5ohu relative bottom x1ja2u2z" ref={forwardRef}>
      {svgContent}
      {children}
      {overlay}
      <CometSSRReplaceContentOnHydrationAndBreakEventReplaying>
        {badge}
      </CometSSRReplaceContentOnHydrationAndBreakEventReplaying>
      {notificationBadge}
    </div>
  );
};

CometProfilePhotoContent.displayName = `${CometProfilePhotoContent.name} [from ${module.id}]`;

export default CometProfilePhotoContent;
