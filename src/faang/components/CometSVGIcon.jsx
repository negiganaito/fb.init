/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useContext, useId } from "react";
import stylex from "@stylexjs/stylex";

import BaseIsDecorativeContext from "../../context/BaseIsDecorativeContext";
import useCometIconColors from "../../hooks/useCometIconColors";

import BaseSVGIcon from "./BaseSVGIcon";

const styles = {
  color: (color) => [
    { color: "x19dipnz",  },
    { "--color": color !== null ? color : "initial" },
  ],
  icon: {
    display: "x1lliihq",
    forcedColorAdjust: "x1tzjh5l",
    transitionDuration: "x1k90msu",
    transitionProperty: "x2h7rmj",
    transitionTimingFunction: "x1qfuztq",
    ,
  },
  inline: { display: "x1rg5ohu",  },
  shadow: { filter: "x1ssd25i",  },
};

const CometSVGIcon = (props) => {
  const id = useId();
  const cometIconColors = useCometIconColors();
  const isDecorativeContext = useContext(BaseIsDecorativeContext);
  const isDecorative = isDecorativeContext === true ? true : undefined;

  if (props.viewBox === undefined) {
    const {
      alt,
      color,
      component,
      inline = false,
      shadow = false,
      size,
    } = props;
    return (
      <BaseSVGIcon
        alt={alt}
        color={cometIconColors[color]}
        icon={component}
        size={size}
        xstyle={[styles.icon, inline && styles.inline, shadow && styles.shadow]}
      />
    );
  } else {
    const {
      children,
      color,
      inline = false,
      shadow = false,
      size,
      ...rest
    } = props;
    const defsChildren = [];
    let fillUrl;
    if (
      color !== null &&
      typeof color !== "string" &&
      React.isValidElement(color)
    ) {
      defsChildren.push(
        React.cloneElement(color, {
          id,
          key: "1",
          suppressHydrationWarning: true,
        })
      );
      fillUrl = `url(#${id})`;
    }

    return (
      <svg
        {...rest}
        {...stylex.props([
          styles.icon,
          inline && styles.inline,
          shadow && styles.shadow,
          typeof color === "string" && styles.color(cometIconColors[color]),
        ])}
        aria-hidden={isDecorative}
        fill={fillUrl !== null ? fillUrl : "currentColor"}
        height={size}
        width={size}
      >
        {defsChildren.length > 0 && <defs>{defsChildren}</defs>}
        {children}
      </svg>
    );
  }
};

CometSVGIcon.displayName = `${CometSVGIcon.name}`;

export default CometSVGIcon;
