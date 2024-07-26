/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
class EventEmitterWithHolding {
  constructor(eventEmitter, eventHolder) {
    this.eventEmitter = eventEmitter;
    this.eventHolder = eventHolder;
    this.currentHeldEvent = null;
    this.retroactiveListeners = [];
    this.retroactiveListenerDepth = 0;
  }

  addListener(eventName, listener, context) {
    return this.eventEmitter.addListener(eventName, listener, context);
  }

  once(eventName, listener, context) {
    return this.eventEmitter.once(eventName, listener, context);
  }

  addRetroactiveListener(eventName, listener, context) {
    const eventListener = this.eventEmitter.addListener(
      eventName,
      listener,
      context
    );
    this.retroactiveListeners.push(false);
    this.retroactiveListenerDepth++;
    this.eventHolder.emitToListener(eventName, listener, context);
    this.retroactiveListenerDepth--;
    if (this.retroactiveListeners[this.retroactiveListeners.length - 1]) {
      eventListener.remove();
    }
    this.retroactiveListeners.pop();
    return eventListener;
  }

  removeAllListeners(eventName) {
    this.eventEmitter.removeAllListeners(eventName);
  }

  removeCurrentListener() {
    if (this.retroactiveListenerDepth) {
      this.retroactiveListeners[this.retroactiveListeners.length - 1] = true;
    } else {
      this.eventEmitter.removeCurrentListener();
    }
  }

  listeners(eventName) {
    return this.eventEmitter.listeners(eventName);
  }

  emit(eventName, ...args) {
    this.eventEmitter.emit(eventName, ...args);
  }

  emitAndHold(eventName, ...args) {
    this.currentHeldEvent = this.eventHolder.holdEvent(eventName, ...args);
    this.eventEmitter.emit(eventName, ...args);
    this.currentHeldEvent = null;
  }

  releaseCurrentEvent() {
    if (this.currentHeldEvent !== null) {
      this.eventHolder.releaseEvent(this.currentHeldEvent);
    } else if (this.retroactiveListenerDepth > 0) {
      this.eventHolder.releaseCurrentEvent();
    }
  }

  releaseHeldEventType(eventName) {
    this.eventHolder.releaseEventType(eventName);
  }
}

export default EventEmitterWithHolding;
