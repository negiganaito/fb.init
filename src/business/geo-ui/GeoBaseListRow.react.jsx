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
import stylex from "@stylexjs/stylex";
import GeoBaseInteractiveRow from "GeoBaseInteractiveRow.react";
import { GeoBaseListRowContext } from "GeoBaseListRowContext";
import { GeoPrivateBadgeContext } from "GeoPrivateBadgeContext";
import GeoPrivateBaseListRowLayout from "GeoPrivateBaseListRowLayout.react";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import { joinDomIDs } from "joinDomIDs";
import { useUniqueID } from "useUniqueID";

const styles = {
  default: { listStyle: "xe8uvvx", $$css: true },
};

const GeoBaseListRow = ({
  accessibilityRole,
  accessibilityState,
  badge,
  containerRef,
  "data-testid": dataTestId,
  describedBy,
  description,
  descriptionID,
  disabledHeading,
  disabledMessage,
  hasAnimation = false,
  id,
  isDisabled = false,
  isFocusable = false,
  isHighlighted = false,
  isHoverable,
  isReadOnly = false,
  isVisuallyFocused,
  labelID,
  link,
  loggingName,
  onFocusChange,
  onHoverChange,
  onPress,
  tooltip,
  trailingContent,
  xstyle,
  ...rest
}) => {
  const listRowContext = useContext(GeoBaseListRowContext);
  const isNested = listRowContext.isNested;
  const shouldUseListItem =
    !isNested &&
    !["listitem", "option", "label"].includes(accessibilityRole || "");
  const shouldLabel = !["label"].includes(accessibilityRole || "");
  const uniqueID = useUniqueID();
  const generatedLabelID = shouldLabel ? uniqueID : undefined;
  const finalLabelID = labelID ?? generatedLabelID;
  const descriptionUniqueID = useUniqueID();
  const finalDescriptionID =
    shouldLabel && description !== null
      ? descriptionID ?? descriptionUniqueID
      : undefined;
  const badgeUniqueID = useUniqueID();
  const badgeContextValue = useMemo(
    () => ({ id: badgeUniqueID, isLive: false }),
    [badgeUniqueID]
  );

  const content = (
    <GeoBaseInteractiveRow
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      containerRef={containerRef}
      describedBy={joinDomIDs(
        describedBy,
        finalDescriptionID,
        badge ? badgeUniqueID : null
      )}
      disabledHeading={disabledHeading}
      disabledMessage={disabledMessage}
      hasAnimation={hasAnimation}
      id={id}
      isDisabled={isDisabled || isReadOnly}
      isFocusable={isFocusable}
      isHighlighted={isHighlighted}
      isHoverable={isHoverable}
      isVisuallyFocused={isVisuallyFocused}
      labelledBy={shouldLabel ? finalLabelID : null}
      link={link}
      loggingName={loggingName}
      onFocusChange={onFocusChange}
      onHoverChange={onHoverChange}
      onPress={onPress}
      tooltip={tooltip}
      xstyle={shouldUseListItem ? null : xstyle}
    >
      <GeoPrivateBadgeContext.Provider value={badgeContextValue}>
        <GeoPrivateBaseListRowLayout
          badge={badge}
          description={description}
          descriptionID={finalDescriptionID}
          isDisabled={isDisabled}
          labelID={finalLabelID}
          trailingContent={trailingContent}
          {...rest}
        />
      </GeoPrivateBadgeContext.Provider>
    </GeoBaseInteractiveRow>
  );

  return shouldUseListItem ? (
    <div className={stylex(styles.default, xstyle)} role="listitem">
      {content}
    </div>
  ) : (
    content
  );
};

GeoBaseListRow.displayName = "GeoBaseListRow";

export default makeGeoComponent("GeoBaseListRow", GeoBaseListRow);
