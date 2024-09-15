/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useMemo, useRef } from "react";

import { compare, gt, to_int32, zero } from "../helpers/I64";

function combineAndSortEmojis(emojiList, reactionList) {
  const emojiSet = {};
  emojiList.forEach((emoji) => {
    emojiSet[emoji] = true;
  });

  let combinedList = emojiList;
  reactionList.forEach((reaction) => {
    const joinedEmoji = reaction.emoji.join("");
    if (!emojiSet[joinedEmoji]) {
      combinedList.push(joinedEmoji);
    }
  });

  return combinedList;
}

function filterAndMapReactions(emojiList, reactionList) {
  const filteredReactions = (reactionList || []).filter((reaction) =>
    gt(reaction.count, zero)
  );
  return filteredReactions
    .map((reaction, index) => ({ emoji: emojiList[index], reaction }))
    .filter((item) => item.emoji !== null);
}

function useGetMultiReactOrderedItems(emojiList, reactionList) {
  const isFirstRender = useRef(true);
  const cachedOrderedItems = useRef([]);

  const mappedReactions = useMemo(
    () => filterAndMapReactions(emojiList, reactionList),
    [emojiList, reactionList]
  );

  const emojiToReactionMap = useMemo(() => {
    const map = {};
    mappedReactions.forEach((item) => {
      map[item.emoji.join("")] = item;
    });
    return map;
  }, [mappedReactions]);

  return useMemo(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      cachedOrderedItems.current = mappedReactions
        .sort((a, b) => compare(b.reaction.count, a.reaction.count))
        .map((item) => item.emoji.join(""));
    } else {
      const currentOrderedEmojis = cachedOrderedItems.current.filter(
        (emoji) => {
          const item = emojiToReactionMap[emoji];
          return item !== null ? to_int32(item.reaction.count) > 0 : false;
        }
      );
      cachedOrderedItems.current = combineAndSortEmojis(
        currentOrderedEmojis,
        mappedReactions
      );
    }

    return cachedOrderedItems.current
      .map((emoji) => emojiToReactionMap[emoji])
      .filter(Boolean);
  }, [emojiToReactionMap, mappedReactions]);
}

export default useGetMultiReactOrderedItems;
