/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useContext } from "react";

import WaitTimeContext from "../../context/WaitTimeContext";
import CometHeroHoldTrigger from "../components/CometHeroHoldTrigger";

import { LoadingMarkerGated } from "./LoadingMarkerGated";

function LoadingMarker({ children }) {
  return children;
}

LoadingMarker.displayName = `${LoadingMarker.name}`;

function withLoadingMarker(Component) {
  return function (props) {
    const context = useContext(WaitTimeContext);
    const waitTimeAreaName = context?.waitTimeAreaName ?? "unnamed";
    const description = `LoadingMarker(${waitTimeAreaName})`;

    const markerContent = (
      <>
        <CometHeroHoldTrigger hold={true} description={description} />
        <Component {...props} />
      </>
    );

    return markerContent;
  };
}

const EnhancedLoadingMarker = withLoadingMarker(
  LoadingMarkerGated || LoadingMarker
);

export default EnhancedLoadingMarker;
