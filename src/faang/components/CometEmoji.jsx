/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { html } from "react-strict-dom";

import CometImage from "./CometImage.react";
import FBEmojiResource from "./FBEmojiResource";

const styles = {
  root: {
    display: "x3nfvp2",
    fontStyle: "x1j61x8r",
    fontWeight: "x1fcty0u",
    marginTop: "xdj266r",
    marginBottom: "xat24cr",
    marginStart: "xgzva0m",
    marginLeft: null,
    marginRight: null,
    marginEnd: "xhhsvwb",
    verticalAlign: "xxymvpz",
    $$css: true,
  },
  size10: { height: "x170jfvy", width: "x1fsd2vl", $$css: true },
  size12: { height: "x1kpxq89", width: "xsmyaan", $$css: true },
  size128: { height: "x1nbnut7", width: "x2pejg6", $$css: true },
  size16: { height: "xlup9mm", width: "x1kky2od", $$css: true },
  size18: { height: "xmix8c7", width: "x1xp8n7a", $$css: true },
  size20: { height: "x1qx5ct2", width: "xw4jnvo", $$css: true },
  size24: { height: "xxk0z11", width: "xvy4d1p", $$css: true },
  size28: { height: "x1fgtraw", width: "xgd8bvy", $$css: true },
  size30: { height: "x1gnnpzl", width: "x1849jeq", $$css: true },
  size32: { height: "x10w6t97", width: "x1td3qas", $$css: true },
  size40: { height: "x1vqgdyp", width: "x100vrsf", $$css: true },
  size48: { height: "xsdox4t", width: "x1useyqa", $$css: true },
  size56: { height: "xnnlda6", width: "x15yg21f", $$css: true },
  size8: { height: "xdk7pt", width: "x1xc55vz", $$css: true },
};

function CometEmoji({ emoji, resource, size = 16, testid }) {
  const emojiResource = resource || FBEmojiResource.fromCodepoints(emoji);
  const imageURL =
    emojiResource !== null ? emojiResource.getImageURL(size) : null;
  const emojiText = emoji.join("");

  return imageURL === null || imageURL === "" ? (
    <html.span style={styles.root}>{emojiText}</html.span>
  ) : (
    <html.span
      data-testid={testid}
      style={[
        styles.root,
        size === 8 && styles.size8,
        size === 10 && styles.size10,
        size === 12 && styles.size12,
        size === 16 && styles.size16,
        size === 18 && styles.size18,
        size === 20 && styles.size20,
        size === 24 && styles.size24,
        size === 28 && styles.size28,
        size === 30 && styles.size30,
        size === 32 && styles.size32,
        size === 40 && styles.size40,
        size === 48 && styles.size48,
        size === 56 && styles.size56,
        size === 128 && styles.size128,
      ]}
    >
      <CometImage alt={emojiText} height={size} src={imageURL} width={size} />
    </html.span>
  );
}

CometEmoji.displayName = `${CometEmoji.name} [from ${__filename}]`;

export default CometEmoji;
