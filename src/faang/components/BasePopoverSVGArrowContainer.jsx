/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useContext, useMemo } from "react";
import { stylex } from "@stylexjs/stylex";
import testID from "testID";

import BaseContextualLayerContextSizeContext from "../../context/BaseContextualLayerContextSizeContext";
import BaseContextualLayerOrientationContext from "../../context/BaseContextualLayerOrientationContext";
import BasePopoverReflowSheetContext from "../../context/BasePopoverReflowSheetContext";
import Locale from "../../helpers/Locale";

import BaseContextualLayerLayerAdjustmentContext from "../../context/BaseContextualLayerLayerAdjustmentContext";
import BasePopoverDownEdgeArrow from "./BasePopoverDownEdgeArrow.react";
import BasePopoverDownInsetArrow from "./BasePopoverDownInsetArrow.svg";
import BasePopoverRightEdgeArrow from "./BasePopoverRightEdgeArrow.svg";
import BasePopoverRightInsetArrow from "./BasePopoverRightInsetArrow.svg";

const INSET_MARGIN = 3;
const IS_RTL = Locale.isRTL();
const ARROW_WIDTH = 25;

const styles = {
  arrow: { filter: "xem7dle", position: "x10l6tqk",  },
  container: { position: "relative",  },
};

const positionStyles = {
  above: { marginBottom: "x1fqp7bg",  },
  below: { marginTop: "xcxhlts",  },
  end: {
    marginStart: "x13ibhcj",
    marginLeft: null,
    marginRight: null,
    ,
  },
  start: {
    marginEnd: "x1jqylkn",
    marginLeft: null,
    marginRight: null,
    ,
  },
};

const arrowPositionStyles = {
  above: { top: "x11k2h6o",  },
  below: { bottom: "xng853d",  },
  end: { end: "x1gozi89", left: null, right: null,  },
  start: { start: "x1ke83zm", left: null, right: null,  },
};

const horizontalAlignStyles = {
  end: { end: "xdlq8gc", left: null, right: null,  },
  middle: { start: "xu8u0ou", left: null, right: null,  },
  start: { start: "xncvr77", left: null, right: null,  },
  stretch: {  },
};

const verticalAlignStyles = {
  end: { bottom: "x1ey2m1c",  },
  middle: { top: "x18g6o9x",  },
  start: { top: "x13vifvy",  },
  stretch: {  },
};

const calculateOffset = (isHorizontal, align, contextSize) => {
  const adjustedSize = contextSize - INSET_MARGIN;
  if (!isHorizontal)
    return align === "end" || align === "middle"
      ? adjustedSize * -1
      : adjustedSize;
  return (IS_RTL && align === "start") || (!IS_RTL && align === "end")
    ? adjustedSize * -1
    : adjustedSize;
};

const calculateTransform = ({
  arrowAlignment,
  contextSize,
  layerAdjustment,
  popoverAlign,
  popoverPosition,
}) => {
  let offset =
    layerAdjustment !== 0 && popoverAlign !== "middle" ? -layerAdjustment : 0;
  const isHorizontal =
    popoverPosition === "below" || popoverPosition === "above";

  if (arrowAlignment !== "edge" && contextSize !== null) {
    const size = isHorizontal ? contextSize.width : contextSize.height;
    const halfSize = size > 0 ? size / 2 : 0;
    if (halfSize !== 0) {
      offset += calculateOffset(
        isHorizontal,
        popoverAlign,
        popoverAlign === "middle" ? ARROW_WIDTH / 2 : halfSize
      );
    }
  }

  return offset === 0
    ? {}
    : {
        transform: isHorizontal
          ? `translateX(${offset}px)`
          : `translateY(${offset}px)`,
      };
};

const getArrowComponent = (position, align) =>
  position === "above" || position === "below"
    ? align === "middle"
      ? BasePopoverDownInsetArrow
      : BasePopoverDownEdgeArrow
    : align === "middle"
    ? BasePopoverRightInsetArrow
    : BasePopoverRightEdgeArrow;

const BasePopoverSVGArrowContainer = forwardRef(
  ({ arrowAlignment = "center", children, testid, xstyle, ...rest }, ref) => {
    const { align, position } = useContext(
      BaseContextualLayerOrientationContext
    );
    const contextSize = useContext(BaseContextualLayerContextSizeContext);
    const ArrowComponent = getArrowComponent(position, align);
    const layerAdjustment =
      useContext(BaseContextualLayerLayerAdjustmentContext) ?? 0;

    const { arrowStyle, containerStyle } = useMemo(() => {
      const start = IS_RTL ? "start" : "end";
      const end = IS_RTL ? "end" : "start";
      const isReversed =
        (align === "end" && !IS_RTL) || (align === "start" && IS_RTL);
      const adjustment = align === "middle" ? -layerAdjustment : 0;
      let scaleX = 1;
      let scaleY = 1;
      let translateX = 0;
      let translateY = 0;

      switch (position) {
        case "above":
          translateY += adjustment;
          if (isReversed) scaleX = -1;
          break;
        case "below":
          translateY += adjustment;
          scaleY = -1;
          if (isReversed) scaleX = -1;
          break;
        case end:
          translateX += adjustment;
          if (align === "start") scaleY = -1;
          break;
        case start:
          translateX += adjustment;
          scaleX = -1;
          if (align === "start") scaleY = -1;
          break;
      }

      return {
        arrowStyle: {
          transform: `scale(${scaleX}, ${scaleY}) translate(${translateX}px, ${translateY}px)`,
        },
        containerStyle: calculateTransform({
          arrowAlignment,
          contextSize,
          layerAdjustment,
          popoverAlign: align,
          popoverPosition: position,
        }),
      };
    }, [align, arrowAlignment, contextSize, layerAdjustment, position]);

    const { isReflowSheet } = useContext(BasePopoverReflowSheetContext);

    return (
      <div
        {...rest}
        className={stylex(styles.container, positionStyles[position], xstyle)}
        ref={ref}
        style={isReflowSheet ? null : containerStyle}
        {...testID(testid)}
      >
        {children}
        <ArrowComponent
          className={stylex(
            styles.arrow,
            arrowPositionStyles[position],
            (position === "start" || position === "end") &&
              verticalAlignStyles[align],
            (position === "above" || position === "below") &&
              horizontalAlignStyles[align]
          )}
          fill="var(--card-background)"
          style={arrowStyle}
        />
      </div>
    );
  }
);

BasePopoverSVGArrowContainer.displayName = `BasePopoverSVGArrowContainer [from ${__filename}]`;

export default BasePopoverSVGArrowContainer;
