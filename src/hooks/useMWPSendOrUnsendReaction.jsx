/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { asyncToGenerator as asyncToGeneratorRuntime } from "asyncToGeneratorRuntime";
import { LSFactory } from "LSFactory";
import LSOptimisticUpsertReactionStoredProcedure from "LSOptimisticUpsertReactionStoredProcedure";
import LSOptimisticUpsertReactionV2StoredProcedure from "LSOptimisticUpsertReactionV2StoredProcedure";
import { ADD, REMOVE, REMOVE_MULTI_REACT } from "MessageReactionOperation";
import { BASIC_SUPER_REACT_ANIMATION } from "MessageReactionStyle";
import { useActor } from "MWPActor.react";
import { promiseDone } from "promiseDone";
import { useIsReactionsV2Enabled } from "useIsReactionsV2Enabled";

import { ofNumber } from "../faang/components/LSIntEnum";
import ReQL from "../faang/components/ReQL";
import FBError from "../helpers/FBLogger";
import { equal, of_float, zero } from "../helpers/I64";

import { useCallbackInt64 } from "./Int64Hooks";
import { useIsMultiReactionEnabled } from "./useIsMultiReactionEnabled";
import useMWLSDefaultThreadSource from "./useMWLSDefaultThreadSource";
import useReStore from "./useReStore";

// eslint-disable-next-line max-params
function addReaction(a, b, e, g, h, j) {
  promiseDone(
    a.runInTransaction(
      () =>
        LSOptimisticUpsertReactionV2StoredProcedure(LSFactory(a), {
          actorId: b,
          currentCount: h,
          messageId: e.messageId,
          messageTimestamp: e.timestampMs,
          operation: ofNumber(ADD),
          reactionFbid: g,
          reactionLiteral: j,
          reactionStyle: ofNumber(BASIC_SUPER_REACT_ANIMATION),
          threadId: e.threadKey,
          viewerIsReactor: true,
        }),
      "readwrite"
    )
  );
}

// eslint-disable-next-line max-params
async function removeReaction(a, b, e, g, h, j, k) {
  await a.runInTransaction(
    () =>
      LSOptimisticUpsertReactionV2StoredProcedure(LSFactory(a), {
        actorId: b,
        currentCount: g,
        messageId: e.messageId,
        messageTimestamp: e.timestampMs,
        operation: ofNumber(k ? REMOVE_MULTI_REACT : REMOVE),
        reactionFbid: h,
        reactionLiteral: j,
        reactionStyle: ofNumber(BASIC_SUPER_REACT_ANIMATION),
        threadId: e.threadKey,
        viewerIsReactor: false,
      }),
    "readwrite"
  );
}

// eslint-disable-next-line max-params
function addOrUpdateReaction(a, b, e, f, g) {
  promiseDone(
    ReQL.firstAsync(
      ReQL.fromTableAscending(a.tables.reactions_v2).getKeyRange(
        e.threadKey,
        e.messageId,
        f
      )
    ).then((c) => {
      c !== null
        ? addReaction(a, b, e, f, c.count, g)
        : addReaction(a, b, e, f, zero, g);
    })
  );
}

function useMWPSendOrUnsendReaction(a) {
  const store = useReStore();
  const actor = useActor();
  const getDefaultThreadSource = useMWLSDefaultThreadSource();
  const isMultiReactEnabled = useIsMultiReactionEnabled(a.threadKey);

  return useCallbackInt64(
    async (h) => {
      promiseDone(
        asyncToGeneratorRuntime(async () => {
          let isReactionsV2Enabled = await ReQL.firstAsync(
            ReQL.fromTableAscending(store.tables.threads).getKeyRange(
              a.threadKey
            )
          );
          isReactionsV2Enabled = isReactionsV2Enabled
            ? useIsReactionsV2Enabled(isReactionsV2Enabled)
            : false;

          if (isReactionsV2Enabled) {
            let reactionType = await ReQL.firstAsync(
              ReQL.fromTableAscending(store.tables.reaction_v2_types).filter(
                (record) =>
                  record.reactionLiteral === h ||
                  record.reactionLiteralVariant16 === h
              )
            );

            if (reactionType !== null) {
              let existingReaction = await ReQL.firstAsync(
                ReQL.fromTableAscending(store.tables.reactions_v2)
                  .getKeyRange(a.threadKey, a.messageId)
                  .filter(
                    (record) =>
                      (!isMultiReactEnabled ||
                        equal(
                          record.reactionFbid,
                          reactionType.reactionFbid
                        )) &&
                      record.viewerIsReactor
                  )
              );

              if (existingReaction === null) {
                return addOrUpdateReaction(
                  store,
                  actor,
                  a,
                  reactionType.reactionFbid,
                  h
                );
              }

              const isSameReaction = equal(
                existingReaction.reactionFbid,
                reactionType.reactionFbid
              );
              if (!isMultiReactEnabled || isSameReaction) {
                await removeReaction(
                  store,
                  actor,
                  a,
                  existingReaction.count,
                  existingReaction.reactionFbid,
                  h,
                  isMultiReactEnabled
                );
              }

              if (!isSameReaction) {
                await addOrUpdateReaction(
                  store,
                  actor,
                  a,
                  reactionType.reactionFbid,
                  h
                );
              }
            } else {
              FBError.warn("messenger_web_product").warn(
                "Reactions v2: trying to send reaction that is not in reaction_v2_types table"
              );
            }

            return;
          }

          return store.runInTransaction(
            () =>
              LSOptimisticUpsertReactionStoredProcedure(LSFactory(store), {
                actorId: actor,
                messageId: a.messageId,
                reaction: h,
                sendAttribution: getDefaultThreadSource(a.threadKey),
                threadKey: a.threadKey,
                timestampMs: of_float(Date.now()),
              }),
            "readwrite"
          );
        })()
      );
    },
    [store, a, isMultiReactEnabled, actor, getDefaultThreadSource]
  );
}

export default useMWPSendOrUnsendReaction;
