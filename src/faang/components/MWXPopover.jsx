/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import CometPopover_DEPRECATED from "./CometPopover_DEPRECATED";

const MWXPopover = React.forwardRef((props, ref) => {
  const extendedProps = { ...props };

  if (CometPopover_DEPRECATED !== null) {
    // eslint-disable-next-line react/jsx-pascal-case
    return <CometPopover_DEPRECATED {...extendedProps} ref={ref} />;
  }

  // return Popover2457 !== null ? (
  //   <Popover2457 {...extendedProps} ref={ref} />
  // ) : null;
});

MWXPopover.displayName = `${MWXPopover.name} [from ${__filename}]`;

export default MWXPopover;
