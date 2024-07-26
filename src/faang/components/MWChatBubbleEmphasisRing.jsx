/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import BaseThemeProvider from "BaseThemeProvider.react";
import gkx from "gkx";
import stylex from "stylex";

// const emphasisStyles = {
//   borderRadius: 22,
//   borderStyle: "solid",
//   borderWidth: 2,
//   content: "''",
//   display: "block",
//   pointerEvents: "none",
//   position: "absolute",
//   zIndex: 1,
// };

const styles = {
  emphasis_animation: {
    animationDelay: "x1t83zlg",
    animationDuration: "xxkxylk",
    animationIterationCount: "x1v7wizp",
    animationName: "x1yrix95",
    animationTimingFunction: "x4hg4is",
    $$css: true,
  },
  emphasis_ring: {
    backgroundColor: "xjbqb8w",
    borderTopColor: "x1v8p93f",
    borderEndColor: "xogb00i",
    borderBottomColor: "x16stqrj",
    borderStartColor: "x1ftr3km",
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "x1gp4ovq",
    borderEndWidth: "xdio9jc",
    borderBottomWidth: "x1h2mt7u",
    borderStartWidth: "x7g060r",
    display: "x78zum5",
    maxWidth: "x1hvl878",
    position: "x1n2onr6",
    "::after_borderTopStartRadius": "xquudas",
    "::after_borderTopEndRadius": "x6p43zf",
    "::after_borderBottomEndRadius": "x1wnhr99",
    "::after_borderBottomStartRadius": "x1gquc79",
    "::after_borderTopStyle": "xynf4tj",
    "::after_borderEndStyle": "xdspwft",
    "::after_borderBottomStyle": "x1r9ni5o",
    "::after_borderStartStyle": "x1d52zm6",
    "::after_borderTopWidth": "x31ga2r",
    "::after_borderEndWidth": "xcmxnv6",
    "::after_borderBottomWidth": "x13afdcp",
    "::after_borderStartWidth": "x10va8jt",
    "::after_content": "x1s928wv",
    "::after_display": "xhkezso",
    "::after_pointerEvents": "x2q1x1w",
    "::after_position": "x1j6awrg",
    "::after_zIndex": "xitxdhh",
    "::after_borderTopColor": "x1yzler7",
    "::after_borderEndColor": "xh3oo2y",
    "::after_borderBottomColor": "xxqiif8",
    "::after_borderStartColor": "xrh6a5",
    "::after_bottom": "xdb1ctf",
    "::after_end": "x4bhatf",
    "::after_left": null,
    "::after_right": null,
    "::after_start": "xhg89tr",
    "::after_top": "x7kqs8i",
    "::before_borderTopStartRadius": "x2e93ah",
    "::before_borderTopEndRadius": "xigdz7j",
    "::before_borderBottomEndRadius": "x1vxwiij",
    "::before_borderBottomStartRadius": "xfgw0w6",
    "::before_borderTopStyle": "xnvurfn",
    "::before_borderEndStyle": "xv1ta3e",
    "::before_borderBottomStyle": "x1opv7go",
    "::before_borderStartStyle": "x1dtnpoi",
    "::before_borderTopWidth": "x1b8stmw",
    "::before_borderEndWidth": "xyhsekn",
    "::before_borderBottomWidth": "xmbliey",
    "::before_borderStartWidth": "x1igdxxj",
    "::before_content": "x1cpjm7i",
    "::before_display": "x1fgarty",
    "::before_pointerEvents": "xkk1bqk",
    "::before_position": "x1hmns74",
    "::before_zIndex": "x12maryy",
    "::before_borderTopColor": "xtei6gu",
    "::before_borderEndColor": "x1nwru9p",
    "::before_borderBottomColor": "xxs4umj",
    "::before_borderStartColor": "xg8j718",
    "::before_bottom": "xe80sof",
    "::before_end": "x105ji64",
    "::before_left": null,
    "::before_right": null,
    "::before_opacity": "x1u3qutx",
    "::before_start": "xbs7dl3",
    "::before_top": "x51xajf",
    $$css: true,
  },
  emphasis_ring_before_xma: {
    borderBottomStyle: "x1sy0etr",
    "::after_borderBottom": "x1bxl7c5",
    "::after_borderBottomEndRadius": "x1qo8dsh",
    "::after_borderBottomStartRadius": "x1oiup0q",
    "::before_borderBottom": "xozyfcf",
    "::before_borderBottomEndRadius": "x1nxuetn",
    "::before_borderBottomStartRadius": "x1doa7m0",
    $$css: true,
  },
  emphasis_ring_connect_bottom_incoming: {
    "::after_borderBottomStartRadius": "x1573djm",
    "::before_borderBottomStartRadius": "x106tphz",
    $$css: true,
  },
  emphasis_ring_connect_bottom_outgoing: {
    "::after_borderBottomEndRadius": "x1nb2ndt",
    "::before_borderBottomEndRadius": "x7ft4bm",
    $$css: true,
  },
  emphasis_ring_connect_top_incoming: {
    "::after_borderTopStartRadius": "x14nzmgs",
    "::before_borderTopStartRadius": "x58eeit",
    $$css: true,
  },
  emphasis_ring_connect_top_outgoing: {
    "::after_borderTopEndRadius": "xe41ffp",
    "::before_borderTopEndRadius": "x1cbhpwz",
    $$css: true,
  },
  emphasis_ring_xma: {
    borderTopStyle: "x1ejq31n",
    width: "x1o2z316",
    "::after_borderTop": "x12dgpll",
    "::after_borderTopEndRadius": "x1utvphz",
    "::after_borderTopStartRadius": "x17dqjr0",
    "::before_borderTop": "xp2bjph",
    "::before_borderTopEndRadius": "xajc7s",
    "::before_borderTopStartRadius": "x1eo7yr1",
    $$css: true,
  },
};

const variables = {
  "chat-outgoing-message-background-gradient": "none",
  "chat-outgoing-message-bubble-background-color":
    "var(--mwp-primary-theme-color)",
};

const themeConfig = {
  dark: variables,
  light: variables,
  type: "VARIABLES",
};

const MWChatBubbleEmphasisRing = ({
  hasXMA,
  children,
  connectBottom,
  connectTop,
  outgoing,
  precedesXMA,
}) => {
  const connectTopStyle = outgoing
    ? styles.emphasis_ring_connect_top_outgoing
    : styles.emphasis_ring_connect_top_incoming;
  const connectBottomStyle = outgoing
    ? styles.emphasis_ring_connect_bottom_outgoing
    : styles.emphasis_ring_connect_bottom_incoming;

  const ringStyles = [
    gkx("3638") && styles.emphasis_animation,
    styles.emphasis_ring,
    precedesXMA && styles.emphasis_ring_before_xma,
    connectBottom && connectBottomStyle,
    connectTop && (hasXMA ? styles.emphasis_ring_xma : connectTopStyle),
  ];

  return (
    <BaseThemeProvider config={themeConfig}>
      {(themeClassName, themeStyle) => (
        <div
          className={stylex(ringStyles, themeClassName)}
          data-testid={undefined}
          style={themeStyle}
        >
          {children}
        </div>
      )}
    </BaseThemeProvider>
  );
};

MWChatBubbleEmphasisRing.displayName =
  MWChatBubbleEmphasisRing.name + " [from " + MWChatBubbleEmphasisRing.id + "]";

export default MWChatBubbleEmphasisRing;
