/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useState } from "react";

function useFocusState(onFocus, onBlur) {
  const [isFocused, setIsFocused] = useState(false);

  const onFocusCallback = useCallback(
    (event) => {
      setIsFocused(true);
      onFocus && onFocus(event);
    },
    [onFocus]
  );

  const onBlurCallback = useCallback(
    (event) => {
      setIsFocused(false);
      onBlur && onBlur(event);
    },
    [onBlur]
  );

  return [isFocused, onFocusCallback, onBlurCallback];
}

export default useFocusState;
