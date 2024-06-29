/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";

import CometLruCache from "./CometLruCache";
import isSameOrigin from "./isSameOrigin";
import PHPQuerySerializer from "./PHPQuerySerializer";
import PHPQuerySerializerNoEncoding from "./PHPQuerySerializerNoEncoding";
import structuredClone from "./structuredClone";
import { parseURI } from "./URIRFC3986";
import { isAllowed, Options } from "./URISchemes";

const cache = CometLruCache(5000);
const facebookDomainRegex = /(^|\.)facebook\.com$/i;
const unsafeProtocolRegex = /^(?:[^\/]*:|[\x00-\x1f]*\/[\x00-\x1f]*\/)/;
const unsafeCharsRegex =
  /[\x00-\x2c\x2f\x3b-\x40\x5c\x5e\x60\x7b-\x7f\uFDD0-\uFDEF\uFFF0-\uFFFF\u2047\u2048\uFE56\uFE5F\uFF03\uFF0F\uFF1F]/;

const uriConfig = [
  "dms.netmng.com",
  "doubleclick.net",
  "r.msn.com",
  "watchit.sky.com",
  "graphite.instagram.com",
  "www.kfc.co.th",
  "learn.pantheon.io",
  "www.landmarkshops.in",
  "www.ncl.com",
  "s0.wp.com",
  "www.tatacliq.com",
  "bs.serving-sys.com",
  "kohls.com",
  "lazada.co.th",
  "xg4ken.com",
  "technopark.ru",
  "officedepot.com.mx",
  "bestbuy.com.mx",
  "booking.com",
  "nibio.no",
  "myworkdayjobs.com",
  "united-united.com",
  "gcc.gnu.org",
].map((uri) => ({
  domain: uri,
  valid: isValidDomain(uri),
}));

const domainFilters = [];
const queryParamFilters = [];

function serializeQueryParams(queryParams, serializer) {
  const params = {};
  queryParams.forEach((value, key) => {
    params[key] = value;
  });
  return serializer.serialize(params);
}

function getSerializer(domain, protocol, query) {
  if (["http", "https"].includes(protocol) && shouldUseRawQuery(domain)) {
    if (
      domain?.includes("doubleclick.net") &&
      query !== null &&
      !query.startsWith("http")
    ) {
      return PHPQuerySerializer;
    }
    return PHPQuerySerializerNoEncoding;
  }
  return PHPQuerySerializer;
}

function shouldUseRawQuery(domain) {
  if (domain === null) return false;
  return uriConfig.some(
    (config) => config.valid && isSubdomainOfDomain(domain, config.domain)
  );
}

function isValidDomain(domain) {
  return !unsafeCharsRegex.test(domain);
}

function buildUriString(components, escapeQueryParams = false) {
  const {
    domain,
    protocol,
    path,
    port,
    queryParams,
    fragment,
    fragmentSeparator,
    originalRawQuery,
    isGeneric,
    serializer,
  } = components;
  const base = `${protocol ? `${protocol}:` : ""}${isGeneric ? "" : "//"}${
    domain ?? ""
  }${port ? `:${port}` : ""}${path ?? ""}`;
  const queryString = escapeQueryParams
    ? originalRawQuery ?? ""
    : serializeQueryParams(queryParams, serializer);
  const fragmentString = fragment
    ? `#${fragment}`
    : fragmentSeparator
    ? "#"
    : "";
  return `${base}${queryString ? `?${queryString}` : ""}${fragmentString}`;
}

class ConstUri {
  constructor(components) {
    this.domain = components.domain ?? "";
    this.fragment = components.fragment ?? "";
    this.fragmentSeparator = components.fragmentSeparator ?? false;
    this.isGenericProtocol = components.isGeneric ?? false;
    this.path = components.path ?? "";
    this.originalRawQuery = components.originalRawQuery ?? null;
    this.port = components.port ?? null;
    this.protocol = components.protocol ?? "";
    this.queryParams = components.queryParams ?? new Map();
    this.serializer = components.serializer ?? PHPQuerySerializer;
    this.subdomain = components.subdomain ?? null;
    this.userInfo = components.userInfo ?? null;
  }

