/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import ConstUriUtils from "./ConstUriUtils";
// import FBLogger from "FBLogger";
import { getPathParts } from "./routeBuilderUtils";

const hash = "#";

const jsRouteBuilder = (
  basePath,
  defaultParams,
  queryParamKeys,
  pathParams
  //   blameToPreviousFrame = false
  // eslint-disable-next-line max-params
) => {
  const pathParts = getPathParts(basePath);

  const build = (params) => {
    try {
      const combinedParams =
        pathParams !== null
          ? { ...pathParams, ...params }
          : params !== null
          ? params
          : {};
      const usedParams = {};
      let resultPath = "";
      let optionalSkipped = false;

      resultPath = pathParts.reduce((acc, part) => {
        if (!part.isToken) {
          return acc + "/" + part.part;
        } else {
          const { optional, prefix, suffix, token } = part;
          if (optional && optionalSkipped) return acc;

          const value =
            combinedParams[token] !== null
              ? combinedParams[token]
              : defaultParams[token];

          if (value === null && optional) {
            optionalSkipped = true;
            return acc;
          }

          if (value === null)
            throw new Error(`Missing required template parameter: ${token}`);
          if (value === "")
            throw new Error(
              `Required template parameter is an empty string: ${token}`
            );

          usedParams[token] = true;
          return acc + "/" + prefix + value + suffix;
        }
      }, "");

      if (basePath.slice(-1) === "/") resultPath += "/";
      if (resultPath === "") resultPath = "/";

      let uri = ConstUriUtils.getUri(resultPath);

      // eslint-disable-next-line guard-for-in
      for (const key in combinedParams) {
        const value = combinedParams[key];
        if (!usedParams[key] && value !== null && uri !== null) {
          if (queryParamKeys !== null && queryParamKeys.has(key)) {
            if (value !== false) uri = uri.addQueryParam(key, null);
          } else {
            uri = uri.addQueryParam(key, value);
          }
        }
      }

      return [uri, resultPath];
    } catch (error) {
      const errorMessage = error === null ? void 0 : error.message;
      //   let logger = FBLogger("JSRouteBuilder")
      //     .blameToPreviousFrame()
      //     .blameToPreviousFrame();
      //   if (blameToPreviousFrame) logger = logger.blameToPreviousFrame();
      //   logger.mustfix(
      //     "Failed building URI for base path: %s message: %s",
      //     basePath,
      //     errorMessage
      //   );
      console.log(
        `Failed building URI for base path: ${basePath} message: ${errorMessage}`
      );
      return [null, hash];
    }
  };

  return {
    buildUri: (params) => {
      const [uri] = build(params);
      if (uri === null)
        throw new Error("Not even the fallback URL parsed validly!");
      return uri;
    },
    buildUriNullable: (params) => {
      return build(params)[0];
    },
    buildURL: (params) => {
      const [uri, path] = build(params);
      return uri !== null ? uri.toString() : path;
    },
    buildURLStringDEPRECATED: (params) => {
      const [uri, path] = build(params);
      return uri !== null ? uri.toString() : path;
    },
  };
};

export default jsRouteBuilder;
