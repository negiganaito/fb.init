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
import React from "React";

import { CometVirtualization } from "./CometVirtualization.react";

const supportedSurfaces = ["comet_feed_unit_card", "comet_watch_tab"];
const QEX_641 = "comet_feed_unit_card";
const enabledExperiments = new Set(
  QEX_641.split(",").map((item) => item.trim())
);
enabledExperiments.add("polaris_feed_story_tray_item");

const enabledSurfaces = "all";
const pinChildrenOnInteraction = true;
const pinChildrenWithPlayer = false;
const topBottomMargin = "comet_feed_unit_card:2000";

export function parseTopBottomMargin(config) {
  const result = new Map();

  config.split(",").forEach((item) => {
    const [key, value] = item.trim().split(":");
    const margin = parseInt(value.trim(), 10);

    if (key && !isNaN(margin)) {
      result.set(key.trim(), margin);
    }
  });
  return result;
}

export default function CometHideableComponent({
  callingSurface,
  children,
  disableHidding,
  topBottomMarginOverride,
}) {
  const supportedSurfacesSet = new Set(supportedSurfaces);
  const enabledSurfacesSet = new Set(supportedSurfaces);
  //  const enabledSurfacesSet = new Set(
  //    typeof enabledSurfaces === "string"
  //      ? enabledSurfaces.split(",").map((item) => item.trim())
  //      : []
  //  );

  const shouldDisableHidding = disableHidding ?? false;
  const shouldEnableHidding =
    supportedSurfacesSet.has(callingSurface) ||
    enabledSurfacesSet.has(callingSurface);

  const gkx_221 = true;
  if (gkx_221) {
    enabledSurfacesSet.clear();
  } else {
    supportedSurfacesSet.clear();
  }

  const shouldPinChildren =
    enabledExperiments.has(callingSurface) ||
    supportedSurfacesSet.has(callingSurface);
  const topBottomMarginValue =
    topBottomMarginOverride !== undefined && topBottomMarginOverride >= 0
      ? topBottomMarginOverride
      : parseTopBottomMargin(topBottomMargin).get(callingSurface) || 0;

  enabledSurfaces.includes("all") ||
    (enabledSurfaces.split(",").includes(callingSurface) &&
      "comet_feed_unit_card");
  return (
    <CometVirtualization
      disableHidding={shouldDisableHidding || !shouldEnableHidding}
      pinChildrenOnInteraction={shouldPinChildren && pinChildrenOnInteraction}
      pinChildrenWithPlayer={pinChildrenWithPlayer}
      topBottomMargin={topBottomMarginValue}
      unmountHiddenChildren={shouldEnableHidding}
    >
      {children}
    </CometVirtualization>
  );
}
