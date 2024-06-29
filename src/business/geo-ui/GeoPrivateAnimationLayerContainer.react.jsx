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
import React, { useCallback, useState } from "react";

import useStyleXTransitionSingle from "../../hooks/useStyleXTransitionSingle";
import GeoPrivateAnimationLayerContext from "../contexts/GeoPrivateAnimationLayerContext";
import useShallowEqualMemo from "../hooks/useShallowEqualMemo";

import { makeGeoComponent } from "./GeoPrivateMakeComponent";

const TRANSITION_DURATION_IN = 50;
const TRANSITION_DURATION_OUT = 150; // 100 + 50

const GeoPrivateAnimationLayerContainer = ({
  children,
  isLayerShown,
  position,
}) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isEntered, setIsEntered] = useState(false);

  const onEnter = useCallback(() => {
    setIsLeaving(false);
  }, []);

  const onEnterComplete = useCallback(() => {
    setIsEntered(true);
  }, []);

  const onLeave = useCallback(() => {
    setIsLeaving(true);
    setIsEntered(false);
  }, []);

  const onLeaveComplete = useCallback(() => {
    setIsLeaving(false);
  }, []);

  const transitionStyles = useStyleXTransitionSingle(isLayerShown || null, {
    base: [],
    enter: styles.transitionPlaceholder,
    leave: styles.transitionPlaceholder,
    durationIn: TRANSITION_DURATION_IN,
    durationOut: TRANSITION_DURATION_OUT,
    onEnter,
    onEnterComplete,
    onLeave,
    onLeaveComplete,
  });

  const contextValue = useShallowEqualMemo({
    isAnimated: true,
    isLeaving,
    isEntered,
  });

  return transitionStyles ? (
    <GeoPrivateAnimationLayerContext.Provider value={contextValue}>
      {children}
    </GeoPrivateAnimationLayerContext.Provider>
  ) : null;
};

GeoPrivateAnimationLayerContainer.displayName =
  "GeoPrivateAnimationLayerContainer";

const styles = {
  transitionPlaceholder: { $$css: true },
};

export default makeGeoComponent(
  "GeoPrivateAnimationLayerContainer",
  GeoPrivateAnimationLayerContainer
);
