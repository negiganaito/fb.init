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
import { useCallback, useContext } from "react";

import useDebounced from "../../hooks/useDebounced";
import GeoLazyContext from "../contexts/GeoLazyContext";

const DEFAULT_DELAY = 500;

const useGeoPrivateLazyHoverBehavior = ({
  renderDelay = 0,
  onHide,
  onShow,
}) => {
  const isLazy = useContext(GeoLazyContext);
  const delay = isLazy ? DEFAULT_DELAY : renderDelay;
  const debouncedShow = useDebounced(onShow, delay);

  const handleHide = useCallback(() => {
    debouncedShow.reset();
    onHide();
  }, [debouncedShow, onHide]);

  const handleShow = delay === 0 ? onShow : debouncedShow;
  const handleDelayedHide = delay === 0 ? onHide : handleHide;

  return {
    onShow: handleShow,
    onHide: handleDelayedHide,
  };
};

export default useGeoPrivateLazyHoverBehavior;
