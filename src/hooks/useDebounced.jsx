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
import { useEffect, useMemo, useRef } from "react";

import debounce from "../business/helpers/debounce";

function useDebounced(callback, delay = 100, immediate = false) {
  const callbackRef = useRef(callback);
  const isMounted = useRef(true);
  const pendingCall = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    if (pendingCall.current) {
      pendingCall.current();
      pendingCall.current = null;
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFunction = useMemo(
    () =>
      debounce(
        (...args) => {
          if (isMounted.current) {
            callbackRef.current(...args);
          } else {
            pendingCall.current = () => callbackRef.current(...args);
          }
        },
        delay,
        immediate
      ),
    [delay, immediate]
  );

  return debouncedFunction;
}

export default useDebounced;
