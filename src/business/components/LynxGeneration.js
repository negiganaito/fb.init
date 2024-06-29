/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { LinkshimHandlerConfig } from "../helpers/LinkshimHandlerConfig";
import URI from "../helpers/URI";

const shimURI = new URI(LinkshimHandlerConfig.linkshim_path).setDomain(
  LinkshimHandlerConfig.linkshim_host
);

const LynxGeneration = {
  getShimURI() {
    return new URI(shimURI);
  },
  getLynxURIProtocol(uri) {
    return LinkshimHandlerConfig.always_use_https
      ? "https"
      : uri.getProtocol() === "http"
      ? "http"
      : "https";
  },
  getShimmedHref(href, encParam, options = {}) {
    const uri = new URI(href);
    const protocol = this.getLynxURIProtocol(uri);
    let shimmedURI = this.getShimURI()
      .setQueryData({
        [LinkshimHandlerConfig.linkshim_url_param]: uri.toString(),
        [LinkshimHandlerConfig.linkshim_enc_param]: encParam,
      })
      .setProtocol(protocol);

    const { trackingNodes, callbacks } = options;

    if (trackingNodes && trackingNodes.length) {
      shimmedURI = shimmedURI.addQueryData("__tn__", trackingNodes.join(""));
    }

    if (callbacks && callbacks.length) {
      shimmedURI = shimmedURI.addQueryData("c", callbacks);
    }

    return shimmedURI;
  },
};

export default LynxGeneration;
