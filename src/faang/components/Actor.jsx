/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useContext } from "react";
import { ActorContext, BaseActorProvider } from "BaseActorProvider";
import { CometRelayEnvironmentFactory } from "CometRelayEnvironmentFactory";

function ActorProvider(props) {
  return (
    <BaseActorProvider
      {...props}
      relayEnvironmentFactory={CometRelayEnvironmentFactory}
    >
      {props.children}
    </BaseActorProvider>
  );
}

ActorProvider.displayName = `${ActorProvider.name} [from ${f.id}]`;

function useActor() {
  const actorContext = useContext(ActorContext);
  return [actorContext.get(), actorContext.set];
}

export { ActorProvider, useActor };
