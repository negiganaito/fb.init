/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";

import MWXTextImpl from "./MWXTextImpl";

const MWXText = (props, ref) => {
  return <MWXTextImpl {...props} ref={ref} />;
};

MWXText.displayName = `MWXText [from ${__filename}]`;

export default forwardRef(MWXText);
