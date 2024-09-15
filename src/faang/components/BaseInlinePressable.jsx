/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";

import CometPressable from "./CometPressable";

const styles = {
  defaultCursor: { cursor: "xt0e3qv",  },
  disabled: { textDecoration: "x1hl2dhg",  },
  disabledColor: { color: "x1dntmbh",  },
  disabledLink: { opacity: "xbyyjgo",  },
  expanding: { display: 0,  },
  link: { ":hover_textDecoration": "xt0b8zv",  },
  linkColor: { color: "x1fey0fg",  },
  root: {
    display: "xt0psk2",
    position: "relative",
    userSelect: "x87ps6o",
    ,
  },
};

const BaseInlinePressable = forwardRef((props, ref) => {
  const {
    ariaLabel,
    children,
    color = "blue",
    cursorDisabled,
    expanding = false,
    linkProps,
    onPress,
    xstyle,
    ...rest
  } = props;

  const combinedStyles = [
    styles.root,
    cursorDisabled && styles.defaultCursor,
    expanding && styles.expanding,
    xstyle,
  ];

  const isLinkColorEnabled =
    color !== "inherit" && (linkProps !== null || onPress !== null);

  return (
    <CometPressable
      aria-label={ariaLabel}
      linkProps={linkProps}
      onPress={onPress}
      overlayDisabled={true}
      ref={ref}
      xstyle={({ disabled, hovered }) => [
        ...combinedStyles,
        isLinkColorEnabled && styles.linkColor,
        hovered && !disabled && styles.link,
        disabled && styles.disabled,
        disabled && !isLinkColorEnabled && styles.disabledColor,
        disabled && isLinkColorEnabled && styles.disabledLink,
      ]}
      {...rest}
    >
      {children}
    </CometPressable>
  );
});

BaseInlinePressable.displayName = `${BaseInlinePressable.name}`;

export default BaseInlinePressable;
