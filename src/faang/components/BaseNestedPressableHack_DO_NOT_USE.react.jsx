/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useEffect, useState } from "react";

function BaseNestedPressableHack_DO_NOT_USE({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const style = isMounted ? null : { height: 0, width: 0 };

  return (
    <object {...style} type="nested/pressable">
      {children}
    </object>
  );
}

BaseNestedPressableHack_DO_NOT_USE.displayName = `${BaseNestedPressableHack_DO_NOT_USE.name}`;

export default BaseNestedPressableHack_DO_NOT_USE;
