/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable no-invalid-this */
/* eslint-disable max-params */
import BPlusTree from "../../helpers/BPlusTree";

import { PromiseOrValue } from "./PromiseOrValue";
import {
  extendBounds,
  forEachMatchingBounds,
  mergeBounds,
  ReQLBounds,
} from "./ReQLBounds";
import {
  getDependencies,
  globalQueryContext,
  runFromContextThatHandlesThrownPromise,
  setDependencies,
} from "./ReQLGlobalQueryContext";
import ReStoreKeyComparer, {
  compareKey,
  compareValue,
} from "./ReStoreKeyComparer";
import { unrecoverableViolation } from "./unrecoverableViolation";

const reQLPrototype = {
  bounds: bounds,
  filter: filter,
  getKeyRange: getKeyRange,
  map: map,
  take: take,
};

async function runInContext(callback, context) {
  try {
    const prevContext = globalQueryContext.contents;
    let prevDependencies = getDependencies(context);
    if (prevDependencies === null) {
      setDependencies(context, []);
    }
    globalQueryContext.contents = context;
    let result;
    let dependencies;
    try {
      result = await runFromContextThatHandlesThrownPromise(callback);
      dependencies = getDependencies(context) || [];
    } finally {
      setDependencies(context, prevDependencies);
      globalQueryContext.contents = prevContext;
    }
    return [result, dependencies];
  } catch (error) {
    if (error instanceof Promise) {
      return error.then(() => runInContext(callback, context));
    }
    throw error;
  }
}

function key(...args) {
  return args;
}

function bounds(newBounds) {
  const self = this;
  return Object.setPrototypeOf(
    {
      direction: self.direction,
      iterator: function (context, bounds) {
        return self.iterator(context, mergeBounds(newBounds, bounds));
      },
      keyLength: self.keyLength,
      subscribe: function (callback, bounds) {
        return self.subscribe(callback, mergeBounds(newBounds, bounds));
      },
    },
    reQLPrototype
  );
}

const emptyIterable = Object.setPrototypeOf(
  {
    direction: "asc",
    iterator: function () {
      return {
        next: function () {
          return {
            done: true,
          };
        },
      };
    },
    keyLength: 0,
    subscribe: function () {
      return function () {};
    },
  },
  reQLPrototype
);

function empty() {
  return emptyIterable;
}

function filter(predicate) {
  const self = this;
  const filterCache = new Map();
  return Object.setPrototypeOf(
    {
      direction: self.direction,
      iterator: function (context, bounds) {
        const iterator = self.iterator(context, bounds);
        return {
          next: function (key) {
            return PromiseOrValue.loop(async (key) => {
              const result = await iterator.next(key);
              if (result.done) {
                return {
                  action: "break",
                  value: result,
                };
              }
              const [currentKey, currentValue] = result.value;
              if (predicate(currentValue)) {
                forEachMatchingBounds(filterCache, currentKey, (cache) => {
                  cache.add(JSON.stringify(currentKey));
                });
                return {
                  action: "break",
                  value: result,
                };
              }
              forEachMatchingBounds(filterCache, currentKey, (cache) => {
                cache.delete(JSON.stringify(currentKey));
              });
              return {
                action: "continue",
                value: undefined,
              };
            }, key);
          },
        };
      },
      keyLength: self.keyLength,
      subscribe: function (callback, bounds) {
        const cacheKey = {};
        const cache = new Set();
        filterCache.set(cacheKey, [
          extendBounds(bounds, self.keyLength),
          cache,
        ]);
        const unsubscribe = self.subscribe((key, operation, context) => {
          const keyStr = JSON.stringify(key);
          if (operation.operation === "add" && predicate(operation.value)) {
            cache.add(keyStr);
            return callback(key, operation, context);
          }
          if (operation.operation === "put" && predicate(operation.value)) {
            if (cache.has(keyStr)) {
              return callback(key, operation, context);
            }
            cache.add(keyStr);
            return callback(
              key,
              {
                operation: "add",
                value: operation.value,
              },
              context
            );
          }
          if (operation.operation === "put" && cache.has(keyStr)) {
            cache.delete(keyStr);
            return callback(
              key,
              {
                operation: "delete",
              },
              context
            );
          }
          if (operation.operation === "delete" && cache.has(keyStr)) {
            cache.delete(keyStr);
            return callback(key, operation, context);
          }
        }, bounds);
        return function () {
          filterCache.delete(cacheKey);
          return unsubscribe();
        };
      },
    },
    reQLPrototype
  );
}

