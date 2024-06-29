// __d(
//   "FDSCallout.react",
//   [
//     "fbt",
//     "ix",
//     "BaseContextualLayerOrientationContext",
//     "BaseRow.react",
//     "BaseRowItem.react",
//     "BaseView.react",
//     "CometColumn.react",
//     "CometColumnItem.react",
//     "CometErrorBoundary.react",
//     "CometHideLayerOnEscape.react",
//     "FDSCalloutEdge.react",
//     "FDSCalloutInset.react",
//     "FDSIcon.react",
//     "FDSTextPairing.react",
//     "FocusRegionStrictMode.react",
//     "fbicon",
//     "focusScopeQueries",
//     "react",
//     "unrecoverableViolation",
//     "useOnOutsideClick",
//     "useVisibilityObserver",
//   ],
//   function (a, b, c, d, e, f, g, h, i) {
//     "use strict";
//     var j,
//       k = j || (j = d("react"));
//     b = j;
//     var l = b.useContext,
//       m = b.useMemo,
//       n = {
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
//         crossoutButton: {
//           marginEnd: "xcud41i",
//           marginLeft: null,
//           marginRight: null,
//           marginTop: "x9otpla",
//           $$css: !0,
//         },
//         item: {
//           paddingStart: "x16hj40l",
//           paddingLeft: null,
//           paddingRight: null,
//           paddingEnd: "xsyo7zv",
//           paddingTop: "x1yrsyyn",
//           paddingBottom: "x10b6aqq",
//           $$css: !0,
//         },
//       },
//       o = {
//         accent: { backgroundColor: "xdk9wry", $$css: !0 },
//         default: { backgroundColor: "x9bbmet", $$css: !0 },
//       },
//       p = {
//         above: { marginBottom: "x12nagc", $$css: !0 },
//         below: { marginTop: "x1gslohp", $$css: !0 },
//         end: {
//           marginStart: "xsgj6o6",
//           marginLeft: null,
//           marginRight: null,
//           $$css: !0,
//         },
//         start: { $$css: !0 },
//       };
//     function a(a) {
//       var b = a.arrowStyle;
//       b = b === void 0 ? "none" : b;
//       var e = a.calloutID,
//         f = a.content,
//         g = a.contentID,
//         j = a.disableAutoFocus;
//       j = j === void 0 ? !1 : j;
//       var q = a.onClose,
//         r = a.onHide,
//         s = a.onOutsideClick,
//         t = a.onShow,
//         u = a.titleID,
//         v = a.type;
//       v = v === void 0 ? "default" : v;
//       var w = a.xstyle,
//         x = a.addOn,
//         y = a["aria-label"],
//         z = a.hasCloseButton;
//       z = z === void 0 ? !0 : z;
//       var A = a.title;
//       a = l(c("BaseContextualLayerOrientationContext"));
//       a = a.position;
//       var B = c("useOnOutsideClick")(s);
//       r = c("useVisibilityObserver")({ onHidden: r, onVisible: t });
//       t = v === "default" ? "primary" : "white";
//       if (a === "end" && (b === "inset" || b === "edge"))
//         throw c("unrecoverableViolation")(
//           '"end" position with arrow is not supported yet',
//           "comet_ui"
//         );
//       var C = m(
//         function () {
//           return A != null
//             ? { "aria-describedby": g, "aria-labelledby": u }
//             : { "aria-describedby": g, "aria-label": y };
//         },
//         [y, g, A, u]
//       );
//       r = k.jsxs(c("CometColumn.react"), {
//         children: [
//           k.jsx(c("CometColumnItem.react"), {
//             children: k.jsxs(c("BaseRow.react"), {
//               children: [
//                 k.jsx(c("BaseRowItem.react"), {
//                   expanding: !0,
//                   ref: r,
//                   verticalAlign: "center",
//                   xstyle: n.item,
//                   children: k.jsx(c("FDSTextPairing.react"), {
//                     body: f,
//                     bodyColor: t,
//                     bodyId: g,
//                     headline: A,
//                     headlineColor: t,
//                     headlineId: u,
//                     isSemanticHeading: !0,
//                     level: 3,
//                   }),
//                 }),
//                 z &&
//                   k.jsx(c("BaseRowItem.react"), {
//                     xstyle: [n.crossoutButton, n.item],
//                     children: k.jsx(c("FDSIcon.react"), {
//                       "aria-label": h._("Close"),
//                       color: v === "default" ? "secondary" : "white",
//                       focusable: !0,
//                       icon: d("fbicon")._(i("478232"), 16),
//                       onPress: q,
//                       size: 16,
//                     }),
//                   }),
//               ],
//             }),
//           }),
//           x != null &&
//             k.jsx(c("CometColumnItem.react"), {
//               paddingTop: 12,
//               children: k.jsx(c("BaseRow.react"), {
//                 children: k.jsx(c("BaseRowItem.react"), {
//                   expanding: !0,
//                   verticalAlign: "center",
//                   xstyle: n.item,
//                   children: x,
//                 }),
//               }),
//             }),
//         ],
//       });
//       if (b === "inset")
//         return k.jsx(
//           c("FDSCalloutInset.react"),
//           babelHelpers["extends"]({}, C, {
//             disableAutoFocus: j,
//             id: e,
//             onClose: q,
//             onOutsideClick: s,
//             type: v,
//             xstyle: w,
//             children: r,
//           })
//         );
//       return b === "edge"
//         ? k.jsx(
//             c("FDSCalloutEdge.react"),
//             babelHelpers["extends"]({}, C, {
//               disableAutoFocus: j,
//               id: e,
//               onClose: q,
//               onOutsideClick: s,
//               type: v,
//               xstyle: w,
//               children: r,
//             })
//           )
//         : k.jsx(c("CometErrorBoundary.react"), {
//             fallback: function () {
//               return k.jsx("div", {});
//             },
//             children: k.jsx(
//               c("BaseView.react"),
//               babelHelpers["extends"]({}, C, {
//                 id: (f = e) != null ? f : void 0,
//                 role: "dialog",
//                 xstyle: n.container,
//                 children: k.jsx(d("FocusRegionStrictMode.react").FocusRegion, {
//                   autoFocusQuery: j
//                     ? void 0
//                     : d("focusScopeQueries").tabbableScopeQuery,
//                   children: k.jsx(c("CometHideLayerOnEscape.react"), {
//                     onHide: q,
//                     children: k.jsx(c("BaseRow.react"), {
//                       ref: B,
//                       xstyle: [n.content, o[v], b === "none" && p[a], w],
//                       children: r,
//                     }),
//                   }),
//                 }),
//               })
//             ),
//           });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   226
// );

