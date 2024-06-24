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
import React, { useContext } from "react";
import GeoBaseToast from "GeoBaseToast.react";
import GeoCloseButton from "GeoCloseButton.react";
import GeoFlexbox from "GeoFlexbox.react";
import { cardEndAction } from "geoOffset";
import { GeoPrivateToastContext } from "GeoPrivateToastContext";
import GeoSpinner from "GeoSpinner.react";
import GeoStatusIcon from "GeoStatusIcon.react";
import GeoTextPairing from "GeoTextPairing.react";
import stylex from "stylex";
import { useGeoIconStyle } from "useGeoIconStyle";

import { makeGeoComponent } from "./GeoPrivateMakeComponent";

const GeoToast = ({
  action,
  containerRef,
  "data-testid": dataTestId,
  description,
  hasIcon = true,
  heading,
  onHide,
  status = "success",
}) => {
  const { onHideFactory } = useContext(GeoPrivateToastContext);
  const handleHide = onHideFactory?.(onHide) ?? onHide;
  const iconStyle = useGeoIconStyle({ color: "inverted", isDisabled: false });

  return (
    <GeoBaseToast
      containerRef={containerRef}
      data-testid={dataTestId}
      status={status}
      xstyle={styles.root}
    >
      {hasIcon && (
        <div className={stylex(styles.icon, iconStyle)}>
          {status === "indeterminate" ? (
            <GeoSpinner shade="light" size="small" />
          ) : (
            <GeoStatusIcon color="inherit" status={status} />
          )}
        </div>
      )}
      <GeoTextPairing
        description={description}
        heading={heading}
        overflowWrap="break-word"
        size="value"
        xstyle={styles.textPairing}
      />
      <GeoFlexbox shrink={0} xstyle={cardEndAction}>
        <div className="xs83m0k x1c4vz4f x1f0l55g">{action}</div>
        <GeoCloseButton onClick={() => handleHide?.("layerCancelButton")} />
      </GeoFlexbox>
    </GeoBaseToast>
  );
};

GeoToast.displayName = `GeoToast`;

const styles = {
  root: { width: "x1iiql3v" },
  icon: {
    alignItems: "x6s0dn4",
    flexGrow: "x1c4vz4f",
    flexShrink: "x2lah0s",
    height: "xlup9mm",
  },
  textPairing: { flexGrow: "x1iyjqo2", flexShrink: "xs83m0k" },
};

export default makeGeoComponent("GeoToast", GeoToast);
