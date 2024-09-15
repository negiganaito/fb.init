/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { resolve as resolvePromise } from "Promise";

import FBLogger from "../../helpers/FBLogger";
import useReStore from "../../hooks/useReStore";

import ReQL from "./ReQL";
import { first, useFirst, useFirstExn } from "./ReQLSuspense";

const identity = (a) => a;

function useThread(threadKey, transform = identity) {
  const store = useReStore();
  return useFirst(
    () =>
      threadKey !== null
        ? ReQL.fromTableAscending(store.tables.threads)
            .getKeyRange(threadKey)
            .map((thread) => transform(thread))
        : ReQL.empty(),
    [store, threadKey],
    `${module.id}:29`
  );
}

function useThreadExn(threadKey, transform = identity) {
  const store = useReStore();
  return useFirstExn(
    () =>
      ReQL.fromTableAscending(store.tables.threads)
        .getKeyRange(threadKey)
        .map((thread) => {
          const transformed = transform(thread);
          return transformed !== null ? transformed : thread;
        }),
    [store, threadKey],
    `${module.id}:48`
  );
}

function getThreadExn(store, threadKey, transform = identity) {
  const thread = first(
    ReQL.fromTableAscending(store.tables.threads).getKeyRange(threadKey),
    `${module.id}:65`
  );
  if (!thread) {
    throw FBLogger.FBLogger("messenger_web").mustfixThrow(
      "thread is null/undefined"
    );
  }
  return transform(thread);
}

function getThreadAsync(store, threadKey, transform = identity) {
  if (threadKey !== null) {
    return ReQL.firstAsync(
      ReQL.fromTableAscending(store.tables.threads).getKeyRange(threadKey)
    ).then((thread) => (thread ? transform(thread) : undefined));
  } else {
    return resolvePromise(undefined);
  }
}

export { getThreadAsync, getThreadExn, useThread, useThreadExn };
