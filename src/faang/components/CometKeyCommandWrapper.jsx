/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import CometKeyCommandWidget from "./CometKeyCommandWidget";

const CometKeyCommandWrapper = ({ children, ...restProps }) => {
  const Wrapper = CometKeyCommandWidget.Wrapper;
  return <Wrapper {...restProps}>{children}</Wrapper>;
};

CometKeyCommandWrapper.displayName = `${CometKeyCommandWrapper.name} [from ${module.id}]`;

export default CometKeyCommandWrapper;
