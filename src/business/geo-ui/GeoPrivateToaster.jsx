/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import stylex from "@stylexjs/stylex";

import useStyleXTransitionSingle from "../../hooks/useStyleXTransitionSingle";
import GeoPrivateToastContext from "../contexts/GeoPrivateToastContext";
import useGeoTheme from "../hooks/useGeoTheme";

import { makeGeoComponent } from "./GeoPrivateMakeComponent";

const styles = {
  container: {
    position: "xixxii4",
    end: "xds687c",
    bottom: "x1ey2m1c",
    zIndex: "x1q2oy4v",
    $$css: true,
  },
  itemBase: {
    opacity: "x1hc1fzr",
    transform: "x1c071of",
    $$css: true,
  },
  itemEnterOrLeave: {
    opacity: "xg01cxk",
    transform: "x1t4o6fh",
    $$css: true,
  },
};

const enterLeaveDuration = 200;
const defaultToastDuration = 5000;

const ToastItem = ({ children, config }) => {
  const theme = useGeoTheme();
  const selectTransition = theme.selectTransition;
  const transition = selectTransition({
    duration: "fast",
    timing: "soft",
  });

  const [transitionState, setTransitionState] = useState("transition");
  const [isVisible, setIsVisible] = useState(!config.isVisible === false);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => setIsVisible(!config.isVisible), [config.isVisible]);

  useEffect(() => {
    if (isVisible && config.duration !== "sticky") {
      timeoutRef.current = window.setTimeout(
        () => setIsVisible(false),
        defaultToastDuration
      );
    } else {
      window.clearTimeout(timeoutRef.current);
    }
    return () => window.clearTimeout(timeoutRef.current);
  }, [isVisible, config]);

  const onLeaveComplete = useCallback(() => {
    containerRef.current?.(transitionState);
    config.onAfterHide?.();
  }, [containerRef, config, transitionState]);

  const onHideFactory = useCallback((nextState) => {
    setTransitionState(() => nextState);
    return () => {
      setIsVisible(false);
      setTransitionState(nextState);
    };
  }, []);

  const transitionStyles = useStyleXTransitionSingle(isVisible || null, {
    base: [transition, styles.itemEnterOrLeave],
    enter: styles.itemBase,
    leave: styles.itemEnterOrLeave,
    durationIn: enterLeaveDuration,
    durationOut: enterLeaveDuration,
    onLeaveComplete,
  });

  return transitionStyles ? (
    <div
      className={stylex(transitionStyles.xstyle)}
      style={transitionStyles.style}
    >
      <GeoPrivateToastContext.Provider value={{ onHideFactory }}>
        {children}
      </GeoPrivateToastContext.Provider>
    </div>
  ) : null;
};

ToastItem.displayName = `ToastItem [from ${ToastItem.name}]`;

const GeoPrivateToaster = ({ "data-testid": dataTestId, items }) => {
  const theme = useGeoTheme();
  const selectSpacing = theme.selectSpacing;
  const selectLayoutSpacing = theme.selectLayoutSpacing;

  const containerSpacing = selectSpacing({
    context: "container",
    bounds: "internal",
    relation: "component",
  });
  const verticalSpacing = selectLayoutSpacing({
    context: "container",
    direction: "vertical",
    relation: "related",
  });

  return items.length === 0 ? null : (
    <div
      className={stylex(styles.container, containerSpacing, verticalSpacing)}
      data-testid={dataTestId}
    >
      {items.map(({ toast, config }) => (
        <ToastItem key={config.key} config={config}>
          {toast}
        </ToastItem>
      ))}
    </div>
  );
};

GeoPrivateToaster.displayName = `GeoPrivateToaster [from ${GeoPrivateToaster.name}]`;

const GeoPrivateToasterComponent = makeGeoComponent(
  "GeoPrivateToaster",
  GeoPrivateToaster
);

export default GeoPrivateToasterComponent;
