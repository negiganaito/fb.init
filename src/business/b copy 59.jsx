// __d(
//   "BusinessUnifiedScopingLocalSelectorUtils",
//   [
//     "fbt",
//     "BusinessAssetTypeEnumUtils.facebook",
//     "BusinessAssetTypesUppercase$FbtEnum",
//   ],
//   function (a, b, c, d, e, f, g, h) {
//     function a(a) {
//       switch (a) {
//         case "ad-account":
//           return "/images/brands/adaccount_xl.png";
//         default:
//           return "";
//       }
//     }
//     function b(a) {
//       return d("BusinessAssetTypeEnumUtils.facebook").toJSEnum(a);
//     }
//     function e(a) {
//       switch (a) {
//         case "business":
//           return "brand";
//         case "business_asset_group":
//           return "business-resource-group";
//         default:
//           return null;
//       }
//     }
//     function f(a, b) {
//       if (a == null || a === "PERSONAL") return null;
//       if (a === "BUSINESS")
//         return h._("Business ID: {business id}", [h._param("business id", b)]);
//       return a === "BUSINESS_ASSET_GROUP"
//         ? h._("Asset group ID: {business asset group id}", [
//             h._param("business asset group id", b),
//           ])
//         : a !== null
//         ? h._(
//             {
//               "ad-account": "Ad account ID: {business asset id}",
//               "ad-study": "Lift study ID: {business asset id}",
//               app: "App ID: {business asset id}",
//               "block-list": "Block list ID: {business asset id}",
//               "white-list": "Publisher allow list ID: {business asset id}",
//               brand: "Business ID: {business asset id}",
//               "business-unit": "Line of business ID: {business asset id}",
//               "catalog-segment": "Catalog segment ID: {business asset id}",
//               "creator-seller-profile": "Shop ID: {business asset id}",
//               "custom-conversion": "Custom conversion ID: {business asset id}",
//               "event-source-group":
//                 "Event source group ID: {business asset id}",
//               "example-cat": "Cat (do not translate) ID: {business asset id}",
//               "owned-domain": "Domain ID: {business asset id}",
//               "news-page": "News Page ID: {business asset id}",
//               "instagram-account-v2":
//                 "Instagram account ID: {business asset id}",
//               "leads-access": "Leads access ID: {business asset id}",
//               "monetization-property": "Property ID: {business asset id}",
//               "offline-event-set": "Offline event set ID: {business asset id}",
//               "events-dataset": "Dataset ID: {business asset id}",
//               "business-locations-wrapper":
//                 "Page structure ID: {business asset id}",
//               page: "Page ID: {business asset id}",
//               "profile-plus": "Profile ID: {business asset id}",
//               "payout-method": "Payment account ID: {business asset id}",
//               pixel: "Pixel ID: {business asset id}",
//               "product-catalog": "Catalog ID: {business asset id}",
//               "registered-trademark":
//                 "Registered trademark ID: {business asset id}",
//               "shared-audience": "Shared audience ID: {business asset id}",
//               "sliced-event-source-group":
//                 "Sliced event source group ID: {business asset id}",
//               user: "Person ID: {business asset id}",
//               "whatsapp-business-account":
//                 "WhatsApp account ID: {business asset id}",
//               "business-resource-group":
//                 "Business asset group ID: {business asset id}",
//               "business-creative-folder":
//                 "Business creative folder ID: {business asset id}",
//               "dynamic-content-set":
//                 "Content allow list ID: {business asset id}",
//               "ads-event-source": "Ads event source ID: {business asset id}",
//               "seller-profile": "Commerce account ID: {business asset id}",
//               "legal-entity": "Legal entity ID: {business asset id}",
//               "advanced-analytics-instance": "Instance ID: {business asset id}",
//               "events-dataset-new": "Dataset ID: {business asset id}",
//               "offsite-email-account": "Email account ID: {business asset id}",
//               "creator-marketplace-brand-profile":
//                 "Creator Marketplace Account ID: {business asset id}",
//               "mv4b-billable-account":
//                 "Meta Verified Account ID: {business asset id}",
//             },
//             [
//               h._enum(a, c("BusinessAssetTypesUppercase$FbtEnum")),
//               h._param("business asset id", b),
//             ]
//           )
//         : null;
//     }
//     g.getAssetTypeFallbackPhoto = a;
//     g.convertAssetEnumToType = b;
//     g.convertGlobalScopeTypeToAssetType = e;
//     g.getSubTitle = f;
//   },
//   226
// );

