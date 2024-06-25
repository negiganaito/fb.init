__d(
  "GeoBaseInteractiveRow.react",
  [
    "GeoBaseInteractiveListContext",
    "GeoBaseRowLayout.react",
    "GeoPrivateAnimationPressableOverlay.react",
    "GeoPrivateClearInteractiveStylesContext",
    "GeoPrivateLoggingAction",
    "GeoPrivateLoggingClassification",
    "GeoPrivateMakeComponent",
    "GeoPrivatePressable.react",
    "GeoPrivateSidebarNavigationContext",
    "GeoPrivateTooltipOrDisabledMessage.react",
    "GeoPrivateTruncationContext",
    "react",
    "useGeoPrivateIneractiveRowPreventDefault",
    "useGeoPrivateIsDisabled",
    "useGeoPrivateWithLogging",
    "useGeoTheme",
    "useMergeRefs",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || (h = d("react"));
    b = h;
    var j = b.useContext,
      k = b.useEffect,
      l = b.useRef,
      m = b.useState;
    function a(a) {
      var b = a.accessibilityRole,
        d = a.accessibilityState,
        e = a.containerRef,
        f = a.describedBy,
        g = a.disabledHeading,
        h = a.disabledMessage,
        q = a.hasAnimation;
      q = q === void 0 ? !1 : q;
      var r = a.id,
        s = a.isDisabled;
      s = s === void 0 ? !1 : s;
      var t = a.isExpanded;
      t = t === void 0 ? !1 : t;
      var u = a.isFocusable;
      u = u === void 0 ? !1 : u;
      var v = a.isHighlighted;
      v = v === void 0 ? !1 : v;
      var w = a.isHoverable,
        x = a.isVisuallyFocused,
        y = a.labelledBy,
        z = a.link,
        A = a.loggingName;
      A = A === void 0 ? "GeoBaseInteractiveRow" : A;
      var B = a.onFocusChange,
        C = a.onHoverChange,
        D = a.onPress,
        E = a.tooltip,
        F = a.xstyle,
        G = a.children,
        H = a["data-testid"],
        I = a.grow;
      a = babelHelpers.objectWithoutPropertiesLoose(a, [
        "accessibilityRole",
        "accessibilityState",
        "containerRef",
        "describedBy",
        "disabledHeading",
        "disabledMessage",
        "hasAnimation",
        "id",
        "isDisabled",
        "isExpanded",
        "isFocusable",
        "isHighlighted",
        "isHoverable",
        "isVisuallyFocused",
        "labelledBy",
        "link",
        "loggingName",
        "onFocusChange",
        "onHoverChange",
        "onPress",
        "tooltip",
        "xstyle",
        "children",
        "data-testid",
        "grow",
      ]);
      var J = l(null);
      e = c("useMergeRefs")(J, e);
      var K = m(!1),
        L = K[0],
        M = K[1];
      K = m(!1);
      var N = K[0];
      K = K[1];
      var O = m(!1),
        P = O[0];
      O = O[1];
      s = c("useGeoPrivateIsDisabled")(s);
      var Q = w === !0 || u;
      x = (w = x) != null ? w : N || (Q && L);
      w = j(c("GeoBaseInteractiveListContext"));
      var R = w.registerItem,
        S = w.deregisterItem;
      N = w.FocusItem;
      L = c("useGeoPrivateIneractiveRowPreventDefault")(b);
      k(
        function () {
          var a = J.current;
          R(a);
          return function () {
            return S(a);
          };
        },
        [J, R, S]
      );
      w = f != null || y != null ? { describedby: f, labelledby: y } : void 0;
      f = c("useGeoPrivateWithLogging")(D, {
        name: A,
        action: c("GeoPrivateLoggingAction").CLICK,
        classification: c("GeoPrivateLoggingClassification").USER_ACTION,
      });
      y = j(c("GeoPrivateSidebarNavigationContext"));
      D = y.variant;
      return i.jsxs(N, {
        disabled: s || !u,
        children: [
          i.jsx(c("GeoPrivateTruncationContext").Provider, {
            value: E != null ? !1 : void 0,
            children: i.jsx(c("GeoPrivatePressable.react"), {
              accessibilityRelationship: w,
              accessibilityRole: b,
              accessibilityState: d,
              disabled: s,
              forwardedRef: e,
              link: z,
              nativeID: r,
              onFocusChange: B,
              onFocusVisibleChange: K,
              onHoverChange: function (a) {
                Q && M(a), C == null ? void 0 : C(a);
              },
              onPress: f,
              onPressChange: O,
              preventDefault: L,
              tabbable: u,
              testID: H,
              xstyle: [
                I === "fill" && n.fill,
                I === "auto" && n.fit,
                b === "link" && n.noUnderline,
                F,
              ],
              children: i.jsxs(
                c("GeoBaseRowLayout.react"),
                babelHelpers["extends"](
                  {
                    accessibilityRole: null,
                    xstyle: o({
                      accessibilityRole: b,
                      hasAnimation: q,
                      isSelected: v,
                      isExpanded: t,
                      isFocused: x,
                      isActive: P,
                    }),
                  },
                  a,
                  {
                    children: [
                      q &&
                        i.jsx(c("GeoPrivateAnimationPressableOverlay.react"), {
                          color: p({
                            accessibilityRole: b,
                            isSelected: v,
                            variant: D,
                          }),
                          isActive: P,
                          isFocused: x,
                        }),
                      G,
                    ],
                  }
                )
              ),
            }),
          }),
          i.jsx(c("GeoPrivateTooltipOrDisabledMessage.react"), {
            disabledHeading: g,
            disabledMessage: h,
            isDisabled: s,
            tooltip: E,
            triggerRef: J,
          }),
        ],
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    var n = {
      expanded: {
        borderBottomStartRadius: "xo71vjh",
        borderBottomEndRadius: "x5pf9jr",
        $$css: !0,
      },
      fit: { display: "x3nfvp2", $$css: !0 },
      fill: { flexGrow: "x1iyjqo2", $$css: !0 },
      noUnderline: {
        textDecoration: "x1hl2dhg",
        ":hover_textDecoration": "x1lku1pv",
        $$css: !0,
      },
      row: { position: "x1n2onr6", $$css: !0 },
    };
    function o(a) {
      var b = a.accessibilityRole,
        d = a.hasAnimation,
        e = a.isSelected,
        f = a.isExpanded,
        g = a.isFocused;
      a = a.isActive;
      var h = c("useGeoTheme")();
      h = h.selectInteractiveColorPalette;
      var i = j(c("GeoPrivateClearInteractiveStylesContext")),
        k = j(c("GeoPrivateSidebarNavigationContext"));
      k = k.variant;
      return [
        d && n.row,
        !i &&
          h({
            color: p({ accessibilityRole: b, isSelected: e, variant: k }),
            isFocused: !d && g,
            isActive: !d && a,
          }),
        f && n.expanded,
      ];
    }
    function p(a) {
      var b = a.accessibilityRole,
        c = a.isSelected;
      a = a.variant;
      var d = "flat";
      c &&
        (a === "flat"
          ? (d = "flatNavigation")
          : (d = b === "link" ? "navigation" : "selected"));
      return d;
    }
    e = d("GeoPrivateMakeComponent").makeGeoComponent(
      "GeoBaseInteractiveRow",
      a
    );
    g["default"] = e;
  },
  98
);

import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import GeoBaseInteractiveListContext from "GeoBaseInteractiveListContext";
import GeoBaseRowLayout from "GeoBaseRowLayout.react";
import GeoPrivateAnimationPressableOverlay from "GeoPrivateAnimationPressableOverlay.react";
import GeoPrivateClearInteractiveStylesContext from "GeoPrivateClearInteractiveStylesContext";
import GeoPrivateLoggingAction from "GeoPrivateLoggingAction";
import GeoPrivateLoggingClassification from "GeoPrivateLoggingClassification";
import GeoPrivateMakeComponent from "GeoPrivateMakeComponent";
import GeoPrivatePressable from "GeoPrivatePressable.react";
import GeoPrivateSidebarNavigationContext from "GeoPrivateSidebarNavigationContext";
import GeoPrivateTooltipOrDisabledMessage from "GeoPrivateTooltipOrDisabledMessage.react";
import GeoPrivateTruncationContext from "GeoPrivateTruncationContext";
import useGeoPrivateIneractiveRowPreventDefault from "useGeoPrivateIneractiveRowPreventDefault";
import useGeoPrivateIsDisabled from "useGeoPrivateIsDisabled";
import useGeoPrivateWithLogging from "useGeoPrivateWithLogging";
import useGeoTheme from "useGeoTheme";
import useMergeRefs from "useMergeRefs";

interface GeoBaseInteractiveRowProps {
  accessibilityRole?: string;
  accessibilityState?: object;
  containerRef?: React.Ref<any>;
  describedBy?: string;
  disabledHeading?: string;
  disabledMessage?: string;
  hasAnimation?: boolean;
  id?: string;
  isDisabled?: boolean;
  isExpanded?: boolean;
  isFocusable?: boolean;
  isHighlighted?: boolean;
  isHoverable?: boolean;
  isVisuallyFocused?: boolean;
  labelledBy?: string;
  link?: string;
  loggingName?: string;
  onFocusChange?: (focus: boolean) => void;
  onHoverChange?: (hover: boolean) => void;
  onPress?: (event: React.MouseEvent) => void;
  tooltip?: string;
  xstyle?: object;
  children?: ReactNode;
  "data-testid"?: string;
  grow?: "fill" | "auto";
}

const GeoBaseInteractiveRow: React.FC<GeoBaseInteractiveRowProps> = ({
  accessibilityRole,
  accessibilityState,
  containerRef,
  describedBy,
  disabledHeading,
  disabledMessage,
  hasAnimation = false,
  id,
  isDisabled = false,
  isExpanded = false,
  isFocusable = false,
  isHighlighted = false,
  isHoverable,
  isVisuallyFocused,
  labelledBy,
  link,
  loggingName = "GeoBaseInteractiveRow",
  onFocusChange,
  onHoverChange,
  onPress,
  tooltip,
  xstyle,
  children,
  "data-testid": dataTestId,
  grow,
  ...rest
}) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergeRefs(innerRef, containerRef);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const disabled = useGeoPrivateIsDisabled(isDisabled);
  const isInteractive = isHoverable === true || isFocusable;
  const visuallyFocused =
    isVisuallyFocused != null
      ? isVisuallyFocused
      : isHovering || (isInteractive && isFocused);
  const listContext = useContext(GeoBaseInteractiveListContext);
  const { registerItem, deregisterItem, FocusItem } = listContext;
  const preventDefault =
    useGeoPrivateIneractiveRowPreventDefault(accessibilityRole);
  const logOnPress = useGeoPrivateWithLogging(onPress, {
    name: loggingName,
    action: GeoPrivateLoggingAction.CLICK,
    classification: GeoPrivateLoggingClassification.USER_ACTION,
  });
  const sidebarContext = useContext(GeoPrivateSidebarNavigationContext);
  const { variant } = sidebarContext;

  useEffect(() => {
    const currentRef = innerRef.current;
    registerItem(currentRef);
    return () => {
      deregisterItem(currentRef);
    };
  }, [innerRef, registerItem, deregisterItem]);

  const accessibilityRelationship =
    describedBy != null || labelledBy != null
      ? { describedby: describedBy, labelledby: labelledBy }
      : undefined;

  return (
    <FocusItem disabled={disabled || !isFocusable}>
      <GeoPrivateTruncationContext.Provider
        value={tooltip != null ? false : undefined}
      >
        <GeoPrivatePressable
          accessibilityRelationship={accessibilityRelationship}
          accessibilityRole={accessibilityRole}
          accessibilityState={accessibilityState}
          disabled={disabled}
          forwardedRef={mergedRef}
          link={link}
          nativeID={id}
          onFocusChange={onFocusChange}
          onFocusVisibleChange={setIsFocused}
          onHoverChange={(hover) => {
            if (isInteractive) setIsHovering(hover);
            if (onHoverChange) onHoverChange(hover);
          }}
          onPress={logOnPress}
          onPressChange={setIsActive}
          preventDefault={preventDefault}
          tabbable={isFocusable}
          testID={dataTestId}
          xstyle={[
            grow === "fill" && styles.fill,
            grow === "auto" && styles.fit,
            accessibilityRole === "link" && styles.noUnderline,
            xstyle,
          ]}
          {...rest}
        >
          <GeoBaseRowLayout
            accessibilityRole={null}
            xstyle={getRowLayoutStyles({
              accessibilityRole,
              hasAnimation,
              isSelected: isHighlighted,
              isExpanded,
              isFocused: visuallyFocused,
              isActive,
            })}
          >
            {hasAnimation && (
              <GeoPrivateAnimationPressableOverlay
                color={getOverlayColor({
                  accessibilityRole,
                  isSelected: isHighlighted,
                  variant,
                })}
                isActive={isActive}
                isFocused={visuallyFocused}
              />
            )}
            {children}
          </GeoBaseRowLayout>
        </GeoPrivatePressable>
      </GeoPrivateTruncationContext.Provider>
      <GeoPrivateTooltipOrDisabledMessage
        disabledHeading={disabledHeading}
        disabledMessage={disabledMessage}
        isDisabled={disabled}
        tooltip={tooltip}
        triggerRef={innerRef}
      />
    </FocusItem>
  );
};

GeoBaseInteractiveRow.displayName = "GeoBaseInteractiveRow";

const styles = {
  expanded: {
    borderBottomStartRadius: "xo71vjh",
    borderBottomEndRadius: "x5pf9jr",
    $$css: true,
  },
  fit: { display: "x3nfvp2", $$css: true },
  fill: { flexGrow: "x1iyjqo2", $$css: true },
  noUnderline: {
    textDecoration: "x1hl2dhg",
    ":hover_textDecoration": "x1lku1pv",
    $$css: true,
  },
  row: { position: "x1n2onr6", $$css: true },
};

function getRowLayoutStyles({
  accessibilityRole,
  hasAnimation,
  isSelected,
  isExpanded,
  isFocused,
  isActive,
}: {
  accessibilityRole: string;
  hasAnimation: boolean;
  isSelected: boolean;
  isExpanded: boolean;
  isFocused: boolean;
  isActive: boolean;
}) {
  const theme = useGeoTheme();
  const selectInteractiveColorPalette = theme.selectInteractiveColorPalette;
  const clearInteractiveStylesContext = useContext(
    GeoPrivateClearInteractiveStylesContext
  );
  const sidebarContext = useContext(GeoPrivateSidebarNavigationContext);
  const { variant } = sidebarContext;

  return [
    hasAnimation && styles.row,
    !clearInteractiveStylesContext &&
      selectInteractiveColorPalette({
        color: getOverlayColor({ accessibilityRole, isSelected, variant }),
        isFocused: !hasAnimation && isFocused,
        isActive: !hasAnimation && isActive,
      }),
    isExpanded && styles.expanded,
  ];
}

function getOverlayColor({
  accessibilityRole,
  isSelected,
  variant,
}: {
  accessibilityRole: string;
  isSelected: boolean;
  variant: string;
}) {
  let color = "flat";
  if (isSelected) {
    color =
      variant === "flat"
        ? "flatNavigation"
        : accessibilityRole === "link"
        ? "navigation"
        : "selected";
  }
  return color;
}

export default GeoPrivateMakeComponent.makeGeoComponent(
  "GeoBaseInteractiveRow",
  GeoBaseInteractiveRow
);
