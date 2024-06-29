/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback } from "react";
import stylex from "@stylexjs/stylex";
import BizKitErrorBoundary from "BizKitErrorBoundary.react";
import BizKitLeftNavGating from "BizKitLeftNavGating";
import BizKitLeftNavHeaderAllToolsMenuButton from "BizKitLeftNavHeaderAllToolsMenuButton.react";
import BizKitLogoContainer from "BizKitLogoContainer.react";
import BizKitRelayEnvironmentFactory from "BizKitRelayEnvironmentFactory";
import BizSuiteBusinessHomeICERoute from "BizSuiteBusinessHomeICERoute";
import BizSuiteHomeICERoute from "BizSuiteHomeICERoute";
import BMToMBSConsoldationGating from "BMToMBSConsoldationGating";
import BusinessMigrationToNewScopingHelpers from "BusinessMigrationToNewScopingHelpers";
import BusinessUnifiedScopingSelectorContainer from "BusinessUnifiedScopingSelectorContainer.react";
import CometPageletWithDiv from "CometPageletWithDiv.react";
import { BizKitLeftNavSidebarItemContext } from "contexts";
import { BusinessCometScopeSelector } from "cr:2475";
import { NorthStarBusinessUnifiedScopingSelectorContainer } from "cr:8788";
import CurrentUser from "CurrentUser";
import { fbt } from "fbt";
import GeoFlexbox from "GeoFlexbox.react";
import geoMargin from "geoMargin";
import GeoPrivateWebPressable from "GeoPrivateWebPressable.react";
import GeoSidebarAppName from "GeoSidebarAppName.react";
import GeoSpinner from "GeoSpinner.react";
import GeoVStack from "GeoVStack.react";
import { useBizKitRedirect, useBusinessCometLeftNavParams } from "hooks";
import { RelayEnvironmentProvider } from "RelayHooks";
import UnifiedScopingSelectorGatings from "UnifiedScopingSelectorGatings";

