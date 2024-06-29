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
import { useCallback, useState } from "react";

import { getKeyDownCode, isKeyDown } from "../business/helpers/KeyStatus";
import RTLKeys from "../business/helpers/RTLKeys";
import VirtualCursorStatus from "../business/helpers/VirtualCursorStatus";

const nonTriggerKeys = new Set([
  RTLKeys.ALT,
  RTLKeys.CTRL,
  RTLKeys.SHIFT,
  RTLKeys.LEFT_WINDOW_KEY,
  RTLKeys.RIGHT_WINDOW_KEY,
]);

const useKeyboardFocus = (props) => {
  const [isKeyboardFocused, setKeyboardFocused] = useState(false);

  const handleFocus = useCallback(
    (event) => {
      const isKeyPressed = isKeyDown() && !nonTriggerKeys.has(getKeyDownCode());
      if (VirtualCursorStatus.isVirtualCursorTriggered() || isKeyPressed) {
        setKeyboardFocused(true);
      }
      if (props?.onFocus) {
        props.onFocus(event);
      }
    },
    [props?.onFocus]
  );

  const handleBlur = useCallback(
    (event) => {
      setKeyboardFocused(false);
      if (props?.onBlur) {
        props.onBlur(event);
      }
    },
    [props?.onBlur]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.keyCode === RTLKeys.RETURN || event.keyCode === RTLKeys.SPACE) {
        setKeyboardFocused(true);
      }
      if (props?.onKeyDown) {
        props.onKeyDown(event);
      }
    },
    [props?.onKeyDown]
  );

  return {
    isKeyboardFocused,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
  };
};

export default useKeyboardFocus;
