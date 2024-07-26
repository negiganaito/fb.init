/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import invariant from "fbjs/lib/invariant";

function isSubscription(obj) {
  return (
    obj.remove || obj.reset || obj.unsubscribe || obj.cancel || obj.dispose
  );
}

function removeSubscription(subscription) {
  isSubscription(subscription).call(subscription);
}

class SubscriptionsHandler {
  constructor() {
    this.subscriptions = [];
  }

  addSubscriptions(...subscriptions) {
    invariant(
      subscriptions.every(isSubscription),
      "All arguments must be valid subscriptions."
    );
    if (this.subscriptions !== null) {
      this.subscriptions = this.subscriptions.concat(subscriptions);
    } else {
      subscriptions.forEach(removeSubscription);
    }
  }

  engage() {
    if (this.subscriptions === null) {
      this.subscriptions = [];
    }
  }

  release() {
    if (this.subscriptions !== null) {
      this.subscriptions.forEach(removeSubscription);
      this.subscriptions = null;
    }
  }

  releaseOne(subscription) {
    if (this.subscriptions === null) return;
    const index = this.subscriptions.indexOf(subscription);
    if (index !== -1) {
      removeSubscription(subscription);
      this.subscriptions.splice(index, 1);
      if (this.subscriptions.length === 0) {
        this.subscriptions = null;
      }
    }
  }
}

export default SubscriptionsHandler;
