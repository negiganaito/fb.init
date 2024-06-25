// __d(
//   "GeoPrivateCometRouterLink.react",
//   [
//     "GeoPrivatePressableCometRouterLink.react",
//     "react",
//     "useMergeRefs",
//     "useRefEffect",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || d("react"),
//       j = { inline: { display: "xt0psk2", $$css: !0 } };
//     function a(a) {
//       var b = a["aria-describedby"],
//         d = a["aria-expanded"],
//         e = a["aria-label"],
//         f = a["aria-labelledby"],
//         g = a["data-testid"],
//         h = a.children,
//         k = a.className_DEPRECATED,
//         l = a.href,
//         m = a.linkRef,
//         n = a.onBlur,
//         o = a.onClick,
//         p = a.onFocus,
//         q = a.onMouseEnter,
//         r = a.onMouseLeave,
//         s = a.rel,
//         t = a.role;
//       t = t === void 0 ? "link" : t;
//       var u = a.style,
//         v = a.suppressHydrationWarning,
//         w = a.tabIndex,
//         x = a.target;
//       a = a.xstyle;
//       var y = c("useRefEffect")(
//         function (a) {
//           q != null && a.addEventListener("mouseenter", q);
//           r != null && a.addEventListener("mouseleave", r);
//           return function () {
//             q != null && a.removeEventListener("mouseenter", q),
//               r != null && a.removeEventListener("mouseleave", r);
//           };
//         },
//         [q, r]
//       );
//       m = c("useMergeRefs")(m, y);
//       y = l != null ? String(l) : null;
//       l = y != null ? { rel: s, target: x, url: y } : void 0;
//       return i.jsx(c("GeoPrivatePressableCometRouterLink.react"), {
//         accessibilityLabel: e,
//         accessibilityRelationship: { describedby: b, labelledby: f },
//         accessibilityRole: t,
//         accessibilityState: { expanded: d },
//         className_DEPRECATED: k,
//         forwardedRef: m,
//         link: l,
//         onBlur: n,
//         onFocus: p,
//         onPress: o,
//         style: u,
//         suppressHydrationWarning: v,
//         tabbable: w != null ? w !== -1 : void 0,
//         testID: g,
//         xstyle: [j.inline, a],
//         children: h,
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, { ReactNode } from "react";
import GeoPrivatePressableCometRouterLink from "GeoPrivatePressableCometRouterLink.react";
import { useMergeRefs } from "useMergeRefs";
import { useRefEffect } from "useRefEffect";

interface GeoPrivateCometRouterLinkProps {
  "aria-describedby"?: string;
  "aria-expanded"?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "data-testid"?: string;
  children: ReactNode;
  className_DEPRECATED?: string;
  href?: string;
  linkRef?: React.Ref<HTMLAnchorElement>;
  onBlur?: (event: React.FocusEvent<HTMLAnchorElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<HTMLAnchorElement>) => void;
  onMouseEnter?: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  onMouseLeave?: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  rel?: string;
  role?: string;
  style?: React.CSSProperties;
  suppressHydrationWarning?: boolean;
  tabIndex?: number;
  target?: string;
  xstyle?: any;
}

const inlineStyle = { display: "xt0psk2", $$css: true };

const GeoPrivateCometRouterLink: React.FC<GeoPrivateCometRouterLinkProps> = ({
  "aria-describedby": ariaDescribedby,
  "aria-expanded": ariaExpanded,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "data-testid": dataTestid,
  children,
  className_DEPRECATED,
  href,
  linkRef,
  onBlur,
  onClick,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  rel,
  role = "link",
  style,
  suppressHydrationWarning,
  tabIndex,
  target,
  xstyle,
}) => {
  const refEffect = useRefEffect(
    (node: HTMLElement) => {
      if (onMouseEnter) node.addEventListener("mouseenter", onMouseEnter);
      if (onMouseLeave) node.addEventListener("mouseleave", onMouseLeave);

      return () => {
        if (onMouseEnter) node.removeEventListener("mouseenter", onMouseEnter);
        if (onMouseLeave) node.removeEventListener("mouseleave", onMouseLeave);
      };
    },
    [onMouseEnter, onMouseLeave]
  );

  const mergedRef = useMergeRefs(linkRef, refEffect);
  const linkUrl = href ? String(href) : null;
  const link = linkUrl ? { rel, target, url: linkUrl } : undefined;

  return (
    <GeoPrivatePressableCometRouterLink
      accessibilityLabel={ariaLabel}
      accessibilityRelationship={{
        describedby: ariaDescribedby,
        labelledby: ariaLabelledby,
      }}
      accessibilityRole={role}
      accessibilityState={{ expanded: ariaExpanded }}
      className_DEPRECATED={className_DEPRECATED}
      forwardedRef={mergedRef}
      link={link}
      onBlur={onBlur}
      onFocus={onFocus}
      onPress={onClick}
      style={style}
      suppressHydrationWarning={suppressHydrationWarning}
      tabbable={tabIndex !== undefined ? tabIndex !== -1 : undefined}
      testID={dataTestid}
      xstyle={[inlineStyle, xstyle]}
    >
      {children}
    </GeoPrivatePressableCometRouterLink>
  );
};

GeoPrivateCometRouterLink.displayName = `${GeoPrivateCometRouterLink.name}`;

export default GeoPrivateCometRouterLink;