import React, { useContext, useMemo } from "react";
import { fbt } from "fbt";
import { ix } from "ix";
import BaseContextualLayerOrientationContext from "BaseContextualLayerOrientationContext";
import BaseRow from "BaseRow.react";
import BaseRowItem from "BaseRowItem.react";
import BaseView from "BaseView.react";
import CometColumn from "CometColumn.react";
import CometColumnItem from "CometColumnItem.react";
import CometErrorBoundary from "CometErrorBoundary.react";
import CometHideLayerOnEscape from "CometHideLayerOnEscape.react";
import FDSCalloutEdge from "FDSCalloutEdge.react";
import FDSCalloutInset from "FDSCalloutInset.react";
import FDSIcon from "FDSIcon.react";
import FDSTextPairing from "FDSTextPairing.react";
import FocusRegionStrictMode from "FocusRegionStrictMode.react";
import { fbicon } from "fbicon";
import { focusScopeQueries } from "focusScopeQueries";
import { unrecoverableViolation } from "unrecoverableViolation";
import { useOnOutsideClick } from "useOnOutsideClick";
import { useVisibilityObserver } from "useVisibilityObserver";

interface FDSCalloutProps {
  arrowStyle?: "none" | "inset" | "edge";
  calloutID: string;
  content: React.ReactNode;
  contentID: string;
  disableAutoFocus?: boolean;
  onClose: () => void;
  onHide?: () => void;
  onOutsideClick?: () => void;
  onShow?: () => void;
  titleID: string;
  type?: "default" | "accent";
  xstyle?: any; // Adjust the type based on your styling solution
  addOn?: React.ReactNode;
  "aria-label"?: string;
  hasCloseButton?: boolean;
  title?: string;
}

const styles = {
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
  crossoutButton: {
    marginEnd: "xcud41i",
    marginTop: "x9otpla",
  },
  item: {
    paddingStart: "x16hj40l",
    paddingEnd: "xsyo7zv",
    paddingTop: "x1yrsyyn",
    paddingBottom: "x10b6aqq",
  },
};

const backgroundStyles = {
  accent: { backgroundColor: "xdk9wry" },
  default: { backgroundColor: "x9bbmet" },
};

