/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useContext } from "react";
import { stylex } from "@stylexjs/stylex";

import BaseContextualLayerOrientationContext from "../../context/BaseContextualLayerOrientationContext";
import FDSPopoverContainerPaddingContext from "../../context/FDSPopoverContainerPaddingContext";

const styles = {
  padding: {
    paddingStart: "x1swvt13",
    paddingEnd: "x1pi30zi",
    paddingTop: "xyamay9",
    paddingBottom: "x1l90r2v",
    ,
  },
  root: {
    backgroundColor: "x1jx94hy",
    borderTopColor: "xwtykhg",
    borderEndColor: "xl6askr",
    borderBottomColor: "x1sa2p9j",
    borderStartColor: "x8s7dd",
    borderTopStartRadius: "x1qpq9i9",
    borderTopEndRadius: "xdney7k",
    borderBottomEndRadius: "xu5ydu1",
    borderBottomStartRadius: "xt3gfkd",
    borderTopStyle: "x18runqf",
    borderEndStyle: "x1cur4ig",
    borderBottomStyle: "xgfcmlh",
    borderStartStyle: "x1rjs6j1",
    borderTopWidth: "x4ruge8",
    borderEndWidth: "x9h15zd",
    borderBottomWidth: "x8ro2h5",
    borderStartWidth: "x1x16y7e",
    boxShadow: "x8ii3r7",
    boxSizing: "x9f619",
    overflowX: "x6ikm8r",
    overflowY: "x10wlt62",
    ,
  },
};

const arrowStyles = {
  above: {
    end: { borderBottomEndRadius: "x5pf9jr",  },
    middle: {  },
    start: { borderBottomStartRadius: "xo71vjh",  },
    stretch: {  },
  },
  below: {
    end: { borderTopEndRadius: "x13lgxp2",  },
    middle: {  },
    start: { borderTopStartRadius: "x168nmei",  },
    stretch: {  },
  },
  end: {
    end: { borderBottomStartRadius: "xo71vjh",  },
    middle: {  },
    start: { borderTopStartRadius: "x168nmei",  },
    stretch: {  },
  },
  start: {
    end: { borderBottomEndRadius: "x5pf9jr",  },
    middle: {  },
    start: { borderTopEndRadius: "x13lgxp2",  },
    stretch: {  },
  },
};

function getArrowStyle(position, align) {
  return arrowStyles[position]?.[align] || {};
}

const FDSPopoverContainer = React.forwardRef((props, ref) => {
  const { children, withArrow } = props;
  const { align, position } = useContext(BaseContextualLayerOrientationContext);
  const hasPadding = useContext(FDSPopoverContainerPaddingContext);

  return (
    <div
      {...stylex.props(
        styles.root,
        hasPadding && styles.padding,
        withArrow === true && getArrowStyle(position, align)
      )}
      ref={ref}
    >
      {children}
    </div>
  );
});

FDSPopoverContainer.displayName = `${FDSPopoverContainer.name} [from ${__filename}]`;

export default FDSPopoverContainer;
