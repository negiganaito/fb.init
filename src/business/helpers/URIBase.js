/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";

import PHPQuerySerializerNoEncoding from "./PHPQuerySerializerNoEncoding";
import URIAbstractBase from "./URIAbstractBase";
import { isDomainNeedRawQuery } from "./UriNeedRawQuerySVChecker";
import { Options } from "./URISchemes";

let h;

// eslint-disable-next-line max-params
const parseURI = (a, b, d, e) => {
  try {
    return URIAbstractBase.parse(a, b, d, e);
  } catch (error) {
    throw new Error(error.message);
  }
};

class URIBase extends URIAbstractBase {
  // eslint-disable-next-line max-params
  constructor(b, c, e, f) {
    e = e === undefined ? Options.INCLUDE_DEFAULTS : e;
    super(b, c, e, f);
    this.$URIBase1 = c;
    parseURI(this, b, true, c);
  }

  // eslint-disable-next-line max-params
  static tryParse(a, c, e, f) {
    e = e === undefined ? Options.INCLUDE_DEFAULTS : e;
    const uriBase = new URIBase(null, c, e, f);
    return parseURI(uriBase, a, false, c) ? uriBase : null;
  }

  // eslint-disable-next-line max-params
  static isValid(a, c, e, f) {
    e = e === undefined ? Options.INCLUDE_DEFAULTS : e;
    return !!URIBase.tryParse(a, c, e, f);
  }

  setDomain(b) {
    try {
      super.setDomain(b);
    } catch (error) {
      throw new Error(error.message);
    }
    return this;
  }

  getQualifiedURIBase() {
    return new URIBase(this, this.$URIBase1).qualify();
  }

  qualify() {
    if (!this.getDomain()) {
      let a = (typeof window !== "undefined" ? window : this).location.href;
      (h || (h = ExecutionEnvironment)).isInWorker &&
        a &&
        a.startsWith("blob:") &&
        (a = a.substring(5, a.length));
      const uriBase = new URIBase(a, this.$URIBase1);
      this.setProtocol(uriBase.getProtocol())
        .setDomain(uriBase.getDomain())
        .setPort(uriBase.getPort());
    }
    return this;
  }

  isSubdomainOfDomain(a) {
    const c = this.getDomain();
    return URIBase.isDomainSubdomainOfDomain(c, a, this.$URIBase1);
  }

  static isDomainSubdomainOfDomain(a, c, d) {
    if (c === "" || a === "") return false;
    if (a.endsWith(c)) {
      const e = a.length;
      const f = c.length;
      const g = e - f - 1;
      if (e === f || a[g] === ".") {
        const uriBase = new URIBase(null, d);
        uriBase.setDomain(c);
        return URIBase.isValid(uriBase, d);
      }
    }
    return false;
  }

  toString() {
    return super.toString(isDomainNeedRawQuery, PHPQuerySerializerNoEncoding);
  }

  toStringRawQuery() {
    return super.toStringRawQuery(
      isDomainNeedRawQuery,
      PHPQuerySerializerNoEncoding
    );
  }

  toStringPreserveQuery() {
    return super.toStringPreserveQuery(
      isDomainNeedRawQuery,
      PHPQuerySerializerNoEncoding
    );
  }

  toStringStrictQueryEncoding() {
    return super.toStringStrictQueryEncoding(isDomainNeedRawQuery);
  }

  getQueryString(b = false) {
    return super.getQueryString(
      b,
      isDomainNeedRawQuery,
      PHPQuerySerializerNoEncoding
    );
  }
}

export default URIBase;
