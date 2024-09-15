/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useMemo } from "react";

// import tracePolicyFromResource from "tracePolicyFromResource";
// import useCometPopoverInteractionTracing from "useCometPopoverInteractionTracing";
import lazyLoadComponent from "../../helpers/lazyLoadComponent";

import BasePopoverTrigger from "./BasePopoverTrigger";

const BaseLazyPopoverTrigger = (props) => {
  const {
    fallback,
    popoverResource,
    preloadTrigger,
    // tracePolicy,
    ...restProps
  } = props;

  const PopoverComponent = useMemo(
    () => lazyLoadComponent(popoverResource),
    [popoverResource]
  );

  // const interactionTracker = useCometPopoverInteractionTracing(
  //   tracePolicy ?? tracePolicyFromResource("comet.popover", popoverResource),
  //   "lazy",
  //   preloadTrigger
  // );

  return (
    <BasePopoverTrigger
      fallback={fallback}
      // interactionTracker={interactionTracker}
      popover={PopoverComponent}
      popoverPreloadResource={popoverResource}
      preloadTrigger={preloadTrigger}
      {...restProps}
    />
  );
};

BaseLazyPopoverTrigger.displayName = `${BaseLazyPopoverTrigger.name} [from ${module.id}]`;

export default BaseLazyPopoverTrigger;
