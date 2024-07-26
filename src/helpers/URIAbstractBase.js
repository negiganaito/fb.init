/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import invariant from "fbjs/lib/invariant";

import isSameOrigin from "./isSameOrigin";
import PHPStrictQuerySerializer from "./PHPStrictQuerySerializer";
import setHostSubdomain from "./setHostSubdomain";
import { parseURI } from "./URIRFC3986";
import { isAllowed, Options } from "./URISchemes";

const INVALID_CHAR_REGEXP =
  /[\x00-\x2c\x2f\x3b-\x40\x5c\x5e\x60\x7b-\x7f\uFDD0-\uFDEF\uFFF0-\uFFFF\u2047\u2048\uFE56\uFE5F\uFF03\uFF0F\uFF1F]/;
const UNSAFE_PATH_REGEXP = /^(?:[^\/]*:|[\x00-\x1f]*\/[\x00-\x1f]*\/)/;
const filters = [];

class URIAbstractBase {
  // eslint-disable-next-line max-params, complexity
  static parse(c, d, e, f) {
    if (!d) return true;
    if (d instanceof URIAbstractBase) {
      c.setProtocol(d.getProtocol());
      c.setDomain(d.getDomain());
      c.setPort(d.getPort());
      c.setPath(d.getPath());
      c.setQueryData(f.deserialize(f.serialize(d.getQueryData())));
      c.setFragment(d.getFragment());
      c.setIsGeneric(d.getIsGeneric());
      c.setForceFragmentSeparator(d.getForceFragmentSeparator());
      c.setOriginalRawQuery(d.getOriginalRawQuery());
      c.setQueryParamModified(false);
      return true;
    }

    d = d.toString().trim();
    const g = parseURI(d) || {
      fragment: null,
      scheme: null,
      query: null,
    };
    if (!e && !isAllowed(g.scheme, c.options, c.allowed)) return false;
    c.setProtocol(g.scheme || "");
    if (!e && INVALID_CHAR_REGEXP.test(g.host || "")) return false;
    c.setDomain(g.host || "");
    c.setPort(g.port || "");
    c.setPath(g.path || "");
    if (e) {
      c.setQueryData(f.deserialize(g.query || "") || {});
    } else {
      try {
        c.setQueryData(f.deserialize(g.query || "") || {});
      } catch (error) {
        return false;
      }
    }
    c.setFragment(g.fragment || "");
    if (g.fragment === "") c.setForceFragmentSeparator(true);
    c.setIsGeneric(g.isGenericURI || false);
    c.setOriginalRawQuery(g.query);
    c.setQueryParamModified(false);

    if (g.userinfo !== null) {
      if (e)
        throw new Error(
          `URI.parse: invalid URI (userinfo is not allowed in a URI): ${d}`
        );
      return false;
    }
    if (!c.getDomain() && c.getPath().includes("\\")) {
      if (e)
        throw new Error(
          `URI.parse: invalid URI (no domain but multiple back-slashes): ${d}`
        );
      return false;
    }
    if (!c.getProtocol() && UNSAFE_PATH_REGEXP.test(d)) {
      if (e)
        throw new Error(
          `URI.parse: invalid URI (unsafe protocol-relative URLs): ${d}'`
        );
      return false;
    }
    if (c.getDomain() && c.getPath() && !c.getPath().startsWith("/")) {
      if (e)
        throw new Error(
          `URI.parse: invalid URI (domain and path where path lacks leading slash): ${d}`
        );
      return false;
    }
    if (
      c.getProtocol() &&
      !c.getIsGeneric() &&
      !c.getDomain() &&
      c.getPath() !== ""
    ) {
      console.warn(
        `URI.parse: invalid URI (protocol "${c.getProtocol()}" with no domain)`
      );
    }
    return true;
  }

  // eslint-disable-next-line max-params
  static tryParse(b, c, d, e) {
    d = new URIAbstractBase(null, c, d, e);
    return URIAbstractBase.parse(d, b, false, c) ? d : null;
  }

  // eslint-disable-next-line max-params
  static isValid(b, c, d, e) {
    return !!URIAbstractBase.tryParse(b, c, d, e);
  }

  // eslint-disable-next-line max-params
  constructor(c, d, e = Options.INCLUDE_DEFAULTS, f) {
    if (!d) invariant(0, 2966);
    this.querySerializer = d;
    this.protocol = "";
    this.domain = "";
    this.port = "";
    this.path = "";
    this.fragment = "";
    this.queryData = {};
    this.forceFragmentSeparator = false;
    this.isGeneric = false;
    this.queryParamModified = false;
    this.options = e;
    this.allowed = f;
    URIAbstractBase.parse(this, c, true, d);
    this.originalRawQuery = false;
  }

  setProtocol(a) {
    if (!isAllowed(a, this.options, this.allowed)) invariant(0, 11793, a);
    this.protocol = a;
    return this;
  }

  getProtocol() {
    return (this.protocol || "").toLowerCase();
  }

  setSecure(a) {
    return this.setProtocol(a ? "https" : "http");
  }

  isSecure() {
    return this.getProtocol() === "https";
  }

  setDomain(a) {
    if (INVALID_CHAR_REGEXP.test(a))
      throw new Error(
        `URI.setDomain: unsafe domain specified: ${a} for url ${this.toString()}`
      );
    this.domain = a;
    return this;
  }

  getDomain() {
    return this.domain;
  }

  setPort(a) {
    this.port = a;
    return this;
  }

