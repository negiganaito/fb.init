/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import invariant from "fbjs/lib/invariant";

class ArbiterToken {
  constructor(arbiterInstance, subscriptions) {
    this.arbiterInstance = arbiterInstance;
    this.subscriptions = subscriptions;
  }

  unsubscribe() {
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].remove();
    }
    this.subscriptions.length = 0;
  }

  isForArbiterInstance(instance) {
    invariant(this.arbiterInstance, "Arbiter instance is not set");
    return this.arbiterInstance === instance;
  }
}

export default ArbiterToken;
