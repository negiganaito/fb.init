/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import { FocusRegion } from "./FocusRegion.react";
import { headerOrTabbableScopeQuery } from "./focusScopeQueries";

const XPlatReactFocusRegion = ({
  autoFocusQuery,
  autoRestoreFocus,
  children,
  recoverFocusQuery,
}) => {
  return (
    <FocusRegion
      autoFocusQuery={autoFocusQuery ?? headerOrTabbableScopeQuery}
      autoRestoreFocus={autoRestoreFocus}
      recoverFocusQuery={recoverFocusQuery}
    >
      {children}
    </FocusRegion>
  );
};

XPlatReactFocusRegion.displayName = `${XPlatReactFocusRegion.name}`;

export default XPlatReactFocusRegion;
