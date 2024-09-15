/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import FBLogger from "../../helpers/FBLogger";
import { lsl_, one, zero } from "../../helpers/I64";
import { isUnjoinedCMThread } from "../../helpers/isUnjoinedCMThread";

import { clear as LSClear, has as LSHas, set as LSSet } from "./LSBitFlag";

const threadCapabilityFields = [
  "capabilities",
  "capabilities2",
  "capabilities3",
  "capabilities4",
];
const MAX_SUPPORTED_THREAD_CAPABILITY = 4;
const MAX_BIT_OFFSET = MAX_SUPPORTED_THREAD_CAPABILITY * 64;

const has = (bitOffset, thread) => {
  if (isUnjoinedCMThread(thread.threadType)) return false;

  if (bitOffset >= MAX_BIT_OFFSET) {
    FBLogger("LSThreadBitOffset", "out_of_bounds_bit_offset").mustfix(
      "Invalid bitOffset; expected a value between 0 and %d but found %s instead",
      MAX_BIT_OFFSET - 1,
      bitOffset
    );
    return false;
  }

  if (bitOffset >= 192)
    return LSHas(lsl_(one, bitOffset - 192), thread.capabilities4);
  if (bitOffset >= 128)
    return LSHas(lsl_(one, bitOffset - 128), thread.capabilities3);
  if (bitOffset >= 64)
    return LSHas(lsl_(one, bitOffset - 64), thread.capabilities2);

  return LSHas(lsl_(one, bitOffset), thread.capabilities);
};

const set = (
  bitOffsets,
  capabilities,
  capabilities2,
  capabilities3,
  capabilities4
  // eslint-disable-next-line max-params
) => {
  return bitOffsets.reduce(
    ([cap, cap2, cap3, cap4], bitOffset) => {
      if (bitOffset >= 192)
        return [cap, cap2, cap3, LSSet(lsl_(one, bitOffset - 192), cap4)];
      if (bitOffset >= 128)
        return [cap, cap2, LSSet(lsl_(one, bitOffset - 128), cap3), cap4];
      if (bitOffset >= 64)
        return [cap, LSSet(lsl_(one, bitOffset - 64), cap2), cap3, cap4];

      return [LSSet(lsl_(one, bitOffset), cap), cap2, cap3, cap4];
    },
    [capabilities, capabilities2, capabilities3, capabilities4]
  );
};

const clear = (
  bitOffsets,
  capabilities,
  capabilities2,
  capabilities3,
  capabilities4
  // eslint-disable-next-line max-params
) => {
  return bitOffsets.reduce(
    ([cap, cap2, cap3, cap4], bitOffset) => {
      if (bitOffset >= 192)
        return [cap, cap2, cap3, LSClear(lsl_(one, bitOffset - 192), cap4)];
      if (bitOffset >= 128)
        return [cap, cap2, LSClear(lsl_(one, bitOffset - 128), cap3), cap4];
      if (bitOffset >= 64)
        return [cap, LSClear(lsl_(one, bitOffset - 64), cap2), cap3, cap4];

      return [LSClear(lsl_(one, bitOffset), cap), cap2, cap3, cap4];
    },
    [capabilities, capabilities2, capabilities3, capabilities4]
  );
};

const empty = zero;

export {
  clear,
  empty,
  has,
  MAX_SUPPORTED_THREAD_CAPABILITY,
  set,
  threadCapabilityFields,
};
