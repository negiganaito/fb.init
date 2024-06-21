/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useRef } from "react";

function useStable(fn) {
  const ref = useRef(null);
  let current = ref.current;

  if (current === null) {
    current = { value: fn() };
    ref.current = current;
    return current.value;
  } else {
    return current.value;
  }
}

export default useStable;
