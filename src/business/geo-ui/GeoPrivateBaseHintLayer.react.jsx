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
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import useDebounced from "../../hooks/useDebounced";
import GeoBaseHintSingletonContext from "../contexts/GeoBaseHintSingletonContext";
import GeoPrivateBaseHintContext from "../contexts/GeoPrivateBaseHintContext";
import GeoPrivateInvertThemeContext from "../contexts/GeoPrivateInvertThemeContext";
import GeoPrivateLayerVisibilityContext from "../contexts/GeoPrivateLayerVisibilityContext";
import GeoPrivateTooltipAnchorContext from "../contexts/GeoPrivateTooltipAnchorContext";
import GeoPrivateTooltipTriggerContext from "../contexts/GeoPrivateTooltipTriggerContext";
import useGeoMouseListeners from "../hooks/useGeoMouseListeners";
import useGeoPrivateHintHoverBehavior from "../hooks/useGeoPrivateHintHoverBehavior";

import GeoPrivateHintCard from "./GeoPrivateHintCard.react";
import { makeGeoComponent } from "./GeoPrivateMakeComponent";

const GeoPrivateBaseHintLayer = ({
  align = "start",
  "data-testid": dataTestId,
  children,
  id,
  hideOnBlur,
  imperativeRef,
  isLayerHoverable = true,
  isSticky = false,
  onToggle,
  renderDelay,
  popoverType = "infoTooltip",
  position = "above",
  triggerRef,
  groupName = "default",
  xstyle,
  ...props
}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const layerRef = useRef(null);
  const triggerContextRef = useContext(GeoPrivateTooltipTriggerContext);
  const anchorContext = useContext(GeoPrivateTooltipAnchorContext);
  const anchorRef = anchorContext.anchorRef;
  const isAnchorHoverable = anchorContext.isHoverable;
  const finalTriggerRef = triggerRef ?? triggerContextRef;
  const hoverable = !isSticky && (isLayerHoverable || isAnchorHoverable);

  const singletonContext = useContext(GeoBaseHintSingletonContext);
  const { groups, setLastHintLayerForGroup } = singletonContext;

  const visibilityContext = useContext(GeoPrivateLayerVisibilityContext);
  const { isLayerVisible, onHideLayer, onShowLayer } =
    useGeoPrivateHintHoverBehavior({
      renderDelay,
      onToggle,
    });

  useImperativeHandle(imperativeRef, () => ({
    show: onShowLayer,
    hide: onHideLayer,
    disableTrigger: () => setIsEnabled(false),
  }));

  const debouncedOnHideLayer = useDebounced(onHideLayer, 200);

  const handleMouseEnter = () => {
    if (groups !== null) {
      if (groups.has(groupName)) {
        let group = groups.get(groupName);
        if (group && group.ref !== finalTriggerRef) {
          group.hide();
        }
      }
      finalTriggerRef &&
        setLastHintLayerForGroup(groupName, {
          ref: finalTriggerRef,
          hide: onHideLayer,
        });
    }

    debouncedOnHideLayer.reset();
    onShowLayer();
  };

  const handleMouseLeave = () => {
    if (!isSticky) debouncedOnHideLayer();
  };

  const handleMouseMove = () => {
    debouncedOnHideLayer.reset();
    visibilityContext || onShowLayer();
  };

  useGeoMouseListeners(
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    isEnabled ? finalTriggerRef : null,
    hoverable ? layerRef : null
  );

  useEffect(() => {
    const triggerElement = finalTriggerRef?.current;
    if (triggerElement === null) return;
    triggerElement.addEventListener("mouseenter", handleMouseEnter);
    triggerElement.addEventListener("mousemove", handleMouseMove);
    triggerElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      triggerElement.removeEventListener("mouseenter", handleMouseEnter);
      triggerElement.removeEventListener("mousemove", handleMouseMove);
      triggerElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [finalTriggerRef, isEnabled, hoverable]);

  const contextValue = useMemo(
    () => ({ isSticky, popoverType }),
    [isSticky, popoverType]
  );

  const triggerElement = anchorRef?.current ?? finalTriggerRef?.current;
  const hintLayer =
    triggerElement !== null ? (
      <GeoPrivateBaseHintContext.Provider value={contextValue}>
        <GeoPrivateInvertThemeContext.Provider value={false}>
          <GeoPrivateHintCard
            align={align}
            context={triggerElement}
            data-testid={dataTestId}
            hideOnBlur={hideOnBlur}
            id={id}
            isShown={visibilityContext ?? isLayerVisible}
            isSticky={isSticky}
            layerRef={layerRef}
            onHide={debouncedOnHideLayer}
            onMouseEnter={hoverable ? handleMouseEnter : null}
            onMouseLeave={hoverable ? handleMouseLeave : null}
            onMouseMove={hoverable ? handleMouseMove : null}
            popoverType={popoverType}
            position={position}
            {...props}
          >
            {children({ onHideLayer })}
          </GeoPrivateHintCard>
        </GeoPrivateInvertThemeContext.Provider>
      </GeoPrivateBaseHintContext.Provider>
    ) : null;

  return finalTriggerRef !== null ? hintLayer : null;
};

GeoPrivateBaseHintLayer.displayName = `GeoPrivateBaseHintLayer [from ${__filename}]`;

const GeoPrivateBaseHintLayerComponent = makeGeoComponent(
  "GeoPrivateBaseHintLayer",
  GeoPrivateBaseHintLayer
);
export default GeoPrivateBaseHintLayerComponent;
