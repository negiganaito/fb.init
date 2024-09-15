/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import stylex from "../../helpers/stylex";
import useMWPIsMessagePinned from "../../hooks/useMWPIsMessagePinned";
import usePinnedIconAnimation from "../../hooks/usePinnedIconAnimation";

import MDSPinnedMessageIcon from "./MDSPinnedMessageIcon";

const styles = {
  alignEnd: { end: "xds687c", transform: "x7b9nwf",  },
  alignStart: { start: "x17qophe", transform: "x1op1vkj",  },
  container: {
    position: "x10l6tqk",
    top: "x13vifvy",
    zIndex: "xhtitgo",
    ,
  },
};

const MWPinnedMessageOverlay = ({
  alreadyRenderedPin,
  children,
  message,
  outgoing,
}) => {
  const isPinned = useMWPIsMessagePinned(message);
  const { mountAnimation, shouldShow, unmountAnimation } =
    usePinnedIconAnimation(isPinned, outgoing);

  if (!shouldShow || alreadyRenderedPin) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return (
    children && (
      <div className="relative">
        <div
          className={stylex([
            styles.container,
            outgoing ? styles.alignEnd : styles.alignStart,
            isPinned ? mountAnimation : unmountAnimation,
          ])}
        >
          <MDSPinnedMessageIcon color="tertiary" size={16} />
        </div>
        {children}
      </div>
    )
  );
};

export default MWPinnedMessageOverlay;
