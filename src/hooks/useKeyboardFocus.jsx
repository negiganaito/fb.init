__d(
  "useKeyboardFocus",
  ["KeyStatus", "RTLKeys", "VirtualCursorStatus", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    b = h || d("react");
    var i = b.useCallback,
      j = b.useState,
      k = new Set([
        c("RTLKeys").ALT,
        c("RTLKeys").CTRL,
        c("RTLKeys").SHIFT,
        c("RTLKeys").LEFT_WINDOW_KEY,
        c("RTLKeys").RIGHT_WINDOW_KEY,
      ]);
    d("KeyStatus").isKeyDown();
    function a(a) {
      var b = j(!1),
        e = b[0],
        f = b[1];
      b = i(
        function (b) {
          var c =
            d("KeyStatus").isKeyDown() &&
            !k.has(d("KeyStatus").getKeyDownCode());
          (d("VirtualCursorStatus").isVirtualCursorTriggered() || c) && f(!0);
          if (a && a.onFocus) return a.onFocus(b);
        },
        [a == null ? void 0 : a.onFocus]
      );
      var g = i(
          function (b) {
            f(!1);
            if (a && a.onBlur) return a.onBlur(b);
          },
          [a == null ? void 0 : a.onBlur]
        ),
        h = i(
          function (b) {
            (b.keyCode === c("RTLKeys").RETURN ||
              b.keyCode === c("RTLKeys").SPACE) &&
              f(!0);
            if (a && a.onKeyDown) return a.onKeyDown(b);
          },
          [a == null ? void 0 : a.onKeyDown]
        );
      return { isKeyboardFocused: e, onFocus: b, onBlur: g, onKeyDown: h };
    }
    g["default"] = a;
  },
  98
); /*FB_PKG_DELIM*/

import React, { useCallback, useState } from "react";
import { KeyStatus } from "KeyStatus";
import { RTLKeys } from "RTLKeys";
import { VirtualCursorStatus } from "VirtualCursorStatus";

type KeyboardFocusProps = {
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
};

type KeyboardFocusHook = {
  isKeyboardFocused: boolean;
  onFocus: (event: React.FocusEvent) => void;
  onBlur: (event: React.FocusEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
};

const nonTriggerKeys = new Set([
  RTLKeys.ALT,
  RTLKeys.CTRL,
  RTLKeys.SHIFT,
  RTLKeys.LEFT_WINDOW_KEY,
  RTLKeys.RIGHT_WINDOW_KEY,
]);

const useKeyboardFocus = (props?: KeyboardFocusProps): KeyboardFocusHook => {
  const [isKeyboardFocused, setKeyboardFocused] = useState(false);

  const handleFocus = useCallback(
    (event: React.FocusEvent) => {
      const isKeyPressed =
        KeyStatus.isKeyDown() &&
        !nonTriggerKeys.has(KeyStatus.getKeyDownCode());
      if (VirtualCursorStatus.isVirtualCursorTriggered() || isKeyPressed) {
        setKeyboardFocused(true);
      }
      if (props?.onFocus) {
        props.onFocus(event);
      }
    },
    [props?.onFocus]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent) => {
      setKeyboardFocused(false);
      if (props?.onBlur) {
        props.onBlur(event);
      }
    },
    [props?.onBlur]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.keyCode === RTLKeys.RETURN || event.keyCode === RTLKeys.SPACE) {
        setKeyboardFocused(true);
      }
      if (props?.onKeyDown) {
        props.onKeyDown(event);
      }
    },
    [props?.onKeyDown]
  );

  return {
    isKeyboardFocused,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
  };
};

export default useKeyboardFocus;
