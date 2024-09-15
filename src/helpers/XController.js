/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import XControllerURIBuilder from "./XControllerURIBuilder";
import XRequest from "./XRequest";

class XController {
  constructor(uri, params) {
    this.uri = uri;
    this.params = params;
  }

  getURIBuilder(requestParams) {
    const uriBuilder = new XControllerURIBuilder(this.uri, this.params);
    if (requestParams) {
      const request = this.getRequest(requestParams);
      Object.keys(this.params).forEach((paramKey) => {
        const paramConfig = this.params[paramKey];
        let methodSuffix = "";

        if (
          !paramConfig.required &&
          !Object.prototype.hasOwnProperty.call(paramConfig, "defaultValue")
        ) {
          methodSuffix = "Optional";
        }

        const getMethod = `get${methodSuffix}${paramConfig.type}`;
        const paramValue = request[getMethod](paramKey);

        if (
          paramValue === null ||
          (Object.prototype.hasOwnProperty.call(paramConfig, "defaultValue") &&
            paramValue === paramConfig.defaultValue)
        ) {
          return;
        }

        const setMethod = `set${paramConfig.type}`;
        uriBuilder[setMethod](paramKey, paramValue);
      });
    }
    return uriBuilder;
  }

  getRequest(requestParams) {
    return new XRequest(this.uri, this.params, requestParams);
  }

  static create(uri, params) {
    return new XController(uri, params);
  }
}

export default XController;
