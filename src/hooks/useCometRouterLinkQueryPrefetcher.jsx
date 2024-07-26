/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { startTransition, useCallback, useRef } from "react";

import useCometRouterDispatcher from "../context/useCometRouterDispatcher";

function useCometRouterLinkQueryPrefetcher({
  dispatcherExtras,
  href,
  onQueryPreload,
  onQueryUsed,
  routeHandledByCometRouter,
}) {
  const dispatcher = useCometRouterDispatcher();
  const prefetchHandleRef = useRef(null);

  const cancelPrefetchRouteQueries = useCallback(() => {
    const handle = prefetchHandleRef.current;
    if (handle) {
      startTransition(() => {
        handle.cancel();
      });
      prefetchHandleRef.current = null;
    }
  }, []);

  const getPrefetchedQueryContainerAndMarkAsUsed = useCallback(() => {
    const handle = prefetchHandleRef.current;
    prefetchHandleRef.current = null;
    if (handle !== null) {
      onQueryUsed();
    }
    return handle;
  }, [onQueryUsed]);

  const prefetchRouteQueries = useCallback(() => {
    if (
      dispatcher &&
      href &&
      routeHandledByCometRouter &&
      prefetchHandleRef.current === null
    ) {
      prefetchHandleRef.current = dispatcher.prefetchRouteQueries(
        href,
        dispatcherExtras ?? {}
      );
      onQueryPreload();
    }
  }, [
    dispatcher,
    href,
    routeHandledByCometRouter,
    dispatcherExtras,
    onQueryPreload,
  ]);

  return {
    cancelPrefetchRouteQueries,
    getPrefetchedQueryContainerAndMarkAsUsed,
    prefetchRouteQueries,
  };
}

export default useCometRouterLinkQueryPrefetcher;
