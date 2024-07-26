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
import { useContext, useMemo } from "react";

import GeoPrivateLoggingContext from "../contexts/GeoPrivateLoggingContext";
import GeoPrivateLoggingRegionHierarchyContext from "../contexts/GeoPrivateLoggingRegionHierarchyContext";

function useGeoPrivateWithLogging(callback, { name, action, classification }) {
  const loggingContext = useContext(GeoPrivateLoggingContext);
  const loggingRegionHierarchy = useContext(
    GeoPrivateLoggingRegionHierarchyContext
  );

  return useMemo(
    () =>
      callback === null && loggingContext === null
        ? undefined
        : (event, ...args) => {
            if (callback) {
              callback(event, ...args);
            }
            if (loggingContext) {
              loggingContext(
                {
                  name,
                  action,
                  classification,
                  hierarchy: loggingRegionHierarchy,
                },
                event
              );
            }
          },
    [
      callback,
      loggingContext,
      name,
      action,
      classification,
      loggingRegionHierarchy,
    ]
  );
}

export default useGeoPrivateWithLogging;
