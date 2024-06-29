// __d(
//   "BizKitFeedbackButton.react",
//   [
//     "ix",
//     "AsyncTypedRequest",
//     "BizCoreNavFooterClickFalcoEvent",
//     "BizKitStrings",
//     "GeoMenuItem.react",
//     "Image.react",
//     "XBizKitFlyTrapDialogController",
//     "getBizInboxPageFromBizInboxRoute",
//     "getBizInboxSubcategoryFromRouteName",
//     "gkx",
//     "react",
//     "useBizKitBaseLoggingData",
//     "useBizKitPageNullable",
//     "useBizWebCurrentRouteName",
//     "useBizWebCurrentTabName",
//   ],
//   function (a, b, c, d, e, f, g, h) {
//     "use strict";
//     var i,
//       j = i || (i = d("react")),
//       k = i.useCallback,
//       l = h("179813");
//     function a(a) {
//       var b = a.onClick,
//         e = c("useBizKitPageNullable")(),
//         f = c("useBizKitBaseLoggingData")(),
//         g = c("useBizWebCurrentTabName")(),
//         h = c("useBizWebCurrentRouteName")();
//       a = k(
//         function () {
//           b != null && b();
//           c("BizCoreNavFooterClickFalcoEvent").log(function () {
//             return babelHelpers["extends"](
//               {
//                 event_data: { target_type: "feedback" },
//                 client_timestamp_ms: Date.now(),
//               },
//               f
//             );
//           });
//           var a = d(
//               "getBizInboxPageFromBizInboxRoute"
//             ).getBizInboxPageFromBizInboxRoute(g),
//             i = d(
//               "getBizInboxSubcategoryFromRouteName"
//             ).getBizInboxSubcategoryFromRouteName(h),
//             j = c("gkx")("21331") ? "meta_business_suite" : "facebook_business";
//           j = c("XBizKitFlyTrapDialogController")
//             .getURIBuilder()
//             .setEnum("product", j)
//             .setString("biz_site_page_type", a)
//             .setEnum("sub_category", i)
//             .setString("help_platform_path", "/business/help/")
//             .setFBID("page_id", e);
//           new (c("AsyncTypedRequest"))(j.getURI()).send();
//         },
//         [f, h, g, b, e]
//       );
//       return j.jsx(c("GeoMenuItem.react"), {
//         "data-testid": void 0,
//         label: d("BizKitStrings").GIVE_FEEDBACK,
//         onClick: a,
//         icon: j.jsx(c("Image.react"), { src: l }),
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, { useCallback } from "react";
import { AsyncTypedRequest } from "AsyncTypedRequest";
import { BizCoreNavFooterClickFalcoEvent } from "BizCoreNavFooterClickFalcoEvent";
import { BizKitStrings } from "BizKitStrings";
import { GeoMenuItem } from "GeoMenuItem.react";
import { Image } from "Image.react";
import { XBizKitFlyTrapDialogController } from "XBizKitFlyTrapDialogController";
import { getBizInboxPageFromBizInboxRoute } from "getBizInboxPageFromBizInboxRoute";
import { getBizInboxSubcategoryFromRouteName } from "getBizInboxSubcategoryFromRouteName";
import gkx from "gkx";
import useBizKitBaseLoggingData from "useBizKitBaseLoggingData";
import useBizKitPageNullable from "useBizKitPageNullable";
import useBizWebCurrentRouteName from "useBizWebCurrentRouteName";
import useBizWebCurrentTabName from "useBizWebCurrentTabName";
import l from "179813";

type Props = {
  onClick?: () => void;
};

const BizKitFeedbackButton: React.FC<Props> = ({ onClick }) => {
  const pageId = useBizKitPageNullable();
  const loggingData = useBizKitBaseLoggingData();
  const currentTabName = useBizWebCurrentTabName();
  const currentRouteName = useBizWebCurrentRouteName();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
    BizCoreNavFooterClickFalcoEvent.log(() => ({
      event_data: { target_type: "feedback" },
      client_timestamp_ms: Date.now(),
      ...loggingData,
    }));

    const bizInboxPage = getBizInboxPageFromBizInboxRoute(currentTabName);
    const bizInboxSubcategory =
      getBizInboxSubcategoryFromRouteName(currentRouteName);
    const product = gkx("21331") ? "meta_business_suite" : "facebook_business";

    const uriBuilder = XBizKitFlyTrapDialogController.getURIBuilder()
      .setEnum("product", product)
      .setString("biz_site_page_type", bizInboxPage)
      .setEnum("sub_category", bizInboxSubcategory)
      .setString("help_platform_path", "/business/help/")
      .setFBID("page_id", pageId);

    new AsyncTypedRequest(uriBuilder.getURI()).send();
  }, [loggingData, currentRouteName, currentTabName, onClick, pageId]);

  return (
    <GeoMenuItem
      data-testid={undefined}
      label={BizKitStrings.GIVE_FEEDBACK}
      onClick={handleClick}
      icon={<Image src={l} />}
    />
  );
};

BizKitFeedbackButton.displayName = "BizKitFeedbackButton";

export default BizKitFeedbackButton;
