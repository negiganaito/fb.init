/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import {
  getDisplayName,
  setDisplayName,
} from "../../business/helpers/PromiseAnnotate";

function makeWithError(error) {
  return { current: { error, state: "Error" } };
}

function makeWithValue(value) {
  return { current: { state: "Done", value } };
}

function makeWithPromise(promise) {
  const state = {
    current: {
      promise: promise
        .then((value) => {
          state.current = { state: "Done", value };
          return value;
        })
        .catch((error) => {
          state.current = { error, state: "Error" };
          throw error;
        }),
      state: "Loading",
    },
  };
  return state;
}

function makeCollection() {
  return new WeakMap();
}

function getOrSuspend(state) {
  if (state.state === "Loading") throw state.promise;
  if (state.state === "Error") throw state.error;
  return state.value;
}
function getFromCollection(collection, key, fetcher) {
  let state = collection.get(key);

  if (state !== null) {
    return getOrSuspend(state);
  }

  const promise = fetcher();
  state = {
    promise: promise
      .then((value) => {
        collection.set(key, { state: "Done", value });
        return value;
      })
      .catch((error) => {
        collection.set(key, { error, state: "Error" });
        throw error;
      }),
    state: "Loading",
  };

  const displayName = getDisplayName(promise) || "LSCollection";
  setDisplayName(promise, displayName);

  collection.set(key, state);
  return getOrSuspend(state);
}

export {
  getFromCollection,
  getOrSuspend,
  makeCollection,
  makeWithError,
  makeWithPromise,
  makeWithValue,
};
