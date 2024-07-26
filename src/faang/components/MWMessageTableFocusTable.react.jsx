/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { CometKeys } from "CometKeys";
import emptyFunction from "emptyFunction";
import { _ as fbt } from "fbt";
import { createFocusTable } from "FocusTable.react";

const SCOPE_ID = "messages_table";

const scopeQuery = (element, key, event) => {
  return element.getAttribute("data-scope") === SCOPE_ID;
};

const FocusTable = createFocusTable(scopeQuery);

const commandConfigs = [
  {
    command: { key: CometKeys.UP },
    description: fbt._("__JHASH__HYvhkJNYo2M__JHASH__"),
    handler: emptyFunction,
  },
  {
    command: { key: CometKeys.DOWN },
    description: fbt._("__JHASH__6tFY25IlnV4__JHASH__"),
    handler: emptyFunction,
  },
  {
    command: { key: CometKeys.LEFT },
    description: fbt._("__JHASH__6tFY25IlnV4__JHASH__"),
    handler: emptyFunction,
  },
  {
    command: { key: CometKeys.RIGHT },
    description: fbt._("__JHASH__HYvhkJNYo2M__JHASH__"),
    handler: emptyFunction,
  },
];

export { commandConfigs, FocusTable, SCOPE_ID as scopeID, scopeQuery };
