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
const resetStyles = {
  minHeight: "x2lwn1j",
  minWidth: "xeuugli",
  $$css: true,
};

const alignSelfStyles = {
  center: { alignSelf: "xamitd3", $$css: true },
  end: { alignSelf: "xpvyfi4", $$css: true },
  start: { alignSelf: "xqcrz7y", $$css: true },
  stretch: { alignSelf: "xkh2ocl", $$css: true },
  baseline: { alignSelf: "xoi2r2e", $$css: true },
};

const flexBasisStyles = {
  0: { flexBasis: "x1r8uery", $$css: true },
  auto: { flexBasis: "xdl72j9", $$css: true },
  content: { flexBasis: "xcklp1c", $$css: true },
};

const flexGrowStyles = {
  0: { flexGrow: "x1c4vz4f", $$css: true },
  1: { flexGrow: "x1iyjqo2", $$css: true },
  2: { flexGrow: "xgyuaek", $$css: true },
  3: { flexGrow: "x1ikap7u", $$css: true },
  4: { flexGrow: "xrnhffl", $$css: true },
};

const orderStyles = {
  0: { order: "x1g77sc7", $$css: true },
  1: { order: "x9ek82g", $$css: true },
  2: { order: "x14yy4lh", $$css: true },
  3: { order: "xo1ph6p", $$css: true },
  4: { order: "x182iqb8", $$css: true },
  5: { order: "x1h3rv7z", $$css: true },
};

const flexShrinkStyles = {
  0: { flexShrink: "x2lah0s", $$css: true },
  1: { flexShrink: "xs83m0k", $$css: true },
  2: { flexShrink: "x5wqa0o", $$css: true },
  3: { flexShrink: "xo4cfa7", $$css: true },
  4: { flexShrink: "x1bcm92b", $$css: true },
};

function webFlexItem({ alignSelf, basis, grow, order, shrink }) {
  return [
    resetStyles,
    alignSelf !== null && alignSelfStyles[alignSelf],
    basis !== null && flexBasisStyles[basis],
    grow !== null && flexGrowStyles[grow],
    order !== null && orderStyles[order],
    shrink !== null && flexShrinkStyles[shrink],
  ];
}

export default webFlexItem;
