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

import FlexLayout from "../../faang/components/FlexLayout.react";
import Tooltip from "../../faang/components/Tooltip";
import useKeyboardFocus from "../../hooks/useKeyboardFocus";
import useUniqueID from "../../hooks/useUniqueID";
import AbstractSidebarGroupContext from "../contexts/AbstractSidebarGroupContext";
import AbstractSidebarNavigationDisplayContext from "../contexts/AbstractSidebarNavigationDisplayContext";
import EllipsisText from "../EllipsisText.react";
import PositionEnumWithPropType from "../helpers/PositionEnum";

import AbstractSidebarLink from "./AbstractSidebarLink.react";

const AbstractSidebarBaseItem = ({
  attachmentAfter,
  badge,
  "data-testid": dataTestId,
  href,
  icon,
  iconActive,
  iconDisabled,
  isActive,
  isDisabled = false,
  isExpanded,
  id,
  label,
  onActivate,
  openInNewTab = false,
  renderLabel,
  renderSublabel,
  renderTooltip,
  role,
  sublabel,
  style,
  value,
}) => {
  const { isKeyboardFocused, onBlur, onFocus, onKeyDown } = useKeyboardFocus();
  const isCollapsed = useContext(
    AbstractSidebarNavigationDisplayContext
  ).isCollapsed;
  const isInGroup = useContext(AbstractSidebarGroupContext);
  const uniqueID = useUniqueID();

  const renderedLabel = renderLabel(isActive, label, isDisabled);
  const iconElement = isActive ? iconActive : isDisabled ? iconDisabled : icon;

  const linkElement = isDisabled ? (
    <span className="accessible_elem">{renderedLabel}</span>
  ) : (
    <AbstractSidebarLink
      className={`_7vcb${isKeyboardFocused ? "" : " _5f0v"}`}
      describedBy={uniqueID}
      href={href}
      isExpanded={isExpanded}
      label={label}
      onActivate={onActivate}
      openInNewTab={openInNewTab}
      role={role}
      tabIndex={isInGroup === false ? -1 : 0}
      value={value}
      style={{ position: "absolute" }}
    >
      <span className="accessible_elem">{renderedLabel}</span>
    </AbstractSidebarLink>
  );

  const content = (
    <div className="_7pon" style={style}>
      {linkElement}
      <div className="_6j1m">
        <FlexLayout direction="vertical" className_DO_NOT_USE="_6j0l">
          <EllipsisText>{renderedLabel}</EllipsisText>
          {sublabel !== undefined && renderSublabel !== undefined && (
            <span id={uniqueID}>
              {renderSublabel(isActive, sublabel, isDisabled)}
            </span>
          )}
        </FlexLayout>
      </div>
      <div className="_7ar0 _7ar1">
        {Boolean(icon) && <div className="_6j0j _6j0k">{iconElement}</div>}
      </div>
      <div className="_7ar0 _7ar2" aria-hidden={isCollapsed}>
        {Boolean(badge) && <span className="_6j0j _6j0m">{badge}</span>}
        {Boolean(attachmentAfter) && (
          <span className="_6j0j _6j0n">{attachmentAfter}</span>
        )}
      </div>
    </div>
  );

  return (
    <div
      {...(isActive ? { "aria-current": "page" } : {})}
      className={`_7aq-${isActive ? " _6j1n" : ""}${
        isDisabled ? " _aeu_" : ""
      }${isKeyboardFocused ? " _6j0g" : ""}`}
      id={id}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
    >
      {renderTooltip ? (
        <Tooltip
          className="_7aq_"
          position={PositionEnumWithPropType.right}
          tooltip={
            isCollapsed ? renderTooltip(isActive, label, sublabel) : null
          }
        >
          {content}
        </Tooltip>
      ) : (
        content
      )}
    </div>
  );
};

AbstractSidebarBaseItem.displayName = "AbstractSidebarBaseItem";

export default AbstractSidebarBaseItem;
