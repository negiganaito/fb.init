/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { html } from "react-strict-dom";

const styles = {
  bubble: { minWidth: "xeuugli", $$css: true },
  centered: { alignItems: "x6s0dn4", $$css: true },
  customHeight: (height) => [
    { height: "x1jwls1v", $$css: true },
    {
      "--height":
        typeof height === "number"
          ? height + "px"
          : height !== null
          ? height
          : "initial",
    },
  ],
  grow: { flexGrow: "x1iyjqo2", $$css: true },
  justifyContentStart: { justifyContent: "x1nhvcw1", $$css: true },
  paint: { backgroundColor: "x1eb86dx", $$css: true },
  profile: { paddingEnd: "x1sxyh0", paddingStart: "x1nvil2r", $$css: true },
  root: {
    alignItems: "x1h91t0o",
    alignSelf: "xkh2ocl",
    display: "x78zum5",
    flexDirection: "xdt5ytf",
    justifyContent: "x13a6bvl",
    maxWidth: "x193iq5w",
    $$css: true,
  },
  selfCentered: { alignSelf: "xamitd3", $$css: true },
  shrinkwrap: { flexGrow: "x1c4vz4f", $$css: true },
  spacer: { flexBasis: "x1r8uery", flexGrow: "x1iyjqo2", $$css: true },
  vr: { backgroundColor: "x1eb86dx", width: "xh8yej3", $$css: true },
  withGutters: { paddingEnd: "xe53cfu", paddingStart: "xrgni87", $$css: true },
};

function MWPMessageListColumn({
  bubble,
  centered,
  children,
  grow,
  justifyContent,
  paint,
  profile,
  selfCentered,
  shrinkwrap,
  withGutters,
}) {
  return (
    <html.div
      role="none"
      style={[
        styles.root,
        grow ? styles.grow : undefined,
        shrinkwrap ? styles.shrinkwrap : undefined,
        paint ? styles.paint : undefined,
        profile ? styles.profile : undefined,
        withGutters ? styles.withGutters : undefined,
        bubble ? styles.bubble : undefined,
        centered ? styles.centered : undefined,
        selfCentered ? styles.selfCentered : undefined,
        justifyContent === "flex-start"
          ? styles.justifyContentStart
          : undefined,
      ]}
    >
      {children}
    </html.div>
  );
}

MWPMessageListColumn.displayName = "MWPMessageListColumn";

function MWPMessageListColumnWithGutters({
  children,
  grow = false,
  paint = true,
  shrinkwrap = false,
}) {
  return (
    <MWPMessageListColumn
      grow={grow}
      paint={paint}
      shrinkwrap={shrinkwrap}
      withGutters
    >
      {children}
    </MWPMessageListColumn>
  );
}

MWPMessageListColumnWithGutters.displayName = "MWPMessageListColumnWithGutters";

function MWPMessageListColumnProfile({
  children,
  selfCentered = false,
  paint = true,
  shrinkwrap = true,
}) {
  return (
    <MWPMessageListColumn
      paint={paint}
      profile
      shrinkwrap={shrinkwrap}
      selfCentered={selfCentered}
    >
      {children}
    </MWPMessageListColumn>
  );
}

MWPMessageListColumnProfile.displayName = "MWPMessageListColumnProfile";

function MWPMessageListColumnShrinkwrap({
  children,
  centered = false,
  paint = true,
}) {
  return (
    <MWPMessageListColumn centered={centered} paint={paint} shrinkwrap>
      {children}
    </MWPMessageListColumn>
  );
}

MWPMessageListColumnShrinkwrap.displayName = "MWPMessageListColumnShrinkwrap";

function MWPMessageListColumnGrow({ children, paint = true }) {
  return (
    <MWPMessageListColumn grow paint={paint}>
      {children}
    </MWPMessageListColumn>
  );
}

MWPMessageListColumnGrow.displayName = "MWPMessageListColumnGrow";

function MWPMessageListColumnGrowJustified({ children, paint = true }) {
  return (
    <MWPMessageListColumn grow justifyContent="flex-start" paint={paint}>
      {children}
    </MWPMessageListColumn>
  );
}

MWPMessageListColumnGrowJustified.displayName =
  "MWPMessageListColumnGrowJustified";

function MWPMessageListColumnBubble({ children, paint = true }) {
  return (
    <MWPMessageListColumn bubble paint={paint}>
      {children}
    </MWPMessageListColumn>
  );
}

MWPMessageListColumnBubble.displayName = "MWPMessageListColumnBubble";

function MWPMessageListColumnHorizontalSpacer() {
  return <div role="none" style={styles.spacer} />;
}

MWPMessageListColumnHorizontalSpacer.displayName =
  "MWPMessageListColumnHorizontalSpacer";

function MWPMessageListColumnVerticalRhythm({ height }) {
  return <div role="none" style={[styles.vr, styles.customHeight(height)]} />;
}

MWPMessageListColumnVerticalRhythm.displayName =
  "MWPMessageListColumnVerticalRhythm";

export {
  MWPMessageListColumnBubble,
  MWPMessageListColumnGrow,
  MWPMessageListColumnGrowJustified,
  MWPMessageListColumnHorizontalSpacer,
  MWPMessageListColumnProfile,
  MWPMessageListColumnShrinkwrap,
  MWPMessageListColumnVerticalRhythm,
  MWPMessageListColumnWithGutters,
};
