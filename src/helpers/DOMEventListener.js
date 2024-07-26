/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import emptyFunction from "fbjs/lib/emptyFunction";
import invariant from "fbjs/lib/invariant";

import dedupString from "./dedupString";
import { isPassiveEventListenerSupported } from "./passiveEventListenerUtil";
import wrapFunction from "./wrapFunction";

const supportsPassive = isPassiveEventListenerSupported;

let addEventListener;
let removeEventListener;

if (window.addEventListener) {
  // eslint-disable-next-line max-params
  addEventListener = (element, event, handler, options = false) => {
    handler.wrapper = wrapFunction(
      handler,
      "entry",
      dedupString(`DOMEventListener.add ${event}`)
    );
    element.addEventListener(
      event,
      handler.wrapper,
      supportsPassive ? options : false
    );
  };

  // eslint-disable-next-line max-params
  removeEventListener = (element, event, handler, options = false) => {
    element.removeEventListener(
      event,
      handler.wrapper,
      supportsPassive ? options : false
    );
  };
} else if (window.attachEvent) {
  addEventListener = (element, event, handler) => {
    handler.wrapper = wrapFunction(
      handler,
      "entry",
      `DOMEventListener.add ${event}`
    );
    invariant(element.attachEvent, "attachEvent is not supported");
    element.attachEvent(`on${event}`, handler.wrapper);
  };

  removeEventListener = (element, event, handler) => {
    invariant(element.detachEvent, "detachEvent is not supported");
    element.detachEvent(`on${event}`, handler.wrapper);
  };
} else {
  addEventListener = emptyFunction;
  removeEventListener = emptyFunction;
}

const DOMEventListener = {
  // eslint-disable-next-line max-params
  add(element, event, handler, options = false) {
    addEventListener(element, event, handler, options);
    return {
      remove() {
        removeEventListener(element, event, handler, options);
      },
    };
  },
  remove: removeEventListener,
};

export default DOMEventListener;
