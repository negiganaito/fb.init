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
import { useContext } from "react";
import Locale from "fbjs/lib/Locale";

import BaseContextualLayerOrientationContext from "../context/BaseContextualLayerOrientationContext";
import GeoPrivateAnimationLayerContext from "../contexts/GeoPrivateAnimationLayerContext";
import useGeoTheme from "../hooks/useGeoTheme";

const isRTL = Locale.isRTL();

function useGeoPrivateAnimationLayerStyles({ elevation }) {
  const { isAnimated, isEntered, isLeaving } = useContext(
    GeoPrivateAnimationLayerContext
  );
  const { position } = useContext(BaseContextualLayerOrientationContext);
  const { selectTransition } = useGeoTheme();

  const transition = selectTransition({
    duration: isEntered ? "short" : "extraExtraShort",
    timing: isLeaving ? "fade" : "quickMove",
  });

  const baseStyles = [
    transition,
    styles.base,
    getPositionStyles(position, elevation),
  ];
  const stateStyles = [isLeaving && styles.leave, isEntered && styles.enter];

  return isAnimated ? [...baseStyles, ...stateStyles] : null;
}

function getPositionStyles(position, elevation) {
  const elevationStyles =
    elevation === 2 ? elevationLevel2 : elevationLevelDefault;
  switch (position) {
    case "above":
      return elevationStyles.above;
    case "below":
      return elevationStyles.below;
    case "start":
      return isRTL ? elevationStyles.right : elevationStyles.left;
    case "end":
      return isRTL ? elevationStyles.left : elevationStyles.right;
    default:
      return "";
  }
}

const styles = {
  base: "xg01cxk",
  enter: "x1hc1fzr x1q2yuad",
  leave: "xg01cxk x1q2yuad",
};

const elevationLevel2 = {
  above: "xq2sdf",
  below: "x1s7amh2",
  left: "x1izqtgq",
  right: "xq5bkbf",
};

const elevationLevelDefault = {
  above: "x1rw08u",
  below: "x1v84ljc",
  left: "x1b405lz",
  right: "xwjgo6w",
};

export default useGeoPrivateAnimationLayerStyles;
