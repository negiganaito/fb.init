__d(
  "LWIBizWebButtonActionContextProviderBase.react",
  [
    "BizKitConfigDynamicFields",
    "BoostedComponentProduct",
    "CometRelay",
    "LWIAdCenterLoggerContext",
    "LWIBizWebCometFullScreenNavigationUtils",
    "LWICometBoostedItemPickerContentFilterTypes",
    "LWICometButtonActionContext",
    "firstKeyWithValue",
    "openLWIBizWebBoostedItemPicker",
    "openLWIBizWebDraftsList",
    "openLWIBizWebIsolatedQuestionnairePhaseDialog",
    "openLWIBizWebProductPicker",
    "openLWIBizWebViewABTestCampaignResultsPhaseDialog",
    "openLWIBizWebViewABTestResultsPhaseDialog",
    "openLWIBizWebViewResultsPhaseDialog",
    "react",
    "recoverableViolation",
    "unrecoverableViolation",
    "useBizWebRouteDispatcher",
    "useCometRelayEntrypointContextualEnvironmentProvider",
    "useLWIBizWebErrorDialog",
    "useLWIBizwebOpenDialog",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || (h = d("react"));
    b = h;
    var j = b.useContext,
      k = b.useMemo;
    function a(a) {
      a = a.children;
      var b = j(c("LWIAdCenterLoggerContext")),
        e = b.mapping,
        f = c("useLWIBizwebOpenDialog")(),
        g = c("useCometRelayEntrypointContextualEnvironmentProvider")(),
        h = d("CometRelay").useRelayEnvironment(),
        l = c("useBizWebRouteDispatcher")(),
        m = c("useLWIBizWebErrorDialog")();
      b = k(
        function () {
          var a = function (a) {
              var b = e ? e(a) : a;
              return function (e, f, g, i, j, k, n) {
                k === void 0 && (k = null);
                f =
                  d("BizKitConfigDynamicFields").is_ig_only &&
                  f === "PRODUCT_SELECTOR"
                    ? "BOOST_IG_MEDIA_PICKER"
                    : f;
                switch (f) {
                  case "PRODUCT_SELECTOR":
                    c("openLWIBizWebProductPicker")(e, b, g, i, j, n, l);
                    return;
                  case "BOOST_POST_PICKER":
                    c("openLWIBizWebBoostedItemPicker")(
                      e,
                      "boosted_post_picker",
                      b,
                      g,
                      a === "aymt_mbs_reels_monetization_tip" ||
                        a === "bizweb_home_guidance_card" ||
                        a === "bizweb_ads_guidance_recommendation"
                        ? d("LWICometBoostedItemPickerContentFilterTypes")
                            .ContentFilterTypes.Reels
                        : d("LWICometBoostedItemPickerContentFilterTypes")
                            .ContentFilterTypes.All,
                      null,
                      l
                    );
                    return;
                  case "BOOST_IG_MEDIA_PICKER":
                  case "BOOST_FB_IG_MEDIA_PICKER":
                  case "BOOST_FB_IG_MEDIA_PICKER_WITH_IG_PRESELECTED":
                    c("openLWIBizWebBoostedItemPicker")(
                      e,
                      "boosted_instagram_media_picker",
                      b,
                      g,
                      a === "aymt_mbs_reels_monetization_tip" ||
                        a === "bizweb_home_guidance_card"
                        ? d("LWICometBoostedItemPickerContentFilterTypes")
                            .ContentFilterTypes.Reels
                        : d("LWICometBoostedItemPickerContentFilterTypes")
                            .ContentFilterTypes.All,
                      null,
                      l
                    );
                    return;
                  case "BOOST_EVENT_PICKER":
                    c("openLWIBizWebBoostedItemPicker")(
                      e,
                      "boosted_event_picker",
                      b,
                      g,
                      d("LWICometBoostedItemPickerContentFilterTypes")
                        .ContentFilterTypes.All,
                      null,
                      l
                    );
                    return;
                  case "CTA_CREATION":
                    d(
                      "LWIBizWebCometFullScreenNavigationUtils"
                    ).onAdsFullscreenNavigateWithAdsDraft(
                      {
                        clientSpecOverride: g,
                        product: "BOOSTED_CTA",
                        targetID: k,
                      },
                      b,
                      e,
                      l,
                      null,
                      h,
                      m,
                      null
                    );
                    return;
                  case "PAGELIKE_CREATION":
                    d(
                      "LWIBizWebCometFullScreenNavigationUtils"
                    ).onAdsFullscreenNavigateWithAdsDraft(
                      {
                        clientSpecOverride: g,
                        product: "BOOSTED_PAGELIKE",
                        targetID: k,
                      },
                      b,
                      e,
                      l,
                      null,
                      h,
                      m,
                      null
                    );
                    return;
                  case "DRAFTS":
                    c("openLWIBizWebDraftsList")(e, b, l);
                    return;
                  default:
                    c("recoverableViolation")(
                      "Input phase" + f + "is not supported by Biz Web",
                      "mbs_ads"
                    );
                }
              };
            },
            b = function (a) {
              var b = e ? e(a) : a;
              return function (a, e, f, g) {
                f === void 0 && (f = null);
                e = c("firstKeyWithValue")(c("BoostedComponentProduct"), e);
                if (e == null)
                  throw c("unrecoverableViolation")(
                    "product ${graphqlProduct} should be a valid BoostedComponentProduct",
                    "mbs_ads"
                  );
                d(
                  "LWIBizWebCometFullScreenNavigationUtils"
                ).onAdsFullscreenNavigateWithAdsDraft(
                  { clientSpecOverride: g, product: e, targetID: f },
                  b,
                  a,
                  l,
                  null,
                  h,
                  m,
                  null
                );
              };
            },
            i = function (a) {
              var b = e ? e(a) : a;
              return function (a, d, e) {
                c("openLWIBizWebViewResultsPhaseDialog")(
                  d,
                  a,
                  g,
                  { entrypoint: b, openDialog: f },
                  e
                );
              };
            },
            j = function (a) {
              return function (b, c, e, h, i, j) {
                d(
                  "openLWIBizWebViewABTestResultsPhaseDialog"
                ).openLWIBizWebViewABTestResultsPhaseDialog(
                  c,
                  b,
                  e,
                  h,
                  i,
                  g,
                  { entrypoint: a, openDialog: f },
                  j
                );
              };
            },
            k = function (a) {
              return function (b) {
                var c = b.boostID,
                  e = b.campaignID;
                b = b.pageID;
                d(
                  "openLWIBizWebViewABTestCampaignResultsPhaseDialog"
                ).openLWIBizWebViewABTestCampaignResultsPhaseDialog(
                  c,
                  e,
                  b,
                  g,
                  { entrypoint: a, openDialog: f }
                );
              };
            },
            n = function (a) {
              var b = e ? e(a) : a;
              return function (a) {
                c("openLWIBizWebIsolatedQuestionnairePhaseDialog")(a, g, {
                  entrypoint: b,
                  openDialog: f,
                });
              };
            },
            o = function (a) {
              var b = e ? e(a) : a;
              return function (a, e, f, g, i) {
                var j = Object.keys(c("BoostedComponentProduct")).find(
                  function (a) {
                    return c("BoostedComponentProduct")[a] === f;
                  }
                );
                d(
                  "LWIBizWebCometFullScreenNavigationUtils"
                ).onAdsFullscreenNavigateWithAdsDraft(
                  { draftID: a, product: j, targetID: g },
                  b,
                  e,
                  l,
                  null,
                  h,
                  function (a) {
                    m(a, i);
                  },
                  null
                );
              };
            },
            p = function (a) {
              var b = e ? e(a) : a;
              return function (a, e, f, g) {
                f = c("firstKeyWithValue")(c("BoostedComponentProduct"), f);
                if (f == null)
                  throw c("unrecoverableViolation")(
                    "product ${graphqlProduct} should be a valid BoostedComponentProduct",
                    "mbs_ads"
                  );
                d(
                  "LWIBizWebCometFullScreenNavigationUtils"
                ).onAdsFullscreenNavigateWithAdsDraft(
                  { boostID: a, product: f, targetID: g },
                  b,
                  e,
                  l,
                  null,
                  h,
                  m,
                  null
                );
              };
            },
            q = function (a) {
              var b = e ? e(a) : a;
              return function (a, e, f) {
                e = c("firstKeyWithValue")(c("BoostedComponentProduct"), e);
                if (e == null)
                  throw c("unrecoverableViolation")(
                    "product ${graphqlProduct} should be a valid BoostedComponentProduct",
                    "mbs_ads"
                  );
                d(
                  "LWIBizWebCometFullScreenNavigationUtils"
                ).onAdsFullscreenNavigateWithAdsDraft(
                  { boostID: null, product: e, targetID: f },
                  b,
                  a,
                  l,
                  null,
                  h,
                  m,
                  null
                );
              };
            };
          return {
            getOpenDialogWithPhase: a,
            getOpenDialogWithTargetID: b,
            getOpenDraftDialog: o,
            getOpenDuplicateAdDialog: p,
            getOpenDuplicateAdInABTestDialog: q,
            getOpenIsolatedQuestionnaireDialog: n,
            getOpenViewABTestCampaignResults: k,
            getOpenViewABTestResults: j,
            getOpenViewResults: i,
          };
        },
        [l, g, e, f, h, m]
      );
      return i.jsx(c("LWICometButtonActionContext").Provider, {
        value: b,
        children: a,
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);

import React, { useContext, useMemo } from "react";
import { LWIAdCenterLoggerContext } from "LWIAdCenterLoggerContext";
import {
  useLWIBizwebOpenDialog,
  useCometRelayEntrypointContextualEnvironmentProvider,
  useBizWebRouteDispatcher,
  useLWIBizWebErrorDialog,
} from "hooks";
import {
  openLWIBizWebProductPicker,
  openLWIBizWebBoostedItemPicker,
  openLWIBizWebDraftsList,
  openLWIBizWebIsolatedQuestionnairePhaseDialog,
  openLWIBizWebViewABTestCampaignResultsPhaseDialog,
  openLWIBizWebViewABTestResultsPhaseDialog,
  openLWIBizWebViewResultsPhaseDialog,
} from "dialogs";
import { BoostedComponentProduct } from "BoostedComponentProduct";
import { BizKitConfigDynamicFields } from "BizKitConfigDynamicFields";
import { useRelayEnvironment } from "CometRelay";
import { recoverableViolation, unrecoverableViolation } from "errors";
import { LWIBizWebCometFullScreenNavigationUtils } from "LWIBizWebCometFullScreenNavigationUtils";
import { LWICometButtonActionContext } from "LWICometButtonActionContext";
import { firstKeyWithValue } from "utils";

interface Props {
  children: React.ReactNode;
}

const LWIBizWebButtonActionContextProviderBase: React.FC<Props> = ({
  children,
}) => {
  const { mapping } = useContext(LWIAdCenterLoggerContext);
  const openDialog = useLWIBizwebOpenDialog();
  const contextualEnvironmentProvider =
    useCometRelayEntrypointContextualEnvironmentProvider();
  const relayEnvironment = useRelayEnvironment();
  const routeDispatcher = useBizWebRouteDispatcher();
  const errorDialog = useLWIBizWebErrorDialog();

  const contextValue = useMemo(() => {
    const getOpenDialogWithPhase = (entrypoint: string) => {
      const mappedEntrypoint = mapping ? mapping(entrypoint) : entrypoint;

      return (
        clientSpecOverride: string,
        phase: string,
        product: string,
        ...args: any[]
      ) => {
        if (
          BizKitConfigDynamicFields.is_ig_only &&
          product === "PRODUCT_SELECTOR"
        ) {
          product = "BOOST_IG_MEDIA_PICKER";
        }
        switch (product) {
          case "PRODUCT_SELECTOR":
            openLWIBizWebProductPicker(
              clientSpecOverride,
              mappedEntrypoint,
              phase,
              ...args,
              routeDispatcher
            );
            return;
          case "BOOST_POST_PICKER":
            openLWIBizWebBoostedItemPicker(
              clientSpecOverride,
              "boosted_post_picker",
              mappedEntrypoint,
              phase,
              ...args,
              routeDispatcher
            );
            return;
          case "BOOST_IG_MEDIA_PICKER":
          case "BOOST_FB_IG_MEDIA_PICKER":
          case "BOOST_FB_IG_MEDIA_PICKER_WITH_IG_PRESELECTED":
            openLWIBizWebBoostedItemPicker(
              clientSpecOverride,
              "boosted_instagram_media_picker",
              mappedEntrypoint,
              phase,
              ...args,
              routeDispatcher
            );
            return;
          case "BOOST_EVENT_PICKER":
            openLWIBizWebBoostedItemPicker(
              clientSpecOverride,
              "boosted_event_picker",
              mappedEntrypoint,
              phase,
              ...args,
              routeDispatcher
            );
            return;
          case "CTA_CREATION":
            LWIBizWebCometFullScreenNavigationUtils.onAdsFullscreenNavigateWithAdsDraft(
              {
                clientSpecOverride,
                product: "BOOSTED_CTA",
                targetID: args[4] ?? null,
              },
              mappedEntrypoint,
              clientSpecOverride,
              routeDispatcher,
              null,
              relayEnvironment,
              errorDialog,
              null
            );
            return;
          case "PAGELIKE_CREATION":
            LWIBizWebCometFullScreenNavigationUtils.onAdsFullscreenNavigateWithAdsDraft(
              {
                clientSpecOverride,
                product: "BOOSTED_PAGELIKE",
                targetID: args[4] ?? null,
              },
              mappedEntrypoint,
              clientSpecOverride,
              routeDispatcher,
              null,
              relayEnvironment,
              errorDialog,
              null
            );
            return;
          case "DRAFTS":
            openLWIBizWebDraftsList(
              clientSpecOverride,
              mappedEntrypoint,
              routeDispatcher
            );
            return;
          default:
            recoverableViolation(
              `Input phase ${product} is not supported by Biz Web`,
              "mbs_ads"
            );
        }
      };
    };

    const getOpenDialogWithTargetID = (entrypoint: string) => {
      const mappedEntrypoint = mapping ? mapping(entrypoint) : entrypoint;

      return (
        clientSpecOverride: string,
        graphqlProduct: string,
        targetID: string,
        ...args: any[]
      ) => {
        const product = firstKeyWithValue(
          BoostedComponentProduct,
          graphqlProduct
        );
        if (!product) {
          throw unrecoverableViolation(
            `product ${graphqlProduct} should be a valid BoostedComponentProduct`,
            "mbs_ads"
          );
        }
        LWIBizWebCometFullScreenNavigationUtils.onAdsFullscreenNavigateWithAdsDraft(
          {
            clientSpecOverride,
            product,
            targetID,
          },
          mappedEntrypoint,
          clientSpecOverride,
          routeDispatcher,
          null,
          relayEnvironment,
          errorDialog,
          null
        );
      };
    };

    const getOpenDraftDialog = (entrypoint: string) => {
      const mappedEntrypoint = mapping ? mapping(entrypoint) : entrypoint;

      return (draftID: string, graphqlProduct: string, ...args: any[]) => {
        const product = firstKeyWithValue(
          BoostedComponentProduct,
          graphqlProduct
        );
        if (!product) {
          throw unrecoverableViolation(
            `product ${graphqlProduct} should be a valid BoostedComponentProduct`,
            "mbs_ads"
          );
        }
        LWIBizWebCometFullScreenNavigationUtils.onAdsFullscreenNavigateWithAdsDraft(
          {
            draftID,
            product,
            targetID: args[0] ?? null,
          },
          mappedEntrypoint,
          ...args,
          routeDispatcher,
          null,
          relayEnvironment,
          (error) => errorDialog(error, args[1]),
          null
        );
      };
    };

    const getOpenDuplicateAdDialog = (entrypoint: string) => {
      const mappedEntrypoint = mapping ? mapping(entrypoint) : entrypoint;

      return (
        boostID: string,
        graphqlProduct: string,
        targetID: string,
        ...args: any[]
      ) => {
        const product = firstKeyWithValue(
          BoostedComponentProduct,
          graphqlProduct
        );
        if (!product) {
          throw unrecoverableViolation(
            `product ${graphqlProduct} should be a valid BoostedComponentProduct`,
            "mbs_ads"
          );
        }
        LWIBizWebCometFullScreenNavigationUtils.onAdsFullscreenNavigateWithAdsDraft(
          {
            boostID,
            product,
            targetID,
          },
          mappedEntrypoint,
          ...args,
          routeDispatcher,
          null,
          relayEnvironment,
          errorDialog,
          null
        );
      };
    };

    const getOpenDuplicateAdInABTestDialog = (entrypoint: string) => {
      const mappedEntrypoint = mapping ? mapping(entrypoint) : entrypoint;

      return (boostID: string, graphqlProduct: string, targetID: string) => {
        const product = firstKeyWithValue(
          BoostedComponentProduct,
          graphqlProduct
        );
        if (!product) {
          throw unrecoverableViolation(
            `product ${graphqlProduct} should be a valid BoostedComponentProduct`,
            "mbs_ads"
          );
        }
        LWIBizWebCometFullScreenNavigationUtils.onAdsFullscreenNavigateWithAdsDraft(
          {
            boostID: null,
            product,
            targetID,
          },
          mappedEntrypoint,
          boostID,
          routeDispatcher,
          null,
          relayEnvironment,
          errorDialog,
          null
        );
      };
    };

    const getOpenIsolatedQuestionnaireDialog = (entrypoint: string) => {
      const mappedEntrypoint = mapping ? mapping(entrypoint) : entrypoint;

      return (questionnaireID: string) => {
        openLWIBizWebIsolatedQuestionnairePhaseDialog(
          questionnaireID,
          contextualEnvironmentProvider,
          { entrypoint: mappedEntrypoint, openDialog }
        );
      };
    };

    const getOpenViewABTestCampaignResults = (entrypoint: string) => {
      const mappedEntrypoint = mapping ? mapping(entrypoint) : entrypoint;

      return ({
        boostID,
        campaignID,
        pageID,
      }: {
        boostID: string;
        campaignID: string;
        pageID: string;
      }) => {
        openLWIBizWebViewABTestCampaignResultsPhaseDialog(
          boostID,
          campaignID,
          pageID,
          contextualEnvironmentProvider,
          { entrypoint: mappedEntrypoint, openDialog }
        );
      };
    };

    const getOpenViewABTestResults = (entrypoint: string) => {
      return (abTestID: string, ads: string, adSet: string, ...args: any[]) => {
        openLWIBizWebViewABTestResultsPhaseDialog(
          abTestID,
          ads,
          adSet,
          ...args,
          contextualEnvironmentProvider,
          { entrypoint, openDialog },
          ...args
        );
      };
    };

    const getOpenViewResults = (entrypoint: string) => {
      const mappedEntrypoint = mapping ? mapping(entrypoint) : entrypoint;

      return (boostID: string, viewID: string, ...args: any[]) => {
        openLWIBizWebViewResultsPhaseDialog(
          viewID,
          boostID,
          contextualEnvironmentProvider,
          { entrypoint: mappedEntrypoint, openDialog },
          ...args
        );
      };
    };

    return {
      getOpenDialogWithPhase,
      getOpenDialogWithTargetID,
      getOpenDraftDialog,
      getOpenDuplicateAdDialog,
      getOpenDuplicateAdInABTestDialog,
      getOpenIsolatedQuestionnaireDialog,
      getOpenViewABTestCampaignResults,
      getOpenViewABTestResults,
      getOpenViewResults,
    };
  }, [
    mapping,
    openDialog,
    contextualEnvironmentProvider,
    relayEnvironment,
    routeDispatcher,
    errorDialog,
  ]);

  return (
    <LWICometButtonActionContext.Provider value={contextValue}>
      {children}
    </LWICometButtonActionContext.Provider>
  );
};

LWIBizWebButtonActionContextProviderBase.displayName = `${LWIBizWebButtonActionContextProviderBase.name} [from ${__filename}]`;

export default LWIBizWebButtonActionContextProviderBase;
