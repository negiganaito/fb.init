/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useContext, useMemo } from "react";

import BasePopoverReflowSheetContext from "../../context/BasePopoverReflowSheetContext";
import HiddenSubtreeContext from "../../context/HiddenSubtreeContext";

import BaseContextualLayerAnchorRoot from "./BaseContextualLayerAnchorRoot";
import BasePortal from "./BasePortal";

const BasePopoverReflowSheet = ({ children }) => {
  const { hidden } = useContext(HiddenSubtreeContext);
  const contextValue = useMemo(() => ({ isReflowSheet: true }), []);

  return (
    <BasePopoverReflowSheetContext.Provider value={contextValue}>
      <BasePortal hidden={hidden}>
        <BaseContextualLayerAnchorRoot>
          {children}
        </BaseContextualLayerAnchorRoot>
      </BasePortal>
    </BasePopoverReflowSheetContext.Provider>
  );
};

BasePopoverReflowSheet.displayName = `${BasePopoverReflowSheet.name} [from ${module.id}]`;

export default BasePopoverReflowSheet;
