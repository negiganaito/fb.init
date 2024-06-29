__d(
  "BizWebAdCenterLoggerContextProvider.react",
  ["LWIAdCenterLoggerContext", "react", "recoverableViolation"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || (h = d("react")),
      j = h.useMemo;
    function k(a) {
      switch (a) {
        case "www_promotions_hub_all_promotions":
          return "bizweb_ad_center_overview";
        case "www_promotions_hub_welcome_card":
          return "bizweb_ad_center_welcome_card";
        case "ad_center_metrics_modal":
          return "bizweb_ad_center_metrics_modal";
        case "fb4b_create_ad_cta":
          return "bizweb_ads_guidance_recommendation";
        case "unified_inbox_thread_cts_upsell":
          return "unified_inbox_thread_cts_upsell";
        default:
          a === void 0 &&
            c("recoverableViolation")(
              "Unmapped entrypoint found in Ad Center BizWeb! Provide mapping for " +
                a +
                " to ensure proper logging of BizWeb events!",
              "mbs_ads"
            );
          return a;
      }
    }
    function a(a) {
      a = a.children;
      var b = j(function () {
        return { mapping: k };
      }, []);
      return i.jsx(c("LWIAdCenterLoggerContext").Provider, {
        value: b,
        children: a,
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);

import React, { useMemo } from "react";
import { LWIAdCenterLoggerContext } from "LWIAdCenterLoggerContext";
import { recoverableViolation } from "recoverableViolation";

interface Props {
  children: React.ReactNode;
}

const mapEntrypoint = (entrypoint?: string): string => {
  switch (entrypoint) {
    case "www_promotions_hub_all_promotions":
      return "bizweb_ad_center_overview";
    case "www_promotions_hub_welcome_card":
      return "bizweb_ad_center_welcome_card";
    case "ad_center_metrics_modal":
      return "bizweb_ad_center_metrics_modal";
    case "fb4b_create_ad_cta":
      return "bizweb_ads_guidance_recommendation";
    case "unified_inbox_thread_cts_upsell":
      return "unified_inbox_thread_cts_upsell";
    default:
      if (entrypoint === undefined) {
        recoverableViolation(
          "Unmapped entrypoint found in Ad Center BizWeb! Provide mapping for " +
            entrypoint +
            " to ensure proper logging of BizWeb events!",
          "mbs_ads"
        );
      }
      return entrypoint ?? "";
  }
};

const BizWebAdCenterLoggerContextProvider: React.FC<Props> = ({ children }) => {
  const contextValue = useMemo(() => ({ mapping: mapEntrypoint }), []);

  return (
    <LWIAdCenterLoggerContext.Provider value={contextValue}>
      {children}
    </LWIAdCenterLoggerContext.Provider>
  );
};

BizWebAdCenterLoggerContextProvider.displayName = `${BizWebAdCenterLoggerContextProvider.name} [from ${__filename}]`;

export default BizWebAdCenterLoggerContextProvider;
