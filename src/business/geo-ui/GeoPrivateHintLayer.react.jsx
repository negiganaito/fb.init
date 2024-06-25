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
import React, { useContext, useRef } from "react";
import stylex from "@stylexjs/stylex";
import fbicon from "fbicon";

import useMergeRefs from "../../hooks/useMergeRefs";
import GeoPrivateTooltipTriggerContext from "../contexts/GeoPrivateTooltipTriggerContext";
import ix from "../helpers/ix";

import GeoBaseLineHeightAlign from "./GeoBaseLineHeightAlign.react";
import GeoIcon from "./GeoIcon.react";
import GeoPrivateBaseHintLayer from "./GeoPrivateBaseHintLayer.react";
import { useIconStyle } from "./GeoPrivateHintLayerUtils";
import { makeGeoComponent } from "./GeoPrivateMakeComponent";

const GeoPrivateHintLayer = ({
  "data-testid": dataTestId,
  children,
  contentRenderer,
  hasCloseButton,
  hasMedia,
  imperativeRef,
  isSticky = false,
  layerRef,
  popoverType,
  triggerRef,
  groupName,
  xstyle,
  ...props
}) => {
  const localLayerRef = useRef(null);
  const mergedLayerRef = useMergeRefs(localLayerRef, layerRef);
  const contextTriggerRef = useContext(GeoPrivateTooltipTriggerContext);
  const finalTriggerRef = triggerRef ?? contextTriggerRef ?? localLayerRef;

  const hintLayerContent = (
    <GeoPrivateBaseHintLayer
      data-testid={dataTestId}
      groupName={groupName}
      imperativeRef={imperativeRef}
      isSticky={isSticky}
      popoverType={popoverType}
      triggerRef={finalTriggerRef}
      {...props}
    >
      {contentRenderer}
    </GeoPrivateBaseHintLayer>
  );

  return finalTriggerRef !== localLayerRef ? (
    hintLayerContent
  ) : (
    <>
      <div className={stylex(styles.trigger, xstyle)} ref={mergedLayerRef}>
        {children ?? <DefaultTrigger />}
      </div>
      {hintLayerContent}
    </>
  );
};

GeoPrivateHintLayer.displayName = `GeoPrivateHintLayer [from ${__filename}]`;

const DefaultTrigger = () => {
  const iconStyle = useIconStyle();
  return (
    <GeoBaseLineHeightAlign>
      <div className={stylex(iconStyle)}>
        <GeoIcon data-testid={undefined} icon={fbicon(ix("479175"), 12)} />
      </div>
    </GeoBaseLineHeightAlign>
  );
};

DefaultTrigger.displayName = `DefaultTrigger [from ${__filename}]`;

const styles = {
  trigger: { display: "x1rg5ohu", pointerEvents: "x67bb7w", $$css: true },
};

const GeoPrivateHintLayerComponent = makeGeoComponent(
  "GeoPrivateHintLayer",
  GeoPrivateHintLayer
);
export default GeoPrivateHintLayerComponent;
