/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { html } from "react-strict-dom";

import CometProgressRingIndeterminate from "./CometProgressRingIndeterminate";

const styles = {
  root: {
    alignItems: "x6s0dn4",
    display: "x78zum5",
    height: "xnnlda6",
    justifyContent: "xl56j7k",
    minWidth: "x53cq04",
    width: "xh8yej3",
    ,
  },
};

const FDSPopoverLoadingStateContent = (props) => {
  const { xstyle } = props;

  return (
    <html.div style={[styles.root, xstyle]}>
      <CometProgressRingIndeterminate color="disabled" size={24} />
    </html.div>
  );
};

FDSPopoverLoadingStateContent.displayName = `${FDSPopoverLoadingStateContent.name} [from ${module.id}]`;

export default FDSPopoverLoadingStateContent;
