/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import Bootloader from "Bootloader";
import { createNodesFromMarkup } from "createNodesFromMarkup";
import emptyFunction from "fbjs/lib/emptyFunction";
import invariant from "fbjs/lib/invariant";

import evalGlobal from "./evalGlobal";

const selfClosingTags = {
  abbr: true,
  area: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  link: true,
  meta: true,
  param: true,
};

const selfClosingTagRegex = /(<(\w+)[^>]*?)\/>/g;

class HTML {
  constructor(markup) {
    let resolvedMarkup = "";

    if (markup && typeof markup.__html === "string") {
      resolvedMarkup = markup.__html;
    } else if (typeof markup === "string") {
      resolvedMarkup = markup;
    }

    if (!(this instanceof HTML)) {
      // eslint-disable-next-line no-constructor-return
      return new HTML(resolvedMarkup);
    }

    this._markup = resolvedMarkup;
    this._defer = false;
    this._nodes = null;
    this._inlineJS = emptyFunction;
    this._rootNode = null;
    this._hasInlineJs = false;
  }

  toString() {
    return this._markup;
  }

  getContent() {
    return this._markup;
  }

  getNodes() {
    this._fillCache();
    return this._nodes;
  }

  getRootNode() {
    invariant(!this._rootNode, "Root node has already been accessed");

    const nodes = this.getNodes();
    if (nodes.length === 1) {
      this._rootNode = nodes[0];
    } else {
      const fragment = document.createDocumentFragment();
      nodes.forEach((node) => fragment.appendChild(node));
      this._rootNode = fragment;
    }
    return this._rootNode;
  }

  getAction() {
    this._fillCache();
    const executeInlineJS = () => {
      this._inlineJS();
    };

    return this._defer
      ? () => {
          setTimeout(executeInlineJS, 0);
        }
      : executeInlineJS;
  }

  _fillCache() {
    if (this._nodes !== null) {
      return;
    }

    if (!this._markup) {
      this._nodes = [];
      return;
    }

    const markupWithFixedSelfClosingTags = this._markup.replace(
      selfClosingTagRegex,
      (match, prefix, tagName) => {
        return selfClosingTags[tagName.toLowerCase()]
          ? match
          : `${prefix}></${tagName}>`;
      }
    );

    let inlineJSCallbacks = null;

    const nodes = createNodesFromMarkup(
      markupWithFixedSelfClosingTags,
      (node) => {
        if (node instanceof HTMLScriptElement) {
          console.warn(
            "HTML: encountered script node while parsing, hasSrc=%s, type=%s",
            Boolean(node.src),
            node.type === null || node.type === "" ? "<unknown>" : node.type
          );

          if (
            node.type !== "application/ld+json" &&
            node.type !== "application/json"
          ) {
            inlineJSCallbacks = inlineJSCallbacks || [];
            if (node.src) {
              inlineJSCallbacks.push(
                Bootloader.requestJSResource_UNSAFE_NEEDS_REVIEW_BY_SECURITY_AND_XFN.bind(
                  Bootloader,
                  node.src
                )
              );
            } else {
              inlineJSCallbacks.push(evalGlobal.bind(null, node.innerHTML));
            }
            node.parentNode?.removeChild(node);
          }
        }
      }
    );

    if (inlineJSCallbacks) {
      this._hasInlineJs = true;
      this._inlineJS = () => {
        inlineJSCallbacks.forEach((callback) => callback());
      };
    }

    this._nodes = nodes;
  }

  setDeferred(defer) {
    this._defer = defer;
    return this;
  }

  hasInlineJs() {
    return this._hasInlineJs;
  }

  static isHTML(obj) {
    return !!obj && (obj instanceof HTML || obj.__html !== undefined);
  }

  static replaceJSONWrapper(obj) {
    return obj && obj.__html !== undefined ? new HTML(obj.__html) : obj;
  }
}

export default HTML;