function getKeyRange(...keyPrefix) {
  const self = this;

  function gt(bounds) {
    return bounds.gt !== null
      ? {
          gt: [...keyPrefix, ...bounds.gt],
        }
      : {
          gte: [...keyPrefix, ...bounds.gte],
        };
  }

  function lt(bounds) {
    return bounds.lt !== null
      ? {
          lt: [...keyPrefix, ...bounds.lt],
        }
      : {
          lte: [...keyPrefix, ...bounds.lte],
        };
  }

  function getBounds(bounds) {
    return bounds === null
      ? {
          gte: keyPrefix,
          lte: keyPrefix,
        }
      : {
          ...(bounds.gte !== null || bounds.gt !== null
            ? gt(bounds)
            : {
                gte: keyPrefix,
              }),
          ...(bounds.lte !== null || bounds.lt !== null
            ? lt(bounds)
            : {
                lte: keyPrefix,
              }),
        };
  }

  return Object.setPrototypeOf(
    {
      direction: self.direction,
      iterator: function (context, bounds) {
        const iterator = self.iterator(context, getBounds(bounds));
        return {
          next: function (key) {
            return PromiseOrValue.map(
              iterator.next(key === null ? key : [...keyPrefix, ...key]),
              (result) => {
                return result.done
                  ? {
                      done: true,
                    }
                  : {
                      done: false,
                      value: [
                        result.value[0].slice(keyPrefix.length),
                        result.value[1],
                      ],
                    };
              }
            );
          },
        };
      },
      keyLength: self.keyLength - keyPrefix.length,
      subscribe: function (callback, bounds) {
        return self.subscribe((key, operation, context) => {
          return callback(key.slice(keyPrefix.length), operation, context);
        }, getBounds(bounds));
      },
    },
    reQLPrototype
  );
}

