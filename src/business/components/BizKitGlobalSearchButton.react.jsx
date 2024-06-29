// __d(
//   "BizKitGlobalSearchButton.react",
//   [
//     "ix",
//     "BMToMBSConsoldationGating",
//     "BizKitGlobalSearchStrings",
//     "BizKitSidebarItem.react",
//     "Image.react",
//     "MBSNavigationBizLevelHomeQueryRenderer.entrypoint",
//     "MBSNavigationSearchToolQueryRenderer.entrypoint",
//     "getLocalScopesQueryParam",
//     "react",
//     "requireDeferred",
//     "useBizKitAssets",
//     "useBizWebCurrentRouteName",
//     "useGeoEntryPointModal",
//     "useGlobalScope",
//   ],
//   function (a, b, c, d, e, f, g, h) {
//     "use strict";
//     var i,
//       j = i || (i = d("react"));
//     b = i;
//     var k = b.useCallback,
//       l = b.useEffect,
//       m = b.useRef,
//       n = c("requireDeferred")("MbsGlobalSearchFalcoEvent").__setRef(
//         "BizKitGlobalSearchButton.react"
//       ),
//       o = h("1285100");
//     function a() {
//       var a = c("useBizWebCurrentRouteName")(),
//         b =
//           a === "BUSINESS_HOME" ||
//           (a === "SETTINGS" &&
//             d("BMToMBSConsoldationGating").getEnableBMSCIntegration()),
//         e = c("useGlobalScope")();
//       e = e.type === "PERSONAL" ? null : e.id;
//       var f = c("useBizKitAssets")(["PAGE"]),
//         g = f.filter(function (a) {
//           return a.type === "PAGE";
//         }),
//         h = null;
//       g.length > 0 ? (h = g[0]) : f.length > 0 && (h = f[0]);
//       g = null;
//       f !== null && h !== null && (g = f);
//       var i = m(!1);
//       f = c("useGeoEntryPointModal")(
//         c("MBSNavigationSearchToolQueryRenderer.entrypoint"),
//         { entrypoint: "LEFT_NAV_FOOTER", localScopes: g },
//         {
//           pageSettingsToolVariables: { pageID: g != null ? g[0].id : "" },
//           toolVariables: {
//             businessID: e,
//             localScopes: c("getLocalScopesQueryParam")(
//               (h = g) != null ? h : []
//             ),
//           },
//         }
//       );
//       g = f.modal;
//       var p = f.showModal;
//       h = c("useGeoEntryPointModal")(
//         c("MBSNavigationBizLevelHomeQueryRenderer.entrypoint"),
//         { entrypoint: "LEFT_NAV_FOOTER" },
//         { variables: { businessID: e, routeName: a } }
//       );
//       f = h.modal;
//       var q = h.showModal;
//       l(function () {
//         i.current === !1 &&
//           ((i.current = !0),
//           n.onReady(function (b) {
//             return b.log(function () {
//               return {
//                 entrypoint: "LEFT_NAV_FOOTER",
//                 event_type: "BUTTON_IMPRESSION",
//                 nav_item: a,
//                 search_term: "",
//                 tool_click: "none",
//               };
//             });
//           }));
//       });
//       e = k(
//         function () {
//           n.onReady(function (b) {
//             return b.log(function () {
//               return {
//                 entrypoint: "LEFT_NAV_FOOTER",
//                 event_type: "BUTTON_CLICK",
//                 nav_item: a,
//                 search_term: "",
//                 tool_click: "none",
//               };
//             });
//           }),
//             b ? q() : p();
//         },
//         [a, b, q, p]
//       );
//       return j.jsxs(j.Fragment, {
//         children: [
//           j.jsx(c("BizKitSidebarItem.react"), {
//             icon: j.jsx(c("Image.react"), { src: o }),
//             iconActive: j.jsx(c("Image.react"), { src: o }),
//             isFirst: !1,
//             label: d("BizKitGlobalSearchStrings").SEARCH,
//             onActivate: e,
//             value: d("BizKitGlobalSearchStrings").SEARCH,
//           }),
//           b ? f : g,
//         ],
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, { useCallback, useEffect, useRef } from "react";
import { ix as iconSrc } from "ix";
import { getEnableBMSCIntegration } from "BMToMBSConsoldationGating";
import { SEARCH as SEARCH_LABEL } from "BizKitGlobalSearchStrings";
import BizKitSidebarItem from "BizKitSidebarItem.react";
import Image from "Image.react";
import MBSNavigationBizLevelHomeQueryRenderer from "MBSNavigationBizLevelHomeQueryRenderer.entrypoint";
import MBSNavigationSearchToolQueryRenderer from "MBSNavigationSearchToolQueryRenderer.entrypoint";
import { getLocalScopesQueryParam } from "getLocalScopesQueryParam";
import { requireDeferred } from "requireDeferred";
import { useBizKitAssets } from "useBizKitAssets";
import { useBizWebCurrentRouteName } from "useBizWebCurrentRouteName";
import { useGeoEntryPointModal } from "useGeoEntryPointModal";
import { useGlobalScope } from "useGlobalScope";

