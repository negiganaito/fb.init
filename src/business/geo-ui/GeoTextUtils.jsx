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
const styles = {
  truncate: {
    whiteSpace: "xuxw1ft",
    overflowX: "x6ikm8r",
    overflowY: "x10wlt62",
    textOverflow: "xlyipyv",
    $$css: true,
  },
};

export function getTextTruncateStyle() {
  return styles.truncate;
}

export function getAriaLevelForSize(size) {
  switch (size) {
    case "header1":
      return 1;
    case "header2":
      return 2;
    case "header3":
      return 3;
    case "header4":
      return 4;
    default:
      return undefined;
  }
}

export function getPairingTextSize(size) {
  switch (size) {
    case "value":
    case "header4":
      return "valueDescription";
    case "data":
      return "header2";
    default:
      return "value";
  }
}

export function getPairingTextProps({ size, display = "block" }) {
  const props = { color: "heading", display, size: "value", weight: "normal" };
  props.size = getPairingTextSize(size);
  if (size === "data") {
    props.weight = "bold";
  }
  return props;
}

export function isHeader(size) {
  switch (size) {
    case "header1":
    case "header2":
    case "header3":
    case "header4":
      return true;
    default:
      return false;
  }
}

export function mapHeadingSizeToLevel(size) {
  switch (size) {
    case "header2":
      return 2;
    case "header3":
      return 3;
    case "header4":
      return 4;
    default:
      return 1;
  }
}

export function mapHeadingLevelToSize(level) {
  switch (level) {
    case 2:
      return "header2";
    case 3:
      return "header3";
    case 4:
      return "header4";
    default:
      return "header1";
  }
}
