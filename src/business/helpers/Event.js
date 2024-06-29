/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";
// import fbError from "fb-error";
import getDocumentScrollElement from "fbjs/lib/getDocumentScrollElement";
// import getObjectValues from "fbjs/lib/getObjectValues";
import UserAgent from "fbjs/lib/UserAgent";

import $ from "./$";
import Arbiter from "./Arbiter";
// import Scroll from "Scroll";
import DataStore from "./DataStore";
import dedupString from "./dedupString";
import DOMEvent from "./DOMEvent";
import DOMEventListener from "./DOMEventListener";
import { contains } from "./DOMQuery";
import EventProfiler from "./EventProfiler";
import { byTag } from "./Parent";
import TimeSlice, { applyWithGuard } from "./TimeSlice";

let g;
// let h;
// const i = fbError.TAAL;
const j = "Event.listeners";
Event.prototype || (Event.prototype = {});

function k(a) {
  if (["click", "mouseover", "keydown"].includes(a.type)) {
    Arbiter.inform("Event/stop", { event: a });
  }
}

class EventCustom {
  constructor(a, b, c) {
    this.cancelBubble = false;
    this.target = a;
    this.type = b;
    this.data = c;
  }

  getData() {
    this.data = this.data || {};
    return this.data;
  }

  stop() {
    return Event.stop(this);
  }

  prevent() {
    return Event.prevent(this);
  }

  isDefaultPrevented() {
    return Event.isDefaultPrevented(this);
  }

  kill() {
    return Event.kill(this);
  }

  getTarget() {
    return new DOMEvent(this).target || null;
  }
}

function enhanceEvent(a) {
  if (a instanceof EventCustom) return a;
  a ||
    (!window.addEventListener && document.createEventObject
      ? (a = window.event ? document.createEventObject(window.event) : {})
      : (a = {}));
  if (!a._inherits_from_prototype) {
    // eslint-disable-next-line guard-for-in
    for (const key in Event.prototype) {
      try {
        a[key] = Event.prototype[key];
      } catch (error) {
        // Continue to the next property
      }
    }
  }
  return a;
}
const EventPrototype = {
  _inherits_from_prototype: true,
  getRelatedTarget() {
    const relatedTarget =
      this.relatedTarget ||
      (this.fromElement === this.srcElement
        ? this.toElement
        : this.fromElement);
    return relatedTarget && relatedTarget.nodeType ? relatedTarget : null;
  },
  getModifiers() {
    const modifiers = {
      control: !!this.ctrlKey,
      shift: !!this.shiftKey,
      alt: !!this.altKey,
      meta: !!this.metaKey,
    };
    modifiers.access = UserAgent.isPlatform("Mac OS X")
      ? modifiers.control
      : modifiers.alt;
    modifiers.any =
      modifiers.control || modifiers.shift || modifiers.alt || modifiers.meta;
    return modifiers;
  },
  isRightClick() {
    return this.which ? this.which === 3 : this.button && this.button === 2;
  },
  isMiddleClick() {
    return this.which ? this.which === 2 : this.button && this.button === 4;
  },
  isDefaultRequested() {
    return (
      this.getModifiers().any || this.isMiddleClick() || this.isRightClick()
    );
  },
};

Object.assign(Event.prototype, EventPrototype, EventCustom.prototype);

