/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useContext } from "react";
import { html } from "react-strict-dom";

import FDSMenuItemBaseRoleContext from "../../context/FDSMenuItemBaseRoleContext";

const styles = {
  separator: {
    borderTopColor: "x8cjs6t",
    borderTopStyle: "x13fuv20",
    borderTopWidth: "x178xt8z",
    marginStart: "x1wyjsc1",
    marginLeft: null,
    marginRight: null,
    marginEnd: "xm8kqrv",
    marginTop: "x1xaiuri",
    marginBottom: "x1yaqywo",
    ,
  },
};

const FDSSeparatorMenuItem = forwardRef((props, ref) => {
  const { xstyle } = props;
  const role = useContext(FDSMenuItemBaseRoleContext);
  return (
    <html.div
      ref={ref}
      role={role === "menuitem" ? "separator" : "none"}
      style={[styles.separator, xstyle]}
    />
  );
});

FDSSeparatorMenuItem.displayName = `${FDSSeparatorMenuItem.name}`;

export default FDSSeparatorMenuItem;
