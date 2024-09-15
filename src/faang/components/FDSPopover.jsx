/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import FDSPopoverContainerPaddingContext from "../../context/FDSPopoverContainerPaddingContext";
import useCometDisplayTimingTrackerForInteraction from "../../hooks/useCometDisplayTimingTrackerForInteraction";

import BasePopover from "./BasePopover";
import BasePopoverSVGArrowContainer from "./BasePopoverSVGArrowContainer";
import FDSPopoverContainer from "./FDSPopoverContainer";

const styles = {
  card: {
    boxSizing: "x9f619",
    ,
  },
  cardBackground: {
    backgroundColor: "x1jx94hy",
    ,
  },
  cardShadow: {
    boxShadow: "x8ii3r7",
    ,
  },
  popoverWithArrow: {
    filter: "xe5xk9h",
    ,
  },
};

const FDSPopover = React.forwardRef((props, ref) => {
  const {
    animatedPopover = false,
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    children,
    popoverName,
    withArrow = false,
    ...restProps
  } = props;

  const displayTimingTracker =
    useCometDisplayTimingTrackerForInteraction(popoverName);

  return (
    <BasePopover
      {...restProps}
      aria-describedby={ariaDescribedby}
      aria-label={ariaLabel ?? undefined}
      aria-labelledby={ariaLabelledby}
      arrowImpl={withArrow ? BasePopoverSVGArrowContainer : undefined}
      ref={ref}
      xstyle={withArrow && styles.popoverWithArrow}
    >
      {animatedPopover && (
        <FDSPopoverContainerPaddingContext.Provider value={false}>
          <FDSPopoverContainer ref={displayTimingTracker} withArrow={withArrow}>
            {children}
          </FDSPopoverContainer>
        </FDSPopoverContainerPaddingContext.Provider>
      )}
    </BasePopover>
  );
});

FDSPopover.displayName = `${FDSPopover.name} [from ${__filename}]`;

export default FDSPopover;