  addQueryParam(key, value) {
    if (key) {
      const newQueryParams = new Map(this.queryParams);
      newQueryParams.set(key, value);
      return ConstUri.getUriFromObject({
        ...this.getComponents(),
        queryParams: newQueryParams,
      });
    }
    return this;
  }

  addQueryParams(params) {
    if (params.size > 0) {
      const newQueryParams = new Map(this.queryParams);
      params.forEach((value, key) => {
        newQueryParams.set(key, value);
      });
      return ConstUri.getUriFromObject({
        ...this.getComponents(),
        queryParams: newQueryParams,
      });
    }
    return this;
  }

  addQueryParamString(paramString) {
    if (paramString) {
      const paramStringWithoutQuestionMark = paramString.startsWith("?")
        ? paramString.slice(1)
        : paramString;
      const newQueryParams = new Map(this.queryParams);
      paramStringWithoutQuestionMark.split("&").forEach((param) => {
        const [key, value] = param.split("=");
        newQueryParams.set(key, value);
      });
      return ConstUri.getUriFromObject({
        ...this.getComponents(),
        queryParams: newQueryParams,
      });
    }
    return this;
  }

  addTrailingSlash() {
    const path = this.getPath();
    return path.length > 0 && path[path.length - 1] !== "/"
      ? this.setPath(path + "/")
      : this;
  }

  getDomain() {
    return this.domain;
  }

  getFragment() {
    return this.fragment;
  }

  getOrigin() {
    const port = this.getPort();
    return `${this.getProtocol()}://${this.getDomain()}${
      port ? `:${port}` : ""
    }`;
  }

  getOriginalRawQuery() {
    return this.originalRawQuery;
  }

  getPath() {
    return this.path;
  }

  getPort() {
    return this.port;
  }

  getProtocol() {
    return this.protocol.toLowerCase();
  }

  getQualifiedUri() {
    if (!this.getDomain()) {
      let href = (typeof window !== "undefined" ? window : this).location.href;
      if (ExecutionEnvironment.isInWorker && href && href.startsWith("blob:")) {
        href = href.substring(5);
      }
      href = href.slice(0, href.indexOf("/", href.indexOf(":") + 3));
      return ConstUri.getUri(href + this.toString());
    }
    return this;
  }

  getQueryParam(key) {
    const value = this.queryParams.get(key);
    return typeof value === "string"
      ? value
      : value !== null
      ? JSON.parse(JSON.stringify(value))
      : null;
  }

  getQueryData() {
    return Object.fromEntries(this.queryParams);
  }

  getQueryParams() {
    return structuredClone
      ? structuredClone(this.queryParams)
      : new Map(JSON.parse(JSON.stringify([...this.queryParams])));
  }

  getQueryString(escapeQueryParams = false) {
    return serializeQueryParams(this.queryParams, this.serializer);
  }

  getRegisteredDomain() {
    if (!this.getDomain()) return "";
    if (!this.isFacebookUri()) return null;
    const parts = this.getDomain().split(".");
    const index =
      parts.indexOf("facebook") === -1
        ? parts.indexOf("workplace")
        : parts.indexOf("facebook");
    return parts.slice(index).join(".");
  }

  getSerializer() {
    return this.serializer;
  }

  getSubdomain() {
    return this.subdomain;
  }

  getUnqualifiedUri() {
    if (this.getDomain()) {
      const uriString = this.toString();
      return ConstUri.getUri(
        uriString.slice(uriString.indexOf("/", uriString.indexOf(":") + 3))
      );
    }
    return this;
  }

  hasFragmentSeparator() {
    return this.fragmentSeparator;
  }

  isEmpty() {
    return !(
      this.getPath() ||
      this.getProtocol() ||
      this.getDomain() ||
      this.getPort() ||
      this.queryParams.size > 0 ||
      this.getFragment()
    );
  }

  isFacebookUri() {
    const uriString = this.toString();
    if (uriString === "") return false;
    return !this.getDomain() && !this.getProtocol()
      ? true
      : ["https", "http"].indexOf(this.getProtocol()) !== -1 &&
          facebookDomainRegex.test(this.getDomain());
  }

  isGeneric() {
    return this.isGenericProtocol;
  }

  isSameOrigin(other) {
    return isSameOrigin(this, other);
  }

