/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext, forwardRef, useContext, useMemo } from "react";

import mergeRefs from "../../helpers/mergeRefs";
import stylex from "../../helpers/stylex";

import getLoadingStateAriaProps from "./getLoadingStateAriaProps";
import useCometLoadingStateTracker from "./useCometLoadingStateTracker";

const BaseLoadingStateContext = createContext(false);

const styles = {
  hideOutline: {
    outline: "x1a2a7pz",
    ,
  },
};

const BaseLoadingStateElement = forwardRef((props, ref) => {
  const {
    children,
    disableLoadingStateTracker = false,
    isDecorative = false,
    isFocusTarget,
    progress,
    style,
    // testid,
    xstyle,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
  } = props;

  const contextValue = useContext(BaseLoadingStateContext);
  const [loadingStateProps, loadingStateRef] = useCometLoadingStateTracker();

  const combinedRef = useMemo(
    () => (disableLoadingStateTracker ? ref : mergeRefs(ref, loadingStateRef)),
    [disableLoadingStateTracker, ref, loadingStateRef]
  );

  if (contextValue) {
    return (
      <div
        className={stylex(xstyle)}
        data-testid={undefined}
        ref={ref}
        style={style}
      >
        {children}
      </div>
    );
  }

  const ariaProps = isDecorative
    ? { "aria-hidden": true }
    : getLoadingStateAriaProps(progress, { max: 100, min: 0 });

  return (
    <BaseLoadingStateContext.Provider value={true}>
      <div
        {...(!disableLoadingStateTracker
          ? { ...ariaProps, ...loadingStateProps }
          : ariaProps)}
        aria-label={ariaLabel ?? ariaProps["aria-label"]}
        aria-labelledby={ariaLabelledby}
        className={stylex(styles.hideOutline, xstyle)}
        data-focus-target={isFocusTarget}
        data-testid={undefined}
        ref={combinedRef}
        style={style}
        tabIndex={-1}
      >
        {children}
      </div>
    </BaseLoadingStateContext.Provider>
  );
});

BaseLoadingStateElement.displayName = `${BaseLoadingStateElement.name}`;

export default BaseLoadingStateElement;
