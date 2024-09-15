/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useMemo } from "react";

import BaseRowContext from "../../context/BaseRowContext";

import BaseViewReact from "./BaseView.react";

const styles = {
  expanding: {
    flexBasis: "x1r8uery",
    flexGrow: "x1iyjqo2",
    flexShrink: "xs83m0k",
    minWidth: "xeuugli",
    ,
  },
  row: {
    display: "x78zum5",
    flexShrink: "x2lah0s",
    ,
  },
};

const alignStyles = {
  center: {
    justifyContent: "xl56j7k",
    ,
  },
  end: {
    justifyContent: "x13a6bvl",
    ,
  },
  justify: {
    justifyContent: "x1qughib",
    ,
  },
  start: {
    justifyContent: "x1nhvcw1",
    ,
  },
};

const verticalAlignStyles = {
  bottom: {
    alignItems: "xuk3077",
    ,
  },
  center: {
    alignItems: "x6s0dn4",
    ,
  },
  stretch: {
    alignItems: "x1qjc9v5",
    ,
  },
  top: {
    alignItems: "x1cy8zhl",
    ,
  },
};

const directionStyles = {
  backward: {
    flexDirection: "x15zctf7",
    ,
  },
  forward: {
    flexDirection: "x1q0g3np",
    ,
  },
};

const wrapStyles = {
  backward: {
    flexWrap: "x8hhl5t",
    ,
  },
  forward: {
    flexWrap: "x1a02dak",
    ,
  },
  none: {
    flexWrap: "xozqiw3",
    ,
  },
};

const reverseAlignMap = {
  end: "start",
  start: "end",
};

const BaseRow = forwardRef(
  (
    {
      align = "justify",
      children,
      columns = 0,
      direction = "forward",
      expanding = false,
      role,
      verticalAlign = "stretch",
      wrap = "none",
      xstyle,
      ...rest
    },
    ref
  ) => {
    const contextValue = useMemo(() => ({ columns, wrap }), [columns, wrap]);

    const appliedAlignStyle =
      direction === "backward" && (align === "start" || align === "end")
        ? alignStyles[reverseAlignMap[align]]
        : alignStyles[align];

    return (
      <BaseViewReact
        {...rest}
        ref={ref}
        role={role}
        xstyle={[
          styles.row,
          expanding && styles.expanding,
          appliedAlignStyle,
          verticalAlignStyles[verticalAlign],
          wrapStyles[wrap],
          directionStyles[direction],
          xstyle,
        ]}
      >
        <BaseRowContext.Provider value={contextValue}>
          {children}
        </BaseRowContext.Provider>
      </BaseViewReact>
    );
  }
);

BaseRow.displayName = `BaseRow [from ${process.env.FB_APP_ID || "unknown"}]`;

export default BaseRow;
