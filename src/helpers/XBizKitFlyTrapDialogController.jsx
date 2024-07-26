__d(
  "XBizKitFlyTrapDialogController",
  ["XController"],
  function (a, b, c, d, e, f) {
    e.exports = b("XController").create("/bizkit/ajax/flytrap/dialog/", {
      product: { type: "Enum", enumType: 1 },
      account_id: { type: "Int" },
      ad_objective: { type: "String" },
      biz_site_page_type: { type: "String" },
      business_id: { type: "Int" },
      help_platform_path: { type: "String", required: !0 },
      on_hide_uri: { type: "String" },
      source: { type: "Enum", enumType: 1 },
      category: { type: "Enum", enumType: 1 },
      sub_category: { type: "Enum", enumType: 1 },
      page_id: { type: "FBID" },
    });
  },
  null
);

import { XController } from "XController";

export default XController.create("/bizkit/ajax/flytrap/dialog/", {
  product: { type: "Enum", enumType: 1 },
  account_id: { type: "Int" },
  ad_objective: { type: "String" },
  biz_site_page_type: { type: "String" },
  business_id: { type: "Int" },
  help_platform_path: { type: "String", required: true },
  on_hide_uri: { type: "String" },
  source: { type: "Enum", enumType: 1 },
  category: { type: "Enum", enumType: 1 },
  sub_category: { type: "Enum", enumType: 1 },
  page_id: { type: "FBID" },
});
