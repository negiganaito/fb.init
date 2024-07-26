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
import React, { useContext, useMemo } from "react";

import useMergeRefs from "./useMergeRefs";
import GeoPrivateLayerContext from "../contexts/GeoPrivateLayerContext";

const useGeoPrivateLayerBehavior = ({ ref, xstyle }) => {
  const context = useContext(GeoPrivateLayerContext);
  const mergedRef = useMergeRefs(context.ref, ref);
  const mergedXstyle = useMemo(
    () => [context.xstyle, xstyle],
    [context.xstyle, xstyle]
  );

  return useMemo(() => {
    return function LayerBehaviorProvider(children) {
      return (
        <GeoPrivateLayerContext.Provider
          // eslint-disable-next-line react/jsx-no-constructed-context-values
          value={{ ref: mergedRef, xstyle: mergedXstyle }}
        >
          {children}
        </GeoPrivateLayerContext.Provider>
      );
    };
  }, [mergedRef, mergedXstyle]);
};

export default useGeoPrivateLayerBehavior;
