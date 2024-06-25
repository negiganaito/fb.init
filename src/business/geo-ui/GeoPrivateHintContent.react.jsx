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
import GeoBaseSpacingLayout from "GeoBaseSpacingLayout.react";
import GeoCloseButton from "GeoCloseButton.react";
import geoOffset from "geoOffset";
import GeoPrivateBaseHintContext from "GeoPrivateBaseHintContext";
import {
  getStatus,
  getStatusIcon,
  useCloseButtonStyle,
  useHeaderWrapperStyle,
} from "GeoPrivateHintLayerUtils";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import GeoTextPairing from "GeoTextPairing.react";
import GeoVStack from "GeoVStack.react";
import Image from "Image.react";
import stylex from "stylex";
import useGeoPrivateNoticeStyle from "useGeoPrivateNoticeStyle";

const GeoPrivateHintContent = ({
  additionalContent,
  description,
  contentRef,
  content,
  heading,
  onHideLayer,
  status,
}) => {
  const { popoverType, isSticky } = useContext(GeoPrivateBaseHintContext);
  const isPopover = popoverType === "popover";
  const noticeStyle = useGeoPrivateNoticeStyle({
    status: getStatus(status ?? "normal"),
  });

  return (
    <>
      {heading !== null && (
        <HintHeader
          description={description}
          heading={heading}
          isPopover={isPopover}
          isSticky={isSticky}
          onHideLayer={onHideLayer}
          status={status}
        />
      )}
      <div className={stylex(status !== null && noticeStyle)} ref={contentRef}>
        {content}
      </div>
      {additionalContent}
    </>
  );
};

GeoPrivateHintContent.displayName = `GeoPrivateHintContent [from ${__filename}]`;

const HintHeader = ({
  description,
  heading,
  isPopover,
  isSticky,
  onHideLayer,
  status,
}) => {
  const closeButtonStyle = useCloseButtonStyle();

  return (
    <div className={stylex(useHeaderWrapperStyle())}>
      <GeoBaseSpacingLayout>
        {status !== null && (
          <GeoVStack grow={0} justifyContent="center" shrink={0}>
            <Image src={getStatusIcon(status)} />
          </GeoVStack>
        )}
        {heading !== null && (
          <GeoTextPairing
            description={description}
            heading={heading}
            size="header3"
            textAlign="start"
          />
        )}
      </GeoBaseSpacingLayout>
      {isPopover && isSticky && (
        <div
          className={stylex([closeButtonStyle, geoOffset.popoverCloseButton])}
        >
          <GeoCloseButton onClick={onHideLayer} />
        </div>
      )}
    </div>
  );
};

HintHeader.displayName = `HintHeader [from ${__filename}]`;

const GeoPrivateHintContentComponent = makeGeoComponent(
  "GeoPrivateHintContent",
  GeoPrivateHintContent
);
export default GeoPrivateHintContentComponent;
