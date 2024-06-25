__d(
  "GeoPrivateBaseContextualLayer.react",
  [
    "BaseContextualLayerAnchorRoot.react",
    "BaseContextualLayerAnchorRootContext",
    "BaseContextualLayerContextSizeContext",
    "BaseContextualLayerLayerAdjustmentContext",
    "BaseContextualLayerOrientationContext",
    "BaseScrollableAreaContext",
    "BaseViewportMarginsContext",
    "FocusRegion.react",
    "GeoPrivateBasePortal.react",
    "GeoPrivateMakeComponent",
    "HiddenSubtreeContext",
    "LegacyHidden",
    "Locale",
    "focusScopeQueries",
    "getComputedStyle",
    "getGeoPrivateBaseContextualLayerPositioningStyles_DEPRECATED",
    "isElementFixedOrSticky",
    "mergeRefs",
    "react",
    "stylex",
    "useResizeObserver",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i,
      j,
      k = j || (j = d("react"));
    e = j;
    var l = e.useCallback,
      m = e.useContext,
      n = e.useEffect,
      o = e.useImperativeHandle,
      p = e.useLayoutEffect,
      q = e.useMemo,
      r = e.useRef,
      s = e.useState;
    function t(a) {
      a = a.getBoundingClientRect();
      return { bottom: a.bottom, left: a.left, right: a.right, top: a.top };
    }
    function aa(a) {
      var b = (h || (h = c("getComputedStyle")))(a);
      return b != null && b.getPropertyValue("position") !== "static"
        ? a
        : (a instanceof HTMLElement && a.offsetParent) ||
            a.ownerDocument.documentElement;
    }
    var u = 8;
    function ba(a, b) {
      return a.bottom < b.top ||
        b.bottom < a.top ||
        a.right < b.left ||
        b.right < b.left
        ? null
        : {
            bottom: Math.min(a.bottom, b.bottom),
            left: Math.max(a.left, b.left),
            right: Math.min(a.right, b.right),
            top: Math.max(a.top, b.top),
          };
    }
    function v(a) {
      switch (a) {
        case "stretch-end":
        case "stretch-start":
          return "stretch";
        default:
          return a;
      }
    }
    function ca(a, b, c) {
      if (c === "above" || c === "below") {
        var d = a.bottom - b.bottom,
          e = b.top - a.top;
        if (e < d) return "below";
        else if (e > d) return "above";
        else return c;
      } else {
        e = w ? "start" : "end";
        d = w ? "end" : "start";
        var f = b.left - a.left;
        a = a.right - b.right;
        if (a < f) return d;
        else if (a > f) return e;
        else return c;
      }
    }
    var w = d("Locale").isRTL(),
      da = {
        root: {
          left: "xu96u03",
          marginRight: "xm80bdy",
          position: "x10l6tqk",
          top: "x13vifvy",
          $$css: !0,
        },
      };
    function b(b) {
      var e = b.align,
        f = e === void 0 ? "start" : e;
      e = b.autoFocus;
      var g = b.autoRestoreFocus,
        h = b.children,
        j = b.containerRef,
        x = b.containFocus;
      x = x === void 0 ? !1 : x;
      var y = b["data-testid"];
      y = y === void 0 ? "ContextualLayerRoot" : y;
      var z = b.disableAutoAlign,
        A = z === void 0 ? !1 : z;
      z = b.disableAutoFlip;
      var B = z === void 0 ? !1 : z;
      z = b.hidden;
      z = z === void 0 ? !1 : z;
      var C = b.imperativeRef,
        D = b.onIndeterminatePosition,
        E = b.position,
        F = E === void 0 ? "below" : E;
      E = b.xstyle;
      b = babelHelpers.objectWithoutPropertiesLoose(b, [
        "align",
        "autoFocus",
        "autoRestoreFocus",
        "children",
        "containerRef",
        "containFocus",
        "data-testid",
        "disableAutoAlign",
        "disableAutoFlip",
        "hidden",
        "imperativeRef",
        "onIndeterminatePosition",
        "position",
        "xstyle",
      ]);
      var G = r(!1), // isPositionInitialized
        H = s(function () {
          return F;
        }),
        I = H[0], //position
        J = H[1];
      H = s(null);
      var K = H[0], // height
        ea = H[1];
      H = s(null);
      var L = H[0], // width
        fa = H[1];
      H = s(null);
      var ga = H[0], //adjustment
        ha = H[1],
        M = m(c("BaseContextualLayerAnchorRootContext")),
        N = m(c("BaseScrollableAreaContext")),
        O = m(c("BaseViewportMarginsContext"));
      H = m(c("HiddenSubtreeContext"));
      H = H.hidden;
      var P = H || z;
      H = s(!1);
      var Q = H[0], // isIndeterminate
        R = H[1],
        S = r(null), //layerRef
        T = r(null), //sizeRef
        U = b.context !== void 0 ? b.context : void 0,
        V = b.contextRef !== void 0 ? b.contextRef : void 0,
        W = l(
          function () {
            var a = S.current,
              b = document.documentElement,
              c = U;
            c == null && U == null && V != null && (c = V.current);
            if (a == null || c == null || B || b == null) return;
            c = t(c);
            a = t(a);
            b = {
              bottom: b.clientHeight - O.bottom - u,
              left: O.left + u,
              right: b.clientWidth - O.right - u,
              top: O.top + u,
            };
            var d = a.bottom - a.top,
              e = a.right - a.left;
            T.current = { height: d, width: e };
            d = w ? "start" : "end";
            e = w ? "end" : "start";
            var f = I === "above" && a.top !== 0 && a.top < b.top,
              g = I === "below" && a.bottom !== 0 && a.bottom > b.bottom;
            e = I === e && a.left !== 0 && a.left < b.left;
            d = I === d && a.right !== 0 && a.right > b.right;
            (f || g || e || d) && J(ca(b, c, I));
          },
          [B, I, U, V, O.bottom, O.left, O.right, O.top]
        ),
        X = l(
          function () {
            var a = document.documentElement,
              b = M.current;
            if (a == null || b == null) return;
            var d = aa(b);
            if (d == null) return;
            var e = U;
            e == null && U == null && V != null && (e = V.current);
            if (e == null) return;
            b = c("isElementFixedOrSticky")(b);
            b = !b && c("isElementFixedOrSticky")(e);
            e = N.map(function (a) {
              return a.getDOMNode();
            })
              .filter(Boolean)
              .filter(function (a) {
                return d.contains(a);
              })
              .reduce(function (a, b) {
                return a != null ? ba(a, t(b)) : null;
              }, t(e));
            if (e == null || (e.left === 0 && e.right === 0)) {
              R(!0);
              D && D();
              return;
            }
            var g = b
                ? {
                    bottom: a.clientHeight,
                    left: 0,
                    right: a.clientWidth,
                    top: 0,
                  }
                : t(d),
              h = null,
              i = T.current;
            if (G.current && i != null && !A) {
              a = {
                bottom: a.clientHeight - O.bottom - u,
                left: O.left + u,
                right: a.clientWidth - O.right - u,
                top: O.top + u,
              };
              if (I === "start" || I === "end") {
                var j, k;
                if (f === "middle") {
                  var l = (e.bottom + e.top) / 2;
                  j = l - i.height / 2;
                  k = l + i.height / 2;
                } else
                  f === "start" || f === "stretch-start"
                    ? ((j = e.top), (k = e.top + i.height))
                    : (f === "end" || f === "stretch-end") &&
                      ((j = e.bottom - i.height), (k = e.bottom));
                if (j != null && k != null)
                  if (j < a.top) {
                    l = e.bottom - j;
                    var m = a.top - j;
                    h = Math.min(l, m);
                  } else if (k > a.bottom) {
                    l = e.top - k;
                    m = a.bottom - k;
                    h = Math.max(l, m);
                  }
              } else if (I === "above" || I === "below") {
                var n, o;
                l = w ? "start" : "end";
                m = w ? "end" : "start";
                if (f === "middle") {
                  var p = (e.right + e.left) / 2;
                  n = p - i.width / 2;
                  o = p + i.width / 2;
                } else
                  f === m || f === "stretch-" + m
                    ? ((n = e.left), (o = e.left + i.width))
                    : (f === l || f === "stretch-" + l) &&
                      ((n = e.right - i.width), (o = e.right));
                if (n != null && o != null)
                  if (n < a.left) {
                    p = e.right - n;
                    m = a.left - n;
                    h = Math.min(p, m);
                  } else if (o > a.right) {
                    l = e.left - o;
                    i = a.right - o;
                    h = Math.max(l, i);
                  }
              }
            }
            p = c(
              "getGeoPrivateBaseContextualLayerPositioningStyles_DEPRECATED"
            )({
              adjustment: h,
              align: v(f),
              contextRect: e,
              fixed: b,
              offsetRect: g,
              position: I,
            });
            m = S.current;
            if (m != null) {
              a = Object.keys(p);
              for (l = 0; l < a.length; l++) {
                i = a[l];
                b = p[i];
                b != null
                  ? m.style.setProperty(i, b)
                  : m.style.removeProperty(i);
              }
            }
            G.current = !0;
            R(!1);
            e != null && (ea(e.bottom - e.top), fa(e.right - e.left));
            ha(h);
          },
          [M, U, V, N, A, f, I, D, O.bottom, O.left, O.right, O.top]
        );
      o(
        C,
        function () {
          return {
            reposition: function (a) {
              a = a || {};
              a = a.autoflip;
              a = a === void 0 ? !1 : a;
              a && W();
              X();
            },
          };
        },
        [X, W]
      );
      var Y = c("useResizeObserver")(function (a) {
          var b = a.height;
          a = a.width;
          T.current = { height: b, width: a };
        }),
        Z = r(F);
      p(
        function () {
          F !== Z.current && (J(F), W(), X()), (Z.current = F);
        },
        [F, X, W]
      );
      var ia = l(
        function (a) {
          (S.current = a),
            a != null && !P
              ? (G.current || X(), W(), X())
              : a == null && (G.current = !1);
        },
        [P, X, W]
      );
      n(
        function () {
          if (P) return;
          var b = function () {
            W(), X();
          };
          a.addEventListener("resize", b);
          return function () {
            a.removeEventListener("resize", b);
          };
        },
        [P, X, W]
      );
      n(
        function () {
          if (P) return;
          var b = N.map(function (a) {
            return a.getDOMNode();
          }).filter(Boolean);
          a.addEventListener != null && b.push(a);
          if (b.length > 0) {
            b.forEach(function (a) {
              return a.addEventListener("scroll", X, { passive: !0 });
            });
            return function () {
              b.forEach(function (a) {
                return a.removeEventListener("scroll", X, { passive: !0 });
              });
            };
          }
          if (a.addEventListener == null) return;
          a.addEventListener("scroll", X, { passive: !0 });
          return function () {
            a.removeEventListener("scroll", X, { passive: !0 });
          };
        },
        [P, X, N]
      );
      H = q(
        function () {
          return c("mergeRefs")(ia, Y, j);
        },
        [ia, Y, j]
      );
      b = q(
        function () {
          return { align: v(f), position: I };
        },
        [f, I]
      );
      C = q(
        function () {
          return K != null && L != null ? { height: K, width: L } : null;
        },
        [K, L]
      );
      var $ = z || Q;
      return k.jsx(c("GeoPrivateBasePortal.react"), {
        target: M.current,
        children: k.jsx(c("LegacyHidden"), {
          htmlAttributes: {
            "data-testid": y,
            className: (i || (i = c("stylex")))(da.root, E),
          },
          mode: z || Q ? "hidden" : "visible",
          ref: H,
          children: k.jsx(d("FocusRegion.react").FocusRegion, {
            autoFocusQuery:
              !$ && ((y = e) != null ? y : x)
                ? d("focusScopeQueries").headerFirstTabbableSecondScopeQuery
                : null,
            autoRestoreFocus: (E = g) != null ? E : !$,
            containFocusQuery: $
              ? null
              : d("focusScopeQueries").tabbableScopeQuery,
            recoverFocusQuery: $
              ? null
              : d("focusScopeQueries").headerFirstTabbableSecondScopeQuery,
            children: k.jsx(c("BaseContextualLayerAnchorRoot.react"), {
              children: k.jsx(
                c("BaseContextualLayerContextSizeContext").Provider,
                {
                  value: C,
                  children: k.jsx(
                    c("BaseContextualLayerLayerAdjustmentContext").Provider,
                    {
                      value: ga,
                      children: k.jsx(
                        c("BaseContextualLayerOrientationContext").Provider,
                        { value: b, children: h }
                      ),
                    }
                  ),
                }
              ),
            }),
          }),
        }),
      });
    }
    b.displayName = b.name + " [from " + f.id + "]";
    e = d("GeoPrivateMakeComponent").makeGeoComponent("BaseContextualLayer", b);
    g["default"] = e;
  },
  98
);

