/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

const context = React.createContext();

function ReStoreProvider({ children, db }) {
  return <context.Provider value={db}>{children}</context.Provider>;
}

ReStoreProvider.displayName = `${ReStoreProvider.name} [from ${module.id}]`;

export { context, ReStoreProvider };
