/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import ConstUri from "../../helpers/ConstUriUtils";
import { LinkshimHandlerConfig } from "../../helpers/LinkshimHandlerConfig";

const CLICK_TRACKING_PARAM = "c";
const TRACKING_NODES_PARAM = "__tn__";

let shimUri = ConstUri.getUri(LinkshimHandlerConfig.linkshim_path);
if (shimUri) {
  shimUri = shimUri.setDomain(LinkshimHandlerConfig.linkshim_host);
}

function getLynxURIProtocol(uri) {
  if (LinkshimHandlerConfig.always_use_https) {
    return "https";
  }
  return uri.getProtocol() === "http" ? "http" : "https";
}

function getShimURI() {
  return shimUri;
}

// eslint-disable-next-line max-params
function getShimmedHref(uri, encryptionKey, options, preserveQuery) {
  const protocol = getLynxURIProtocol(uri);
  let shimmedUri = getShimURI();

  if (shimmedUri) {
    shimmedUri = shimmedUri.addQueryParams(
      new Map([
        [
          LinkshimHandlerConfig.linkshim_url_param,
          preserveQuery ? uri.toStringPreserveQuery() : uri.toString(),
        ],
        [LinkshimHandlerConfig.linkshim_enc_param, encryptionKey],
      ])
    );
    shimmedUri = shimmedUri.setProtocol(protocol);
  }

  const trackingNodes = options?.trackingNodes;
  const callbacks = options?.callbacks;

  if (trackingNodes && trackingNodes.length && shimmedUri) {
    shimmedUri = shimmedUri.addQueryParam(
      TRACKING_NODES_PARAM,
      trackingNodes.join("")
    );
  }

  if (callbacks && callbacks.length && shimmedUri) {
    shimmedUri = shimmedUri.addQueryParam(CLICK_TRACKING_PARAM, callbacks);
  }

  return shimmedUri || uri;
}

export { getLynxURIProtocol, getShimmedHref, getShimURI };
