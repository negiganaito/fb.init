/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useMemo } from "react";

function useUnsafeRef_DEPRECATED(value) {
  return useMemo(() => ({ current: value }), []);
}

export default useUnsafeRef_DEPRECATED;
