/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useLayoutEffect, useRef } from "react";
import DOMRectReadOnly from "DOMRectReadOnly";
import { gkx } from "gkx";
import uniqueID from "uniqueID";

import FBLogger from "../helpers/FBLogger";

let resizeObserver = null;
const observerMap = new Map();

const useResizeObserver = (callback) => {
  const unobserveRef = useRef(null);
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((element) => {
    const wrappedCallback = (contentRect, target, entry) => {
      callbackRef.current && callbackRef.current(contentRect, target, entry);
    };

    const observerInstance =
      element === null ? null : observe(element, wrappedCallback);
    unobserveRef.current && unobserveRef.current();
    unobserveRef.current = observerInstance;
  }, []);
};

const getResizeObserver = () => {
  if (resizeObserver === null) {
    resizeObserver = new ResizeObserver(resizeObserverCallback);
  }
  return resizeObserver;
};

const resizeObserverCallback = (entries) => {
  const contentRectMap = new Map();
  const domRectMap = new Map();
  const entryMap = new Map();

  for (const entry of entries) {
    let contentRect = entry.contentRect;
    if (gkx("20942")) {
      let cachedRect = contentRectMap.get(entry.target);
      if (cachedRect === null) {
        cachedRect = calculateContentRect(entry.target);
        contentRectMap.set(entry.target, cachedRect);
        contentRect = cachedRect;
      } else {
        contentRect = cachedRect;
      }
    }
    domRectMap.set(entry.target, contentRect);
    entryMap.set(entry.target, {
      target: entry.target,
      contentRect: entry.contentRect,
      borderBoxSize: entry.borderBoxSize,
      contentBoxSize: entry.contentBoxSize,
      devicePixelContentBoxSize: entry.devicePixelContentBoxSize,
    });
  }

  const observedElements = new Set(observerMap.keys());

  for (const [target, contentRect] of domRectMap) {
    const callbacks = observerMap.get(target);
    if (callbacks !== null) {
      for (const [, callback] of callbacks) {
        try {
          callback(contentRect, target, entryMap);
        } catch (error) {
          FBLogger("useResizeObserver").catching(error);
        }
      }
    } else if (!observedElements.has(target)) {
      FBLogger("useResizeObserver").mustfix(
        "ResizeObserver observed resizing of an element that it should not be observing"
      );
    }
  }
};

const observe = (element, callback) => {
  const id = uniqueID();
  const callbacks = observerMap.get(element) ?? new Map();
  callbacks.set(id, callback);
  observerMap.set(element, callbacks);
  getResizeObserver().observe(element);
  return createUnobserve(element, id);
};

const createUnobserve = (element, id) => {
  return () => {
    const callbacks = observerMap.get(element);
    if (callbacks === null) return;
    callbacks.delete(id);
    if (callbacks.size === 0) {
      getResizeObserver().unobserve(element);
      observerMap.delete(element);
    }
  };
};

const parseFloat = (value) => Number.parseFloat(value) || 0;

const getWindow = (element) => element?.ownerDocument?.defaultView ?? window;

const emptyRect = DOMRectReadOnly.fromRect();

const getPadding = (style) => ({
  top: parseFloat(style.paddingTop),
  right: parseFloat(style.paddingRight),
  bottom: parseFloat(style.paddingBottom),
  left: parseFloat(style.paddingLeft),
});

const getBorder = (style) => ({
  top: parseFloat(style.borderTopWidth),
  right: parseFloat(style.borderRightWidth),
  bottom: parseFloat(style.borderBottomWidth),
  left: parseFloat(style.borderLeftWidth),
});

const calculateBorderSum = (style, ...sides) => {
  const border = getBorder(style);
  return sides.reduce((sum, side) => sum + parseFloat(border[side]), 0);
};

const calculateContentRect = (target) => {
  const { clientWidth, clientHeight } = target;
  if (!clientWidth && !clientHeight) return emptyRect;

  const style = getWindow(target).getComputedStyle(target);
  const padding = getPadding(style);
  const paddingWidth = padding.left + padding.right;
  const paddingHeight = padding.top + padding.bottom;
  let width = parseFloat(style.width);
  let height = parseFloat(style.height);

  if (style.boxSizing === "border-box") {
    if (Math.round(width + paddingWidth) !== clientWidth) {
      width -= calculateBorderSum(style, "left", "right") + paddingWidth;
    }
    if (Math.round(height + paddingHeight) !== clientHeight) {
      height -= calculateBorderSum(style, "top", "bottom") + paddingHeight;
    }
  }

  return DOMRectReadOnly.fromRect({
    x: padding.left,
    y: padding.top,
    width,
    height,
  });
};

export default useResizeObserver;