import {
  BaseContextualLayerAnchorRoot,
  BaseContextualLayerAnchorRootContext,
  BaseContextualLayerContextSizeContext,
  BaseContextualLayerLayerAdjustmentContext,
  BaseContextualLayerOrientationContext,
  BaseScrollableAreaContext,
  BaseViewportMarginsContext,
  FocusRegion,
  GeoPrivateBasePortal,
  HiddenSubtreeContext,
  LegacyHidden,
  Locale,
  focusScopeQueries,
  getComputedStyle,
  getGeoPrivateBaseContextualLayerPositioningStyles_DEPRECATED,
  isElementFixedOrSticky,
  mergeRefs,
  react,
  stylex,
  useResizeObserver,
} from "path_to_dependencies";
import { makeGeoComponent } from "path_to_makeGeoComponent";
import React, {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const { isRTL } = Locale;

const defaultStyles = {
  root: {
    left: "xu96u03",
    marginRight: "xm80bdy",
    position: "x10l6tqk",
    top: "x13vifvy",
    $$css: true,
  },
};

type BoundingClientRect = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

function getBoundingClientRect(element: HTMLElement): BoundingClientRect {
  const rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    top: rect.top,
  };
}

function getPositionedParent(element: HTMLElement): HTMLElement | null {
  const style = getComputedStyle(element);
  if (style?.getPropertyValue("position") !== "static") {
    return element;
  }

  const offsetParent = element.offsetParent as HTMLElement | null;
  const documentElement = element.ownerDocument
    .documentElement as HTMLElement | null;

  return offsetParent || documentElement;
}

