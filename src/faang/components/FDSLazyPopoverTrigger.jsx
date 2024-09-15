/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import BaseLazyPopoverTrigger from "./BaseLazyPopoverTrigger";
import FDSPopoverLoadingStateReact from "./FDSPopoverLoadingState";

const FDSLazyPopoverTrigger = (props) => {
  const { fallback, ...restProps } = props;
  const fallbackComponent = fallback ?? (
    <FDSPopoverLoadingStateReact withArrow={true} />
  );

  return <BaseLazyPopoverTrigger fallback={fallbackComponent} {...restProps} />;
};

FDSLazyPopoverTrigger.displayName = `${FDSLazyPopoverTrigger.name} [from ${module.id}]`;

export default FDSLazyPopoverTrigger;
