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
import {
  BASE_CODE_SIZE,
  BASE_CODE_START,
  ENCODE_NUMBER_MAX,
  ENCODED_STRING_WITH_THREE_SYMBOLS_PREFIX_CODE,
  ENCODED_STRING_WITH_TWO_SYMBOLS_PREFIX_CODE,
  PREFIX_CODE_SIZE,
  PREFIX_CODE_START,
  TOTAL_IDS_SUPPORTED_BY_LEGACY_ENCODING,
} from "./TrackingNodeConstants";

const encodeTrackingNode = (trackingNodeId, additionalInfo) => {
  const calculateBasePower = (exponent) => Math.pow(BASE_CODE_SIZE, exponent);

  const encodeBaseConversion = (value, length) => {
    let encodedValue = "";

    while (length > 0) {
      const remainder = value % BASE_CODE_SIZE;
      encodedValue =
        String.fromCharCode(BASE_CODE_START + remainder) + encodedValue;
      value = parseInt(value / BASE_CODE_SIZE, 10);
      length -= 1;
    }
    return encodedValue;
  };

  const encodeWithPrefix = (nodeId) => {
    nodeId = nodeId - TOTAL_IDS_SUPPORTED_BY_LEGACY_ENCODING - 1;
    if (nodeId < calculateBasePower(2)) {
      return (
        String.fromCharCode(ENCODED_STRING_WITH_TWO_SYMBOLS_PREFIX_CODE) +
        encodeBaseConversion(nodeId, 2)
      );
    }
    nodeId -= calculateBasePower(2);
    return (
      String.fromCharCode(ENCODED_STRING_WITH_THREE_SYMBOLS_PREFIX_CODE) +
      encodeBaseConversion(nodeId, 3)
    );
  };

  const remainder = (trackingNodeId - 1) % BASE_CODE_SIZE;
  const quotient = parseInt((trackingNodeId - 1) / BASE_CODE_SIZE, 10);

  if (
    trackingNodeId < 1 ||
    trackingNodeId >
      (PREFIX_CODE_SIZE + 1) * BASE_CODE_SIZE +
        calculateBasePower(2) +
        calculateBasePower(3)
  ) {
    throw new Error("Invalid tracking node: " + trackingNodeId);
  }

  let encodedResult = "";
  quotient > PREFIX_CODE_SIZE
    ? (encodedResult += encodeWithPrefix(trackingNodeId))
    : (quotient > 0 &&
        (encodedResult += String.fromCharCode(
          quotient - 1 + PREFIX_CODE_START
        )),
      (encodedResult += String.fromCharCode(remainder + BASE_CODE_START)));

  if (additionalInfo !== undefined && additionalInfo > 0) {
    if (additionalInfo > 10) {
      encodedResult += "#";
    }
    encodedResult += parseInt(
      Math.min(additionalInfo, ENCODE_NUMBER_MAX) - 1,
      10
    );
  }

  return encodedResult;
};

export default encodeTrackingNode;
