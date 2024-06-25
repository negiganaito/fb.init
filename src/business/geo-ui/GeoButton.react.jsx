// __d(
//   "GeoButton.react",
//   [
//     "BUIPrivateButtonLayoutContext",
//     "GeoPrivateBaseButton.react",
//     "GeoPrivateButtonLayerActionContext",
//     "GeoPrivateButtonStyleContext",
//     "GeoPrivateHoverCardContext",
//     "GeoPrivateMakeComponent",
//     "react",
//     "stylex",
//     "useMergeRefs",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i,
//       j = i || (i = d("react"));
//     b = i;
//     var k = b.useContext,
//       l = b.useEffect,
//       m = b.useMemo,
//       n = b.useRef;
//     e = j.forwardRef(a);
//     function a(a, b) {
//       var d = a.ariaLabel,
//         e = a.autoFocus,
//         f = e === void 0 ? !1 : e;
//       e = a.containerRef;
//       var g = a.isDepressed,
//         i = a.layerAction,
//         p = a.loggingName;
//       p = p === void 0 ? "GeoButton" : p;
//       var q = a.maxWidth,
//         r = a.minWidth,
//         s = a.onClick,
//         t = a.onHoverChange,
//         u = a.width,
//         v = a.grow,
//         w = a.isDisabled;
//       w = w === void 0 ? !1 : w;
//       var x = a.type;
//       x = x === void 0 ? "button" : x;
//       var y = a.xstyle;
//       a = babelHelpers.objectWithoutPropertiesLoose(a, [
//         "ariaLabel",
//         "autoFocus",
//         "containerRef",
//         "isDepressed",
//         "layerAction",
//         "loggingName",
//         "maxWidth",
//         "minWidth",
//         "onClick",
//         "onHoverChange",
//         "width",
//         "grow",
//         "isDisabled",
//         "type",
//         "xstyle",
//       ]);
//       var z = n(null),
//         A = c("BUIPrivateButtonLayoutContext").useLayoutContext(),
//         B = A[0];
//       B.marginLeft;
//       B = babelHelpers.objectWithoutPropertiesLoose(B, ["marginLeft"]);
//       A = A[1];
//       var C = k(c("GeoPrivateButtonStyleContext"));
//       C = C.width;
//       C = (C = C) != null ? C : u;
//       u = k(c("GeoPrivateHoverCardContext"));
//       u = u.isHoverCard;
//       u = u ? "fill" : v;
//       e = (v = e) != null ? v : b;
//       v = c("useMergeRefs")(e, z);
//       v = c("useMergeRefs")(v, A);
//       b = m(
//         function () {
//           switch (i) {
//             case "confirm":
//               return "layerConfirm";
//             case "cancel":
//               return "layerCancel";
//             case "button":
//               return "layerButton";
//           }
//           return null;
//         },
//         [i]
//       );
//       l(
//         function () {
//           if (f) {
//             var a;
//             (a = z.current) == null ? void 0 : a.focus();
//           }
//         },
//         [z, f]
//       );
//       e = C != null || r != null || q != null;
//       A = r;
//       r = q;
//       return j.jsx(c("GeoPrivateButtonLayerActionContext").Provider, {
//         value: b,
//         children: j.jsx("div", {
//           className: (h || (h = c("stylex")))(
//             o.buttonWrapper,
//             u === "fill" && o.grow,
//             y
//           ),
//           role: "none",
//           style: babelHelpers["extends"]({}, B, {
//             width: C,
//             minWidth: A,
//             maxWidth: r,
//           }),
//           children: j.jsx(
//             c("GeoPrivateBaseButton.react"),
//             babelHelpers["extends"]({}, a, {
//               "aria-label": (q = d) != null ? q : void 0,
//               containerRef: v,
//               grow: e || u === "fill" ? "fill" : void 0,
//               isDepressed: g,
//               isDisabled: w,
//               loggingName: p,
//               onClick: s,
//               onHoverChange: t,
//               type: x,
//             })
//           ),
//         }),
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     var o = {
//       buttonWrapper: {
//         display: "x3nfvp2",
//         maxWidth: "x193iq5w",
//         verticalAlign: "xxymvpz",
//         $$css: !0,
//       },
//       grow: {
//         display: "x78zum5",
//         flexGrow: "x1iyjqo2",
//         flexShrink: "xs83m0k",
//         $$css: !0,
//       },
//     };
//     b = d("GeoPrivateMakeComponent").makeGeoComponent("GeoButton", e);
//     g["default"] = b;
//   },
//   98
// );

import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  forwardRef,
  ForwardedRef,
} from "react";
import { BUIPrivateButtonLayoutContext } from "BUIPrivateButtonLayoutContext";
import GeoPrivateBaseButton from "GeoPrivateBaseButton.react";
import GeoPrivateButtonLayerActionContext from "GeoPrivateButtonLayerActionContext";
import GeoPrivateButtonStyleContext from "GeoPrivateButtonStyleContext";
import GeoPrivateHoverCardContext from "GeoPrivateHoverCardContext";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import { stylex } from "stylex";
import useMergeRefs from "useMergeRefs";

