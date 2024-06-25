__d(
  "useLogBizKitNavItem",
  [
    "BizKitAllToolsSearchContext",
    "BizKitOverlayContext",
    "BizMarketingMessagingDiscoveryLoggingUtils",
    "BusinessUnifiedNavigationNavigationIDUtils",
    "logBizKitTabItemClick",
    "logBizKitTabItemImpression",
    "react",
    "useBizKitBaseLoggingData",
    "useBizWebCurrentRouteName",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    b = h || d("react");
    var i = b.useCallback,
      j = b.useContext,
      k = b.useEffect;
    function a(a) {
      var b = a.name,
        e = a.location,
        f = a.position,
        g = a.external,
        h = c("useBizKitBaseLoggingData")();
      a = j(c("BizKitAllToolsSearchContext"));
      var l = a.searchText,
        m = c("useBizWebCurrentRouteName")();
      k(
        function () {
          if (b != null) {
            var a;
            d("logBizKitTabItemImpression").logBizKitTabItemImpression(
              b,
              e,
              f,
              h,
              (a = g) != null ? a : !1
            );
          }
        },
        [b, e, f, h, g]
      );
      a = j(c("BizKitOverlayContext"));
      var n = a.interactionUUID;
      a = i(
        function (a, c) {
          a = d("BusinessUnifiedNavigationNavigationIDUtils").getNavigationID();
          if (b != null && m != null) {
            d("logBizKitTabItemClick").logBizKitTabItemClick(
              b,
              e,
              f,
              h,
              a,
              g,
              l,
              m,
              n
            );
            if (b === "MARKETING_MESSAGES") {
              c =
                e === "MORE_TOOLS_MENU"
                  ? "mbs_side_nav_all_tools"
                  : "mbs_side_nav_global";
              d(
                "BizMarketingMessagingDiscoveryLoggingUtils"
              ).logImpressionEvent(
                "entry_point",
                h == null ? void 0 : h.page_id,
                c
              );
              d("BizMarketingMessagingDiscoveryLoggingUtils").logClickEvent(
                "entry_point",
                h == null ? void 0 : h.page_id,
                c
              );
            }
          }
          return a;
        },
        [b, e, f, h, g, l, m, n]
      );
      return { onClick: a };
    }
    g["default"] = a;
  },
  98
);

import React, { useCallback, useContext, useEffect } from "react";
import {
  BizKitAllToolsSearchContext,
  BizKitOverlayContext,
  BizMarketingMessagingDiscoveryLoggingUtils,
} from "./module-dependencies"; // Replace with your actual import paths
import { getNavigationID } from "BusinessUnifiedNavigationNavigationIDUtils";
import {
  logBizKitTabItemClick,
  logBizKitTabItemImpression,
} from "./logging-modules"; // Replace with your actual import paths
import useBizKitBaseLoggingData from "useBizKitBaseLoggingData";
import useBizWebCurrentRouteName from "useBizWebCurrentRouteName";

interface UseLogBizKitNavItemProps {
  name: string | null;
  location: string;
  position: number;
  external?: boolean;
}

function useLogBizKitNavItem({
  name,
  location,
  position,
  external,
}: UseLogBizKitNavItemProps) {
  const baseLoggingData = useBizKitBaseLoggingData();
  const { searchText } = useContext(BizKitAllToolsSearchContext);
  const currentRouteName = useBizWebCurrentRouteName();
  const { interactionUUID } = useContext(BizKitOverlayContext);

  useEffect(() => {
    if (name) {
      logBizKitTabItemImpression(
        name,
        location,
        position,
        baseLoggingData,
        external ?? false
      );
    }
  }, [name, location, position, baseLoggingData, external]);

  const onClick = useCallback(
    (event, ctx) => {
      const navigationID = getNavigationID();
      if (name && currentRouteName) {
        logBizKitTabItemClick(
          name,
          location,
          position,
          baseLoggingData,
          navigationID,
          external ?? false,
          searchText,
          currentRouteName,
          interactionUUID
        );

        if (name === "MARKETING_MESSAGES") {
          const entryPoint =
            location === "MORE_TOOLS_MENU"
              ? "mbs_side_nav_all_tools"
              : "mbs_side_nav_global";
          BizMarketingMessagingDiscoveryLoggingUtils.logImpressionEvent(
            "entry_point",
            baseLoggingData?.page_id, // Optional chaining for safety
            entryPoint
          );
          BizMarketingMessagingDiscoveryLoggingUtils.logClickEvent(
            "entry_point",
            baseLoggingData?.page_id,
            entryPoint
          );
        }
      }
      return navigationID;
    },
    [
      name,
      location,
      position,
      baseLoggingData,
      external,
      searchText,
      currentRouteName,
      interactionUUID,
    ]
  );

  return { onClick };
}

export default useLogBizKitNavItem;
