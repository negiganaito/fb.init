/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useMemo } from "react";
import fbt from "fbt";

import CometComponentWithKeyCommands from "./CometComponentWithKeyCommands";
import CometKeys from "./CometKeys";

const CometHideLayerOnEscape = ({
  children,
  debugName = "ModalLayer",
  onHide,
}) => {
  const commandConfigs = useMemo(
    () => [
      {
        command: { key: CometKeys.ESCAPE },
        description: fbt("__JHASH__coz4yRiHZKL__JHASH__"),
        handler: onHide,
        triggerFromInputs: true,
        triggerOnRepeats: false,
      },
    ],
    [onHide]
  );

  return (
    <CometComponentWithKeyCommands
      commandConfigs={commandConfigs}
      debugName={debugName}
      isWrapperFocusable={true}
    >
      {children}
    </CometComponentWithKeyCommands>
  );
};

CometHideLayerOnEscape.displayName = `${CometHideLayerOnEscape.name} [from ${module.id}]`;

export default CometHideLayerOnEscape;
