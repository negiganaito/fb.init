// __d(
//   "FDSCalloutEdge.react",
//   [
//     "BaseContextualLayerContextSizeContext",
//     "BaseContextualLayerLayerAdjustmentContext",
//     "BaseContextualLayerOrientationContext",
//     "BaseRow.react",
//     "BaseView.react",
//     "CometHideLayerOnEscape.react",
//     "FDSCalloutEdgeArrow.svg.react",
//     "FocusRegionStrictMode.react",
//     "Locale",
//     "focusScopeQueries",
//     "react",
//     "useOnOutsideClick",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react")),
//       j = h.useContext,
//       k = {
//         arrow: { position: "x10l6tqk", $$css: !0 },
//         container: { display: "x78zum5", $$css: !0 },
//         content: {
//           backgroundColor: "x1h0vfkc",
//           borderTopStartRadius: "x1lq5wgf",
//           borderTopEndRadius: "xgqcy7u",
//           borderBottomEndRadius: "x30kzoy",
//           borderBottomStartRadius: "x9jhf4c",
//           borderTopWidth: "x178xt8z",
//           borderEndWidth: "xm81vs4",
//           borderBottomWidth: "xso031l",
//           borderStartWidth: "xy80clv",
//           boxShadow: "xofhs1l",
//           paddingStart: "x1ye3gou",
//           paddingLeft: null,
//           paddingRight: null,
//           paddingEnd: "xn6708d",
//           paddingTop: "xyamay9",
//           paddingBottom: "x1l90r2v",
//           $$css: !0,
//         },
//       },
//       l = {
//         accent: { backgroundColor: "xdk9wry", $$css: !0 },
//         default: { backgroundColor: "x9bbmet", $$css: !0 },
//       },
//       m = {
//         end: {
//           borderBottomEndRadius: "x5pf9jr",
//           marginBottom: "xieb3on",
//           $$css: !0,
//         },
//         middle: { marginBottom: "x12nagc", $$css: !0 },
//         start: {
//           borderBottomStartRadius: "xo71vjh",
//           marginBottom: "xieb3on",
//           $$css: !0,
//         },
//       },
//       n = {
//         end: {
//           borderTopEndRadius: "x13lgxp2",
//           marginTop: "x1sy10c2",
//           $$css: !0,
//         },
//         middle: { marginTop: "x1gslohp", $$css: !0 },
//         start: {
//           borderTopStartRadius: "x168nmei",
//           marginTop: "x1sy10c2",
//           $$css: !0,
//         },
//       },
//       o = {
//         end: {
//           bottom: "x7ofzsv",
//           end: "xds687c",
//           left: null,
//           right: null,
//           transform: "xpk2tj9",
//           $$css: !0,
//         },
//         middle: {
//           bottom: "x7ofzsv",
//           end: "xds687c",
//           left: null,
//           right: null,
//           $$css: !0,
//         },
//         start: {
//           bottom: "x7ofzsv",
//           start: "x17qophe",
//           left: null,
//           right: null,
//           $$css: !0,
//         },
//       },
//       p = { end: { $$css: !0 }, middle: { $$css: !0 }, start: { $$css: !0 } },
//       q = {
//         end: {
//           bottom: "x7ofzsv",
//           end: "xds687c",
//           left: null,
//           right: null,
//           transform: "xpk2tj9",
//           $$css: !0,
//         },
//         middle: {
//           bottom: "x7ofzsv",
//           end: "xds687c",
//           left: null,
//           right: null,
//           $$css: !0,
//         },
//         start: {
//           bottom: "x7ofzsv",
//           start: "x17qophe",
//           left: null,
//           right: null,
//           $$css: !0,
//         },
//       },
//       r = { end: { $$css: !0 }, middle: { $$css: !0 }, start: { $$css: !0 } },
//       s = {
//         end: {
//           end: "xds687c",
//           left: null,
//           right: null,
//           top: "x1nl0pjx",
//           transform: "x19jd1h0",
//           $$css: !0,
//         },
//         middle: {
//           end: "xds687c",
//           left: null,
//           right: null,
//           top: "x1nl0pjx",
//           transform: "x1oihik5",
//           $$css: !0,
//         },
//         start: {
//           start: "x17qophe",
//           left: null,
//           right: null,
//           top: "x1nl0pjx",
//           transform: "x1oihik5",
//           $$css: !0,
//         },
//       },
//       t = {
//         end: { transform: "x19jd1h0", $$css: !0 },
//         middle: { transform: "x1oihik5", $$css: !0 },
//         start: { transform: "x1oihik5", $$css: !0 },
//       },
//       u = {
//         end: {
//           end: "xds687c",
//           left: null,
//           right: null,
//           top: "x1nl0pjx",
//           transform: "x19jd1h0",
//           $$css: !0,
//         },
//         middle: {
//           end: "xds687c",
//           left: null,
//           right: null,
//           top: "x1nl0pjx",
//           transform: "x1oihik5",
//           $$css: !0,
//         },
//         start: {
//           start: "x17qophe",
//           left: null,
//           right: null,
//           top: "x1nl0pjx",
//           transform: "x1oihik5",
//           $$css: !0,
//         },
//       },
//       v = {
//         end: { transform: "x19jd1h0", $$css: !0 },
//         middle: { transform: "x1oihik5", $$css: !0 },
//         start: { transform: "x1oihik5", $$css: !0 },
//       };
//     function w(a) {
//       if (a === "start") return "end";
//       return a === "end" ? "start" : a;
//     }
//     function a(a) {
//       var b,
//         e = a.children,
//         f = a.disableAutoFocus;
//       f = f === void 0 ? !1 : f;
//       var g = a.id,
//         h = a.onClose,
//         o = a.onOutsideClick,
//         p = a.type;
//       p = p === void 0 ? "default" : p;
//       var q = a.xstyle;
//       a = babelHelpers.objectWithoutPropertiesLoose(a, [
//         "children",
//         "disableAutoFocus",
//         "id",
//         "onClose",
//         "onOutsideClick",
//         "type",
//         "xstyle",
//       ]);
//       var r = j(c("BaseContextualLayerOrientationContext")),
//         s = r.align;
//       r = r.position;
//       s = s === "stretch" ? "start" : s;
//       r = r === "start" ? "above" : r === "end" ? "below" : r;
//       var t = j(c("BaseContextualLayerContextSizeContext"));
//       b =
//         (b = j(c("BaseContextualLayerLayerAdjustmentContext"))) != null ? b : 0;
//       s = b !== 0 ? w(s) : s;
//       t = z(s, (t = t == null ? void 0 : t.width) != null ? t : 0, b);
//       b = c("useOnOutsideClick")(o);
//       return i.jsx(
//         c("BaseView.react"),
//         babelHelpers["extends"]({}, a, {
//           id: (o = g) != null ? o : void 0,
//           role: "dialog",
//           style: t,
//           xstyle: k.container,
//           children: i.jsx(d("FocusRegionStrictMode.react").FocusRegion, {
//             autoFocusQuery: f
//               ? void 0
//               : d("focusScopeQueries").tabbableScopeQuery,
//             children: i.jsxs(c("CometHideLayerOnEscape.react"), {
//               onHide: h,
//               children: [
//                 i.jsx(c("BaseRow.react"), {
//                   ref: b,
//                   xstyle: [
//                     k.content,
//                     l[p],
//                     r === "above" && m[s],
//                     r === "below" && n[s],
//                     q,
//                   ],
//                   children: e,
//                 }),
//                 i.jsx(y, { align: s, position: r, type: p }),
//               ],
//             }),
//           }),
//         })
//       );
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     var x = c("Locale").isRTL();
//     function y(a) {
//       var b = a.align,
//         d = a.position;
//       a = a.type;
//       return i.jsx(c("FDSCalloutEdgeArrow.svg.react"), {
//         fill:
//           a === "default"
//             ? "var(--popover-background)"
//             : "var(--callout-background-color-accent, var(--accent))",
//         xstyle: [
//           k.arrow,
//           d === "above" && a === "default" && (x ? p[b] : o[b]),
//           d === "above" && a === "accent" && (x ? r[b] : q[b]),
//           d === "below" && a === "default" && (x ? t[b] : s[b]),
//           d === "below" && a === "accent" && (x ? v[b] : u[b]),
//         ],
//       });
//     }
//     y.displayName = y.name + " [from " + f.id + "]";
//     function z(a, b, c) {
//       c = c === 0 ? b / 2 : 0;
//       if (c === 0) return void 0;
//       if (a === "start")
//         return { transform: "translateX(" + (x ? -1 * c : c) + "px)" };
//       return a === "end"
//         ? { transform: "translateX(" + (x ? c : -1 * c) + "px)" }
//         : void 0;
//     }
//     g["default"] = a;
//   },
//   98
// );

