/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import ConstUri from "../../helpers/ConstUriUtils";
import isCdnURI from "../../helpers/isCdnURI";
import isClickIDBlacklistSVDomainURI from "../../helpers/isClickIDBlacklistSVDomainURI";
import isClickIDBlocklistSVUrlPath from "../../helpers/isClickIDBlocklistSVUrlPath";
import isFacebookSVDomainURI from "../../helpers/isFacebookSVDomainURI";
import isFacebookURI from "../../helpers/isFacebookURI";
import isFbDotComURI from "../../helpers/isFbDotComURI";

const CLICK_ID_PARAM = "fbclid";
const DOUBLECLICK_DOMAIN = "doubleclick.net";

const domainHandlers = {
  [DOUBLECLICK_DOMAIN]: [
    {
      extractor: (uri) => {
        const queryString = uri.getQueryString();
        return queryString && queryString.startsWith("http")
          ? ConstUri.getUri(queryString)
          : null;
      },
      injector: (uri, extractedUri, clickID) => {
        let updatedUri = extractedUri.addQueryParam(CLICK_ID_PARAM, clickID);
        if (updatedUri) {
          const params = new Map();
          params.set(updatedUri.toString(), null);
          updatedUri = uri.replaceQueryParams(params);
          if (updatedUri) return updatedUri;
        }
        return uri;
      },
    },
  ],
};

function hasValidOrigin(uri) {
  return uri.getOrigin() !== "://";
}

function extractHandler(uri) {
  const domain = Object.keys(domainHandlers).find((domain) =>
    uri.getDomain().endsWith(domain)
  );
  if (!domain) return null;

  const handlers = domainHandlers[domain];
  const applicableHandler = handlers
    .map((handler) => {
      const extractedUri = handler.extractor(uri);
      return extractedUri
        ? { injector: handler.injector, uri: extractedUri }
        : null;
    })
    .find((handler) => handler !== null);

  return applicableHandler || null;
}

function isClickIDBlocked(uri) {
  if (isClickIDBlacklistSVDomainURI(uri) || isClickIDBlocklistSVUrlPath(uri))
    return true;

  const handler = extractHandler(uri);
  return handler ? isClickIDBlocked(handler.uri) : false;
}

function shouldAppendClickID(uri) {
  return (
    !isFacebookURI(uri) &&
    !isFacebookSVDomainURI(uri) &&
    !isCdnURI(uri) &&
    !isFbDotComURI(uri) &&
    hasValidOrigin(uri) &&
    ["http", "https"].includes(uri.getProtocol()) &&
    !isClickIDBlocked(uri)
  );
}

function appendClickID(uri, clickID) {
  const handler = extractHandler(uri);
  if (handler) {
    return handler.injector(uri, handler.uri, clickID);
  }

  const updatedUri = uri.addQueryParam(CLICK_ID_PARAM, clickID);
  return updatedUri || uri;
}

function appendClickIDQueryParam(uri, clickID) {
  return shouldAppendClickID(uri) ? appendClickID(uri, clickID) : uri;
}

export { appendClickIDQueryParam };
