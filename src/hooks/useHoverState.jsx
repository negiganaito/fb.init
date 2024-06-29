/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import useBoolean from "./useBoolean";
import useEventHandler from "./useEventHandler";

function useHoverState(onMouseEnterCallback, onMouseLeaveCallback) {
  const {
    value: isHovered,
    set: setIsHovered,
    setTrue: handleMouseEnter,
    setFalse: handleMouseLeave,
  } = useBoolean(false);

  const onMouseEnter = useEventHandler((event) => {
    handleMouseEnter();
    if (onMouseEnterCallback) {
      onMouseEnterCallback(event);
    }
  });

  const onMouseLeave = useEventHandler((event) => {
    handleMouseLeave();
    if (onMouseLeaveCallback) {
      onMouseLeaveCallback(event);
    }
  });

  return {
    isHovered,
    onMouseEnter,
    onMouseLeave,
    setIsHovered,
  };
}

export default useHoverState;
