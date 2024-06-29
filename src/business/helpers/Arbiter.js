/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import invariant from "fbjs/lib/invariant";

import ArbiterToken from "./ArbiterToken";
import CallbackDependencyManager from "./CallbackDependencyManager";
import EventEmitter from "./EventEmitter";
import EventEmitterWithHolding from "./EventEmitterWithHolding";
import EventHolder from "./EventHolder";
import { applyWithGuard } from "./TimeSlice";

function toArray(val) {
  return Array.isArray(val) ? val : [val];
}

function getArbiterInstance(instance) {
  return instance instanceof Arbiter || instance === Arbiter
    ? instance
    : Arbiter;
}

class Arbiter {
  constructor() {
    const eventEmitter = new EventEmitter();
    this.holder = new CustomEventHolder();
    this.eventEmitterWithHolding = new EventEmitterWithHolding(
      eventEmitter,
      this.holder
    );
    this.callbackDependencyManager = new CallbackDependencyManager();
    this.currentSubscriptions = [];
  }

  subscribe(eventNames, callback, options = "all") {
    const eventArray = toArray(eventNames);
    eventArray.forEach((eventName) => {
      invariant(
        eventName && typeof eventName === "string",
        "Invalid event name"
      );
    });
    invariant(typeof callback === "function", "Callback must be a function");
    invariant(options === "new" || options === "all", "Invalid options value");

    const subscriptions = eventArray.map((eventName) => {
      const wrappedCallback = (data) =>
        this.executeCallback(callback, eventName, data);
      wrappedCallback.__SMmeta = callback.__SMmeta;

      if (options === "new") {
        return this.eventEmitterWithHolding.addListener(
          eventName,
          wrappedCallback
        );
      }

      this.currentSubscriptions.push({});
      const subscription = this.eventEmitterWithHolding.addRetroactiveListener(
        eventName,
        wrappedCallback
      );
      this.currentSubscriptions.pop();

      return subscription;
    });

    return new ArbiterToken(this, subscriptions);
  }

  executeCallback(callback, eventName, data) {
    const currentSubscription =
      this.currentSubscriptions[this.currentSubscriptions.length - 1];
    if (currentSubscription[eventName] === false) return;

    const result = applyWithGuard(callback, null, [eventName, data]);
    if (result === false) {
      this.eventEmitterWithHolding.releaseCurrentEvent();
    }

    currentSubscription[eventName] = result;
  }

  unsubscribeCurrentSubscription() {
    this.eventEmitterWithHolding.removeCurrentListener();
  }

  releaseCurrentPersistentEvent() {
    this.eventEmitterWithHolding.releaseCurrentEvent();
  }

  subscribeOnce(eventNames, callback, options) {
    const subscription = this.subscribe(
      eventNames,
      (eventName, data) => {
        this.unsubscribeCurrentSubscription();
        return callback(eventName, data);
      },
      options
    );

    return subscription;
  }

  unsubscribe(subscription) {
    invariant(
      subscription.isForArbiterInstance(this),
      "Subscription is not for this Arbiter instance"
    );
    subscription.unsubscribe();
  }

  inform(eventNames, data, type = "event") {
    const eventArray = toArray(eventNames);
    const isPersistent = type === "state" || type === "persistent";
    this.currentSubscriptions.push({});

    eventArray.forEach((eventName) => {
      invariant(eventName, "Event name is required");
      this.holder.setHoldingBehavior(eventName, type);
      this.eventEmitterWithHolding.emitAndHold(eventName, data);
      this.satisfyDependencies(eventName, data, isPersistent);
    });

    const result = this.currentSubscriptions.pop();
    return Array.isArray(eventNames) ? result : result[eventNames[0]];
  }

  query(eventName) {
    const holdingBehavior = this.holder.getHoldingBehavior(eventName);
    invariant(
      !holdingBehavior || holdingBehavior === "state",
      "Invalid holding behavior"
    );
    let result = null;
    this.holder.emitToListener(eventName, (data) => {
      result = data;
    });

    return result;
  }

  registerCallback(callback, dependencies) {
    if (typeof callback === "function") {
      return this.callbackDependencyManager.registerCallback(
        callback,
        dependencies
      );
    } else {
      return this.callbackDependencyManager.addDependenciesToExistingCallback(
        callback,
        dependencies
      );
    }
  }

  satisfyDependencies(eventName, data, isPersistent) {
    if (data === null) return;

    if (isPersistent) {
      this.callbackDependencyManager.satisfyPersistentDependency(eventName);
    } else {
      this.callbackDependencyManager.satisfyNonPersistentDependency(eventName);
    }
  }

  static subscribe(...args) {
    return Arbiter.prototype.subscribe.apply(getArbiterInstance(this), args);
  }

  static unsubscribeCurrentSubscription() {
    return Arbiter.prototype.unsubscribeCurrentSubscription.apply(
      getArbiterInstance(this)
    );
  }

  static releaseCurrentPersistentEvent() {
    return Arbiter.prototype.releaseCurrentPersistentEvent.apply(
      getArbiterInstance(this)
    );
  }

  static subscribeOnce(...args) {
    return Arbiter.prototype.subscribeOnce.apply(
      getArbiterInstance(this),
      args
    );
  }

  static unsubscribe(...args) {
    return Arbiter.prototype.unsubscribe.apply(getArbiterInstance(this), args);
  }

  static inform(...args) {
    return Arbiter.prototype.inform.apply(getArbiterInstance(this), args);
  }

  static informSingle(...args) {
    return Arbiter.prototype.inform.apply(getArbiterInstance(this), args);
  }

  static query(...args) {
    return Arbiter.prototype.query.apply(getArbiterInstance(this), args);
  }

  static registerCallback(...args) {
    return Arbiter.prototype.registerCallback.apply(
      getArbiterInstance(this),
      args
    );
  }

  static satisfyDependencies(...args) {
    return Arbiter.prototype.satisfyDependencies.apply(
      getArbiterInstance(this),
      args
    );
  }

  static executeCallback(...args) {
    return Arbiter.prototype.executeCallback.apply(
      getArbiterInstance(this),
      args
    );
  }
}

class CustomEventHolder extends EventHolder {
  constructor() {
    super();
    this.holdingBehavior = {};
  }

  setHoldingBehavior(eventName, behavior) {
    this.holdingBehavior[eventName] = behavior;
  }

  getHoldingBehavior(eventName) {
    return this.holdingBehavior[eventName];
  }

  holdEvent(eventName, ...args) {
    const behavior = this.holdingBehavior[eventName];
    if (behavior !== "persistent") {
      this.emitToListener(eventName, this.releaseCurrentEvent, this);
    }

    if (behavior !== "event") {
      return super.holdEvent(eventName, ...args);
    }
  }

  releaseEvent(eventName) {
    if (eventName) {
      super.releaseEvent(eventName);
    }
  }
}

export default Arbiter;
