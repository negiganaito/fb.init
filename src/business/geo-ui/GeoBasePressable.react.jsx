/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import stylex from "@stylexjs/stylex";
import { useLayoutContext as useBUIPrivateButtonLayoutContext } from "BUIPrivateButtonLayoutContext";
import GeoPrivateAnimationPressableOverlay from "GeoPrivateAnimationPressableOverlay.react";
import { useContext as useGeoPrivateButtonLayerActionContext } from "GeoPrivateButtonLayerActionContext";
import { CLICK as GeoPrivateLoggingActionClick } from "GeoPrivateLoggingAction";
import { USER_ACTION as GeoPrivateLoggingClassificationUserAction } from "GeoPrivateLoggingClassification";
import { makeGeoComponent as GeoPrivateMakeComponent } from "GeoPrivateMakeComponent";
import GeoPrivatePressable from "GeoPrivatePressable.react";
import gkx from "gkx";
import { useGeoExpectationViolation } from "useGeoExpectationViolation";
import { useGeoPrivateWithLogging } from "useGeoPrivateWithLogging";
import { useGeoTheme } from "useGeoTheme";
import { useMergeRefs } from "useMergeRefs";

const GeoBasePressable = (props) => {
  const {
    accessibilityRole = "button",
    "aria-controls": ariaControls,
    "aria-describedby": ariaDescribedBy,
    "aria-haspopup": ariaHasPopup,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-pressed": ariaPressed,
    children,
    containerRef,
    context = "control",
    "data-testid": dataTestId,
    density = "coarse",
    direction,
    grow = "auto",
    hasAnimation = true,
    href,
    id,
    isDisabled = false,
    isFocusable = true,
    isVisuallyActive = false,
    loggingName = "GeoBasePressable",
    onBlur,
    onFocus,
    onFocusVisible,
    onHoverEnd,
    onHoverStart,
    onPress,
    rel,
    target,
    variant = "default",
    xstyle,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const layoutContext = useBUIPrivateButtonLayoutContext();
  const [layout, setLayout] = layoutContext;
  const buttonRef = useRef(null);
  const mergedRefs = useMergeRefs(
    useMergeRefs(setLayout, buttonRef),
    containerRef
  );
  const buttonLayerActionContext = useContext(
    useGeoPrivateButtonLayerActionContext
  );
  const color = getColor(variant);
  const logExpectationViolation = useGeoExpectationViolation();
  const shouldAnimate = gkx("24835") && hasAnimation;

  if (!ariaLabel && !ariaLabelledBy) {
    logExpectationViolation(
      "GeoBasePressable expects either an aria-labelledby or aria-label prop for better accessibility."
    );
  }

  const logPress = useGeoPrivateWithLogging(onPress, {
    name: loggingName,
    action: GeoPrivateLoggingActionClick,
    classification: GeoPrivateLoggingClassificationUserAction,
  });

  const handlePress = (event) => {
    logPress?.(event);
  };

  const handleFocusVisibleChange = useCallback(
    (event) => {
      setIsFocused(event.type === "focus");
      onFocusVisible?.(event);
    },
    [onFocusVisible]
  );

  const handleHoverChange = useCallback((event) => {
    setIsHovered(event.type === "mouseenter");
  }, []);

  const activeState = isFocused || isHovered;
  const visuallyActive = isVisuallyActive || isPressed;
  const pressableStyles = getPressableStyles({
    color,
    context,
    density,
    direction,
    grow,
    isDisabled,
    isFocused: !shouldAnimate && activeState,
    isActive: !shouldAnimate && visuallyActive,
  });

  const overlayStyles = getOverlayStyles({
    isActive: isFocused,
    color,
    context,
  });
  const accessibilityRelationship = useMemo(
    () => ({
      controls: ariaControls,
      describedby: ariaDescribedBy,
      labelledby: ariaLabelledBy,
      haspopup: ariaHasPopup,
    }),
    [ariaControls, ariaDescribedBy, ariaHasPopup, ariaLabelledBy]
  );

  const accessibilityState = useMemo(
    () => ({ pressed: ariaPressed !== null ? ariaPressed : null }),
    [ariaPressed]
  );

  return (
    <GeoPrivatePressable
      accessibilityLabel={ariaLabel}
      accessibilityRelationship={accessibilityRelationship}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      className_DEPRECATED={buttonLayerActionContext}
      disabled={isDisabled}
      forwardedRef={mergedRefs}
      link={href ? { url: href.toString(), target, rel } : null}
      nativeID={id}
      onBlur={onBlur}
      onFocus={onFocus}
      onFocusVisibleChange={handleFocusVisibleChange}
      onHoverChange={handleHoverChange}
      onHoverEnd={onHoverEnd}
      onHoverStart={onHoverStart}
      onPress={logPress ? handlePress : null}
      onPressChange={setIsPressed}
      preventDefault={!href}
      style={{ ...layout }}
      tabbable={isFocusable}
      testID={dataTestId}
      xstyle={[pressableStyles, xstyle]}
    >
      {shouldAnimate && (
        <GeoPrivateAnimationPressableOverlay
          color={color}
          isActive={visuallyActive}
          isFocused={activeState}
        />
      )}
      {isPressed && (
        <div className={stylex(overlayStyles)} style={{ ...layout }} />
      )}
      {children}
    </GeoPrivatePressable>
  );
};

GeoBasePressable.displayName = "GeoBasePressable";

const rootStyles = {
  position: "x1n2onr6",
  display: "x3nfvp2",
  flexDirection: "x1q0g3np",
  verticalAlign: "xxymvpz",
  borderTopStyle: "x1ejq31n",
  borderEndStyle: "xd10rxx",
  borderBottomStyle: "x1sy0etr",
  borderStartStyle: "x17r0tee",
  userSelect: "x87ps6o",
  outlineStyle: "x1t137rt",
  MozOsxFontSmoothing: "xlh3980",
  WebkitFontSmoothing: "xvmahel",
  textDecoration: "x1hl2dhg",
  ":hover_textDecoration": "x1lku1pv",
  $$css: true,
};

const growStyles = {
  display: "x78zum5",
  flexGrow: "x1iyjqo2",
  flexShrink: "xs83m0k",
  $$css: true,
};

function getPressableStyles({
  color,
  context,
  density,
  direction,
  grow,
  isDisabled,
  isFocused,
  isActive,
}) {
  const theme = useGeoTheme();
  const borderRadius = theme.selectBorderRadius({ context });
  const interactiveColorPalette = theme.selectInteractiveColorPalette({
    color,
    isDisabled,
    isFocused,
    isActive,
  });
  const spacing = theme.selectSpacing({
    context: "control",
    bounds: "internal",
    target: density,
  });
  const directionStyles = getDirectionStyles(direction);

  return [
    rootStyles,
    grow === "fill" && growStyles,
    borderRadius,
    interactiveColorPalette,
    density !== "none" && spacing,
    directionStyles,
  ];
}

function getDirectionStyles(direction) {
  if (direction === null) return null;
  switch (direction) {
    case "column":
      return { flexDirection: "xdt5ytf", $$css: true };
    case "row":
      return { flexDirection: "x1q0g3np", $$css: true };
    case "row-reverse":
      return { flexDirection: "x15zctf7", $$css: true };
    case "column-reverse":
      return { flexDirection: "x3ieub6", $$css: true };
    default:
      return null;
  }
}

const overlayRootStyles = {
  position: "x10l6tqk",
  start: "xzadtn0",
  left: null,
  right: null,
  end: "x1esfoun",
  top: "x1pdr0v7",
  bottom: "xqmqy1e",
  $$css: true,
};

function getOverlayStyles({ isActive, color, context }) {
  const theme = useGeoTheme();
  const borderRadius = theme.selectBorderRadius({
    context: context ?? "control",
  });
  const outline = theme.selectOutline({ color, isActive });

  return [borderRadius, outline, overlayRootStyles];
}

function getColor(variant) {
  return variant === "default" ? "wash" : variant;
}

export default GeoPrivateMakeComponent("GeoBasePressable", GeoBasePressable);
