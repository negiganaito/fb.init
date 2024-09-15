/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
class FbtResultBase {
  constructor(content, errorListener) {
    this.$1 = content;
    this.__errorListener = errorListener;
    this.$3 = false;
    this.$2 = null;
  }

  flattenToArray() {
    return FbtResultBase.flattenToArray(this.$1);
  }

  getContents() {
    return this.$1;
  }

  toString() {
    if (Object.isFrozen(this)) return this.$4();
    if (this.$3) return "<<Reentering fbt.toString() is forbidden>>";
    this.$3 = true;
    try {
      return this.$4();
    } finally {
      this.$3 = false;
    }
  }

  $4() {
    if (this.$2 !== null) return this.$2;
    let result = "";
    const flattenedArray = this.flattenToArray();
    for (let i = 0; i < flattenedArray.length; ++i) {
      const element = flattenedArray[i];
      if (typeof element === "string" || element instanceof FbtResultBase) {
        result += element.toString();
      } else {
        this.__errorListener?.onStringSerializationError?.(element);
      }
    }
    if (!Object.isFrozen(this)) this.$2 = result;
    return result;
  }

  toJSON() {
    return this.toString();
  }

  static flattenToArray(array) {
    const result = [];
    for (let i = 0; i < array.length; ++i) {
      const element = array[i];
      if (Array.isArray(element)) {
        result.push(...FbtResultBase.flattenToArray(element));
      } else if (element instanceof FbtResultBase) {
        result.push(...element.flattenToArray());
      } else {
        result.push(element);
      }
    }
    return result;
  }
}

[
  "anchor",
  "big",
  "blink",
  "bold",
  "charAt",
  "charCodeAt",
  "codePointAt",
  "contains",
  "endsWith",
  "fixed",
  "fontcolor",
  "fontsize",
  "includes",
  "indexOf",
  "italics",
  "lastIndexOf",
  "link",
  "localeCompare",
  "match",
  "normalize",
  "repeat",
  "replace",
  "search",
  "slice",
  "small",
  "split",
  "startsWith",
  "strike",
  "sub",
  "substr",
  "substring",
  "sup",
  "toLocaleLowerCase",
  "toLocaleUpperCase",
  "toLowerCase",
  "toUpperCase",
  "trim",
  "trimLeft",
  "trimRight",
].forEach((method) => {
  FbtResultBase.prototype[method] = function (...args) {
    this.__errorListener?.onStringMethodUsed?.(method);
    return String.prototype[method].apply(this, args);
  };
});

export default FbtResultBase;
