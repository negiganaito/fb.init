__d(
  "GeoBasePressable.react",
  [
    "BUIPrivateButtonLayoutContext",
    "GeoPrivateAnimationPressableOverlay.react",
    "GeoPrivateButtonLayerActionContext",
    "GeoPrivateLoggingAction",
    "GeoPrivateLoggingClassification",
    "GeoPrivateMakeComponent",
    "GeoPrivatePressable.react",
    "gkx",
    "react",
    "stylex",
    "useGeoExpectationViolation",
    "useGeoPrivateWithLogging",
    "useGeoTheme",
    "useMergeRefs",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j = i || (i = d("react"));
    b = i;
    var k = b.useCallback,
      l = b.useContext,
      m = b.useMemo,
      n = b.useRef,
      o = b.useState,
      p = c("gkx")("24835");
    function a(a) {
      var b = a.accessibilityRole;
      b = b === void 0 ? "button" : b;
      var d = a["aria-controls"],
        e = a["aria-describedby"],
        f = a["aria-haspopup"],
        g = a["aria-label"],
        i = a["aria-labelledby"],
        q = a["aria-pressed"],
        s = a.children,
        t = a.containerRef,
        u = a.context;
      u = u === void 0 ? "control" : u;
      var x = a["data-testid"],
        y = a.density;
      y = y === void 0 ? "coarse" : y;
      var z = a.direction,
        A = a.grow;
      A = A === void 0 ? "auto" : A;
      var B = a.hasAnimation;
      B = B === void 0 ? !0 : B;
      var C = a.href,
        D = a.id,
        E = a.isDisabled;
      E = E === void 0 ? !1 : E;
      var F = a.isFocusable;
      F = F === void 0 ? !0 : F;
      var G = a.isVisuallyActive;
      G = G === void 0 ? !1 : G;
      var H = a.loggingName;
      H = H === void 0 ? "GeoBasePressable" : H;
      var I = a.onBlur,
        J = a.onFocus,
        K = a.onFocusVisible,
        L = a.onHoverEnd,
        M = a.onHoverStart,
        N = a.onPress,
        O = a.rel,
        P = a.target,
        Q = a.variant;
      Q = Q === void 0 ? "default" : Q;
      a = a.xstyle;
      var R = o(!1),
        S = R[0],
        T = R[1];
      R = o(!1);
      var U = R[0];
      R = R[1];
      var V = o(!1),
        W = V[0];
      V = V[1];
      var X = c("BUIPrivateButtonLayoutContext").useLayoutContext(),
        Y = X[0];
      X = X[1];
      var Z = n(null);
      X = c("useMergeRefs")(c("useMergeRefs")(X, Z), t);
      Z = l(c("GeoPrivateButtonLayerActionContext"));
      t = w(Q);
      Q = c("useGeoExpectationViolation")();
      B = p && B;
      i == null &&
        g == null &&
        Q(
          "GeoBasePressable expects either an aria-labelledby or aria-label prop for better accessibility."
        );
      var $ = c("useGeoPrivateWithLogging")(N, {
        name: H,
        action: c("GeoPrivateLoggingAction").CLICK,
        classification: c("GeoPrivateLoggingClassification").USER_ACTION,
      });
      Q = function (a) {
        $ == null ? void 0 : $(a);
      };
      N = k(
        function (a) {
          T(a), K == null ? void 0 : K(a);
        },
        [K]
      );
      H = S || U;
      U = G || W;
      G = r({
        color: t,
        context: u,
        density: y,
        direction: z,
        grow: A,
        isDisabled: E,
        isFocused: !B && H,
        isActive: !B && U,
      });
      W = v({ isActive: S, color: t, context: u });
      y = m(
        function () {
          return { controls: d, describedby: e, labelledby: i, haspopup: f };
        },
        [d, e, f, i]
      );
      z = m(
        function () {
          return { pressed: q != null ? q : null };
        },
        [q]
      );
      return j.jsxs(c("GeoPrivatePressable.react"), {
        accessibilityLabel: g,
        accessibilityRelationship: y,
        accessibilityRole: b,
        accessibilityState: z,
        className_DEPRECATED: (A = Z) != null ? A : void 0,
        disabled: E,
        forwardedRef: X,
        link: C != null ? { url: C.toString(), target: P, rel: O } : null,
        nativeID: D,
        onBlur: I,
        onFocus: J,
        onFocusVisibleChange: N,
        onHoverChange: R,
        onHoverEnd: L,
        onHoverStart: M,
        onPress: $ != null ? Q : null,
        onPressChange: V,
        preventDefault: C == null,
        style: babelHelpers["extends"]({}, Y),
        tabbable: F,
        testID: x,
        xstyle: [G, a],
        children: [
          B &&
            j.jsx(c("GeoPrivateAnimationPressableOverlay.react"), {
              color: t,
              isActive: U,
              isFocused: H,
            }),
          S &&
            j.jsx("div", {
              className: (h || (h = c("stylex")))(W),
              style: babelHelpers["extends"]({}, Y),
            }),
          s,
        ],
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    var q = {
      root: {
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
        $$css: !0,
      },
      grow: {
        display: "x78zum5",
        flexGrow: "x1iyjqo2",
        flexShrink: "xs83m0k",
        $$css: !0,
      },
    };
    function r(a) {
      var b = a.color,
        d = a.context,
        e = a.density,
        f = a.direction;
      f = f === void 0 ? null : f;
      var g = a.grow,
        h = a.isDisabled;
      h = h === void 0 ? !1 : h;
      var i = a.isFocused;
      i = i === void 0 ? !1 : i;
      a = a.isActive;
      a = a === void 0 ? !1 : a;
      var j = c("useGeoTheme")(),
        k = j.selectBorderRadius,
        l = j.selectInteractiveColorPalette;
      j = j.selectSpacing;
      f = s(f);
      return [
        q.root,
        g === "fill" && q.grow,
        k({ context: d }),
        l({ color: b, isDisabled: h, isFocused: i, isActive: a }),
        e !== "none" &&
          j({ context: "control", bounds: "internal", target: e }),
        f,
      ];
    }
    function s(a) {
      if (a == null) return null;
      if (a === "column") return t.columnDirection;
      if (a === "row") return t.rowDirection;
      if (a === "row-reverse") return t.rowReverseDirection;
      if (a === "column-reverse") return t.columnReverseDirection;
    }
    var t = {
        columnDirection: { flexDirection: "xdt5ytf", $$css: !0 },
        rowDirection: { flexDirection: "x1q0g3np", $$css: !0 },
        rowReverseDirection: { flexDirection: "x15zctf7", $$css: !0 },
        columnReverseDirection: { flexDirection: "x3ieub6", $$css: !0 },
      },
      u = {
        root: {
          position: "x10l6tqk",
          start: "xzadtn0",
          left: null,
          right: null,
          end: "x1esfoun",
          top: "x1pdr0v7",
          bottom: "xqmqy1e",
          $$css: !0,
        },
      };
    function v(a) {
      var b = a.isActive;
      b = b === void 0 ? !1 : b;
      var d = a.color;
      a = a.context;
      a = a === void 0 ? "control" : a;
      var e = c("useGeoTheme")(),
        f = e.selectBorderRadius;
      e = e.selectOutline;
      return [f({ context: a }), e({ color: d, isActive: b }), u.root];
    }
    function w(a) {
      a === void 0 && (a = "default");
      return a === "default" ? "wash" : a;
    }
    e = d("GeoPrivateMakeComponent").makeGeoComponent("GeoBasePressable", a);
    g["default"] = e;
  },
  98
);

import { useLayoutContext as useBUIPrivateButtonLayoutContext } from "BUIPrivateButtonLayoutContext";
import GeoPrivateAnimationPressableOverlay from "GeoPrivateAnimationPressableOverlay.react";
import { useContext as useGeoPrivateButtonLayerActionContext } from "GeoPrivateButtonLayerActionContext";
import { CLICK as GeoPrivateLoggingActionClick } from "GeoPrivateLoggingAction";
import { USER_ACTION as GeoPrivateLoggingClassificationUserAction } from "GeoPrivateLoggingClassification";
import { makeGeoComponent as GeoPrivateMakeComponent } from "GeoPrivateMakeComponent";
import GeoPrivatePressable from "GeoPrivatePressable.react";
import gkx from "gkx";
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import stylex from "stylex";
import { useGeoExpectationViolation } from "useGeoExpectationViolation";
import { useGeoPrivateWithLogging } from "useGeoPrivateWithLogging";
import { useGeoTheme } from "useGeoTheme";
import { useMergeRefs } from "useMergeRefs";

interface GeoBasePressableProps {
  accessibilityRole?: string;
  "aria-controls"?: string;
  "aria-describedby"?: string;
  "aria-haspopup"?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-pressed"?: boolean;
  children?: React.ReactNode;
  containerRef?: React.Ref<any>;
  context?: string;
  "data-testid"?: string;
  density?: string;
  direction?: string;
  grow?: string;
  hasAnimation?: boolean;
  href?: string;
  id?: string;
  isDisabled?: boolean;
  isFocusable?: boolean;
  isVisuallyActive?: boolean;
  loggingName?: string;
  onBlur?: (event: React.FocusEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onFocusVisible?: (event: React.FocusEvent) => void;
  onHoverEnd?: (event: React.MouseEvent) => void;
  onHoverStart?: (event: React.MouseEvent) => void;
  onPress?: (event: React.MouseEvent) => void;
  rel?: string;
  target?: string;
  variant?: string;
  xstyle?: any;
}

const GeoBasePressable: React.FC<GeoBasePressableProps> = (props) => {
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

  const handlePress = (event: React.MouseEvent) => {
    logPress?.(event);
  };

  const handleFocusVisibleChange = useCallback(
    (event: React.FocusEvent) => {
      setIsFocused(event.type === "focus");
      onFocusVisible?.(event);
    },
    [onFocusVisible]
  );

  const handleHoverChange = useCallback((event: React.MouseEvent) => {
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
    () => ({ pressed: ariaPressed != null ? ariaPressed : null }),
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
}: {
  color: string;
  context: string;
  density: string;
  direction?: string;
  grow: string;
  isDisabled: boolean;
  isFocused: boolean;
  isActive: boolean;
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

function getDirectionStyles(direction?: string) {
  if (direction == null) return null;
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

function getOverlayStyles({
  isActive,
  color,
  context,
}: {
  isActive?: boolean;
  color: string;
  context?: string;
}) {
  const theme = useGeoTheme();
  const borderRadius = theme.selectBorderRadius({
    context: context ?? "control",
  });
  const outline = theme.selectOutline({ color, isActive });

  return [borderRadius, outline, overlayRootStyles];
}

function getColor(variant: string) {
  return variant === "default" ? "wash" : variant;
}

export default GeoPrivateMakeComponent("GeoBasePressable", GeoBasePressable);
