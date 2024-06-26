/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

// BUG: here
import { HeroCurrentInteractionForLoggingContext } from "./contexts/hero-current-interaction-for-logging-context";
import { HeroInteractionContext } from "./contexts/hero-interaction-context";
import { HeroInteractionIDContext } from "./contexts/hero-interaction-id-context";
import { HeroComponent } from "./hero-component";
import { HeroHoldTrigger } from "./hero-hold-trigger";
import { HeroInteractionContextPassthrough } from "./hero-interaction-context-passthrough";
import { HeroPendingPlaceholderTracker } from "./hero-pending-placeholder-tracker";
import { HeroPlaceholder } from "./hero-placeholder";
import { HeroPlaceholderUtils } from "./hero-placeholder-utils";

export const HeroTracingPlaceholder = {
  HeroComponent,
  HeroCurrentInteractionForLoggingContext,
  HeroHoldTrigger,
  HeroInteractionContext: HeroInteractionContext,
  HeroInteractionContextPassthrough,
  HeroInteractionIDContext,
  HeroPendingPlaceholderTracker,
  HeroPlaceholder,
  HeroPlaceholderUtils,
};
