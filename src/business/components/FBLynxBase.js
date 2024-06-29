/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
// import FBLynxLogging from "cr:7736"; // This should be the correct import path or identifier

import $ from "../helpers/$";
import isLinkshimURI from "../helpers/isLinkshimURI";
import { LinkshimHandlerConfig } from "../helpers/LinkshimHandlerConfig";
import URI from "../helpers/URI";

let uriModule = null;

function getUnshimmedURI(uri) {
  if (!isLinkshimURI(uri)) return null;
  const unshimmedURI = uri.getQueryData().u;
  return !unshimmedURI ? null : unshimmedURI;
}

const FBLynxBase = {
  logAsyncClick: function (element) {
    this.swapLinkWithUnshimmedLink(element);
    const lynxUri = element.getAttribute("data-lynx-uri");
    if (!lynxUri) return;
    // FBLynxLogging.log(lynxUri);
    console.log(lynxUri);
  },

  originReferrerPolicyClick: function (element) {
    const metaReferrer = $("meta_referrer");
    metaReferrer.content = LinkshimHandlerConfig.switched_meta_referrer_policy;
    this.logAsyncClick(element);
    setTimeout(() => {
      metaReferrer.content = LinkshimHandlerConfig.default_meta_referrer_policy;
    }, 100);
  },

  swapLinkWithUnshimmedLink: function (element) {
    const href = element.href;
    const unshimmedHref = getUnshimmedURI(new (uriModule || URI)(href));
    if (!unshimmedHref) return;
    element.setAttribute("data-lynx-uri", href);
    element.href = unshimmedHref;
  },

  revertSwapIfLynxURIPresent: function (element) {
    const lynxUri = element.getAttribute("data-lynx-uri");
    if (!lynxUri) return;
    element.removeAttribute("data-lynx-uri");
    element.href = lynxUri;
  },
};

export default FBLynxBase;
