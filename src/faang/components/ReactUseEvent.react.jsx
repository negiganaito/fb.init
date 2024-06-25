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
import { useRef } from "react";
import ReactDOMComet from "react-dom";

import useLayoutEffect_SAFE_FOR_SSR from "../../hooks/useLayoutEffect_SAFE_FOR_SSR";

const reactUseEvent_React = (event, options) => {
  const handleRef = useRef(undefined);
  let useEventHandle = handleRef.current;

  options && (options.passive = undefined);

  if (useEventHandle === null) {
    const setEventHandle = ReactDOMComet.unstable_createEventHandle(
      event,
      options
    );

    const clears = new Map();

    useEventHandle = {
      setListener: (target, callback) => {
        let clear = clears.get(target);

        if (clear !== null) {
          clear();
        }

        if (callback === null) {
          clears.delete(target);
          return;
        }

        clear = setEventHandle(target, callback);
        clears.set(target, clear);
      },

      clear: () => {
        clears.forEach((clr) => clr());
        clears.clear();
      },
    };
    handleRef.current = useEventHandle;
  }

  // use effect | useLayoutEffect []
  useLayoutEffect_SAFE_FOR_SSR(() => {
    return function () {
      if (useEventHandle !== null) {
        useEventHandle.clear();
      }
      handleRef.current = undefined;
    };
  }, [useEventHandle]);

  return useEventHandle;
};

export default reactUseEvent_React;
export { reactUseEvent_React as ReactUseEvent_React };