Object.assign(Event.prototype, {
  // eslint-disable-next-line max-params, complexity
  listen(a, c, d, e, f) {
    if (typeof d === "function") {
      d = TimeSlice.guard(d, dedupString(`Event.js ${c} handler`));
    }
    if (!f || typeof f === "boolean") {
      f = { passive: false };
    } else {
      f = { passive: f.passive || false };
    }
    if (!(g || (g = ExecutionEnvironment)).canUseDOM) {
      return new U(a, d, null, c, e, null, f);
    }
    if (typeof a === "string") {
      a = $(a);
    }
    if (typeof e === "undefined") {
      e = Event.Priority.NORMAL;
    }
    if (typeof c === "object") {
      const handlers = {};
      // eslint-disable-next-line guard-for-in
      for (const key in c) {
        console.log("🚀 ~ listen ~ key:", key);
        handlers[key] = Event.prototype.listen(a, key, c[key], e, f);
      }
      return handlers;
    }
    if (c.match(/^on/i)) {
      throw new TypeError(`Bad event name ${c}': use click', not onclick'.`);
    }
    if (!a) {
      const error = new Error("Cannot listen to an undefined element.");
      // const error = i.blameToPreviousFrame(
      //   new Error("Cannot listen to an undefined element.")
      // );
      console.log("Tried to listen to element of type ", error);
      throw error;
    }
    if (a.nodeName === "LABEL" && c === "click") {
      const inputs = a.getElementsByTagName("input");
      a = inputs.length === 1 ? inputs[0] : a;
    } else if (a === window && c === "scroll") {
      const scrollElement = getDocumentScrollElement();
      if (
        scrollElement !== document.documentElement &&
        scrollElement !== document.body
      ) {
        a = scrollElement;
      }
    }
    console.log("🚀 ~ listen ~ j:", j);
    console.log("🚀 ~ listen ~ a:", a);
    const eventListeners = DataStore.get(a, j, {});
    console.log("🚀 ~ listen ~ eventListeners:", eventListeners);
    const wrappedHandler = o[c];
    if (wrappedHandler) {
      c = wrappedHandler.base;
      if (wrappedHandler.wrap) {
        d = wrappedHandler.wrap(d);
      }
    }
    addEventListener(a, eventListeners, c, f);
    const eventList = eventListeners[c];
    if (!(e in eventList)) {
      eventList[e] = [];
    }
    const handlerIndex = eventList[e].length;
    const handler = new U(a, d, eventListeners, c, e, handlerIndex, f);
    eventList[e][handlerIndex] = handler;
    eventList.numHandlers++;
    if (!f.passive) {
      eventList.numNonPassiveHandlers++;
      updateEventListenerOptions(a, eventListeners[c], c);
    }
    console.log("🚀 ~ listen ~ handler:", handler);
    return handler;
  },
  stop(a) {
    const event = new DOMEvent(a).stopPropagation();
    k(event.event);
    return a;
  },
  prevent(a) {
    new DOMEvent(a).preventDefault();
    return a;
  },
  isDefaultPrevented(a) {
    return new DOMEvent(a).isDefaultPrevented(a);
  },
  kill(a) {
    const event = new DOMEvent(a).kill();
    k(event.event);
    return false;
  },
  getKeyCode(a) {
    const event = new DOMEvent(a).event;
    if (!event) return false;
    switch (event.keyCode) {
      case 63232:
        return 38;
      case 63233:
        return 40;
      case 63234:
        return 37;
      case 63235:
        return 39;
      case 63272:
      case 63273:
      case 63275:
        return null;
      case 63276:
        return 33;
      case 63277:
        return 34;
    }
    if (event.shiftKey) {
      switch (event.keyCode) {
        case 33:
        case 34:
        case 37:
        case 38:
        case 39:
        case 40:
          return null;
      }
    }
    return event.keyCode;
  },
  // getPriorities() {
  //   if (!n) {
  //     const priorities = getObjectValues(Event.Priority);
  //     priorities.sort((a, b) => a - b);
  //     n = priorities;
  //   }
  //   return n;
  // },
  fire(a, b, c) {
    c = new EventCustom(a, b, c);
    let result;
    do {
      const handler = Event.__getHandler(a, b);
      if (handler) {
        result = handler(c);
      }
      a = a.parentNode;
    } while (a && result !== false && !c.cancelBubble);
    return result !== false;
  },
  __fire(a, b, c) {
    const handler = Event.__getHandler(a, b);
    if (handler) {
      return handler(enhanceEvent(c));
    }
  },
  __getHandler(a, c) {
    const listeners = DataStore.get(a, j);
    return listeners && listeners[c] ? listeners[c].domHandler : a[`on${c}`];
  },
  // getPosition(a) {
  //   const event = new DOMEvent(a).event;
  //   const scrollElement = getDocumentScrollElement();
  //   const x = event.clientX + Scroll.getLeft(scrollElement);
  //   const y = event.clientY + Scroll.getTop(scrollElement);
  //   return { x, y };
  // },
});

// let n = null;

const wrapMouseEvent = (handler) => (event) => {
  if (!contains(event.getRelatedTarget())) {
    return handler(event);
  }
};

const o = !window.navigator.msPointerEnabled
  ? {
      mouseenter: { base: "mouseover", wrap: wrapMouseEvent },
      mouseleave: { base: "mouseout", wrap: wrapMouseEvent },
    }
  : {
      mousedown: { base: "MSPointerDown" },
      mousemove: { base: "MSPointerMove" },
      mouseup: { base: "MSPointerUp" },
      mouseover: { base: "MSPointerOver" },
      mouseout: { base: "MSPointerOut" },
      mouseenter: { base: "MSPointerOver", wrap: wrapMouseEvent },
      mouseleave: { base: "MSPointerOut", wrap: wrapMouseEvent },
    };

if (UserAgent.isBrowser("Firefox < 52")) {
  const fireFocusEvent = (eventName, event) => {
    event = enhanceEvent(event);
    let target = event.getTarget();
    while (target) {
      Event.__fire(target, eventName, event);
      target = target.parentNode;
    }
  };
  document.documentElement.addEventListener(
    "focus",
    fireFocusEvent.bind(null, "focusin"),
    true
  );
  document.documentElement.addEventListener(
    "blur",
    fireFocusEvent.bind(null, "focusout"),
    true
  );
}

