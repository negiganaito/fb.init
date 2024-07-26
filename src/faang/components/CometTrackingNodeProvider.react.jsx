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

import CometTrackingNodeAbstractViewHierarchyWrapperContext from "../../context/CometTrackingNodeAbstractViewHierarchyWrapperContext";
import CometTrackingNodesContext from "../../context/CometTrackingNodesContext";
import useCometTrackingNodes from "../../hooks/useCometTrackingNodes";

import encodeTrackingNode from "./encodeTrackingNode";

const CometTrackingNodeProvider = ({ children, index, trackingNode }) => {
  const trackingNodes = useCometTrackingNodes();

  const value = useMemo(() => {
    if (trackingNode === null) {
      return trackingNodes;
    }
    const encodedTrackingNode = encodeTrackingNode(trackingNode, index);
    return [encodedTrackingNode, ...trackingNodes];
  }, [trackingNodes, trackingNode, index]);

  let content = children;

  const abstractViewHierarchyWrapperContext = useContext(
    CometTrackingNodeAbstractViewHierarchyWrapperContext
  );
  if (abstractViewHierarchyWrapperContext !== null) {
    content = abstractViewHierarchyWrapperContext(value, children);
  }

  return (
    <CometTrackingNodesContext.Provider value={value}>
      {content}
    </CometTrackingNodesContext.Provider>
  );
};

export default CometTrackingNodeProvider;
