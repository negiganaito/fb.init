/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { html } from "react-strict-dom";

import MWXMessageBubble from "./MWXMessageBubble";
import { getMWXBubbleCornerStyles } from "./MWXMessageBubbleCornerStyles";
import MWXText from "./MWXText.react";

const styles = {
  incoming: { color: "x18lvrbx", $$css: true },
  message: {
    fontStyle: "x1k4tb9n",
    marginBottom: "x12nagc",
    marginTop: "x1gslohp",
    opacity: "x1ks1olk",
    $$css: true,
  },
  outgoing: { color: "xyk4ms5", $$css: true },
  root: {
    borderTopColor: "x2z21go",
    borderEndColor: "x7glw7h",
    borderBottomColor: "xytfwv8",
    borderStartColor: "x1c7a9eh",
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "x178xt8z",
    borderEndWidth: "xm81vs4",
    borderBottomWidth: "xso031l",
    borderStartWidth: "xy80clv",
    maxWidth: "x193iq5w",
    paddingTop: "x1y1aw1k",
    paddingEnd: "xn6708d",
    paddingBottom: "xwib8y2",
    paddingStart: "x1ye3gou",
    wordBreak: "x13faqbe",
    $$css: true,
  },
};

const MWV2TombstonedMessage = ({
  children,
  connectBottom = false,
  connectTop = false,
  isOutgoing,
  xstyle,
}) => {
  const gkx_4809 = true;
  const bubbleCornerStyles = getMWXBubbleCornerStyles({
    connectBottom,
    connectTop,
  });

  return gkx_4809 ? (
    <MWXMessageBubble align="right">
      <MWXText color={isOutgoing ? "white" : "primary"} type="body3">
        <html.div
          dir="auto"
          style={[
            styles.message,
            isOutgoing ? styles.outgoing : styles.incoming,
            xstyle,
          ]}
        >
          {children}
        </html.div>
      </MWXText>
    </MWXMessageBubble>
  ) : (
    <html.div style={[styles.root, bubbleCornerStyles, xstyle]}>
      <MWXText color="disabled" type="body3">
        <html.div style={styles.message}>{children}</html.div>
      </MWXText>
    </html.div>
  );
};

MWV2TombstonedMessage.displayName = `${MWV2TombstonedMessage.name}`;

export default MWV2TombstonedMessage;
