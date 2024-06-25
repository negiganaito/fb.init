// __d(
//   "GeoBaseModal.react",
//   [
//     "GeoCardHeaderLabelContext",
//     "GeoPrivateBaseModalLayer.react",
//     "GeoPrivateCardLayerContext",
//     "GeoPrivateFormInputInlineContext",
//     "GeoPrivateInvertThemeContext",
//     "GeoPrivateMakeComponent",
//     "GeoPrivateResetSelectorStyle.react",
//     "emptyObject",
//     "react",
//     "useGeoPrivatePopupBlocker",
//     "useUniqueID",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react")),
//       j = h.useContext,
//       k = { isInline: !1 };
//     function a(a) {
//       var b = a.behaviors;
//       b === void 0 ? c("emptyObject") : b;
//       b = a.children;
//       var d = a.dialogTransition;
//       a.getCausalElementRef;
//       var e = a.hideOnBlur;
//       e = e === void 0 ? !0 : e;
//       var f = a.hideOnEscape;
//       a.interactionArea;
//       var g = a.isFixedToTop;
//       g = g === void 0 ? !1 : g;
//       var h = a.isShown,
//         l = a.layerRef;
//       a.modalRef;
//       var m = a.onHide,
//         n = a.width;
//       n = n === void 0 ? 600 : n;
//       a = a.xstyle;
//       var o = c("useUniqueID")(),
//         p = j(c("GeoPrivateCardLayerContext"));
//       h = c("useGeoPrivatePopupBlocker")(h);
//       return p
//         ? b
//         : i.jsx(c("GeoPrivateCardLayerContext").Provider, {
//             value: !0,
//             children: i.jsx(c("GeoCardHeaderLabelContext").Provider, {
//               value: o,
//               children: i.jsx(c("GeoPrivateInvertThemeContext").Provider, {
//                 value: !1,
//                 children: i.jsx(c("GeoPrivateResetSelectorStyle.react"), {
//                   children: i.jsx(
//                     c("GeoPrivateFormInputInlineContext").Provider,
//                     {
//                       value: k,
//                       children: i.jsx(c("GeoPrivateBaseModalLayer.react"), {
//                         dialogTransition: d,
//                         hideOnBlur: e,
//                         hideOnEscape: f,
//                         isFixedToTop: g,
//                         isShown: h,
//                         labelledBy: o,
//                         layerRef: l,
//                         onHide: m,
//                         width: n,
//                         xstyle: a,
//                         children: b,
//                       }),
//                     }
//                   ),
//                 }),
//               }),
//             }),
//           });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     b = d("GeoPrivateMakeComponent").makeGeoComponent("GeoBaseModal", a);
//     g["default"] = b;
//   },
//   98
// );

import React, { useContext, ReactNode } from "react";
import GeoCardHeaderLabelContext from "GeoCardHeaderLabelContext";
import GeoPrivateBaseModalLayer from "GeoPrivateBaseModalLayer.react";
import GeoPrivateCardLayerContext from "GeoPrivateCardLayerContext";
import GeoPrivateFormInputInlineContext from "GeoPrivateFormInputInlineContext";
import GeoPrivateInvertThemeContext from "GeoPrivateInvertThemeContext";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import GeoPrivateResetSelectorStyle from "GeoPrivateResetSelectorStyle.react";
import emptyObject from "emptyObject";
import useGeoPrivatePopupBlocker from "useGeoPrivatePopupBlocker";
import useUniqueID from "useUniqueID";

interface GeoBaseModalProps {
  behaviors?: any;
  children: ReactNode;
  dialogTransition?: any;
  getCausalElementRef?: any;
  hideOnBlur?: boolean;
  hideOnEscape?: boolean;
  interactionArea?: any;
  isFixedToTop?: boolean;
  isShown: boolean;
  layerRef?: React.Ref<any>;
  modalRef?: React.Ref<any>;
  onHide?: () => void;
  width?: number;
  xstyle?: any;
}

const defaultFormInputInlineContext = { isInline: false };

const GeoBaseModal: React.FC<GeoBaseModalProps> = ({
  behaviors = emptyObject,
  children,
  dialogTransition,
  hideOnBlur = true,
  hideOnEscape,
  isFixedToTop = false,
  isShown,
  layerRef,
  onHide,
  width = 600,
  xstyle,
}) => {
  const uniqueID = useUniqueID();
  const isCardLayerContext = useContext(GeoPrivateCardLayerContext);
  const blockedIsShown = useGeoPrivatePopupBlocker(isShown);

  if (isCardLayerContext) {
    return <>{children}</>;
  }

  return (
    <GeoPrivateCardLayerContext.Provider value={true}>
      <GeoCardHeaderLabelContext.Provider value={uniqueID}>
        <GeoPrivateInvertThemeContext.Provider value={false}>
          <GeoPrivateResetSelectorStyle>
            <GeoPrivateFormInputInlineContext.Provider
              value={defaultFormInputInlineContext}
            >
              <GeoPrivateBaseModalLayer
                dialogTransition={dialogTransition}
                hideOnBlur={hideOnBlur}
                hideOnEscape={hideOnEscape}
                isFixedToTop={isFixedToTop}
                isShown={blockedIsShown}
                labelledBy={uniqueID}
                layerRef={layerRef}
                onHide={onHide}
                width={width}
                xstyle={xstyle}
              >
                {children}
              </GeoPrivateBaseModalLayer>
            </GeoPrivateFormInputInlineContext.Provider>
          </GeoPrivateResetSelectorStyle>
        </GeoPrivateInvertThemeContext.Provider>
      </GeoCardHeaderLabelContext.Provider>
    </GeoPrivateCardLayerContext.Provider>
  );
};

GeoBaseModal.displayName = `${GeoBaseModal.name} [from some-module-id]`;

const ExportedGeoBaseModal = makeGeoComponent("GeoBaseModal", GeoBaseModal);
export default ExportedGeoBaseModal;
