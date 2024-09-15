/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import invariant from "fbjs/lib/invariant";

import gkx from "./gkx";
import isInternalFBURI from "./isInternalFBURI";
import URI from "./URI";

class XControllerURIBuilder {
  constructor(uri, params) {
    this.paramsData = {};
    this.uriTemplate = uri;
    this.paramsConfig = params;
  }

  setInt(param, value) {
    return this._setParam(param, "Int", value);
  }

  setFBID(param, value) {
    return this._setParam(param, "FBID", value);
  }

  setFloat(param, value) {
    return this._setParam(param, "Float", value);
  }

  setString(param, value) {
    return this._setParam(param, "String", value);
  }

  setExists(param, value) {
    if (value === false) value = undefined;
    return this._setParam(param, "Exists", value);
  }

  setBool(param, value) {
    return this._setParam(param, "Bool", value);
  }

  setBoolVector(param, value) {
    return this._setParam(param, "BoolVector", value);
  }

  setEnum(param, value) {
    return this._setParam(param, "Enum", value);
  }

  setPath(param, value) {
    return this._setParam(param, "Path", value);
  }

  setIntVector(param, value) {
    return this._setParam(param, "IntVector", value);
  }

  setIntKeyset(param, value) {
    return this._setParam(param, "IntKeyset", value);
  }

  setIntSet(param, value) {
    return this._setParam(param, "IntSet", value.join(","));
  }

  setFloatVector(param, value) {
    return this._setParam(param, "FloatVector", value);
  }

  setFloatSet(param, value) {
    return this._setParam(param, "FloatSet", value.join(","));
  }

  setStringVector(param, value) {
    return this._setParam(param, "StringVector", value);
  }

  setStringKeyset(param, value) {
    return this._setParam(param, "StringKeyset", value);
  }

  setStringSet(param, value) {
    return this._setParam(param, "StringSet", value);
  }

  setFBIDVector(param, value) {
    return this._setParam(param, "FBIDVector", value);
  }

  setFBIDSet(param, value) {
    return this._setParam(param, "FBIDSet", value);
  }

  setFBIDKeyset(param, value) {
    return this._setParam(param, "FBIDKeyset", value);
  }

  setEnumVector(param, value) {
    return this._setParam(param, "EnumVector", value);
  }

  setEnumSet(param, value) {
    return this._setParam(param, "EnumSet", value);
  }

  setEnumKeyset(param, value) {
    return this._setParam(param, "EnumKeyset", value);
  }

  setIntToIntMap(param, value) {
    return this._setParam(param, "IntToIntMap", value);
  }

  setIntToFloatMap(param, value) {
    return this._setParam(param, "IntToFloatMap", value);
  }

  setIntToStringMap(param, value) {
    return this._setParam(param, "IntToStringMap", value);
  }

  setIntToBoolMap(param, value) {
    return this._setParam(param, "IntToBoolMap", value);
  }

  setStringToIntMap(param, value) {
    return this._setParam(param, "StringToIntMap", value);
  }

  setStringToFloatMap(param, value) {
    return this._setParam(param, "StringToFloatMap", value);
  }

  setStringToStringMap(param, value) {
    return this._setParam(param, "StringToStringMap", value);
  }

  setStringToNullableStringMap(param, value) {
    return this._setParam(param, "StringToNullableStringMap", value);
  }

  setStringToBoolMap(param, value) {
    return this._setParam(param, "StringToBoolMap", value);
  }

  setStringToEnumMap(param, value) {
    return this._setParam(param, "StringToEnumMap", value);
  }

  setEnumToStringVectorMap(param, value) {
    return this._setParam(param, "EnumToStringVectorMap", value);
  }

  setEnumToStringMap(param, value) {
    return this._setParam(param, "EnumToStringMap", value);
  }

  setEnumToBoolMap(param, value) {
    return this._setParam(param, "EnumToBoolMap", value);
  }

  setEnumToEnumMap(param, value) {
    return this._setParam(param, "EnumToEnumMap", value);
  }

  setEnumToIntMap(param, value) {
    return this._setParam(param, "EnumToIntMap", value);
  }

  setEnumToFBIDVectorMap(param, value) {
    return this._setParam(param, "EnumToFBIDVectorMap", value);
  }

  setStringToIntDict(param, value) {
    return this._setParam(param, "StringToIntDict", value);
  }

  setStringToNullableIntDict(param, value) {
    return this._setParam(param, "StringToNullableIntDict", value);
  }

  setStringToFloatDict(param, value) {
    return this._setParam(param, "StringToFloatDict", value);
  }

  setStringToStringKeysetDict(param, value) {
    return this._setParam(param, "StringToStringKeysetDict", value);
  }

  setStringToNullableFloatDict(param, value) {
    return this._setParam(param, "StringToNullableFloatDict", value);
  }

