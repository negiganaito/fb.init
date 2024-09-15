/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";

import MWXButtonImpl from "./MWXButtonImpl";

const MWXButton = forwardRef((props, ref) => {
  return <MWXButtonImpl {...props} ref={ref} />;
});

MWXButton.displayName = `${MWXButton.name}`;

export default MWXButton;