const OFFSET = 8;

function getIntersection(
  rect1: BoundingClientRect,
  rect2: BoundingClientRect
): BoundingClientRect | null {
  return rect1.bottom < rect2.top ||
    rect2.bottom < rect1.top ||
    rect1.right < rect2.left ||
    rect2.right < rect2.left
    ? null
    : {
        bottom: Math.min(rect1.bottom, rect2.bottom),
        left: Math.max(rect1.left, rect2.left),
        right: Math.min(rect1.right, rect2.right),
        top: Math.max(rect1.top, rect2.top),
      };
}

function alignPosition(position: string): string {
  switch (position) {
    case "stretch-end":
    case "stretch-start":
      return "stretch";
    default:
      return position;
  }
}

function adjustPosition(
  viewport: BoundingClientRect,
  context: BoundingClientRect,
  currentPosition: string
): string {
  if (currentPosition === "above" || currentPosition === "below") {
    const bottomDiff = viewport.bottom - context.bottom;
    const topDiff = context.top - viewport.top;
    return topDiff < bottomDiff ? "below" : "above";
  } else {
    const rtlStart = isRTL ? "start" : "end";
    const rtlEnd = isRTL ? "end" : "start";
    const leftDiff = context.left - viewport.left;
    const rightDiff = viewport.right - context.right;
    return rightDiff < leftDiff ? rtlStart : rtlEnd;
  }
}

