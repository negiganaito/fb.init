/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useRef } from "react";
import stylex from "@stylexjs/stylex";

import useMergeRefs from "../../hooks/useMergeRefs";

import BaseFocusRing from "./BaseFocusRing.react";
import BaseInput from "./BaseInput";

const styles = {
  containerOverride: {
    backgroundColor: "xjbqb8w",
    backgroundImage: "x18o3ruo",
    borderBottomWidth: 0,
    borderEndWidth: 0,
    borderLeftWidth: "xyj58a3",
    borderRightWidth: "xgfja2r",
    borderStartWidth: 0,
    borderTopWidth: "x972fbf",
    display: "xrvj5dj",
    paddingTop: null,
    paddingEnd: null,
    paddingBottom: null,
    paddingStart: null,
    paddingLeft: null,
    paddingRight: null,
    position: "relative",
    ":active_backgroundColor": "xyftt0y",
    ":active_backgroundImage": "xuqm82a",
    ":focus_backgroundColor": "xyc4ar7",
    ":focus_backgroundImage": "x19zaomo",
    ":hover_backgroundColor": "x1n5bzlp",
    ":hover_backgroundImage": "xn3cpwa",
    ,
  },
  divOverride: {
    overflowWrap: "x1mzt3pk",
    pointerEvents: "x47corl",
    visibility: "xlshs6z",
    whiteSpace: "x126k92a",
    ,
  },
  elementOverride: {
    gridColumnEnd: "x1ls7aod",
    gridColumnStart: "xcrlgei",
    gridRowEnd: "x1byulpo",
    gridRowStart: "x1agbcgv",
    lineHeight: "x15bjb6t",
    marginTop: null,
    marginEnd: null,
    marginBottom: null,
    marginStart: null,
    marginLeft: null,
    marginRight: null,
    ,
  },
  maxHeight: (maxHeight) => [
    {
      WebkitBoxOrient: "x1ua5tub",
      WebkitLineClamp: "x1dovpjd",
      display: "x104kibb",
      ,
    },
    { "--WebkitLineClamp": maxHeight !== null ? maxHeight : "initial" },
  ],
  unresizable: {
    bottom: "x1ey2m1c",
    end: "xds687c",
    left: null,
    right: null,
    position: "x10l6tqk",
    resize: "xtt52l0",
    start: "x17qophe",
    top: "x13vifvy",
    ,
  },
};

const BaseTextArea = forwardRef((props, ref) => {
  const {
    maxRows = 200,
    minRows = 1,
    suppressFocusRing = false,
    unresizable = false,
    value,
    xstyle,
    ...rest
  } = props;

  const containerRef = useRef(null);
  const divRef = useRef(null);
  const mergedRef = useMergeRefs(containerRef, ref);
  const stringValue = value !== null ? String(value) : value;

  const handleChange = (event) => {
    const newValue = event.target.value;
    const divNode = divRef.current;

    if (divNode !== null && stringValue !== null) {
      divNode.textContent = newValue.endsWith("\n") ? newValue + " " : newValue;
    }

    if (rest.onChange) {
      rest.onChange(event);
    }
  };

  return (
    <div {...stylex(xstyle, styles.containerOverride)}>
      <div
        {...stylex(xstyle, styles.elementOverride, styles.divOverride)}
        aria-hidden="true"
        ref={divRef}
      >
        {Array.from({ length: minRows !== null ? minRows : 1 }).map(
          (_, index) => (
            <br key={index} />
          )
        )}
      </div>
      <div
        {...stylex(
          xstyle,
          styles.elementOverride,
          styles.divOverride,
          styles.maxHeight(maxRows)
        )}
        aria-hidden="true"
        ref={divRef}
      >
        {stringValue !== null && stringValue.endsWith("\n")
          ? stringValue + " "
          : stringValue}
      </div>
      <BaseFocusRing suppressFocusRing={suppressFocusRing}>
        {(focusRingStyles) => (
          <BaseInput
            {...rest}
            onChange={handleChange}
            ref={mergedRef}
            type="textarea"
            value={stringValue}
            xstyle={[
              focusRingStyles,
              unresizable && styles.unresizable,
              xstyle,
              styles.elementOverride,
            ]}
          />
        )}
      </BaseFocusRing>
    </div>
  );
});

BaseTextArea.displayName = `${BaseTextArea.name} [from ${module.id}]`;

export default BaseTextArea;
