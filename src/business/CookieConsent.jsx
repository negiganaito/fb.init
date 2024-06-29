// __d(
//   "CookieConsent",
//   ["CookieConsentIFrameConfig", "InitialCookieConsent"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = new Set((h || (h = c("InitialCookieConsent"))).initialConsent),
//       j = h.shouldShowCookieBanner,
//       k = {
//         setConsented: function () {
//           i.add(1), (j = !1);
//         },
//         hasConsent: function (a) {
//           return i.has(a);
//         },
//         shouldShowCookieBanner: function () {
//           return j;
//         },
//         shouldWaitForDeferredDatrCookie: function () {
//           return (h || (h = c("InitialCookieConsent")))
//             .shouldWaitForDeferredDatrCookie;
//         },
//         isFirstPartyStorageAllowed: function () {
//           return (
//             !(h || (h = c("InitialCookieConsent"))).noCookies && k.hasConsent(1)
//           );
//         },
//         isThirdPartyEmbedAllowed: function () {
//           return (
//             !(h || (h = c("InitialCookieConsent"))).noCookies && k.hasConsent(2)
//           );
//         },
//         isThirdPartyIframeAllowed: function (a) {
//           if (!k.isFirstPartyStorageAllowed()) {
//             var b = c("CookieConsentIFrameConfig").is_checkpointed;
//             if (!b) return !1;
//           }
//           return c("CookieConsentIFrameConfig").allowlisted_iframes.includes(
//             a.id
//           )
//             ? !0
//             : k.hasConsent(2);
//         },
//       };
//     a = k;
//     g["default"] = a;
//   },
//   98
// );

// CookieConsent.ts

import { CookieConsentIFrameConfig } from "CookieConsentIFrameConfig";
import { InitialCookieConsent } from "InitialCookieConsent";

type CookieConsentType = {
  setConsented: () => void;
  hasConsent: (consentType: number) => boolean;
  shouldShowCookieBanner: () => boolean;
  shouldWaitForDeferredDatrCookie: () => boolean;
  isFirstPartyStorageAllowed: () => boolean;
  isThirdPartyEmbedAllowed: () => boolean;
  isThirdPartyIframeAllowed: (iframe: { id: string }) => boolean;
};

const initialConsent = new Set(InitialCookieConsent.initialConsent);
let shouldShowBanner = InitialCookieConsent.shouldShowCookieBanner;

const CookieConsent: CookieConsentType = {
  setConsented() {
    initialConsent.add(1);
    shouldShowBanner = false;
  },
  hasConsent(consentType: number) {
    return initialConsent.has(consentType);
  },
  shouldShowCookieBanner() {
    return shouldShowBanner;
  },
  shouldWaitForDeferredDatrCookie() {
    return InitialCookieConsent.shouldWaitForDeferredDatrCookie;
  },
  isFirstPartyStorageAllowed() {
    return !InitialCookieConsent.noCookies && CookieConsent.hasConsent(1);
  },
  isThirdPartyEmbedAllowed() {
    return !InitialCookieConsent.noCookies && CookieConsent.hasConsent(2);
  },
  isThirdPartyIframeAllowed(iframe: { id: string }) {
    if (!CookieConsent.isFirstPartyStorageAllowed()) {
      const isCheckpointed = CookieConsentIFrameConfig.is_checkpointed;
      if (!isCheckpointed) return false;
    }
    return CookieConsentIFrameConfig.allowlisted_iframes.includes(iframe.id)
      ? true
      : CookieConsent.hasConsent(2);
  },
};

export default CookieConsent;
