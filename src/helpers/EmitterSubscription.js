/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import EventSubscription from "./EventSubscription";

class EmitterSubscription extends EventSubscription {
  constructor(eventSubscriptionVendor, listener, context) {
    super(eventSubscriptionVendor);
    this.listener = listener;
    this.context = context;
  }
}

export default EmitterSubscription;