interface GeoButtonProps {
  ariaLabel?: string;
  autoFocus?: boolean;
  containerRef?: ForwardedRef<HTMLDivElement>;
  isDepressed?: boolean;
  layerAction?: "confirm" | "cancel" | "button";
  loggingName?: string;
  maxWidth?: string | number;
  minWidth?: string | number;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onHoverChange?: (isHovering: boolean) => void;
  width?: string | number;
  grow?: "fill" | "none";
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
  xstyle?: any;
  [key: string]: any; // For additional props
}

const GeoButton = forwardRef<HTMLDivElement, GeoButtonProps>(
  (
    {
      ariaLabel,
      autoFocus = false,
      containerRef,
      isDepressed,
      layerAction,
      loggingName = "GeoButton",
      maxWidth,
      minWidth,
      onClick,
      onHoverChange,
      width,
      grow,
      isDisabled = false,
      type = "button",
      xstyle,
      ...props
    },
    ref
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    const layoutContext = BUIPrivateButtonLayoutContext.useLayoutContext();
    const layoutStyle = layoutContext[0];
    const buttonStyleContext = useContext(GeoPrivateButtonStyleContext);
    const buttonWidth = buttonStyleContext.width ?? width;
    const hoverCardContext = useContext(GeoPrivateHoverCardContext);
    const isHoverCard = hoverCardContext.isHoverCard;

    const finalGrow = isHoverCard ? "fill" : grow;
    const combinedRef = useMergeRefs(
      containerRef,
      ref,
      localRef,
      layoutContext[1]
    );
    const layerActionContextValue = useMemo(() => {
      switch (layerAction) {
        case "confirm":
          return "layerConfirm";
        case "cancel":
          return "layerCancel";
        case "button":
          return "layerButton";
        default:
          return null;
      }
    }, [layerAction]);

    useEffect(() => {
      if (autoFocus) {
        localRef.current?.focus();
      }
    }, [autoFocus]);

    const isWidthDefined =
      buttonWidth != null || minWidth != null || maxWidth != null;

    return (
      <GeoPrivateButtonLayerActionContext.Provider
        value={layerActionContextValue}
      >
        <div
          className={stylex(
            styles.buttonWrapper,
            finalGrow === "fill" && styles.grow,
            xstyle
          )}
          role="none"
          style={{ ...layoutStyle, width: buttonWidth, minWidth, maxWidth }}
        >
          <GeoPrivateBaseButton
            {...props}
            aria-label={ariaLabel}
            containerRef={combinedRef}
            grow={isWidthDefined || finalGrow === "fill" ? "fill" : undefined}
            isDepressed={isDepressed}
            isDisabled={isDisabled}
            loggingName={loggingName}
            onClick={onClick}
            onHoverChange={onHoverChange}
            type={type}
          />
        </div>
      </GeoPrivateButtonLayerActionContext.Provider>
    );
  }
);

GeoButton.displayName = `${GeoButton.name} [from some-module-id]`;

const styles = {
  buttonWrapper: {
    display: "x3nfvp2",
    maxWidth: "x193iq5w",
    verticalAlign: "xxymvpz",
  },
  grow: {
    display: "x78zum5",
    flexGrow: "x1iyjqo2",
    flexShrink: "xs83m0k",
  },
};

const ExportedGeoButton = makeGeoComponent("GeoButton", GeoButton);
export default ExportedGeoButton;