  getPort() {
    return this.port;
  }

  setPath(a) {
    this.path = a;
    return this;
  }

  getPath() {
    return this.path;
  }

  addQueryData(a, b) {
    if (Object.prototype.toString.call(a) === "[object Object]") {
      Object.assign(this.queryData, a);
    } else {
      this.queryData[a] = b;
    }
    this.queryParamModified = true;
    return this;
  }

  setQueryData(a) {
    this.queryData = a;
    this.queryParamModified = true;
    return this;
  }

  getQueryData() {
    return this.queryData;
  }

  setQueryString(a) {
    return this.setQueryData(this.querySerializer.deserialize(a));
  }

  getQueryString(a = false, b = () => false, c = null) {
    return this._serializeQueryString(false, a, b, c);
  }

  // eslint-disable-next-line max-params
  _serializeQueryString(a = false, b = false, c = () => false, d = null) {
    if (!this.queryParamModified && (b || c(this.getDomain()))) {
      return this.originalRawQuery !== null ? this.originalRawQuery : "";
    }
    return (a && d ? d : this.querySerializer).serialize(this.getQueryData());
  }

  removeQueryData(a) {
    if (!Array.isArray(a)) a = [a];
    for (let b = 0, c = a.length; b < c; ++b) delete this.queryData[a[b]];
    this.queryParamModified = true;
    return this;
  }

  setFragment(a) {
    this.fragment = a;
    this.setForceFragmentSeparator(false);
    return this;
  }

  getFragment() {
    return this.fragment;
  }

  setForceFragmentSeparator(a) {
    this.forceFragmentSeparator = a;
    return this;
  }

  getForceFragmentSeparator() {
    return this.forceFragmentSeparator;
  }

  setIsGeneric(a) {
    this.isGeneric = a;
    return this;
  }

  getIsGeneric() {
    return this.isGeneric;
  }

  getOriginalRawQuery() {
    return this.originalRawQuery;
  }

  setOriginalRawQuery(a) {
    this.originalRawQuery = a;
    return this;
  }

  setQueryParamModified(a) {
    this.queryParamModified = a;
    return this;
  }

  isEmpty() {
    return !(
      this.getPath() ||
      this.getProtocol() ||
      this.getDomain() ||
      this.getPort() ||
      Object.keys(this.getQueryData()).length > 0 ||
      this.getFragment()
    );
  }

  toString(a = () => false, b = null) {
    return this._toString(false, false, a, b);
  }

  toStringRawQuery(a = () => false, b = null) {
    return this._toString(true, false, a, b);
  }

  toStringPreserveQuery(a = () => false, b = null) {
    return this._toString(false, true, a, b);
  }

  toStringStrictQueryEncoding(a = () => false) {
    return this._toString(true, false, a, PHPStrictQuerySerializer);
  }

  // eslint-disable-next-line max-params
  _toString(a = false, b = false, c = () => false, d = null) {
    let e = this;
    for (let f = 0; f < filters.length; f++) e = filters[f](e);
    return e._serializeURI(a, b, c, d);
  }

  // eslint-disable-next-line max-params
  _serializeURI(a = false, b = false, c = () => false, d = null) {
    let e = "";
    const protocol = this.getProtocol();
    if (protocol) e += `${protocol}:${this.getIsGeneric() ? "" : "//"}`;
    const domain = this.getDomain();
    if (domain) e += domain;
    const port = this.getPort();
    if (port) e += `:${port}`;
    const path = this.getPath();
    if (path) e += path;
    else if (e) e += "/";
    const queryString = this._serializeQueryString(a, b, c, d);
    if (queryString) e += `?${queryString}`;
    const fragment = this.getFragment();
    if (fragment) e += `#${fragment}`;
    else if (this.getForceFragmentSeparator()) e += "#";
    return e;
  }

  static registerFilter(a) {
    filters.push(a);
  }

  getOrigin() {
    const port = this.getPort();
    return `${this.getProtocol()}://${this.getDomain()}${
      port ? `:${port}` : ""
    }`;
  }

  isSameOrigin(a) {
    return isSameOrigin(this, a);
  }

  getQualifiedURIBase() {
    return new URIAbstractBase(this, this.querySerializer).qualify();
  }

  qualify() {
    if (!this.getDomain()) {
      const b = new URIAbstractBase(window.location.href, this.querySerializer);
      this.setProtocol(b.getProtocol())
        .setDomain(b.getDomain())
        .setPort(b.getPort());
    }
    return this;
  }

  setSubdomain(a) {
    const qualifiedURI = this.qualify();
    const domain = qualifiedURI.getDomain();
    return this.setDomain(setHostSubdomain(domain, a));
  }

  getSubdomain() {
    if (!this.getDomain()) return "";
    const a = this.getDomain().split(".");
    if (a.length <= 2) return "";
    return a[0];
  }

  isSubdomainOfDomain(b) {
    const c = this.getDomain();
    return URIAbstractBase.isDomainSubdomainOfDomain(
      c,
      b,
      this.querySerializer
    );
  }

  static isDomainSubdomainOfDomain(b, c, d) {
    if (c === "" || b === "") return false;
    if (b.endsWith(c)) {
      const e = b.length;
      const f = c.length;
      const g = e - f - 1;
      if (e === f || b[g] === ".") {
        const e = new URIAbstractBase(null, d);
        e.setDomain(c);
        return URIAbstractBase.isValid(e, d);
      }
    }
    return false;
  }
}

export default URIAbstractBase;
