/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";

// import CometTrackingNodeProvider from "CometTrackingNodeProvider.react";
import CometPressable from "./CometPressable";
import CometProfilePhotoContent from "./CometProfilePhotoContent";

const styles = {
  pressable: { color: "xzsf02u", display: "x1rg5ohu",  },
  pressed: { transform: "x1n5d1j9",  },
};

const CometProfilePhoto = forwardRef((props, ref) => {
  const {
    addOn,
    addOnTopEnd,
    alt,
    "aria-hidden": ariaHidden,
    "aria-pressed": ariaPressed,
    children,
    cursorDisabled,
    isOverlapped = false,
    onHoverIn,
    onHoverOut,
    overlayDisabled = false,
    preview,
    profileVideo,
    role,
    shape = "circle",
    shouldShowCloseFriendsBadge = false,
    size,
    source,
    storyStatus = "none",
    testid,
    linkProps,
    onPress,
    onPressIn,
    testOnly_pressed,
    ...rest
  } = props;

  const contentProps = {
    addOn,
    addOnTopEnd,
    alt,
    "aria-hidden": ariaHidden,
    "aria-pressed": ariaPressed,
    isOverlapped,
    onHoverIn,
    onHoverOut,
    preview,
    profileVideo,
    role,
    shape,
    shouldShowCloseFriendsBadge,
    size,
    source,
    storyStatus,
    testid,
  };

  return !onPress && !linkProps && testOnly_pressed !== true ? (
    <CometProfilePhotoContent
      {...contentProps}
      forwardRef={ref}
      pressed={false}
      children={children}
    />
  ) : (
    // <CometTrackingNodeProvider trackingNode={3}>
    <CometPressable
      {...rest}
      cursorDisabled={cursorDisabled}
      linkProps={linkProps}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      onPress={onPress}
      onPressIn={onPressIn}
      overlayDisabled={overlayDisabled}
      overlayRadius={
        shape === "circle" ? "50%" : shape === "roundedRect" ? 8 : 0
      }
      ref={ref}
      testOnly_pressed={testOnly_pressed}
      testid={undefined}
      xstyle={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      {({ overlay, pressed }) => (
        <CometProfilePhotoContent
          {...contentProps}
          forwardRef={undefined}
          overlay={overlay}
          pressed={pressed}
          children={children}
        />
      )}
    </CometPressable>
    // </CometTrackingNodeProvider>
  );
});

CometProfilePhoto.displayName = `${CometProfilePhoto.name} [from ${module.id}]`;

export default CometProfilePhoto;
