/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
__d(
  "getListCellAddOn.react",
  [
    "fbt",
    "ix",
    "CometSwitch.react",
    "FDSButton.react",
    "FDSIcon.react",
    "Locale",
    "fbicon",
    "react",
  ],
  (a, b, c, d, e, f, g, h, i) => {
    let j;
    let k = j || d("react");
    let l = d("Locale").isRTL();
    let m = function (a, b, e) {
      let f = a["aria-label"];
      let g = a["aria-labelledby"];
      let h = a.on;
      let j = a.onPress;
      let l = a.testOnly_pressed;
      a.type;
      let m = babelHelpers.objectWithoutPropertiesLoose(a, [
        "aria-label",
        "aria-labelledby",
        "on",
        "onPress",
        "testOnly_pressed",
        "type",
      ]);
      m = babelHelpers["extends"]({}, m, {
        "aria-checked": j != null ? h : void 0,
        color: b ? "disabled" : h ? "highlight" : "secondary",
        disabled: b,
        hideHoverOverlay: !0,
        icon: a.on
          ? d("fbicon")._(i("484757"), 20)
          : d("fbicon")._(i("659288"), 20),
        onPress: j,
        role: j != null ? "checkbox" : void 0,
        testOnly_pressed: l,
      });
      return f != null
        ? k.jsx(
            c("FDSIcon.react"),
            babelHelpers["extends"]({}, m, { "aria-label": f })
          )
        : k.jsx(
            c("FDSIcon.react"),
            babelHelpers["extends"]({}, m, {
              "aria-labelledby": (h = g) != null ? h : e,
            })
          );
    };
    let n = function (a, b, e) {
      let f = a["aria-label"];
      let g = a["aria-labelledby"];
      let h = a.on;
      let j = a.onPress;
      let l = a.testOnly_pressed;
      a.type;
      a = babelHelpers.objectWithoutPropertiesLoose(a, [
        "aria-label",
        "aria-labelledby",
        "on",
        "onPress",
        "testOnly_pressed",
        "type",
      ]);
      a = babelHelpers["extends"]({}, a, {
        "aria-checked": j != null ? h : void 0,
        color: b ? "disabled" : h ? "highlight" : "secondary",
        disabled: b,
        hideHoverOverlay: !0,
        icon: h
          ? d("fbicon")._(i("621399"), 20)
          : d("fbicon")._(i("545517"), 20),
        onPress: j,
        role: j != null ? "radio" : void 0,
        testOnly_pressed: l,
      });
      return f != null
        ? k.jsx(
            c("FDSIcon.react"),
            babelHelpers["extends"]({}, a, { "aria-label": f })
          )
        : k.jsx(
            c("FDSIcon.react"),
            babelHelpers["extends"]({}, a, {
              "aria-labelledby": (b = g) != null ? b : e,
            })
          );
    };
    let o = function (a, b, e) {
      a.text;
      a.type;
      a = babelHelpers.objectWithoutPropertiesLoose(a, ["text", "type"]);
      e === 3
        ? (e = l
            ? d("fbicon")._(i("492521"), 24)
            : d("fbicon")._(i("492575"), 24))
        : (e = l
            ? d("fbicon")._(i("492518"), 20)
            : d("fbicon")._(i("492572"), 20));
      return k.jsx(
        c("FDSIcon.react"),
        babelHelpers["extends"]({}, a, {
          color: b ? "disabled" : "secondary",
          disabled: b,
          icon: e,
        })
      );
    };
    let p = function (a, b, e) {
      e = a["aria-label"];
      let f = a["aria-labelledby"];
      a.children;
      let g = a.onPress;
      let h = a.open;
      a.type;
      a = babelHelpers.objectWithoutPropertiesLoose(a, [
        "aria-label",
        "aria-labelledby",
        "children",
        "onPress",
        "open",
        "type",
      ]);
      a = babelHelpers["extends"]({}, a, {
        color: b ? "disabled" : "secondary",
        disabled: b,
        icon: h
          ? d("fbicon")._(i("505565"), 20)
          : d("fbicon")._(i("492454"), 20),
      });
      if (g != null && e != null)
        return k.jsx(
          c("FDSIcon.react"),
          babelHelpers["extends"]({}, a, { "aria-label": e, onPress: g })
        );
      return g != null && f != null
        ? k.jsx(
            c("FDSIcon.react"),
            babelHelpers["extends"]({}, a, { "aria-labelledby": f, onPress: g })
          )
        : k.jsx(c("FDSIcon.react"), babelHelpers["extends"]({}, a));
    };
    let q = function (a, b) {
      let d = a["aria-label"];
      let e = a["aria-labelledby"];
      let f = a.color;
      let g = a.icon;
      let h = a.onHoverIn;
      let i = a.onHoverOut;
      let j = a.onPress;
      let l = a.onPressIn;
      let m = a.testOnly_pressed;
      a.type;
      a = babelHelpers.objectWithoutPropertiesLoose(a, [
        "aria-label",
        "aria-labelledby",
        "color",
        "icon",
        "onHoverIn",
        "onHoverOut",
        "onPress",
        "onPressIn",
        "testOnly_pressed",
        "type",
      ]);
      f = (f = f) != null ? f : "primary";
      a = babelHelpers["extends"]({}, a, {
        color: b ? "disabled" : f,
        disabled: b,
        hideHoverOverlay: !0,
        icon: g,
        testOnly_pressed: m,
      });
      f = { onHoverIn: h, onHoverOut: i, onPress: j, onPressIn: l };
      if (j != null && d !== void 0)
        return k.jsx(
          c("FDSIcon.react"),
          babelHelpers["extends"]({ "aria-label": d }, a, f)
        );
      return j != null && e != null
        ? k.jsx(
            c("FDSIcon.react"),
            babelHelpers["extends"]({ "aria-labelledby": e }, a, f)
          )
        : k.jsx(c("FDSIcon.react"), babelHelpers["extends"]({}, a));
    };
    let r = function (a, b) {
      let d = a.labelIsHidden;
      d = d === void 0 ? !1 : d;
      let e = a.type;
      a = babelHelpers.objectWithoutPropertiesLoose(a, [
        "labelIsHidden",
        "type",
      ]);
      e = e === "primary-button" ? "primary" : "secondary";
      d = d
        ? babelHelpers["extends"](
            { disabled: b, labelIsHidden: !0, type: e },
            a
          )
        : babelHelpers["extends"]({ disabled: b, type: e }, a);
      return k.jsx(c("FDSButton.react"), babelHelpers["extends"]({}, d));
    };
    let s = function (a, b) {
      let d = a.onChange;
      let e = a.size;
      a.type;
      let f = a.value;
      a = babelHelpers.objectWithoutPropertiesLoose(a, [
        "onChange",
        "size",
        "type",
        "value",
      ]);
      return k.jsx(
        c("CometSwitch.react"),
        babelHelpers["extends"](
          { disabled: b, onClick: d, size: e, tabIndex: -1, value: f },
          a,
          {
            "aria-label":
              a.disabled === !0
                ? h._("__JHASH__AVRl6ij3kje__JHASH__")
                : h._("__JHASH__AOlGHVa_PET__JHASH__"),
          }
        )
      );
    };
    let t = function (a, b) {
      let e = a.onPress;
      let f = a.type;
      a = babelHelpers.objectWithoutPropertiesLoose(a, ["onPress", "type"]);
      return k.jsx(
        c("FDSIcon.react"),
        babelHelpers["extends"]({}, a, {
          color: b ? "disabled" : "secondary",
          disabled: b,
          icon:
            f === "more"
              ? d("fbicon")._(i("484391"), 24)
              : d("fbicon")._(i("478237"), 16),
          onPress: e,
        })
      );
    };
    a = function (a, b, c, d) {
      switch (a.type) {
        case "checkbox":
          return m(a, b, d);
        case "radio":
          return n(a, b, d);
        case "disclosure":
          return o(a, b, c);
        case "expander":
          return p(a, b, c);
        case "icon":
          return q(a, b);
        case "primary-button":
          return r(a, b);
        case "secondary-button":
          return r(a, b);
        case "switch":
          return s(a, b);
        case "more":
          return t(a, b);
        case "close":
          return t(a, b);
        case "body":
          return a.addOn;
      }
    };
    g.getEndAddOn = a;
  },
  226
);
