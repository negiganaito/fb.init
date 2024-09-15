/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { stylex } from "@stylexjs/stylex";

import FocusWithinHandler from "./FocusWithinHandler.react";

const styles = {
  inheritAll: {
    alignContent: "x4k7w5x",
    alignItems: "x1h91t0o",
    alignSelf: "x1h9r5lt",
    display: "x1jfb8zj",
    flexBasis: "xv2umb2",
    flexDirection: "x1beo9mf",
    flexGrow: "xaigb6o",
    flexShrink: "x12ejxvf",
    height: "x3igimt",
    justifyContent: "xarpa2k",
    maxHeight: "xedcshv",
    maxWidth: "x1lytzrv",
    minHeight: "x1t2pt76",
    minWidth: "x7ja8zs",
    width: "x1qrby5j",
    ,
  },
  wrapperInline: {
    display: 0,
    ,
  },
};

const BaseTooltipTargetWrapper = React.forwardRef(
  (
    { children, forceInlineDisplay, onHide, onShow, tooltipIdentifier },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const shouldShowTooltip = isFocused && isFocusVisible;
    const prevShouldShowTooltipRef = useRef(shouldShowTooltip);

    useEffect(() => {
      if (prevShouldShowTooltipRef.current !== shouldShowTooltip) {
        if (shouldShowTooltip) {
          onShow();
        } else {
          onHide();
        }
        prevShouldShowTooltipRef.current = shouldShowTooltip;
      }
    }, [onHide, onShow, shouldShowTooltip]);

    const handleKeyDown = useCallback(
      (event) => {
        if (event.key === "Escape" && tooltipIdentifier !== null) {
          onHide();
          event.stopPropagation();
        }
      },
      [onHide, tooltipIdentifier]
    );

    return (
      <span
        aria-describedby={tooltipIdentifier}
        className={stylex(
          styles.inheritAll,
          forceInlineDisplay === true && styles.wrapperInline
        )}
        data-testid={undefined}
        onKeyDown={handleKeyDown}
        onPointerEnter={onShow}
        onPointerLeave={onHide}
        onPointerUp={onHide}
        ref={ref}
      >
        <FocusWithinHandler
          onFocusChange={setIsFocused}
          onFocusVisibleChange={setIsFocusVisible}
        >
          {children}
        </FocusWithinHandler>
      </span>
    );
  }
);

BaseTooltipTargetWrapper.displayName = `BaseTooltipTargetWrapper [from ${__filename}]`;

export default BaseTooltipTargetWrapper;
