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
export function HeroHoldTrigger({ description, hold }) {
  // var b = a.description,
  //   e = a.hold,
  const interactionValue = useContext(HeroInteractionContext.Context);
  const interactionIDValue = useContext(HeroInteractionIDContext);
  useLayoutEffect(() => {
    if (hold && interactionIDValue) {
      let a = interactionValue.hold(
        interactionIDValue,
        interactionValue.pageletStack,
        description
      );
      return function () {
        interactionValue.unhold(interactionIDValue, a);
      };
    }
  }, [description, interactionValue, interactionIDValue, hold]);
  return null;
}

HeroHoldTrigger.displayName = "HeroHoldTrigger";
