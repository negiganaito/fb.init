/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext, useLayoutEffect } from "react";

import { HeroInteractionContext } from "./contexts/hero-interaction-context";
import { HeroInteractionIDContext } from "./contexts/hero-interaction-id-context";

// eslint-disable-next-line react/prop-types
export function HeroFallbackTracker({ uuid }) {
  const heroInteractionContextValue = useContext(HeroInteractionContext);
  const heroInteractionIDContextValue = useContext(HeroInteractionIDContext);

  useLayoutEffect(() => {
    if (heroInteractionIDContextValue) {
      heroInteractionContextValue.registerPlaceholder(
        heroInteractionIDContextValue,
        uuid,
        heroInteractionContextValue.pageletStack
      );

      return () => {
        heroInteractionContextValue.removePlaceholder(
          heroInteractionIDContextValue,
          uuid
        );
      };
    }
  }, [heroInteractionContextValue, heroInteractionIDContextValue, uuid]);

  return null;
}

HeroFallbackTracker.displayName = "HeroFallbackTracker";
