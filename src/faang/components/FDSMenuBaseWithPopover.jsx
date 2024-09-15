/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { Children, forwardRef, memo, useContext } from "react";
import BaseContextualLayerAvailableHeightContext from "BaseContextualLayerAvailableHeightContext";
import BaseMultiPageView from "BaseMultiPageView.react";
import FDSMenuBase from "FDSMenuBase.react";

import BasePopoverReflowSheetContext from "../../context/BasePopoverReflowSheetContext";

import FDSPopover from "./FDSPopover";
import FDSPopoverLoadingStateContent from "./FDSPopoverLoadingStateContent";

const FDSMenuBaseWithPopover = forwardRef((props, ref) => {
  const {
    children,
    fallback,
    id,
    role = "menu",
    arrowAlignment,
    withArrow = false,
    // testid = "comet-menu",
    truncate = false,
    maxHeight,
    footer,
    header,
    onClose,
    size,
    ...rest
  } = props;

  const isReflowSheet = useContext(BasePopoverReflowSheetContext).isReflowSheet;
  let availableHeight = useContext(BaseContextualLayerAvailableHeightContext);
  if (withArrow && availableHeight !== null) {
    availableHeight -= 15;
  }
  const calculatedMaxHeight = Math.min(
    availableHeight !== null ? availableHeight : Infinity,
    maxHeight !== null ? maxHeight : Infinity
  );
  const finalMaxHeight = truncate
    ? calculatedMaxHeight === Infinity
      ? 0
      : calculatedMaxHeight
    : maxHeight;

  return Children.count(children) > 0 ? (
    <FDSPopover
      {...rest}
      arrowAlignment={arrowAlignment}
      id={id}
      ref={ref}
      role={role}
      testid={undefined}
      withArrow={isReflowSheet ? false : withArrow}
    >
      <BaseMultiPageView
        disableAutoFocus
        disableFocusContainment
        fallback={
          fallback !== null ? fallback : <FDSPopoverLoadingStateContent />
        }
      >
        <FDSMenuBase
          children={children}
          footer={footer}
          header={header}
          maxHeight={finalMaxHeight}
          onClose={onClose}
          role={role}
          size={isReflowSheet ? "full" : size}
        />
      </BaseMultiPageView>
    </FDSPopover>
  ) : null;
});

FDSMenuBaseWithPopover.displayName = `${FDSMenuBaseWithPopover.name}`;

export default memo(FDSMenuBaseWithPopover);
