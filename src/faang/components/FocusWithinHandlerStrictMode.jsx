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
import React, {
  unstable_Scope as Scope,
  useInsertionEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useFocusWithinStrictMode } from "./ReactFocusEvent.react";

const FocusWithinHandlerStrictMode = ({
  children,
  onFocusChange,
  onFocusVisibleChange,
  onFocusWithin,
  onBlurWithin,
  testOnly,
}) => {
  const focusRef = useRef(null);
  const [focus, setFocus] = useState(testOnly?.focus || false);
  const [focusVisible, setFocusVisible] = useState(
    testOnly?.focusVisible || false
  );

  const _onFocusWithin = (value) => {
    onFocusWithin && !focus && onFocusWithin(value);
  };

  const _onBlurWithin = (value) => {
    onBlurWithin && focus && onBlurWithin(value);
  };

  const handler = useFocusWithinStrictMode(
    focusRef,
    useMemo(() => {
      return {
        onFocusWithin: _onFocusWithin,
        onBlurWithin: _onBlurWithin,
        onFocusWithinChange: onFocusChange
          ? (value) => {
              setFocus(value);
              onFocusChange(value);
            }
          : setFocus,
        onFocusWithinVisibleChange: onFocusVisibleChange
          ? (value) => {
              setFocusVisible(value);
              onFocusVisibleChange(value);
            }
          : setFocusVisible,
      };
    }, [
      focus,
      onBlurWithin,
      onFocusWithin,
      onFocusChange,
      onFocusVisibleChange,
    ])
  );

  useInsertionEffect(() => {
    handler(focusRef.current);
    return () => {
      handler(null);
    };
  }, [handler, focusRef]);

  return (
    <Scope ref={focusRef}>
      {typeof children === "function"
        ? children(focus, focusVisible)
        : children}
    </Scope>
  );
};

FocusWithinHandlerStrictMode.displayName = `${
  FocusWithinHandlerStrictMode.name
} [from ${"your module ID"}]`;

export default FocusWithinHandlerStrictMode;
