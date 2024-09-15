/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext, useInsertionEffect, useMemo, useRef } from "react";

import CometRouterDispatcherContext from "../../context/CometRouterDispatcherContext";
import useStable from "../../hooks/useStable";

const CometRouterDispatcherContextFactory = ({
  actorID,
  children,
  from,
  parentDispatcher,
  tracePolicy,
  url,
}) => {
  const contextValue = useMemo(() => {
    const newContext = { actorID, from, tracePolicy, url };
    return parentDispatcher.withContext(newContext);
  }, [actorID, parentDispatcher, from, tracePolicy, url]);

  const contextRef = useRef(contextValue);

  useInsertionEffect(() => {
    contextRef.current = contextValue;
  }, [contextValue]);

  const value = useStable(() => ({
    componentHistoryState: {
      popState: (...args) =>
        contextRef.current.componentHistoryState?.popState(...args),
      pushState: (...args) =>
        contextRef.current.componentHistoryState?.pushState(...args),
    },
    go: (...args) => contextRef.current.go(...args),
    goBack: () => contextRef.current.goBack(),
    goTo: (...args) => contextRef.current.goTo(...args),
    popPushView: () => contextRef.current.popPushView(),
    prefetchRouteDefinition: (...args) =>
      contextRef.current.prefetchRouteDefinition(...args),
    prefetchRouteQueries: (...args) =>
      contextRef.current.prefetchRouteQueries(...args),
    preloadRouteCode: (...args) => contextRef.current.preloadRouteCode(...args),
    withContext: (...args) => contextRef.current.withContext(...args),
  }));

  return (
    <CometRouterDispatcherContext.Provider value={value}>
      {children}
    </CometRouterDispatcherContext.Provider>
  );
};

CometRouterDispatcherContextFactory.displayName = `${CometRouterDispatcherContextFactory.name} [from ${module.id}]`;

const CometRouterDispatcherContextWrapper = ({ children, ...props }) => {
  const parentDispatcher = useContext(CometRouterDispatcherContext);
  return parentDispatcher === null ? (
    children
  ) : (
    <CometRouterDispatcherContextFactory
      parentDispatcher={parentDispatcher}
      {...props}
    >
      {children}
    </CometRouterDispatcherContextFactory>
  );
};

CometRouterDispatcherContextWrapper.displayName = `${CometRouterDispatcherContextWrapper.name} [from ${module.id}]`;

export default CometRouterDispatcherContextWrapper;
