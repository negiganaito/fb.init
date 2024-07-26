/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import invariant from "fbjs/lib/invariant";

class EventHolder {
  constructor() {
    this.events = {};
    this.currentEvents = [];
  }

  holdEvent(eventType, ...args) {
    this.events[eventType] = this.events[eventType] || [];
    const eventList = this.events[eventType];
    const event = { eventType, index: eventList.length };
    eventList.push(args);
    return event;
  }

  emitToListener(eventType, listener, context) {
    const eventList = this.events[eventType];
    if (!eventList) return;

    eventList.forEach((args, index) => {
      if (!args) return;
      this.currentEvents.push({ eventType, index });
      listener.apply(context, args);
      this.currentEvents.pop();
    });
  }

  releaseCurrentEvent() {
    invariant(
      this.currentEvents.length,
      "There is no current event to release"
    );
    this.releaseEvent(this.currentEvents[this.currentEvents.length - 1]);
  }

  releaseEvent(event) {
    delete this.events[event.eventType][event.index];
  }

  releaseEventType(eventType) {
    this.events[eventType] = [];
  }
}

export default EventHolder;
