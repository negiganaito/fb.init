__d(
  "FDSCalloutInset.react",
  [
    "BaseContextualLayerContextSizeContext",
    "BaseContextualLayerLayerAdjustmentContext",
    "BaseContextualLayerOrientationContext",
    "BaseRow.react",
    "BaseView.react",
    "CometHideLayerOnEscape.react",
    "FDSCalloutInsetArrow.svg.react",
    "FocusRegionStrictMode.react",
    "Locale",
    "focusScopeQueries",
    "react",
    "useOnOutsideClick",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || (h = d("react")),
      j = h.useContext,
      k = {
        arrow: { position: "x10l6tqk", $$css: !0 },
        container: { display: "x78zum5", $$css: !0 },
        content: {
          backgroundColor: "x1h0vfkc",
          borderTopStartRadius: "x1lq5wgf",
          borderTopEndRadius: "xgqcy7u",
          borderBottomEndRadius: "x30kzoy",
          borderBottomStartRadius: "x9jhf4c",
          borderTopWidth: "x178xt8z",
          borderEndWidth: "xm81vs4",
          borderBottomWidth: "xso031l",
          borderStartWidth: "xy80clv",
          boxShadow: "xofhs1l",
          paddingStart: "x1ye3gou",
          paddingLeft: null,
          paddingRight: null,
          paddingEnd: "xn6708d",
          paddingTop: "xyamay9",
          paddingBottom: "x1l90r2v",
          $$css: !0,
        },
      },
      l = {
        accent: { backgroundColor: "xdk9wry", $$css: !0 },
        default: { backgroundColor: "x9bbmet", $$css: !0 },
      },
      m = {
        above: { marginBottom: "x1yztbdb", $$css: !0 },
        below: { marginTop: "xw7yly9", $$css: !0 },
        end: {
          marginStart: "x1d52u69",
          marginLeft: null,
          marginRight: null,
          $$css: !0,
        },
      },
      n = {
        above: { bottom: "x1wa3icf", $$css: !0 },
        below: { top: "x1jzctok", transform: "x1oihik5", $$css: !0 },
        end: { $$css: !0 },
      },
      o = {
        above: { bottom: "x1wa3icf", $$css: !0 },
        below: { top: "x1jzctok", transform: "x1oihik5", $$css: !0 },
        end: { $$css: !0 },
      };
    function a(a) {
      var b,
        e = a.children,
        f = a.disableAutoFocus;
      f = f === void 0 ? !1 : f;
      var g = a.id,
        h = a.onClose,
        n = a.onOutsideClick,
        o = a.type;
      o = o === void 0 ? "default" : o;
      var q = a.xstyle;
      a = babelHelpers.objectWithoutPropertiesLoose(a, [
        "children",
        "disableAutoFocus",
        "id",
        "onClose",
        "onOutsideClick",
        "type",
        "xstyle",
      ]);
      var s = j(c("BaseContextualLayerOrientationContext")),
        t = s.align;
      s = s.position;
      t = t === "stretch" ? "start" : t;
      s = s === "start" ? "above" : s === "end" ? "below" : s;
      var u = j(c("BaseContextualLayerContextSizeContext"));
      b =
        (b = j(c("BaseContextualLayerLayerAdjustmentContext"))) != null ? b : 0;
      u = r(t, s, (t = u == null ? void 0 : u.width) != null ? t : 0, b);
      t = u[0];
      b = u[1];
      u = c("useOnOutsideClick")(n);
      return i.jsx(
        c("BaseView.react"),
        babelHelpers["extends"]({}, a, {
          id: (n = g) != null ? n : void 0,
          role: "dialog",
          style: t,
          xstyle: k.container,
          children: i.jsx(d("FocusRegionStrictMode.react").FocusRegion, {
            autoFocusQuery: f
              ? void 0
              : d("focusScopeQueries").tabbableScopeQuery,
            children: i.jsxs(c("CometHideLayerOnEscape.react"), {
              onHide: h,
              children: [
                i.jsx(c("BaseRow.react"), {
                  ref: u,
                  xstyle: [k.content, l[o], m[s], q],
                  children: e,
                }),
                i.jsx(p, { arrowStyles: b, position: s, type: o }),
              ],
            }),
          }),
        })
      );
    }
    a.displayName = a.name + " [from " + f.id + "]";
    function p(a) {
      var b = a.arrowStyles,
        d = a.position;
      a = a.type;
      return i.jsx(c("FDSCalloutInsetArrow.svg.react"), {
        fill:
          a === "default"
            ? "var(--popover-background)"
            : "var(--callout-background-color-accent, var(--accent))",
        style: b,
        xstyle: [k.arrow, n[d], a === "accent" && o[d]],
      });
    }
    p.displayName = p.name + " [from " + f.id + "]";
    var q = c("Locale").isRTL();
    function r(a, b, c, d) {
      var e = Math.max(c / 2 - 8, 16) + Math.abs(d),
        f = c / 2 - 8 < 16;
      c = 24 - c / 2;
      if (b === "above")
        if (a === "start") {
          var g;
          b = q ? "right" : "left";
          return [
            f ? { transform: "translateX(" + (q ? c : -c) + "px)" } : void 0,
            ((g = {}), (g[b] = "min(calc(100% - 32px), " + e + "px)"), g),
          ];
        } else if (a === "end") {
          b = q ? "left" : "right";
          return [
            f ? { transform: "translateX(" + (q ? -c : c) + "px)" } : void 0,
            ((g = {}), (g[b] = "min(calc(100% - 32px), " + e + "px)"), g),
          ];
        } else {
          var h;
          b = q ? "left" : "right";
          g = (q ? -d : d) - 8;
          return [void 0, ((h = {}), (h[b] = "calc(50% + " + g + "px)"), h)];
        }
      else if (a === "start") {
        b = q ? "right" : "left";
        return [
          f ? { transform: "translateX(" + (q ? c : -c) + "px)" } : void 0,
          ((g = {}), (g[b] = "min(calc(100% - 32px), " + e + "px)"), g),
        ];
      } else if (a === "end") {
        h = q ? "left" : "right";
        return [
          f ? { transform: "translateX(" + (q ? -c : c) + "px)" } : void 0,
          ((b = {}), (b[h] = "min(calc(100% - 32px), " + e + "px)"), b),
        ];
      } else {
        g = q ? "left" : "right";
        a = (q ? -d : d) - 8;
        return [void 0, ((f = {}), (f[g] = "calc(50% + " + a + "px)"), f)];
      }
    }
    g["default"] = a;
  },
  98
);
