/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import FDSPopover from "./FDSPopover";

const CometPopover_DEPRECATED = React.forwardRef((props, ref) => {
  const extendedProps = { ...props };
  return <FDSPopover {...extendedProps} ref={ref} />;
});

CometPopover_DEPRECATED.displayName = `${CometPopover_DEPRECATED.name} [from ${__filename}]`;

export default CometPopover_DEPRECATED;
