/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, memo, useContext, useMemo } from "react";
import stylex from "@stylexjs/stylex";

import CometContainerPressableContext from "../../context/CometContainerPressableContext";
import Locale from "../../helpers/Locale";

const styles = {
  root: {
    WebkitTapHighlightColor: "x1i10hfl",
    boxSizing: "x9f619",
    touchAction: "xggy1nq",
    ":disabled_cursor": "x1s07b3s",
    ,
  },
  zIndex: {
    zIndex: "x1vjfegm",
    ,
  },
};

const isRTL = Locale.isRTL();

const BaseInput = forwardRef((props, ref) => {
  const {
    xstyle,
    onChange,
    onClick,
    onValueChange,
    // testid,
    type = "text",
    ...otherProps
  } = props;

  const inputType = useMemo(() => {
    switch (type) {
      case "switch":
        return "checkbox";
      default:
        return type;
    }
  }, [type]);

  const isCheckboxOrRadio = inputType === "checkbox" || inputType === "radio";
  const isTextarea = inputType === "textarea";
  const isPressableContext =
    useContext(CometContainerPressableContext) !== null;

  const inputProps = {
    dir: isRTL ? "rtl" : "ltr",
    ...otherProps,
    // ...testID(testid),
    className: stylex(styles.root, xstyle, isPressableContext && styles.zIndex),
    onChange: (event) => {
      if (!isCheckboxOrRadio && onValueChange) {
        onValueChange(event.target.value, event);
      }
      if (onChange) {
        onChange(event);
      }
    },
    onClick: (event) => {
      if (isCheckboxOrRadio && onValueChange) {
        onValueChange(event.target.checked, event);
      }
      if (onClick) {
        onClick(event);
      }
    },
  };

  return isTextarea ? (
    <textarea {...inputProps} ref={ref} />
  ) : (
    <input {...inputProps} ref={ref} type={inputType} />
  );
});

BaseInput.displayName = `${BaseInput.name} [from ${module.id}]`;

export default memo(BaseInput);
