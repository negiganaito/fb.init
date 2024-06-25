// __d(
//   "GeoPrivatePressableCometRouterLink.react",
//   [
//     "WebPressable.react",
//     "react",
//     "useGeoPrivateCometRouterLink",
//     "useGeoPrivatePressableSSRSafeProps",
//     "useMergeRefs",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || d("react");
//     function a(a) {
//       a = c("useGeoPrivatePressableSSRSafeProps")(a);
//       var b = a.forwardedRef,
//         d = a.link,
//         e = a.onContextMenu,
//         f = a.onHoverEnd,
//         g = a.onHoverStart,
//         h = a.onPress,
//         j = a.onPressStart;
//       a.preventDefault;
//       var k = a.suppressHydrationWarning;
//       a = babelHelpers.objectWithoutPropertiesLoose(a, [
//         "forwardedRef",
//         "link",
//         "onContextMenu",
//         "onHoverEnd",
//         "onHoverStart",
//         "onPress",
//         "onPressStart",
//         "preventDefault",
//         "suppressHydrationWarning",
//       ]);
//       d = (d = d) != null ? d : {};
//       var l = d.download,
//         m = d.rel,
//         n = d.target;
//       d = d.url;
//       d = c("useGeoPrivateCometRouterLink")({
//         href: d,
//         onContextMenu: e,
//         onHoverEnd: f,
//         onHoverStart: g,
//         onPress: h,
//         onPressStart: j,
//         rel: m,
//         target: n,
//       });
//       e = d.linkRef;
//       f = d.linkUrl;
//       g = d.onContextMenu;
//       h = d.onHoverEnd;
//       j = d.onHoverStart;
//       m = d.onPress;
//       n = d.onPressStart;
//       var o = d.preventDefault,
//         p = d.rel,
//         q = d.suppressHydrationWarning;
//       d = d.target;
//       b = c("useMergeRefs")(b, e);
//       l =
//         f != null
//           ? { download: l, rel: p, target: d, url: (e = f) != null ? e : "#" }
//           : void 0;
//       return i.jsx(
//         c("WebPressable.react"),
//         babelHelpers["extends"]({}, a, {
//           forwardedRef: b,
//           link: l,
//           onContextMenu: g,
//           onHoverEnd: h,
//           onHoverStart: j,
//           onPress: m,
//           onPressStart: n,
//           preventDefault: o,
//           suppressHydrationWarning: (p = k) != null ? p : q,
//         })
//       );
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React from "react";
import WebPressable from "WebPressable.react";
import { useGeoPrivateCometRouterLink } from "useGeoPrivateCometRouterLink";
import { useGeoPrivatePressableSSRSafeProps } from "useGeoPrivatePressableSSRSafeProps";
import { useMergeRefs } from "useMergeRefs";

interface GeoPrivatePressableCometRouterLinkProps {
  forwardedRef?: React.Ref<any>;
  link?: {
    download?: string;
    rel?: string;
    target?: string;
    url?: string;
  };
  onContextMenu?: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  onHoverEnd?: () => void;
  onHoverStart?: () => void;
  onPress?: () => void;
  onPressStart?: () => void;
  preventDefault?: boolean;
  suppressHydrationWarning?: boolean;
  [key: string]: any;
}

const GeoPrivatePressableCometRouterLink: React.FC<
  GeoPrivatePressableCometRouterLinkProps
> = (props) => {
  const {
    forwardedRef,
    link,
    onContextMenu,
    onHoverEnd,
    onHoverStart,
    onPress,
    onPressStart,
    preventDefault,
    suppressHydrationWarning,
    ...restProps
  } = useGeoPrivatePressableSSRSafeProps(props);

  const routerLinkProps = useGeoPrivateCometRouterLink({
    href: link?.url,
    onContextMenu,
    onHoverEnd,
    onHoverStart,
    onPress,
    onPressStart,
    rel: link?.rel,
    target: link?.target,
  });

  const mergedRef = useMergeRefs(forwardedRef, routerLinkProps.linkRef);

  const finalLink = routerLinkProps.linkUrl
    ? {
        download: link?.download,
        rel: routerLinkProps.rel,
        target: routerLinkProps.target,
        url: routerLinkProps.linkUrl || "#",
      }
    : undefined;

  return (
    <WebPressable
      {...restProps}
      forwardedRef={mergedRef}
      link={finalLink}
      onContextMenu={routerLinkProps.onContextMenu}
      onHoverEnd={routerLinkProps.onHoverEnd}
      onHoverStart={routerLinkProps.onHoverStart}
      onPress={routerLinkProps.onPress}
      onPressStart={routerLinkProps.onPressStart}
      preventDefault={routerLinkProps.preventDefault}
      suppressHydrationWarning={
        suppressHydrationWarning ?? routerLinkProps.suppressHydrationWarning
      }
    />
  );
};

GeoPrivatePressableCometRouterLink.displayName = `${GeoPrivatePressableCometRouterLink.name}`;

export default GeoPrivatePressableCometRouterLink;
