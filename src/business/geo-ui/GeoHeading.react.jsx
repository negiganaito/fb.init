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
import React, { forwardRef } from "react";

import GeoBaseText from "./GeoBaseText.react";
import { makeGeoComponent } from "./GeoPrivateMakeComponent";
import { mapHeadingLevelToSize } from "./GeoTextUtils";

const GeoHeading = forwardRef(
  (
    {
      children,
      display = "block",
      level,
      textAlign = "start",
      whiteSpace = "inherit",
      ...props
    },
    ref
  ) => {
    return (
      <GeoBaseText
        color="heading"
        display={display}
        ref={ref}
        size={mapHeadingLevelToSize(level)}
        textAlign={textAlign}
        whiteSpace={whiteSpace}
        {...props}
      >
        {children}
      </GeoBaseText>
    );
  }
);

GeoHeading.displayName = `GeoHeading [from ${__filename}]`;

const GeoHeadingComponent = makeGeoComponent("GeoHeading", GeoHeading);
export default GeoHeadingComponent;
