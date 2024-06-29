/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import CSSCore from "fbjs/lib/CSSCore";

function byTag(element, tagName) {
  tagName = tagName.toUpperCase();
  const parent = find(element, (el) => el.nodeName === tagName);
  return parent instanceof Element ? parent : null;
}

function byClass(element, className) {
  const parent = find(
    element,
    (el) => el instanceof Element && CSSCore.hasClass(el, className)
  );
  return parent instanceof Element ? parent : null;
}

function bySelector(element, selector) {
  let el = element;
  if (typeof el.matches === "function") {
    while (el && el !== document && !el.matches(selector)) {
      el = el.parentNode;
    }
    return el instanceof Element ? el : null;
  } else if (typeof el.msMatchesSelector === "function") {
    while (el && el !== document && !el.msMatchesSelector(selector)) {
      el = el.parentNode;
    }
    return el instanceof Element ? el : null;
  } else {
    return bySelector_SLOW(element, selector);
  }
}

function bySelector_SLOW(element, selector) {
  let el = element;
  let root = el;
  while (root.parentNode) {
    root = root.parentNode;
  }
  if (!(root instanceof Element) && !(root instanceof Document)) {
    return null;
  }
  const elements = root.querySelectorAll(selector);
  while (el) {
    if (Array.prototype.indexOf.call(elements, el) !== -1) {
      return el instanceof Element ? el : null;
    }
    el = el.parentNode;
  }
  return el instanceof Element ? el : null;
}

function byAttribute(element, attribute) {
  const parent = find(
    element,
    (el) => el instanceof Element && !!el.getAttribute(attribute)
  );
  return parent instanceof Element ? parent : null;
}

function find(element, predicate) {
  let el = element;
  while (el) {
    if (predicate(el)) {
      return el;
    }
    el = el.parentNode;
  }
  return null;
}

export { byAttribute, byClass, bySelector, bySelector_SLOW, byTag, find };
