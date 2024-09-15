/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { html } from "react-strict-dom";

const styles = {
  bubble: { minWidth: "xeuugli",  },
  centered: { alignItems: "x6s0dn4",  },
  customHeight: (height) => [
    { height: "x1jwls1v",  },
    {
      "--height":
        typeof height === "number" ? `${height}px` : height ?? "initial",
    },
  ],
  grow: { flexGrow: "x1iyjqo2",  },
  justifyContentStart: { justifyContent: "x1nhvcw1",  },
  paint: { backgroundColor: "x1eb86dx",  },
  profile: { paddingEnd: "x1sxyh0", paddingStart: "x1nvil2r",  },
  root: {
    alignItems: "x1h91t0o",
    alignSelf: "xkh2ocl",
    display: "x78zum5",
    flexDirection: "xdt5ytf",
    justifyContent: "x13a6bvl",
    maxWidth: "x193iq5w",
    ,
  },
  selfCentered: { alignSelf: "xamitd3",  },
  shrinkwrap: { flexGrow: "x1c4vz4f",  },
  spacer: { flexBasis: "x1r8uery", flexGrow: "x1iyjqo2",  },
  vr: { backgroundColor: "x1eb86dx", width: "xh8yej3",  },
  withGutters: { paddingEnd: "xe53cfu", paddingStart: "xrgni87",  },
};

const Column = ({
  bubble,
  centered,
  children,
  grow,
  justifyContent,
  paint,
  profile,
  // rounded,
  selfCentered,
  shrinkwrap,
  withGutters,
}) => {
  return (
    <html.div
      role="none"
      style={[
        styles.root,
        grow && styles.grow,
        shrinkwrap && styles.shrinkwrap,
        paint && styles.paint,
        profile && styles.profile,
        withGutters && styles.withGutters,
        bubble && styles.bubble,
        centered && styles.centered,
        selfCentered && styles.selfCentered,
        justifyContent === "flex-start" && styles.justifyContentStart,
      ]}
    >
      {children}
    </html.div>
  );
};

export const MWPMessageListColumnWithGutters = ({
  children,
  grow,
  shrinkwrap,
}) => (
  <Column
    grow={grow ?? false}
    paint
    shrinkwrap={shrinkwrap ?? false}
    withGutters
  >
    {children}
  </Column>
);

export const MWPMessageListColumnProfile = ({ children, selfCentered }) => (
  <Column paint profile selfCentered={selfCentered ?? false} shrinkwrap>
    {children}
  </Column>
);

export const MWPMessageListColumnShrinkwrap = ({
  centered,
  children,
  paint,
}) => (
  <Column centered={centered ?? false} paint={paint ?? true} shrinkwrap>
    {children}
  </Column>
);

export const MWPMessageListColumnGrow = ({ children, paint = true }) => (
  <Column grow paint={paint}>
    {children}
  </Column>
);

export const MWPMessageListColumnGrowJustified = ({ children }) => (
  <Column grow justifyContent="flex-start" paint>
    {children}
  </Column>
);

export const MWPMessageListColumnBubble = ({ children, paint }) => (
  <Column bubble paint={paint}>
    {children}
  </Column>
);

export const MWPMessageListColumnHorizontalSpacer = () => (
  <html.div role="none" style={styles.spacer} />
);

export const MWPMessageListColumnVerticalRhythm = ({ height }) => (
  <html.div role="none" style={[styles.vr, styles.customHeight(height)]} />
);
