/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import removeFromArray from "fbjs/lib/removeFromArray";

import unrecoverableViolation from "../../helpers/unrecoverableViolation";

const emptyState = {};

const createOneTimeFunction = (fn) => {
  let called = false;
  return () => {
    if (!called) {
      fn();
      called = true;
    }
  };
};

class XPlatReactToasterStateManager {
  constructor({ callbackScheduler, maxQueuedToasts }) {
    this.idCounter = 0;
    this.stateMap = new Map();
    this.listeners = [];
    this.views = [];
    this.highestPriorityView = null;
    this.callbackScheduler = callbackScheduler;
    this.maxQueuedToasts = maxQueuedToasts;
  }

  push(value, duration) {
    const id = `toast-${this.idCounter++}`;
    const node = {
      duration,
      expired: false,
      id,
      shown: false,
      timer: null,
      value,
    };
    this.updateState({ node, type: "PUSH" });
    return id;
  }

  replace(id, value) {
    this.updateState({ id, type: "REPLACE", value });
  }

  shown(id) {
    this.updateState({ id, type: "SHOWN" });
  }

  delete(id) {
    this.updateState({ id, type: "DELETE" });
  }

  expire(id) {
    this.updateState({ id, type: "EXPIRE" });
  }

  hidden(id) {
    this.updateState({ id, type: "HIDDEN" });
  }

  stopTimer(id) {
    this.updateState({ id, type: "STOP_TIMER" });
  }

  resetTimer(id) {
    this.updateState({ id, type: "RESET_TIMER" });
  }

  getState() {
    return Object.fromEntries(this.stateMap);
  }

  getEmptyState() {
    return emptyState;
  }

  addListener(listener) {
    this.listeners.push(listener);
    return {
      remove: createOneTimeFunction(() => {
        removeFromArray(this.listeners, listener);
      }),
    };
  }

  updateHighestPriorityView(view) {
    if (
      !this.highestPriorityView ||
      view.priority > this.highestPriorityView.priority
    ) {
      this.highestPriorityView = view;
    }
  }

  registerView(handler, priority = 1) {
    const view = { handler, priority };
    this.views.push(view);
    this.updateHighestPriorityView(view);
    this.notifyListeners();
    return {
      remove: createOneTimeFunction(() => {
        removeFromArray(this.views, view);
        if (this.highestPriorityView === view) {
          this.highestPriorityView = null;
          this.views.forEach((v) => this.updateHighestPriorityView(v));
        }
      }),
    };
  }

  // eslint-disable-next-line complexity
  updateState(action) {
    const prevState = this.stateMap;
    switch (action.type) {
      case "PUSH": {
        const { node } = action;
        this.stateMap = new Map([...this.stateMap, [node.id, node]]);
        if (this.maxQueuedToasts !== 0) {
          const pendingToasts = Array.from(this.stateMap.values()).filter(
            (t) => !t.shown && !t.expired
          );
          if (pendingToasts.length > this.maxQueuedToasts) {
            this.delete(pendingToasts[0].id);
          }
        }
        break;
      }
      case "SHOWN": {
        if (this.stateMap.has(action.id) && !this.getToast(action.id).shown) {
          const updatedToast = { ...this.getToast(action.id), shown: true };
          this.stateMap = new Map([
            ...this.stateMap,
            [action.id, this.startTimer(updatedToast)],
          ]);
        }
        break;
      }
      case "EXPIRE": {
        if (this.stateMap.has(action.id)) {
          const updatedToast = { ...this.getToast(action.id), expired: true };
          this.stateMap = new Map([
            ...this.stateMap,
            [action.id, this.stopTimer(updatedToast)],
          ]);
          this.scheduleDelete(updatedToast);
        }
        break;
      }
      case "HIDDEN": {
        if (this.stateMap.has(action.id)) {
          const toast = this.getToast(action.id);
          if (toast.shown || toast.expired) {
            this.stateMap = new Map(this.stateMap);
            this.stateMap.delete(action.id);
            this.stopTimer(toast);
          }
        }
        break;
      }
      case "DELETE": {
        if (this.stateMap.has(action.id)) {
          const toast = this.getToast(action.id);
          this.stateMap = new Map(this.stateMap);
          this.stateMap.delete(action.id);
          this.stopTimer(toast);
        }
        break;
      }
      case "REPLACE": {
        if (this.stateMap.has(action.id)) {
          const toast = this.getToast(action.id);
          this.stateMap = new Map([
            ...this.stateMap,
            [action.id, { ...toast, value: action.value }],
          ]);
        }
        break;
      }
      case "STOP_TIMER": {
        if (
          this.stateMap.has(action.id) &&
          this.isTimerRunning(this.getToast(action.id))
        ) {
          const updatedToast = { ...this.getToast(action.id) };
          this.stateMap = new Map([
            ...this.stateMap,
            [action.id, this.stopTimer(updatedToast)],
          ]);
        }
        break;
      }
      case "RESET_TIMER": {
        if (
          this.stateMap.has(action.id) &&
          !this.isTimerRunning(this.getToast(action.id))
        ) {
          const updatedToast = { ...this.getToast(action.id) };
          this.stateMap = new Map([
            ...this.stateMap,
            [action.id, this.startTimer(updatedToast)],
          ]);
        }
        break;
      }
    }
    if (prevState !== this.stateMap) {
      this.notifyListeners();
    }
  }

  notifyListeners() {
    this.listeners.forEach((listener) =>
      this.callbackScheduler(() => listener())
    );
    this.views.forEach((view) =>
      this.callbackScheduler(() =>
        view.handler(
          view === this.highestPriorityView
            ? this.getState()
            : this.getEmptyState()
        )
      )
    );
  }

  startTimer(toast) {
    if (toast.duration !== null && toast.timer === null) {
      toast.timer = setTimeout(() => {
        this.expire(toast.id);
      }, toast.duration);
    }
    return toast;
  }

  cancelTimer(toast) {
    if (toast.timer !== null) {
      clearTimeout(toast.timer);
      toast.timer = null;
    }
    return toast;
  }

  scheduleDelete(toast) {
    this.cancelTimer(toast);
    const { id } = toast;
    setTimeout(() => {
      this.delete(id);
    }, 1000);
  }

  isTimerRunning(toast) {
    return toast.timer !== null;
  }

  getToast(id) {
    const toast = this.stateMap.get(id);
    if (toast === null) {
      throw unrecoverableViolation(
        "Toast with given identifier was not found",
        "comet_ui"
      );
    }
    return toast;
  }

  static getInstance(config) {
    if (!XPlatReactToasterStateManager.instance) {
      XPlatReactToasterStateManager.instance =
        new XPlatReactToasterStateManager(config);
    }
    return XPlatReactToasterStateManager.instance;
  }

  static resetInstance_DO_NOT_USE() {
    XPlatReactToasterStateManager.instance = null;
  }
}

export default XPlatReactToasterStateManager;
