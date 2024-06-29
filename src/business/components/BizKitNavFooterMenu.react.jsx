// __d(
//   "BizKitNavFooterMenu.react",
//   [
//     "BMToMBSConsoldationGating",
//     "BizKitConfigDynamicFields",
//     "BizKitFeedbackButton.react",
//     "BizKitHelpTrayButton.react",
//     "BizKitMBSCreatorOptOutButton.react",
//     "BizKitNavFooterLanguageSettingButton.react",
//     "BizKitOptOutButton.react",
//     "BizKitRouteContext",
//     "BizKitTailoringGating.entrypointutils",
//     "ContextualLayer.react",
//     "GeoMenu.react",
//     "LayerHideOnBlur",
//     "LayerHideOnEscape",
//     "LayerRefocusOnHide",
//     "LayerTabIsolation",
//     "react",
//     "useBizWebCurrentRouteName",
//     "useIsCreator",
//     "useResizeObserver",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react"));
//     b = h;
//     var j = b.useCallback,
//       k = b.useContext,
//       l = b.useEffect;
//     function a(a) {
//       var b = a.isOpen,
//         e = a.menuRef,
//         f = a.setIsOpen,
//         g = c("useResizeObserver")(function () {
//           f(!1);
//         });
//       a = k(c("BizKitRouteContext"));
//       a = a.routeName;
//       var h = c("useBizWebCurrentRouteName")();
//       a = a === "BUSINESS_HOME";
//       h =
//         h === "SETTINGS" &&
//         d("BMToMBSConsoldationGating").getEnableBMSCIntegration();
//       l(
//         function () {
//           e && g(e);
//         },
//         [e, g]
//       );
//       var m = j(
//           function () {
//             f(!1);
//           },
//           [f]
//         ),
//         n = c("useIsCreator")(),
//         o = i.jsx(
//           c("BizKitFeedbackButton.react"),
//           { onClick: m },
//           "BizKitNavFooterMenu-feedback"
//         );
//       a =
//         d("BizKitConfigDynamicFields").is_ig_login !== !0 && !(a || h)
//           ? i.jsx(
//               c("BizKitOptOutButton.react"),
//               { onClick: m },
//               "BizKitNavFooterMenu-optOut"
//             )
//           : null;
//       h =
//         d("BizKitConfigDynamicFields").is_ig_login === !0
//           ? i.jsx(
//               c("BizKitNavFooterLanguageSettingButton.react"),
//               { onClick: m },
//               "BizKitNavFooterMenu-language"
//             )
//           : null;
//       n =
//         n &&
//         d(
//           "BizKitTailoringGating.entrypointutils"
//         ).getMBSUserEligibleForCreatorExperience()
//           ? i.jsx(
//               c("BizKitMBSCreatorOptOutButton.react"),
//               { onClick: m },
//               "BizKitNavFooterMenu-optOutOfCreatorExperience"
//             )
//           : null;
//       m = [
//         i.jsx(
//           c("BizKitHelpTrayButton.react"),
//           { onClick: m },
//           "BizKitNavFooterMenu-help"
//         ),
//         o,
//         h,
//         n,
//         a,
//       ];
//       return i.jsx(c("ContextualLayer.react"), {
//         behaviors: {
//           LayerHideOnBlur: c("LayerHideOnBlur"),
//           LayerHideOnEscape: c("LayerHideOnEscape"),
//           LayerRefocusOnHide: c("LayerRefocusOnHide"),
//           LayerTabIsolation: c("LayerTabIsolation"),
//         },
//         context: e,
//         offsetY: -5,
//         onToggle: f,
//         position: "above",
//         shown: b,
//         children: i.jsx("div", {
//           className:
//             "x2izyaf x1lq5wgf xgqcy7u x30kzoy x9jhf4c xz81yyr x9f619 x1y1aw1k x1sxyh0 x1a8lsjc xurb0ha xnf1dy1",
//           children: i.jsx(c("GeoMenu.react"), {
//             "data-testid": void 0,
//             children: m,
//           }),
//         }),
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, { useCallback, useContext, useEffect } from "react";
import { BMToMBSConsoldationGating } from "BMToMBSConsoldationGating";
import { BizKitConfigDynamicFields } from "BizKitConfigDynamicFields";
import BizKitFeedbackButton from "BizKitFeedbackButton.react";
import BizKitHelpTrayButton from "BizKitHelpTrayButton.react";
import BizKitMBSCreatorOptOutButton from "BizKitMBSCreatorOptOutButton.react";
import BizKitNavFooterLanguageSettingButton from "BizKitNavFooterLanguageSettingButton.react";
import BizKitOptOutButton from "BizKitOptOutButton.react";
import { BizKitRouteContext } from "BizKitRouteContext";
import { BizKitTailoringGating } from "BizKitTailoringGating.entrypointutils";
import ContextualLayer from "ContextualLayer.react";
import GeoMenu from "GeoMenu.react";
import { LayerHideOnBlur } from "LayerHideOnBlur";
import { LayerHideOnEscape } from "LayerHideOnEscape";
import { LayerRefocusOnHide } from "LayerRefocusOnHide";
import { LayerTabIsolation } from "LayerTabIsolation";
import { useBizWebCurrentRouteName } from "useBizWebCurrentRouteName";
import { useIsCreator } from "useIsCreator";
import { useResizeObserver } from "useResizeObserver";

