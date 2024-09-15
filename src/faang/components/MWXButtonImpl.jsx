/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";

import CometProgressRingIndeterminate from "./CometProgressRingIndeterminate";
import FDSButton from "./FDSButton";

const MWXButtonImpl = forwardRef((props, ref) => {
  const { icon, loading, size, type, ...rest } = props;
  const isLargeSize = size === 36;

  if (FDSButton) {
    return (
      <FDSButton
        addOnPrimary={
          loading && CometProgressRingIndeterminate ? (
            <CometProgressRingIndeterminate
              color="disabled"
              size={isLargeSize ? 20 : 16}
            />
          ) : undefined
        }
        icon={icon?.component}
        ref={ref}
        size={isLargeSize ? "large" : "medium"}
        type={type === "destructive" ? "fdsOverride_negative" : type}
        {...rest}
      />
    );
  }

  return null;
});

MWXButtonImpl.displayName = `${MWXButtonImpl.name} [from ${module.id}]`;

export default MWXButtonImpl;
