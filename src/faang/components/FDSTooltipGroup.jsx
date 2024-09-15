/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import { Container } from "./BaseTooltipGroup";
import CometTooltipImpl from "./CometTooltipImpl";

const FDSTooltipGroup = ({ children }) => {
  return <Container tooltipImpl={CometTooltipImpl}>{children}</Container>;
};

FDSTooltipGroup.displayName = `${FDSTooltipGroup.name} [from ${module.id}]`;

export default FDSTooltipGroup;
