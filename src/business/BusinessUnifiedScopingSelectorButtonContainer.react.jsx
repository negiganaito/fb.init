// __d(
//   "BusinessUnifiedScopingSelectorButtonContainer.react",
//   [
//     "AdsPEMainAppWithLeftNavigationContext.react",
//     "BusinessToolNameEnumUtils.facebook",
//     "BusinessUnifiedScopingSelectorCollapsedButton.react",
//     "BusinessUnifiedScopingSelectorContext",
//     "BusinessUnifiedScopingSelectorEventsLoggingUtils",
//     "BusinessUnifiedScopingSelectorExpandedButton.react",
//     "BusinessUnifiedScopingSelectorExpandedFirstAndZeroLevelScopeButton.react",
//     "BusinessUnifiedScopingSelectorPopoverContainer.entrypoint",
//     "BusinessUnifiedScopingSelectorPopoverLoadingState.react",
//     "BusinessUnifiedScopingSelectorUtils",
//     "CometPlaceholder.react",
//     "RelayHooks",
//     "nullthrows",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react"));
//     b = h;
//     var j = b.useContext,
//       k = b.useEffect,
//       l = b.useMemo,
//       m = b.useRef,
//       n = b.useState;
//     function a(a) {
//       var b = a.firstLevelScopeId,
//         e = a.zeroLevelScopeId;
//       a = m(null);
//       var f = j(c("BusinessUnifiedScopingSelectorContext")),
//         g = f.businessToolName,
//         h = f.currentFirstLevelScope,
//         o = f.currentScope,
//         p = f.debouncedSearchString,
//         q = f.isCollapsed,
//         r = f.loggingData,
//         s = f.lowestBusinessScopeLevel,
//         t = f.mapSearchStringToBusinessScopesShownNumber,
//         u = f.onCollapsedChange,
//         v = f.runtimeSite,
//         w = f.setIsShowPopoverContentForAllZeroLevelScopes,
//         x = j(c("AdsPEMainAppWithLeftNavigationContext.react"));
//       f = n(!1);
//       var y = f[0],
//         z = f[1],
//         A = d("RelayHooks").useRelayEnvironment();
//       f = l(
//         function () {
//           return {
//             getEnvironment: function () {
//               return A;
//             },
//           };
//         },
//         [A]
//       );
//       f = d("RelayHooks").useEntryPointLoader(
//         f,
//         c("BusinessUnifiedScopingSelectorPopoverContainer.entrypoint")
//       );
//       var B = f[0],
//         C = f[1];
//       f = function () {
//         d(
//           "BusinessUnifiedScopingSelectorEventsLoggingUtils"
//         ).logUserActionEvent(
//           "scope_selector_button",
//           "selector_dropdown_clicked",
//           r
//         );
//         if (!y) {
//           var a;
//           C({
//             businessToolName: c("nullthrows")(
//               d("BusinessToolNameEnumUtils.facebook").fromJSEnum(g)
//             ),
//             contextUri: d(
//               "BusinessUnifiedScopingSelectorUtils"
//             ).getContextUri(),
//             fetchNumberForBusinessScopes:
//               d(
//                 "BusinessUnifiedScopingSelectorUtils"
//               ).getLastBusinessScopesNumberShownToUser(
//                 t,
//                 s,
//                 (a = p) != null ? a : ""
//               ) +
//               d(
//                 "BusinessUnifiedScopingSelectorUtils"
//               ).getNextPaginationFetchNumber(s),
//             fetchNumberForChildrenScopes: d(
//               "BusinessUnifiedScopingSelectorUtils"
//             ).INITIAL_ZERO_LEVEL_SCOPES_NUMBER,
//             firstLevelScopeId: b,
//             searchInput: (a = p) != null ? a : "",
//             zeroLevelScopeId: e,
//           });
//           w(!1);
//         }
//         z(!y);
//       };
//       k(
//         function () {
//           x == null ? void 0 : x.setShouldOverlayAdsPEMainApp(y);
//         },
//         [y, x]
//       );
//       k(
//         function () {
//           var a = new URLSearchParams(location.search);
//           a = a.get("redirect_session_id");
//           d(
//             "BusinessUnifiedScopingSelectorEventsLoggingUtils"
//           ).logImpressionEvent(
//             "scope_selector_button",
//             babelHelpers["extends"]({}, r, { redirect_session_id: a })
//           );
//         },
//         [r]
//       );
//       return i.jsxs(i.Fragment, {
//         children: [
//           q
//             ? i.jsx(c("BusinessUnifiedScopingSelectorCollapsedButton.react"), {
//                 isCollapsed: q,
//                 onCollapsedChange: u,
//                 scopePictureUri: o == null ? void 0 : o.imageUri,
//                 scopeType: o == null ? void 0 : o.scopeType,
//               })
//             : i.jsx(i.Fragment, {
//                 children:
//                   v ===
//                     d("BusinessUnifiedScopingSelectorUtils").RuntimeSite
//                       .ADS_MANAGER && s === 0
//                     ? i.jsx("div", {
//                         ref: a,
//                         children: i.jsx(
//                           c(
//                             "BusinessUnifiedScopingSelectorExpandedFirstAndZeroLevelScopeButton.react"
//                           ),
//                           {
//                             currentFirstLevelScope: h,
//                             currentZeroLevelScope: o,
//                             isOpenPopover: y,
//                             onClickSelectorButton: f,
//                           }
//                         ),
//                       })
//                     : i.jsx("div", {
//                         ref: a,
//                         children: i.jsx(
//                           c(
//                             "BusinessUnifiedScopingSelectorExpandedButton.react"
//                           ),
//                           {
//                             isOpenPopover: y,
//                             onClickSelectorButton: f,
//                             scopeId: o == null ? void 0 : o.scopeId,
//                             scopeName: o == null ? void 0 : o.scopeName,
//                             scopePictureUri: o == null ? void 0 : o.imageUri,
//                             scopeType: o == null ? void 0 : o.scopeType,
//                           }
//                         ),
//                       }),
//               }),
//           B != null && !q
//             ? i.jsx(c("CometPlaceholder.react"), {
//                 fallback: i.jsx(
//                   c("BusinessUnifiedScopingSelectorPopoverLoadingState.react"),
//                   { selectorRef: a, shouldShowInputLoadingState: !0 }
//                 ),
//                 children: i.jsx(d("RelayHooks").EntryPointContainer, {
//                   entryPointReference: B,
//                   props: {
//                     isOpenPopover: y,
//                     setIsOpenPopOver: z,
//                     unifiedSelectorRef: a,
//                   },
//                 }),
//               })
//             : null,
//         ],
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import AdsPEMainAppWithLeftNavigationContext from "AdsPEMainAppWithLeftNavigationContext.react";
import { BusinessToolNameEnumUtils } from "BusinessToolNameEnumUtils.facebook";
import BusinessUnifiedScopingSelectorCollapsedButton from "BusinessUnifiedScopingSelectorCollapsedButton.react";
import { BusinessUnifiedScopingSelectorContext } from "BusinessUnifiedScopingSelectorContext";
import {
  logUserActionEvent,
  logImpressionEvent,
} from "BusinessUnifiedScopingSelectorEventsLoggingUtils";
import BusinessUnifiedScopingSelectorExpandedButton from "BusinessUnifiedScopingSelectorExpandedButton.react";
import BusinessUnifiedScopingSelectorExpandedFirstAndZeroLevelScopeButton from "BusinessUnifiedScopingSelectorExpandedFirstAndZeroLevelScopeButton.react";
import BusinessUnifiedScopingSelectorPopoverContainer from "BusinessUnifiedScopingSelectorPopoverContainer.entrypoint";
import BusinessUnifiedScopingSelectorPopoverLoadingState from "BusinessUnifiedScopingSelectorPopoverLoadingState.react";
import {
  getContextUri,
  getLastBusinessScopesNumberShownToUser,
  getNextPaginationFetchNumber,
  INITIAL_ZERO_LEVEL_SCOPES_NUMBER,
  RuntimeSite,
} from "BusinessUnifiedScopingSelectorUtils";
import { CometPlaceholder } from "CometPlaceholder.react";
import {
  useRelayEnvironment,
  useEntryPointLoader,
  EntryPointContainer,
} from "RelayHooks";
import nullthrows from "nullthrows";