import { fbt } from "fbt";
import { toJSEnum } from "BusinessAssetTypeEnumUtils.facebook";
import { BusinessAssetTypesUppercase$FbtEnum } from "BusinessAssetTypesUppercase$FbtEnum";

function getAssetTypeFallbackPhoto(assetType: string): string {
  switch (assetType) {
    case "ad-account":
      return "/images/brands/adaccount_xl.png";
    default:
      return "";
  }
}

function convertAssetEnumToType(assetEnum: string): string {
  return toJSEnum(assetEnum);
}

function convertGlobalScopeTypeToAssetType(
  globalScopeType: string
): string | null {
  switch (globalScopeType) {
    case "business":
      return "brand";
    case "business_asset_group":
      return "business-resource-group";
    default:
      return null;
  }
}

function getSubTitle(
  scopeType: string | null,
  id: string | null
): string | null {
  if (scopeType == null || scopeType === "PERSONAL") {
    return null;
  }
  if (scopeType === "BUSINESS") {
    return fbt("Business ID: {business id}", [fbt.param("business id", id)]);
  }
  if (scopeType === "BUSINESS_ASSET_GROUP") {
    return fbt("Asset group ID: {business asset group id}", [
      fbt.param("business asset group id", id),
    ]);
  }
  return scopeType !== null
    ? fbt(
        {
          "ad-account": "Ad account ID: {business asset id}",
          "ad-study": "Lift study ID: {business asset id}",
          app: "App ID: {business asset id}",
          "block-list": "Block list ID: {business asset id}",
          "white-list": "Publisher allow list ID: {business asset id}",
          brand: "Business ID: {business asset id}",
          "business-unit": "Line of business ID: {business asset id}",
          "catalog-segment": "Catalog segment ID: {business asset id}",
          "creator-seller-profile": "Shop ID: {business asset id}",
          "custom-conversion": "Custom conversion ID: {business asset id}",
          "event-source-group": "Event source group ID: {business asset id}",
          "example-cat": "Cat (do not translate) ID: {business asset id}",
          "owned-domain": "Domain ID: {business asset id}",
          "news-page": "News Page ID: {business asset id}",
          "instagram-account-v2": "Instagram account ID: {business asset id}",
          "leads-access": "Leads access ID: {business asset id}",
          "monetization-property": "Property ID: {business asset id}",
          "offline-event-set": "Offline event set ID: {business asset id}",
          "events-dataset": "Dataset ID: {business asset id}",
          "business-locations-wrapper":
            "Page structure ID: {business asset id}",
          page: "Page ID: {business asset id}",
          "profile-plus": "Profile ID: {business asset id}",
          "payout-method": "Payment account ID: {business asset id}",
          pixel: "Pixel ID: {business asset id}",
          "product-catalog": "Catalog ID: {business asset id}",
          "registered-trademark":
            "Registered trademark ID: {business asset id}",
          "shared-audience": "Shared audience ID: {business asset id}",
          "sliced-event-source-group":
            "Sliced event source group ID: {business asset id}",
          user: "Person ID: {business asset id}",
          "whatsapp-business-account":
            "WhatsApp account ID: {business asset id}",
          "business-resource-group":
            "Business asset group ID: {business asset id}",
          "business-creative-folder":
            "Business creative folder ID: {business asset id}",
          "dynamic-content-set": "Content allow list ID: {business asset id}",
          "ads-event-source": "Ads event source ID: {business asset id}",
          "seller-profile": "Commerce account ID: {business asset id}",
          "legal-entity": "Legal entity ID: {business asset id}",
          "advanced-analytics-instance": "Instance ID: {business asset id}",
          "events-dataset-new": "Dataset ID: {business asset id}",
          "offsite-email-account": "Email account ID: {business asset id}",
          "creator-marketplace-brand-profile":
            "Creator Marketplace Account ID: {business asset id}",
          "mv4b-billable-account":
            "Meta Verified Account ID: {business asset id}",
        },
        [
          fbt.enum(scopeType, BusinessAssetTypesUppercase$FbtEnum),
          fbt.param("business asset id", id),
        ]
      )
    : null;
}

export {
  getAssetTypeFallbackPhoto,
  convertAssetEnumToType,
  convertGlobalScopeTypeToAssetType,
  getSubTitle,
};
