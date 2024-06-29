// __d(
//   "BizKitLeftNavEditItem.react",
//   [
//     "fbt",
//     "BizCoreNavCustomizationModalExitFlowFalcoEvent",
//     "BizCoreTabItemClickFalcoEvent",
//     "BizKitLeftNavEditDiscardConfirmationModal.react",
//     "BizKitLeftNavEditModal.entrypoint",
//     "BizKitNavigationCustomizationContext",
//     "GeoButton.react",
//     "WebPixelRatio",
//     "react",
//     "stylex",
//     "useBizKitBaseLoggingData",
//     "useBizKitSelectedAssets",
//     "useBoolean",
//     "useGeoEntryPointModal",
//     "useGlobalScope",
//   ],
//   function (a, b, c, d, e, f, g, h) {
//     "use strict";
//     var i,
//       j,
//       k = j || (j = d("react"));
//     b = j;
//     var l = b.useContext,
//       m = b.useEffect,
//       n = {
//         container: {
//           opacity: "x1hc1fzr",
//           transitionProperty: "x19991ni",
//           transitionDuration: "x13dflua",
//           marginTop: "x14vqqas",
//           marginBottom: "xod5an3",
//           $$css: !0,
//         },
//         containerHidden: { opacity: "xg01cxk", $$css: !0 },
//       };
//     function a(a) {
//       var b = a.editButtonRef,
//         e = a.isVisible,
//         f = a.position;
//       a = c("useBoolean")(!1);
//       var g = a.value,
//         j = a.setTrue,
//         o = a.setFalse;
//       a = l(c("BizKitNavigationCustomizationContext"));
//       var p = a.shouldShowCustomizeYourMenuAnytimeTip,
//         q = a.setShowLeftNavEditModal;
//       a = c("useGlobalScope")();
//       var r = c("useBizKitSelectedAssets")(),
//         s = r.assetID,
//         t = r.assetType,
//         u = c("useBizKitBaseLoggingData")();
//       r = c("useGeoEntryPointModal")(
//         c("BizKitLeftNavEditModal.entrypoint"),
//         {
//           onBeforeHide: function (a) {
//             if (a === "blur") {
//               j();
//               return !1;
//             }
//             c("BizCoreNavCustomizationModalExitFlowFalcoEvent").log(
//               function () {
//                 return babelHelpers["extends"](
//                   {
//                     event_data: { hide_source: a },
//                     client_timestamp_ms: Date.now(),
//                   },
//                   u
//                 );
//               }
//             );
//             return !0;
//           },
//         },
//         {
//           globalScopeID: a.id,
//           localScopeID: (r = s) != null ? r : "",
//           localScopeType: (a = t) != null ? a : "PAGE",
//           scale: d("WebPixelRatio").get(),
//         }
//       );
//       var v = r.showModal,
//         w = r.hideModal;
//       a = r.modal;
//       r = r.isLoading;
//       m(
//         function () {
//           q(function () {
//             return v;
//           });
//         },
//         [q, v]
//       );
//       return k.jsxs("div", {
//         className: (i || (i = c("stylex")))(
//           n.container,
//           !e && !p && n.containerHidden
//         ),
//         "data-testid": void 0,
//         children: [
//           k.jsx("div", {
//             className: "x178xt8z x13fuv20 xkbhlo x1ptxcow x1e56ztr",
//           }),
//           k.jsx(c("GeoButton.react"), {
//             containerRef: b,
//             variant: "flat",
//             label: h._("Edit"),
//             isLoading: r,
//             onClick: function () {
//               s != null &&
//                 t != null &&
//                 (v(),
//                 c("BizCoreTabItemClickFalcoEvent").log(function () {
//                   return babelHelpers["extends"](
//                     {
//                       event_data: {
//                         position: f.toString(),
//                         badge_type: "no_badging",
//                         target_tab: "edit_nav",
//                         location: "GLOBAL_NAV",
//                       },
//                       client_timestamp_ms: Date.now(),
//                     },
//                     u
//                   );
//                 }));
//             },
//             "data-testid": void 0,
//           }),
//           a,
//           g &&
//             k.jsx(c("BizKitLeftNavEditDiscardConfirmationModal.react"), {
//               onCancel: function () {
//                 o();
//               },
//               onConfirm: function () {
//                 o(),
//                   w(),
//                   c("BizCoreNavCustomizationModalExitFlowFalcoEvent").log(
//                     function () {
//                       return babelHelpers["extends"](
//                         {
//                           event_data: { hide_source: "escape" },
//                           client_timestamp_ms: Date.now(),
//                         },
//                         u
//                       );
//                     }
//                   );
//               },
//             }),
//         ],
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   226
// );

