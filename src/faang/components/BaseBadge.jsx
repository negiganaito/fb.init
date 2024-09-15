/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import fbt from "fbt";

// import testID from "testID";
import { CometVisualCompletionAttributes } from "../../helpers/CometVisualCompletionAttributes";
import stylex from "../../helpers/stylex";

import CometScreenReaderText from "./CometScreenReaderText";

const styles = {
  root: {
    alignItems: "x6s0dn4",
    borderTopStartRadius: "xzolkzo",
    borderTopEndRadius: "x12go9s9",
    borderBottomEndRadius: "x1rnf11y",
    borderBottomStartRadius: "xprq8jg",
    boxSizing: "x9f619",
    display: 0,
    justifyContent: "xl56j7k",
    ,
  },
};

const BaseBadge = ({
  accessibilityText,
  children,
  testid,
  xstyle,
  ...props
}) => {
  return (
    <span
      {...props}
      className={stylex([styles.root, xstyle])}
      // {...testID(testid)}
      {...CometVisualCompletionAttributes.IGNORE}
    >
      {(typeof accessibilityText === "string" ||
        fbt.isFbtInstance(accessibilityText)) && (
        <CometScreenReaderText text={accessibilityText} />
      )}
      {children}
    </span>
  );
};

BaseBadge.displayName = `${BaseBadge.name} [from ${module.id}]`;

export default BaseBadge;
