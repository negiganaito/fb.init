/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useEffect, useMemo, useRef } from "react";

import useCometRouterDispatcher from "../context/useCometRouterDispatcher";
import JSScheduler from "../helpers/JSScheduler";

import useCometPreloader from "./useCometPreloader";
import useCometRouterLinkQueryPrefetcher from "./useCometRouterLinkQueryPrefetcher";

function useCometRouterLinkEventHandlersBase({
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
  routeHandledByCometRouter = true,
  shouldTriggerNavOnPress,
  target,
}) {
  const shouldHandleNavigation = useMemo(() => {
    const isDefaultTarget = target === null || target === "_self";
    return (
      isRouterLink &&
      preventLocalNavigation !== true &&
      isDefaultTarget &&
      routeHandledByCometRouter
    );
  }, [target, isRouterLink, preventLocalNavigation, routeHandledByCometRouter]);

  const preloaderType =
    prefetchQueriesOnHover === true ? "button_aggressive" : "button";
  const dispatcher = useCometRouterDispatcher();
  const previousHrefRef = useRef(null);

  const {
    cancelPrefetchRouteQueries,
    getPrefetchedQueryContainerAndMarkAsUsed,
    prefetchRouteQueries,
  } = useCometRouterLinkQueryPrefetcher({
    dispatcherExtras: {
      ...dispatcherExtras,
      onNavigate: dispatcherExtras?.onNavigate,
    },
    href,
    onQueryPreload,
    onQueryUsed,
    routeHandledByCometRouter: shouldHandleNavigation,
  });

  const handlePress = useCallback(
    (event) => {
      onPress && onPress(event);
      if (
        shouldTriggerNavOnPress(event) &&
        shouldHandleNavigation &&
        dispatcher &&
        href !== null
      ) {
        const prefetcher = getPrefetchedQueryContainerAndMarkAsUsed();
        dispatcher.go(href, {
          ...dispatcherExtras,
          eventTimestamp: event.timeStamp,
          prefetcher,
        });
      }
    },
    [
      onPress,
      shouldTriggerNavOnPress,
      shouldHandleNavigation,
      dispatcher,
      href,
      dispatcherExtras,
      getPrefetchedQueryContainerAndMarkAsUsed,
    ]
  );

  const handlePreloadCode = useCallback(() => {
    if (
      href !== null &&
      previousHrefRef.current !== href &&
      shouldHandleNavigation
    ) {
      JSScheduler.scheduleSpeculativeCallback(() => {
        if (dispatcher !== null && previousHrefRef.current !== href) {
          previousHrefRef.current = href;
          dispatcher.preloadRouteCode(href, dispatcherExtras?.target);
        }
      });
    }
  }, [dispatcher, href, dispatcherExtras, shouldHandleNavigation]);

  const { onHoverInPreloader, onHoverOutPreloader, onPressInPreloader } =
    useCometPreloader(
      preloaderType,
      handlePreloadCode,
      prefetchRouteQueries,
      cancelPrefetchRouteQueries
    );

  const handlePressStart = useCallback(
    (event) => {
      onPressStart && onPressStart(event);
      onPressInPreloader(event);
    },
    [onPressStart, onPressInPreloader]
  );

  const handleHoverStart = useCallback(
    (event) => {
      onHoverStart && onHoverStart(event);
      if (isRouterLink) {
        onHoverInPreloader(event);
      }
    },
    [onHoverStart, isRouterLink, onHoverInPreloader]
  );

  const handleHoverMove = useCallback(
    (event) => {
      onHoverMove && onHoverMove(event);
    },
    [onHoverMove]
  );

  const handleHoverEnd = useCallback(
    (event) => {
      onHoverEnd && onHoverEnd(event);
      onHoverOutPreloader();
    },
    [onHoverEnd, onHoverOutPreloader]
  );

  useEffect(() => {
    if (href !== null && shouldHandleNavigation) {
      if (preloadCodeOnMount === true) {
        handlePreloadCode();
      } else {
        JSScheduler.scheduleSpeculativeCallback(() => {
          dispatcher?.prefetchRouteDefinition(href);
        });
      }
    }
  }, [
    handlePreloadCode,
    dispatcher,
    shouldHandleNavigation,
    href,
    preloadCodeOnMount,
  ]);

  return {
    onHoverEnd: handleHoverEnd,
    onHoverMove: handleHoverMove,
    onHoverStart: handleHoverStart,
    onPress: handlePress,
    onPressStart: handlePressStart,
  };
}

export default useCometRouterLinkEventHandlersBase;
