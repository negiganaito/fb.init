/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback, useContext } from "react";
import joinClasses from "fbjs/lib/joinClasses";

import AbstractSidebarRouterLinkContext from "../contexts/AbstractSidebarRouterLinkContext";
import { useApplyGeoDomIDsDirectly } from "../geo-ui/GeoDomID";

const AbstractSidebarLink = ({
  children,
  className,
  "data-testid": dataTestId,
  describedBy,
  href,
  isExpanded,
  label,
  labelledBy,
  onActivate,
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  openInNewTab = false,
  role = "link",
  style,
  tabIndex,
  value,
}) => {
  const handleClick = useCallback(
    (event) => {
      if (onActivate) {
        onActivate(value, event);
      }
    },
    [onActivate, value]
  );

  const isLink = href !== null;
  const combinedClassName = joinClasses(
    `_7w6q${isLink ? " _7w6r" : ""}${isLink ? "" : " _7w5n"}`,
    className
  );

  const geoDomProps = useApplyGeoDomIDsDirectly({
    "aria-describedby": describedBy,
    "aria-labelledby": labelledBy,
  });

  const commonProps = {
    "aria-expanded": isExpanded,
    "aria-label": label,
    "data-testid": dataTestId,
    className: combinedClassName,
    onBlur,
    onClick: handleClick,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    style,
    tabIndex: tabIndex !== null ? tabIndex : 0,
  };

  const RouterLink = useContext(AbstractSidebarRouterLinkContext);

  return isLink ? (
    <RouterLink
      {...commonProps}
      aria-describedby={describedBy}
      aria-labelledby={labelledBy}
      href={href}
      role={role !== "button" ? role : undefined}
      target={openInNewTab ? "_blank" : undefined}
    >
      {children}
    </RouterLink>
  ) : (
    <button {...commonProps} {...geoDomProps} role={role} type="button">
      {children}
    </button>
  );
};

AbstractSidebarLink.displayName = "AbstractSidebarLink";

export default AbstractSidebarLink;
