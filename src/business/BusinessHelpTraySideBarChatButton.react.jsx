// __d(
//   "BusinessHelpTraySideBarChatButton.react",
//   [
//     "fbt",
//     "ix",
//     "BizKitHelpTrayContext",
//     "BizKitLeftNavBadgeIcon.react",
//     "BizKitSideBarButtonStyles.react",
//     "BizKitSidebarItem.react",
//     "BizKitStrings",
//     "BusinessHelpTraySideBarChatButtonQuery_viewer.graphql",
//     "GeoFlexbox.react",
//     "Image.react",
//     "JSResourceForInteraction",
//     "RelayHooks",
//     "promiseDone",
//     "react",
//     "useAdsOsmipSupportChatSubscription",
//     "useHoverState",
//   ],
//   function (a, b, c, d, e, f, g, h, i) {
//     "use strict";
//     var j,
//       k,
//       l = k || (k = d("react")),
//       m = k.useContext,
//       n = c("JSResourceForInteraction")("AdsHelpTrayUIActions").__setRef(
//         "BusinessHelpTraySideBarChatButton.react"
//       ),
//       o =
//         j !== void 0
//           ? j
//           : (j = b("BusinessHelpTraySideBarChatButtonQuery_viewer.graphql"));
//     function a(a) {
//       a = a.buttonDataKey;
//       a = (a = d("RelayHooks").useFragment(o, a)) == null ? void 0 : a.osmip;
//       var b = c("useHoverState")(),
//         e = b.isHovered,
//         f = b.onMouseEnter;
//       b = b.onMouseLeave;
//       var g = m(c("BizKitHelpTrayContext")),
//         j = g.setIsHelpTrayOpen,
//         k = function (a) {
//           c("promiseDone")(
//             n.load().then(function (b) {
//               b.openChatInbox(a);
//             })
//           );
//         };
//       c("useAdsOsmipSupportChatSubscription")(
//         a == null ? void 0 : (g = a.active) == null ? void 0 : g.__id
//       );
//       g =
//         (a =
//           a == null
//             ? void 0
//             : (g = a.active) == null
//             ? void 0
//             : (a = g.edges) == null
//             ? void 0
//             : (g = a.map(function (a) {
//                 a = a.node;
//                 return a;
//               })) == null
//             ? void 0
//             : g.filter(Boolean)) != null
//           ? a
//           : [];
//       if (g.length === 0) return null;
//       a = l.jsx(c("Image.react"), { src: i("371520") });
//       g = g.some(function (a) {
//         return (a = a.thread_unread) != null ? a : !1;
//       });
//       return l.jsx(c("GeoFlexbox.react"), {
//         children: l.jsx("div", {
//           onMouseEnter: f,
//           onMouseLeave: b,
//           className: "x78zum5 x1rdy4ex",
//           children: l.jsx(c("BizKitSidebarItem.react"), {
//             icon: a,
//             iconActive: a,
//             badge: g ? l.jsx(c("BizKitLeftNavBadgeIcon.react"), {}) : null,
//             isFirst: !1,
//             onActivate: function () {
//               k(j);
//             },
//             label: h._("Support"),
//             value: d("BizKitStrings").CONTACT_US,
//             backgroundStyle: e
//               ? d("BizKitSideBarButtonStyles.react").getButtonHoverStyle()
//               : d("BizKitSideBarButtonStyles.react").getButtonNormalStyle(),
//           }),
//         }),
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   226
// );

import React, { useContext } from "react";
import { fbt } from "fbt";
import { ix as iconSrc } from "ix";
import { BizKitHelpTrayContext } from "BizKitHelpTrayContext";
import BizKitLeftNavBadgeIcon from "BizKitLeftNavBadgeIcon.react";
import {
  getButtonHoverStyle,
  getButtonNormalStyle,
} from "BizKitSideBarButtonStyles.react";
import BizKitSidebarItem from "BizKitSidebarItem.react";
import { CONTACT_US } from "BizKitStrings";
import { BusinessHelpTraySideBarChatButtonQuery_viewer } from "BusinessHelpTraySideBarChatButtonQuery_viewer.graphql";
import GeoFlexbox from "GeoFlexbox.react";
import Image from "Image.react";
import { JSResourceForInteraction } from "JSResourceForInteraction";
import { useFragment } from "RelayHooks";
import { promiseDone } from "promiseDone";
import { useAdsOsmipSupportChatSubscription } from "useAdsOsmipSupportChatSubscription";
import { useHoverState } from "useHoverState";

const AdsHelpTrayUIActions = JSResourceForInteraction(
  "AdsHelpTrayUIActions"
).__setRef("BusinessHelpTraySideBarChatButton.react");
const viewerFragment = BusinessHelpTraySideBarChatButtonQuery_viewer;

interface BusinessHelpTraySideBarChatButtonProps {
  buttonDataKey: any;
}

const BusinessHelpTraySideBarChatButton: React.FC<
  BusinessHelpTraySideBarChatButtonProps
> = ({ buttonDataKey }) => {
  const data = useFragment(viewerFragment, buttonDataKey);
  const osmipData = data?.osmip;

  const { isHovered, onMouseEnter, onMouseLeave } = useHoverState();
  const { setIsHelpTrayOpen } = useContext(BizKitHelpTrayContext);

  const openChatInbox = (open: boolean) => {
    promiseDone(
      AdsHelpTrayUIActions.load().then((actions) => {
        actions.openChatInbox(open);
      })
    );
  };

  useAdsOsmipSupportChatSubscription(osmipData?.active?.__id);

  const activeChats =
    osmipData?.active?.edges?.map((edge) => edge.node).filter(Boolean) || [];

  if (activeChats.length === 0) return null;

  const chatIcon = <Image src={iconSrc("371520")} />;
  const hasUnreadMessages = activeChats.some(
    (chat) => chat.thread_unread ?? false
  );

  return (
    <GeoFlexbox>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="x78zum5 x1rdy4ex"
      >
        <BizKitSidebarItem
          icon={chatIcon}
          iconActive={chatIcon}
          badge={hasUnreadMessages ? <BizKitLeftNavBadgeIcon /> : null}
          isFirst={false}
          onActivate={() => openChatInbox(setIsHelpTrayOpen)}
          label={fbt._("Support")}
          value={CONTACT_US}
          backgroundStyle={
            isHovered ? getButtonHoverStyle() : getButtonNormalStyle()
          }
        />
      </div>
    </GeoFlexbox>
  );
};

BusinessHelpTraySideBarChatButton.displayName = `${BusinessHelpTraySideBarChatButton.name}`;

export default BusinessHelpTraySideBarChatButton;
