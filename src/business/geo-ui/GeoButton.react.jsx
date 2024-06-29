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
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { stylex } from "@stylexjs/stylex";
import { BUIPrivateButtonLayoutContext } from "BUIPrivateButtonLayoutContext";
import GeoPrivateBaseButton from "GeoPrivateBaseButton.react";
import GeoPrivateButtonLayerActionContext from "GeoPrivateButtonLayerActionContext";
import GeoPrivateButtonStyleContext from "GeoPrivateButtonStyleContext";
import GeoPrivateHoverCardContext from "GeoPrivateHoverCardContext";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import useMergeRefs from "useMergeRefs";

const GeoButton = forwardRef(
  (
    {
      ariaLabel,
      autoFocus = false,
      containerRef,
      isDepressed,
      layerAction,
      loggingName = "GeoButton",
      maxWidth,
      minWidth,
      onClick,
      onHoverChange,
      width,
      grow,
      isDisabled = false,
      type = "button",
      xstyle,
      ...props
    },
    ref
  ) => {
    const localRef = useRef(null);
    const layoutContext = BUIPrivateButtonLayoutContext.useLayoutContext();
    const layoutStyle = layoutContext[0];
    const buttonStyleContext = useContext(GeoPrivateButtonStyleContext);
    const buttonWidth = buttonStyleContext.width ?? width;
    const hoverCardContext = useContext(GeoPrivateHoverCardContext);
    const isHoverCard = hoverCardContext.isHoverCard;

    const finalGrow = isHoverCard ? "fill" : grow;
    const combinedRef = useMergeRefs(
      containerRef,
      ref,
      localRef,
      layoutContext[1]
    );
    const layerActionContextValue = useMemo(() => {
      switch (layerAction) {
        case "confirm":
          return "layerConfirm";
        case "cancel":
          return "layerCancel";
        case "button":
          return "layerButton";
        default:
          return null;
      }
    }, [layerAction]);

    useEffect(() => {
      if (autoFocus) {
        localRef.current?.focus();
      }
    }, [autoFocus]);

    const isWidthDefined =
      buttonWidth !== null || minWidth !== null || maxWidth !== null;

    return (
      <GeoPrivateButtonLayerActionContext.Provider
        value={layerActionContextValue}
      >
        <div
          className={stylex(
            styles.buttonWrapper,
            finalGrow === "fill" && styles.grow,
            xstyle
          )}
          role="none"
          style={{ ...layoutStyle, width: buttonWidth, minWidth, maxWidth }}
        >
          <GeoPrivateBaseButton
            {...props}
            aria-label={ariaLabel}
            containerRef={combinedRef}
            grow={isWidthDefined || finalGrow === "fill" ? "fill" : undefined}
            isDepressed={isDepressed}
            isDisabled={isDisabled}
            loggingName={loggingName}
            onClick={onClick}
            onHoverChange={onHoverChange}
            type={type}
          />
        </div>
      </GeoPrivateButtonLayerActionContext.Provider>
    );
  }
);

GeoButton.displayName = `${GeoButton.name} [from some-module-id]`;

const styles = {
  buttonWrapper: {
    display: "x3nfvp2",
    maxWidth: "x193iq5w",
    verticalAlign: "xxymvpz",
  },
  grow: {
    display: "x78zum5",
    flexGrow: "x1iyjqo2",
    flexShrink: "xs83m0k",
  },
};

const ExportedGeoButton = makeGeoComponent("GeoButton", GeoButton);
export default ExportedGeoButton;
