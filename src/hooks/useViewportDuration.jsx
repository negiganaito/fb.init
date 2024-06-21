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
import {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import {
  BaseViewportMarginsContext,
  CometVisibilityUserActivityMonitor,
  getIntersectionMarginFromViewportMargin,
  getStyleProperty,
  HiddenSubtreePassiveContext,
  intersectionObserverEntryIsIntersecting,
  nullIntersectionObserverEntryLogger,
  Run,
  useDoubleEffectHack_DO_NOT_USE_THIS_IS_TRACKED,
  useIntersectionObserver,
} from "your-imports";

function isSizeZero(entry) {
  return (
    !!entry.boundingClientRect &&
    (entry.boundingClientRect.height === 0 ||
      entry.boundingClientRect.width === 0)
  );
}

function getHiddenReason(entry) {
  if (!entry?.target) {
    return null;
  }

  if (getStyleProperty(entry.target, "opacity") === "0") {
    return "TARGET_TRANSPARENT";
  }

  if (getStyleProperty(entry.target, "visibility") === "hidden") {
    return "TARGET_HIDDEN";
  }

  return null;
}

function useViewportDuration(props) {
  const {
    onHidden,
    onIntersection,
    onVisibilityDurationUpdated,
    onVisible,
    options = {},
    threshold,
  } = props;

  const {
    hiddenWhenZeroArea = false,
    hiddenWhenCSSStyleHidden = false,
    isEntryInViewport = intersectionObserverEntryIsIntersecting,
  } = options;

  const visibleRef = useRef(null);
  const inViewportRef = useRef(false);
  const unsubscribeActivityMonitorRef = useRef(null);
  const unsubscribeHiddenPassiveContextRef = useRef(null);
  const unsubscribeBeforeUnloadRef = useRef(null);
  const callbackRef = useRef(() => {});

  const hiddenSubtreePassiveContext = useContext(HiddenSubtreePassiveContext);
  const baseViewportMarginsContext = useContext(BaseViewportMarginsContext);

  const activityMonitor =
    options.activityMonitorOverride ?? CometVisibilityUserActivityMonitor;

  const hiddenReasonCallback = useCallback(
    (entry) => {
      if (activityMonitor && !activityMonitor.isUserActive()) {
        return "USER_INACTIVE";
      }

      const state = hiddenSubtreePassiveContext.getCurrentState();
      if (state.hidden) {
        return "PUSH_VIEW_HIDDEN";
      }

      if (state.backgrounded) {
        return "BACKGROUNDED";
      }

      if (inViewportRef.current === false) {
        return "NOT_IN_VIEWPORT";
      }

      if (hiddenWhenZeroArea && isSizeZero(entry)) {
        return "TARGET_SIZE_0";
      }

      if (hiddenWhenCSSStyleHidden) {
        const reason = getHiddenReason(entry);
        if (reason !== null) {
          return reason;
        }
      }

      return null;
    },
    [
      activityMonitor,
      hiddenSubtreePassiveContext,
      hiddenWhenZeroArea,
      hiddenWhenCSSStyleHidden,
    ]
  );

  const isEntryVisible = useCallback(
    (entry) => {
      return hiddenReasonCallback(entry) === null;
    },
    [hiddenReasonCallback]
  );

  const handleVisibilityChange = useCallback(
    (reason, entry, isVisible) => {
      const wasVisible = visibleRef.current !== null;

      if (!wasVisible && isVisible) {
        const now = Date.now();

        visibleRef.current = now;

        if (onVisible && entry) {
          onVisible({
            entry,
            visibleTime: now,
          });
        }
      } else if (wasVisible && !isVisible) {
        const visibleTime = visibleRef.current ?? 0;
        const now = Date.now();

        if (onHidden) {
          const hiddenReason =
            reason ?? hiddenReasonCallback(entry) ?? "UNKNOWN";

          onHidden({
            entry,
            hiddenReason,
            hiddenTime: now,
            visibleDuration: now - visibleTime,
            visibleTime,
          });
        }

        visibleRef.current = null;
      }
    },
    [hiddenReasonCallback, onHidden, onVisible, onVisibilityDurationUpdated]
  );

  useLayoutEffect(() => {
    callbackRef.current = handleVisibilityChange;
  }, [handleVisibilityChange]);

  useDoubleEffectHack_DO_NOT_USE_THIS_IS_TRACKED(() => {
    return () => {
      callbackRef.current("COMPONENT_UNMOUNTED", null, false);

      if (unsubscribeActivityMonitorRef.current) {
        unsubscribeActivityMonitorRef.current();
        unsubscribeActivityMonitorRef.current = null;
      }

      if (unsubscribeHiddenPassiveContextRef.current) {
        unsubscribeHiddenPassiveContextRef.remove();
        unsubscribeHiddenPassiveContextRef.current = null;
      }

      if (unsubscribeBeforeUnloadRef.current) {
        unsubscribeBeforeUnloadRef.remove();
        unsubscribeBeforeUnloadRef.current = null;
      }
    };
  }, []);

  const handleIntersection = useCallback(
    (entry) => {
      nullIntersectionObserverEntryLogger(
        entry,
        `IntersectionObserverEntry is null`
      );

      const inViewport = (inViewportRef.current = isEntryInViewport(entry));

      if (onIntersection) {
        onIntersection({
          entry,
          isElementVisible: isEntryVisible(entry),
        });
      }

      if (!unsubscribeActivityMonitorRef.current) {
        if (activityMonitor) {
          unsubscribeActivityMonitorRef.current = activityMonitor.subscribe(
            () => {
              callbackRef.current(
                "USER_INACTIVE",
                entry,
                isEntryVisible(entry)
              );
            }
          );
        }

        unsubscribeHiddenPassiveContextRef.current =
          hiddenSubtreePassiveContext.subscribeToChanges((state) => {
            callbackRef.current(
              state.hidden ? "PUSH_VIEW_HIDDEN" : "BACKGROUNDED",
              entry,
              isEntryVisible(entry)
            );
          });

        unsubscribeBeforeUnloadRef.current = Run.onBeforeUnload(() => {
          callbackRef.current("PAGE_UNLOAD", null, false);
        }, false);
      } else if (!inViewport) {
        if (unsubscribeActivityMonitorRef.current) {
          unsubscribeActivityMonitorRef.current();
          unsubscribeActivityMonitorRef.current = null;
        }
        if (unsubscribeHiddenPassiveContextRef.current) {
          unsubscribeHiddenPassiveContextRef.current.remove();
          unsubscribeHiddenPassiveContextRef.current = null;
        }
        if (unsubscribeBeforeUnloadRef.current) {
          unsubscribeBeforeUnloadRef.current.remove();
          unsubscribeBeforeUnloadRef.current = null;
        }
      }

      callbackRef.current(null, entry, isEntryVisible(entry));
    },
    [
      callbackRef,
      options.isEntryInViewport,
      isEntryVisible,
      activityMonitor,
      HiddenSubtreePassiveContext,
    ]
  );

  const expandedMargins = useMemo(() => {
    return {
      bottom: baseViewportMarginsContext.bottom + 1,
      left: baseViewportMarginsContext.left + 1,
      right: baseViewportMarginsContext.right + 1,
      top: baseViewportMarginsContext.top + 1,
    };
  }, [
    baseViewportMarginsContext.bottom,
    baseViewportMarginsContext.left,
    baseViewportMarginsContext.right,
    baseViewportMarginsContext.top,
  ]);

  const root = options.root ?? null;
  const rootMargin =
    options.rootMargin ??
    getIntersectionMarginFromViewportMargin(expandedMargins);

  return useIntersectionObserver(handleIntersection, {
    root,
    rootMargin,
    threshold: threshold,
  });
}

export default useViewportDuration;
