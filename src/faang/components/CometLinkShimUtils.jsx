/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import gkx from "gkx";

import ConstUri from "../../helpers/ConstUriUtils";
import isLinkshimURI from "../../helpers/isLinkshimURI";
import isRelativeURL from "../../helpers/isRelativeURL";
import isTrustedDestination from "../../helpers/isTrustedDestination";
import { LinkshimHandlerConfig } from "../../helpers/LinkshimHandlerConfig";
import Random from "../../helpers/Random";
import { appendClickIDQueryParam } from "../components/CometClickIDParameterUtils";
import { getShimmedHref } from "../components/CometLynxGeneration";

function isLinkShimRequired(uri) {
  if (!LinkshimHandlerConfig.is_linkshim_supported) return false;
  if (isRelativeURL(uri.toString())) return false;
  const protocol = uri.getProtocol();
  return (
    (protocol === "http" || protocol === "https") && !isTrustedDestination(uri)
  );
}

const domainRegex = /^(l|lm|h)\..*$/i;

function upgradeToHttps(uri) {
  if (uri.getProtocol() !== "http") return null;
  if (!isTrustedDestination(uri)) return null;
  return domainRegex.test(uri.getDomain()) ? null : uri.setProtocol("https");
}

function isGhlEncrypted(uri) {
  const encParam = uri.getQueryParams().get("enc");
  return String(encParam) === "1" && gkx("22875");
}

const defaultLinkShimInfo = { href: "#", shimmed: false };

// eslint-disable-next-line max-params
function getLinkShimInfo(
  href,
  callbacks,
  trackingNodes,
  clickID,
  isEmbed,
  forceUnshim
) {
  if (!href || href === "#") return defaultLinkShimInfo;

  let uri = ConstUri.getUri(href);
  if (!uri) return defaultLinkShimInfo;

  const ghlEncrypted = isGhlEncrypted(uri);
  let linkShimHash = LinkshimHandlerConfig.link_react_default_hash;

  if (isLinkshimURI(uri) && !ghlEncrypted) {
    const queryParams = uri.getQueryParams();
    const linkshimUrl = queryParams.get(
      LinkshimHandlerConfig.linkshim_url_param
    );
    const encParam = queryParams.get(LinkshimHandlerConfig.linkshim_enc_param);

    const shimmedUri = ConstUri.getUri(String(linkshimUrl));
    if (shimmedUri) {
      uri = shimmedUri;
      linkShimHash = String(encParam);
    }
  }

  if (ghlEncrypted) {
    const uriWithoutEnc = uri.removeQueryParam("enc");
    if (uriWithoutEnc) uri = uriWithoutEnc;
  }

  const clickIDs = LinkshimHandlerConfig.click_ids;
  let clickIDAppended = false;

  if (clickIDs && clickIDs.length > 0) {
    let clickIDToAppend = null;
    if (clickID && gkx("22876")) {
      clickIDToAppend = clickID;
    } else {
      const randomIndex = Math.floor(Random.random() * clickIDs.length);
      clickIDToAppend = clickIDs[randomIndex];
    }
    uri = appendClickIDQueryParam(uri, clickIDToAppend);
    clickIDAppended = true;
  }

  const upgradedUri = upgradeToHttps(uri);
  if (upgradedUri) uri = upgradedUri;

  if (isLinkShimRequired(uri) && !isEmbed && !ghlEncrypted) {
    const shimmedHref = getShimmedHref(
      uri,
      linkShimHash,
      { callbacks, trackingNodes },
      forceUnshim
    );
    const isBlocklisted = LinkshimHandlerConfig.blocklisted_domains.some(
      (domain) => uri.toString().includes(domain)
    );

    if (isBlocklisted) {
      return {
        clickIDAppended,
        href: shimmedHref.toString(),
        shimmed: true,
        unshimmedHref: shimmedHref.toString(),
      };
    } else {
      return {
        clickIDAppended,
        ghlEncrypted,
        href: shimmedHref.toString(),
        shimmed: true,
        unshimmedHref: forceUnshim
          ? uri.toStringPreserveQuery()
          : uri.toString(),
      };
    }
  } else {
    return {
      clickIDAppended,
      ghlEncrypted,
      href: forceUnshim ? uri.toStringPreserveQuery() : uri.toString(),
      shimmed: false,
    };
  }
}

const useRelNoReferrer = LinkshimHandlerConfig.use_rel_no_referrer;

export { getLinkShimInfo, useRelNoReferrer };
