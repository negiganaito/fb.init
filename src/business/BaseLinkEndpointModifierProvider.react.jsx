// __d(
//   "BaseLinkEndpointModifierProvider.react",
//   ["BaseLinkEndpointModifierContext", "react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react"));
//     b = h;
//     var j = b.useContext,
//       k = b.useMemo;
//     function a(a) {
//       var b = a.children,
//         d = a.modifier,
//         e = j(c("BaseLinkEndpointModifierContext"));
//       a = k(
//         function () {
//           return [].concat(e, [d]);
//         },
//         [e, d]
//       );
//       return i.jsx(c("BaseLinkEndpointModifierContext").Provider, {
//         value: a,
//         children: b,
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, { useContext, useMemo, ReactNode } from "react";
import { BaseLinkEndpointModifierContext } from "BaseLinkEndpointModifierContext";

interface BaseLinkEndpointModifierProviderProps {
  children: ReactNode;
  modifier: (url: string) => string;
}

const BaseLinkEndpointModifierProvider: React.FC<
  BaseLinkEndpointModifierProviderProps
> = ({ children, modifier }) => {
  const contextModifiers = useContext(BaseLinkEndpointModifierContext);

  const value = useMemo(() => {
    return [...contextModifiers, modifier];
  }, [contextModifiers, modifier]);

  return (
    <BaseLinkEndpointModifierContext.Provider value={value}>
      {children}
    </BaseLinkEndpointModifierContext.Provider>
  );
};

BaseLinkEndpointModifierProvider.displayName = `${BaseLinkEndpointModifierProvider.name} [from ${module.id}]`;

export default BaseLinkEndpointModifierProvider;
