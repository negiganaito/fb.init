/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import BaseMenuFocusGroup from "./BaseMenuFocusGroup";
import { handleFirstLetterNavigation } from "./CometFocusGroupFirstLetterNavigation";
import { FocusRegion } from "./FocusRegion.react";
import { tabbableScopeQuery } from "./focusScopeQueries";

const FDSMenuFocusRegion = ({ items, role }) => {
  return (
    <FocusRegion autoFocusQuery={role === "menu" ? tabbableScopeQuery : null}>
      <BaseMenuFocusGroup
        onNavigate={handleFirstLetterNavigation}
        orientation="vertical"
        preventScrollOnFocus={false}
        tabScopeQuery={tabbableScopeQuery}
        wrap={true}
      >
        {items}
      </BaseMenuFocusGroup>
    </FocusRegion>
  );
};

FDSMenuFocusRegion.displayName = `${FDSMenuFocusRegion.name} [from ${module.id}]`;

export default FDSMenuFocusRegion;
