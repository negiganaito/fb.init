/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import fbt from "fbt";

import CometComponentWithKeyCommands from "./CometComponentWithKeyCommands";
import CometKeys from "./CometKeys";
import { createFocusGroup } from "./FocusGroup";
import { tabbableScopeQuery } from "./focusScopeQueries";

const [FocusGroup, FocusItem] = createFocusGroup(tabbableScopeQuery);

const BaseMenuFocusGroup = (props) => {
  const commandConfigs = [
    {
      command: { key: CometKeys.UP },
      description: fbt._("__JHASH__1VqMgLPpraa__JHASH__"),
      handler: () => {},
    },
    {
      command: { key: CometKeys.DOWN },
      description: fbt._("__JHASH__7zajSsSIBFZ__JHASH__"),
      handler: () => {},
    },
  ];

  return (
    <CometComponentWithKeyCommands commandConfigs={commandConfigs}>
      <FocusGroup {...props} />
    </CometComponentWithKeyCommands>
  );
};

BaseMenuFocusGroup.displayName = `${BaseMenuFocusGroup.name} [from ${module.id}]`;

export { FocusGroup, FocusItem };
export default BaseMenuFocusGroup;