  setStringToStringDict(param, value) {
    return this._setParam(param, "StringToStringDict", value);
  }

  setStringToNullableStringDict(param, value) {
    return this._setParam(param, "StringToNullableStringDict", value);
  }

  setStringToBoolDict(param, value) {
    return this._setParam(param, "StringToBoolDict", value);
  }

  setStringToEnumDict(param, value) {
    return this._setParam(param, "StringToEnumDict", value);
  }

  setEnumToIntDict(param, value) {
    return this._setParam(param, "EnumToIntDict", value);
  }

  setEnumToStringDict(param, value) {
    return this._setParam(param, "EnumToStringDict", value);
  }

  setHackType(param, value) {
    return this._setParam(param, "HackType", value);
  }

  setTypeAssert(param, value) {
    return this._setParam(param, "TypeAssert", value);
  }

  _validateRequiredParamsExistence() {
    for (let param in this.paramsConfig) {
      if (
        this.paramsConfig[param].required &&
        !Object.prototype.hasOwnProperty.call(this.paramsData, param)
      ) {
        invariant(false, "Missing required parameter: %s", param);
      }
    }
  }

  setParams(params) {
    // eslint-disable-next-line guard-for-in
    for (let param in params) {
      this._assertParamExists(param);
      const type = this.paramsConfig[param].type;
      this._setParam(param, type, params[param]);
    }
    return this;
  }

  _assertParamExists(param) {
    invariant(param in this.paramsConfig, "Unknown parameter: %s", param);
  }

  _setParam(param, type, value) {
    this._assertParamExists(param);
    const actualType = this.paramsConfig[param].type;
    const typeAliasMap = {
      StringOrPFBID: "String",
      IntOrPFBID: "Int",
      FBIDOrPFBID: "FBID",
      PaymentLegacyAdAccountID: "Int",
    };
    const expectedType = typeAliasMap[actualType] || actualType;
    invariant(
      type === expectedType,
      "Invalid type for parameter %s: expected %s but got %s",
      param,
      actualType,
      type
    );
    this._setParamInternal(param, value);
    return this;
  }

  _setParamInternal(param, value) {
    this.paramsData[param] = value;
  }

  getRequest_LEGACY_UNTYPED(request) {
    return request.setReplaceTransportMarkers().setURI(this.getURI());
  }

  setPreviousActorIsPageVoice(isPageVoice) {
    this._setParamInternal("paipv", isPageVoice ? 1 : 0);
    return this;
  }

  getURI() {
    this._validateRequiredParamsExistence();
    let queryParams = {};
    let uri = "";
    const templateRegex = /^(.*)?\{(\?)?(\*)?(.+?)\}(.*)?$/;
    const templateParts = this.uriTemplate.split("/");
    let skipOptional = false;

    for (let i = 0; i < templateParts.length; i++) {
      let part = templateParts[i];
      if (part === "") continue;

      const match = templateRegex.exec(part);
      if (!match) {
        uri += `/${part}`;
      } else {
        const isOptional = match[2] === "?";
        const paramName = match[4];
        const paramConfig = this.paramsConfig[paramName];
        invariant(
          paramConfig,
          "Unknown parameter in URI template: %s",
          paramName,
          this.uriTemplate
        );

        if (isOptional && skipOptional) continue;

        const paramValue =
          this.paramsData[paramName] !== null
            ? this.paramsData[paramName]
            : paramConfig.defaultValue;
        invariant(
          paramValue !== null,
          "Missing value for parameter: %s",
          paramName
        );

        uri += `/${match[1] || ""}${paramValue}${match[5] || ""}`;
        queryParams[paramName] = true;
      }
    }

    if (this.uriTemplate.slice(-1) === "/") {
      uri += "/";
    }

    if (uri === "") {
      uri = "/";
    }

    const uriObject = new URI(uri);
    // eslint-disable-next-line guard-for-in
    for (let param in this.paramsData) {
      const value = this.paramsData[param];
      if (!queryParams[param] && value !== null) {
        const paramConfig = this.paramsConfig[param];
        uriObject.addQueryData(
          param,
          paramConfig && paramConfig.type === "Exists" ? null : value
        );
      }
    }

    return uriObject;
  }

  getLookasideURI() {
    let domain = "lookaside.facebook.com";
    if (isInternalFBURI(URI.getRequestURI())) {
      domain = "lookaside.internalfb.com";
    } else if (gkx("21116")) {
      domain = "lookaside.internmc.facebook.com";
    }
    return this.getURI().setDomain(domain).setProtocol("https");
  }

  static create(uri, params) {
    return function () {
      return new XControllerURIBuilder(uri, params);
    };
  }
}

XControllerURIBuilder.prototype.getRequest = function (request) {
  return this.getRequest_LEGACY_UNTYPED(request);
};

export default XControllerURIBuilder;
