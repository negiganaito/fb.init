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
import BUIPrivateButtonLayoutContext from "BUIPrivateButtonLayoutContext";
import GeoBaseAccessibleElement from "GeoBaseAccessibleElement.react";
import GeoBaseSpacingLayout from "GeoBaseSpacingLayout.react";
import GeoBaseText from "GeoBaseText.react";
import GeoIcon from "GeoIcon.react";
import GeoPrivateButtonIconEndLayoutContext from "GeoPrivateButtonIconEndLayoutContext";
import GeoPrivateButtonLayerActionContext from "GeoPrivateButtonLayerActionContext";
import GeoPrivateButtonThemeUtils from "GeoPrivateButtonThemeUtils";
import GeoPrivateFBIconOrImageish from "GeoPrivateFBIconOrImageish.react";
import GeoPrivateFbtOrTooltip from "GeoPrivateFbtOrTooltip.react";
import GeoPrivateInvertThemeContext from "GeoPrivateInvertThemeContext";
import GeoPrivateLoggingAction from "GeoPrivateLoggingAction";
import GeoPrivateLoggingClassification from "GeoPrivateLoggingClassification";
import GeoPrivateMakeComponent from "GeoPrivateMakeComponent";
import GeoPrivatePressable from "GeoPrivatePressable.react";
import GeoPrivateTooltipTriggerContext from "GeoPrivateTooltipTriggerContext";
import GeoSpinner from "GeoSpinner.react";
import stylex from "stylex";
import useGeoPrivateAnimationPressableStyle from "useGeoPrivateAnimationPressableStyle";
import useGeoPrivateIsDisabled from "useGeoPrivateIsDisabled";
import useGeoPrivateIsNextTheme from "useGeoPrivateIsNextTheme";
import useGeoPrivateWithLogging from "useGeoPrivateWithLogging";
import useGeoTheme from "useGeoTheme";
import useMergeRefs from "useMergeRefs";

const styles = {
  fullWidth: { width: "xh8yej3", $$css: true },
  container: { display: "x78zum5", $$css: true },
  hiddenButton: { display: "x1s85apg", $$css: true },
  growLabel: { flexGrow: "x1iyjqo2", $$css: true },
  icon: { flexShrink: "x2lah0s", flexGrow: "x1c4vz4f", $$css: true },
  iconEnd: {
    marginStart: "x1gryazu",
    marginLeft: null,
    marginRight: null,
    $$css: true,
  },
};

