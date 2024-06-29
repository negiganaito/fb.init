// __d(
//   "BizKitSidebarNavigation.react",
//   [
//     "AbstractSidebarNavigation.react",
//     "BizKitErrorBoundary.react",
//     "BizKitStyles",
//     "GeoScrollableArea.react",
//     "emptyFunction",
//     "react",
//     "sidebarNavigationStyles",
//     "stylex",
//     "useGeoTheme",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i,
//       j = i || d("react"),
//       k = {
//         root: {
//           backgroundColor: "x1liytr5",
//           boxSizing: "x9f619",
//           display: "x78zum5",
//           flexDirection: "xdt5ytf",
//           height: "x5yr21d",
//           $$css: !0,
//         },
//         fullHeight: { height: "x5yr21d", $$css: !0 },
//         foaBorder: { "::before_height": "xq1wtrk", $$css: !0 },
//       };
//     function a(a) {
//       var b = a.children,
//         e = a.footer,
//         f = a.header,
//         g = a.isCollapsed;
//       a = a.value;
//       var i = d("sidebarNavigationStyles").useSidebarContainerStyles(!1, g);
//       i = babelHelpers["extends"]({}, i, {
//         transition: "width var(--fds-fast) var(--fds-soft)",
//         width: g
//           ? c("BizKitStyles").GLOBAL_NAV_COLLAPSED_WIDTH_PX
//           : c("BizKitStyles").GLOBAL_NAV_EXPANDED_WIDTH_PX,
//       });
//       var l = c("useGeoTheme")();
//       l = l.selectElevation;
//       return j.jsx(c("AbstractSidebarNavigation.react"), {
//         className: (h || (h = c("stylex")))(
//           k.root,
//           l({ level: 1, useFOAShadow: !0 }),
//           k.foaBorder
//         ),
//         footer: j.jsx("div", {
//           className: "x2lah0s x6ikm8r x10wlt62",
//           children: e,
//         }),
//         header: j.jsx("div", {
//           className: "x2lah0s x6ikm8r x10wlt62",
//           children: f,
//         }),
//         onChange: c("emptyFunction"),
//         isCollapsed: g,
//         style: i,
//         value: a,
//         children: j.jsx("div", {
//           className: "xs83m0k x1iyjqo2 x6ikm8r x10wlt62",
//           children: j.jsx(c("GeoScrollableArea.react"), {
//             xstyle: k.fullHeight,
//             direction: "vertical",
//             children: j.jsx(c("BizKitErrorBoundary.react"), {
//               fallback: null,
//               children: b,
//             }),
//           }),
//         }),
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

// BizKitSidebarNavigation.react.tsx

import AbstractSidebarNavigation from "AbstractSidebarNavigation.react";
import BizKitErrorBoundary from "BizKitErrorBoundary.react";
import {
  GLOBAL_NAV_COLLAPSED_WIDTH_PX,
  GLOBAL_NAV_EXPANDED_WIDTH_PX,
} from "BizKitStyles";
import GeoScrollableArea from "GeoScrollableArea.react";
import emptyFunction from "emptyFunction";
import React from "react";
import { useSidebarContainerStyles } from "sidebarNavigationStyles";
import { stylex } from "stylex";
import { useGeoTheme } from "useGeoTheme";

type BizKitSidebarNavigationProps = {
  children: React.ReactNode;
  footer: React.ReactNode;
  header: React.ReactNode;
  isCollapsed: boolean;
  value: any;
};

const styles = {
  root: {
    backgroundColor: "x1liytr5",
    boxSizing: "x9f619",
    display: "x78zum5",
    flexDirection: "xdt5ytf",
    height: "x5yr21d",
    $$css: true,
  },
  fullHeight: {
    height: "x5yr21d",
    $$css: true,
  },
  foaBorder: {
    "::before_height": "xq1wtrk",
    $$css: true,
  },
};

const BizKitSidebarNavigation: React.FC<BizKitSidebarNavigationProps> = ({
  children,
  footer,
  header,
  isCollapsed,
  value,
}) => {
  const sidebarStyles = useSidebarContainerStyles(false, isCollapsed);
  const combinedStyles = {
    ...sidebarStyles,
    transition: "width var(--fds-fast) var(--fds-soft)",
    width: isCollapsed
      ? GLOBAL_NAV_COLLAPSED_WIDTH_PX
      : GLOBAL_NAV_EXPANDED_WIDTH_PX,
  };

  const geoTheme = useGeoTheme();
  const selectElevation = geoTheme.selectElevation;

  return (
    <AbstractSidebarNavigation
      className={stylex(
        styles.root,
        selectElevation({ level: 1, useFOAShadow: true }),
        styles.foaBorder
      )}
      footer={<div className="x2lah0s x6ikm8r x10wlt62">{footer}</div>}
      header={<div className="x2lah0s x6ikm8r x10wlt62">{header}</div>}
      onChange={emptyFunction}
      isCollapsed={isCollapsed}
      style={combinedStyles}
      value={value}
    >
      <div className="xs83m0k x1iyjqo2 x6ikm8r x10wlt62">
        <GeoScrollableArea xstyle={styles.fullHeight} direction="vertical">
          <BizKitErrorBoundary fallback={null}>{children}</BizKitErrorBoundary>
        </GeoScrollableArea>
      </div>
    </AbstractSidebarNavigation>
  );
};

BizKitSidebarNavigation.displayName = `${BizKitSidebarNavigation.name} [from ${module.id}]`;

export default BizKitSidebarNavigation;
