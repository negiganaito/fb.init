// __d(
//   "GeoCometRouterLinkProvider.react",
//   [
//     "AbstractSidebarRouterLinkContext",
//     "GeoLinkRouterType",
//     "GeoPrivateCometRouterLink.react",
//     "GeoPrivatePressableCometRouterLink.react",
//     "GeoPrivatePressableRouterLinkContext",
//     "GeoPrivateRouterLinkContext",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react")),
//       j = h.useCallback,
//       k = {
//         RouterLink: c("GeoPrivateCometRouterLink.react"),
//         type: c("GeoLinkRouterType").Comet,
//       };
//     function a(a) {
//       a = a.children;
//       return i.jsx(c("GeoPrivateRouterLinkContext").Provider, {
//         value: k,
//         children: i.jsx(c("GeoPrivatePressableRouterLinkContext").Provider, {
//           value: c("GeoPrivatePressableCometRouterLink.react"),
//           children: i.jsx(c("AbstractSidebarRouterLinkContext").Provider, {
//             value: l,
//             children: a,
//           }),
//         }),
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     function l(a) {
//       var b = a.className,
//         d = a.onBlur,
//         e = a.onClick,
//         f = a.onFocus,
//         g = a.style;
//       a = babelHelpers.objectWithoutPropertiesLoose(a, [
//         "className",
//         "onBlur",
//         "onClick",
//         "onFocus",
//         "style",
//       ]);
//       var h = j(
//           function (a) {
//             return void (d == null ? void 0 : d(a));
//           },
//           [d]
//         ),
//         k = j(
//           function (a) {
//             return void (e == null ? void 0 : e(a));
//           },
//           [e]
//         ),
//         l = j(
//           function (a) {
//             return void (f == null ? void 0 : f(a));
//           },
//           [f]
//         );
//       return i.jsx(
//         c("GeoPrivateCometRouterLink.react"),
//         babelHelpers["extends"]({}, a, {
//           className_DEPRECATED: b,
//           onBlur: h,
//           onClick: k,
//           onFocus: l,
//           style: (a = g) != null ? a : void 0,
//         })
//       );
//     }
//     l.displayName = l.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, { useCallback, ReactNode } from "react";
import { AbstractSidebarRouterLinkContext } from "AbstractSidebarRouterLinkContext";
import { GeoLinkRouterType } from "GeoLinkRouterType";
import GeoPrivateCometRouterLink from "GeoPrivateCometRouterLink.react";
import GeoPrivatePressableCometRouterLink from "GeoPrivatePressableCometRouterLink.react";
import { GeoPrivatePressableRouterLinkContext } from "GeoPrivatePressableRouterLinkContext";
import { GeoPrivateRouterLinkContext } from "GeoPrivateRouterLinkContext";

interface GeoCometRouterLinkProviderProps {
  children: ReactNode;
}

const contextValue = {
  RouterLink: GeoPrivateCometRouterLink,
  type: GeoLinkRouterType.Comet,
};

function GeoCometRouterLinkProvider({
  children,
}: GeoCometRouterLinkProviderProps) {
  return (
    <GeoPrivateRouterLinkContext.Provider value={contextValue}>
      <GeoPrivatePressableRouterLinkContext.Provider
        value={GeoPrivatePressableCometRouterLink}
      >
        <AbstractSidebarRouterLinkContext.Provider value={handleLinkProps}>
          {children}
        </AbstractSidebarRouterLinkContext.Provider>
      </GeoPrivatePressableRouterLinkContext.Provider>
    </GeoPrivateRouterLinkContext.Provider>
  );
}

GeoCometRouterLinkProvider.displayName = `${GeoCometRouterLinkProvider.name}`;

interface LinkProps {
  className?: string;
  onBlur?: (event: React.FocusEvent<HTMLAnchorElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<HTMLAnchorElement>) => void;
  style?: React.CSSProperties;
  [key: string]: any;
}

function handleLinkProps(props: LinkProps) {
  const { className, onBlur, onClick, onFocus, style, ...restProps } = props;

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLAnchorElement>) => {
      if (onBlur) onBlur(event);
    },
    [onBlur]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (onClick) onClick(event);
    },
    [onClick]
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLAnchorElement>) => {
      if (onFocus) onFocus(event);
    },
    [onFocus]
  );

  return (
    <GeoPrivateCometRouterLink
      {...restProps}
      className_DEPRECATED={className}
      onBlur={handleBlur}
      onClick={handleClick}
      onFocus={handleFocus}
      style={style}
    />
  );
}

handleLinkProps.displayName = `${handleLinkProps.name}`;

export default GeoCometRouterLinkProvider;