function leftJoin(left, right) {
  if (left.direction !== right.direction) {
    throw unrecoverableViolation(
      "merge join requires iterables to be sorted in the same direction",
      "messenger_web_product"
    );
  }
  return Object.setPrototypeOf(
    {
      direction: left.direction,
      iterator: function (context, bounds) {
        const leftIterator = left.iterator(context, bounds);
        let rightIterator = right.iterator(context, bounds);
        let rightResult = rightIterator.next();

        async function getRightValue(leftKey) {
          return PromiseOrValue.map(rightResult, (result) => {
            const done = result.done
              ? true
              : compareKey(leftKey, result.value[0]) <= 0;
            const nextResult = done ? result : rightIterator.next(leftKey);
            rightResult = nextResult;
            return nextResult;
          });
        }

        return {
          next: function (key) {
            return PromiseOrValue.map(
              leftIterator.next(key),
              async (leftResult) => {
                if (leftResult.done) {
                  return {
                    done: true,
                    value: undefined,
                  };
                }
                const [leftKey, leftValue] = leftResult.value;
                return PromiseOrValue.map(
                  await getRightValue(leftKey),
                  (rightResult) => {
                    // const [leftKey, leftValue] = leftResult.value;
                    if (rightResult.done) {
                      return {
                        done: false,
                        value: [leftKey, [leftValue, undefined]],
                      };
                    }
                    const [rightKey, rightValue] = rightResult.value;
                    const cmp = compareKey(leftKey, rightKey);
                    if (cmp > 0) {
                      throw unrecoverableViolation(
                        "Right iterable should always be equal to or ahead",
                        "messenger_web_product"
                      );
                    } else if (cmp < 0) {
                      return {
                        done: false,
                        value: [leftKey, [leftValue, undefined]],
                      };
                    } else {
                      return {
                        done: false,
                        value: [leftKey, [leftValue, rightValue]],
                      };
                    }
                  }
                );
              }
            );
          },
        };
      },
      keyLength: Math.max(left.keyLength, right.keyLength),
      subscribe: function (callback, bounds) {
        let active = true;
        const leftUnsubscribe = left.subscribe(
          async (key, operation, context) => {
            return PromiseOrValue.map(
              await right
                .iterator(context, {
                  gte: key,
                  lte: key,
                })
                .next(),
              (rightResult) => {
                const rightValue = rightResult.value;
                if (!active) {
                  return;
                }
                return callback(
                  key,
                  operation.operation === "add"
                    ? {
                        operation: "add",
                        value: [
                          operation.value,
                          rightValue === null ? undefined : rightValue[1],
                        ],
                      }
                    : operation.operation === "put"
                    ? {
                        operation: "put",
                        value: [
                          operation.value,
                          rightValue === null ? undefined : rightValue[1],
                        ],
                      }
                    : {
                        operation: "delete",
                      },
                  context
                );
              }
            );
          },
          bounds
        );
        const rightUnsubscribe = right.subscribe(
          async (key, operation, context) => {
            return PromiseOrValue.map(
              await left
                .iterator(context, {
                  gte: key,
                  lte: key,
                })
                .next(),
              (leftResult) => {
                if (!active || leftResult.done) {
                  return;
                }
                return callback(
                  key,
                  operation.operation === "add"
                    ? {
                        operation: "add",
                        value: [leftResult.value[1], operation.value],
                      }
                    : operation.operation === "put"
                    ? {
                        operation: "put",
                        value: [leftResult.value[1], operation.value],
                      }
                    : {
                        operation: "delete",
                      },
                  context
                );
              }
            );
          },
          bounds
        );
        return function () {
          active = false;
          leftUnsubscribe();
          rightUnsubscribe();
        };
      },
    },
    reQLPrototype
  );
}

function map(mapper) {
  const self = this;
  const mapCache = new Map();

  function setUpMapCache(cache, callback, key, value, dependencies) {
    const keyStr = JSON.stringify(key);
    let cacheEntry = cache.get(keyStr);
    if (cacheEntry === null) {
      cacheEntry = [];
      cache.set(keyStr, cacheEntry);
    }
    cacheEntry.forEach((unsubscribe) => unsubscribe());
    cacheEntry.length = 0;
    const unsubscribeList = cacheEntry;
    dependencies.forEach((dependency) => {
      unsubscribeList.push(
        dependency.subscribe((depKey, depOperation, depContext) => {
          return PromiseOrValue.map(
            getMappedValue(cache, callback, key, value, depContext),
            (mappedValue) => {
              return callback(
                key,
                {
                  operation: "put",
                  value: mappedValue,
                },
                depContext
              );
            }
          );
        })
      );
    });
  }

  async function getMappedValue(cache, callback, key, value, context) {
    return PromiseOrValue.map(
      await runInContext(() => mapper(value), context),
      ([mappedValue, dependencies]) => {
        setUpMapCache(cache, callback, key, value, dependencies);
        return mappedValue;
      }
    );
  }

  function tearDownMapCache(cache, key) {
    const keyStr = JSON.stringify(key);
    if (!cache.has(keyStr)) {
      return;
    }
    const unsubscribeList = cache.get(JSON.stringify(key)) ?? [];
    unsubscribeList.forEach((unsubscribe) => unsubscribe());
    unsubscribeList.length = 0;
    cache.delete(keyStr);
  }

  return Object.setPrototypeOf(
    {
      direction: self.direction,
      iterator: function (context, bounds) {
        const iterator = self.iterator(context, bounds);
        return {
          next: function (key) {
            return PromiseOrValue.map(iterator.next(key), async (result) => {
              if (result.done) {
                return result;
              }
              const [currentKey, currentValue] = result.value;
              return PromiseOrValue.map(
                await PromiseOrValue.map(
                  runInContext(() => mapper(currentValue), context),
                  ([mappedValue, dependencies]) => {
                    forEachMatchingBounds(
                      mapCache,
                      currentKey,
                      ([cache, callback]) => {
                        setUpMapCache(
                          cache,
                          callback,
                          currentKey,
                          currentValue,
                          dependencies
                        );
                      }
                    );
                    return mappedValue;
                  }
                ),
                (mappedValue) => {
                  return {
                    done: false,
                    value: [currentKey, mappedValue],
                  };
                }
              );
            });
          },
        };
      },
      keyLength: self.keyLength,
      subscribe: function (callback, bounds) {
        const cacheKey = {};
        const cache = new Map();
        mapCache.set(cacheKey, [
          extendBounds(bounds, self.keyLength),
          [cache, callback],
        ]);
        const unsubscribe = self.subscribe((key, operation, context) => {
          if (operation.operation === "delete") {
            tearDownMapCache(cache, key);
            return callback(key, operation, context);
          } else if (operation.operation === "add") {
            const value = operation.value;
            return PromiseOrValue.map(
              getMappedValue(cache, callback, key, value, context),
              (mappedValue) => {
                return callback(
                  key,
                  {
                    operation: "add",
                    value: mappedValue,
                  },
                  context
                );
              }
            );
          } else if (operation.operation === "put") {
            const value = operation.value;
            return PromiseOrValue.map(
              getMappedValue(cache, callback, key, value, context),
              (mappedValue) => {
                return callback(
                  key,
                  {
                    operation: "put",
                    value: mappedValue,
                  },
                  context
                );
              }
            );
          }
        }, bounds);
        return function () {
          cache.forEach((unsubscribeList) =>
            unsubscribeList.forEach((unsubscribe) => unsubscribe())
          );
          cache.clear();
          mapCache.delete(cacheKey);
          unsubscribe();
        };
      },
    },
    reQLPrototype
  );
}