interface BizKitNavFooterMenuProps {
  isOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
  setIsOpen: (isOpen: boolean) => void;
}

const BizKitNavFooterMenu: React.FC<BizKitNavFooterMenuProps> = ({
  isOpen,
  menuRef,
  setIsOpen,
}) => {
  const { routeName } = useContext(BizKitRouteContext);
  const currentRouteName = useBizWebCurrentRouteName();
  const isBusinessHome = routeName === "BUSINESS_HOME";
  const isSettingsWithBMSCIntegration =
    currentRouteName === "SETTINGS" &&
    BMToMBSConsoldationGating.getEnableBMSCIntegration();
  const resizeObserver = useResizeObserver(() => setIsOpen(false));

  useEffect(() => {
    if (menuRef.current) {
      resizeObserver(menuRef.current);
    }
  }, [menuRef, resizeObserver]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const isCreator = useIsCreator();

  const feedbackButton = (
    <BizKitFeedbackButton
      onClick={handleClose}
      key="BizKitNavFooterMenu-feedback"
    />
  );
  const optOutButton =
    BizKitConfigDynamicFields.is_ig_login !== true &&
    !(isBusinessHome || isSettingsWithBMSCIntegration) ? (
      <BizKitOptOutButton
        onClick={handleClose}
        key="BizKitNavFooterMenu-optOut"
      />
    ) : null;
  const languageSettingButton =
    BizKitConfigDynamicFields.is_ig_login === true ? (
      <BizKitNavFooterLanguageSettingButton
        onClick={handleClose}
        key="BizKitNavFooterMenu-language"
      />
    ) : null;
  const creatorOptOutButton =
    isCreator &&
    BizKitTailoringGating.getMBSUserEligibleForCreatorExperience() ? (
      <BizKitMBSCreatorOptOutButton
        onClick={handleClose}
        key="BizKitNavFooterMenu-optOutOfCreatorExperience"
      />
    ) : null;

  const menuItems = [
    <BizKitHelpTrayButton
      onClick={handleClose}
      key="BizKitNavFooterMenu-help"
    />,
    feedbackButton,
    languageSettingButton,
    creatorOptOutButton,
    optOutButton,
  ];

  return (
    <ContextualLayer
      behaviors={{
        LayerHideOnBlur,
        LayerHideOnEscape,
        LayerRefocusOnHide,
        LayerTabIsolation,
      }}
      context={menuRef}
      offsetY={-5}
      onToggle={setIsOpen}
      position="above"
      shown={isOpen}
    >
      <div className="x2izyaf x1lq5wgf xgqcy7u x30kzoy x9jhf4c xz81yyr x9f619 x1y1aw1k x1sxyh0 x1a8lsjc xurb0ha xnf1dy1">
        <GeoMenu data-testid={undefined}>{menuItems}</GeoMenu>
      </div>
    </ContextualLayer>
  );
};

BizKitNavFooterMenu.displayName = `${BizKitNavFooterMenu.name}`;

export default BizKitNavFooterMenu;
