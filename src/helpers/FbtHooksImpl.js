/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const FbtHooksImpl = {
  getErrorListener: (params) => {
    return g.errorListener ? g.errorListener(params) : undefined;
  },
  logImpression: (impression, details) => {
    return g.logImpression ? g.logImpression(impression, details) : undefined;
  },
  onTranslationOverride: (params) => {
    return g.onTranslationOverride
      ? g.onTranslationOverride(params)
      : undefined;
  },
  getFbsResult: (params) => {
    return g.getFbsResult ? g.getFbsResult(params) : undefined;
  },
  getFbtResult: (params) => {
    return g.getFbtResult ? g.getFbtResult(params) : undefined;
  },
  getTranslatedInput: (params) => {
    return g.getTranslatedInput ? g.getTranslatedInput(params) : params;
  },
  getViewerContext: () => {
    return g.getViewerContext();
  },
  register: (hooks) => {
    Object.assign(g, hooks);
  },
};

const g = {};

export default FbtHooksImpl;
