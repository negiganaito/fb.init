/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import useCurrentDisplayMode from "../../hooks/useCurrentDisplayMode";

import BaseGlimmer from "./BaseGlimmer";

const styles = {
  dark: { backgroundColor: "xhzw6zf" },
  light: { backgroundColor: "x1vtvx1t" },
};

const FDSGlimmer = (props) => {
  const { xstyle, ...rest } = props;
  const displayMode = useCurrentDisplayMode();
  return (
    <BaseGlimmer
      xstyle={[displayMode === "dark" ? styles.dark : styles.light, xstyle]}
      {...rest}
    />
  );
};

FDSGlimmer.displayName = FDSGlimmer.name + " [from " + module.id + "]";
export default FDSGlimmer;
