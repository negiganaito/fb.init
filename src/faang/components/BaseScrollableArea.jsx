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
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import UserAgent from "fbjs/lib/UserAgent";

import BaseScrollableAreaContext from "../../context/BaseScrollableAreaContext";
import { CometVisualCompletionAttributes } from "../../helpers/CometVisualCompletionAttributes";
import gkx from "../../helpers/gkx";
import Locale from "../../helpers/Locale";
import ResizeObserverPolyfill from "../../helpers/resize-observer-polyfill-deprecated";
import useVisibilityObserver from "../../hooks/useVisibilityObserver";

import CometDebounce from "./CometDebounce";

import styles from "./styles.module.scss";

const isRTL = Locale.isRTL();
const shouldUseIE11Polyfill = gkx("22681");

const BaseScrollableArea = forwardRef(
  // eslint-disable-next-line complexity
  (
    {
      children,
      contentRef,
      expanding = false,
      forceBrowserDefault = false,
      hideScrollbar = false,
      horizontal,
      id,
      onScroll,
      onScrollBottom,
      onScrollTop,
      role,
      scrollTracePolicy,
      style,
      tabIndex,
      testid,
      vertical,
      withBottomShadow = false,
      withTopShadow = false,
      xstyle,
      ...restProps
    },
    ref
  ) => {
    const shouldUseBrowserDefault = useMemo(
      () =>
        forceBrowserDefault ||
        !vertical ||
        hideScrollbar ||
        horizontal ||
        isBrowserObsolete(),
      [vertical, hideScrollbar, horizontal, forceBrowserDefault]
    );

    const [isHovering, setIsHovering] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const scrollableAreaContext = useContext(BaseScrollableAreaContext);
    const baseScrollerRef = useRef(null);
    const scrollerRef = useRef(null);
    const thumbRef = useRef(null);
    const trackRef = useRef(null);
    const scrollRatioRef = useRef(0);
    const scrollTimeoutRef = useRef(null);

    useEffect(() => {
      if (shouldUseBrowserDefault) return;

      const scrollerNode = scrollerRef.current;
      const baseScrollerNode = baseScrollerRef.current;
      const contentNode = contentRef?.current ?? baseScrollerNode;
      const trackNode = trackRef.current;
      const thumbNode = thumbRef.current;

      if (
        !baseScrollerNode ||
        !contentNode ||
        !scrollerNode ||
        !trackNode ||
        !thumbNode
      )
        return;

      let scrollTop = 0;
      let trackTop = 0;

      const refreshThumb = () => {
        trackNode.style.display = "none";
        thumbNode.style.display = "none";

        const scrollerRect = scrollerNode.getBoundingClientRect();
        const contentRect = contentNode.getBoundingClientRect();
        const scrollerScrollHeight = scrollerNode.scrollHeight;
        const baseScrollerScrollHeight = baseScrollerNode.scrollHeight;
        const contentScrollHeight = contentNode.scrollHeight;

        const scrollerOverflowHeight =
          baseScrollerScrollHeight - contentScrollHeight;
        const hasOverflow = scrollerOverflowHeight !== 0;
        const visibleHeight = Math.ceil(
          scrollerRect.height - scrollerOverflowHeight
        );

        trackTop = scrollerRect.top;
        scrollRatioRef.current = hasOverflow
          ? contentScrollHeight
          : scrollerScrollHeight;
        const scrollRatio = scrollRatioRef.current;

        const thumbHeight = Math.pow(visibleHeight, 2) / scrollRatio;
        thumbNode.style.height =
          scrollRatio <= visibleHeight ? "0px" : `${thumbHeight}px`;
        trackNode.style.height = `${scrollRatio}px`;

        if (isRTL) {
          thumbNode.style.left = "0px";
          trackNode.style.left = "0px";
        } else {
          thumbNode.style.right = "0px";
          trackNode.style.right = "0px";
        }

        const scrollerScrollTop = scrollerNode.scrollTop;
        const contentTop =
          contentRect.top - scrollerRect.top + scrollerScrollTop;
        let thumbTop = 0;

        if (hasOverflow) {
          thumbTop = contentTop * -1;
          trackNode.style.top = `${contentTop}px`;
          thumbNode.style.top = `${contentTop}px`;
        }

        const thumbScale =
          (visibleHeight - thumbHeight) / (scrollRatio - visibleHeight);
        thumbNode.style.transform = [
          `matrix3d(
              1,0,0,0,
              0,1,0,0,
              0,${thumbTop},1,0,
              0,0,0,-1
            )`,
          `scale(${1 / thumbScale})`,
          `translateZ(${1 - 1 / thumbScale}px)`,
          "translateZ(-2px)",
        ].join(" ");

        thumbNode.style.display = "block";
        trackNode.style.display =
          scrollRatio <= visibleHeight ? "none" : "block";
      };

      const onThumbMouseDown = (event) => {
        handleEvent(event);

        const clientY = event.clientY;
        const scrollerHeight = scrollerNode.clientHeight;
        scrollTop = scrollerNode.scrollTop;
        setIsDragging(true);

        const scrollRatio = scrollRatioRef.current / scrollerHeight;
        const thumbTop = scrollTop / scrollRatio;

        if (
          clientY < trackTop + thumbTop ||
          clientY > trackTop + thumbTop + scrollTop
        ) {
          const scrollDirection = clientY < trackTop + thumbTop ? -20 : 20;
          let isScrolling = true;
          const scrollInterval = window.setInterval(() => {
            if (isScrolling) {
              scrollerNode.scrollTo({
                top: scrollerNode.scrollTop + scrollDirection,
              });
            }
          }, 16);

          const onMouseUp = (event) => {
            handleEvent(event);
            if (scrollInterval) window.clearInterval(scrollInterval);
            window.removeEventListener("mouseup", onMouseUp, true);
            trackNode.removeEventListener("mouseenter", onMouseEnter);
            trackNode.removeEventListener("mouseleave", onMouseLeave);
          };

          const onMouseEnter = (event) => {
            handleEvent(event);
            isScrolling = true;
          };

          const onMouseLeave = (event) => {
            handleEvent(event);
            isScrolling = false;
          };

          window.addEventListener("mouseup", onMouseUp, true);
          trackNode.addEventListener("mouseenter", onMouseEnter);
          trackNode.addEventListener("mouseleave", onMouseLeave);
          return;
        }
        const onMouseMove = (event) => {
          handleEvent(event);
          const deltaY = event.clientY - clientY;
          scrollerNode.scrollTo({ top: scrollTop + deltaY * scrollRatio });
        };

        const onMouseUp = (event) => {
          handleEvent(event);
          setIsDragging(false);
          window.removeEventListener("mousemove", onMouseMove, true);
          window.removeEventListener("mouseup", onMouseUp, true);
        };

        window.addEventListener("mousemove", onMouseMove, true);
        window.addEventListener("mouseup", onMouseUp, true);
      };

      const debouncedRefreshThumb = CometDebounce(refreshThumb, { wait: 100 });
      window.addEventListener("resize", debouncedRefreshThumb);
      trackNode.addEventListener("mousedown", onThumbMouseDown);

      const resizeObserver = new ResizeObserverPolyfill(debouncedRefreshThumb);
      resizeObserver.observe(baseScrollerNode);
      resizeObserver.observe(scrollerNode);

      return () => {
        window.removeEventListener("resize", debouncedRefreshThumb);
        trackNode.removeEventListener("mousedown", onThumbMouseDown);
        resizeObserver.disconnect();
        debouncedRefreshThumb.reset();
      };
    }, [contentRef, scrollerRef, shouldUseBrowserDefault]);

    const onMouseEnter = () => {
      setIsHovering(true);
    };

    const onMouseLeave = () => {
      setIsHovering(false);
    };

    const handleScroll = (event) => {
      if (onScroll) onScroll(event);
      setIsScrolling(true);

      if (scrollTimeoutRef.current)
        window.clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    useEffect(() => {
      return () => {
        if (scrollTimeoutRef.current)
          window.clearTimeout(scrollTimeoutRef.current);
      };
    }, []);

    const value = useMemo(
      () => ({
        getDOMNode: () => scrollerRef.current,
      }),
      [scrollerRef]
    );

    useImperativeHandle(ref, () => value, [value]);

    const contextValue = useMemo(
      () => [...scrollableAreaContext, value],
      [value, scrollableAreaContext]
    );

    const topShadow = (
      <div
        className={`${styles.baseScroller} ${styles.baseScrollerWithTopShadow}`}
      >
        <div className={`${styles.shadow} ${styles.top}`} />
      </div>
    );

    const bottomShadow = (
      <div
        className={`${styles.baseScroller} ${styles.baseScrollerWithBottomShadow}`}
      >
        <div className={`${styles.shadow} ${styles.bottom}`} />
      </div>
    );

    role = role ?? (tabIndex === 0 ? "region" : undefined);

    return shouldUseBrowserDefault ? (
      <BaseScrollableAreaContext.Provider value={contextValue}>
        <div
          {...restProps}
          className={`${styles.default} ${
            expanding &&
            (shouldUseIE11Polyfill ? styles.expandingIE11 : styles.expanding)
          } ${hideScrollbar && styles.hideScrollbar} ${
            horizontal && styles.horizontalAuto
          } ${vertical && styles.verticalAuto} ${xstyle}`}
          data-testid={undefined}
          id={id}
          onScroll={handleScroll}
          ref={scrollerRef}
          role={role}
          style={style}
          tabIndex={tabIndex}
        >
          {withTopShadow && topShadow}
          <div
            className={`${styles.baseScroller} ${
              horizontal && !vertical && styles.baseScrollerHorizontal
            } ${withTopShadow && styles.baseScrollerWithTopShadow} ${
              withBottomShadow && styles.baseScrollerWithBottomShadow
            }`}
          >
            {onScrollTop ? (
              <ScrollTopSentinel
                onVisible={onScrollTop}
                scrollerRef={scrollerRef}
              />
            ) : null}
            {children}
            {onScrollBottom ? (
              <ScrollBottomSentinel
                onVisible={onScrollBottom}
                scrollerRef={scrollerRef}
              />
            ) : null}
          </div>
          {withBottomShadow && bottomShadow}
        </div>
      </BaseScrollableAreaContext.Provider>
    ) : (
      <BaseScrollableAreaContext.Provider value={contextValue}>
        <div
          {...restProps}
          className={`${styles.default} ${styles.hideScrollbar} ${
            expanding &&
            (shouldUseIE11Polyfill ? styles.expandingIE11 : styles.expanding)
          } ${styles.perspective} ${isRTL && styles.perspectiveRTL} ${
            horizontal && styles.horizontalAuto
          } ${vertical && styles.verticalAuto} ${xstyle}`}
          data-scrolltracepolicy={scrollTracePolicy}
          data-testid={undefined}
          id={id}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onScroll={handleScroll}
          ref={scrollerRef}
          role={role}
          style={style}
          tabIndex={tabIndex}
        >
          {withTopShadow && topShadow}
          <div
            className={`${styles.baseScroller} ${
              horizontal && !vertical && styles.baseScrollerHorizontal
            } ${withTopShadow && styles.baseScrollerWithTopShadow} ${
              withBottomShadow && styles.baseScrollerWithBottomShadow
            }`}
            ref={baseScrollerRef}
          >
            {onScrollTop ? (
              <ScrollTopSentinel
                onVisible={onScrollTop}
                scrollerRef={scrollerRef}
              />
            ) : null}
            {children}
            {onScrollBottom ? (
              <ScrollBottomSentinel
                onVisible={onScrollBottom}
                scrollerRef={scrollerRef}
              />
            ) : null}
          </div>
          {withBottomShadow && bottomShadow}
          <div
            {...CometVisualCompletionAttributes.IGNORE}
            className={styles.track}
            data-thumb={1}
            ref={trackRef}
          />
          <div
            {...CometVisualCompletionAttributes.IGNORE}
            className={`${styles.thumb} ${isRTL && styles.rtl} ${
              (isHovering || isScrolling || isDragging) && styles.hovered
            }`}
            data-thumb={1}
            ref={thumbRef}
          >
            <div className={styles.thumbInner} />
          </div>
        </div>
      </BaseScrollableAreaContext.Provider>
    );
  }
);
const handleEvent = (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
};
const visibilityObserverStyles = {
  main: {
    height: styles.visibilityObserverHeight,
    opacity: styles.visibilityObserverOpacity,
    pointerEvents: styles.visibilityObserverPointerEvents,
    position: styles.visibilityObserverPosition,
    width: styles.visibilityObserverWidth,
  },
  top: {
    top: styles.visibilityObserverTop,
  },
  bottom: {
    bottom: styles.visibilityObserverBottom,
  },
};
const ScrollSentinel = ({ xstyle, onVisible, scrollerRef }) => {
  const getScrollerNode = useMemo(
    () => () => scrollerRef.current,
    [scrollerRef]
  );
  const visibilityObserverRef = useVisibilityObserver({
    onVisible,
    options: { root: getScrollerNode, rootMargin: 0 },
  });
  return (
    <div
      className={`${visibilityObserverStyles.main} ${xstyle}`}
      ref={visibilityObserverRef}
    />
  );
};
const ScrollBottomSentinel = ({ onVisible, scrollerRef }) => (
  <ScrollSentinel
    onVisible={onVisible}
    scrollerRef={scrollerRef}
    xstyle={visibilityObserverStyles.bottom}
  />
);
const ScrollTopSentinel = ({ onVisible, scrollerRef }) => (
  <ScrollSentinel
    onVisible={onVisible}
    scrollerRef={scrollerRef}
    xstyle={visibilityObserverStyles.top}
  />
);
function isBrowserObsolete() {
  return (
    UserAgent.isPlatform("iOS") ||
    UserAgent.isPlatform("Android") ||
    UserAgent.isBrowser("Edge") ||
    UserAgent.isBrowser("IE") ||
    UserAgent.isBrowser("Firefox < 64")
  );
}
export default BaseScrollableArea;
