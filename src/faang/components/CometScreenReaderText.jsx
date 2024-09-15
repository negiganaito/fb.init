/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import BaseViewReact from "./BaseView.react";

const styles = {
  visuallyHidden: {
    clip: "xzpqnlu",
    clipPath: "x1hyvwdk",
    fontSize: "x14bfe9o",
    height: "xjm9jq1",
    overflowX: "x6ikm8r",
    overflowY: "x10wlt62",
    position: "x10l6tqk",
    width: "x1i1rx1s",
    ,
  },
};

const CometScreenReaderText = ({ text, ...props }) => {
  return (
    <BaseViewReact {...props} xstyle={styles.visuallyHidden}>
      {text}
    </BaseViewReact>
  );
};

CometScreenReaderText.displayName = `CometScreenReaderText`;

export default CometScreenReaderText;
