/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { html } from "react-strict-dom";

import { getMWXBubbleCornerStyles } from "./MWXMessageBubbleCornerStyles";
import { XMA_LAYOUTS } from "./xmaLayouts";
import { isWeb } from "./XPlatReactEnvironment";

const styles = {
  precedes_xma: {
    boxSizing: "x9f619",
    maxWidth: "xw5ewwj",
    width: "xh8yej3",
    $$css: true,
  },
  precedes_xma_web: {
    maxWidth: "x16it46q",
    width: "xh8yej3",
    $$css: true,
  },
  bubble: {
    color: "x14ctfv",
    maxWidth: "x1okitfd",
    outline: "x1k4qllp",
    overflowX: "x6ikm8r",
    overflowY: "x10wlt62",
    paddingTop: "xerhiuh",
    paddingBottom: "x1pn3fxy",
    paddingStart: "x12xxe5f",
    paddingLeft: null,
    paddingRight: null,
    paddingEnd: "x1szedp3",
    position: "x1n2onr6",
    zIndex: "x1vjfegm",
    $$css: true,
  },
  bubbleWeb: {
    overflowWrap: "x1mzt3pk",
    wordBreak: "x13faqbe",
    $$css: true,
  },
  clip: {
    overflowX: "x6ikm8r",
    overflowY: "x10wlt62",
    $$css: true,
  },
};

const incomingStyles = {
  background: {
    backgroundColor: "x1xr0vuk",
    borderTopColor: "x1jm4cbz",
    borderEndColor: "x1lmq8lz",
    borderBottomColor: "xrrpcnn",
    borderStartColor: "x1xtl47e",
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "x19livfd",
    borderEndWidth: "x2t687o",
    borderBottomWidth: "x3p3xfz",
    borderStartWidth: "x5od304",
    $$css: true,
  },
  opaque: {
    outline: "x1ucz5p",
    $$css: true,
  },
};

const outgoingStyles = {
  background: {
    backgroundColor: "x11jlvup",
    borderTopColor: "xpmdkuv",
    borderEndColor: "x154zaqr",
    borderBottomColor: "x12z03op",
    borderStartColor: "xyhp3ou",
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "x12lizq0",
    borderEndWidth: "xf766zg",
    borderBottomWidth: "x1ybe9c6",
    borderStartWidth: "x1ts5dru",
    $$css: true,
  },
  opaque: {
    backgroundAttachment: "x1nr1p0w",
    backgroundImage: "xl54vp5",
    outline: "x1ucz5p",
    $$css: true,
  },
};

const defaultStyles = {
  background: {
    backgroundColor: "x1m3w7tb",
    borderTopColor: "x1jm4cbz",
    borderEndColor: "x1lmq8lz",
    borderBottomColor: "xrrpcnn",
    borderStartColor: "x1xtl47e",
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "x19livfd",
    borderEndWidth: "x2t687o",
    borderBottomWidth: "x3p3xfz",
    borderStartWidth: "x5od304",
    $$css: true,
  },
  opaque: {
    outline: "x1ucz5p",
    $$css: true,
  },
};

const MDSSolidMessageBubble = ({
  align,
  children,
  color,
  connectBottom,
  connectTop,
  xmaLayout = XMA_LAYOUTS.DEFAULT,
  xstyle,
  precedesXMA,
  testid,
  variant,
}) => {
  const flatten =
    xmaLayout !== XMA_LAYOUTS.UNIFIED_LAYOUT && precedesXMA === true;
  const bubbleCornerStyles = getMWXBubbleCornerStyles({
    align,
    connectBottom,
    connectTop,
    flatten: flatten ? "bottom" : "none",
  });
  const bubbleStyles =
    color === "incoming"
      ? incomingStyles
      : color === "outgoing"
      ? outgoingStyles
      : defaultStyles;

  return (
    <html.div
      style={[styles.clip, flatten && isWeb && styles.precedes_xma_web]}
    >
      <html.div
        data-testid={testid}
        role="none"
        style={[
          styles.bubble,
          isWeb && styles.bubbleWeb,
          flatten && styles.precedes_xma,
          flatten && isWeb && styles.precedes_xma_web,
          bubbleStyles.background,
          variant === "opaque" && bubbleStyles.opaque,
          bubbleCornerStyles,
          xstyle,
        ]}
      >
        {children}
      </html.div>
    </html.div>
  );
};

MDSSolidMessageBubble.displayName = `${MDSSolidMessageBubble.name}`;

export default MDSSolidMessageBubble;
