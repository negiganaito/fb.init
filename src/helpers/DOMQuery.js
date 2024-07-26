/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import containsNode from "fbjs/lib/containsNode";
import createArrayFromMixed from "fbjs/lib/createArrayFromMixed";
import CSS from "fbjs/lib/CSSCore";
import isNode from "fbjs/lib/isNode";

import createObjectFrom from "./createObjectFrom";
import ge from "./ge";
import ifRequired from "./ifRequired";
import isElementNode from "./isElementNode";

const simpleClassNameRegex = /^\.-?[_a-zA-Z]+[\w-]*$/;

function hasAttribute(el, attr) {
  return el.hasAttribute
    ? el.hasAttribute(attr)
    : el.getAttribute(attr) !== null;
}

function find(root, selector) {
  const results = scry(root, selector);
  return results[0];
}

function findPushSafe(root, selector1, selector2) {
  let results1 = scry(root, selector1);
  let results2 = scry(root, selector2);
  results1.length === 1 && results2.length === 1 && results1[0] === results2[0]
    ? (results2 = results1)
    : (results2 = results1.concat(results2));
  return results2[0];
}

// eslint-disable-next-line complexity
function scry(root, selector) {
  if (!root || !root.getElementsByTagName) return [];
  const selectors = selector.split(" ");
  let elements = [root];

  for (let i = 0; i < selectors.length; i++) {
    if (elements.length === 0) break;
    if (selectors[i] === "") continue;
    let subSelector = selectors[i];
    let fullSelector = selectors[i];
    let tempElements = [];
    let isRoot = false;

    if (subSelector.charAt(0) === "^") {
      if (i === 0) isRoot = true;
      subSelector = subSelector.slice(1);
    }

    subSelector = subSelector.replace(
      /\[(?:[^=\]]*=(?:\"[^\"]*\"|\'[^\']*\'))?|[.#]/g,
      " $&"
    );
    const subSelectors = subSelector.split(" ");
    const tag = subSelectors[0] || "*";
    const isWildcard = tag === "*";
    const isIdSelector = subSelectors[1] && subSelectors[1].charAt(0) === "#";

    if (isIdSelector) {
      const element = ge(subSelectors[1].slice(1), root, tag);
      if (element && (isWildcard || element.tagName.toLowerCase() === tag)) {
        for (let j = 0; j < elements.length; j++) {
          if (isRoot && containsNode(element, elements[j])) {
            tempElements = [element];
            break;
          } else if (
            document === elements[j] ||
            (containsNode(elements[j], element) && elements[j] !== element)
          ) {
            tempElements = [element];
            break;
          }
        }
      }
    } else {
      let matches = [];
      const isImmediateChild =
        !isRoot && fullSelector.indexOf("[") < 0 && document.querySelectorAll;
      for (let j = 0; j < elements.length; j++) {
        if (isRoot) {
          let parentNode = elements[j].parentNode;
          while (isElementNode(parentNode)) {
            if (isWildcard || parentNode.tagName.toLowerCase() === tag)
              matches.push(parentNode);
            parentNode = parentNode.parentNode;
          }
        } else if (isImmediateChild) {
          matches = simpleClassNameRegex.test(fullSelector)
            ? elements[j].getElementsByClassName(fullSelector.substring(1))
            : elements[j].querySelectorAll(fullSelector);
        } else {
          matches = elements[j].getElementsByTagName(tag);
        }
        for (let k = 0; k < matches.length; k++) {
          tempElements.push(matches[k]);
        }
      }
      if (!isImmediateChild) {
        for (let j = 1; j < subSelectors.length; j++) {
          const subSelector = subSelectors[j];
          const isClass = subSelector.charAt(0) === ".";
          const attrName = subSelector.slice(1, subSelector.length - 1);
          const attrValue = subSelector.slice(
            attrName.indexOf("=") + 1,
            subSelector.length - 1
          );
          for (let k = 0; k < tempElements.length; k++) {
            const element = tempElements[k];
            if (!element || element.nodeType !== 1) continue;
            if (isClass) {
              if (!CSS.hasClass(element, subSelector.substring(1)))
                delete tempElements[k];
            } else {
              if (attrValue) {
                // eslint-disable-next-line max-depth
                if (element.getAttribute(attrName) !== attrValue)
                  delete tempElements[k];
              } else {
                // eslint-disable-next-line max-depth
                if (!hasAttribute(element, attrName)) delete tempElements[k];
              }
            }
          }
        }
      }
    }

    for (let j = 0; j < tempElements.length; j++) {
      if (tempElements[j]) {
        elements.push(tempElements[j]);
        if (isRoot) break;
      }
    }
  }
  return elements;
}

function getSelection() {
  const selection = window.getSelection
    ? String(window.getSelection())
    : document.selection
    ? document.selection.createRange().text
    : null;
  return selection;
}

function contains(a, b) {
  (typeof a === "string" || typeof b === "string") &&
    console.info(
      "Support for node IDs is deprecated. Use containsNode(ge(<id1>), ge(<id2>)) instead"
    );
  return containsNode(ge(a), ge(b));
}

function getRootElement() {
  const rootElement = ifRequired("Quickling", (Quickling) =>
    Quickling.isActive() ? ge("content") : null
  );
  return rootElement || document.body;
}

function isNodeOfType(node, types) {
  const nodeTypes = createArrayFromMixed(types)
    .join("|")
    .toUpperCase()
    .split("|");
  const nodeTypesObject = createObjectFrom(nodeTypes);
  return isNode(node) && node.nodeName in nodeTypesObject;
}

function isInputNode(node) {
  return (
    isNodeOfType(node, ["input", "textarea"]) || node.contentEditable === "true"
  );
}

export {
  contains,
  find,
  findPushSafe,
  getRootElement,
  getSelection,
  isInputNode,
  isNodeOfType,
  scry,
};