interface Props {
  align?: string;
  autoFocus?: boolean;
  autoRestoreFocus?: boolean;
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLDivElement>;
  containFocus?: boolean;
  "data-testid"?: string;
  disableAutoAlign?: boolean;
  disableAutoFlip?: boolean;
  hidden?: boolean;
  imperativeRef?: React.Ref<any>;
  onIndeterminatePosition?: () => void;
  position?: string;
  xstyle?: CSSProperties;
  context?: HTMLElement;
  contextRef?: React.RefObject<HTMLElement>;
}

const BaseContextualLayer: React.FC<Props> = ({
  align = "start",
  autoFocus,
  autoRestoreFocus,
  children,
  containerRef,
  containFocus = false,
  "data-testid": dataTestId = "ContextualLayerRoot",
  disableAutoAlign = false,
  disableAutoFlip = false,
  hidden = false,
  imperativeRef,
  onIndeterminatePosition,
  position = "below",
  xstyle,
  context,
  contextRef,
  ...restProps
}) => {
  const isPositionInitialized = useRef(false);
  const [currentPosition, setCurrentPosition] = useState(position);
  const [height, setHeight] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [adjustment, setAdjustment] = useState<number | null>(null);
  const [isIndeterminate, setIsIndeterminate] = useState(false);

  const layerRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<{ height: number; width: number } | null>(null);

  const anchorRootContext = useContext(BaseContextualLayerAnchorRootContext);
  const scrollableAreaContext = useContext(BaseScrollableAreaContext);
  const viewportMarginsContext = useContext(BaseViewportMarginsContext);
  const hiddenSubtreeContext = useContext(HiddenSubtreeContext);
  const hiddenSubtreeHidden = hiddenSubtreeContext.hidden || hidden;

  const isRTL = useMemo(() => Locale.isRTL(), []);

  const recomputePosition = useCallback(() => {
    const layer = layerRef.current;
    const html = document.documentElement;
    let contextElement = context;
    if (!context && !contextElement && contextRef) {
      contextElement = contextRef.current;
    }
    if (!layer || !contextElement || disableAutoFlip || !html) return;

    const contextRect = getBoundingClientRect(contextElement);
    const layerRect = getBoundingClientRect(layer);
    const viewportRect = {
      bottom: html.clientHeight - viewportMarginsContext.bottom - OFFSET,
      left: viewportMarginsContext.left + OFFSET,
      right: html.clientWidth - viewportMarginsContext.right - OFFSET,
      top: viewportMarginsContext.top + OFFSET,
    };
    const layerHeight = layerRect.bottom - layerRect.top;
    const layerWidth = layerRect.right - layerRect.left;
    sizeRef.current = { height: layerHeight, width: layerWidth };

    const rtlStart = isRTL ? "start" : "end";
    const rtlEnd = isRTL ? "end" : "start";

    const positionAbove =
      currentPosition === "above" && layerRect.top < viewportRect.top;
    const positionBelow =
      currentPosition === "below" && layerRect.bottom > viewportRect.bottom;
    const positionStart =
      currentPosition === rtlStart && layerRect.left < viewportRect.left;
    const positionEnd =
      currentPosition === rtlEnd && layerRect.right > viewportRect.right;

    if (positionAbove || positionBelow || positionStart || positionEnd) {
      setCurrentPosition(
        adjustPosition(viewportRect, contextRect, currentPosition)
      );
    }
  }, [
    disableAutoFlip,
    currentPosition,
    context,
    contextRef,
    viewportMarginsContext.bottom,
    viewportMarginsContext.left,
    viewportMarginsContext.right,
    viewportMarginsContext.top,
  ]);

  const updateLayerPosition = useCallback(() => {
    const html = document.documentElement;
    const anchorRoot = anchorRootContext.current;
    if (!html || !anchorRoot) return;

    const positionedParent = getPositionedParent(anchorRoot);
    if (!positionedParent) return;

    let contextElement = context;
    if (!context && !contextElement && contextRef) {
      contextElement = contextRef.current;
    }
    if (!contextElement) return;

    const isAnchorFixedOrSticky = isElementFixedOrSticky(anchorRoot);
    const isContextFixedOrSticky =
      !isAnchorFixedOrSticky && isElementFixedOrSticky(contextElement);

    const scrollableRects = scrollableAreaContext
      .map((area) => area.getDOMNode())
      .filter(Boolean)
      .filter((node) => positionedParent.contains(node))
      .reduce<BoundingClientRect | null>(
        (acc, node) =>
          acc ? getIntersection(acc, getBoundingClientRect(node)) : null,
        getBoundingClientRect(contextElement)
      );

    if (
      !scrollableRects ||
      (scrollableRects.left === 0 && scrollableRects.right === 0)
    ) {
      setIsIndeterminate(true);
      onIndeterminatePosition && onIndeterminatePosition();
      return;
    }

    const viewportRect = isContextFixedOrSticky
      ? { bottom: html.clientHeight, left: 0, right: html.clientWidth, top: 0 }
      : getBoundingClientRect(positionedParent);

    const currentSize = sizeRef.current;
    let _adjusment;
    if (isPositionInitialized.current && currentSize && !disableAutoAlign) {
      const viewportRect = {
        bottom: html.clientHeight - viewportMarginsContext.bottom - OFFSET,
        left: viewportMarginsContext.left + OFFSET,
        right: html.clientWidth - viewportMarginsContext.right - OFFSET,
        top: viewportMarginsContext.top + OFFSET,
      };

      if (currentPosition === "start" || currentPosition === "end") {
        let start, end;
        if (align === "middle") {
          const middle = (scrollableRects.bottom + scrollableRects.top) / 2;
          start = middle - currentSize.height / 2;
          end = middle + currentSize.height / 2;
        } else if (align === "start" || align === "stretch-start") {
          start = scrollableRects.top;
          end = scrollableRects.top + currentSize.height;
        } else if (align === "end" || align === "stretch-end") {
          start = scrollableRects.bottom - currentSize.height;
          end = scrollableRects.bottom;
        }

        if (start != null && end != null) {
          if (start < viewportRect.top) {
            const diff = scrollableRects.bottom - start;
            const viewportDiff = viewportRect.top - start;
            _adjusment = Math.min(diff, viewportDiff);
          } else if (end > viewportRect.bottom) {
            const diff = scrollableRects.top - end;
            const viewportDiff = viewportRect.bottom - end;
            _adjusment = Math.max(diff, viewportDiff);
          }
        }
      } else if (currentPosition === "above" || currentPosition === "below") {
        let start, end;
        const rtlStart = isRTL ? "start" : "end";
        const rtlEnd = isRTL ? "end" : "start";
        if (align === "middle") {
          const middle = (scrollableRects.right + scrollableRects.left) / 2;
          start = middle - currentSize.width / 2;
          end = middle + currentSize.width / 2;
        } else if (align === rtlEnd || align === `stretch-${rtlEnd}`) {
          start = scrollableRects.left;
          end = scrollableRects.left + currentSize.width;
        } else if (align === rtlStart || align === `stretch-${rtlStart}`) {
          start = scrollableRects.right - currentSize.width;
          end = scrollableRects.right;
        }

        if (start != null && end != null) {
          if (start < viewportRect.left) {
            const diff = scrollableRects.right - start;
            const viewportDiff = viewportRect.left - start;
            _adjusment = Math.min(diff, viewportDiff);
          } else if (end > viewportRect.right) {
            const diff = scrollableRects.left - end;
            const viewportDiff = viewportRect.right - end;
            _adjusment = Math.max(diff, viewportDiff);
          }
        }
      }
    }

    const positioningStyles =
      getGeoPrivateBaseContextualLayerPositioningStyles_DEPRECATED({
        adjustment: _adjusment,
        align: alignPosition(align),
        contextRect: scrollableRects,
        fixed: isContextFixedOrSticky,
        offsetRect: viewportRect,
        position: currentPosition,
      });

    const layer = layerRef.current;
    if (layer) {
      Object.keys(positioningStyles).forEach((key) => {
        const value = positioningStyles[key];
        value != null
          ? layer.style.setProperty(key, value)
          : layer.style.removeProperty(key);
      });
    }

    isPositionInitialized.current = true;
    setIsIndeterminate(false);
    setHeight(scrollableRects.bottom - scrollableRects.top);
    setWidth(scrollableRects.right - scrollableRects.left);
    setAdjustment(_adjusment);
  }, [
    anchorRootContext,
    context,
    contextRef,
    scrollableAreaContext,
    disableAutoAlign,
    align,
    currentPosition,
    onIndeterminatePosition,
    viewportMarginsContext,
    isRTL,
  ]);

  useImperativeHandle(
    imperativeRef,
    () => ({
      reposition: ({ autoflip = false } = {}) => {
        if (autoflip) {
          recomputePosition();
        }
        updateLayerPosition();
      },
    }),
    [updateLayerPosition, recomputePosition]
  );

  const resizeObserver = useResizeObserver((entry) => {
    const { height, width } = entry;
    sizeRef.current = { height, width };
  });

  const isHidden = hidden || isIndeterminate;

  const layerRefCallback = useCallback(
    (element) => {
      layerRef.current = element;
      if (element && !isHidden) {
        if (!isPositionInitialized.current) {
          updateLayerPosition();
        }
        recomputePosition();
        updateLayerPosition();
      } else if (!element) {
        isPositionInitialized.current = false;
      }
    },
    [isHidden, updateLayerPosition, recomputePosition]
  );

  const combinedRefs = useMemo(
    () => mergeRefs(layerRefCallback, resizeObserver, containerRef),
    [resizeObserver, containerRef]
  );

  const orientationContextValue = useMemo(
    () => ({ align: alignPosition(align), position: currentPosition }),
    [align, currentPosition]
  );

  const contextSizeValue = useMemo(
    () => (height != null && width != null ? { height, width } : null),
    [height, width]
  );

  const initialPositionRef = useRef(position);

  useLayoutEffect(() => {
    if (position !== initialPositionRef.current) {
      setCurrentPosition(position);
      recomputePosition();
      updateLayerPosition();
      initialPositionRef.current = position;
    }
  }, [position, updateLayerPosition, recomputePosition]);

  useEffect(() => {
    if (hiddenSubtreeHidden) return;

    const handleResize = () => {
      recomputePosition();
      updateLayerPosition();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [hiddenSubtreeHidden, recomputePosition, updateLayerPosition]);

  useEffect(() => {
    if (hiddenSubtreeHidden) return;

    const scrollableAreas = scrollableAreaContext
      .map((area) => area.getDOMNode())
      .filter(Boolean);

    if (scrollableAreas.length > 0) {
      scrollableAreas.forEach((area) =>
        area.addEventListener("scroll", updateLayerPosition, {
          passive: true,
        })
      );

      return () => {
        scrollableAreas.forEach((area) =>
          area.removeEventListener("scroll", updateLayerPosition, {
            passive: true,
          })
        );
      };
    }

    window.addEventListener("scroll", updateLayerPosition, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateLayerPosition, {
        passive: true,
      });
    };
  }, [hiddenSubtreeHidden, updateLayerPosition, scrollableAreaContext]);

  return (
    <GeoPrivateBasePortal target={anchorRootContext.current}>
      <LegacyHidden
        htmlAttributes={{
          "data-testid": dataTestId,
          className: stylex(defaultStyles.root, xstyle),
        }}
        mode={isHidden ? "hidden" : "visible"}
        ref={combinedRefs}
      >
        <FocusRegion
          autoFocusQuery={
            !isHidden && (autoFocus ?? containFocus)
              ? focusScopeQueries.headerFirstTabbableSecondScopeQuery
              : null
          }
          autoRestoreFocus={autoRestoreFocus ?? !isHidden}
          containFocusQuery={
            isHidden ? null : focusScopeQueries.tabbableScopeQuery
          }
          recoverFocusQuery={
            isHidden
              ? null
              : focusScopeQueries.headerFirstTabbableSecondScopeQuery
          }
        >
          <BaseContextualLayerAnchorRoot>
            <BaseContextualLayerContextSizeContext.Provider
              value={contextSizeValue}
            >
              <BaseContextualLayerLayerAdjustmentContext.Provider
                value={adjustment}
              >
                <BaseContextualLayerOrientationContext.Provider
                  value={orientationContextValue}
                >
                  {children}
                </BaseContextualLayerOrientationContext.Provider>
              </BaseContextualLayerLayerAdjustmentContext.Provider>
            </BaseContextualLayerContextSizeContext.Provider>
          </BaseContextualLayerAnchorRoot>
        </FocusRegion>
      </LegacyHidden>
    </GeoPrivateBasePortal>
  );
};

BaseContextualLayer.displayName = `${
  BaseContextualLayer.name
} [from ${"BaseContextualLayerId"}]`;
const BaseContextualLayerComponent = makeGeoComponent(
  "BaseContextualLayer",
  BaseContextualLayer
);
export default BaseContextualLayerComponent;
