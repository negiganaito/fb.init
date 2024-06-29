/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const EventProfilerSham = {
  __wrapEventListenHandler(handler) {
    return handler;
  },
  tagCurrentActiveInteractionsAs(tag) {},
  setCurrentAdAccountId(adAccountId) {},
  setAdsConfig(config) {},
};

export default EventProfilerSham;
