/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";
import FDSMenuBaseWithPopover from "FDSMenuBaseWithPopover.react";

const FDSMenu = forwardRef((props, ref) => {
  return <FDSMenuBaseWithPopover {...props} ref={ref} />;
});

FDSMenu.displayName = `${FDSMenu.name} [from FDSMenu.react]`;

export default FDSMenu;