function take(limit) {
  const self = this;
  const takeCache = new Map();

  return Object.setPrototypeOf(
    {
      direction: self.direction,
      iterator: function (context, bounds) {
        const iterator = self.iterator(context, bounds);
        let taken = 0;

        return {
          next: function (key) {
            if (taken >= limit) {
              return Promise.resolve({ done: true, value: undefined });
            }

            return PromiseOrValue.map(iterator.next(key), (result) => {
              if (result.done) {
                return result;
              }

              ReQLBounds.forEachMatchingBounds(
                takeCache,
                result.value[0],
                ([cache, count]) => {
                  if (!cache.has(result.value[0]) && count.contents <= limit) {
                    count.contents += 1;
                    cache.set(result.value[0], undefined);
                  }
                }
              );

              taken += 1;
              return result;
            });
          },
        };
      },
      keyLength: self.keyLength,
      subscribe: function (callback, bounds) {
        const cacheKey = {};
        const order = self.direction === "asc" ? 1 : -1;
        const cache = new BPlusTree((a, b) => compareKey(a, b) * -order);
        const count = { contents: 0 };

        takeCache.set(cacheKey, [
          ReQLBounds.extendBounds(bounds, self.keyLength),
          [cache, count],
        ]);

        const unsubscribe = self.subscribe((key, operation, context) => {
          const first = cache.entries().next().value?.[0];
          const isFirst = first === null || compareKey(key, first) * order <= 0;

          if (operation.operation === "delete" && isFirst) {
            let result;
            if (count.contents > 0) {
              cache.delete(key);
              result = callback(key, operation, context);
            }

            return PromiseOrValue.map(result, () => {
              return PromiseOrValue.map(
                self
                  .iterator(
                    context,
                    first === null
                      ? undefined
                      : order === 1
                      ? { gt: first }
                      : { lt: first }
                  )
                  .next(),
                (next) => {
                  if (!next.done && takeCache.has(cacheKey)) {
                    cache.set(next.value[0], undefined);
                    return callback(
                      next.value[0],
                      { operation: "add", value: next.value[1] },
                      context
                    );
                  }
                  if (count.contents > 0) {
                    count.contents -= 1;
                  }
                }
              );
            });
          }

          if (operation.operation === "add" && count.contents < limit) {
            count.contents += 1;
            cache.set(key, undefined);
            return callback(key, operation, context);
          }

          if (operation.operation === "add" && isFirst) {
            let result;
            if (first !== null) {
              cache.delete(first);
              result = callback(first, { operation: "delete" }, context);
            }

            return PromiseOrValue.map(result, () => {
              cache.set(key, undefined);
              return callback(key, operation, context);
            });
          }

          if (operation.operation === "put" && isFirst) {
            return callback(key, operation, context);
          }
        }, bounds);

        return function () {
          takeCache.delete(cacheKey);
          return unsubscribe();
        };
      },
    },
    reQLPrototype
  );
}