const MbsGlobalSearchFalcoEvent = requireDeferred(
  "MbsGlobalSearchFalcoEvent"
).__setRef("BizKitGlobalSearchButton.react");
const searchIcon = iconSrc("1285100");

const BizKitGlobalSearchButton: React.FC = () => {
  const currentRouteName = useBizWebCurrentRouteName();
  const isBusinessHome = currentRouteName === "BUSINESS_HOME";
  const enableBMSCIntegration = getEnableBMSCIntegration();
  const isSettingsWithBMSCIntegration =
    currentRouteName === "SETTINGS" && enableBMSCIntegration;
  const isHomeOrSettings = isBusinessHome || isSettingsWithBMSCIntegration;

  const globalScope = useGlobalScope();
  const businessID = globalScope.type === "PERSONAL" ? null : globalScope.id;

  const assets = useBizKitAssets(["PAGE"]);
  const firstPageAsset =
    assets.find((asset) => asset.type === "PAGE") || assets[0];
  const localScopes = firstPageAsset ? [firstPageAsset] : null;

  const modalInitializedRef = useRef(false);

  const searchModal = useGeoEntryPointModal(
    MBSNavigationSearchToolQueryRenderer,
    { entrypoint: "LEFT_NAV_FOOTER", localScopes },
    {
      pageSettingsToolVariables: {
        pageID: localScopes ? localScopes[0].id : "",
      },
      toolVariables: {
        businessID,
        localScopes: getLocalScopesQueryParam(localScopes || []),
      },
    }
  );

  const homeModal = useGeoEntryPointModal(
    MBSNavigationBizLevelHomeQueryRenderer,
    { entrypoint: "LEFT_NAV_FOOTER" },
    { variables: { businessID, routeName: currentRouteName } }
  );

  useEffect(() => {
    if (!modalInitializedRef.current) {
      modalInitializedRef.current = true;
      MbsGlobalSearchFalcoEvent.onReady((logger) =>
        logger.log(() => ({
          entrypoint: "LEFT_NAV_FOOTER",
          event_type: "BUTTON_IMPRESSION",
          nav_item: currentRouteName,
          search_term: "",
          tool_click: "none",
        }))
      );
    }
  }, [currentRouteName]);

  const handleActivate = useCallback(() => {
    MbsGlobalSearchFalcoEvent.onReady((logger) =>
      logger.log(() => ({
        entrypoint: "LEFT_NAV_FOOTER",
        event_type: "BUTTON_CLICK",
        nav_item: currentRouteName,
        search_term: "",
        tool_click: "none",
      }))
    );
    if (isHomeOrSettings) {
      homeModal.showModal();
    } else {
      searchModal.showModal();
    }
  }, [currentRouteName, isHomeOrSettings, homeModal, searchModal]);

  return (
    <>
      <BizKitSidebarItem
        icon={<Image src={searchIcon} />}
        iconActive={<Image src={searchIcon} />}
        isFirst={false}
        label={SEARCH_LABEL}
        onActivate={handleActivate}
        value={SEARCH_LABEL}
      />
      {isHomeOrSettings ? homeModal.modal : searchModal.modal}
    </>
  );
};

BizKitGlobalSearchButton.displayName = `${BizKitGlobalSearchButton.name}`;

export default BizKitGlobalSearchButton;
