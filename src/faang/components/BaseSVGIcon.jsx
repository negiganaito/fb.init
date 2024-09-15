/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useContext } from "react";
import stylex from "@stylexjs/stylex";

import BaseIsDecorativeContext from "../../context/BaseIsDecorativeContext";

const styles = {
  color: (color) => [
    { color: "x19dipnz",  },
    { "--color": color !== null ? color : "initial" },
  ],
};

const BaseSVGIcon = ({ alt, color, icon: IconComponent, size = 8, xstyle }) => {
  const isDecorativeContext = useContext(BaseIsDecorativeContext);
  const isDecorative =
    alt === "" && isDecorativeContext === true ? true : undefined;

  return (
    <IconComponent
      aria-hidden={isDecorative}
      height={size}
      title={alt === null || alt === "" ? undefined : alt}
      width={size}
      {...stylex.props([color !== null && styles.color(color), xstyle])}
    />
  );
};

BaseSVGIcon.displayName = `${BaseSVGIcon.name}`;

export default BaseSVGIcon;
