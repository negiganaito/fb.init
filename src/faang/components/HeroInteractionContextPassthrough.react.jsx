/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import { HeroCurrentInteractionForLoggingContext } from "../../business/helpers/hero-tracing-placeholder";
import {
  Context as HeroInteractionContext,
  DEFAULT_CONTEXT_VALUE,
} from "../../context/HeroInteractionContext";
import HeroInteractionIDContext from "../../context/HeroInteractionIDContext";
import RelayProfilerContext from "../../context/RelayProfilerContext";

const currentInteraction = { current: null };
const relayProfilerContextValue = {
  consumeBootload: () => {},
  retainQuery: () => {},
  wrapPrepareQueryResource: (prepareQuery) => prepareQuery(),
};

const HeroInteractionContextPassthrough = ({ children, clear = true }) => {
  if (!clear) {
    return children;
  }

  return (
    <HeroInteractionContext.Provider value={DEFAULT_CONTEXT_VALUE}>
      <HeroCurrentInteractionForLoggingContext.Provider
        value={currentInteraction}
      >
        <HeroInteractionIDContext.Provider value={null}>
          <RelayProfilerContext.Provider value={relayProfilerContextValue}>
            {children}
          </RelayProfilerContext.Provider>
        </HeroInteractionIDContext.Provider>
      </HeroCurrentInteractionForLoggingContext.Provider>
    </HeroInteractionContext.Provider>
  );
};

HeroInteractionContextPassthrough.displayName =
  "HeroInteractionContextPassthrough";

export default HeroInteractionContextPassthrough;
