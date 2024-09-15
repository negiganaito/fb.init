/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useCallback } from "react";

// import { useInteractionLogger } from "MessengerWebUXLogger";
import CometPressable from "./CometPressable";

const getOverlayRadius = (radius) => {
  switch (radius) {
    case "normal":
      return 8;
    case "compact":
      return 4;
    case "50%":
      return "50%";
    case "inherit":
    default:
      return undefined;
  }
};

const MWXPressable = (props, ref) => {
  const { loggingEvent, onPress, overlayRadius, ...rest } = props;
  // const logger = useInteractionLogger();

  const handlePress = useCallback(
    (event) => {
      if (onPress) {
        onPress(event);
      }
      // if (loggingEvent) {
      //   logger?.(loggingEvent);
      // }
    },
    [
      // logger,
      loggingEvent,
      onPress,
    ]
  );

  const radius = getOverlayRadius(overlayRadius);

  if (CometPressable) {
    return (
      <CometPressable
        onPress={handlePress}
        overlayRadius={radius}
        {...rest}
        ref={ref}
      />
    );
  }

  return null;
};

MWXPressable.displayName = `${MWXPressable.name}`;

export default forwardRef(MWXPressable);
