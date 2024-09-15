/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import FDSLazyPopoverTrigger from "./FDSLazyPopoverTrigger";

const MWXLazyPopoverTrigger = (props) => {
  if (FDSLazyPopoverTrigger !== null) {
    return <FDSLazyPopoverTrigger {...props} />;
  }
  return null;
};

MWXLazyPopoverTrigger.displayName = `${MWXLazyPopoverTrigger.name} [from ${module.id}]`;

export default MWXLazyPopoverTrigger;
