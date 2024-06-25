// __d(
//   "GeoToast.react",
//   [
//     "GeoBaseToast.react",
//     "GeoCloseButton.react",
//     "GeoFlexbox.react",
//     "GeoPrivateMakeComponent",
//     "GeoPrivateToastContext",
//     "GeoSpinner.react",
//     "GeoStatusIcon.react",
//     "GeoTextPairing.react",
//     "geoOffset",
//     "react",
//     "stylex",
//     "useGeoIconStyle",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i,
//       j = i || (i = d("react")),
//       k = i.useContext;
//     function a(a) {
//       var b = a.action,
//         d = a.containerRef,
//         e = a["data-testid"];
//       e = a.description;
//       var f = a.hasIcon;
//       f = f === void 0 ? !0 : f;
//       var g = a.heading,
//         i = a.onHide;
//       a = a.status;
//       a = a === void 0 ? "success" : a;
//       var m = k(c("GeoPrivateToastContext"));
//       m = m.onHideFactory;
//       var n = (m = m == null ? void 0 : m(i)) != null ? m : i;
//       m = c("useGeoIconStyle")({ color: "inverted", isDisabled: !1 });
//       return j.jsxs(c("GeoBaseToast.react"), {
//         containerRef: d,
//         "data-testid": void 0,
//         status: a,
//         xstyle: l.root,
//         children: [
//           f === !0 &&
//             j.jsx("div", {
//               className: (h || (h = c("stylex")))(l.icon, m),
//               children:
//                 a === "indeterminate"
//                   ? j.jsx(c("GeoSpinner.react"), {
//                       shade: "light",
//                       size: "small",
//                     })
//                   : j.jsx(c("GeoStatusIcon.react"), {
//                       color: "inherit",
//                       status: a,
//                     }),
//             }),
//           j.jsx(c("GeoTextPairing.react"), {
//             description: e,
//             heading: g,
//             overflowWrap: "break-word",
//             size: "value",
//             xstyle: l.textPairing,
//           }),
//           j.jsxs(c("GeoFlexbox.react"), {
//             shrink: 0,
//             xstyle: c("geoOffset").cardEndAction,
//             children: [
//               j.jsx("div", {
//                 className: "xs83m0k x1c4vz4f x1f0l55g",
//                 children: b,
//               }),
//               j.jsx(c("GeoCloseButton.react"), {
//                 onClick: function () {
//                   return n == null ? void 0 : n("layerCancelButton");
//                 },
//               }),
//             ],
//           }),
//         ],
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     var l = {
//       root: { width: "x1iiql3v", $$css: !0 },
//       icon: {
//         alignItems: "x6s0dn4",
//         flexGrow: "x1c4vz4f",
//         flexShrink: "x2lah0s",
//         height: "xlup9mm",
//         $$css: !0,
//       },
//       textPairing: { flexGrow: "x1iyjqo2", flexShrink: "xs83m0k", $$css: !0 },
//     };
//     b = d("GeoPrivateMakeComponent").makeGeoComponent("GeoToast", a);
//     g["default"] = b;
//   },
//   98
// );

import React, { useContext, RefObject } from "react";
import GeoBaseToast from "GeoBaseToast.react";
import GeoCloseButton from "GeoCloseButton.react";
import GeoFlexbox from "GeoFlexbox.react";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import { GeoPrivateToastContext } from "GeoPrivateToastContext";
import GeoSpinner from "GeoSpinner.react";
import GeoStatusIcon from "GeoStatusIcon.react";
import GeoTextPairing from "GeoTextPairing.react";
import { cardEndAction } from "geoOffset";
import stylex from "stylex";
import { useGeoIconStyle } from "useGeoIconStyle";

interface GeoToastProps {
  action?: React.ReactNode;
  containerRef?: RefObject<HTMLDivElement>;
  "data-testid"?: string;
  description?: React.ReactNode;
  hasIcon?: boolean;
  heading?: React.ReactNode;
  onHide?: (reason: string) => void;
  status?: "success" | "error" | "warning" | "indeterminate";
}

const GeoToast: React.FC<GeoToastProps> = ({
  action,
  containerRef,
  "data-testid": dataTestId,
  description,
  hasIcon = true,
  heading,
  onHide,
  status = "success",
}) => {
  const { onHideFactory } = useContext(GeoPrivateToastContext);
  const handleHide = onHideFactory?.(onHide) ?? onHide;
  const iconStyle = useGeoIconStyle({ color: "inverted", isDisabled: false });

  return (
    <GeoBaseToast
      containerRef={containerRef}
      data-testid={dataTestId}
      status={status}
      xstyle={styles.root}
    >
      {hasIcon && (
        <div className={stylex(styles.icon, iconStyle)}>
          {status === "indeterminate" ? (
            <GeoSpinner shade="light" size="small" />
          ) : (
            <GeoStatusIcon color="inherit" status={status} />
          )}
        </div>
      )}
      <GeoTextPairing
        description={description}
        heading={heading}
        overflowWrap="break-word"
        size="value"
        xstyle={styles.textPairing}
      />
      <GeoFlexbox shrink={0} xstyle={cardEndAction}>
        <div className="xs83m0k x1c4vz4f x1f0l55g">{action}</div>
        <GeoCloseButton onClick={() => handleHide?.("layerCancelButton")} />
      </GeoFlexbox>
    </GeoBaseToast>
  );
};

GeoToast.displayName = `GeoToast`;

const styles = {
  root: { width: "x1iiql3v" },
  icon: {
    alignItems: "x6s0dn4",
    flexGrow: "x1c4vz4f",
    flexShrink: "x2lah0s",
    height: "xlup9mm",
  },
  textPairing: { flexGrow: "x1iyjqo2", flexShrink: "xs83m0k" },
};

export default makeGeoComponent("GeoToast", GeoToast);
