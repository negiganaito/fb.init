/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const getItemRoleFromCompositeRole = (role) => {
  switch (role) {
    case "grid":
      return "row";
    case "listbox":
      return "option";
    case "list":
      return "listitem";
    case "menu":
      return "menuitem";
    case "radiogroup":
      return "radio";
    case "row":
      return "gridcell";
    case "tablist":
      return "tab";
    default:
      return null;
  }
};

export default getItemRoleFromCompositeRole;
