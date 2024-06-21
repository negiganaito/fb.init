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
  useCallback,
  useDeferredValue,
  useEffect,
  useInsertionEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import emptyFunction from "fbjs/lib/emptyFunction";
import forEachObject from "fbjs/lib/forEachObject";
import useDebouncedComet from "hooks";
import justknobx from "justknobx";

const DEBOUNCE_WAIT = 1000;

// eslint-disable-next-line max-params
function useCometCappedList(
  fullList,
  maxLength,
  getItemID,
  minOffscreenDurationBeforeUnmount = justknobx._("1013"),
  dontUnmountItemsNearOnScreenOnes = 5
) {
  const [cappedItemIDsSet, setCappedItemIDsSet] = useState(new Set());
  const cappedItemIDs = useDeferredValue(cappedItemIDsSet);
  const cappedListInfoRef = useRef({});
  const fullListRef = useRef(fullList);

  const debouncedUpdateCappedList = useDebouncedComet(
    useCallback(() => {
      cappedListInfoRef.current = updateCappedListInfo({
        cappedListInfo: cappedListInfoRef.current,
        dontUnmountItemsNearOnScreenOnes,
        fullList: fullListRef.current,
        getItemID,
        maxLength,
        minOffscreenDurationBeforeUnmount,
      });
      setCappedItemIDsSet(
        getCappedItemIDs(cappedItemIDs, cappedListInfoRef.current)
      );
    }, [
      cappedItemIDs,
      dontUnmountItemsNearOnScreenOnes,
      getItemID,
      maxLength,
      minOffscreenDurationBeforeUnmount,
    ]),
    { wait: DEBOUNCE_WAIT }
  );

  const updateCappedList = useCallback(() => {
    debouncedUpdateCappedList();
  }, [debouncedUpdateCappedList]);

  const manualVisibilityUpdatesRef = useRef([]);

  const [, forceUpdate] = useState({});

  const setItemVisibility = useCallback(
    (id, isOnScreen, isNew = true) => {
      if (isNew && getCappedItemInfo(cappedListInfoRef.current, id) === null) {
        manualVisibilityUpdatesRef.current.push({ id, isOnScreen });
        forceUpdate({});
        return;
      }
      cappedListInfoRef.current = updateCappedItemVisibility(
        cappedListInfoRef.current,
        id,
        isOnScreen
      );
      updateCappedList();
    },
    [updateCappedList]
  );

  const onItemOffScreen = useCallback(
    (id, isNew = true) => {
      setItemVisibility(id, false, isNew);
    },
    [setItemVisibility]
  );

  const onItemOnScreen = useCallback(
    (id, isNew = true) => {
      setItemVisibility(id, true, isNew);
    },
    [setItemVisibility]
  );

  const updateFullList = useCallback(() => {
    fullListRef.current = fullList;
    cappedListInfoRef.current = initializeCappedListInfo(
      getItemID,
      cappedListInfoRef.current,
      fullList
    );
  }, [fullList, getItemID]);

  useInsertionEffect(() => {
    updateFullList();
  }, [updateFullList]);

  useEffect(() => {
    const manualVisibilityUpdates = manualVisibilityUpdatesRef.current;
    if (forceUpdate && manualVisibilityUpdates.length) {
      console.log(
        `${
          ("Processing %s manual visibility updates although it shouldn't happen: %s",
          manualVisibilityUpdates.length,
          JSON.stringify(manualVisibilityUpdates))
        }`
      );

      updateFullList();
      const length = manualVisibilityUpdates.length;
      manualVisibilityUpdates.forEach(({ id, isOnScreen }) => {
        isOnScreen ? onItemOnScreen(id, false) : onItemOffScreen(id, false);
      });
      manualVisibilityUpdates.splice(0, length);
    }
  }, [forceUpdate, onItemOffScreen, onItemOnScreen, updateFullList]);

  const registerBlocker = useCallback((id, blocker) => {
    return addBlocker(cappedListInfoRef.current, id, blocker);
  }, []);

  return useMemo(() => {
    return maxLength > 0
      ? {
          cappedItemIDs,
          onItemOffScreen,
          onItemOnScreen,
          registerBlocker,
        }
      : null;
  }, [
    cappedItemIDs,
    maxLength,
    onItemOffScreen,
    onItemOnScreen,
    registerBlocker,
  ]);
}

