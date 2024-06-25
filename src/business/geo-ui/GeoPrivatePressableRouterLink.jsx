/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useContext } from "react";

import GeoPrivatePressableRouterLinkContext from "../contexts/GeoPrivatePressableRouterLinkContext";

function GeoPrivatePressableRouterLink(props) {
  const RouterLinkComponent = useContext(GeoPrivatePressableRouterLinkContext);
  return <RouterLinkComponent {...props} />;
}

GeoPrivatePressableRouterLink.displayName = `${GeoPrivatePressableRouterLink.name} [from ${GeoPrivatePressableRouterLink.id}]`;

export default GeoPrivatePressableRouterLink;
