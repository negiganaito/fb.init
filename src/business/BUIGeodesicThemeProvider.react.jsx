__d(
  "BUIGeodesicThemeProvider.react",
  ["BUIPrivateThemeAtomsGeodesic", "BUIPrivateThemeContext.react", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react");
    function a(a) {
      a = a.children;
      return i.jsx(c("BUIPrivateThemeContext.react").Provider, {
        value: c("BUIPrivateThemeAtomsGeodesic"),
        children: a,
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);

import React, { ReactNode } from "react";
import BUIPrivateThemeAtomsGeodesic from "BUIPrivateThemeAtomsGeodesic";
import { Provider as BUIPrivateThemeContextProvider } from "BUIPrivateThemeContext.react";

interface Props {
  children: ReactNode;
}

const BUIGeodesicThemeProvider: React.FC<Props> = ({ children }) => {
  return (
    <BUIPrivateThemeContextProvider value={BUIPrivateThemeAtomsGeodesic}>
      {children}
    </BUIPrivateThemeContextProvider>
  );
};

BUIGeodesicThemeProvider.displayName = `${BUIGeodesicThemeProvider.name} [from ${__filename}]`;

export default BUIGeodesicThemeProvider;
