/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import uniqueID from "../helpers/uniqueID";

const createItemKey = () => `geo-toast-${uniqueID()}`;

const addToast = (toasts, toast, config) => [...toasts, { toast, config }];

const hideToast = (toasts, key) =>
  toasts.map((item) =>
    item.config.key === key
      ? { ...item, config: { ...item.config, isVisible: false } }
      : item
  );

const hideAllToasts = (toasts) =>
  toasts.map((item) => ({
    ...item,
    config: { ...item.config, isVisible: false },
  }));

const removeToast = (toasts, key) =>
  toasts.filter((item) => item.config.key !== key);

const itemsReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return addToast(state, action.toast, {
        ...action.config,
        key: action.key,
        onAfterHide: action.onAfterHide,
      });
    case "remove":
      return removeToast(state, action.key);
    case "hide":
      return hideToast(state, action.key);
    case "hideAll":
      return hideAllToasts(state);
    default:
      return state;
  }
};

const globalToasterSubscriptions = new Map();

const updateGlobalToasterSubscribers = (callback) => {
  for (let subscriber of globalToasterSubscriptions.values()) {
    subscriber(callback);
  }
};

export {
  createItemKey,
  globalToasterSubscriptions,
  itemsReducer,
  updateGlobalToasterSubscribers,
};