import {
  BaseContextualLayerContextSizeContext,
  BaseContextualLayerLayerAdjustmentContext,
  BaseContextualLayerOrientationContext,
} from "BaseContextualLayerContext";
import BaseRow from "BaseRow.react";
import BaseView from "BaseView.react";
import CometHideLayerOnEscape from "CometHideLayerOnEscape.react";
import FDSCalloutEdgeArrow from "FDSCalloutEdgeArrow.svg.react";
import { FocusRegion } from "FocusRegionStrictMode.react";
import Locale from "Locale";
import { tabbableScopeQuery } from "focusScopeQueries";
import React, { useContext, ReactNode } from "react";
import { useOnOutsideClick } from "useOnOutsideClick";

const styles = {
  arrow: { position: "x10l6tqk" },
  container: { display: "x78zum5" },
  content: {
    backgroundColor: "x1h0vfkc",
    borderTopStartRadius: "x1lq5wgf",
    borderTopEndRadius: "xgqcy7u",
    borderBottomEndRadius: "x30kzoy",
    borderBottomStartRadius: "x9jhf4c",
    borderTopWidth: "x178xt8z",
    borderEndWidth: "xm81vs4",
    borderBottomWidth: "xso031l",
    borderStartWidth: "xy80clv",
    boxShadow: "xofhs1l",
    paddingStart: "x1ye3gou",
    paddingEnd: "xn6708d",
    paddingTop: "xyamay9",
    paddingBottom: "x1l90r2v",
  },
};

