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
// import EventProfiler from "./EventProfiler";
import { byTag } from "./Parent";
import TimeSlice, { applyWithGuard } from "./TimeSlice";

// const i = fbError.TAAL;
const LISTENERS_KEY = "Event.listeners";
Event.prototype || (Event.prototype = {});
console.log("🚀 ~ Event.prototype :", Event.prototype);
class CustomEvent {
  constructor(target, type, data) {
    this.cancelBubble = false;
    this.target = target;
    this.type = type;
    this.data = data;
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

function wrapEvent(event) {
  if (event instanceof CustomEvent) return event;
  if (!event) {
    if (!window.addEventListener && document.createEventObject) {
      event = window.event ? document.createEventObject(window.event) : {};
    } else {
      event = {};
    }
  }

  if (!event._inherits_from_prototype) {
    Object.assign(event, Event.prototype);
  }
  return event;
}

Object.assign(
  CustomEvent.prototype,
  {
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
  },
  CustomEvent.prototype
);

const EventModule = {
  // eslint-disable-next-line max-params
  listen(
    target,
    eventName,
    handler,
    priority = Event.Priority.NORMAL,
    options = { passive: false }
  ) {
    console.log("🚀 ~ eventName3:", eventName);
    if (typeof handler === "function") {
      handler = TimeSlice.guard(
        handler,
        dedupString(`Event.js ${eventName} handler`)
      );
    }

    if (!ExecutionEnvironment.canUseDOM) {
      return new EventListener(
        target,
        handler,
        null,
        eventName,
        priority,
        null,
        options
      );
    }

    if (typeof target === "string") {
      target = $(target);
    }

    if (typeof eventName === "object") {
      const listeners = {};
      // eslint-disable-next-line guard-for-in
      for (const key in eventName) {
        listeners[key] = Event.listen(
          target,
          key,
          eventName[key],
          priority,
          options
        );
      }
      return listeners;
    }

    if (eventName.match(/^on/i)) {
      throw new TypeError(
        `Bad event name \`${eventName}\`: use \`click\`, not \`onclick\`.`
      );
    }

    // if (!target) {
    //   const error = i.blameToPreviousFrame(new Error("Cannot listen to an undefined element."));
    //   FBLogger("event").catching(error).mustfix(`Tried to listen to element of type ${eventName}`);
    //   throw error;
    // }

    if (target.nodeName === "LABEL" && eventName === "click") {
      const inputs = target.getElementsByTagName("input");
      target = inputs.length === 1 ? inputs[0] : target;
    } else if (target === window && eventName === "scroll") {
      const scrollElement = getDocumentScrollElement();
      if (
        scrollElement !== document.documentElement &&
        scrollElement !== document.body
      ) {
        target = scrollElement;
      }
    }

    const listeners = DataStore.get(target, LISTENERS_KEY, {});
    const baseEvent = Event.getBaseEvent(eventName);
    console.log("🚀 ~ baseEvent:", baseEvent);
    // if (baseEvent) {
    //   eventName = baseEvent.base;
    //   if (baseEvent.wrap) {
    //     handler = baseEvent.wrap(handler);
    //   }
    // }
    console.log("🚀 ~ listeners:", listeners);
    console.log("🚀 ~ eventName1:", eventName);
    console.log("🚀 ~ priority:", priority);

    Event.setupListener(target, listeners, eventName, options);
    const listener = new EventListener(
      target,
      handler,
      listeners,
      eventName,
      priority,
      listeners[eventName][priority]?.length,
      options
    );
    listeners[eventName][priority]?.push(listener);
    listeners.numHandlers++;

    if (!options.passive) {
      listeners.numNonPassiveHandlers++;
      Event.updateListener(target, listeners[eventName], eventName);
    }

    return listener;
  },

  stop(event) {
    new DOMEvent(event).stopPropagation();
    Event.inform(event);
    return event;
  },

  prevent(event) {
    new DOMEvent(event).preventDefault();
    return event;
  },

  isDefaultPrevented(event) {
    return new DOMEvent(event).isDefaultPrevented(event);
  },

  kill(event) {
    const domEvent = new DOMEvent(event);
    Event.inform(domEvent.event);
    return false;
  },

  getKeyCode(event) {
    const domEvent = new DOMEvent(event).event;
    if (!domEvent) return false;
    switch (domEvent.keyCode) {
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
      default:
        if (domEvent.shiftKey) {
          switch (domEvent.keyCode) {
            case 33:
            case 34:
            case 37:
            case 38:
            case 39:
            case 40:
              return null;
          }
        }
        return domEvent.keyCode;
    }
  },

  // getPriorities() {
  //   if (!Event.priorities) {
  //     Event.priorities = getObjectValues(Event.Priority).sort((a, b) => a - b);
  //   }
  //   return Event.priorities;
  // },

  fire(target, eventName, eventData) {
    const event = new CustomEvent(target, eventName, eventData);
    let result;

    do {
      const handler = Event.__getHandler(target, eventName);
      if (handler) {
        result = handler(event);
      }
      target = target.parentNode;
    } while (target && result !== false && !event.cancelBubble);

    return result !== false;
  },

  __fire(target, eventName, event) {
    const handler = Event.__getHandler(target, eventName);
    if (handler) {
      return handler(wrapEvent(event));
    }
  },

  __getHandler(target, eventName) {
    const handlers = DataStore.get(target, LISTENERS_KEY);
    return handlers && handlers[eventName]
      ? handlers[eventName].domHandler
      : target[`on${eventName}`];
  },

  // getPosition(event) {
  //   const domEvent = new DOMEvent(event).event;
  //   const scrollElement = getDocumentScrollElement();
  //   const x = domEvent.clientX + Scroll.getLeft(scrollElement);
  //   const y = domEvent.clientY + Scroll.getTop(scrollElement);
  //   return { x, y };
  // },

  // eslint-disable-next-line max-params
  setupListener(target, listeners, eventName, options) {
    if (listeners[eventName]) return;
    const handler = TimeSlice.guard(
      Event.listenHandler.bind(target, eventName),
      dedupString(`Event listenHandler ${eventName}`)
    );
    listeners[eventName] = {
      numHandlers: 0,
      numNonPassiveHandlers: 0,
      domHandlerRemover: DOMEventListener.add(
        target,
        eventName,
        handler,
        options
      ),
      domHandler: handler,
      options,
    };
    console.log("🚀 ~ setupListener ~ listeners:", listeners);
    console.log("🚀 ~ setupListener ~ eventName:", eventName);

    const existingHandler = target[`on${eventName}`];
    if (existingHandler) {
      const priority =
        target === document.documentElement
          ? Event.Priority._BUBBLE
          : Event.Priority.TRADITIONAL;
      target[`on${eventName}`] = null;
      Event.listen(target, eventName, existingHandler, priority, options);
    }
  },

  updateListener(target, listenerGroup, eventName) {
    const nonPassive = listenerGroup.numNonPassiveHandlers === 0;
    if (nonPassive !== listenerGroup.options.passive) {
      listenerGroup.domHandlerRemover.remove();
      listenerGroup.options.passive = nonPassive;
      listenerGroup.domHandlerRemover = DOMEventListener.add(
        target,
        eventName,
        listenerGroup.domHandler,
        { passive: nonPassive }
      );
    }
  },

  inform(event) {
    if (["click", "mouseover", "keydown"].includes(event.type)) {
      Arbiter.inform("Event/stop", { event });
    }
  },

  listenHandler(eventName, event) {
    const wrappedEvent = wrapEvent(event);
    const listeners = DataStore.get(this, LISTENERS_KEY);
    if (!listeners) {
      throw new Error("Bad listenHandler context.");
    }

    const handlers = listeners[eventName];
    if (!handlers) {
      throw new Error(`No registered handlers for \`${eventName}\`.`);
    }

    if (
      ["click", "contextmenu", "mousedown"].includes(eventName) &&
      wrappedEvent.which === 2
    ) {
      const target = wrappedEvent.getTarget();
      const anchor = byTag(target, "a");
      if (
        anchor instanceof HTMLAnchorElement &&
        anchor.href &&
        Event.isAnchorHrefInvalid(anchor) &&
        !Event.isInputType(target, "file") &&
        !Event.isInputType(target, "submit")
      ) {
        wrappedEvent.prevent();
      }
    }

    const priorities = Event.getPriorities();
    for (const priority of priorities) {
      if (handlers[priority]) {
        for (const listener of handlers[priority]) {
          if (!listener) continue;
          const result = listener.fire(this, wrappedEvent);
          if (result === false) {
            return wrappedEvent.kill();
          } else if (wrappedEvent.cancelBubble) {
            wrappedEvent.stop();
          }
        }
      }
    }

    return wrappedEvent.returnValue;
  },

  getBaseEvent(eventName) {
    return !window.navigator.msPointerEnabled
      ? {
          mouseenter: { base: "mouseover", wrap: this.wrapMouseEnterLeave },
          mouseleave: { base: "mouseout", wrap: this.wrapMouseEnterLeave },
        }
      : {
          mousedown: { base: "MSPointerDown" },
          mousemove: { base: "MSPointerMove" },
          mouseup: { base: "MSPointerUp" },
          mouseover: { base: "MSPointerOver" },
          mouseout: { base: "MSPointerOut" },
          mouseenter: { base: "MSPointerOver", wrap: this.wrapMouseEnterLeave },
          mouseleave: { base: "MSPointerOut", wrap: this.wrapMouseEnterLeave },
        };
  },

  wrapMouseEnterLeave(handler) {
    return function (event) {
      // eslint-disable-next-line no-invalid-this
      if (!contains(this, event.getRelatedTarget())) {
        // eslint-disable-next-line no-invalid-this
        return handler.call(this, event);
      }
    };
  },

  isAnchorHrefInvalid(anchor) {
    return (
      !anchor.href.endsWith("#") ||
      anchor.href === document.location.href ||
      anchor.href === document.location.href + "#"
    );
  },

  isInputType(target, type) {
    return target.nodeName === "INPUT" && target.type === type;
  },
};
Object.assign(Event, EventModule);
if (UserAgent.isBrowser("Firefox < 52")) {
  const focusBlurHandler = (type, event) => {
    event = wrapEvent(event);
    let target = event.getTarget();
    while (target) {
      Event.__fire(target, type, event);
      target = target.parentNode;
    }
  };

  document.documentElement.addEventListener(
    "focus",
    focusBlurHandler.bind(null, "focusin"),
    true
  );
  document.documentElement.addEventListener(
    "blur",
    focusBlurHandler.bind(null, "focusout"),
    true
  );
}

class EventListener {
  // eslint-disable-next-line max-params
  constructor(target, handler, listeners, eventName, priority, index, options) {
    this.target = target;
    this.handler = handler;
    this.listeners = listeners;
    this.eventName = eventName;
    this.priority = priority;
    this.index = index;
    this.options = options;
  }

  isRemoved() {
    return !this.listeners;
  }

  remove() {
    if (ExecutionEnvironment.canUseDOM) {
      if (this.isRemoved()) {
        console.warn("Event handler has already been removed");
        return;
      }

      const group = this.listeners[this.eventName];
      if (group.numHandlers <= 1) {
        group.domHandlerRemover.remove();
        delete this.listeners[this.eventName];
      } else {
        delete group[this.priority][this.index];
        group.numHandlers--;
        if (!this.options.passive) {
          group.numNonPassiveHandlers--;
          Event.updateListener(this.target, group, this.eventName);
        }
      }
      this.listeners = null;
    }
  }

  fire(context, event) {
    if (ExecutionEnvironment.canUseDOM) {
      return applyWithGuard(this.handler, context, [event], {
        name: `eventhandler:${event.type}:${
          typeof context.name === "string" ? context.name : context.id
        }`,
      });
    }
    return true;
  }
}

Event.Priority = {
  URGENT: -20,
  TRADITIONAL: -10,
  NORMAL: 0,
  _BUBBLE: 1000,
};

Event.$E = wrapEvent;
console.log("🚀 ~ Event:", Event.listen);
export default Event;