function updateCappedListInfo({
  cappedListInfo,
  dontUnmountItemsNearOnScreenOnes,
  fullList,
  getItemID,
  maxLength,
  minOffscreenDurationBeforeUnmount,
}) {
  if (maxLength <= 0) return cappedListInfo;

  const missingItemIDs = new Set();

  const listWithInfo = fullList
    .map((item) => {
      const id = getItemID(item);
      const info = getCappedItemInfo(cappedListInfo, id);
      if (info === null) {
        missingItemIDs.add(id);
        return null;
      }
      return { id, info };
    })
    .filter(Boolean)
    .filter((item) => !item?.info.isCapped);

  if (missingItemIDs.size > 0) {
    console
      .log("comet_performance.memory", "useCometCappedList")
      .mustfix(
        "Unable to apply capping rules because we couldn't find info for items: %s",
        JSON.stringify(Array.from(missingItemIDs))
      );
    return cappedListInfo;
  }

  const now = Date.now();
  let itemsToRemove = listWithInfo.length - maxLength;
  const onScreenItemIndex = listWithInfo.findIndex(
    (item) => item?.info.isOnScreen ?? false
  );
  if (onScreenItemIndex < 0) return cappedListInfo;

  let newCappedListInfo = null;
  for (let i = 0; itemsToRemove > 0 && i < listWithInfo.length; i++) {
    const itemInfo = listWithInfo[i];
    if (!itemInfo) continue;

    const { id, info } = itemInfo;
    if (i + dontUnmountItemsNearOnScreenOnes >= onScreenItemIndex) break;
    if (
      info.lastTimeVisible !== null &&
      now - info.lastTimeVisible <= minOffscreenDurationBeforeUnmount
    )
      break;
    if (info.blockers && info.blockers.size > 0) break;
    if (info.isOnScreen === true) break;

    if (newCappedListInfo === null) {
      newCappedListInfo = { ...cappedListInfo };
    }
    if (!Object.prototype.hasOwnProperty.call(newCappedListInfo, id)) {
      console
        .log("comet_performance.memory", "newsfeed")
        .mustfix(
          "Unable to find capped item context data for id=%s, this should never happen",
          JSON.stringify(id)
        );
    } else {
      newCappedListInfo[id] = { ...info, isCapped: true };
    }
    itemsToRemove--;
  }

  return newCappedListInfo || cappedListInfo;
}

function initializeCappedListInfo(getItemID, cappedListInfo, fullList) {
  let newCappedListInfo = null;
  fullList.forEach((item) => {
    const id = getItemID(item);
    if (!Object.prototype.hasOwnProperty.call(cappedListInfo, id)) {
      if (newCappedListInfo === null) {
        newCappedListInfo = { ...cappedListInfo };
      }
      newCappedListInfo[id] = {
        blockers: null,
        isCapped: false,
        isOnScreen: null,
        lastTimeVisible: null,
      };
    }
  });
  return newCappedListInfo || cappedListInfo;
}

function getCappedItemIDs(cappedItemIDs, cappedListInfo) {
  let newCappedItemIDs = null;
  forEachObject(cappedListInfo, (info, id) => {
    if (info.isCapped && !cappedItemIDs.has(id)) {
      if (newCappedItemIDs === null) {
        newCappedItemIDs = new Set(cappedItemIDs);
      }
      newCappedItemIDs.add(id);
    }
  });
  return newCappedItemIDs || cappedItemIDs;
}

function getCappedItemInfo(cappedListInfo, id, shouldLogError = false) {
  const info = cappedListInfo[id];
  if (shouldLogError && info === null) {
    console
      .log("comet_performance.memory", "useCometCappedList")
      .mustfix("Unable to find capped item info [id=%s]", JSON.stringify(id));
  }
  return info;
}

function updateCappedItemVisibility(cappedListInfo, id, isOnScreen) {
  const info = getCappedItemInfo(cappedListInfo, id);
  if (info === null) {
    console
      .log("comet_performance.memory", "useCometCappedList")
      .warn(
        "Unable to set visibility [isOnScreen=%s] for item [id=%s]",
        isOnScreen,
        JSON.stringify(id)
      );
    return cappedListInfo;
  }
  const updatedInfo = {
    ...info,
    isOnScreen,
    lastTimeVisible: Date.now(),
  };
  return {
    ...cappedListInfo,
    [id]: updatedInfo,
  };
}

function addBlocker(cappedListInfo, id, blocker) {
  const info = getCappedItemInfo(cappedListInfo, id, true);
  if (info === null) return emptyFunction;

  if (info.blockers) {
    info.blockers.add(blocker);
  } else {
    info.blockers = new Set([blocker]);
  }

  return () => {
    const updatedInfo = getCappedItemInfo(cappedListInfo, id, true);
    if (updatedInfo && updatedInfo.blockers?.delete(blocker)) {
      if (updatedInfo.blockers?.size === 0) {
        updatedInfo.blockers = null;
      }
    } else {
      console
        .log("comet_performance.memory", "useCometCappedList")
        .mustfix(
          "Unable to delete capped-item blocker [id=%s][blocker=%s]",
          JSON.stringify(id),
          JSON.stringify(blocker)
        );
    }
  };
}

export default useCometCappedList;
