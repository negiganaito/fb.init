/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { CookieConsentIFrameConfig } from "./CookieConsentIFrameConfig";
import { InitialCookieConsent } from "./InitialCookieConsent";

const initialConsent = new Set(InitialCookieConsent.initialConsent);
let shouldShowBanner = InitialCookieConsent.shouldShowCookieBanner;

const CookieConsent = {
  setConsented() {
    initialConsent.add(1);
    shouldShowBanner = false;
  },
  hasConsent(consentType) {
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
  isThirdPartyIframeAllowed(iframe) {
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
