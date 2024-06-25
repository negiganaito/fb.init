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
import stylex from "@stylexjs/stylex";

import {
  getPositionFromIcon,
  getSizeFromIcon,
  getSrcFromIcon,
} from "../components/WebIconUtils";

const styles = {
  cssMask: {
    backgroundColor: "xtwfq29",
    $$css: true,
  },
};

const WebCSSTintedIcon = ({
  children,
  containerRef,
  fallback,
  icon,
  xstyle,
}) => {
  const src = getSrcFromIcon(icon);
  const size = getSizeFromIcon(icon);
  const position = getPositionFromIcon(icon);

  return src === null ? (
    { fallback }
  ) : (
    <div
      className={stylex(styles.cssMask, xstyle)}
      ref={containerRef}
      style={{
        width: icon.size,
        height: icon.size,
        WebkitMaskImage: src !== null ? `url(${src})` : undefined,
        WebkitMaskSize: size ? `${size.width}px ${size.height}px` : undefined,
        WebkitMaskPosition: position
          ? `${position.x}px ${position.y}px`
          : undefined,
      }}
    >
      {children}
    </div>
  );
};

WebCSSTintedIcon.displayName = `${WebCSSTintedIcon.name} [from ${__filename}]`;

export default WebCSSTintedIcon;
