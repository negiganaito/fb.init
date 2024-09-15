/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
class SimpleHook {
  constructor() {
    this.__callbacks = [];
    this.call = this._callCallbacks;
  }

  hasCallback(callback) {
    return (
      this.__callbacks.length > 0 &&
      (callback === null ||
        this.__callbacks.some((cb) => cb === callback || cb.$1 === callback))
    );
  }

  add(callback, options) {
    let wrappedCallback;

    if (options?.once === true) {
      wrappedCallback = (...args) => {
        this.remove(wrappedCallback);
        callback.apply(null, args);
      };
      wrappedCallback.$1 = callback;
    } else {
      wrappedCallback = callback;
    }

    this.__callbacks.push(wrappedCallback);
    return wrappedCallback;
  }

  removeLast() {
    return this.__callbacks.pop();
  }

  remove(callback) {
    return this.removeIf((cb) => cb === callback);
  }

  removeIf(predicate) {
    const oldLength = this.__callbacks.length;
    this.__callbacks = this.__callbacks.filter((cb) => !predicate(cb));
    return oldLength > this.__callbacks.length;
  }

  clear() {
    this.__callbacks = [];
  }

  _callCallbacks(...args) {
    for (let i = 0, len = this.__callbacks.length; i < len; ++i) {
      this.__callbacks[i].apply(null, args);
    }
  }
}

export { SimpleHook };
