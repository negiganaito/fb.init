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
import { useContext } from "react";

import BizInboxSurface from "../../business/components/BizInboxSurface";
import BizInboxSurfaceContext from "../contexts/BizInboxSurfaceContext";
import URI from "../helpers/URI";

import XBizSuiteControllerRouteBuilder from "./XBizSuiteControllerRouteBuilder";

function isBizSuiteSurface() {
  const url = XBizSuiteControllerRouteBuilder.buildURL({});
  const qualifiedURI = new URI(url).getQualifiedURI().toString();
  return URI.getRequestURI()
    .getQualifiedURI()
    .toString()
    .startsWith(qualifiedURI);
}

function useBizInboxSurface() {
  const context = useContext(BizInboxSurfaceContext);
  return context?.inboxSurface ?? BizInboxSurface.INVALID;
}

function useBizInboxSkeletonLoadingState() {
  const regex = /\/inbox\/(all|instagram_direct|messenger)/i;
  // const regex = new RegExp("/inbox/(all|instagram_direct|messenger)", "i");
  return (
    isBizSuiteSurface() &&
    regex.test(URI.getRequestURI().getQualifiedURI().toString())
  );
}

export {
  isBizSuiteSurface,
  useBizInboxSkeletonLoadingState,
  useBizInboxSurface,
};