import { fbt } from "fbt";
import { BizCoreNavCustomizationModalExitFlowFalcoEvent } from "BizCoreNavCustomizationModalExitFlowFalcoEvent";
import { BizCoreTabItemClickFalcoEvent } from "BizCoreTabItemClickFalcoEvent";
import BizKitLeftNavEditDiscardConfirmationModal from "BizKitLeftNavEditDiscardConfirmationModal.react";
import BizKitLeftNavEditModalEntrypoint from "BizKitLeftNavEditModal.entrypoint";
import { BizKitNavigationCustomizationContext } from "BizKitNavigationCustomizationContext";
import GeoButton from "GeoButton.react";
import { WebPixelRatio } from "WebPixelRatio";
import React, { useContext, useEffect } from "react";
import { stylex } from "stylex";
import { useBizKitBaseLoggingData } from "useBizKitBaseLoggingData";
import { useBizKitSelectedAssets } from "useBizKitSelectedAssets";
import { useBoolean } from "useBoolean";
import { useGeoEntryPointModal } from "useGeoEntryPointModal";
import { useGlobalScope } from "useGlobalScope";

interface BizKitLeftNavEditItemProps {
  editButtonRef: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  position: number;
}

const styles = {
  container: {
    opacity: "x1hc1fzr",
    transitionProperty: "x19991ni",
    transitionDuration: "x13dflua",
    marginTop: "x14vqqas",
    marginBottom: "xod5an3",
  },
  containerHidden: { opacity: "xg01cxk" },
};

const BizKitLeftNavEditItem: React.FC<BizKitLeftNavEditItemProps> = ({
  editButtonRef,
  isVisible,
  position,
}) => {
  const {
    value: isConfirmationVisible,
    setTrue: showConfirmation,
    setFalse: hideConfirmation,
  } = useBoolean(false);
  const { shouldShowCustomizeYourMenuAnytimeTip, setShowLeftNavEditModal } =
    useContext(BizKitNavigationCustomizationContext);
  const globalScope = useGlobalScope();
  const { assetID, assetType } = useBizKitSelectedAssets();
  const loggingData = useBizKitBaseLoggingData();

  const { showModal, hideModal, modal, isLoading } = useGeoEntryPointModal(
    BizKitLeftNavEditModalEntrypoint,
    {
      onBeforeHide: (source) => {
        if (source === "blur") {
          showConfirmation();
          return false;
        }
        BizCoreNavCustomizationModalExitFlowFalcoEvent.log(() => ({
          event_data: { hide_source: source },
          client_timestamp_ms: Date.now(),
          ...loggingData,
        }));
        return true;
      },
    },
    {
      globalScopeID: globalScope.id,
      localScopeID: assetID ?? "",
      localScopeType: assetType ?? "PAGE",
      scale: WebPixelRatio.get(),
    }
  );

  useEffect(() => {
    setShowLeftNavEditModal(() => showModal);
  }, [setShowLeftNavEditModal, showModal]);

  return (
    <div
      className={stylex(
        styles.container,
        !isVisible &&
          !shouldShowCustomizeYourMenuAnytimeTip &&
          styles.containerHidden
      )}
      data-testid={undefined}
    >
      <div className="x178xt8z x13fuv20 xkbhlo x1ptxcow x1e56ztr" />
      <GeoButton
        containerRef={editButtonRef}
        variant="flat"
        label={fbt._("Edit")}
        isLoading={isLoading}
        onClick={() => {
          if (assetID != null && assetType != null) {
            showModal();
            BizCoreTabItemClickFalcoEvent.log(() => ({
              event_data: {
                position: position.toString(),
                badge_type: "no_badging",
                target_tab: "edit_nav",
                location: "GLOBAL_NAV",
              },
              client_timestamp_ms: Date.now(),
              ...loggingData,
            }));
          }
        }}
        data-testid={undefined}
      />
      {modal}
      {isConfirmationVisible && (
        <BizKitLeftNavEditDiscardConfirmationModal
          onCancel={hideConfirmation}
          onConfirm={() => {
            hideConfirmation();
            hideModal();
            BizCoreNavCustomizationModalExitFlowFalcoEvent.log(() => ({
              event_data: { hide_source: "escape" },
              client_timestamp_ms: Date.now(),
              ...loggingData,
            }));
          }}
        />
      )}
    </div>
  );
};

BizKitLeftNavEditItem.displayName = `${BizKitLeftNavEditItem.name} [from some-module-id]`;

export default BizKitLeftNavEditItem;