__d(
  "BizKitLeftNavHeader.react",
  [
    "fbt",
    "BMToMBSConsoldationGating",
    "BizKitErrorBoundary.react",
    "BizKitLeftNavGating",
    "BizKitLeftNavHeaderAllToolsMenuButton.react",
    "BizKitLeftNavSidebarItemContext",
    "BizKitLogoContainer.react",
    "BizKitRelayEnvironmentFactory",
    "BizSuiteBusinessHomeICERoute",
    "BizSuiteHomeICERoute",
    "BusinessMigrationToNewScopingHelpers",
    "BusinessUnifiedScopingSelectorContainer.react",
    "CometPageletWithDiv.react",
    "CurrentUser",
    "GeoFlexbox.react",
    "GeoPrivateWebPressable.react",
    "GeoSidebarAppName.react",
    "GeoSpinner.react",
    "GeoVStack.react",
    "RelayHooks",
    "UnifiedScopingSelectorGatings",
    "cr:2475", // BusinessCometScopeSelector
    "cr:8788", // NorthStarBusinessUnifiedScopingSelectorContainer
    "geoMargin",
    "react",
    "stylex",
    "useBizKitRedirect",
    "useBusinessCometLeftNavParams",
  ],
  (a, b, c, d, e, f, g, h) => {
    let i;
    let j;
    const k = j || (j = d("react"));
    const l = j.useCallback;
    const m = {
      button: {
        alignItems: "x6s0dn4",
        display: "x78zum5",
        flexDirection: "x1q0g3np",
        height: "xwa7hi",
        $$css: !0,
      },
      buttonBizHomeRedesign: { height: "xc9qbxq", $$css: !0 },
      collapsedSelectorButton: {
        marginLeft: "x122ehjf",
        marginStart: null,
        marginEnd: null,
        marginRight: "x1g437uv",
        marginBottom: "x1i3j7dp",
        $$css: !0,
      },
    };
    function a(a) {
      let e = c("useBizKitRedirect")();
      const f = e.redirectToRoute;
      e = a.onSelectLink;
      let g = a.currentTabName;
      const j = a.setIsHovered;
      const n = babelHelpers.objectWithoutPropertiesLoose(a, [
        "onSelectLink",
        "currentTabName",
        "setIsHovered",
      ]);
      let o = g === "BUSINESS_HOME";
      const p = g === "SETTINGS";
      const q =
        (o ||
          (p && d("BMToMBSConsoldationGating").getEnableBMSCIntegration())) &&
        d("BizKitLeftNavGating").getShouldShowLeftNavBMRedesign();
      o = l(() => {
        !q
          ? f(c("BizSuiteHomeICERoute"))
          : p && f(c("BizSuiteBusinessHomeICERoute"));
      }, [p, f, q]);
      let r = c("useBusinessCometLeftNavParams")();
      const s = r.businessID;
      r = r.localScopeID;
      const t =
        q && !a.isCollapsed
          ? k.jsx(c("GeoSidebarAppName.react"), {
              xstyle: c("geoMargin").all0,
              children:
                p && d("BMToMBSConsoldationGating").getEnableBMSCIntegration()
                  ? h._("Settings")
                  : h._("Home"),
            })
          : null;
      g = d(
        "BusinessMigrationToNewScopingHelpers"
      ).mapRouteNameToBusinessToolName(g);
      return k.jsxs(c("GeoVStack.react"), {
        xstyle: c("geoMargin").bottom16,
        children: [
          q
            ? k.jsxs(c("GeoFlexbox.react"), {
                justifyContent: "space-between",
                alignItems: "center",
                direction: a.isCollapsed ? "column" : "row",
                children: [
                  k.jsx(c("GeoPrivateWebPressable.react"), {
                    accessibilityRole: "button",
                    accessibilityLabel: "Meta logo",
                    xstyle: [
                      m.button,
                      m.buttonBizHomeRedesign,
                      a.isCollapsed && c("geoMargin").bottom12,
                    ],
                    onPress: o,
                    children: k.jsx(c("BizKitLogoContainer.react"), {
                      isCollapsed: a.isCollapsed,
                      shouldShowBMLogo: q,
                    }),
                  }),
                  k.jsx(c("BizKitLeftNavHeaderAllToolsMenuButton.react"), {}),
                ],
              })
            : k.jsx(c("GeoPrivateWebPressable.react"), {
                accessibilityRole: "button",
                xstyle: m.button,
                onPress: o,
                children: k.jsx(c("BizKitLogoContainer.react"), {
                  isCollapsed: a.isCollapsed,
                }),
              }),
          t,
          k.jsx(c("BizKitErrorBoundary.react"), {
            fallback: null,
            children: k.jsx(d("RelayHooks").RelayEnvironmentProvider, {
              environment: c("BizKitRelayEnvironmentFactory").getForActorID(
                c("CurrentUser").getAccountID()
              ),
              children: k.jsx(d("CometPageletWithDiv.react").Placeholder, {
                name: "BizKitPresenceSelector",
                fallback: k.jsx(c("GeoSpinner.react"), {}),
                children:
                  g != null &&
                  d(
                    "BusinessMigrationToNewScopingHelpers"
                  ).getIsSupportedByScoping2(g)
                    ? k.jsx("div", {
                        className: (i || (i = c("stylex")))(
                          a.isCollapsed ? m.collapsedSelectorButton : null
                        ),
                        children: k.jsx(
                          c("BusinessUnifiedScopingSelectorContainer.react"),
                          {
                            businessToolName: g,
                            firstLevelScopeId: s,
                            zeroLevelScopeId: r,
                            isCollapsed: a.isCollapsed,
                          }
                        ),
                      })
                    : g != null &&
                      d(
                        "UnifiedScopingSelectorGatings"
                      ).shouldShowUnifiedScopingSelectorForMBSTools(g, !0) &&
                      b("cr:8788")
                    ? k.jsx("div", {
                        "data-testid": void 0,
                        className: (i || (i = c("stylex")))(
                          a.isCollapsed ? m.collapsedSelectorButton : null
                        ),
                        children: k.jsx(b("cr:8788"), {
                          businessToolName: g,
                          setMBSNavHovered: j,
                          isCollapsed: a.isCollapsed,
                          northStarUnifiedSelectorQueryRef:
                            (o = a.scopeSelectorQueries) == null
                              ? void 0
                              : o.northStarUnifiedSelectorQueryReference,
                          firstLevelScopeId: s,
                          zeroLevelScopeId: r,
                        }),
                      })
                    : k.jsx(
                        c("BizKitLeftNavSidebarItemContext").Provider,
                        {
                          value: {
                            onSelectLink: e,
                            position: 0,
                            shouldShowAsDisable: !1,
                          },
                          children: k.jsx(
                            b("cr:2475"),
                            babelHelpers["extends"]({}, n)
                          ),
                        },
                        "presenceSelector"
                      ),
              }),
            }),
          }),
        ],
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  226
);

const styles = {
  button: {
    alignItems: "x6s0dn4",
    display: "x78zum5",
    flexDirection: "x1q0g3np",
    height: "xwa7hi",
    $$css: true,
  },
  buttonBizHomeRedesign: {
    height: "xc9qbxq",
    $$css: true,
  },
  collapsedSelectorButton: {
    marginLeft: "x122ehjf",
    marginRight: "x1g437uv",
    marginBottom: "x1i3j7dp",
    $$css: true,
  },
};

interface Props {
  currentTabName: string;
  setIsHovered: (isHovered: boolean) => void;
  isCollapsed: boolean;
  onSelectLink: (link: string) => void;
  scopeSelectorQueries: any;
}

const BizKitLeftNavHeader: React.FC<Props> = ({
  currentTabName,
  setIsHovered,
  isCollapsed,
  onSelectLink,
  scopeSelectorQueries,
}) => {
  const { redirectToRoute } = useBizKitRedirect();
  const businessHomeRoute = useCallback(() => {
    const shouldShowBMRedesign =
      (currentTabName === "BUSINESS_HOME" ||
        (currentTabName === "SETTINGS" &&
          BMToMBSConsoldationGating.getEnableBMSCIntegration())) &&
      BizKitLeftNavGating.getShouldShowLeftNavBMRedesign();
    !shouldShowBMRedesign
      ? redirectToRoute(BizSuiteHomeICERoute)
      : currentTabName === "SETTINGS" &&
        redirectToRoute(BizSuiteBusinessHomeICERoute);
  }, [currentTabName, redirectToRoute]);

  const { businessID, localScopeID } = useBusinessCometLeftNavParams();
  const showRedesign =
    (currentTabName === "BUSINESS_HOME" ||
      (currentTabName === "SETTINGS" &&
        BMToMBSConsoldationGating.getEnableBMSCIntegration())) &&
    BizKitLeftNavGating.getShouldShowLeftNavBMRedesign();

  const headerTitle =
    showRedesign && !isCollapsed ? (
      <GeoSidebarAppName xstyle={geoMargin.all0}>
        {currentTabName === "SETTINGS" &&
        BMToMBSConsoldationGating.getEnableBMSCIntegration()
          ? fbt._("Settings")
          : fbt._("Home")}
      </GeoSidebarAppName>
    ) : null;

  const businessToolName =
    BusinessMigrationToNewScopingHelpers.mapRouteNameToBusinessToolName(
      currentTabName
    );

  return (
    <GeoVStack xstyle={geoMargin.bottom16}>
      {showRedesign ? (
        <GeoFlexbox
          justifyContent="space-between"
          alignItems="center"
          direction={isCollapsed ? "column" : "row"}
        >
          <GeoPrivateWebPressable
            accessibilityRole="button"
            accessibilityLabel="Meta logo"
            xstyle={[
              styles.button,
              styles.buttonBizHomeRedesign,
              isCollapsed && geoMargin.bottom12,
            ]}
            onPress={businessHomeRoute}
          >
            <BizKitLogoContainer
              isCollapsed={isCollapsed}
              shouldShowBMLogo={showRedesign}
            />
          </GeoPrivateWebPressable>
          <BizKitLeftNavHeaderAllToolsMenuButton />
        </GeoFlexbox>
      ) : (
        <GeoPrivateWebPressable
          accessibilityRole="button"
          xstyle={styles.button}
          onPress={businessHomeRoute}
        >
          <BizKitLogoContainer isCollapsed={isCollapsed} />
        </GeoPrivateWebPressable>
      )}
      {headerTitle}
      <BizKitErrorBoundary fallback={null}>
        <RelayEnvironmentProvider
          environment={BizKitRelayEnvironmentFactory.getForActorID(
            CurrentUser.getAccountID()
          )}
        >
          <CometPageletWithDiv.Placeholder
            name="BizKitPresenceSelector"
            fallback={<GeoSpinner />}
          >
            {businessToolName != null &&
            BusinessMigrationToNewScopingHelpers.getIsSupportedByScoping2(
              businessToolName
            ) ? (
              <div
                className={stylex(
                  isCollapsed ? styles.collapsedSelectorButton : null
                )}
              >
                <BusinessUnifiedScopingSelectorContainer
                  businessToolName={businessToolName}
                  firstLevelScopeId={businessID}
                  zeroLevelScopeId={localScopeID}
                  isCollapsed={isCollapsed}
                />
              </div>
            ) : businessToolName != null &&
              UnifiedScopingSelectorGatings.shouldShowUnifiedScopingSelectorForMBSTools(
                businessToolName,
                true
              ) &&
              NorthStarBusinessUnifiedScopingSelectorContainer ? (
              <div
                data-testid={undefined}
                className={stylex(
                  isCollapsed ? styles.collapsedSelectorButton : null
                )}
              >
                <NorthStarBusinessUnifiedScopingSelectorContainer
                  businessToolName={businessToolName}
                  setMBSNavHovered={setIsHovered}
                  isCollapsed={isCollapsed}
                  northStarUnifiedSelectorQueryRef={
                    scopeSelectorQueries?.northStarUnifiedSelectorQueryReference
                  }
                  firstLevelScopeId={businessID}
                  zeroLevelScopeId={localScopeID}
                />
              </div>
            ) : (
              <BizKitLeftNavSidebarItemContext.Provider
                value={{
                  onSelectLink,
                  position: 0,
                  shouldShowAsDisable: false,
                }}
              >
                <BusinessCometScopeSelector {...scopeSelectorQueries} />
              </BizKitLeftNavSidebarItemContext.Provider>
            )}
          </CometPageletWithDiv.Placeholder>
        </RelayEnvironmentProvider>
      </BizKitErrorBoundary>
    </GeoVStack>
  );
};

BizKitLeftNavHeader.displayName = `${BizKitLeftNavHeader.name}`;

export default BizKitLeftNavHeader;
