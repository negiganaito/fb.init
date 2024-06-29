/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import isBarcelonaURI from "./isBarcelonaURI";
import isBulletinDotComURI from "./isBulletinDotComURI";
import isEnterpriseURI from "./isEnterpriseURI";
import isFacebookURI from "./isFacebookURI";
import isInstagramURI from "./isInstagramURI";
import isInternalFBURI from "./isInternalFBURI";
import isMetaDotComURI from "./isMetaDotComURI";
import isOculusDotComURI from "./isOculusDotComURI";
import isRoomsURI from "./isRoomsURI";
import isSecureOculusDotComURI from "./isSecureOculusDotComURI";
import isTrustedCMSContentURI from "./isTrustedCMSContentURI";
import isWhatsAppURI from "./isWhatsAppURI";
import isWorkplaceDotComURI from "./isWorkplaceDotComURI";
import { LinkshimHandlerConfig } from "./LinkshimHandlerConfig";

function isOculusDomain() {
  return /(^|\.)oculus\.com$/.test(LinkshimHandlerConfig.current_domain);
}

function isWorkplaceDomain() {
  return /(^|\.)workplace\.com$/.test(LinkshimHandlerConfig.current_domain);
}

function isWorkroomsDomain() {
  return /(^|\.)workrooms\.com$/.test(LinkshimHandlerConfig.current_domain);
}

function isAccountsCenterDomain() {
  return /(^|\.)accountscenter\.meta\.com$/.test(
    LinkshimHandlerConfig.current_domain
  );
}

function isEnterpriseDomain() {
  return /(^|\.)(facebook|meta)enterprise\.com$/.test(
    LinkshimHandlerConfig.current_domain
  );
}

function isBulletinDomain() {
  return /(^|\.)bulletin\.com$/.test(LinkshimHandlerConfig.current_domain);
}

function isMetaDomain() {
  return /(^|\.)www\.meta\.com$/.test(LinkshimHandlerConfig.current_domain);
}

function isStoreFacebookDomain() {
  return /^store(\..+)?\.facebook\.com$/.test(
    LinkshimHandlerConfig.current_domain
  );
}

function isAboutMetaDomain() {
  return /(^|\.)about\.meta\.com$|^about(\..+)?\.facebook\.com$/.test(
    LinkshimHandlerConfig.current_domain
  );
}

function isInternalFbDomain() {
  return /(^|\.)internalfb\.com$/.test(LinkshimHandlerConfig.current_domain);
}

function isThreadsDomain() {
  return /(^|\.)threads\.net$/.test(LinkshimHandlerConfig.current_domain);
}

function isInstagramDomain() {
  return /(^|\.)instagram\.com$/.test(LinkshimHandlerConfig.current_domain);
}

function isWhatsAppDomain() {
  return /(^|\.)whatsapp\.com$/.test(LinkshimHandlerConfig.current_domain);
}

function isMetaDotComDomain() {
  return /(^|\.)meta\.com$/.test(LinkshimHandlerConfig.current_domain);
}

// eslint-disable-next-line complexity
function isTrustedDestination(uri) {
  if (isRoomsURI(uri) && LinkshimHandlerConfig.is_mobile_device === true) {
    return true;
  }

  if (isWorkplaceDomain()) {
    return isWorkplaceDotComURI(uri) || isMetaDotComURI(uri);
  }

  if (isWorkroomsDomain()) {
    return isMetaDotComURI(uri);
  }

  if (isInternalFbDomain()) {
    return isInternalFBURI(uri) || isFacebookURI(uri);
  }

  if (isOculusDomain()) {
    return isOculusDotComURI(uri) || isSecureOculusDotComURI(uri);
  }

  if (isThreadsDomain()) {
    return isBarcelonaURI(uri);
  }

  if (isInstagramDomain()) {
    return isBarcelonaURI(uri) || isInstagramURI(uri);
  }

  if (isWhatsAppDomain()) {
    return isWhatsAppURI(uri);
  }

  if (isAccountsCenterDomain()) {
    return isFacebookURI(uri) || isInstagramURI(uri);
  }

  if (isEnterpriseDomain()) {
    return isEnterpriseURI(uri);
  }

  if (isBulletinDomain()) {
    return isBulletinDotComURI(uri);
  }

  if (isStoreFacebookDomain() || isMetaDomain() || isAboutMetaDomain()) {
    return isTrustedCMSContentURI(uri);
  }

  return isMetaDotComDomain() ? isMetaDotComURI(uri) : isFacebookURI(uri);
}

export default isTrustedDestination;
