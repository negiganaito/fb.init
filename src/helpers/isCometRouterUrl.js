/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import memoizeStringOnly from "fbjs/lib/memoizeStringOnly";

import ConstUri from "./ConstUriUtils";
import Env from "./Env";
import isFacebookURI from "./isFacebookURI";
import isLinkshimURI from "./isLinkshimURI";
import justknobx from "./justknobx";
import uriIsRelativePath from "./uriIsRelativePath";

const isSpecialPath = (path) =>
  path === "/l.php" ||
  path.startsWith("/si/ajax/l/") ||
  path.startsWith("/l/") ||
  path.startsWith("l/");
const isFacebookMainDomain = (uri) => {
  const domain = uri.getDomain();
  return domain !== null && isFacebookURI(uri) && domain.startsWith("www");
};

const cometRouterPattern = /^(\/\w)/;

const isCometRouterUrl = memoizeStringOnly((url) => {
  if (url === null || url.startsWith("#") || !ConstUri.isValidUri(url))
    return false;

  const uri = ConstUri.getUri(url);
  if (uri === null) return false;

  if (isSpecialPath(uri.getPath()) || cometRouterPattern.test(url)) return true;
  if (isLinkshimURI(uri)) return false;
  if (justknobx._("1417") && uriIsRelativePath(uri)) return true;

  const currentUri = ConstUri.getUri(window.location.href);
  const isSameOrigin = currentUri
    ? uri.isSameOrigin(currentUri) || uriIsRelativePath(uri)
    : false;

  const isSpecialEnv =
    (Env.isStoryGallery && isFacebookMainDomain(uri)) ||
    (Env.isAdsPreviewTool && isFacebookMainDomain(uri));

  return isSameOrigin || isSpecialEnv;
});

export default isCometRouterUrl;
