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

import gkx from "../../helpers/gkx";

import FocusWithinHandler from "./FocusWithinHandler.react";

const styles = {
  focused: {
    outline: "x1i4iak8",
    "@media (-webkit-min-device-pixel-ratio: 0)_outline": "x1n22pj5",
    ,
  },
  newFocused: {
    boxShadow: "x90kdol",
    outline: "x1a2a7pz",
    "@media (forced-colors: active)_outline": "xzpvr9o",
    ,
  },
  newFocusedInset: {
    boxShadow: "xsgs0p0",
    outline: "x1a2a7pz",
    ,
  },
  newFocusedLink: {
    outline: "x11312b7",
    ,
  },
  unfocused: {
    outline: "x1a2a7pz",
    ,
  },
};

const focusRingStyles = {
  default: styles.newFocused,
  inset: styles.newFocusedInset,
};

const isGkEnabled = gkx("1721477") || gkx("1459");

const BaseFocusRing = ({
  focusRingPosition = "default",
  mode = "focus-visible",
  suppressFocusRing = false,
  testOnly,
  children,
}) => {
  const focusStyles = isGkEnabled
    ? focusRingStyles[focusRingPosition]
    : styles.focused;

  return (
    <FocusWithinHandler testOnly={testOnly}>
      {(isFocused, isChildFocused) => {
        let shouldApplyFocusRing = false;

        if (!suppressFocusRing) {
          if (isFocused && isChildFocused) {
            shouldApplyFocusRing = true;
          } else if (isFocused && mode === "focus") {
            shouldApplyFocusRing = true;
          }
        }

        return children(shouldApplyFocusRing ? focusStyles : styles.unfocused);
      }}
    </FocusWithinHandler>
  );
};

BaseFocusRing.displayName = "BaseFocusRing";
BaseFocusRing.focusRingXStyle = isGkEnabled
  ? styles.newFocused
  : styles.focused;
BaseFocusRing.focusRingInsetXStyle = isGkEnabled
  ? styles.newFocusedInset
  : styles.focused;
BaseFocusRing.linkFocusRingXStyle = isGkEnabled
  ? styles.newFocusedLink
  : styles.focused;

export default BaseFocusRing;
