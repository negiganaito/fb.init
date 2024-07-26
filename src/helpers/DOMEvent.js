/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import invariant from "fbjs/lib/invariant";

class DOMEvent {
  constructor(event) {
    this.event = event || window.event;
    invariant(
      // eslint-disable-next-line valid-typeof
      typeof this.event.srcElement !== "unknown",
      "Event source element type is unknown"
    );
    this.target = this.event.target || this.event.srcElement;
  }

  preventDefault() {
    const event = this.event;
    if (event.preventDefault) {
      event.preventDefault();
      if (!("defaultPrevented" in event)) {
        event.defaultPrevented = true;
      }
    } else {
      event.returnValue = false;
    }
    return this;
  }

  isDefaultPrevented() {
    const event = this.event;
    return "defaultPrevented" in event
      ? event.defaultPrevented
      : event.returnValue === false;
  }

  stopPropagation() {
    const event = this.event;
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
    return this;
  }

  kill() {
    this.stopPropagation().preventDefault();
    return this;
  }

  static killThenCall(callback) {
    return (event) => {
      new DOMEvent(event).kill();
      return callback();
    };
  }
}

export default DOMEvent;
