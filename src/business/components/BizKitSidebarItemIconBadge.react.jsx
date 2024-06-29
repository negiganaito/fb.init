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
import { stylex } from "@stylexjs/stylex";

import CometPlaceholder from "../../faang/components/CometPlaceholder.react";
import BizKitSidebarItemFeatureContext from "../contexts/BizKitSidebarItemFeatureContext";

const styles = {
  badge: {
    borderTopWidth: "xamhcws",
    borderEndWidth: "xol2nv",
    borderBottomWidth: "xlxy82",
    borderStartWidth: "x19p7ews",
    borderTopStartRadius: "x14yjl9h",
    borderTopEndRadius: "xudhj91",
    borderBottomEndRadius: "x18nykt9",
    borderBottomStartRadius: "xww2gxu",
    borderTopStyle: "x1ejq31n",
    borderEndStyle: "xd10rxx",
    borderBottomStyle: "x1sy0etr",
    borderStartStyle: "x17r0tee",
    transitionDuration: "x1k90msu",
    transitionTimingFunction: "x1qfuztq",
    position: "x10l6tqk",
    top: "x13vifvy",
    right: "x3m8u43",
    $$css: true,
  },
  borderActive: {
    borderTopColor: "xpkcf2w",
    borderEndColor: "xg3ouva",
    borderBottomColor: "xe5zar4",
    borderStartColor: "x1g7atq6",
    $$css: true,
  },
  borderDefault: {
    borderTopColor: "x1i42pi2",
    borderEndColor: "x15ygyjg",
    borderBottomColor: "x13ylt88",
    borderStartColor: "x1j8qwd4",
    $$css: true,
  },
  borderHovered: {
    borderTopColor: "xxau7dk",
    borderEndColor: "xfxr8ip",
    borderBottomColor: "x48f3vs",
    borderStartColor: "xb56o5k",
    $$css: true,
  },
  badgeHidden: { opacity: "xg01cxk", $$css: true },
  badgeVisible: { opacity: "x1hc1fzr", $$css: true },
};

const BizKitSidebarItemIconBadge = ({
  badge,
  isCollapsed,
  isItemActive,
  isItemHovered,
}) => {
  const featureContext = BizKitSidebarItemFeatureContext();
  const hasBadge = featureContext("hasBadge").some(
    (feature) => feature === true
  );

  if (!hasBadge) return null;

  return (
    <div
      className={stylex(
        styles.badge,
        isCollapsed && styles.badgeVisible,
        !isCollapsed && styles.badgeHidden,
        isItemActive && styles.borderActive,
        !isItemActive && isItemHovered && styles.borderHovered,
        !isItemActive && !isItemHovered && styles.borderDefault
      )}
      style={{ transitionProperty: "border-color, opacity" }}
    >
      <CometPlaceholder fallback={null}>{badge}</CometPlaceholder>
    </div>
  );
};

BizKitSidebarItemIconBadge.displayName = `${BizKitSidebarItemIconBadge.name}`;

export default BizKitSidebarItemIconBadge;
