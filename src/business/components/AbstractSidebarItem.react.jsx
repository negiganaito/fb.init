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
import React, { useCallback, useContext } from "react";

import AbstractSidebarGroupFeatureContext from "../contexts/AbstractSidebarGroupFeatureContext";
import AbstractSidebarNavigationActiveContext from "../contexts/AbstractSidebarNavigationActiveContext";
import { isRegularActivationEvent } from "../helpers/AbstractSidebarUtils";

import AbstractSidebarBaseItem from "./AbstractSidebarBaseItem.react";

function AbstractSidebarItem(props) {
  const {
    attachmentAfter,
    badge,
    className,
    containerRef,
    "data-testid": dataTestId,
    href,
    icon,
    iconActive,
    iconDisabled,
    id,
    isDisabled = false,
    label,
    onActivate,
    onPress,
    openInNewTab = false,
    renderLabel,
    renderSublabel,
    renderTooltip,
    sublabel,
    style,
    value,
  } = props;

  const { onChange, value: contextValue } = useContext(
    AbstractSidebarNavigationActiveContext
  );
  const isActive = contextValue === value;

  const handleActivate = useCallback(
    (value, event) => {
      const isLink = href !== null;
      const isActivationEvent = isRegularActivationEvent(event);
      const shouldOpenInNewTab = openInNewTab === true;

      onPress?.(event);

      if (!isLink || (isActivationEvent && !shouldOpenInNewTab)) {
        onActivate?.(value, event);
        onChange(value, event);
      }
    },
    [href, onActivate, onChange, onPress, openInNewTab]
  );

  return (
    <>
      <AbstractSidebarGroupFeatureContext.Push value={{ isActive }} />
      <li className={className} ref={containerRef}>
        <AbstractSidebarBaseItem
          attachmentAfter={attachmentAfter}
          badge={badge}
          data-testid={dataTestId}
          href={href}
          icon={icon}
          iconActive={iconActive}
          iconDisabled={iconDisabled}
          id={id}
          isActive={isActive}
          isDisabled={isDisabled}
          label={label}
          onActivate={handleActivate}
          openInNewTab={openInNewTab}
          renderLabel={renderLabel}
          renderSublabel={renderSublabel}
          renderTooltip={renderTooltip}
          role="link"
          sublabel={sublabel}
          style={style}
          value={value}
        />
      </li>
    </>
  );
}

AbstractSidebarItem.displayName = "AbstractSidebarItem";

export default AbstractSidebarItem;
