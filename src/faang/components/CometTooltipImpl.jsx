/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import CometPlaceholder from "./CometPlaceholder.react";
import deferredLoadComponent from "./deferredLoadComponent";
import requireDeferredForDisplay from "./requireDeferredForDisplay";

const DeferredTooltipImpl = deferredLoadComponent(
  requireDeferredForDisplay("CometTooltipDeferredImpl.react").__setRef(
    "CometTooltipImpl.react"
  )
);

const CometTooltipImpl = (props) => {
  return (
    <CometPlaceholder fallback={null}>
      <DeferredTooltipImpl {...props} />
    </CometPlaceholder>
  );
};

CometTooltipImpl.displayName = `CometTooltipImpl [from ${__filename}]`;

export default CometTooltipImpl;
