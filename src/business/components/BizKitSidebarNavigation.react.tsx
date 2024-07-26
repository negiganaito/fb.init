/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

// BizKitSidebarNavigation.react.tsx

import React from "react";
import { stylex } from "@stylexjs/stylex";
import AbstractSidebarNavigation from "AbstractSidebarNavigation.react";
import BizKitErrorBoundary from "BizKitErrorBoundary.react";
import {
  GLOBAL_NAV_COLLAPSED_WIDTH_PX,
  GLOBAL_NAV_EXPANDED_WIDTH_PX,
} from "BizKitStyles";
import emptyFunction from "emptyFunction";
import GeoScrollableArea from "GeoScrollableArea.react";
import { useSidebarContainerStyles } from "sidebarNavigationStyles";
import { useGeoTheme } from "useGeoTheme";

type BizKitSidebarNavigationProps = {
  children: React.ReactNode;
  footer: React.ReactNode;
  header: React.ReactNode;
  isCollapsed: boolean;
  value: any;
};

const styles = {
  root: {
    backgroundColor: "x1liytr5",
    boxSizing: "x9f619",
    display: "x78zum5",
    flexDirection: "xdt5ytf",
    height: "x5yr21d",
    $$css: true,
  },
  fullHeight: {
    height: "x5yr21d",
    $$css: true,
  },
  foaBorder: {
    "::before_height": "xq1wtrk",
    $$css: true,
  },
};

const BizKitSidebarNavigation: React.FC<BizKitSidebarNavigationProps> = ({
  children,
  footer,
  header,
  isCollapsed,
  value,
}) => {
  const sidebarStyles = useSidebarContainerStyles(false, isCollapsed);
  const combinedStyles = {
    ...sidebarStyles,
    transition: "width var(--fds-fast) var(--fds-soft)",
    width: isCollapsed
      ? GLOBAL_NAV_COLLAPSED_WIDTH_PX
      : GLOBAL_NAV_EXPANDED_WIDTH_PX,
  };

  const geoTheme = useGeoTheme();
  const selectElevation = geoTheme.selectElevation;

  return (
    <AbstractSidebarNavigation
      className={stylex(
        styles.root,
        selectElevation({ level: 1, useFOAShadow: true }),
        styles.foaBorder
      )}
      footer={<div className="x2lah0s x6ikm8r x10wlt62">{footer}</div>}
      header={<div className="x2lah0s x6ikm8r x10wlt62">{header}</div>}
      onChange={emptyFunction}
      isCollapsed={isCollapsed}
      style={combinedStyles}
      value={value}
    >
      <div className="xs83m0k x1iyjqo2 x6ikm8r x10wlt62">
        <GeoScrollableArea xstyle={styles.fullHeight} direction="vertical">
          <BizKitErrorBoundary fallback={null}>{children}</BizKitErrorBoundary>
        </GeoScrollableArea>
      </div>
    </AbstractSidebarNavigation>
  );
};

BizKitSidebarNavigation.displayName = `${BizKitSidebarNavigation.name} [from ${module.id}]`;

export default BizKitSidebarNavigation;
