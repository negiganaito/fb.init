__d(
  "BizKitSharedProviders.react",
  [
    "BUIGeodesicThemeProvider.react",
    "BizKitRelayEnvironmentProvider.react",
    "react",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react");
    function a(a) {
      a = a.children;
      return i.jsx(c("BizKitRelayEnvironmentProvider.react"), {
        children: i.jsx(c("BUIGeodesicThemeProvider.react"), { children: a }),
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);

import React, { ReactNode } from "react";
import BUIGeodesicThemeProvider from "BUIGeodesicThemeProvider.react";
import BizKitRelayEnvironmentProvider from "BizKitRelayEnvironmentProvider.react";

interface Props {
  children: ReactNode;
}

const BizKitSharedProviders: React.FC<Props> = ({ children }) => {
  return (
    <BizKitRelayEnvironmentProvider>
      <BUIGeodesicThemeProvider>{children}</BUIGeodesicThemeProvider>
    </BizKitRelayEnvironmentProvider>
  );
};

BizKitSharedProviders.displayName = `${BizKitSharedProviders.name} [from ${__filename}]`;

export default BizKitSharedProviders;
