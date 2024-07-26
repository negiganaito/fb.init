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
import { useEffect } from "react";

import { containsIncludingLayers } from "../faang/components/ContextualThing";
import useShallowArrayEqualMemo from "./useShallowArrayEqualMemo";

function isMouseEventOutside(event, ref) {
  const target = event.target;
  const isOutside =
    target instanceof Node &&
    ref.current instanceof Node &&
    !containsIncludingLayers(ref.current, target);
  return isOutside;
}

const useGeoPrivateOnMouseEventOutside = (handler, refs, eventType) => {
  const memoizedRefs = useShallowArrayEqualMemo(refs);

  useEffect(() => {
    if (handler === null) return;

    const eventListener = (event) => {
      const isOutside = memoizedRefs.every((ref) =>
        isMouseEventOutside(event, ref)
      );
      if (isOutside) handler();
    };

    window.addEventListener(eventType, eventListener, true);
    return () => {
      window.removeEventListener(eventType, eventListener, true);
    };
  }, [eventType, memoizedRefs, handler]);
};

export default useGeoPrivateOnMouseEventOutside;
