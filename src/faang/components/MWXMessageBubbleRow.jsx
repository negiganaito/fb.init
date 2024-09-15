/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { html } from "react-strict-dom";

const styles = {
  addOn: {
    display: "x78zum5",
    flexGrow: "x1c4vz4f",
    flexShrink: "x2lah0s",
    ,
  },
  bubble: { minWidth: "xeuugli", zIndex: "x1vjfegm",  },
  container: { display: "x78zum5",  },
  containerRight: { flexDirection: "x15zctf7",  },
  opaque: { backgroundColor: "x1eb86dx",  },
  paddingBottom: (value) => [
    { paddingBottom: "x9q6w0x",  },
    {
      "--paddingBottom":
        typeof value === "number" ? `${value}px` : value ?? "initial",
    },
  ],
  paddingEnd: (value) => [
    {
      paddingEnd: "xd5rl1",
      paddingLeft: null,
      paddingRight: null,
      ,
    },
    {
      "--paddingEnd":
        typeof value === "number" ? `${value}px` : value ?? "initial",
    },
  ],
  paddingStart: (value) => [
    {
      paddingStart: "xfzia1k",
      paddingLeft: null,
      paddingRight: null,
      ,
    },
    {
      "--paddingStart":
        typeof value === "number" ? `${value}px` : value ?? "initial",
    },
  ],
  spacer: { flexBasis: "x1r8uery", flexGrow: "x1iyjqo2",  },
};

const verticalAlignStyles = {
  bottom: { alignSelf: "xpvyfi4",  },
  center: { alignSelf: "xamitd3",  },
  top: { alignSelf: "xqcrz7y",  },
};

const alignStyles = {
  left: { end: styles.paddingStart, start: styles.paddingEnd },
  right: { end: styles.paddingEnd, start: styles.paddingStart },
};

const AddOn = ({
  children,
  gap,
  paddingBottom,
  rowAlign,
  testid,
  type,
  verticalAlign,
}) => {
  if (children === null) return null;

  return (
    <html.div
      data-testid={testid}
      style={[
        styles.opaque,
        styles.addOn,
        paddingBottom !== null && styles.paddingBottom(paddingBottom),
        gap !== null && alignStyles[rowAlign][type](gap),
      ]}
    >
      <html.div
        style={[
          styles.container,
          rowAlign === "right" && styles.containerRight,
          verticalAlignStyles[verticalAlign],
        ]}
      >
        {children}
      </html.div>
    </html.div>
  );
};

const MWXMessageBubbleRow = ({
  addOnEnd,
  addOnEndGap = 0,
  addOnEndVerticalAlign = "center",
  addOnPaddingBottom = 0,
  addOnStart,
  addOnStartGap = 0,
  addOnStartVerticalAlign = "center",
  align = "right",
  children,
  opaque = false,
  testid,
  xstyle,
}) => {
  return (
    <html.div
      data-testid={testid}
      style={[
        styles.container,
        align === "right" && styles.containerRight,
        opaque && styles.opaque,
        xstyle,
      ]}
    >
      <AddOn
        gap={addOnStartGap}
        paddingBottom={addOnPaddingBottom}
        rowAlign={align}
        type="start"
        verticalAlign={addOnStartVerticalAlign}
      >
        {addOnStart}
      </AddOn>
      {children !== null && (
        <html.div style={styles.bubble}>{children}</html.div>
      )}
      <AddOn
        gap={addOnEndGap}
        paddingBottom={addOnPaddingBottom}
        rowAlign={align}
        type="end"
        verticalAlign={addOnEndVerticalAlign}
      >
        {addOnEnd}
      </AddOn>
      <html.div style={[styles.opaque, styles.spacer]} />
    </html.div>
  );
};

export default MWXMessageBubbleRow;