function union(other, ...others) {
  const self = this;
  const unionResult = _union(self, other);

  return others.reduce((result, nextOther) => {
    return _union(result, nextOther);
  }, unionResult);
}

function _union(left, right) {
  return Object.setPrototypeOf(
    {
      direction: left.direction,
      iterator: function (context, bounds) {
        const leftIterator = left.iterator(context, bounds);
        const rightIterator = right.iterator(context, bounds);
        let leftResult = { done: false, value: undefined };
        let rightResult = { done: false, value: undefined };

        return {
          next: function (key) {
            return PromiseOrValue.map(
              leftResult.done
                ? rightIterator.next(key)
                : leftIterator.next(key),
              (result) => {
                if (result.done) {
                  leftResult = result;
                  return rightResult.done ? result : rightIterator.next(key);
                }
                const [currentKey, currentValue] = result.value;
                leftResult = result;
                return PromiseOrValue.map(
                  rightResult.done
                    ? result
                    : key === null
                    ? rightIterator.next()
                    : rightIterator.next(currentKey),
                  (nextResult) => {
                    if (nextResult.done) {
                      rightResult = nextResult;
                      return result;
                    }
                    const [nextKey, nextValue] = nextResult.value;
                    const comparison = compareKey(currentKey, nextKey);
                    rightResult = nextResult;
                    if (comparison < 0) {
                      return result;
                    } else if (comparison > 0) {
                      return { done: false, value: [nextKey, nextValue] };
                    } else {
                      return { done: false, value: [currentKey, currentValue] };
                    }
                  }
                );
              }
            );
          },
        };
      },
      keyLength: Math.max(left.keyLength, right.keyLength),
      subscribe: function (callback, bounds) {
        const leftUnsubscribe = left.subscribe((key, operation, context) => {
          return callback(key, operation, context);
        }, bounds);

        const rightUnsubscribe = right.subscribe((key, operation, context) => {
          return callback(key, operation, context);
        }, bounds);

        return function () {
          leftUnsubscribe();
          rightUnsubscribe();
        };
      },
    },
    reQLPrototype
  );
}

function fromTableAscending(table, keyFields) {
  return Object.setPrototypeOf(
    {
      direction: "asc",
      iterator: function (context, bounds) {
        return _iterate(table, context, "asc", bounds, keyFields);
      },
      keyLength: table.keyFields.length,
      subscribe: function (callback, bounds) {
        return table.subscribe(callback, bounds, keyFields);
      },
    },
    reQLPrototype
  );
}

function _iterate(table, context, direction, bounds, keyFields) {
  if (
    keyFields === null ||
    keyFields.length > table.keyFields.length ||
    keyFields.some((field) => table.keyFields.indexOf(field) === -1)
  ) {
    return table.entries(context, direction, bounds);
  }

  const keyIterator = table.keys(context, direction, bounds);

  return {
    next: function (key) {
      return PromiseOrValue.map(keyIterator.next(key), (result) => {
        if (result.done) {
          return { done: true };
        } else {
          return {
            done: false,
            value: [
              result.value,
              _extractValues(result.value, table.keyFields),
            ],
          };
        }
      });
    },
  };
}

const _extractedValuesCache = new WeakMap();

