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
  ,
};

const alignSelfStyles = {
  center: { alignSelf: "xamitd3",  },
  end: { alignSelf: "xpvyfi4",  },
  start: { alignSelf: "xqcrz7y",  },
  stretch: { alignSelf: "xkh2ocl",  },
  baseline: { alignSelf: "xoi2r2e",  },
};

const flexBasisStyles = {
  0: { flexBasis: "x1r8uery",  },
  auto: { flexBasis: "xdl72j9",  },
  content: { flexBasis: "xcklp1c",  },
};

const flexGrowStyles = {
  0: { flexGrow: "x1c4vz4f",  },
  1: { flexGrow: "x1iyjqo2",  },
  2: { flexGrow: "xgyuaek",  },
  3: { flexGrow: "x1ikap7u",  },
  4: { flexGrow: "xrnhffl",  },
};

const orderStyles = {
  0: { order: "x1g77sc7",  },
  1: { order: "x9ek82g",  },
  2: { order: "x14yy4lh",  },
  3: { order: "xo1ph6p",  },
  4: { order: "x182iqb8",  },
  5: { order: "x1h3rv7z",  },
};

const flexShrinkStyles = {
  0: { flexShrink: "x2lah0s",  },
  1: { flexShrink: "xs83m0k",  },
  2: { flexShrink: "x5wqa0o",  },
  3: { flexShrink: "xo4cfa7",  },
  4: { flexShrink: "x1bcm92b",  },
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
