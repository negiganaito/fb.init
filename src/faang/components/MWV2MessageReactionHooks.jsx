/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { gt, zero } from "../../helpers/I64";
import useReStore from "../../hooks/useReStore";

import { parse as parseEmoji } from "./EmojiRenderer";
import { useActor } from "./MWPActor.react";
import ReQL from "./ReQL";
import { useArray, useFirst } from "./ReQLSuspense";

function parseReactions(reactions) {
  return reactions
    .map((reaction) => {
      const parsed = parseEmoji(reaction).map((emojiData) => emojiData.emoji);
      return parsed.length !== 1 ? "" : parsed[0].join("");
    })
    .filter((emoji) => emoji !== "");
}

function useSelectedReaction({ threadKey, messageId }) {
  const store = useReStore();
  const actor = useActor();
  const result = useFirst(
    () =>
      ReQL.fromTableAscending(store.tables.reactions).getKeyRange(
        threadKey,
        messageId,
        actor
      ),
    [actor, store, messageId, threadKey],
    `${module.id}:33`
  );

  return result?.reaction;
}

function useSelectedReactionsV2({ threadKey, messageId }) {
  const store = useReStore();
  const result = useArray(
    () =>
      ReQL.fromTableAscending(store.tables.reactions_v2)
        .getKeyRange(threadKey, messageId)
        .filter(
          (reaction) => reaction.viewerIsReactor && gt(reaction.count, zero)
        )
        .map((reaction) => {
          const reactionData = ReQL.first(
            ReQL.fromTableAscending(store.tables.reaction_v2_types).getKeyRange(
              reaction.reactionFbid
            ),
            `${module.id}:59`
          );
          return [
            reactionData?.reactionLiteral,
            reactionData?.reactionLiteralVariant16,
          ].filter(Boolean);
        }),
    [store, threadKey, messageId],
    `${module.id}:50`
  ).flat();

  return parseReactions(result);
}

function useSelectedReactionV2({ threadKey, messageId }) {
  const store = useReStore();
  const reactionV2 = useFirst(
    () =>
      ReQL.fromTableAscending(store.tables.reactions_v2)
        .getKeyRange(threadKey, messageId)
        .filter((reaction) => reaction.viewerIsReactor),
    [store, messageId, threadKey],
    `${module.id}:79`
  );

  return useFirst(
    () =>
      reactionV2
        ? ReQL.fromTableAscending(store.tables.reaction_v2_types)
            .getKeyRange(reactionV2.reactionFbid)
            .map((data) => data.reactionLiteral)
        : ReQL.empty(),
    [store, reactionV2],
    `${module.id}:87`
  );
}

const MWV2MessageReactionHooks = {
  useSelectedReaction,
  useSelectedReactionsV2,
  useSelectedReactionV2,
};

export { MWV2MessageReactionHooks };
