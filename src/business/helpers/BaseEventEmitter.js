/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import emptyFunction from "fbjs/lib/emptyFunction";

import EmitterSubscription from "./EmitterSubscription";
import EventSubscriptionVendor from "./EventSubscriptionVendor";
import { applyWithGuard } from "./TimeSlice";

class BaseEventEmitter {
  constructor() {
    this.eventSubscriptionVendor = new EventSubscriptionVendor();
    this.currentSubscription = null;
  }

  addListener(eventType, listener, context) {
    return this.eventSubscriptionVendor.addSubscription(
      eventType,
      new EmitterSubscription(this.eventSubscriptionVendor, listener, context)
    );
  }

  removeListener(subscription) {
    this.eventSubscriptionVendor.removeSubscription(subscription);
  }

  once(eventType, listener, context) {
    return this.addListener(eventType, (...args) => {
      this.removeCurrentListener();
      listener.apply(context, args);
    });
  }

  removeAllListeners(eventType) {
    this.eventSubscriptionVendor.removeAllSubscriptions(eventType);
  }

  removeCurrentListener() {
    if (!this.currentSubscription) {
      console.log(
        "Not in an emitting cycle; there is no current subscription",
        "emitter"
      );
    }
    this.eventSubscriptionVendor.removeSubscription(this.currentSubscription);
  }

  listeners(eventType) {
    const subscriptions =
      this.eventSubscriptionVendor.getSubscriptionsForType(eventType);
    return subscriptions
      ? subscriptions
          .filter(emptyFunction.thatReturnsTrue)
          .map((sub) => sub.listener)
      : [];
  }

  emit(eventType, ...args) {
    const subscriptions =
      this.eventSubscriptionVendor.getSubscriptionsForType(eventType);
    if (subscriptions) {
      const keys = Object.keys(subscriptions);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const subscription = subscriptions[key];
        if (subscription) {
          this.currentSubscription = subscription;
          this.__emitToSubscription(subscription, eventType, ...args);
        }
      }
      this.currentSubscription = null;
    }
  }

  __emitToSubscription(subscription, eventType, ...args) {
    applyWithGuard(subscription.listener, subscription.context, args, {
      name: `EventEmitter ${eventType} event`,
    });
  }
}

export default BaseEventEmitter;
