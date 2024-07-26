/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import emptyFunction from "fbjs/lib/emptyFunction";

const defaultContextValue = {
  onSelectLink: emptyFunction,
  position: -1,
  shouldShowAsDisable: false,
};

const BizKitLeftNavSidebarItemContext =
  React.createContext(defaultContextValue);

export default BizKitLeftNavSidebarItemContext;