const accentStyles = {
  accent: { backgroundColor: "xdk9wry" },
  default: { backgroundColor: "x9bbmet" },
};

const positionStyles = {
  above: {
    start: { borderBottomStartRadius: "xo71vjh", marginBottom: "xieb3on" },
    middle: { marginBottom: "x12nagc" },
    end: { borderBottomEndRadius: "x5pf9jr", marginBottom: "xieb3on" },
  },
  below: {
    start: { borderTopStartRadius: "x168nmei", marginTop: "x1sy10c2" },
    middle: { marginTop: "x1gslohp" },
    end: { borderTopEndRadius: "x13lgxp2", marginTop: "x1sy10c2" },
  },
};

const arrowStyles = {
  above: {
    default: {
      start: { bottom: "x7ofzsv", start: "x17qophe", transform: "xpk2tj9" },
      middle: { bottom: "x7ofzsv", start: "x17qophe" },
      end: { bottom: "x7ofzsv", end: "xds687c", transform: "xpk2tj9" },
    },
    accent: {
      start: { bottom: "x7ofzsv", start: "x17qophe", transform: "x19jd1h0" },
      middle: { bottom: "x7ofzsv", start: "x17qophe" },
      end: { bottom: "x7ofzsv", end: "xds687c", transform: "x19jd1h0" },
    },
  },
  below: {
    default: {
      start: { top: "x1nl0pjx", start: "x17qophe", transform: "x1oihik5" },
      middle: { top: "x1nl0pjx", start: "x17qophe", transform: "x1oihik5" },
      end: { top: "x1nl0pjx", end: "xds687c", transform: "x19jd1h0" },
    },
    accent: {
      start: { top: "x1nl0pjx", start: "x17qophe", transform: "x1oihik5" },
      middle: { top: "x1nl0pjx", start: "x17qophe", transform: "x1oihik5" },
      end: { top: "x1nl0pjx", end: "xds687c", transform: "x19jd1h0" },
    },
  },
};