  isSubdomainOfDomain(domain) {
    const uri = ConstUri.getUri(domain);
    return uri !== null && isSubdomainOfDomain(this.domain, domain);
  }

  isSecure() {
    return this.getProtocol() === "https";
  }

  removeQueryParams(keys) {
    if (Array.isArray(keys) && keys.length > 0) {
      const newQueryParams = new Map(this.queryParams);
      keys.forEach((key) => newQueryParams.delete(key));
      return ConstUri.getUriFromObject({
        ...this.getComponents(),
        queryParams: newQueryParams,
      });
    }
    return this;
  }

  removeQueryParam(key) {
    if (key) {
      const newQueryParams = new Map(this.queryParams);
      newQueryParams.delete(key);
      return ConstUri.getUriFromObject({
        ...this.getComponents(),
        queryParams: newQueryParams,
      });
    }
    return this;
  }

  replaceQueryParam(key, value) {
    if (key) {
      const newQueryParams = new Map(this.queryParams);
      newQueryParams.set(key, value);
      return ConstUri.getUriFromObject({
        ...this.getComponents(),
        queryParams: newQueryParams,
      });
    }
    return this;
  }

  replaceQueryParams(params) {
    return ConstUri.getUriFromObject({
      ...this.getComponents(),
      queryParams: params,
    });
  }

  replaceQueryParamString(paramString) {
    if (paramString) {
      const paramStringWithoutQuestionMark = paramString.startsWith("?")
        ? paramString.slice(1)
        : paramString;
      const newQueryParams = new Map(this.queryParams);
      paramStringWithoutQuestionMark.split("&").forEach((param) => {
        const [key, value] = param.split("=");
        newQueryParams.set(key, value);
      });
      return ConstUri.getUriFromObject({
        ...this.getComponents(),
        queryParams: newQueryParams,
      });
    }
    return this;
  }

  setDomain(domain) {
    if (domain) {
      const subdomain =
        domain.split(".").length >= 3 ? domain.split(".")[0] : "";
      return ConstUri.getUriFromObject({
        ...this.getComponents(),
        domain,
        subdomain,
      });
    }
    return this;
  }

  setFragment(fragment) {
    return fragment === "#"
      ? ConstUri.getUriFromObject({
          ...this.getComponents(),
          fragment: "",
          fragmentSeparator: true,
        })
      : ConstUri.getUriFromObject({
          ...this.getComponents(),
          fragment,
          fragmentSeparator: fragment !== "",
        });
  }

  setPath(path) {
    return path !== null
      ? ConstUri.getUriFromObject({ ...this.getComponents(), path })
      : this;
  }

  setPort(port) {
    return port
      ? ConstUri.getUriFromObject({ ...this.getComponents(), port })
      : this;
  }

  setProtocol(protocol) {
    return protocol
      ? ConstUri.getUriFromObject({ ...this.getComponents(), protocol })
      : this;
  }

  setSecure(secure) {
    return this.setProtocol(secure ? "https" : "http");
  }

  setSubDomain(subdomain) {
    if (subdomain) {
      const parts = this.domain.split(".");
      if (parts.length >= 3) {
        parts[0] = subdomain;
      } else {
        parts.unshift(subdomain);
      }
      return ConstUri.getUriFromObject({
        ...this.getComponents(),
        domain: parts.join("."),
        subdomain,
      });
    }
    return this;
  }

  stripTrailingSlash() {
    return this.setPath(this.getPath().replace(/\/$/, ""));
  }

  toStringRawQuery() {
    if (this.rawStringValue === null) {
      this.rawStringValue = buildUriString(this.getComponents(), true);
    }
    return this.rawStringValue;
  }

  toString() {
    if (this.stringValue === null) {
      this.stringValue = buildUriString(this.getComponents());
    }
    return this.stringValue;
  }

  toStringPreserveQuery() {
    return buildUriString(this.getComponents(), true);
  }

  getComponents() {
    return {
      domain: this.domain,
      fragment: this.fragment,
      fragmentSeparator: this.fragmentSeparator,
      isGeneric: this.isGenericProtocol,
      originalRawQuery: this.originalRawQuery,
      path: this.path,
      port: this.port,
      protocol: this.protocol,
      queryParams: this.queryParams,
      serializer: this.serializer,
      subdomain: this.subdomain,
      userInfo: this.userInfo,
    };
  }