function _extractValues(key, keyFields) {
  const cachedValue = _extractedValuesCache.get(key);
  if (cachedValue !== null) {
    return cachedValue;
  }

  const extractedValue = keyFields.reduce((obj, field, index) => {
    obj[field] = key[index];
    return obj;
  }, {});

  _extractedValuesCache.set(key, extractedValue);
  return extractedValue;
}

function fromTableDescending(table, keyFields) {
  return Object.setPrototypeOf(
    {
      direction: "desc",
      iterator: function (context, bounds) {
        return _iterate(table, context, "desc", bounds, keyFields);
      },
      keyLength: table.keyFields.length,
      subscribe: function (callback, bounds) {
        return table.subscribe(callback, bounds, keyFields);
      },
    },
    reQLPrototype
  );
}

async function toArrayAsync(reql) {
  const result = [];
  const iterator = reql.iterator(new WeakMap());

  return Promise.resolve(
    PromiseOrValue.loop(async () => {
      return PromiseOrValue.map(await iterator.next(), (item) => {
        if (item.done) {
          return { action: "break", value: result };
        }
        result.push(item.value[1]);
        return { action: "continue", value: undefined };
      });
    })
  );
}

async function firstAsync(reql) {
  const iterator = reql.iterator(new WeakMap());
  const firstItem = await iterator.next();
  return firstItem.done ? null : firstItem.value[1];
}

async function firstExnAsync(reql) {
  const iterator = reql.iterator(new WeakMap());
  const firstItem = await iterator.next();
  if (firstItem.done) {
    throw unrecoverableViolation("expected result", "messenger_web_product");
  }
  return firstItem.value[1];
}

function prependKey(key, reql) {
  const keyCache = new WeakMap();

  function getUpperBound(bound) {
    return bound.gt !== null
      ? { gt: bound.gt.slice(1) }
      : { gte: bound.gte.slice(1) };
  }

  function getLowerBound(bound) {
    return bound.lt !== null
      ? { lt: bound.lt.slice(1) }
      : { lte: bound.lte.slice(1) };
  }

  function getBounds(bounds) {
    return bounds === null
      ? undefined
      : {
          ...(bounds.gte !== null || bounds.gt !== null
            ? getUpperBound(bounds)
            : {}),
          ...(bounds.lte !== null || bounds.lt !== null
            ? getLowerBound(bounds)
            : {}),
        };
  }

  return Object.setPrototypeOf(
    {
      direction: reql.direction,
      iterator: function (context, bounds) {
        const newBounds = {};
        if (bounds) {
          if (bounds.gt !== null) {
            const gt = bounds.gt;
            const cmp = compareValue(key, gt[0]);
            if (cmp === 0) {
              if (gt.length === 1) {
                return {
                  next: function () {
                    return { done: true };
                  },
                };
              } else {
                newBounds.gt = gt.slice(1);
              }
            } else if (cmp < 0) {
              return {
                next: function () {
                  return { done: true };
                },
              };
            }
          }
          if (bounds.gte !== null) {
            const gte = bounds.gte;
            const cmp = compareValue(key, gte[0]);
            if (cmp === 0) {
              newBounds.gte = gte.slice(1);
            } else if (cmp < 0) {
              return {
                next: function () {
                  return { done: true };
                },
              };
            }
          }
          if (bounds.lte !== null) {
            const lte = bounds.lte;
            const cmp = compareValue(key, lte[0]);
            if (cmp === 0) {
              if (lte.length !== 1) {
                newBounds.lte = lte.slice(1);
              }
            } else if (cmp > 0) {
              return {
                next: function () {
                  return { done: true };
                },
              };
            }
          }
          if (bounds.lt !== null) {
            const lt = bounds.lt;
            const cmp = compareValue(key, lt[0]);
            if (cmp === 0) {
              if (lt.length === 1) {
                return {
                  next: function () {
                    return { done: true };
                  },
                };
              } else {
                newBounds.lt = lt.slice(1);
              }
            } else if (cmp > 0) {
              return {
                next: function () {
                  return { done: true };
                },
              };
            }
          }
        }

        const iterator = reql.iterator(context, newBounds);
        return {
          next: function (value) {
            return PromiseOrValue.map(
              iterator.next(value === null ? undefined : value.slice(1)),
              (item) => {
                if (item.done) {
                  return { done: true };
                }
                let newKey = keyCache.get(item.value[0]);
                if (newKey === null) {
                  newKey = [key].concat(item.value[0]);
                  keyCache.set(item.value[0], newKey);
                }
                return { done: false, value: [newKey, item.value[1]] };
              }
            );
          },
        };
      },
      keyLength: reql.keyLength + 1,
      subscribe: function (callback, bounds) {
        return reql.subscribe((changedKey, operation, extra) => {
          let newKey = keyCache.get(changedKey);
          if (newKey === null) {
            newKey = [key].concat(changedKey);
            keyCache.set(changedKey, newKey);
          }
          return callback(newKey, operation, extra);
        }, getBounds(bounds));
      },
    },
    reQLPrototype
  );
}