interface Props {
  firstLevelScopeId: string;
  zeroLevelScopeId: string;
}

const BusinessUnifiedScopingSelectorButtonContainer: React.FC<Props> = ({
  firstLevelScopeId,
  zeroLevelScopeId,
}) => {
  const unifiedSelectorRef = useRef<HTMLDivElement>(null);
  const {
    businessToolName,
    currentFirstLevelScope,
    currentScope,
    debouncedSearchString,
    isCollapsed,
    loggingData,
    lowestBusinessScopeLevel,
    mapSearchStringToBusinessScopesShownNumber,
    onCollapsedChange,
    runtimeSite,
    setIsShowPopoverContentForAllZeroLevelScopes,
  } = useContext(BusinessUnifiedScopingSelectorContext);
  const adsContext = useContext(AdsPEMainAppWithLeftNavigationContext);

  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const environment = useRelayEnvironment();

  const entryPointLoaderContext = useMemo(
    () => ({
      getEnvironment: () => environment,
    }),
    [environment]
  );

  const [entryPointReference, loadEntryPoint] = useEntryPointLoader(
    entryPointLoaderContext,
    BusinessUnifiedScopingSelectorPopoverContainer
  );

  const handleSelectorButtonClick = () => {
    logUserActionEvent(
      "scope_selector_button",
      "selector_dropdown_clicked",
      loggingData
    );

    if (!isOpenPopover) {
      loadEntryPoint({
        businessToolName: nullthrows(
          BusinessToolNameEnumUtils.fromJSEnum(businessToolName)
        ),
        contextUri: getContextUri(),
        fetchNumberForBusinessScopes:
          getLastBusinessScopesNumberShownToUser(
            mapSearchStringToBusinessScopesShownNumber,
            lowestBusinessScopeLevel,
            debouncedSearchString ?? ""
          ) + getNextPaginationFetchNumber(lowestBusinessScopeLevel),
        fetchNumberForChildrenScopes: INITIAL_ZERO_LEVEL_SCOPES_NUMBER,
        firstLevelScopeId,
        searchInput: debouncedSearchString ?? "",
        zeroLevelScopeId,
      });
      setIsShowPopoverContentForAllZeroLevelScopes(false);
    }

    setIsOpenPopover(!isOpenPopover);
  };

  useEffect(() => {
    adsContext?.setShouldOverlayAdsPEMainApp(isOpenPopover);
  }, [isOpenPopover, adsContext]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectSessionId = params.get("redirect_session_id");
    logImpressionEvent("scope_selector_button", {
      ...loggingData,
      redirect_session_id: redirectSessionId,
    });
  }, [loggingData]);

  return (
    <>
      {isCollapsed ? (
        <BusinessUnifiedScopingSelectorCollapsedButton
          isCollapsed={isCollapsed}
          onCollapsedChange={onCollapsedChange}
          scopePictureUri={currentScope?.imageUri}
          scopeType={currentScope?.scopeType}
        />
      ) : (
        <>
          {runtimeSite === RuntimeSite.ADS_MANAGER &&
          lowestBusinessScopeLevel === 0 ? (
            <div ref={unifiedSelectorRef}>
              <BusinessUnifiedScopingSelectorExpandedFirstAndZeroLevelScopeButton
                currentFirstLevelScope={currentFirstLevelScope}
                currentZeroLevelScope={currentScope}
                isOpenPopover={isOpenPopover}
                onClickSelectorButton={handleSelectorButtonClick}
              />
            </div>
          ) : (
            <div ref={unifiedSelectorRef}>
              <BusinessUnifiedScopingSelectorExpandedButton
                isOpenPopover={isOpenPopover}
                onClickSelectorButton={handleSelectorButtonClick}
                scopeId={currentScope?.scopeId}
                scopeName={currentScope?.scopeName}
                scopePictureUri={currentScope?.imageUri}
                scopeType={currentScope?.scopeType}
              />
            </div>
          )}
        </>
      )}
      {entryPointReference != null && !isCollapsed && (
        <CometPlaceholder
          fallback={
            <BusinessUnifiedScopingSelectorPopoverLoadingState
              selectorRef={unifiedSelectorRef}
              shouldShowInputLoadingState
            />
          }
        >
          <EntryPointContainer
            entryPointReference={entryPointReference}
            props={{
              isOpenPopover,
              setIsOpenPopOver: setIsOpenPopover,
              unifiedSelectorRef,
            }}
          />
        </CometPlaceholder>
      )}
    </>
  );
};

BusinessUnifiedScopingSelectorButtonContainer.displayName = `${BusinessUnifiedScopingSelectorButtonContainer.name} [from ${__filename}]`;

export default BusinessUnifiedScopingSelectorButtonContainer;
