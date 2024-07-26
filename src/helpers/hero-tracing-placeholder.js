/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

// import HeroCurrentInteractionForLoggingContext from "../../context/HeroCurrentInteractionForLoggingContext";
import * as HeroInteractionContextModule from "../../context/HeroInteractionContext";
import HeroInteractionIDContext from "../../context/HeroInteractionIDContext";
// import HeroComponent from "../../faang/components/HeroComponent.react";
// import HeroHoldTrigger from "../../faang/components/HeroHoldTrigger.react";
// import HeroInteractionContextPassthrough from "../../faang/components/HeroInteractionContextPassthrough.react";
// import * as HeroPendingPlaceholderTrackerModule from "../../faang/components/HeroPendingPlaceholderTracker";
// import HeroPlaceholder from "../../faang/components/HeroPlaceholder.react";

// import * as HeroPlaceholderUtilsModule from "./HeroPlaceholderUtils";

// const HeroPendingPlaceholderTracker = {
//   ...HeroPendingPlaceholderTrackerModule,
// };
const HeroInteractionContext = {
  ...HeroInteractionContextModule,
};
// const HeroPlaceholderUtils = {
//   ...HeroPlaceholderUtilsModule,
// };

export {
  // HeroComponent,
  // HeroCurrentInteractionForLoggingContext,
  // HeroHoldTrigger,
  HeroInteractionContext,
  // HeroInteractionContextPassthrough,
  HeroInteractionIDContext,
  // HeroPendingPlaceholderTracker,
  // HeroPlaceholder,
  // HeroPlaceholderUtils,
};
