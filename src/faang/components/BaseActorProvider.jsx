/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext, useMemo, useState } from "react";
import { RelayEnvironmentProvider } from "CometRelay";
import { CometRouterDispatcherContextFactory } from "CometRouterDispatcherContextFactory.react";
import { CometTransientDialogProvider } from "CometTransientDialogProvider.react";
import {
  recoverableViolation,
  unrecoverableViolation,
} from "recoverableViolation";
import { useRelayEnvironmentFactoryWithFallback } from "RelayEnvironmentFactoryProvider";

import usePrevious from "../../hooks/usePrevious";

const createUnrecoverableViolation = (action) => () => {
  throw unrecoverableViolation(
    `You are ${action} the Actor from a React component that is not a descendent of ActorProvider.`,
    "groups_comet"
  );
};

const ActorContext = createContext({
  get: createUnrecoverableViolation("reading"),
  set: createUnrecoverableViolation("setting"),
});

function BaseActorProvider({
  relayEnvironmentFactory,
  actorEnvironmentKey_DO_NOT_USE_UNLESS_YOU_KNOW_WHAT_YOU_ARE_DOING,
  children,
  initialActorID,
  readonly = false,
  scope,
}) {
  const [actorID, setActorID] = useState(initialActorID);
  const previousScope = usePrevious(scope);
  const previousInitialActorID = usePrevious(initialActorID);
  const environmentFactory = useRelayEnvironmentFactoryWithFallback(
    relayEnvironmentFactory
  );

  const environment = environmentFactory.getForActorID(
    actorID,
    actorEnvironmentKey_DO_NOT_USE_UNLESS_YOU_KNOW_WHAT_YOU_ARE_DOING
  );

  const hasScopeChanged = previousScope !== null && previousScope !== scope;
  const hasInitialActorIDChanged =
    previousInitialActorID !== null &&
    previousInitialActorID !== initialActorID;

  if (
    (hasInitialActorIDChanged || hasScopeChanged) &&
    actorID !== initialActorID
  ) {
    setActorID(initialActorID);
  }

  const value = useMemo(
    () => ({
      get: () => actorID,
      set: (newActorID) => {
        if (readonly) {
          recoverableViolation(
            "You tried to update the Actor ID, but the <ActorProvider /> closest to your useActor() call has a read-only Actor ID. To fix this, wrap the React tree that you want to set an Actor ID for with your own <ActorProvider />.",
            "groups_comet"
          );
          return;
        }
        setActorID(newActorID);
      },
    }),
    [actorID, readonly]
  );

  return (
    <ActorContext.Provider value={value}>
      <RelayEnvironmentProvider
        environment={environment}
        getEnvironmentForActor={environmentFactory.getForActor}
      >
        <CometRouterDispatcherContextFactory actorID={actorID}>
          <CometTransientDialogProvider>
            {children}
          </CometTransientDialogProvider>
        </CometRouterDispatcherContextFactory>
      </RelayEnvironmentProvider>
    </ActorContext.Provider>
  );
}

BaseActorProvider.displayName = `${BaseActorProvider.name}`;

export { ActorContext, BaseActorProvider };
