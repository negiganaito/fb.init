/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { CometPersistQueryParams } from "./CometPersistQueryParams";
import ConstUri from "./ConstUriUtils";
import isRelativeURL from "./isRelativeURL";

function appendQueryParamsToUrl(url, params) {
  const uri = ConstUri.getUri(url);
  if (!uri) return url;

  const updatedUri = uri.addQueryParams(new Map(Object.entries(params)));
  return updatedUri ? updatedUri.toString() : url;
}

function appendPersistQueryParamsToUrl(url) {
  const uri = ConstUri.getUri(url);
  if (!uri) return url;

  if (isRelativeURL(url) || uri.getDomain() === "") {
    return appendQueryParamsToUrl(url, CometPersistQueryParams.relative);
  }

  const domain = uri.getDomain().split(".").slice(-2).join(".");
  const domainParams = CometPersistQueryParams.domain[domain];

  return domainParams ? appendQueryParamsToUrl(url, domainParams) : url;
}

export default appendPersistQueryParamsToUrl;