function invertPosition(
  position: "start" | "middle" | "end"
): "start" | "middle" | "end" {
  if (position === "start") return "end";
  return position === "end" ? "start" : position;
}

interface FDSCalloutEdgeProps {
  children: ReactNode;
  disableAutoFocus?: boolean;
  id?: string;
  onClose?: () => void;
  onOutsideClick?: () => void;
  type?: "default" | "accent";
  xstyle?: any; // replace 'any' with the appropriate type for xstyle
}

const FDSCalloutEdge: React.FC<FDSCalloutEdgeProps> = ({
  children,
  disableAutoFocus = false,
  id,
  onClose,
  onOutsideClick,
  type = "default",
  xstyle,
  ...props
}) => {
  const { align, position } = useContext(BaseContextualLayerOrientationContext);
  const adjustedAlign = align === "stretch" ? "start" : align;
  const adjustedPosition =
    position === "start" ? "above" : position === "end" ? "below" : position;
  const contextSize = useContext(BaseContextualLayerContextSizeContext);
  const layerAdjustment =
    useContext(BaseContextualLayerLayerAdjustmentContext) ?? 0;
  const finalAlign =
    layerAdjustment !== 0 ? invertPosition(adjustedAlign) : adjustedAlign;
  const styleAdjustment = getStyleAdjustment(
    finalAlign,
    contextSize?.width ?? 0,
    layerAdjustment
  );
  const outsideClickRef = useOnOutsideClick(onOutsideClick);

  return (
    <BaseView
      {...props}
      id={id}
      role="dialog"
      style={styleAdjustment}
      xstyle={styles.container}
    >
      <FocusRegion
        autoFocusQuery={disableAutoFocus ? undefined : tabbableScopeQuery}
      >
        <CometHideLayerOnEscape onHide={onClose}>
          <BaseRow
            ref={outsideClickRef}
            xstyle={[
              styles.content,
              accentStyles[type],
              adjustedPosition === "above" && positionStyles.above[finalAlign],
              adjustedPosition === "below" && positionStyles.below[finalAlign],
              xstyle,
            ]}
          >
            {children}
          </BaseRow>
          <CalloutArrow
            align={finalAlign}
            position={adjustedPosition}
            type={type}
          />
        </CometHideLayerOnEscape>
      </FocusRegion>
    </BaseView>
  );
};

FDSCalloutEdge.displayName = `FDSCalloutEdge [from ${__filename}]`;

const isRTL = Locale.isRTL();

interface CalloutArrowProps {
  align: "start" | "middle" | "end";
  position: "above" | "below";
  type: "default" | "accent";
}

const CalloutArrow: React.FC<CalloutArrowProps> = ({
  align,
  position,
  type,
}) => (
  <FDSCalloutEdgeArrow
    fill={
      type === "default"
        ? "var(--popover-background)"
        : "var(--callout-background-color-accent, var(--accent))"
    }
    xstyle={[styles.arrow, arrowStyles[position][type][align]]}
  />
);

CalloutArrow.displayName = `CalloutArrow [from ${__filename}]`;

function getStyleAdjustment(
  align: "start" | "middle" | "end",
  width: number,
  adjustment: number
): React.CSSProperties | undefined {
  const halfAdjustment = adjustment === 0 ? width / 2 : 0;
  if (halfAdjustment === 0) return undefined;
  if (align === "start")
    return {
      transform: `translateX(${isRTL ? -halfAdjustment : halfAdjustment}px)`,
    };
  return align === "end"
    ? { transform: `translateX(${isRTL ? halfAdjustment : -halfAdjustment}px)` }
    : undefined;
}

export default FDSCalloutEdge;
