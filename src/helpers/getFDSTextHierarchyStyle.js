/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import memoizeWithArgs from "./memoizeWithArgs";

const getFDSTextHierarchyStyle = memoizeWithArgs(
  (level, reduceEmphasis) => {
    switch (level) {
      case 1:
        return {
          bodyType: "body1",
          headlineType: "headlineEmphasized1",
          metaType: "meta1",
        };
      case 2:
        return {
          bodyType: "body2",
          headlineType: "headlineEmphasized2",
          metaType: "meta2",
        };
      case 3:
        return {
          bodyType: "body3",
          headlineType: reduceEmphasis ? "headline3" : "headlineEmphasized3",
          metaType: "meta3",
        };
      case 4:
      // eslint-disable-next-line default-case-last, no-fallthrough
      default:
        return {
          bodyType: "body4",
          headlineType: reduceEmphasis ? "headline4" : "headlineEmphasized4",
          metaType: "meta4",
        };
      case "entityHeader1":
        return {
          bodyType: "body2",
          headlineType: "entityHeaderHeadline1",
          metaType: "entityHeaderMeta1",
        };
      case "entityHeader2":
        return {
          bodyType: "body2",
          headlineType: "entityHeaderHeadline2",
          metaType: "entityHeaderMeta2",
        };
    }
  },
  (level, reduceEmphasis) => String(level) + (reduceEmphasis ? "" : "e")
);

export default getFDSTextHierarchyStyle;
