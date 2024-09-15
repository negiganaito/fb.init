/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext, useEffect, useRef } from "react";
import emptyFunction from "fbjs/lib/emptyFunction";

import HiddenSubtreePassiveContext from "../../context/HiddenSubtreePassiveContext";

const BasePopoverLayerVisibility = ({
  children,
  onLayerDetached = emptyFunction,
}) => {
  const { getCurrentState, subscribeToChanges } = useContext(
    HiddenSubtreePassiveContext
  );
  const previousVisibilityState = useRef(
    !getCurrentState().hiddenOrBackgrounded
  );

  useEffect(() => {
    const unsubscribe = subscribeToChanges(({ hiddenOrBackgrounded }) => {
      const isVisible = !hiddenOrBackgrounded;
      if (previousVisibilityState.current !== isVisible && !isVisible) {
        onLayerDetached();
      }
      previousVisibilityState.current = isVisible;
    });
    return () => unsubscribe.remove();
  }, [onLayerDetached, subscribeToChanges]);

  const onLayerDetachedRef = useRef(onLayerDetached);

  useEffect(() => {
    onLayerDetachedRef.current = onLayerDetached;
  }, [onLayerDetached]);

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    return () => {
      const handleDetached = onLayerDetachedRef.current;
      timeoutRef.current = window.setTimeout(handleDetached, 1);
    };
  }, []);

  return children;
};

BasePopoverLayerVisibility.displayName = `${BasePopoverLayerVisibility.name} [from ${module.id}]`;

export default BasePopoverLayerVisibility;
