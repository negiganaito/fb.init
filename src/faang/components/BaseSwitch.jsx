/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, memo } from "react";

import BaseFocusRing from "./BaseFocusRing.react";
import BaseInput from "./BaseInput";
import BaseViewReact from "./BaseView.react";

const styles = {
  switch: {
    cursor: "x1ypdohk",
    height: "x5yr21d",
    start: "x17qophe",
    left: null,
    right: null,
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
    top: "x13vifvy",
    width: "xh8yej3",
    ,
  },
  wrapper: {
    position: "relative",
    ,
  },
};

const BaseSwitch = forwardRef((props, ref) => {
  const {
    children,
    xstyle,
    suppressFocusRing,
    //  testid,
    ...rest
  } = props;

  return (
    <BaseFocusRing suppressFocusRing={suppressFocusRing}>
      {(focusRingProps) => (
        <BaseViewReact
          testid={undefined}
          xstyle={[styles.wrapper, focusRingProps, xstyle]}
        >
          {children}
          <BaseInput
            {...rest}
            aria-checked={rest.checked !== null ? rest.checked : false}
            ref={ref}
            role="switch"
            type="checkbox"
            xstyle={styles.switch}
          />
        </BaseViewReact>
      )}
    </BaseFocusRing>
  );
});

BaseSwitch.displayName = `${BaseSwitch.name} [from ${module.id}]`;

export default memo(BaseSwitch);
