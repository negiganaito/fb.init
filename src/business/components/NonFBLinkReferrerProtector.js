/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import $ from "../helpers/$";
import Event from "../helpers/Event";
import { LinkshimHandlerConfig } from "../helpers/LinkshimHandlerConfig";
import { byAttribute } from "../helpers/Parent";
import URI from "../helpers/URI";

const goURIOnWindow = URI.goURIOnWindow;

const NonFBLinkReferrerProtector = {
  alreadySetup: false,
  originReferrerPolicyClickWithoutLog(element) {
    const metaReferrer = $("meta_referrer");
    metaReferrer.content = LinkshimHandlerConfig.switched_meta_referrer_policy;
    setTimeout(() => {
      metaReferrer.content = LinkshimHandlerConfig.default_meta_referrer_policy;
    }, 100);
  },
  setupDelegation(retry = false) {
    if (document.body === null) {
      if (retry) return;
      setTimeout(() => {
        this.setupDelegation(true);
      }, 100);
      return;
    }
    if (this.alreadySetup) return;
    this.alreadySetup = true;

    const clickHandler = (event) => {
      console.log("🚀 ~ clickHandler ~ event:", event);
      const [mode, element] =
        this.getMaybeNonFBLinkReferrerJSMode(event.target) || [];
      if (!element) return;

      switch (mode) {
        case "origin":
          this.originReferrerPolicyClickWithoutLog(element);
          break;
        case "ie":
          // eslint-disable-next-line no-case-declarations
          const uri = new URI(element.href);
          event.preventDefault();
          goURIOnWindow(uri, window.open("", element.target), true);
          break;
      }
    };

    Event.prototype.listen(document.body, "click", clickHandler);
  },
  getMaybeNonFBLinkReferrerJSMode(target) {
    const element = byAttribute(target, "data-lnfb-mode");
    if (element instanceof HTMLAnchorElement) {
      const mode = element.getAttribute("data-lnfb-mode");
      if (["ie", "origin"].includes(mode)) {
        return [mode, element];
      }
    }
    return null;
  },
};

export default NonFBLinkReferrerProtector;
