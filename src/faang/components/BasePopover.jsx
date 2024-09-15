/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import testID from "testID";

import stylex from "../../helpers/stylex";

const styles = {
  root: {
    position: "relative",
    ,
  },
};

const BasePopover = React.forwardRef((props, ref) => {
  const {
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    arrowAlignment = "center",
    arrowImpl,
    id,
    role = "dialog",
    testid,
    xstyle,
    ...restProps
  } = props;

  if (arrowImpl) {
    const ArrowComponent = arrowImpl;
    return (
      <ArrowComponent
        aria-describedby={ariaDescribedby}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        arrowAlignment={arrowAlignment}
        id={id}
        ref={ref}
        role={role}
        testid={undefined}
        xstyle={xstyle}
        {...restProps}
      />
    );
  }

  return (
    <div
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={stylex(styles.root, xstyle)}
      id={id}
      ref={ref}
      role={role}
      {...testID(testid)}
      {...restProps}
    />
  );
});

BasePopover.displayName = `${BasePopover.name} [from ${__filename}]`;

export default BasePopover;