// eslint-disable-next-line complexity
const GeoPrivateBaseButton = (props) => {
  const {
    "aria-errormessage": ariaErrorMessage,
    "aria-haspopup": ariaHasPopup,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-owns": ariaOwns,
    "aria-pressed": ariaPressed,
    icon,
    iconEnd,
    isDepressed = false,
    justify = "center",
    loggingName = "GeoPrivateBaseButton",
    onBlur,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    role,
    suppressHydrationWarning,
    variant = "default",
    "aria-controls": ariaControls,
    "aria-describedby": ariaDescribedBy,
    "aria-expanded": ariaExpanded,
    containerRef,
    "data-testid": dataTestId,
    disabledMessage,
    download,
    grow = "auto",
    hasAnimation = true,
    href,
    id,
    isDisabled = false,
    isLabelHidden = false,
    isLoading = false,
    label,
    onClick,
    onFocus,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    rel,
    target,
    tooltip,
    type = "button",
    xstyle,
  } = props;

  const isNextTheme = useGeoPrivateIsNextTheme();
  const isIconEndLayoutEnd =
    useContext(GeoPrivateButtonIconEndLayoutContext) === "end";
  const [isActive, setIsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [layoutContext, layoutContextRef] =
    BUIPrivateButtonLayoutContext.useLayoutContext();
  const hiddenButtonRef = useRef(null);
  const tooltipTriggerRef = useRef(null);
  const mergedRef = useMergeRefs(
    useMergeRefs(layoutContextRef, tooltipTriggerRef),
    containerRef
  );
  const buttonLayerAction = useContext(GeoPrivateButtonLayerActionContext);
  const isDisabledState = useGeoPrivateIsDisabled(isDisabled);
  const isLabelHiddenOrEmpty = isLabelHidden || label === "";
  const isPrimaryOrCreation = ["primary", "creation"].includes(variant);
  const isSubmitOrHasLayerAction =
    type === "submit" || buttonLayerAction !== null;

  const handleFocusChange = useCallback(
    (isFocused) => {
      onFocusChange?.(isFocused);
    },
    [onFocusChange]
  );

  const handleFocusVisibleChange = useCallback(
    (isFocusVisible) => {
      setIsActive(isFocusVisible);
      onFocusVisibleChange?.(isFocusVisible);
    },
    [onFocusVisibleChange]
  );

  const handleHoverChange = useCallback(
    (isHovered) => {
      setIsFocused(isHovered);
      onHoverChange?.(isHovered);
    },
    [onHoverChange]
  );

  const handleClickWithLogging = useGeoPrivateWithLogging(onClick, {
    name: loggingName,
    action: GeoPrivateLoggingAction.CLICK,
    classification: GeoPrivateLoggingClassification.USER_ACTION,
  });

  const handleClick = useCallback(
    (event) => {
      if (isSubmitOrHasLayerAction) {
        hiddenButtonRef.current?.click();
      }
      handleClickWithLogging?.(event);
    },
    [isSubmitOrHasLayerAction, handleClickWithLogging]
  );

  const handlePressChange = useCallback(
    (isPressed) => {
      setIsPressed(isPressed);
      onPressChange?.(isPressed);
    },
    [onPressChange]
  );

  const adjustedLayoutContext = useMemo(() => {
    const { ...rest } = layoutContext;
    return isNextTheme && variant === "default" ? rest : layoutContext;
  }, [isNextTheme, layoutContext, variant]);

  const hasStartIcon = icon !== null;
  const hasEndIcon = iconEnd !== null;
  const isIconOnly = isLabelHiddenOrEmpty && (hasStartIcon || hasEndIcon);

  const isFocusedOrActive = isActive || isFocused;
  const isDepressedOrPressed = isDepressed || isPressed;

  const buttonStyles = useButtonStyles({
    grow,
    variant,
    isDisabled: isDisabledState,
    isFocused: isFocusedOrActive,
    isActive: isDepressedOrPressed,
    isIconOnly,
    hasStartIcon,
    hasEndIcon,
    hasAnimation,
  });

  const contentStyles = useContentStyles({ justify, isHidden: isLoading });
  const spinnerStyles = useSpinnerStyles({
    isLoading,
    isSingleChild: isLabelHidden && icon === null && iconEnd === null,
  });
  const outlineStyles = useOutlineStyles({ isActive, variant });

  const effectiveTooltip =
    isDisabledState && disabledMessage !== null ? disabledMessage : tooltip;

  return (
    <GeoPrivateTooltipTriggerContext.Provider value={tooltipTriggerRef}>
      <GeoPrivatePressable
        accessibilityLabel={ariaLabel}
        accessibilityRelationship={{
          controls: ariaControls,
          describedby: ariaDescribedBy,
          errormessage: ariaErrorMessage,
          haspopup: ariaHasPopup,
          labelledby: ariaLabelledBy,
          owns: ariaOwns,
        }}
        accessibilityRole={role ?? (href !== null ? "link" : "button")}
        accessibilityState={{
          busy: isLoading,
          expanded: ariaExpanded,
          pressed: ariaPressed,
        }}
        disabled={isDisabledState}
        forwardedRef={mergedRef}
        link={
          href !== null ? { url: href.toString(), target, rel, download } : null
        }
        nativeID={id}
        onBlur={onBlur}
        onFocus={onFocus}
        onFocusChange={handleFocusChange}
        onFocusVisibleChange={handleFocusVisibleChange}
        onHoverChange={handleHoverChange}
        onHoverEnd={onHoverEnd}
        onHoverMove={onHoverMove}
        onHoverStart={onHoverStart}
        onPress={
          isSubmitOrHasLayerAction || onClick !== null ? handleClick : null
        }
        onPressChange={handlePressChange}
        onPressEnd={onPressEnd}
        onPressMove={onPressMove}
        onPressStart={onPressStart}
        preventDefault={href === null}
        style={adjustedLayoutContext}
        suppressHydrationWarning={suppressHydrationWarning}
        testID={dataTestId}
        xstyle={[buttonStyles, xstyle]}
      >
        <GeoBaseText
          color="inherit"
          size="value"
          weight="inherit"
          xstyle={styles.fullWidth}
        >
          <div className={stylex(styles.container)}>
            {isActive && (
              <div
                className={stylex(outlineStyles)}
                style={adjustedLayoutContext}
              />
            )}
            {isLoading && (
              <div className={stylex(spinnerStyles)}>
                <GeoSpinner
                  shade={isPrimaryOrCreation ? "light" : "dark"}
                  size="small"
                />
              </div>
            )}
            {isLabelHiddenOrEmpty && (
              <GeoBaseAccessibleElement isHidden={isLabelHidden}>
                {label}
              </GeoBaseAccessibleElement>
            )}
            <GeoBaseSpacingLayout xstyle={[contentStyles, styles.fullWidth]}>
              {hasStartIcon && (
                <GeoPrivateFBIconOrImageish
                  color="inherit"
                  icon={icon}
                  isDisabled={isDisabledState}
                  xstyle={styles.icon}
                />
              )}
              {isLabelHiddenOrEmpty ? (
                "\u200b"
              ) : (
                <GeoBaseText
                  color="inherit"
                  display="truncate"
                  showTruncationTooltip={effectiveTooltip === null}
                  size="interactive"
                  weight={isNextTheme ? null : "inherit"}
                  xstyle={justify === "start" && styles.growLabel}
                >
                  {label}
                </GeoBaseText>
              )}
              {iconEnd && (
                <GeoIcon
                  color="inherit"
                  icon={iconEnd}
                  isDisabled={isDisabledState}
                  xstyle={[styles.icon, isIconEndLayoutEnd && styles.iconEnd]}
                />
              )}
            </GeoBaseSpacingLayout>
          </div>
        </GeoBaseText>
      </GeoPrivatePressable>
      {isSubmitOrHasLayerAction && (
        <div className={stylex(styles.hiddenButton)}>
          <button
            className={buttonLayerAction}
            ref={hiddenButtonRef}
            type={type}
          />
        </div>
      )}
      <GeoPrivateFbtOrTooltip>{effectiveTooltip}</GeoPrivateFbtOrTooltip>
    </GeoPrivateTooltipTriggerContext.Provider>
  );
};

const useButtonStyles = (props) => {
  const {
    grow,
    variant,
    isDisabled = false,
    isFocused = false,
    isActive = false,
    isIconOnly,
    hasStartIcon,
    hasEndIcon,
    hasAnimation,
  } = props;

  const isNextTheme = useGeoPrivateIsNextTheme();
  const theme = useGeoTheme();
  const { selectBorderRadius, selectInteractiveColorPalette, selectSpacing } =
    theme;
  const effectiveVariant = getEffectiveVariant(variant);
  const { selectInteractiveBorder } = useGeoTheme();

  const iconPositions = [
    hasStartIcon ? "start" : null,
    hasEndIcon ? "end" : null,
    isIconOnly ? "horizontal" : null,
  ].filter(Boolean);

  return [
    styles2.root,
    isNextTheme && styles2.outlineOffset,
    useGeoPrivateAnimationPressableStyle({
      hasAnimation,
      isActive,
    }),
    selectBorderRadius({ context: "control" }),
    selectInteractiveBorder({
      context: effectiveVariant === "button" ? "button" : "control",
      color: effectiveVariant,
      isDisabled,
    }),
    selectInteractiveColorPalette({
      color: effectiveVariant,
      isDisabled,
      isFocused,
      isActive,
    }),
    selectSpacing({ context: "control", bounds: "internal", target: "coarse" }),
    iconPositions.length > 0 &&
      selectSpacing({
        context: "control",
        bounds: "internal",
        target: "normal",
        positions: iconPositions,
      }),
    grow === "fill" && styles2.grow,
  ];
};

const styles3 = {
  root: { justifyContent: "xl56j7k", opacity: "x1hc1fzr", $$css: !0 },
  hidden: { opacity: "xg01cxk", $$css: !0 },
};

const useContentStyles = (props) => {
  const { justify = "center", isHidden = false } = props;
  const { selectTransition } = useGeoTheme();
  const transition = selectTransition({ duration: "fast", timing: "soft" });

  return [
    styles3.root,
    transition,
    isHidden && styles3.hidden,
    justify === "center" && styles2.justifyCenter,
    justify === "start" && styles2.justifyStart,
  ];
};

const useSpinnerStyles = (props) => {
  const { isLoading = false, isSingleChild = false } = props;
  const { selectTransition } = useGeoTheme();
  const contentStyles = useContentStyles({ isHidden: !isLoading });
  const transition = selectTransition({ duration: "fast", timing: "soft" });

  return [
    styles2.spinnerRoot,
    !isSingleChild && styles2.spinnerAbsolute,
    contentStyles,
    transition,
  ];
};

const useOutlineStyles = (props) => {
  const { isActive = false, variant } = props;
  const { selectBorderRadius, selectOutline } = useGeoTheme();
  const effectiveVariant = getEffectiveVariant(variant);

  return [
    selectBorderRadius({ context: "control" }),
    selectOutline({ color: effectiveVariant, isActive }),
    styles2.outlineRoot,
  ];
};

const getEffectiveVariant = (variant = "default") => {
  const invertThemeContext = useContext(GeoPrivateInvertThemeContext);
  const shouldUseUpdatedNextButtonColors =
    GeoPrivateButtonThemeUtils.shouldUseUpdatedNextButtonColors();

  if (invertThemeContext) return "flatInverted";
  return variant === "default"
    ? shouldUseUpdatedNextButtonColors
      ? "button"
      : "wash"
    : variant;
};

const styles2 = {
  root: {
    alignItems: "x6s0dn4",
    borderTopStyle: "x1ejq31n",
    borderEndStyle: "xd10rxx",
    borderBottomStyle: "x1sy0etr",
    borderStartStyle: "x17r0tee",
    display: "x3nfvp2",
    flexBasis: "xdl72j9",
    flexDirection: "x1q0g3np",
    flexShrink: "x2lah0s",
    maxWidth: "x193iq5w",
    position: "x1n2onr6",
    textDecoration: "x1hl2dhg",
    userSelect: "x87ps6o",
    verticalAlign: "xxymvpz",
    MozOsxFontSmoothing: "xlh3980",
    WebkitFontSmoothing: "xvmahel",
    ":hover_textDecoration": "x1lku1pv",
    $$css: true,
  },
  outlineOffset: { outlineOffset: "x1g40iwv", $$css: true },
  justifyCenter: { justifyContent: "xl56j7k", $$css: true },
  justifyStart: { justifyContent: "x1nhvcw1", $$css: true },
  grow: {
    display: "x78zum5",
    flexGrow: "x1iyjqo2",
    flexShrink: "xs83m0k",
    $$css: true,
  },
  contentRoot: { justifyContent: "xl56j7k", opacity: "x1hc1fzr", $$css: true },
  contentHidden: { opacity: "xg01cxk", $$css: true },
  spinnerRoot: {
    display: "x3nfvp2",
    alignSelf: "xamitd3",
    justifyContent: "xl56j7k",
    alignItems: "x6s0dn4",
    $$css: true,
  },
  spinnerAbsolute: {
    position: "x10l6tqk",
    top: "x13vifvy",
    bottom: "x1ey2m1c",
    start: "x17qophe",
    left: null,
    right: null,
    end: "xds687c",
    marginTop: "xr1yuqi",
    marginEnd: "xkrivgy",
    marginBottom: "x4ii5y1",
    marginStart: "x1gryazu",
    $$css: true,
  },
  outlineRoot: {
    bottom: "xqmqy1e",
    end: "x1esfoun",
    left: null,
    right: null,
    pointerEvents: "x47corl",
    position: "x10l6tqk",
    start: "xzadtn0",
    top: "x1pdr0v7",
    $$css: true,
  },
};

export default GeoPrivateMakeComponent.makeGeoComponent(
  "GeoPrivateBaseButton",
  GeoPrivateBaseButton
);
