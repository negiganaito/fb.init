/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import stylex from "@stylexjs/stylex";

import BaseImage from "./BaseImage";

const CARD_WIDTH = 135;
const CARD_HEIGHT = 180;

const styles = {
  backCard: {
    borderTopStartRadius: "xfh8nwu",
    borderTopEndRadius: "xoqspk4",
    borderBottomEndRadius: "x12v9rci",
    borderBottomStartRadius: "x138vmkv",
    bottom: "x1ey2m1c",
    boxShadow: "xumrakr",
    height: "x1b51vyi",
    opacity: "xg01cxk",
    position: "x10l6tqk",
    start: "x17qophe",
    transform: "xv8dq09",
    transitionDuration: "xcuylb0",
    transitionProperty: "x6o7n8i",
    transitionTimingFunction: "x1bckuxf",
    width: "x6vytul",
    zIndex: "x1ja2u2z",
    ,
  },
  backCardVisible: {
    opacity: "x1hc1fzr",
    transform: "xwot3bk",
    ,
  },
  media: {
    backgroundColor: "xwcfey6",
    backgroundPosition: "x1xsqp64",
    backgroundSize: "x18d0r48",
    borderTopStartRadius: "xfh8nwu",
    borderTopEndRadius: "xoqspk4",
    borderBottomEndRadius: "x12v9rci",
    borderBottomStartRadius: "x138vmkv",
    objectFit: "xl1xv1r",
    ,
  },
};

const MWChatPromptFlyoutBackCard = ({ isVideo, previewUrl }) => {
  return (
    <div
      className={stylex(
        styles.backCard,
        previewUrl !== null ? styles.backCardVisible : null
      )}
    >
      {previewUrl !== null ? (
        isVideo ? (
          <video
            className="xwcfey6 x1xsqp64 x18d0r48 xfh8nwu xoqspk4 x12v9rci x138vmkv xl1xv1r"
            height={CARD_HEIGHT}
            muted
            src={previewUrl}
            width={CARD_WIDTH}
          />
        ) : (
          <BaseImage
            height={CARD_HEIGHT}
            src={previewUrl}
            width={CARD_WIDTH}
            xstyle={styles.media}
          />
        )
      ) : null}
    </div>
  );
};

MWChatPromptFlyoutBackCard.displayName = `${MWChatPromptFlyoutBackCard.name} [from ${module.id}]`;

export default MWChatPromptFlyoutBackCard;
