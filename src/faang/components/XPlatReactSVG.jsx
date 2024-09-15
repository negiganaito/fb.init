/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

const Svg = (props) => {
  const { children, title, ...rest } = props;
  return (
    <svg {...rest}>
      {title !== null && <title>{title}</title>}
      {children}
    </svg>
  );
};

Svg.displayName = "Svg [from " + __filename + "]";

const Defs = ({ children }) => <defs>{children}</defs>;
Defs.displayName = "Defs [from " + __filename + "]";

const Path = (props) => <path {...props} />;
Path.displayName = "Path [from " + __filename + "]";

const Circle = (props) => <circle {...props} />;
Circle.displayName = "Circle [from " + __filename + "]";

const Ellipse = (props) => <ellipse {...props} />;
Ellipse.displayName = "Ellipse [from " + __filename + "]";

const ClipPath = (props) => <clipPath {...props} />;
ClipPath.displayName = "ClipPath [from " + __filename + "]";

const G = (props) => <g {...props} />;
G.displayName = "G [from " + __filename + "]";

const LinearGradient = (props) => <linearGradient {...props} />;
LinearGradient.displayName = "LinearGradient [from " + __filename + "]";

const RadialGradient = (props) => <radialGradient {...props} />;
RadialGradient.displayName = "RadialGradient [from " + __filename + "]";

const Pattern = (props) => <pattern {...props} />;
Pattern.displayName = "Pattern [from " + __filename + "]";

const Rect = (props) => <rect {...props} />;
Rect.displayName = "Rect [from " + __filename + "]";

const Use = (props) => <use {...props} />;
Use.displayName = "Use [from " + __filename + "]";

const Stop = (props) => <stop {...props} />;
Stop.displayName = "Stop [from " + __filename + "]";

const Mask = (props) => <mask {...props} />;
Mask.displayName = "Mask [from " + __filename + "]";

export {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Mask,
  Path,
  Pattern,
  RadialGradient,
  Rect,
  Stop,
  Svg,
  Use,
};