function mergeJoin(a, b) {
  if (a.direction !== b.direction) {
    throw unrecoverableViolation("unrecoverableViolation")(
      "merge join requires iterables to be sorted in the same direction",
      "messenger_web_product"
    );
  }

  return Object.setPrototypeOf(
    {
      direction: a.direction,
      iterator: function (context, bounds) {
        const iteratorA = a.iterator(context, bounds);
        const iteratorB = b.iterator(context, bounds);

        function nextValue(result) {
          return PromiseOrValue.loop((value) => {
            const [itemA, itemB] = value;
            if (itemA.done || itemB.done) {
              return { action: "break", value: { done: true } };
            }

            const [keyA, valueA] = itemA.value;
            const [keyB, valueB] = itemB.value;
            const cmp = ReStoreKeyComparer.compareKey(keyA, keyB);

            if (cmp > 0) {
              return PromiseOrValue.map(
                PromiseOrValue.all2(itemA, iteratorB.next(keyA)),
                (result) => {
                  return { action: "continue", value: result };
                }
              );
            } else if (cmp < 0) {
              return PromiseOrValue.map(
                PromiseOrValue.all2(iteratorA.next(keyB), itemB),
                (result) => {
                  return { action: "continue", value: result };
                }
              );
            }

            return {
              action: "break",
              value: { done: false, value: [keyA, [valueA, valueB]] },
            };
          }, result);
        }

        return {
          next: function (value) {
            return PromiseOrValue.map(
              PromiseOrValue.all2(iteratorA.next(value), iteratorB.next(value)),
              nextValue
            );
          },
        };
      },
      keyLength: Math.max(a.keyLength, b.keyLength),
      subscribe: function (callback, bounds) {
        let active = true;

        function handleChange(reql, valueMapper, key, operation, context) {
          return PromiseOrValue.map(
            reql.iterator(context, { gte: key, lte: key }).next(),
            (item) => {
              if (item.done || !active) {
                return;
              }
              const value = item.value[1];
              const newOperation =
                operation.operation === "add"
                  ? {
                      operation: "add",
                      value: valueMapper(operation.value, value),
                    }
                  : operation.operation === "put"
                  ? {
                      operation: "put",
                      value: valueMapper(operation.value, value),
                    }
                  : operation;
              return callback(key, newOperation, context);
            }
          );
        }

        const unsubscribeA = a.subscribe((...args) => {
          return handleChange(b, (valueA, valueB) => [valueA, valueB], ...args);
        }, bounds);

        const unsubscribeB = b.subscribe((...args) => {
          return handleChange(a, (valueA, valueB) => [valueB, valueA], ...args);
        }, bounds);

        return () => {
          active = false;
          unsubscribeA();
          unsubscribeB();
        };
      },
    },
    reQLPrototype
  );
}

export const ReQL = {
  prototype: reQLPrototype,
  key,
  empty,
  leftJoin,
  union,
  mergeJoin,
  fromTableAscending,
  fromTableDescending,
  toArrayAsync,
  firstAsync,
  firstExnAsync,
  prependKey,
};