  static getUri(uriString) {
    const trimmedUriString = uriString.trim();
    const cachedUri = cache.get(trimmedUriString);
    if (cachedUri) return cachedUri;

    const parsedUri = parseUri(trimmedUriString);
    if (!parsedUri.valid) {
      console.warn(parsedUri.error);
      return null;
    }

    const newUri = new ConstUri(parsedUri.components);
    cache.set(trimmedUriString, newUri);
    return newUri;
  }

  static getUriFromObject(components) {
    const uriString = buildUriString(components);
    const cachedUri = cache.get(uriString);
    if (cachedUri) return cachedUri;

    const validUriComponents = validateUriComponents(components);
    if (!validUriComponents.valid) {
      console.log(validUriComponents.error, "ConstUri");
      return null;
    }

    const newUri = new ConstUri(validUriComponents.components);
    cache.set(uriString, newUri);
    return newUri;
  }

  static isValidUri(uriString) {
    const cachedUri = cache.get(uriString);
    if (cachedUri) return true;

    const parsedUri = parseUri(uriString);
    if (parsedUri.valid) {
      cache.set(uriString, new ConstUri(parsedUri.components));
      return true;
    }
    return false;
  }
}

function parseUri(uriString) {
  const uri = parseURI(uriString) || {
    fragment: null,
    host: null,
    isGenericURI: false,
    query: null,
    scheme: null,
    userinfo: null,
  };

  const domain = uri.host ?? "";
  const subdomain = domain.split(".").length >= 3 ? domain.split(".")[0] : "";
  const serializer = getSerializer(domain, uri.scheme ?? "", uri.query);
  const queryParams = new Map(
    Object.entries(serializer.deserialize(uri.query ?? "") ?? {})
  );

  const components = {
    domain,
    fragment: uri.fragment ?? "",
    fragmentSeparator: uri.fragment === "",
    isGeneric: uri.isGenericURI,
    originalRawQuery: uri.query ?? null,
    path: uri.path ?? "",
    port: uri.port ? String(uri.port) : null,
    protocol: (uri.scheme ?? "").toLowerCase(),
    queryParams,
    serializer,
    subdomain,
    userInfo: uri.userinfo ?? null,
  };

  return validateUriComponents(components);
}

function validateUriComponents(components, rawUriString = null) {
  const result = {
    components: { ...components },
    error: "",
    valid: true,
  };

  if (!isAllowed(components.protocol, Options.INCLUDE_DEFAULTS, rawUriString)) {
    result.valid = false;
    result.error = `The URI protocol "${components.protocol}" is not allowed.`;
    return result;
  }

  if (!isValidDomain(components.domain ?? "")) {
    result.valid = false;
    result.error = `This is an unsafe domain ${components.domain}`;
    return result;
  }

  if (components.userInfo) {
    result.valid = false;
    result.error = `Invalid URI: (userinfo is not allowed in a URI ${components.userInfo})`;
    return result;
  }

  const uriString = rawUriString ?? buildUriString(components, false);
  if (!components.domain && components.path.includes("\\")) {
    result.valid = false;
    result.error = `Invalid URI: (no domain but multiple back-slashes ${uriString})`;
    return result;
  }

  if (!components.protocol && unsafeProtocolRegex.test(uriString)) {
    result.valid = false;
    result.error = `Invalid URI: (unsafe protocol-relative URI ${uriString})`;
    return result;
  }

  if (
    components.domain &&
    components.path &&
    !components.path.startsWith("/")
  ) {
    result.valid = false;
    result.error = `Invalid URI: (domain and path where path lacks leading slash ${uriString})`;
    return result;
  }

  return result;
}

export default ConstUri;
export const isConstUri = (uri) => uri instanceof ConstUri;
export const registerDomainFilter = (filter) => {
  domainFilters.push(filter);
};
export const registerQueryParamsFilter = (filter) => {
  queryParamFilters.push(filter);
};
export const getUri = ConstUri.getUri;
export const isValidUri = ConstUri.isValidUri;
export const isSubdomainOfDomain = (domain, subdomain) =>
  domain.endsWith(subdomain) &&
  (domain.length === subdomain.length ||
    domain[domain.length - subdomain.length - 1] === ".");
