/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable complexity */
import React, { useState } from "react";

import CometPressableOverlayContainer from "./CometPressableOverlayContainer";
import VisualCompletionAttributes from "./VisualCompletionAttributes";
import { isWeb } from "./XPlatReactEnvironment";

const styles = {
  circle: {
    borderTopStartRadius: "xzolkzo",
    borderTopEndRadius: "x12go9s9",
    borderBottomEndRadius: "x1rnf11y",
    borderBottomStartRadius: "xprq8jg",
    ,
  },
  defaultHoveredStyle: { backgroundColor: "x1wpzbip",  },
  defaultPressedStyle: { backgroundColor: "x1iutvsz",  },
  focusRing: {
    boxShadow: "x18bame2",
    outline: "xvetz19 x1a2a7pz",
    ,
  },
  focusRingInset: { boxShadow: "xpud6h4",  },
  overlay: {
    bottom: "x1ey2m1c",
    end: "xds687c",
    left: null,
    right: null,
    start: "x17qophe",
    opacity: "xg01cxk",
    pointerEvents: "x47corl",
    position: "x10l6tqk",
    top: "x13vifvy",
    transitionDuration: "x1ebt8du",
    transitionProperty: "x19991ni",
    transitionTimingFunction: "x1dhq9h",
    ,
  },
  overlayVisible: {
    opacity: "x1hc1fzr",
    transitionDuration: "x1mq3mr6",
    ,
  },
  overlayWeb: {
    borderTopStartRadius: "x1o1ewxj",
    borderTopEndRadius: "x3x9cwd",
    borderBottomEndRadius: "x1e5q0jg",
    borderBottomStartRadius: "x13rtm0m",
    ,
  },
};

const CometPressableOverlay = ({
  focusRingPosition = "default",
  focusVisible = false,
  focusVisibleStyle,
  hovered = false,
  hoveredStyle = styles.defaultHoveredStyle,
  offset,
  pressed = false,
  pressedStyle = styles.defaultPressedStyle,
  radius,
  showFocusRing = false,
  xstyle,
}) => {
  const [state, setState] = useState();

  if (pressed && state !== "pressed") {
    setState("pressed");
  } else if (focusVisible && state !== "focused") {
    setState("focused");
  } else if (hovered && state !== "hovered") {
    setState("hovered");
  }

  let bottom = 0;
  let left = 0;
  let right = 0;
  let top = 0;
  if (offset !== null) {
    if (typeof offset === "number") {
      bottom = left = right = top = -offset;
    } else {
      ({ bottom, left, right, top } = offset);
      bottom = -bottom;
      left = -left;
      right = -right;
      top = -top;
    }
  }

  const focusRingStyle =
    (state === "focused" || (state === "pressed" && focusVisible)) &&
    showFocusRing
      ? focusRingPosition === "default"
        ? styles.focusRing
        : styles.focusRingInset
      : undefined;

  return (
    <CometPressableOverlayContainer
      style={
        state !== null
          ? {
              ...(typeof radius === "number" ? { borderRadius: radius } : {}),
              bottom,
              left,
              right,
              top,
            }
          : undefined
      }
      xstyle={[
        styles.overlay,
        isWeb() && styles.overlayWeb,
        xstyle,
        (pressed || focusVisible || hovered) && [
          styles.overlayVisible,
          state === "pressed" && pressedStyle,
          state === "focused" && (focusVisibleStyle ?? hoveredStyle),
          state === "hovered" && hoveredStyle,
        ],
        focusRingStyle,
        radius === "50%" && styles.circle,
      ]}
      {...VisualCompletionAttributes.IGNORE}
      role="none"
    >
      {null}
    </CometPressableOverlayContainer>
  );
};

CometPressableOverlay.displayName = `${CometPressableOverlay.name} [from ${CometPressableOverlay.id}]`;

export default CometPressableOverlay;
