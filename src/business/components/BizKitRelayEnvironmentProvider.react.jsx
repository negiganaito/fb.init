__d(
  "BizKitRelayEnvironmentProvider.react",
  [
    "Actor",
    "BizKitRelayEnvironmentFactory",
    "BizKitRouteContext",
    "CurrentUser",
    "RelayHooks",
    "react",
    "useBizKitPageNullable",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || (h = d("react")),
      j = h.useContext;
    function a(a) {
      var b = a.alwaysUseUserVC;
      b = b === void 0 ? !1 : b;
      a = a.children;
      var e = c("useBizKitPageNullable")(),
        f = j(c("BizKitRouteContext"));
      f = f.useActorFromActorProvider;
      var g = d("Actor").useActor();
      g = g[0];
      f = c("BizKitRelayEnvironmentFactory").getForActorID(
        f === !0 ? g : !b && e != null ? e : c("CurrentUser").getAccountID()
      );
      return i.jsx(d("RelayHooks").RelayEnvironmentProvider, {
        environment: f,
        children: a,
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);

import { Actor } from "Actor";
import BizKitRelayEnvironmentFactory from "BizKitRelayEnvironmentFactory";
import BizKitRouteContext from "BizKitRouteContext";
import { CurrentUser } from "CurrentUser";
import { RelayEnvironmentProvider } from "RelayHooks";
import React, { useContext } from "react";
import useBizKitPageNullable from "useBizKitPageNullable";

interface Props {
  alwaysUseUserVC?: boolean;
  children: React.ReactNode;
}

const BizKitRelayEnvironmentProvider: React.FC<Props> = ({
  alwaysUseUserVC = false,
  children,
}) => {
  const bizKitPage = useBizKitPageNullable();
  const routeContext = useContext(BizKitRouteContext);
  const useActorFromActorProvider = routeContext.useActorFromActorProvider;
  const [actor] = Actor.useActor();
  const environment = BizKitRelayEnvironmentFactory.getForActorID(
    useActorFromActorProvider === true
      ? actor
      : !alwaysUseUserVC && bizKitPage != null
      ? bizKitPage
      : CurrentUser.getAccountID()
  );

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
};

BizKitRelayEnvironmentProvider.displayName = `${BizKitRelayEnvironmentProvider.name} [from ${__filename}]`;

export default BizKitRelayEnvironmentProvider;
