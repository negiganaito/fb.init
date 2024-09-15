/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
__d(
  "CometToast.react",
  [
    "fbt",
    "ix",
    "BaseToast.react",
    "CometCircleButton.react",
    "CometPressable.react",
    "FDSText.react",
    "fbicon",
    "react",
  ],
  (a, b, c, d, e, f, g, h, i) => {
    let j;
    let k = j || (j = d("react"));
    let l = j.useMemo;
    let m = {
      pressable: {
        alignItems: "x6s0dn4",
        display: "x78zum5",
        flexDirection: "x1q0g3np",
        width: "xh8yej3",
        $$css: !0,
      },
    };
    function a(a) {
      let b = a.action;
      let e = a.href;
      let f = a.icon;
      let g = a.impressionLoggingRef;
      let j = a.message;
      let n = a.onDismiss;
      let o = a.supressCloseButton;
      o = o === void 0 ? !1 : o;
      let p = a.target;
      let q = a.testid;
      q = q === void 0 ? "Toast" : q;
      q = a.truncateText;
      let r = q === void 0 ? !0 : q;
      let s = babelHelpers.objectWithoutPropertiesLoose(a, [
        "action",
        "href",
        "icon",
        "impressionLoggingRef",
        "message",
        "onDismiss",
        "supressCloseButton",
        "target",
        "testid",
        "truncateText",
      ]);
      let t = l(() => {
        return e != null ? { target: p, url: e } : void 0;
      }, [e, p]);
      return k.jsx(c("BaseToast.react"), {
        action:
          b != null
            ? {
                label: b.label,
                labelRenderer: function (a) {
                  return k.jsx(c("FDSText.react"), {
                    color: "blueLink",
                    numberOfLines: 1,
                    type: "body3",
                    children: a,
                  });
                },
                onPress: b.onPress,
                testid: b.testid,
              }
            : void 0,
        addOnStart: f,
        closeButton:
          o !== !0 &&
          k.jsx(c("CometCircleButton.react"), {
            icon: d("fbicon")._(i("478231"), 12),
            label: h._("__JHASH__cCrSTii9yXy__JHASH__"),
            onPress: n,
            size: 24,
            testid: void 0,
          }),
        linkWrapper:
          s.onPress != null || t != null
            ? function (a) {
                return k.jsx(
                  c("CometPressable.react"),
                  babelHelpers["extends"]({}, s, {
                    expanding: !0,
                    linkProps: t,
                    xstyle: m.pressable,
                    children: a,
                  })
                );
              }
            : void 0,
        message: function (a) {
          a = a.toastMessageId;
          return k.jsx(c("FDSText.react"), {
            color: "primary",
            id: a,
            numberOfLines: r ? 4 : void 0,
            type: "body3",
            children: j,
          });
        },
        onDismiss: n,
        testid: void 0,
        toastRef: g,
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  226
);
