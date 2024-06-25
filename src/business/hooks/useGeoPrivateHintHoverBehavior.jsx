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
import useCallbackListener from "useCallbackListener";
import useDebouncedValue from "useDebouncedValue";

import useBoolean from "../../hooks/useBoolean";
import useGeoPrivateLazyHoverBehavior from "../hooks/useGeoPrivateLazyHoverBehavior";

const useGeoPrivateHintHoverBehavior = ({ renderDelay, onToggle }) => {
  const {
    value: isVisible,
    setTrue: showLayer,
    setFalse: hideLayer,
  } = useBoolean(false);

  const { onShow: lazyShowLayer, onHide: lazyHideLayer } =
    useGeoPrivateLazyHoverBehavior({
      renderDelay,
      onShow: showLayer,
      onHide: hideLayer,
    });

  const debouncedIsVisible = useDebouncedValue(isVisible, 50);

  useCallbackListener(onToggle, debouncedIsVisible);

  return {
    isLayerVisible: debouncedIsVisible,
    onShowLayer: lazyShowLayer,
    onHideLayer: lazyHideLayer,
  };
};

export default useGeoPrivateHintHoverBehavior;