const updateEventListenerOptions = (element, eventConfig, eventName) => {
  const shouldUsePassive = eventConfig.numNonPassiveHandlers === 0;
  if (shouldUsePassive !== eventConfig.options.passive) {
    eventConfig.domHandlerRemover.remove();
    eventConfig.options.passive = shouldUsePassive;
    eventConfig.domHandlerRemover = DOMEventListener.add(
      element,
      eventName,
      eventConfig.domHandler,
      { passive: shouldUsePassive }
    );
  }
};

// eslint-disable-next-line max-params
const addEventListener = (element, eventListeners, eventName, options) => {
  if (eventListeners[eventName]) return;
  const handler = EventProfiler.__wrapEventListenHandler(
    listenHandler.bind(element, eventName)
  );
  eventListeners[eventName] = {
    numHandlers: 0,
    numNonPassiveHandlers: 0,
    domHandlerRemover: DOMEventListener.add(
      element,
      eventName,
      handler,
      options
    ),
    domHandler: handler,
    options,
  };
  const eventPropertyName = `on${eventName}`;
  if (element[eventPropertyName]) {
    const priority =
      element === document.documentElement
        ? Event.Priority._BUBBLE
        : Event.Priority.TRADITIONAL;
    const existingHandler = element[eventPropertyName];
    element[eventPropertyName] = null;
    console.log("🚀 ~ addEventListener ~ element:", element);
    Event.prototype.listen(
      element,
      eventName,
      existingHandler,
      priority,
      options
    );
  }
};

const isSpecialLink = (link) => {
  return link.href.endsWith("#")
    ? link.href === document.location.href ||
        link.href === document.location.href + "#"
    : false;
};

const isInputOfType = (element, type) => {
  return element.nodeName === "INPUT" && element.type === type;
};

const listenHandler = (eventName, event) => {
  event = enhanceEvent(event);
  if (!DataStore.get(j)) {
    throw new Error("Bad listenHandler context.");
  }
  const eventConfig = DataStore.get(j)[eventName];
  console.log("🚀 ~ listenHandler ~ eventConfig:", eventConfig);
  if (!eventConfig) {
    throw new Error(`No registered handlers for ${eventName}`);
  }
  if (
    ["click", "contextmenu", "mousedown"].includes(eventName) &&
    (eventName !== "mousedown" || event.which === 2)
  ) {
    let target = event.getTarget();
    const anchor = byTag(target, "a");
    if (
      anchor instanceof HTMLAnchorElement &&
      anchor.href &&
      isSpecialLink(anchor) &&
      !isInputOfType(target, "file") &&
      !isInputOfType(target, "submit")
    ) {
      event.prevent();
    }
  }
  const priorities = Event.getPriorities();
  for (let priority of priorities) {
    if (priority in eventConfig) {
      const handlers = eventConfig[priority];
      for (let handler of handlers) {
        if (!handler) continue;
        const result = handler.fire(event);
        if (result === false) return event.kill();
        if (event.cancelBubble) event.stop();
      }
    }
  }
  return event.returnValue;
};

Event.Priority = {
  URGENT: -20,
  TRADITIONAL: -10,
  NORMAL: 0,
  _BUBBLE: 1000,
};

class U {
  // eslint-disable-next-line max-params
  constructor(a, b, c, d, e, f, g) {
    this.$1 = a;
    this.$2 = b;
    this.$3 = c;
    this.$7 = d;
    this.$6 = e;
    this.$4 = f;
    this.$5 = g;
  }

  isRemoved() {
    return !this.$3;
  }

  remove() {
    if ((g || (g = ExecutionEnvironment)).canUseDOM) {
      if (this.isRemoved()) {
        console.warn("Event handler has already been removed");
        return;
      }
      const eventConfig = this.$3[this.$7];
      if (eventConfig.numHandlers <= 1) {
        eventConfig.domHandlerRemover.remove();
        delete this.$3[this.$7];
      } else {
        delete eventConfig[this.$6][this.$4];
        eventConfig.numHandlers--;
        if (!this.$5.passive) {
          eventConfig.numNonPassiveHandlers--;
          updateEventListenerOptions(this.$1, this.$3[this.$7], this.$7);
        }
      }
      this.$3 = null;
    }
  }

  fire(context, event) {
    // eslint-disable-next-line no-return-assign
    return (g || (g = ExecutionEnvironment)).canUseDOM
      ? applyWithGuard(this.$2, context, [event], {
          name: `eventhandler:${event.type}:${
            typeof context.name === "string" ? context.name : context.id
          }`,
        })
      : true;
  }
}

Event.prototype.$E = enhanceEvent;
console.log("🚀 ~ Event:", Event.prototype);
const Event1 = Event;
export default Event1;
