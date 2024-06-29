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

import useGeoTheme from "../hooks/useGeoTheme";

import GeoFlexbox from "./GeoFlexbox.react";
import { makeGeoComponent } from "./GeoPrivateMakeComponent";

const GeoVStack = ({
  alignItems = null,
  containerRef,
  context = "component",
  direction = "column",
  display = "flex",
  grow = 1,
  relation = "unrelated",
  shrink = 1,
  xstyle,
  ...rest
}) => {
  const theme = useGeoTheme();
  const layoutSpacing = theme.selectLayoutSpacing({
    context,
    relation,
    direction: direction === "column" ? "vertical" : "vertical-reverse",
  });

  return (
    <GeoFlexbox
      alignItems={alignItems}
      containerRef={containerRef}
      direction={direction}
      display={display}
      grow={grow}
      shrink={shrink}
      wrap="nowrap"
      xstyle={[layoutSpacing, xstyle]}
      {...rest}
    />
  );
};

GeoVStack.displayName = `${GeoVStack.name}`;

export default makeGeoComponent("GeoVStack", GeoVStack);
