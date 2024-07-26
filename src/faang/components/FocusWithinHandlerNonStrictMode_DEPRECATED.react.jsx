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
  useMemo,
  useRef,
  useState,
} from "react";

import { useFocusWithin } from "./ReactFocusEvent.react";

const FocusWithinHandlerNonStrictMode_DEPRECATED = ({
  children,
  onFocusChange,
  onFocusVisibleChange,
  onFocusWithin,
  onBlurWithin,
  testOnly,
}) => {
  const scopeRef = useRef(null);
  const [focus, setFocus] = useState(testOnly?.focus || false);
  const [focusVisible, setFocusVisible] = useState(
    testOnly?.focusVisible || false
  );

  const handlers = useFocusWithin(
    scopeRef,
    useMemo(() => {
      return {
        onFocusWithin: (event) => {
          onFocusWithin && !focus && onFocusWithin(event);
        },
        onBlurWithin: (event) => {
          onBlurWithin && focus && onBlurWithin(event);
        },
        onFocusWithinChange: (isFocused) => {
          setFocus(isFocused);
          onFocusChange && onFocusChange(isFocused);
        },
        onFocusWithinVisibleChange: (isVisible) => {
          setFocusVisible(isVisible);
          onFocusVisibleChange && onFocusVisibleChange(isVisible);
        },
      };
    }, [
      focus,
      onFocusWithin,
      onBlurWithin,
      onFocusChange,
      onFocusVisibleChange,
    ])
  );

  return (
    <Scope ref={handlers}>
      {typeof children === "function"
        ? children(focus, focusVisible)
        : children}
    </Scope>
  );
};

FocusWithinHandlerNonStrictMode_DEPRECATED.displayName =
  "FocusWithinHandlerNonStrictMode_DEPRECATED";

export default FocusWithinHandlerNonStrictMode_DEPRECATED;
