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
  Suspense,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";

import { HeroInteractionIDContext } from "../../business/helpers/hero-tracing-placeholder";
import {
  createThenableDescription,
  getSimpleUUID,
} from "../../business/helpers/HeroPlaceholderUtils";
import { Context } from "../../context/HeroInteractionContext";
import useStable from "../../hooks/useStable";
import HeroFallbackTracker from "../components/HeroFallbackTracker.react";

function Placeholder({ cb }) {
  const isMounted = useRef(false);
  useLayoutEffect(() => {
    if (!isMounted.current) {
      cb();
      isMounted.current = true;
    }
  }, [cb]);
  return null;
}

const HeroPlaceholder = ({
  children,
  fallback,
  name,
  unstable_avoidThisFallback,
  unstable_onSuspense,
}) => {
  const interactionContext = useContext(Context);
  const interactionID = useContext(HeroInteractionIDContext);
  const generateUUID = useStable(getSimpleUUID);
  console.log("🚀 ~ getSimpleUUID:", getSimpleUUID);
  console.log("🚀 ~ generateUUID:", generateUUID);
  const generateThenableUUID = useStable(getSimpleUUID);
  const isHydrating = useRef(false);

  const handleSuspenseCallback = useCallback(
    (data) => {
      if (interactionID !== null) {
        const description = name !== null ? name : "Unnamed Suspense";
        interactionContext.suspenseCallback(
          interactionID,
          generateUUID,
          interactionContext.pageletStack,
          data,
          description
        );
      }
      if (unstable_onSuspense) {
        const fallbackDescription = createThenableDescription(data) || "";
        unstable_onSuspense(fallbackDescription);
      }
    },
    [interactionContext, interactionID, name, generateUUID, unstable_onSuspense]
  );

  useLayoutEffect(() => {
    if (!isHydrating.current && interactionID !== null) {
      interactionContext.hold(
        interactionID,
        interactionContext.pageletStack,
        "Hydration",
        generateThenableUUID(),
        name
      );
      return () =>
        interactionContext.unhold(interactionID, generateThenableUUID());
    }
  }, [interactionContext, interactionID, name, generateThenableUUID]);

  const handleComplete = () => {
    isHydrating.current = true;
    if (interactionID !== null) {
      interactionContext.unhold(interactionID, generateThenableUUID());
    }
  };

  return (
    <Suspense
      fallback={
        <>
          {fallback}
          <Placeholder cb={handleComplete} />
          <HeroFallbackTracker uuid={generateUUID} />
        </>
      }
      suspenseCallback={handleSuspenseCallback}
      unstable_avoidThisFallback={unstable_avoidThisFallback}
    >
      <Placeholder cb={handleComplete} />
      {children}
    </Suspense>
  );
};

HeroPlaceholder.displayName = `${HeroPlaceholder.name}`;
HeroPlaceholder.displayName = "HeroPlaceholder";

export default HeroPlaceholder;
