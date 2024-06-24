/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import stylex from "stylex";

import webFlexbox from "../helpers/webFlexbox";
import webFlexItem from "../helpers/webFlexItem";

import { makeGeoComponent } from "./GeoPrivateMakeComponent";

const GeoFlexbox = ({
  accessibilityRole,
  alignContent,
  alignItems,
  alignSelf,
  basis,
  children,
  columnGap,
  containerRef,
  "data-testid": dataTestId,
  direction,
  display = "flex",
  element: Element = "div",
  gap,
  grow,
  justifyContent,
  order,
  rowGap,
  shrink,
  style,
  wrap,
  xstyle,
  ...rest
}) => {
  const className = stylex(
    webFlexbox({
      alignContent,
      alignItems,
      direction,
      display,
      gap,
      justifyContent,
      wrap,
      rowGap,
      columnGap,
    }),
    webFlexItem({
      alignSelf,
      basis,
      grow,
      order,
      shrink,
    }),
    xstyle
  );

  return (
    <Element
      className={className}
      data-testid={undefined}
      ref={containerRef}
      role={accessibilityRole}
      style={style}
      {...rest}
    >
      {children}
    </Element>
  );
};

GeoFlexbox.displayName = `${GeoFlexbox.name}`;

export default makeGeoComponent("GeoFlexbox", GeoFlexbox);
