__d(
  "BusinessUnifiedScopingSelectorContainer.react",
  [
    "BusinessToolNameEnumUtils.facebook",
    "BusinessUnifiedScopingSelector.react",
    "BusinessUnifiedScopingSelectorQuery.graphql",
    "CometRelay",
    "RelayFBEnvironment",
    "nullthrows",
    "react",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || (h = d("react"));
    b = h;
    var j = b.useEffect,
      k = b.useState;
    function a(a) {
      var b = a.businessToolName,
        e = a.firstLevelScopeId,
        f = a.isCollapsed,
        g = a.onCollapsedChange,
        h = a.onlyShowFirstLevelScopes,
        l = a.zeroLevelScopeId;
      a = k();
      var m = a[0],
        n = a[1];
      j(
        function () {
          n(
            d("CometRelay").loadQuery(
              c("RelayFBEnvironment"),
              c("BusinessUnifiedScopingSelectorQuery.graphql"),
              {
                businessToolName: c("nullthrows")(
                  d("BusinessToolNameEnumUtils.facebook").fromJSEnum(b)
                ),
                firstLevelScopeId: e,
                zeroLevelScopeId: l,
              }
            )
          );
        },
        [b, e, l]
      );
      return i.jsx(d("CometRelay").RelayEnvironmentProvider, {
        environment: c("RelayFBEnvironment"),
        children:
          m &&
          i.jsx(c("BusinessUnifiedScopingSelector.react"), {
            businessToolName: b,
            isCollapsed: f,
            onCollapsedChange: g,
            onlyShowFirstLevelScopes: h,
            queryRef: m,
          }),
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);

import React, { useEffect, useState } from "react";
import { BusinessToolNameEnumUtils } from "BusinessToolNameEnumUtils.facebook";
import BusinessUnifiedScopingSelector from "BusinessUnifiedScopingSelector.react";
import { BusinessUnifiedScopingSelectorQuery } from "BusinessUnifiedScopingSelectorQuery.graphql";
import { loadQuery, RelayEnvironmentProvider } from "CometRelay";
import RelayFBEnvironment from "RelayFBEnvironment";
import nullthrows from "nullthrows";

interface Props {
  businessToolName: string;
  firstLevelScopeId: string;
  isCollapsed: boolean;
  onCollapsedChange?: (isCollapsed: boolean) => void;
  onlyShowFirstLevelScopes?: boolean;
  zeroLevelScopeId: string;
}

const BusinessUnifiedScopingSelectorContainer: React.FC<Props> = ({
  businessToolName,
  firstLevelScopeId,
  isCollapsed,
  onCollapsedChange,
  onlyShowFirstLevelScopes,
  zeroLevelScopeId,
}) => {
  const [queryRef, setQueryRef] = useState<any>();

  useEffect(() => {
    setQueryRef(
      loadQuery(RelayFBEnvironment, BusinessUnifiedScopingSelectorQuery, {
        businessToolName: nullthrows(
          BusinessToolNameEnumUtils.fromJSEnum(businessToolName)
        ),
        firstLevelScopeId,
        zeroLevelScopeId,
      })
    );
  }, [businessToolName, firstLevelScopeId, zeroLevelScopeId]);

  return (
    <RelayEnvironmentProvider environment={RelayFBEnvironment}>
      {queryRef && (
        <BusinessUnifiedScopingSelector
          businessToolName={businessToolName}
          isCollapsed={isCollapsed}
          onCollapsedChange={onCollapsedChange}
          onlyShowFirstLevelScopes={onlyShowFirstLevelScopes}
          queryRef={queryRef}
        />
      )}
    </RelayEnvironmentProvider>
  );
};

BusinessUnifiedScopingSelectorContainer.displayName = `${BusinessUnifiedScopingSelectorContainer.name} [from ${__filename}]`;

export default BusinessUnifiedScopingSelectorContainer;
