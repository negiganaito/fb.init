/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const PromiseImpl = Promise;

if (!PromiseImpl.allSettled) {
  PromiseImpl.allSettled = function (iterable) {
    if (typeof iterable[Symbol.iterator] !== "function") {
      return PromiseImpl.reject(
        new TypeError("Promise.allSettled must be passed an iterable.")
      );
    }

    const promises = Array.from(iterable);
    const results = new Array(promises.length);

    const mapPromise = (index, promise) => {
      if (
        typeof promise === "object" &&
        promise !== null &&
        typeof promise.then === "function"
      ) {
        results[index] = new PromiseImpl((resolve) => {
          promise.then(
            (value) => resolve({ status: "fulfilled", value }),
            (reason) => resolve({ status: "rejected", reason })
          );
        });
      } else {
        results[index] = PromiseImpl.resolve({
          status: "fulfilled",
          value: promise,
        });
      }
    };

    for (let i = 0; i < promises.length; i++) {
      mapPromise(i, promises[i]);
    }

    return PromiseImpl.all(results);
  };
}

if (!PromiseImpl.prototype.finally) {
  PromiseImpl.prototype.finally = function (callback) {
    return this.then(
      (value) => PromiseImpl.resolve(callback()).then(() => value),
      (reason) =>
        PromiseImpl.resolve(callback()).then(() => {
          throw reason;
        })
    );
  };
}

export default PromiseImpl;
