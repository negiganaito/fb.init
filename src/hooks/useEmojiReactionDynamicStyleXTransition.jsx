/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable max-nested-callbacks */
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import nullthrows from "fbjs/lib/nullthrows";

import differenceSets from "../helpers/differenceSets";
import mapMapToArray from "../helpers/mapMapToArray";
import mapSet from "../helpers/mapSet";
import sortBy from "../helpers/sortBy";

import useForceUpdate from "./useForceUpdate";
import useIsMountedRef from "./useIsMountedRef";
import useStable from "./useStable";

const styles = {
  animationBase: {
    opacity: "xg01cxk",
    transitionDuration: "xbb3pvg",
    transitionProperty: "xeq7tfg",
    width: "xnalus7",
    $$css: !0,
  },
  animationEnter: {
    animationDuration: "xllfotl",
    animationName: "x127lhb5",
    opacity: "x1hc1fzr",
    $$css: !0,
  },
  animationEnterWidth1: { width: "x1ygkb0v", $$css: !0 },
  animationEnterWidth2: { width: "x1247r65", $$css: !0 },
  animationEnterWidth3: { width: "xdc2ju1", $$css: !0 },
  animationEnterWidth4: { width: "xgbm1jk", $$css: !0 },
  animationEnterWidth5: { width: "x1rdo73f", $$css: !0 },
  animationEnterWidth6: { width: "x13oubkp", $$css: !0 },
  animationLeave: {
    animationDuration: "x773k2o",
    animationName: "xvma63k",
    opacity: "xg01cxk",
    width: "xnalus7",
    $$css: !0,
  },
};

const getEnterWidthStyle = (count) => {
  const widthStyles = [
    styles.animationEnterWidth1,
    styles.animationEnterWidth2,
    styles.animationEnterWidth3,
    styles.animationEnterWidth4,
    styles.animationEnterWidth5,
    styles.animationEnterWidth6,
  ];
  return count > 0 && count <= 6 ? widthStyles[count - 1] : null;
};

const useTimeoutManager = () => {
  const timeoutsRef = useRef(new Map());

  useEffect(() => {
    return () =>
      Array.from(timeoutsRef.current.values()).forEach(window.clearTimeout);
  }, []);

  return timeoutsRef.current;
};

const useForceUpdateWrapper = () => {
  const forceUpdate = useForceUpdate();
  const isMountedRef = useIsMountedRef();

  return useStable(() => () => {
    if (isMountedRef.current) forceUpdate();
  });
};

const useEmojiReactionDynamicStyleXTransition = (
  items,
  getKey,
  config,
  disabled
  // eslint-disable-next-line max-params
) => {
  const forceUpdate = useForceUpdateWrapper();
  const timeouts = useTimeoutManager();
  const itemsRef = useStable(() => new Map());
  const isFirstRenderRef = useRef(true);

  const {
    duration = 100,
    durationIn,
    durationOut,
    onEnter,
    onEnterComplete,
    onLeave,
    onLeaveComplete,
  } = config;

  const createItem = useCallback(
    (key, item, order) => ({
      item,
      key,
      order,
      style: { transitionDuration: `${durationIn ?? duration}ms` },
      xstyle: [
        styles.animationBase,
        isFirstRenderRef.current && styles.animationEnter,
        isFirstRenderRef.current &&
          getEnterWidthStyle(item?.reactionCountCharactersNum ?? 0),
      ],
    }),
    [durationIn, duration]
  );

  const newItemsMap = new Map(
    items.map((item, index) => [getKey(item), { item, order: index }])
  );
  const enteringKeys = differenceSets(
    new Set(newItemsMap.keys()),
    new Set(itemsRef.keys())
  );
  const leavingKeys = differenceSets(
    new Set(itemsRef.keys()),
    new Set(newItemsMap.keys())
  );

  const orderShifts = new Map();
  const availableOrders = Array.from(
    mapSet(leavingKeys, (key) => nullthrows(itemsRef.get(key)).order)
  ).sort((a, b) => a - b);

  availableOrders.forEach((order, index) => {
    let currentOrder = order - index;
    while (currentOrder < items.length) {
      orderShifts.set(currentOrder, (orderShifts.get(currentOrder) ?? 0) + 1);
      currentOrder++;
    }
  });

  const transitionItems = sortBy(
    [
      ...mapMapToArray(itemsRef, ({ key, ...item }) => {
        const newItem = newItemsMap.get(key);
        if (newItem) {
          return {
            ...item,
            item: newItem.item,
            order: newItem.order + (orderShifts.get(newItem.order) ?? 0),
          };
        }
        return item;
      }),
      ...Array.from(
        mapSet(enteringKeys, (key) => {
          const { item, order } = nullthrows(newItemsMap.get(key));
          return createItem(key, item, order);
        })
      ),
    ],
    (item) => item.order
  );

  useLayoutEffect(() => {
    if (disabled) return;

    items.forEach((item, index) => {
      const key = getKey(item);
      const newItem = itemsRef.get(key) ?? createItem(key, item, index);

      if (enteringKeys.has(key)) {
        requestAnimationFrame(() => {
          newItem.xstyle = [
            styles.animationBase,
            styles.animationEnter,
            getEnterWidthStyle(item?.reactionCountCharactersNum ?? 0),
          ];
          clearTimeout(timeouts.get(key));
          timeouts.set(
            key,
            setTimeout(() => onEnterComplete?.(item), durationIn ?? duration)
          );
          setImmediate(() => {
            newItem.xstyle = [
              styles.animationBase,
              styles.animationEnter,
              getEnterWidthStyle(item?.reactionCountCharactersNum ?? 0),
            ];
            onEnter?.(item);
            forceUpdate();
          });
        });
      }

      newItem.item = item;
      newItem.order = index + (orderShifts.get(index) ?? 0);
      itemsRef.set(key, newItem);
    });

    leavingKeys.forEach((key) => {
      const item = itemsRef.get(key);
      if (!item || item.status === "leaving") return;

      item.status = "leaving";
      item.style = { transitionDuration: `${durationOut ?? duration}ms` };

      requestAnimationFrame(() => {
        item.xstyle = [styles.animationBase, styles.animationLeave];
        clearTimeout(timeouts.get(key));
        timeouts.set(
          key,
          setTimeout(() => {
            itemsRef.delete(key);
            onLeaveComplete?.(item.item);
            forceUpdate();
          }, durationOut ?? duration)
        );
        setImmediate(() => {
          onLeave?.(item.item);
          forceUpdate();
        });
      });
    });

    isFirstRenderRef.current = false;
  });

  return transitionItems;
};

export default useEmojiReactionDynamicStyleXTransition;
