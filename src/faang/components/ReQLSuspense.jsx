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
import { startTransition, useEffect, useMemo, useState } from "react";
import applyChangesToBPlusTree from "applyChangesToBPlusTree";
import createBPlusTreeFromSorted from "createBPlusTreeFromSorted";
import FBLogger from "FBLogger";
import I64 from "I64";
import isPromise from "isPromise";
import Promise from "Promise";
import PromiseAnnotate from "PromiseAnnotate";
import promiseDone from "promiseDone";
import PromiseOrValue from "PromiseOrValue";
import ReQL from "ReQL";
import ReQLGlobalQueryContext from "ReQLGlobalQueryContext";
import ReQLSuspenseSupportedContextTracking from "ReQLSuspenseSupportedContextTracking";
import shallowEqualI64 from "shallowEqualI64";
import SortedAsyncIterable from "SortedAsyncIterable";
import useReStore from "useReStore";

const isWithinSupportedContext = () => {
  return (
    ReQLGlobalQueryContext.globalQueryContext.withinSupportedContext ||
    ReQLSuspenseSupportedContextTracking.isWithinReactRenderingContext()
  );
};
function handlePromiseOrValue(value, displayName, shouldThrow = false) {
  if (shouldThrow === true && !isWithinSupportedContext()) {
    FBLogger("messenger_web", "reqlsuspense_unsupported_use")
      .blameToPreviousFile()
      .mustfix(
        "Detected use of ReQLSuspense method in unsupported context.\ntoArray/first/firstExn can only be used inside the body of a projection function passed to ReQL map operator.\nFor React rendering contexts, please use appropriate hook (useArray/useFirst/useFirstExn) variants instead."
      );
  }
  if (isPromise(value)) {
    if (displayName !== null) {
      PromiseAnnotate.setDisplayName(value, displayName);
    } else {
      throw value;
    }
  }
  return value;
}

function flattenArray(array) {
  const flattened = [];
  for (const item of array) {
    if (
      Array.isArray(item) &&
      item.length === 2 &&
      Number.isInteger(item[0]) &&
      Number.isInteger(item[1])
    ) {
      flattened.push(item[0], item[1]);
    } else {
      flattened.push(item, undefined);
    }
  }
  return flattened;
}

function toArray(query, displayName) {
  return handlePromiseOrValue(
    SortedAsyncIterable.toArray(query),
    displayName,
    true
  ).map(([_, value]) => value);
}

function first(query, displayName) {
  return toArray(ReQL.prototype.take.call(query, 1), displayName)[0];
}

function firstExn(query, displayName) {
  const result = first(query, displayName);
  if (result === null) {
    throw FBLogger("messenger_web").mustfixThrow("expected result");
  }
  return result;
}

function useArray(factory, dependencies, uniqueId) {
  const memoizedQuery = useMemo(
    () => {
      const query = factory();
      query.uniqueId = uniqueId;
      return query;
    },
    dependencies === null ? [factory] : flattenArray(dependencies)
  );

  const arrayResult = useMemo(
    () =>
      handlePromiseOrValue(SortedAsyncIterable.toArray(memoizedQuery)).map(
        ([_, value]) => value
      ),
    [memoizedQuery]
  );

  const [state, setState] = useState([arrayResult, memoizedQuery]);
  const reStore = useReStore();

  useEffect(() => {
    let currentTree;
    const changes = [];
    const subscription = memoizedQuery.subscribe((index, change) => {
      changes.push([index, change]);
    });

    function applyChanges() {
      if (changes.length && currentTree !== null) {
        const tree = currentTree;
        if (applyChangesToBPlusTree(tree, changes)) {
          setState([
            Array.from(tree.entries(), ([_, value]) => value),
            memoizedQuery,
          ]);
        }
      }
    }

    const unsubscribeCommit = reStore.subscribeToCommit(applyChanges);

    promiseDone(
      Promise.resolve(
        PromiseOrValue.map(
          SortedAsyncIterable.toArray(memoizedQuery),
          (items) => {
            currentTree = createBPlusTreeFromSorted(
              items,
              memoizedQuery.direction
            );
            const tree = currentTree;
            applyChangesToBPlusTree(tree, changes);
            startTransition(() => {
              // eslint-disable-next-line max-nested-callbacks
              setState((prevState) =>
                shallowEqualI64(
                  prevState[0],
                  // eslint-disable-next-line max-nested-callbacks
                  Array.from(tree.entries(), (entry) => entry[1])
                ) && prevState[1] === memoizedQuery
                  ? prevState
                  : [
                      // eslint-disable-next-line max-nested-callbacks
                      Array.from(tree.entries(), (entry) => entry[1]),
                      memoizedQuery,
                    ]
              );
            });
          }
        )
      )
    );

    return () => {
      unsubscribeCommit();
      subscription();
    };
  }, [memoizedQuery, reStore]);

  return memoizedQuery === state[1] ? state[0] : arrayResult;
}

