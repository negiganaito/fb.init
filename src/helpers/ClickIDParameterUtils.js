/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import compactArray from "fbjs/lib/compactArray";

import first from "./first";
import isCdnURI from "./isCdnURI";
import isClickIDBlacklistSVDomainURI from "./isClickIDBlacklistSVDomainURI";
import isClickIDBlocklistSVUrlPath from "./isClickIDBlocklistSVUrlPath";
import isFacebookSVDomainURI from "./isFacebookSVDomainURI";
import isFacebookURI from "./isFacebookURI";
import isFbDotComURI from "./isFbDotComURI";
import URI from "./URI";

const protocols = new Set(["http", "https"]);
const QUERY_PARAM = "fbclid";
const domains = {
  "doubleclick.net": [
    {
      extractor: (uri) => {
        const queryString = uri.getQueryString();
        return queryString !== null && queryString.startsWith("http")
          ? new URI(queryString)
          : null;
      },
      injector: (uri, queryUri, clickId) => {
        const updatedQueryUri = queryUri.addQueryData(QUERY_PARAM, clickId);
        return uri.setQueryString(updatedQueryUri.toString());
      },
    },
  ],
};

const hasValidProtocol = (uri) => protocols.has(uri.getProtocol());

const hasNonEmptyComponents = (uri) => {
  const protocol = uri.getProtocol();
  const domain = uri.getDomain();
  const port = uri.getPort();
  return (
    (protocol && protocol.length > 0) ||
    (domain && domain.length > 0) ||
    (port && port.length > 0)
  );
};

const getMatchingDomainRule = (uri) => {
  const domainKey = first(
    Object.keys(domains).filter((domain) => uri.getDomain().endsWith(domain))
  );
  const rules = domainKey !== null ? domains[domainKey] : null;
  return rules === null
    ? null
    : first(
        compactArray(
          rules.map((rule) => {
            const extractedUri = rule.extractor(uri);
            return extractedUri === null
              ? null
              : { injector: rule.injector, uri: extractedUri };
          })
        )
      );
};

const isEligibleForAppending = (uri) => {
  return (
    !isFacebookURI(uri) &&
    !isFacebookSVDomainURI(uri) &&
    !isCdnURI(uri) &&
    !isFbDotComURI(uri) &&
    hasNonEmptyComponents(uri) &&
    hasValidProtocol(uri) &&
    !isBlacklisted(uri)
  );
};

const isBlacklisted = (uri) => {
  const isBlacklistedDomain = isClickIDBlacklistSVDomainURI(uri);
  const isBlacklistedPath = isClickIDBlocklistSVUrlPath(uri);
  if (isBlacklistedDomain || isBlacklistedPath) return true;
  const matchingDomainRule = getMatchingDomainRule(uri);
  return matchingDomainRule !== null
    ? isBlacklisted(matchingDomainRule.uri)
    : false;
};

const appendClickIDQueryParam = (uri, clickId) => {
  const matchingDomainRule = getMatchingDomainRule(uri);
  return matchingDomainRule !== null
    ? matchingDomainRule.injector(uri, matchingDomainRule.uri, clickId)
    : uri.addQueryData(QUERY_PARAM, clickId);
};

const appendClickID = (uri, clickId) => {
  return isEligibleForAppending(uri)
    ? appendClickIDQueryParam(uri, clickId)
    : uri;
};

export { appendClickID as appendClickIDQueryParam, QUERY_PARAM };
