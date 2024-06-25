// __d(
//   "GeoPrivateBaseListRowLayout.react",
//   [
//     "ix",
//     "BUIPrivateBoldItemLabelContext",
//     "GeoBaseAccessibleElement.react",
//     "GeoBaseListLayoutContext",
//     "GeoBaseListRowContext",
//     "GeoBaseSpacingLayout.react",
//     "GeoBaseText.react",
//     "GeoFlexbox.react",
//     "GeoHStack.react",
//     "GeoPrivateBaseListMediaBackgroundContext",
//     "GeoPrivateFBIconOrImageish.react",
//     "GeoPrivateMakeComponent",
//     "GeoPrivateMediaItemSurfaceContext",
//     "Image.react",
//     "geoMargin",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g, h) {
//     "use strict";
//     var i,
//       j = i || (i = d("react")),
//       k = i.useContext,
//       l = { isNested: !0 };
//     function a(a) {
//       var b = a.align,
//         d = a.badge,
//         e = a.control,
//         f = a.description,
//         g = a.descriptionID,
//         h = a.endContent,
//         i = a.isDisabled;
//       i = i === void 0 ? !1 : i;
//       var p = a.isLabelHidden;
//       p = p === void 0 ? !1 : p;
//       var q = a.label,
//         r = a.labelID,
//         s = a.media,
//         t = a.showHandle;
//       t = t === void 0 ? !1 : t;
//       var u = a.statusIndicator,
//         v = a.trailingContent;
//       a = a.truncate;
//       var w = k(c("GeoBaseListLayoutContext"));
//       w = w.direction;
//       var x = k(c("BUIPrivateBoldItemLabelContext"));
//       x = x && f != null ? "bold" : null;
//       w = w === "vertical" ? "fill" : "auto";
//       var y = d != null || h != null,
//         z = a === "label" || a === "both",
//         A = a === "description" || a === "both",
//         B = k(c("GeoPrivateBaseListMediaBackgroundContext"));
//       B = B ? void 0 : "none";
//       return j.jsxs(c("GeoBaseListRowContext").Provider, {
//         value: l,
//         children: [
//           t && j.jsx(n, {}),
//           (e != null || s != null || u != null) &&
//             j.jsx(c("GeoPrivateMediaItemSurfaceContext").Provider, {
//               value: B,
//               children: j.jsxs(m, {
//                 align: b,
//                 children: [
//                   e,
//                   s != null
//                     ? j.jsx(c("GeoPrivateFBIconOrImageish.react"), {
//                         icon: s,
//                         xstyle: o.media,
//                       })
//                     : null,
//                   u,
//                 ],
//               }),
//             }),
//           j.jsxs(c("GeoBaseAccessibleElement.react"), {
//             isHidden: p,
//             xstyle: [
//               o.accessibleEl,
//               y && o.shrinkForEndContent,
//               a != null && o.truncate,
//               w === "auto" && o.fit,
//               f != null && e != null && s == null
//                 ? o.descriptionCompensation
//                 : null,
//               s !== null && o.alignSelfCenter,
//             ],
//             children: [
//               j.jsxs(c("GeoHStack.react"), {
//                 alignItems: "center",
//                 context: "component",
//                 relation: "related",
//                 xstyle: o.headingWrapper,
//                 children: [
//                   j.jsx(c("GeoBaseText.react"), {
//                     color: "value",
//                     display: z ? "truncate" : "block",
//                     id: r,
//                     isDisabled: i,
//                     overflowWrap: "break-word",
//                     size: "value",
//                     weight: x,
//                     xstyle: v == null ? o.heading : void 0,
//                     children: q,
//                   }),
//                   v != null &&
//                     j.jsx(c("GeoFlexbox.react"), {
//                       xstyle: [o.trailingContent, c("geoMargin").end4],
//                       children: v,
//                     }),
//                 ],
//               }),
//               f != null &&
//                 j.jsx(c("GeoBaseText.react"), {
//                   color: "heading",
//                   display: A ? "truncate" : "block",
//                   id: g,
//                   isDisabled: i,
//                   overflowWrap: "break-word",
//                   size: "valueDescription",
//                   children: f,
//                 }),
//             ],
//           }),
//           d != null && j.jsx("div", { className: "x2lah0s", children: d }),
//           h != null &&
//             j.jsx(c("GeoBaseSpacingLayout.react"), {
//               grow: "auto",
//               children: h,
//             }),
//         ],
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     function m(a) {
//       var b = a.align,
//         d = a.children;
//       a = a.xstyle;
//       return j.jsx(c("GeoBaseSpacingLayout.react"), {
//         grow: "auto",
//         xstyle: [o.addOnContainer, b === "center" && o.alignSelfCenter, a],
//         children: d,
//       });
//     }
//     m.displayName = m.name + " [from " + f.id + "]";
//     function n() {
//       return j.jsx(c("GeoBaseSpacingLayout.react"), {
//         grow: "auto",
//         children: j.jsx(c("Image.react"), { src: h("1213581") }),
//       });
//     }
//     n.displayName = n.name + " [from " + f.id + "]";
//     var o = {
//       addOnContainer: {
//         alignSelf: "xqcrz7y",
//         flexShrink: "x2lah0s",
//         $$css: !0,
//       },
//       alignSelfCenter: { alignSelf: "xamitd3", $$css: !0 },
//       media: { flexShrink: "x2lah0s", $$css: !0 },
//       descriptionCompensation: { marginTop: "xr9ek0c", $$css: !0 },
//       fit: { flexGrow: "x1c4vz4f", $$css: !0 },
//       accessibleEl: { flexGrow: "x1iyjqo2", $$css: !0 },
//       headingWrapper: { display: "x78zum5", minWidth: "xeuugli", $$css: !0 },
//       heading: { flexGrow: "x1iyjqo2", $$css: !0 },
//       trailingContent: {
//         flexGrow: "x1iyjqo2",
//         flexShrink: "x2lah0s",
//         $$css: !0,
//       },
//       shrinkForEndContent: { flexBasis: "x1r8uery", $$css: !0 },
//       truncate: { overflowX: "x6ikm8r", overflowY: "x10wlt62", $$css: !0 },
//     };
//     b = d("GeoPrivateMakeComponent").makeGeoComponent(
//       "GeoPrivateBaseListRowLayout",
//       a
//     );
//     g["default"] = b;
//   },
//   98
// );

import { ix } from "ix";
import React, { useContext } from "react";
import BUIPrivateBoldItemLabelContext from "BUIPrivateBoldItemLabelContext";
import GeoBaseAccessibleElement from "GeoBaseAccessibleElement.react";
import GeoBaseListLayoutContext from "GeoBaseListLayoutContext";
import GeoBaseListRowContext from "GeoBaseListRowContext";
import GeoBaseSpacingLayout from "GeoBaseSpacingLayout.react";
import GeoBaseText from "GeoBaseText.react";
import GeoFlexbox from "GeoFlexbox.react";
import GeoHStack from "GeoHStack.react";
import GeoPrivateBaseListMediaBackgroundContext from "GeoPrivateBaseListMediaBackgroundContext";
import GeoPrivateFBIconOrImageish from "GeoPrivateFBIconOrImageish.react";
import GeoPrivateMakeComponent from "GeoPrivateMakeComponent";
import GeoPrivateMediaItemSurfaceContext from "GeoPrivateMediaItemSurfaceContext";
import Image from "Image.react";
import geoMargin from "geoMargin";

interface GeoPrivateBaseListRowLayoutProps {
  align?: string;
  badge?: React.ReactNode;
  control?: React.ReactNode;
  description?: string;
  descriptionID?: string;
  endContent?: React.ReactNode;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  label?: string;
  labelID?: string;
  media?: React.ReactNode;
  showHandle?: boolean;
  statusIndicator?: React.ReactNode;
  trailingContent?: React.ReactNode;
  truncate?: "label" | "both" | "description";
}

const GeoPrivateBaseListRowLayout: React.FC<
  GeoPrivateBaseListRowLayoutProps
> = ({
  align,
  badge,
  control,
  description,
  descriptionID,
  endContent,
  isDisabled = false,
  isLabelHidden = false,
  label,
  labelID,
  media,
  showHandle = false,
  statusIndicator,
  trailingContent,
  truncate,
}) => {
  const layoutContext = useContext(GeoBaseListLayoutContext);
  const direction = layoutContext.direction;
  const boldItemLabelContext = useContext(BUIPrivateBoldItemLabelContext);
  const weight = boldItemLabelContext && description != null ? "bold" : null;
  const fitType = direction === "vertical" ? "fill" : "auto";
  const hasEndContent = badge != null || endContent != null;
  const truncateLabel = truncate === "label" || truncate === "both";
  const truncateDescription = truncate === "description" || truncate === "both";
  const mediaBackgroundContext = useContext(
    GeoPrivateBaseListMediaBackgroundContext
  );
  const mediaBackground = mediaBackgroundContext ? undefined : "none";

  return (
    <GeoBaseListRowContext.Provider value={{ isNested: true }}>
      {showHandle && <Handle />}
      {(control != null || media != null || statusIndicator != null) && (
        <GeoPrivateMediaItemSurfaceContext.Provider value={mediaBackground}>
          <Media align={align}>
            {control}
            {media != null && (
              <GeoPrivateFBIconOrImageish icon={media} xstyle={styles.media} />
            )}
            {statusIndicator}
          </Media>
        </GeoPrivateMediaItemSurfaceContext.Provider>
      )}
      <GeoBaseAccessibleElement
        isHidden={isLabelHidden}
        xstyle={[
          styles.accessibleEl,
          hasEndContent && styles.shrinkForEndContent,
          truncate != null && styles.truncate,
          fitType === "auto" && styles.fit,
          description != null && control != null && media == null
            ? styles.descriptionCompensation
            : null,
          media !== null && styles.alignSelfCenter,
        ]}
      >
        <GeoHStack
          alignItems="center"
          context="component"
          relation="related"
          xstyle={styles.headingWrapper}
        >
          <GeoBaseText
            color="value"
            display={truncateLabel ? "truncate" : "block"}
            id={labelID}
            isDisabled={isDisabled}
            overflowWrap="break-word"
            size="value"
            weight={weight}
            xstyle={trailingContent == null ? styles.heading : undefined}
          >
            {label}
          </GeoBaseText>
          {trailingContent != null && (
            <GeoFlexbox xstyle={[styles.trailingContent, geoMargin.end4]}>
              {trailingContent}
            </GeoFlexbox>
          )}
        </GeoHStack>
        {description != null && (
          <GeoBaseText
            color="heading"
            display={truncateDescription ? "truncate" : "block"}
            id={descriptionID}
            isDisabled={isDisabled}
            overflowWrap="break-word"
            size="valueDescription"
          >
            {description}
          </GeoBaseText>
        )}
      </GeoBaseAccessibleElement>
      {badge != null && <div className="x2lah0s">{badge}</div>}
      {endContent != null && (
        <GeoBaseSpacingLayout grow="auto">{endContent}</GeoBaseSpacingLayout>
      )}
    </GeoBaseListRowContext.Provider>
  );
};

GeoPrivateBaseListRowLayout.displayName = "GeoPrivateBaseListRowLayout";

const Media: React.FC<{
  align?: string;
  children: React.ReactNode;
  xstyle?: object;
}> = ({ align, children, xstyle }) => {
  return (
    <GeoBaseSpacingLayout
      grow="auto"
      xstyle={[
        styles.addOnContainer,
        align === "center" && styles.alignSelfCenter,
        xstyle,
      ]}
    >
      {children}
    </GeoBaseSpacingLayout>
  );
};

Media.displayName = "Media";

const Handle: React.FC = () => {
  return (
    <GeoBaseSpacingLayout grow="auto">
      <Image src={ix("1213581")} />
    </GeoBaseSpacingLayout>
  );
};

Handle.displayName = "Handle";

const styles = {
  addOnContainer: {
    alignSelf: "xqcrz7y",
    flexShrink: "x2lah0s",
    $$css: true,
  },
  alignSelfCenter: { alignSelf: "xamitd3", $$css: true },
  media: { flexShrink: "x2lah0s", $$css: true },
  descriptionCompensation: { marginTop: "xr9ek0c", $$css: true },
  fit: { flexGrow: "x1c4vz4f", $$css: true },
  accessibleEl: { flexGrow: "x1iyjqo2", $$css: true },
  headingWrapper: { display: "x78zum5", minWidth: "xeuugli", $$css: true },
  heading: { flexGrow: "x1iyjqo2", $$css: true },
  trailingContent: {
    flexGrow: "x1iyjqo2",
    flexShrink: "x2lah0s",
    $$css: true,
  },
  shrinkForEndContent: { flexBasis: "x1r8uery", $$css: true },
  truncate: { overflowX: "x6ikm8r", overflowY: "x10wlt62", $$css: true },
};

export default GeoPrivateMakeComponent.makeGeoComponent(
  "GeoPrivateBaseListRowLayout",
  GeoPrivateBaseListRowLayout
);
