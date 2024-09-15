/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";

import BaseStyledSwitch from "./BaseStyledSwitch";

const styles = {
  toggle: {
    marginTop: 0,
    marginEnd: 0,
    marginBottom: "x4vbgl9",
    marginStart: 0,
    ,
  },
};

const CometSwitch = forwardRef((props, ref) => {
  const {
    disabled = false,
    size = "medium",
    // testid,
    xstyle,
    ...rest
  } = props;
  return (
    <BaseStyledSwitch
      {...rest}
      disabled={disabled}
      ref={ref}
      size={size}
      testid={undefined}
      xstyle={[styles.toggle, xstyle]}
    />
  );
});

CometSwitch.displayName = `${CometSwitch.name}`;

export default CometSwitch;
