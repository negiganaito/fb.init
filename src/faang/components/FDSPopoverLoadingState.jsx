/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext } from "react";
import fbt from "fbt";

import BasePopoverReflowSheetContext from "../../context/BasePopoverReflowSheetContext";

import FDSPopover from "./FDSPopover";
import FDSPopoverLoadingStateContent from "./FDSPopoverLoadingStateContent";

const FDSPopoverLoadingStateReact = (props) => {
  const { withArrow, xstyle, ...restProps } = props;
  const context = useContext(BasePopoverReflowSheetContext);
  const isReflowSheet = context.isReflowSheet;

  return (
    <FDSPopover
      aria-label={fbt._("__JHASH__6lD-XyRyuHe__JHASH__")}
      withArrow={!isReflowSheet && withArrow}
      {...restProps}
    >
      <FDSPopoverLoadingStateContent xstyle={xstyle} />
    </FDSPopover>
  );
};

FDSPopoverLoadingStateReact.displayName = `${FDSPopoverLoadingStateReact.name} [from ${module.id}]`;

export default FDSPopoverLoadingStateReact;