function useFirst(factory, dependencies, uniqueId) {
  const memoizedQuery = useMemo(
    () => {
      const query = factory().take(1);
      query.uniqueId = uniqueId;
      return query;
    },
    dependencies === null ? [factory] : flattenArray(dependencies)
  );

  const firstResult = useMemo(() => {
    const { value } = handlePromiseOrValue(
      memoizedQuery
        .iterator(SortedAsyncIterable.getOrCreateContext(memoizedQuery))
        .next(),
      memoizedQuery.uniqueId
    );
    return value?.[1];
  }, [memoizedQuery, uniqueId]);

  const [state, setState] = useState([firstResult, memoizedQuery]);
  const reStore = useReStore();

  useEffect(() => {
    let currentValue;
    let hasChanged = false;
    const subscription = memoizedQuery.subscribe((_, change) => {
      switch (change.operation) {
        case "delete":
          currentValue = undefined;
          break;
        case "put":
          if (currentValue === change.value) return;
          // eslint-disable-next-line no-case-declarations
          const oldValue = I64.cast(currentValue);
          if (oldValue !== null) {
            const newValue = I64.cast(change.value);
            if (newValue !== null && I64.equal(oldValue, newValue)) return;
          }
        // eslint-disable-next-line no-fallthrough
        case "add":
          currentValue = change.value;
          break;
      }
      hasChanged = true;
    });

    const unsubscribeCommit = subscribeToCommit(reStore, () => {
      if (hasChanged) {
        hasChanged = false;
        setState([currentValue, memoizedQuery]);
      }
    });

    promiseDone(
      Promise.resolve(
        PromiseOrValue.map(
          memoizedQuery
            .iterator(SortedAsyncIterable.getOrCreateContext(memoizedQuery))
            .next(),
          (result) => {
            startTransition(() => {
              // eslint-disable-next-line max-nested-callbacks
              setState((prevState) =>
                prevState[0] === result.value?.[1] &&
                prevState[1] === memoizedQuery
                  ? prevState
                  : [result.value?.[1], memoizedQuery]
              );
            });
            currentValue = result.value?.[1];
          }
        )
      )
    );

    return () => {
      unsubscribeCommit();
      subscription();
    };
  }, [memoizedQuery, reStore]);

  return memoizedQuery === state[1] ? state[0] : firstResult;
}

function useFirstExn(factory, dependencies, uniqueId) {
  const firstResult = useFirst(factory, dependencies, uniqueId);
  if (firstResult === undefined) {
    throw FBLogger("messenger_web").mustfixThrow("expected result");
  }
  return firstResult;
}

// eslint-disable-next-line max-params
function useQueryWithSubscription(
  getQuery,
  dependencies,
  uniqueId,
  projectionFn
) {
  const memoizedQuery = useMemo(
    () => {
      const query = getQuery();
      query.uniqueId = uniqueId;
      return query;
    },
    dependencies === null ? [getQuery] : flattenArray(dependencies)
  );

  return useMemo(() => {
    return ReQLGlobalQueryContext.runFromContextThatHandlesThrownPromise(
      () => projectionFn && projectionFn(memoizedQuery)
    );
  }, [memoizedQuery, projectionFn]);
}

function useArrayWithoutSubscribing(factory, dependencies) {
  return useQueryWithSubscription(factory, dependencies, arguments[2], toArray);
}

function useFirstWithoutSubscribing(factory, dependencies) {
  return useQueryWithSubscription(factory, dependencies, arguments[2], first);
}

function useFirstExnWithoutSubscribing(factory, dependencies) {
  return useQueryWithSubscription(
    factory,
    dependencies,
    arguments[2],
    firstExn
  );
}

const commitHandlerMap = new Map();

function subscribeToCommit(reStore, handler) {
  let handlerInfo = commitHandlerMap.get(reStore);
  if (!handlerInfo) {
    const handlers = new Map();
    handlerInfo = {
      handlers,
      unsubscribe: reStore.subscribeToCommit(() => {
        startTransition(() => {
          handlers.forEach((h) => h());
        });
      }),
    };
    commitHandlerMap.set(reStore, handlerInfo);
  }

  const key = {};
  handlerInfo.handlers.set(key, handler);

  return () => {
    handlerInfo.handlers.delete(key);
    if (handlerInfo.handlers.size === 0) {
      handlerInfo.unsubscribe();
      commitHandlerMap.delete(reStore);
    }
  };
}

export {
  toArray,
  useArray,
  useArrayWithoutSubscribing,
  useFirst,
  useFirstExn,
  useFirstExnWithoutSubscribing,
  useFirstWithoutSubscribing,
};
