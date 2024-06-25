/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useEffect, useLayoutEffect } from "react";
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";

const useLayoutEffect_SAFE_FOR_SSR = ExecutionEnvironment.canUseDOM
  ? useLayoutEffect
  : useEffect;

export { useLayoutEffect_SAFE_FOR_SSR };
export default useLayoutEffect_SAFE_FOR_SSR;
