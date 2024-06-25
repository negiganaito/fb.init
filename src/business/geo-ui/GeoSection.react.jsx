// __d(
//   "GeoSection.react",
//   [
//     "GeoPrivateCardLayoutContext",
//     "GeoPrivateCardSectionContext",
//     "GeoPrivateLoggingRegion.react",
//     "GeoPrivateMakeComponent",
//     "GeoPrivateSectionStyleContext",
//     "emptyFunction",
//     "react",
//     "stylex",
//     "useGeoTheme",
//     "useMergeRefs",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i,
//       j = i || (i = d("react")),
//       k = i.useContext,
//       l = {
//         root: {
//           flexGrow: "x1iyjqo2",
//           flexShrink: "xs83m0k",
//           flexBasis: "xdl72j9",
//           height: "x3igimt",
//           maxHeight: "xedcshv",
//           minHeight: "x1t2pt76",
//           $$css: !0,
//         },
//         noBorder: {
//           borderTopWidth: "x972fbf",
//           borderEndWidth: "xcfux6l",
//           borderBottomWidth: "x1qhh985",
//           borderStartWidth: "xm0m39n",
//           $$css: !0,
//         },
//       };
//     function a(a) {
//       var b = a.children,
//         d = a.containerRef,
//         e = a["data-testid"];
//       e = a.variant;
//       var f = a.xstyle;
//       a = c("useGeoTheme")();
//       var g = a.selectBorderRadius,
//         i = a.selectSpacing;
//       a = a.selectStaticBackgroundColor;
//       var m = c("GeoPrivateCardLayoutContext").useLayoutContext(),
//         n = m[0];
//       m = m[1];
//       m = c("useMergeRefs")(m, d);
//       var o = k(c("GeoPrivateSectionStyleContext"));
//       d = k(c("GeoPrivateCardSectionContext"));
//       var p = e === "secondary",
//         q = [
//           i({
//             context: "container",
//             bounds: "internal",
//             relation: "component",
//           }),
//           e === "secondary" && a({ isMuted: !0, surface: "wash" }),
//           e === "secondary" && g({ context: "container" }),
//         ];
//       return j.jsx(c("GeoPrivateLoggingRegion.react"), {
//         inputRef: m,
//         isDependentRegion: d,
//         name: "GeoSection",
//         children: function (a) {
//           return j.jsx("div", {
//             className: (h || (h = c("stylex")))([
//               l.root,
//               f,
//               q,
//               n,
//               p && l.noBorder,
//               o,
//             ]),
//             "data-testid": void 0,
//             ref: a,
//             children: j.jsx(c("GeoPrivateCardLayoutContext").Provider, {
//               value: c("emptyFunction"),
//               children: b,
//             }),
//           });
//         },
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     b = d("GeoPrivateMakeComponent").makeGeoComponent("GeoSection", a);
//     g["default"] = b;
//   },
//   98
// );

import React, { useContext, ReactNode, Ref } from "react";
import GeoPrivateCardLayoutContext from "GeoPrivateCardLayoutContext";
import GeoPrivateCardSectionContext from "GeoPrivateCardSectionContext";
import GeoPrivateLoggingRegion from "GeoPrivateLoggingRegion.react";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import GeoPrivateSectionStyleContext from "GeoPrivateSectionStyleContext";
import emptyFunction from "emptyFunction";
import { stylex } from "stylex";
import useGeoTheme from "useGeoTheme";
import useMergeRefs from "useMergeRefs";

interface GeoSectionProps {
  children: ReactNode;
  containerRef?: Ref<HTMLDivElement>;
  "data-testid"?: string;
  variant?: "primary" | "secondary";
  xstyle?: any; // Adjust the type based on your styling solution
}

const styles = {
  root: {
    flexGrow: "x1iyjqo2",
    flexShrink: "xs83m0k",
    flexBasis: "xdl72j9",
    height: "x3igimt",
    maxHeight: "xedcshv",
    minHeight: "x1t2pt76",
  },
  noBorder: {
    borderTopWidth: "x972fbf",
    borderEndWidth: "xcfux6l",
    borderBottomWidth: "x1qhh985",
    borderStartWidth: "xm0m39n",
  },
};

const GeoSection: React.FC<GeoSectionProps> = ({
  children,
  containerRef,
  "data-testid": dataTestId,
  variant,
  xstyle,
}) => {
  const { selectBorderRadius, selectSpacing, selectStaticBackgroundColor } =
    useGeoTheme();
  const [layoutContext, setLayoutContext] = useContext(
    GeoPrivateCardLayoutContext
  );
  const sectionStyleContext = useContext(GeoPrivateSectionStyleContext);
  const cardSectionContext = useContext(GeoPrivateCardSectionContext);
  const mergedRefs = useMergeRefs(setLayoutContext, containerRef);

  const isSecondary = variant === "secondary";
  const stylesToApply = [
    selectSpacing({
      context: "container",
      bounds: "internal",
      relation: "component",
    }),
    isSecondary &&
      selectStaticBackgroundColor({ isMuted: true, surface: "wash" }),
    isSecondary && selectBorderRadius({ context: "container" }),
  ];

  return (
    <GeoPrivateLoggingRegion
      inputRef={mergedRefs}
      isDependentRegion={cardSectionContext}
      name="GeoSection"
    >
      {(ref) => (
        <div
          className={stylex([
            styles.root,
            xstyle,
            stylesToApply,
            layoutContext,
            isSecondary && styles.noBorder,
            sectionStyleContext,
          ])}
          data-testid={dataTestId}
          ref={ref}
        >
          <GeoPrivateCardLayoutContext.Provider value={emptyFunction}>
            {children}
          </GeoPrivateCardLayoutContext.Provider>
        </div>
      )}
    </GeoPrivateLoggingRegion>
  );
};

GeoSection.displayName = `${GeoSection.name} [from some-module-id]`;

const ExportedGeoSection = makeGeoComponent("GeoSection", GeoSection);
export default ExportedGeoSection;
