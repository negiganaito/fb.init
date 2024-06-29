/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import invariant from "fbjs/lib/invariant";

class EventSubscriptionVendor {
  constructor() {
    this.subscriptions = {};
  }

  addSubscription(eventType, subscription) {
    invariant(
      subscription.subscriber === this,
      "The subscriber of the subscription does not match this instance."
    );
    if (!this.subscriptions[eventType]) {
      this.subscriptions[eventType] = [];
    }
    const key = this.subscriptions[eventType].length;
    this.subscriptions[eventType].push(subscription);
    subscription.eventType = eventType;
    subscription.key = key;
    return subscription;
  }

  removeAllSubscriptions(eventType) {
    if (eventType === undefined) {
      this.subscriptions = {};
    } else {
      delete this.subscriptions[eventType];
    }
  }

  removeSubscription(subscription) {
    const { eventType, key } = subscription;
    const subscriptions = this.subscriptions[eventType];
    if (subscriptions) {
      delete subscriptions[key];
    }
  }

  getSubscriptionsForType(eventType) {
    return this.subscriptions[eventType];
  }
}

export default EventSubscriptionVendor;
