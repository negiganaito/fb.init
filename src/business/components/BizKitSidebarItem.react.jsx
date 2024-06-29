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
import React, { forwardRef, useContext, useMemo } from "react";
import stylex from "@stylexjs/stylex";

import CometPlaceholder from "../../faang/components/CometPlaceholder.react";
import useHoverState from "../../hooks/useHoverState";
import AbstractSidebarNavigationActiveContext from "../contexts/AbstractSidebarNavigationActiveContext";
import BizKitSidebarItemFeatureContext from "../contexts/BizKitSidebarItemFeatureContext";
import GeoBaseTextReact from "../geo-ui/GeoBaseText.react";
import GeoTooltipComponent from "../geo-ui/GeoTooltip.react";
import { useSidebarItemStyles } from "../helpers/sidebarNavigationStyles";

import AbstractSidebarItem from "./AbstractSidebarItem.react";
import BizKitLeftNavText from "./BizKitLeftNavText.react";
import BizKitSidebarItemIcon from "./BizKitSidebarItemIcon.react";

const styles = { containerNotFirst: { marginTop: "x1gslohp", $$css: !0 } };

const BizKitSidebarItem = forwardRef((props, ref) => {
  const {
    attachment,
    backgroundStyle,
    badge,
    href,
    icon,
    iconActive,
    iconDisabled,
    isDisabled = false,
    isFirst = false,
    label,
    onActivate,
    onPress,
    openInNewTab,
    tooltipContent = null,
    tooltipPosition,
    tooltipTitle = null,
    value,
  } = props;

  const sidebarItemStyles = useSidebarItemStyles(false);
  if (backgroundStyle !== null) {
    Object.assign(sidebarItemStyles, backgroundStyle);
  }

  const { isHovered, onMouseEnter, onMouseLeave } = useHoverState();

  const { value: activeValue } = useContext(
    AbstractSidebarNavigationActiveContext
  );
  const isActive = value === activeValue;

  const renderIcon = useMemo(() => {
    if (icon !== null && iconActive !== null) {
      return (
        <BizKitSidebarItemIcon
          icon={icon}
          isItemActive={isActive}
          isItemHovered={isHovered}
          badge={badge}
        />
      );
    }
    return null;
  }, [badge, icon, iconActive, isActive, isHovered]);

  const renderIconActive = useMemo(() => {
    if (iconActive !== null) {
      return (
        <BizKitSidebarItemIcon
          icon={iconActive}
          isItemActive={isActive}
          isItemHovered={isHovered}
          badge={badge}
        />
      );
    }
    return null;
  }, [badge, iconActive, isActive, isHovered]);

  const renderIconDisabled = useMemo(() => {
    if (iconDisabled !== null) {
      return (
        <BizKitSidebarItemIcon
          icon={iconDisabled}
          isItemActive={isActive}
          isItemHovered={isHovered}
          badge={badge}
        />
      );
    }
    return null;
  }, [badge, iconDisabled, isActive, isHovered]);

  const renderItem = useMemo(() => {
    return (
      <AbstractSidebarItem
        badge={<CometPlaceholder fallback={null}>{badge}</CometPlaceholder>}
        className="_8yjs _8yjt _a26l"
        href={href}
        icon={renderIcon}
        iconActive={renderIconActive}
        iconDisabled={renderIconDisabled}
        label={label}
        isDisabled={isDisabled}
        onActivate={onActivate}
        onPress={onPress}
        openInNewTab={openInNewTab}
        renderLabel={renderLabel}
        style={{ ...sidebarItemStyles, minWidth: 196, width: 196 }}
        value={value}
        attachmentAfter={attachment}
      />
    );
  }, [
    badge,
    label,
    href,
    renderIcon,
    renderIconActive,
    renderIconDisabled,
    isDisabled,
    onActivate,
    onPress,
    openInNewTab,
    sidebarItemStyles,
    value,
    attachment,
  ]);

  return (
    <BizKitSidebarItemFeatureContext.Provider initialValue={{ hasBadge: [] }}>
      <div
        className={!isFirst && stylex(styles.containerNotFirst)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={ref}
      >
        {tooltipContent !== null ? (
          <GeoTooltipComponent
            heading={tooltipTitle}
            content={tooltipContent}
            position={tooltipPosition}
          >
            {renderItem}
          </GeoTooltipComponent>
        ) : (
          renderItem
        )}
      </div>
    </BizKitSidebarItemFeatureContext.Provider>
  );
});

BizKitSidebarItem.displayName = `${BizKitSidebarItem.name}`;

const renderLabel = (isActive, label, isDisabled) => {
  const QEX_360 = true;
  const useGeoBaseText = QEX_360 ? isActive : false;
  const props = { size: "interactive" };

  return useGeoBaseText ? (
    <GeoBaseTextReact display="block" maxLines={2} color="inherit" {...props}>
      {label}
    </GeoBaseTextReact>
  ) : (
    <BizKitLeftNavText display="inline" weight={null} {...props}>
      {label}
    </BizKitLeftNavText>
  );
};

renderLabel.displayName = `${renderLabel.name}`;

export default BizKitSidebarItem;
