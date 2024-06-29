__d(
  "BizWebLeftNavShared.react",
  [
    "BMToMBSConsoldationGating",
    "BizCoreNavBarHoverFalcoEvent",
    "BizCoreTabItemImpressionFalcoEvent",
    "BizKitConstants",
    "BizKitErrorBoundary.react",
    "BizKitIsIgLoginContext",
    "BizKitLeftNavDisabledPopoverForWABAAssetOnly.react",
    "BizKitLeftNavEditItem.react",
    "BizKitLeftNavFooter.react",
    "BizKitLeftNavHeader.react",
    "BizKitLeftNavOverlayLayerHeroInteractionWrapper.react",
    "BizKitLeftNavSaveMutation",
    "BizKitLeftNavSidebarItem.react",
    "BizKitLeftNavSidebarItemContext",
    "BizKitNavigationCustomizationContext",
    "BizKitOverlayContext",
    "BizKitRouteContext",
    "BizKitSidebarNavigation.react",
    "BizKitSidebarSection.react",
    "BizKitStrings",
    "BizKitStyles",
    "BizKitTabTTITrackerUtils",
    "BizKitWelcomeTourContext",
    "BizSuiteHomeICERoute",
    "BizWebAdsOnboardingUtils",
    "BizWebLeftNavSharedLogPageVisitMutation.graphql",
    "BizWebLeftNavShared_viewer.graphql",
    "CometDOMOnlyBoundary.react",
    "CometRouteMatch",
    "CometVisualCompletionAttributes",
    "HeroInteractionIgnoreWithDiv.react",
    "LWIBizWebButtonActionContextProvider.react",
    "RelayHooks",
    "XBizWebCometBizSuiteHomeControllerRouteBuilder",
    "cr:2919", // null
    "cr:9952", // null
    "getIsEligibleForRemovePageDependencyBadging.entrypointutils",
    "justknobx",
    "react",
    "recoverableViolation",
    "stylex",
    "transformGlobalNavValue",
    "useBizKitBaseLoggingData",
    "useBizKitSelectedAssets",
    "useBizKitTabEnterExitFlow",
    "useBizWebCurrentRouteName",
    "useBizWebCurrentTabName",
    "useBusinessCometLeftNavParams",
    "useDefineBizKitNavigationCustomizationContext",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j,
      k,
      l = k || (k = d("react"));
    e = k;
    var m = e.useCallback,
      n = e.useContext,
      o = e.useEffect,
      p = e.useRef,
      q = e.useState,
      r = e.useTransition,
      s = 300,
      t = {
        globalNavContainer: { height: "x5yr21d", float: "xrbpyxo", $$css: !0 },
      };
    function a(a) {
      var e,
        f = a.businessCometHelpTraySideBarChatButtonQueryReference,
        g = a.scopeSelectorQueries,
        k = a.supportedAssetTypesForCurrentRoute;
      a = a.viewer;
      var u = n(c("BizKitRouteContext"));
      u = u.routeName;
      var v = n(c("BizKitOverlayContext")),
        w = v.activeOverlay;
      v = v.activeToolGroup;
      var x = n(c("BizKitWelcomeTourContext")),
        y = x.adsTabRef,
        z = x.inboxTabRef,
        aa = x.insightsTabRef,
        ba = x.footerSettingsRef,
        ca = x.paidPartnershipsRef,
        da = x.plannerTabRef,
        ea = x.getStartedTabRef,
        A = c("useBizKitBaseLoggingData")();
      x = d("RelayHooks").useRefetchableFragment(
        h !== void 0 ? h : (h = b("BizWebLeftNavShared_viewer.graphql")),
        a
      );
      a = x[0];
      var fa = x[1];
      x = d("RelayHooks").useMutation(
        i !== void 0
          ? i
          : (i = b("BizWebLeftNavSharedLogPageVisitMutation.graphql"))
      );
      var B = x[0];
      o(function () {
        d("BizKitTabTTITrackerUtils").logLeftNavLoaded();
      }, []);
      var C = p(null);
      x = q(!1);
      var ga = x[0],
        D = x[1];
      x = q(!1);
      var E = x[0],
        F = x[1];
      x = q(!1);
      var G = x[0],
        ha = x[1];
      x = q(!1);
      var H = x[0],
        ia = x[1];
      x = q(null);
      var I = x[0],
        J = x[1],
        K =
          a == null
            ? void 0
            : (x = a.bizkit_scoping) == null
            ? void 0
            : x.navigation_items;
      x = c("useBizKitSelectedAssets")();
      var L = x.assetType,
        M = x.assetID,
        N = L === "WHATSAPP_BUSINESS_ACCOUNT";
      a == null
        ? c("recoverableViolation")(
            "The data returned from BizWebLeftNavSharedRefreshQuery should not be null.",
            d("BizKitConstants").BIZKIT_PROJECT_NAME
          )
        : a.bizkit_scoping == null
        ? c("recoverableViolation")(
            "The bizkit_scoping field should not be null.",
            d("BizKitConstants").BIZKIT_PROJECT_NAME
          )
        : K == null &&
          c("recoverableViolation")(
            "The list of navigation items should not be null.",
            d("BizKitConstants").BIZKIT_PROJECT_NAME
          );
      x = c("useDefineBizKitNavigationCustomizationContext")();
      var O =
          K == null
            ? void 0
            : K.filter(function (a) {
                return a.position === "TOP";
              }),
        P = (O = O == null ? void 0 : O.length.toString()) != null ? O : "0";
      O = c("XBizWebCometBizSuiteHomeControllerRouteBuilder").buildURL({});
      var Q = d("CometRouteMatch").useCurrentRouteMatcher(
        d("CometRouteMatch").MatchFunctions.pathMatchFunction
      );
      e =
        u ===
          ((e = c("BizSuiteHomeICERoute").activeState) == null
            ? void 0
            : e.routeName) || Q(O);
      var R = u === "BUSINESS_HOME";
      Q = c("useBizWebCurrentRouteName")();
      var ja = Q === "SETTINGS",
        S = c("useBizWebCurrentTabName")();
      O = n(c("BizKitWelcomeTourContext"));
      u = O.isHomeUpsellVisible;
      Q = x.shouldShowCustomizeYourMenuAnytimeTip;
      O = x.shouldOverlayMBSNavBar;
      var T =
        !u &&
        (!R || w != null || v != null) &&
        (!E || H) &&
        (!e || w != null || v != null) &&
        !Q &&
        !(e && w === "ACCOUNT_SWITCHER");
      u = m(
        function (a) {
          var b;
          ((b = C.current) == null ? void 0 : b.contains(a.target)) &&
            (window.clearTimeout(I),
            J(
              window.setTimeout(function () {
                F(!0),
                  D(!0),
                  G ||
                    (c("BizCoreTabItemImpressionFalcoEvent").log(function () {
                      return babelHelpers["extends"](
                        {
                          event_data: {
                            position: P,
                            badge_type: "no_badging",
                            target_tab: "edit_nav",
                            location: "GLOBAL_NAV",
                          },
                          client_timestamp_ms: Date.now(),
                        },
                        A
                      );
                    }),
                    ha(!0));
              }, s)
            ));
        },
        [G, I, A, P]
      );
      E = m(
        function (a) {
          var b;
          ((b = C.current) == null ? void 0 : b.contains(a.target)) &&
            (window.clearTimeout(I),
            D(!1),
            J(
              window.setTimeout(function () {
                F(!1), ia(!1);
              }, s)
            ));
        },
        [I]
      );
      o(
        function () {
          return function () {
            window.clearTimeout(I);
          };
        },
        [I]
      );
      var U = m(function () {
        F(!1);
      }, []);
      o(
        function () {
          b("cr:9952") != null && S != null && b("cr:9952").bizweb(S);
        },
        [S]
      );
      var V = p(!0);
      o(
        function () {
          V.current &&
            L === "PAGE" &&
            M != null &&
            c("justknobx")._("1531") &&
            (B({ variables: { asset_id: M } }), (V.current = !1)),
            T ||
              c("BizCoreNavBarHoverFalcoEvent").log(function () {
                return babelHelpers["extends"](
                  { event_data: {}, client_timestamp_ms: Date.now() },
                  A
                );
              });
        },
        [M, L, B, T, A]
      );
      c("useBizKitTabEnterExitFlow")((H = K) != null ? H : []);
      var ka = d("transformGlobalNavValue").transformGlobalNavValue(S);
      H = ((Q = K) != null ? Q : []).find(function (a) {
        return (
          d("transformGlobalNavValue").transformGlobalNavValue(a.route_name) ===
            ka || a.reverse_shim_name === S
        );
      });
      var W = function (a) {
        switch (a) {
          case "AD_CENTER":
            return y;
          case "INBOX":
            return z;
          case "INSIGHTS":
            return aa;
          case "SETTINGS":
            return ba;
          case "CREATOR_MARKETPLACE":
            return ca;
          case "CONTENT_CALENDAR":
            return da;
          case "GET_STARTED":
            return ea;
          default:
            return null;
        }
      };
      Q = r();
      Q[0];
      var la = Q[1];
      Q = c("useBusinessCometLeftNavParams")();
      var ma = Q.businessID,
        X = Q.localScopeID,
        Y = Q.localScopes,
        na = Q.localScopeType;
      Q = Z(X, Y);
      d("RelayHooks").useSubscribeToInvalidationState(Q, function () {
        X != null &&
          la(function () {
            fa(
              {
                businessID: ma,
                localScopeID: X,
                localScopes: Y,
                localScopeType: na,
                isEligibleForNavV2: !1,
              },
              { fetchPolicy: "network-only" }
            );
          });
      });
      function Z(a, b) {
        if (
          !d(
            "getIsEligibleForRemovePageDependencyBadging.entrypointutils"
          ).getIsEligibleForRemovePageDependencyBadging()
        )
          return [d("BizKitLeftNavSaveMutation").getHomeNavItemRelayID(a)];
        else
          return b
            ? b.map(function (a) {
                return d("BizKitLeftNavSaveMutation").getHomeNavItemRelayID(
                  a.id
                );
              })
            : [];
      }
      function oa(a, b) {
        switch (a.route_name) {
          case "POSTS":
            return l.jsx(
              c("BizKitLeftNavSidebarItemContext").Provider,
              {
                value: {
                  onSelectLink: U,
                  position: b,
                  shouldShowAsDisable: !1,
                },
                children: l.jsx("div", {
                  ref: d("BizWebAdsOnboardingUtils").postsAndStoriesButtonRef,
                  children: l.jsx(
                    "div",
                    babelHelpers["extends"](
                      { ref: W(a.route_name) },
                      c("CometVisualCompletionAttributes").IGNORE_DYNAMIC,
                      {
                        children: l.jsx(c("BizKitLeftNavSidebarItem.react"), {
                          item: a,
                        }),
                      }
                    )
                  ),
                }),
              },
              a.id
            );
          case "INSIGHTS":
            return l.jsx(
              c("BizKitLeftNavSidebarItemContext").Provider,
              {
                value: {
                  onSelectLink: U,
                  position: b,
                  shouldShowAsDisable: !1,
                },
                children: l.jsx("div", {
                  ref: d("BizWebAdsOnboardingUtils").adPerformanceButtonRef,
                  children: l.jsx(
                    "div",
                    babelHelpers["extends"](
                      { ref: W(a.route_name) },
                      c("CometVisualCompletionAttributes").IGNORE_DYNAMIC,
                      {
                        children: l.jsx(c("BizKitLeftNavSidebarItem.react"), {
                          item: a,
                        }),
                      }
                    )
                  ),
                }),
              },
              a.id
            );
          case "MONETIZATION":
            return l.jsx(
              c("BizKitLeftNavSidebarItemContext").Provider,
              {
                value: {
                  onSelectLink: U,
                  position: b,
                  shouldShowAsDisable: !1,
                },
                children: l.jsx(
                  "div",
                  babelHelpers["extends"](
                    { ref: W(a.route_name) },
                    c("CometVisualCompletionAttributes").IGNORE_DYNAMIC,
                    {
                      children: l.jsx(c("BizKitLeftNavSidebarItem.react"), {
                        item: a,
                      }),
                    }
                  )
                ),
              },
              a.id
            );
          case "AD_CENTER":
            return l.jsx(
              c("BizKitLeftNavSidebarItemContext").Provider,
              {
                value: {
                  onSelectLink: U,
                  position: b,
                  shouldShowAsDisable: !1,
                },
                children: l.jsx("div", {
                  ref: d("BizWebAdsOnboardingUtils").welcomeToAdsButtonRef,
                  children: l.jsx(
                    "div",
                    babelHelpers["extends"](
                      { ref: W(a.route_name) },
                      c("CometVisualCompletionAttributes").IGNORE_DYNAMIC,
                      {
                        children: l.jsx(c("BizKitLeftNavSidebarItem.react"), {
                          item: a,
                        }),
                      }
                    )
                  ),
                }),
              },
              a.id
            );
          default:
            return l.jsx(
              c("BizKitLeftNavSidebarItemContext").Provider,
              {
                value: {
                  onSelectLink: U,
                  position: b,
                  shouldShowAsDisable: !1,
                },
                children: l.jsx(
                  "div",
                  babelHelpers["extends"](
                    { ref: W(a.route_name) },
                    c("CometVisualCompletionAttributes").IGNORE_DYNAMIC,
                    {
                      children: l.jsx(c("BizKitLeftNavSidebarItem.react"), {
                        item: a,
                      }),
                    }
                  )
                ),
              },
              a.id
            );
        }
      }
      function $(a, b) {
        var e;
        e =
          (e =
            K == null
              ? void 0
              : K.filter(function (b) {
                  return b.position === a;
                }).map(function (a, b) {
                  return N && a.name === "MORE_TOOLS"
                    ? l.jsx(
                        c("BizKitLeftNavSidebarItemContext").Provider,
                        {
                          value: {
                            onSelectLink: U,
                            position: b,
                            shouldShowAsDisable: !0,
                          },
                          children: l.jsx(
                            "div",
                            babelHelpers["extends"](
                              { ref: W(a.route_name) },
                              c("CometVisualCompletionAttributes")
                                .IGNORE_DYNAMIC,
                              {
                                children: l.jsx(
                                  c(
                                    "BizKitLeftNavDisabledPopoverForWABAAssetOnly.react"
                                  ),
                                  {
                                    children: l.jsx(
                                      c("BizKitLeftNavSidebarItem.react"),
                                      { item: a }
                                    ),
                                  }
                                ),
                              }
                            )
                          ),
                        },
                        a.id
                      )
                    : oa(a, b);
                })) != null
            ? e
            : null;
        !N &&
          e != null &&
          !R &&
          !(ja && d("BMToMBSConsoldationGating").getEnableBMSCIntegration()) &&
          b &&
          a === "TOP" &&
          e.push(
            l.jsx(
              c("BizKitLeftNavEditItem.react"),
              { editButtonRef: pa, isVisible: ga, position: e.length },
              "nav-edit"
            )
          );
        return e;
      }
      var pa = p(null);
      Z = H == null;
      Q = (a == null ? void 0 : a.bizkit_is_ig_login) === !0;
      H =
        (H =
          a == null
            ? void 0
            : (H = a.bizkit_scoping) == null
            ? void 0
            : H.should_show_edit_navigation_item) != null
          ? H
          : !1;
      var qa = w !== "ACCOUNT_SWITCHER" && (w != null || v != null);
      return l.jsx(c("LWIBizWebButtonActionContextProvider.react"), {
        children: l.jsx(c("BizKitIsIgLoginContext").Provider, {
          value: { bizKitIsIgLogin: Q },
          children: l.jsxs(c("BizKitNavigationCustomizationContext").Provider, {
            value: x,
            children: [
              O &&
                l.jsx("div", {
                  className: "x1c8ul09 x9f619 x5yr21d xh8yej3 x10l6tqk",
                }),
              l.jsxs("div", {
                className: "x5yr21d",
                ref: C,
                children: [
                  l.jsx("div", {
                    className: (j || (j = c("stylex")))(
                      t.globalNavContainer,
                      e && c("BizKitStyles").globalNavExpandedWidthStyle,
                      !e && c("BizKitStyles").globalNavCollapsedWidthStyle
                    ),
                    children: l.jsx("div", {
                      className: "x1rg5ohu x5yr21d x1n2onr6 x1vjfegm",
                      onMouseEnter: u,
                      onMouseLeave: E,
                      children: l.jsx(c("BizKitSidebarNavigation.react"), {
                        footer: l.jsx(c("BizKitLeftNavFooter.react"), {
                          businessCometHelpTraySideBarChatButtonQueryReference:
                            f,
                          children: l.jsx(c("BizKitSidebarSection.react"), {
                            label: d("BizKitStrings").SIDEBAR_SECTION_LABEL,
                            children: $("BOTTOM", !1),
                          }),
                        }),
                        header: l.jsx(c("BizKitLeftNavHeader.react"), {
                          setIsHovered: F,
                          currentTabName: S,
                          isCollapsed: T,
                          supportedAssetTypesForCurrentRoute: k,
                          scopeSelectorQueries: g,
                          onSelectLink: U,
                        }),
                        isCollapsed: T,
                        value: d(
                          "transformGlobalNavValue"
                        ).transformGlobalNavValue(
                          (O =
                            (x = (Q = w) != null ? Q : v) != null
                              ? x
                              : Z
                              ? "MORE_TOOLS"
                              : null) != null
                            ? O
                            : S
                        ),
                        children: l.jsx(c("BizKitSidebarSection.react"), {
                          label: d("BizKitStrings").SIDEBAR_SECTION_LABEL,
                          children: l.jsx("div", { children: $("TOP", H) }),
                        }),
                      }),
                    }),
                  }),
                  l.jsxs(c("BizKitErrorBoundary.react"), {
                    fallback: null,
                    children: [
                      (a == null ? void 0 : a.bizkit_scoping) != null &&
                        qa &&
                        l.jsx(c("HeroInteractionIgnoreWithDiv.react"), {
                          children: l.jsx(
                            c(
                              "BizKitLeftNavOverlayLayerHeroInteractionWrapper.react"
                            ),
                            { scoping: a == null ? void 0 : a.bizkit_scoping }
                          ),
                        }),
                      l.jsx(c("HeroInteractionIgnoreWithDiv.react"), {
                        children:
                          b("cr:2919") &&
                          l.jsx(c("CometDOMOnlyBoundary.react"), {
                            children: l.jsx(b("cr:2919"), {}),
                          }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { BizWebLeftNavShared_viewer } from "BizWebLeftNavShared_viewer.graphql";
import { BizWebLeftNavSharedLogPageVisitMutation } from "BizWebLeftNavSharedLogPageVisitMutation.graphql";
import { RelayHooks } from "RelayHooks";
import { CometDOMOnlyBoundary } from "CometDOMOnlyBoundary.react";
import { BizKitConstants } from "BizKitConstants";
import { recoverableViolation } from "recoverableViolation";
import { BizKitRouteContext } from "BizKitRouteContext";
import { BizKitOverlayContext } from "BizKitOverlayContext";
import { BizKitWelcomeTourContext } from "BizKitWelcomeTourContext";
import { useBizKitBaseLoggingData } from "useBizKitBaseLoggingData";
import { BizCoreTabItemImpressionFalcoEvent } from "BizCoreTabItemImpressionFalcoEvent";
import { useBizKitSelectedAssets } from "useBizKitSelectedAssets";
import { useDefineBizKitNavigationCustomizationContext } from "useDefineBizKitNavigationCustomizationContext";
import { XBizWebCometBizSuiteHomeControllerRouteBuilder } from "XBizWebCometBizSuiteHomeControllerRouteBuilder";
import { CometRouteMatch } from "CometRouteMatch";
import { BizSuiteHomeICERoute } from "BizSuiteHomeICERoute";
import { useBizWebCurrentRouteName } from "useBizWebCurrentRouteName";
import { useBizWebCurrentTabName } from "useBizWebCurrentTabName";
import { useBusinessCometLeftNavParams } from "useBusinessCometLeftNavParams";
import { BizKitLeftNavSaveMutation } from "BizKitLeftNavSaveMutation";
import { getIsEligibleForRemovePageDependencyBadging } from "getIsEligibleForRemovePageDependencyBadging.entrypointutils";
import { BizKitLeftNavSidebarItemContext } from "BizKitLeftNavSidebarItemContext";
import { BizKitLeftNavSidebarItem } from "BizKitLeftNavSidebarItem.react";
import { BizWebAdsOnboardingUtils } from "BizWebAdsOnboardingUtils";
import { CometVisualCompletionAttributes } from "CometVisualCompletionAttributes";
import { BizKitLeftNavDisabledPopoverForWABAAssetOnly } from "BizKitLeftNavDisabledPopoverForWABAAssetOnly.react";
import { BizKitLeftNavEditItem } from "BizKitLeftNavEditItem.react";
import { BizKitLeftNavFooter } from "BizKitLeftNavFooter.react";
import { BizKitLeftNavHeader } from "BizKitLeftNavHeader.react";
import { BizKitLeftNavOverlayLayerHeroInteractionWrapper } from "BizKitLeftNavOverlayLayerHeroInteractionWrapper.react";
import { HeroInteractionIgnoreWithDiv } from "HeroInteractionIgnoreWithDiv.react";
import { LWIBizWebButtonActionContextProvider } from "LWIBizWebButtonActionContextProvider.react";
import { BizKitIsIgLoginContext } from "BizKitIsIgLoginContext";
import { BizKitNavigationCustomizationContext } from "BizKitNavigationCustomizationContext";
import { BizKitSidebarNavigation } from "BizKitSidebarNavigation.react";
import { BizKitSidebarSection } from "BizKitSidebarSection.react";
import { BizKitStrings } from "BizKitStrings";
import { BizKitStyles } from "BizKitStyles";
import { BizKitTabTTITrackerUtils } from "BizKitTabTTITrackerUtils";
import { BizCoreNavBarHoverFalcoEvent } from "BizCoreNavBarHoverFalcoEvent";
import { useBizKitTabEnterExitFlow } from "useBizKitTabEnterExitFlow";
import { transformGlobalNavValue } from "transformGlobalNavValue";
import { justknobx } from "justknobx";
import { BMToMBSConsoldationGating } from "BMToMBSConsoldationGating";
import { BizKitErrorBoundary } from "BizKitErrorBoundary.react";

const HOVER_TIMEOUT = 300;

const styles = {
  globalNavContainer: {
    height: "x5yr21d",
    float: "xrbpyxo",
    $$css: true,
  },
};

interface BizWebLeftNavSharedProps {
  businessCometHelpTraySideBarChatButtonQueryReference: any;
  scopeSelectorQueries: any;
  supportedAssetTypesForCurrentRoute: any;
  viewer: BizWebLeftNavShared_viewer | null;
}

const BizWebLeftNavShared: React.FC<BizWebLeftNavSharedProps> = ({
  businessCometHelpTraySideBarChatButtonQueryReference,
  scopeSelectorQueries,
  supportedAssetTypesForCurrentRoute,
  viewer,
}) => {
  const routeName = useContext(BizKitRouteContext).routeName;
  const { activeOverlay, activeToolGroup } = useContext(BizKitOverlayContext);
  const {
    adsTabRef,
    inboxTabRef,
    insightsTabRef,
    footerSettingsRef,
    paidPartnershipsRef,
    plannerTabRef,
    getStartedTabRef,
  } = useContext(BizKitWelcomeTourContext);
  const baseLoggingData = useBizKitBaseLoggingData();

  const [data, refetch] = RelayHooks.useRefetchableFragment(
    BizWebLeftNavShared_viewer,
    viewer
  );

  const [logPageVisit] = RelayHooks.useMutation(
    BizWebLeftNavSharedLogPageVisitMutation
  );

  useEffect(() => {
    BizKitTabTTITrackerUtils.logLeftNavLoaded();
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditHovered, setIsEditHovered] = useState(false);
  const [isEditShown, setIsEditShown] = useState(false);
  const [editHoverTimeout, setEditHoverTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const navigationItems = data?.bizkit_scoping?.navigation_items ?? undefined;

  if (data == null) {
    recoverableViolation(
      "The data returned from BizWebLeftNavSharedRefreshQuery should not be null.",
      BizKitConstants.BIZKIT_PROJECT_NAME
    );
  } else if (data.bizkit_scoping == null) {
    recoverableViolation(
      "The bizkit_scoping field should not be null.",
      BizKitConstants.BIZKIT_PROJECT_NAME
    );
  } else if (navigationItems == null) {
    recoverableViolation(
      "The list of navigation items should not be null.",
      BizKitConstants.BIZKIT_PROJECT_NAME
    );
  }

  const { assetType, assetID } = useBizKitSelectedAssets();
  const isWhatsAppBusinessAccount = assetType === "WHATSAPP_BUSINESS_ACCOUNT";

  const defineNavigationCustomizationContext =
    useDefineBizKitNavigationCustomizationContext();

  const { shouldShowCustomizeYourMenuAnytimeTip, shouldOverlayMBSNavBar } =
    defineNavigationCustomizationContext;

  const topNavigationItemCount =
    navigationItems
      ?.filter((item) => item.position === "TOP")
      ?.length?.toString() ?? "0";

  const homeRoute = XBizWebCometBizSuiteHomeControllerRouteBuilder.buildURL({});
  const isHomeRoute =
    routeName === BizSuiteHomeICERoute.activeState?.routeName ||
    CometRouteMatch.useCurrentRouteMatcher(
      CometRouteMatch.MatchFunctions.pathMatchFunction
    )(homeRoute);

  const isBusinessHome = routeName === "BUSINESS_HOME";
  const currentRouteName = useBizWebCurrentRouteName();
  const isSettingsRoute = currentRouteName === "SETTINGS";
  const currentTabName = useBizWebCurrentTabName();

  const { isHomeUpsellVisible } = useContext(BizKitWelcomeTourContext);

  const isCollapsed =
    !isHomeUpsellVisible &&
    (!isBusinessHome || activeOverlay != null || activeToolGroup != null) &&
    (!isHovered || isEditShown) &&
    (!isHomeRoute || activeOverlay != null || activeToolGroup != null) &&
    !shouldShowCustomizeYourMenuAnytimeTip &&
    !(isHomeRoute && activeOverlay === "ACCOUNT_SWITCHER");

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const currentRef = containerRef.current;
      if (currentRef?.contains(e.target as Node)) {
        window.clearTimeout(editHoverTimeout);
        setEditHoverTimeout(
          window.setTimeout(() => {
            setIsHovered(true);
            setVisible(true);
            if (!isEditHovered) {
              BizCoreTabItemImpressionFalcoEvent.log(() => ({
                event_data: {
                  position: topNavigationItemCount,
                  badge_type: "no_badging",
                  target_tab: "edit_nav",
                  location: "GLOBAL_NAV",
                },
                client_timestamp_ms: Date.now(),
                ...baseLoggingData,
              }));
              setIsEditHovered(true);
            }
          }, HOVER_TIMEOUT)
        );
      }
    },
    [isEditHovered, editHoverTimeout, baseLoggingData, topNavigationItemCount]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const currentRef = containerRef.current;
      if (currentRef?.contains(e.target as Node)) {
        window.clearTimeout(editHoverTimeout);
        setVisible(false);
        setEditHoverTimeout(
          window.setTimeout(() => {
            setIsHovered(false);
            setIsEditShown(false);
          }, HOVER_TIMEOUT)
        );
      }
    },
    [editHoverTimeout]
  );

  useEffect(() => {
    return () => {
      window.clearTimeout(editHoverTimeout);
    };
  }, [editHoverTimeout]);

  const handleTabClick = useCallback(() => {
    setIsHovered(false);
  }, []);

  const loggedRef = useRef(true);
  useEffect(() => {
    if (
      loggedRef.current &&
      assetType === "PAGE" &&
      assetID != null &&
      justknobx._("1531")
    ) {
      logPageVisit({ variables: { asset_id: assetID } });
      loggedRef.current = false;
    }

    if (!isCollapsed) {
      BizCoreNavBarHoverFalcoEvent.log(() => ({
        event_data: {},
        client_timestamp_ms: Date.now(),
        ...baseLoggingData,
      }));
    }
  }, [assetID, assetType, logPageVisit, isCollapsed, baseLoggingData]);

  useBizKitTabEnterExitFlow(navigationItems ?? []);

  const currentTabValue = transformGlobalNavValue(currentTabName);
  const currentItem =
    (navigationItems ?? []).find(
      (item) =>
        transformGlobalNavValue(item.route_name) === currentTabValue ||
        item.reverse_shim_name === currentTabName
    ) ?? null;

  const getTabRef = (routeName: string) => {
    switch (routeName) {
      case "AD_CENTER":
        return adsTabRef;
      case "INBOX":
        return inboxTabRef;
      case "INSIGHTS":
        return insightsTabRef;
      case "SETTINGS":
        return footerSettingsRef;
      case "CREATOR_MARKETPLACE":
        return paidPartnershipsRef;
      case "CONTENT_CALENDAR":
        return plannerTabRef;
      case "GET_STARTED":
        return getStartedTabRef;
      default:
        return null;
    }
  };

  const [_isPending, startTransition] = useTransition();

  const { businessID, localScopeID, localScopes, localScopeType } =
    useBusinessCometLeftNavParams();

  const subscriptionRefs = getSubscriptionRefs(localScopeID, localScopes);

  RelayHooks.useSubscribeToInvalidationState(subscriptionRefs, () => {
    if (localScopeID != null) {
      startTransition(() => {
        refetch(
          {
            businessID,
            localScopeID,
            localScopes,
            localScopeType,
            isEligibleForNavV2: false,
          },
          { fetchPolicy: "network-only" }
        );
      });
    }
  });

  function getSubscriptionRefs(
    localScopeID: string | null,
    localScopes: any[] | null
  ): string[] {
    if (!getIsEligibleForRemovePageDependencyBadging()) {
      return [BizKitLeftNavSaveMutation.getHomeNavItemRelayID(localScopeID)];
    } else {
      return localScopes
        ? localScopes.map((scope) =>
            BizKitLeftNavSaveMutation.getHomeNavItemRelayID(scope.id)
          )
        : [];
    }
  }

  function renderItem(item: any, position: number) {
    switch (item.route_name) {
      case "POSTS":
        return (
          <BizKitLeftNavSidebarItemContext.Provider
            value={{
              onSelectLink: handleTabClick,
              position,
              shouldShowAsDisable: false,
            }}
            key={item.id}
          >
            <div ref={BizWebAdsOnboardingUtils.postsAndStoriesButtonRef}>
              <div
                ref={getTabRef(item.route_name)}
                {...CometVisualCompletionAttributes.IGNORE_DYNAMIC}
              >
                <BizKitLeftNavSidebarItem item={item} />
              </div>
            </div>
          </BizKitLeftNavSidebarItemContext.Provider>
        );
      case "INSIGHTS":
        return (
          <BizKitLeftNavSidebarItemContext.Provider
            value={{
              onSelectLink: handleTabClick,
              position,
              shouldShowAsDisable: false,
            }}
            key={item.id}
          >
            <div ref={BizWebAdsOnboardingUtils.adPerformanceButtonRef}>
              <div
                ref={getTabRef(item.route_name)}
                {...CometVisualCompletionAttributes.IGNORE_DYNAMIC}
              >
                <BizKitLeftNavSidebarItem item={item} />
              </div>
            </div>
          </BizKitLeftNavSidebarItemContext.Provider>
        );
      case "MONETIZATION":
        return (
          <BizKitLeftNavSidebarItemContext.Provider
            value={{
              onSelectLink: handleTabClick,
              position,
              shouldShowAsDisable: false,
            }}
            key={item.id}
          >
            <div
              ref={getTabRef(item.route_name)}
              {...CometVisualCompletionAttributes.IGNORE_DYNAMIC}
            >
              <BizKitLeftNavSidebarItem item={item} />
            </div>
          </BizKitLeftNavSidebarItemContext.Provider>
        );
      case "AD_CENTER":
        return (
          <BizKitLeftNavSidebarItemContext.Provider
            value={{
              onSelectLink: handleTabClick,
              position,
              shouldShowAsDisable: false,
            }}
            key={item.id}
          >
            <div ref={BizWebAdsOnboardingUtils.welcomeToAdsButtonRef}>
              <div
                ref={getTabRef(item.route_name)}
                {...CometVisualCompletionAttributes.IGNORE_DYNAMIC}
              >
                <BizKitLeftNavSidebarItem item={item} />
              </div>
            </div>
          </BizKitLeftNavSidebarItemContext.Provider>
        );
      default:
        return (
          <BizKitLeftNavSidebarItemContext.Provider
            value={{
              onSelectLink: handleTabClick,
              position,
              shouldShowAsDisable: false,
            }}
            key={item.id}
          >
            <div
              ref={getTabRef(item.route_name)}
              {...CometVisualCompletionAttributes.IGNORE_DYNAMIC}
            >
              <BizKitLeftNavSidebarItem item={item} />
            </div>
          </BizKitLeftNavSidebarItemContext.Provider>
        );
    }
  }

  function renderSection(position: "TOP" | "BOTTOM", showEditButton: boolean) {
    const items = navigationItems
      ?.filter((item) => item.position === position)
      ?.map((item, index) => {
        if (isWhatsAppBusinessAccount && item.name === "MORE_TOOLS") {
          return (
            <BizKitLeftNavSidebarItemContext.Provider
              value={{
                onSelectLink: handleTabClick,
                position: index,
                shouldShowAsDisable: true,
              }}
              key={item.id}
            >
              <div
                ref={getTabRef(item.route_name)}
                {...CometVisualCompletionAttributes.IGNORE_DYNAMIC}
              >
                <BizKitLeftNavDisabledPopoverForWABAAssetOnly>
                  <BizKitLeftNavSidebarItem item={item} />
                </BizKitLeftNavDisabledPopoverForWABAAssetOnly>
              </div>
            </BizKitLeftNavSidebarItemContext.Provider>
          );
        } else {
          return renderItem(item, index);
        }
      });

    if (
      !isWhatsAppBusinessAccount &&
      items &&
      !isBusinessHome &&
      !(
        isSettingsRoute && BMToMBSConsoldationGating.getEnableBMSCIntegration()
      ) &&
      showEditButton &&
      position === "TOP"
    ) {
      items.push(
        <BizKitLeftNavEditItem
          key="nav-edit"
          editButtonRef={editButtonRef}
          isVisible={isVisible}
          position={items.length}
        />
      );
    }

    return items;
  }

  const editButtonRef = useRef<HTMLDivElement | null>(null);

  const isLoading = currentItem == null;
  const isBizKitIsIgLogin = viewer?.bizkit_is_ig_login === true;
  const shouldShowEditNavigationItem =
    viewer?.bizkit_scoping?.should_show_edit_navigation_item ?? false;

  const shouldShowOverlay =
    activeOverlay !== "ACCOUNT_SWITCHER" &&
    (activeOverlay != null || activeToolGroup != null);

  return (
    <LWIBizWebButtonActionContextProvider>
      <BizKitIsIgLoginContext.Provider
        value={{ bizKitIsIgLogin: isBizKitIsIgLogin }}
      >
        <BizKitNavigationCustomizationContext.Provider
          value={defineNavigationCustomizationContext}
        >
          {shouldOverlayMBSNavBar && (
            <div className="x1c8ul09 x9f619 x5yr21d xh8yej3 x10l6tqk" />
          )}
          <div className="x5yr21d" ref={containerRef}>
            <div
              className={`${styles.globalNavContainer} ${
                isHomeRoute
                  ? BizKitStyles.globalNavExpandedWidthStyle
                  : BizKitStyles.globalNavCollapsedWidthStyle
              }`}
            >
              <div
                className="x1rg5ohu x5yr21d x1n2onr6 x1vjfegm"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <BizKitSidebarNavigation
                  footer={
                    <BizKitLeftNavFooter
                      businessCometHelpTraySideBarChatButtonQueryReference={
                        businessCometHelpTraySideBarChatButtonQueryReference
                      }
                    >
                      <BizKitSidebarSection
                        label={BizKitStrings.SIDEBAR_SECTION_LABEL}
                      >
                        {renderSection("BOTTOM", false)}
                      </BizKitSidebarSection>
                    </BizKitLeftNavFooter>
                  }
                  header={
                    <BizKitLeftNavHeader
                      setIsHovered={setIsHovered}
                      currentTabName={currentTabName}
                      isCollapsed={isCollapsed}
                      supportedAssetTypesForCurrentRoute={
                        supportedAssetTypesForCurrentRoute
                      }
                      scopeSelectorQueries={scopeSelectorQueries}
                      onSelectLink={handleTabClick}
                    />
                  }
                  isCollapsed={isCollapsed}
                  value={transformGlobalNavValue(
                    activeOverlay ?? activeToolGroup ?? isLoading
                      ? "MORE_TOOLS"
                      : currentTabName
                  )}
                >
                  <BizKitSidebarSection
                    label={BizKitStrings.SIDEBAR_SECTION_LABEL}
                  >
                    <div>
                      {renderSection("TOP", shouldShowEditNavigationItem)}
                    </div>
                  </BizKitSidebarSection>
                </BizKitSidebarNavigation>
              </div>
            </div>
            <BizKitErrorBoundary fallback={null}>
              {viewer?.bizkit_scoping != null && shouldShowOverlay && (
                <HeroInteractionIgnoreWithDiv>
                  <BizKitLeftNavOverlayLayerHeroInteractionWrapper
                    scoping={viewer.bizkit_scoping}
                  />
                </HeroInteractionIgnoreWithDiv>
              )}
            </BizKitErrorBoundary>
          </div>
        </BizKitNavigationCustomizationContext.Provider>
      </BizKitIsIgLoginContext.Provider>
    </LWIBizWebButtonActionContextProvider>
  );
};

BizWebLeftNavShared.displayName = `BizWebLeftNavShared`;

export default BizWebLeftNavShared;