const marginStyles = {
  above: { marginBottom: "x12nagc" },
  below: { marginTop: "x1gslohp" },
  end: { marginStart: "xsgj6o6" },
  start: {},
};

const FDSCallout: React.FC<FDSCalloutProps> = ({
  arrowStyle = "none",
  calloutID,
  content,
  contentID,
  disableAutoFocus = false,
  onClose,
  onHide,
  onOutsideClick,
  onShow,
  titleID,
  type = "default",
  xstyle,
  addOn,
  "aria-label": ariaLabel,
  hasCloseButton = true,
  title,
}) => {
  const orientationContext = useContext(BaseContextualLayerOrientationContext);
  const position = orientationContext?.position;

  const outsideClickRef = useOnOutsideClick(onOutsideClick);
  const visibilityObserverRef = useVisibilityObserver({
    onHidden: onHide,
    onVisible: onShow,
  });
  const bodyColor = type === "default" ? "primary" : "white";

  if (position === "end" && (arrowStyle === "inset" || arrowStyle === "edge")) {
    throw unrecoverableViolation(
      '"end" position with arrow is not supported yet',
      "comet_ui"
    );
  }

  const ariaProps = useMemo(() => {
    return title != null
      ? { "aria-describedby": contentID, "aria-labelledby": titleID }
      : { "aria-describedby": contentID, "aria-label": ariaLabel };
  }, [ariaLabel, contentID, title, titleID]);

  const calloutContent = (
    <CometColumn>
      <CometColumnItem>
        <BaseRow>
          <BaseRowItem
            expanding
            ref={visibilityObserverRef}
            verticalAlign="center"
            xstyle={styles.item}
          >
            <FDSTextPairing
              body={content}
              bodyColor={bodyColor}
              bodyId={contentID}
              headline={title}
              headlineColor={bodyColor}
              headlineId={titleID}
              isSemanticHeading
              level={3}
            />
          </BaseRowItem>
          {hasCloseButton && (
            <BaseRowItem xstyle={[styles.crossoutButton, styles.item]}>
              <FDSIcon
                aria-label={fbt._("Close")}
                color={type === "default" ? "secondary" : "white"}
                focusable
                icon={fbicon(ix("478232"), 16)}
                onPress={onClose}
                size={16}
              />
            </BaseRowItem>
          )}
        </BaseRow>
      </CometColumnItem>
      {addOn && (
        <CometColumnItem paddingTop={12}>
          <BaseRow>
            <BaseRowItem expanding verticalAlign="center" xstyle={styles.item}>
              {addOn}
            </BaseRowItem>
          </BaseRow>
        </CometColumnItem>
      )}
    </CometColumn>
  );

  if (arrowStyle === "inset") {
    return (
      <FDSCalloutInset
        {...ariaProps}
        disableAutoFocus={disableAutoFocus}
        id={calloutID}
        onClose={onClose}
        onOutsideClick={onOutsideClick}
        type={type}
        xstyle={xstyle}
      >
        {calloutContent}
      </FDSCalloutInset>
    );
  }

  if (arrowStyle === "edge") {
    return (
      <FDSCalloutEdge
        {...ariaProps}
        disableAutoFocus={disableAutoFocus}
        id={calloutID}
        onClose={onClose}
        onOutsideClick={onOutsideClick}
        type={type}
        xstyle={xstyle}
      >
        {calloutContent}
      </FDSCalloutEdge>
    );
  }

  return (
    <CometErrorBoundary fallback={() => <div />}>
      <BaseView
        {...ariaProps}
        id={calloutID || undefined}
        role="dialog"
        xstyle={styles.container}
      >
        <FocusRegionStrictMode.FocusRegion
          autoFocusQuery={
            disableAutoFocus ? undefined : focusScopeQueries.tabbableScopeQuery
          }
        >
          <CometHideLayerOnEscape onHide={onClose}>
            <BaseRow
              ref={outsideClickRef}
              xstyle={[
                styles.content,
                backgroundStyles[type],
                arrowStyle === "none" && marginStyles[position],
                xstyle,
              ]}
            >
              {calloutContent}
            </BaseRow>
          </CometHideLayerOnEscape>
        </FocusRegionStrictMode.FocusRegion>
      </BaseView>
    </CometErrorBoundary>
  );
};

FDSCallout.displayName = `${FDSCallout.name} [from some-module-id]`;

export default FDSCallout;
