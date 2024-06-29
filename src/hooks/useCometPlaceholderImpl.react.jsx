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
import React, { useCallback, useLayoutEffect, useRef } from "react";

// import {
//   addMarkersToChildren,
//   addMarkersToFallback,
// } from "CometSSRHydrationMarkerUtils";
import HeroPlaceholder from "../faang/components/HeroPlaceholder.react";

import useStable from "./useStable";
// import { CometSuspenseHUD } from "CometSuspenseHUD.react";
// import ExecutionEnvironment from "ExecutionEnvironment";
// import gkx from "gkx";

const MAX_COUNT = 5;
// const logSuspenseEvent = requireDeferred("CometSuspenseFalcoEvent");

function PlaceholderMountCallback({ cb }) {
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    if (!mountedRef.current) {
      cb();
      mountedRef.current = true;
    }
  });

  return null;
}

export default function useCometPlaceholderImpl({
  children,
  fallback,
  name,
  unstable_avoidThisFallback,
  unstable_onSuspense,
}) {
  const placeholderRef = useStable(() => {
    // if (CometSuspenseHUD && ExecutionEnvironment?.canUseDOM) {
    //   return document.createElement("div");
    // }
    return null;
  });

  const count = useRef(0);
  const promiseName = useRef(null);
  const hasLoggedFirstSuspense = useRef(false);

  // if (addMarkersToChildren && addMarkersToFallback) {
  //   children = addMarkersToChildren(children);
  //   fallback = addMarkersToFallback(fallback);
  // }

  const onSuspense = useCallback(
    (name) => {
      if (placeholderRef) {
        placeholderRef.textContent = name;
      }
      promiseName.current = name;
      if (unstable_onSuspense) {
        unstable_onSuspense(name);
      }
    },
    [placeholderRef, unstable_onSuspense]
  );

  // let hud = null;
  // if (CometSuspenseHUD?.react) {
  //   hud = <CometSuspenseHUD desc={placeholderRef} />;
  // }

  const callback = useCallback(() => {
    count.current += 1;
    const gkx_1863055 = true;
    if (gkx_1863055) {
      if (hasLoggedFirstSuspense.current && count.current <= MAX_COUNT) {
        console.log(() => ({
          event: "unexpected_suspense",
          is_backup_placeholder: unstable_avoidThisFallback === true,
          placeholder_name: name,
          promise_name: promiseName.current,
          suspense_count: String(count.current),
        }));
      }
    }
  }, [name, unstable_avoidThisFallback]);

  const logFirstSuspense = useCallback(() => {
    hasLoggedFirstSuspense.current = true;
  }, []);

  return (
    <HeroPlaceholder
      fallback={
        <>
          {fallback}
          <PlaceholderMountCallback cb={callback} />
          {/* {hud} */}
        </>
      }
      name={name}
      unstable_avoidThisFallback={unstable_avoidThisFallback}
      unstable_onSuspense={onSuspense}
      children={
        <>
          <PlaceholderMountCallback cb={logFirstSuspense} />
          {children}
        </>
      }
    />
  );
}
