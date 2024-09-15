/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, {
  forwardRef,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import XPlatReactNestedPressableContext from "XPlatReactNestedPressableContext";

import mergeRefs from "../../helpers/mergeRefs";

import BaseFocusRing from "./BaseFocusRing.react";
import BaseInput from "./BaseInput";
import BaseView from "./BaseView.react";

const styles = {
  radio: {
    cursor: "x1ypdohk",
    height: "x5yr21d",
    marginTop: 0,
    marginEnd: 0,
    marginBottom: 0,
    marginStart: 0,
    opacity: "x1w3u9th",
    outline: "x1a2a7pz",
    paddingTop: 0,
    paddingEnd: 0,
    paddingBottom: 0,
    paddingStart: 0,
    position: "x10l6tqk",
    start: "x17qophe",
    left: null,
    right: null,
    top: "x13vifvy",
    width: "xh8yej3",
    ,
  },
  wrapper: {
    position: "relative",
    ,
  },
};

const BaseRadio = forwardRef((props, ref) => {
  const {
    children,
    indeterminate = false,
    onClick,
    onValueChange,
    suppressFocusRing,
    // testid,
    xstyle,
    ...otherProps
  } = props;

  const nestedPressableContext = useContext(XPlatReactNestedPressableContext);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const mergedRef = useMemo(() => mergeRefs(ref, inputRef), [ref]);

  return (
    <BaseFocusRing suppressFocusRing={suppressFocusRing}>
      {(focusRingProps) => (
        <BaseView
          testid={undefined}
          xstyle={[styles.wrapper, focusRingProps, xstyle]}
        >
          {children}
          <BaseInput
            {...otherProps}
            aria-checked={indeterminate ? "mixed" : otherProps.checked ?? false}
            onClick={nestedPressableContext ? undefined : onClick}
            onValueChange={nestedPressableContext ? undefined : onValueChange}
            ref={mergedRef}
            type="radio"
            xstyle={styles.radio}
          />
        </BaseView>
      )}
    </BaseFocusRing>
  );
});

BaseRadio.displayName = `${BaseRadio.name} [from ${module.id}]`;

export default memo(BaseRadio);
