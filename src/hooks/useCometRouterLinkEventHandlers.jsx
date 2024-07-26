/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useMemo } from "react";
import gkx from "gkx";

import { bumpEntityKey } from "../helpers/ODS";

import useCometRouterLinkEventHandlersBase from "./useCometRouterLinkEventHandlersBase";

const asyncRegex = /async(?:-post)?|dialog(?:-post)?|theater|toggle/;

function useCometRouterLinkEventHandlers({
  dispatcherExtras,
  href,
  isRouterLink,
  onHoverEnd,
  onHoverMove,
  onHoverStart,
  onPress,
  onPressStart,
  prefetchQueriesOnHover,
  preloadCodeOnMount,
  preventLocalNavigation,
  rel,
  target,
}) {
  const t = prefetchQueriesOnHover === true ? "button_aggressive" : "button";

  const routeHandledByCometRouter = useMemo(() => {
    const isAsync =
      !gkx("20935") && rel !== null && rel.match(asyncRegex) !== null;
    return !isAsync;
  }, [rel]);

  const onQueryPreload = useCallback(() => {
    bumpEntityKey(
      2994,
      "comet_preloading",
      `prefetch_route_queries.${t}.preloaded`
    );
  }, [t]);

  const onQueryUsed = useCallback(() => {
    bumpEntityKey(2994, "comet_preloading", `prefetch_route_queries.${t}.used`);
  }, [t]);

  const shouldTriggerNavOnPress = useCallback((event) => {
    return !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }, []);

  const eventHandlers = useCometRouterLinkEventHandlersBase({
    dispatcherExtras,
    href,
    isRouterLink,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    onPress,
    onPressStart,
    onQueryPreload,
    onQueryUsed,
    prefetchQueriesOnHover,
    preloadCodeOnMount,
    preventLocalNavigation,
    routeHandledByCometRouter,
    shouldTriggerNavOnPress,
    target,
  });

  return {
    onHoverEnd: eventHandlers.onHoverEnd,
    onHoverMove: eventHandlers.onHoverMove,
    onHoverStart: eventHandlers.onHoverStart,
    onPress: eventHandlers.onPress,
    onPressStart: eventHandlers.onPressStart,
  };
}

export default useCometRouterLinkEventHandlers;
