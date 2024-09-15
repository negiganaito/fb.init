/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { CometProgressRingIndeterminate } from "cr:5023";

function MWXSpinner({ color, size }) {
  if (CometProgressRingIndeterminate !== null) {
    return <CometProgressRingIndeterminate color={color} size={size} />;
  }

  return null;
}

MWXSpinner.displayName = `${MWXSpinner.name}`;

export default MWXSpinner;
