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
import { BaseContextualLayerAnchorRootContext } from "BaseContextualLayerAnchorRootContext";
import GeoPrivateBaseContextualLayer from "GeoPrivateBaseContextualLayer.react";
import { GeoPrivateLayerContext } from "GeoPrivateLayerContext";
import { GeoPrivateLayerPositionContext } from "GeoPrivateLayerPositionContext";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import useGeoPrivateLegacyLayerCompatibility from "useGeoPrivateLegacyLayerCompatibility";

import useMergeRefs from "../../hooks/useMergeRefs";

const styles = { root: { zIndex: "xbqvh2t", $$css: true } };

const GeoBaseContextualLayer = ({
  xstyle,
  disableAutoFlip,
  position,
  containerRef,
  ...props
}) => {
  const layerPositionContext = useContext(GeoPrivateLayerPositionContext);
  const mergedDisableAutoFlip =
    layerPositionContext.disableAutoFlip ?? disableAutoFlip;
  const mergedPosition = layerPositionContext.position ?? position;

  const context = props.context ?? props.contextRef;
  const legacyLayerCompatibilityRef =
    useGeoPrivateLegacyLayerCompatibility(context);
  const layerContext = useContext(GeoPrivateLayerContext);
  const mergedRef = useMergeRefs(
    legacyLayerCompatibilityRef,
    layerContext.ref,
    containerRef
  );

  const mergedXstyle = [layerContext.xstyle, styles.root, xstyle];

  return (
    <LayerContextProvider>
      <AnchorRootContextProvider context={context}>
        <GeoPrivateBaseContextualLayer
          {...props}
          containerRef={mergedRef}
          disableAutoFlip={mergedDisableAutoFlip}
          position={mergedPosition}
          xstyle={mergedXstyle}
        />
      </AnchorRootContextProvider>
    </LayerContextProvider>
  );
};

GeoBaseContextualLayer.displayName = `${GeoBaseContextualLayer.name} [from ${module.id}]`;

const AnchorRootContextProvider = ({ context, children }) => {
  const anchorRootContext = useContext(BaseContextualLayerAnchorRootContext);

  const value = useMemo(() => {
    const element = context instanceof Element ? context : context?.current;
    if (element === null) return anchorRootContext;

    const closestLayer = element.closest?.(".uiLayer");
    if (!(closestLayer instanceof HTMLElement)) return anchorRootContext;

    const anchorRootElement = anchorRootContext.current;
    return anchorRootElement instanceof HTMLElement &&
      closestLayer.contains(anchorRootElement)
      ? anchorRootContext
      : { current: closestLayer };
  }, [context, anchorRootContext]);

  return (
    <BaseContextualLayerAnchorRootContext.Provider value={value}>
      {children}
    </BaseContextualLayerAnchorRootContext.Provider>
  );
};

AnchorRootContextProvider.displayName = `${AnchorRootContextProvider.name} [from ${module.id}]`;

const layerContextValue = {};

const LayerContextProvider = ({ children }) => (
  <GeoPrivateLayerContext.Provider value={layerContextValue}>
    {children}
  </GeoPrivateLayerContext.Provider>
);

LayerContextProvider.displayName = `${LayerContextProvider.name} [from ${module.id}]`;

const GeoBaseContextualLayerComponent = makeGeoComponent(
  "GeoBaseContextualLayer",
  GeoBaseContextualLayer
);

export default GeoBaseContextualLayerComponent;
