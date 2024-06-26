/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { memo, useContext, useLayoutEffect } from "react";

import { HeroInteractionContext } from "./contexts/hero-interaction-context";
import { HeroInteractionIDContext } from "./contexts/hero-interaction-id-context";

function heroComponent(props) {
  const { description } = props;

  let e = useContext(HeroInteractionContext.Context);
  let f = useContext(HeroInteractionIDContext);
  useLayoutEffect(() => {
    f && e.logHeroRender(f, description, e.pageletStack);
  }, [description, e, f]);
  return null;
}

heroComponent.displayName = "HeroComponent";

export const HeroComponent = memo(heroComponent);
