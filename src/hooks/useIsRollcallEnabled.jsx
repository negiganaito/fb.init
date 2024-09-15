/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { has } from "../faang/components/LSThreadBitOffset";
import { useThread } from "../faang/components/MWLSThread";

const useIsRollcallEnabled = (threadKey) => {
  return Boolean(useThread(threadKey, (thread) => has(152, thread)));
};

export default useIsRollcallEnabled;
