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

const GeoBaseSpacingLayout = ({
  align = "center",
  containerRef,
  context = "component",
  direction = "horizontal",
  grow = "fill",
  relation = "unrelated",
  wrap = false,
  xstyle,
  ...rest
}) => {
  const theme = useGeoTheme();
  const layoutSpacing = theme.selectLayoutSpacing({
    context,
    relation,
    direction,
  });

  return (
    <GeoFlexbox
      alignItems={align}
      containerRef={containerRef}
      direction={direction === "horizontal" ? "row" : "column"}
      display={grow === "auto" ? "inline-flex" : "flex"}
      grow={grow === "auto" ? 0 : 1}
      wrap={wrap ? "wrap" : "nowrap"}
      xstyle={[layoutSpacing, xstyle]}
      {...rest}
    />
  );
};

GeoBaseSpacingLayout.displayName = "GeoBaseSpacingLayout";

export default makeGeoComponent("GeoBaseSpacingLayout", GeoBaseSpacingLayout);
