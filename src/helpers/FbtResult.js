/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import FbtReactUtil from "./FbtReactUtil";
import FbtResultBase from "./FbtResultBase";

const contentGetter = (a) => a.content;

class FbtResult extends FbtResultBase {
  constructor(content, errorListener) {
    super(content, errorListener);
    this.$$typeof = FbtReactUtil.REACT_ELEMENT_TYPE;
    this.key = null;
    this.ref = null;
    this.type = contentGetter;
    this.props = { content };
  }

  static get(result) {
    return new FbtResult(result.contents, result.errorListener);
  }
}

export default FbtResult;
