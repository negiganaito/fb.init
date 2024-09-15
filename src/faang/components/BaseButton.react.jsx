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

/* eslint-disable complexity */

import React, { forwardRef, useContext } from "react";

import useFeedPressEventHandler from "../../hooks/useFeedPressEventHandler";

import BaseButtonPopoverContext from "./BaseButtonPopoverContext.react";
import Pressable from "./Pressable.react";
import PressableText from "./PressableText.react";

const BaseButton = forwardRef((props, ref) => {
  const {
    allowClickEventPropagation,
    activedescendant,
    ariaChecked,
    ariaControls,
    ariaCurrent,
    ariaDescribedby,
    ariaExpanded,
    ariaHaspopup,
    ariaHidden,
    ariaInvalid,
    ariaLabel,
    ariaLabelledby,
    ariaPressed,
    ariaSelected,
    children,
    className_DEPRECATED,
    disabled = false,
    display = "inline",
    focusable,
    id,
    label,
    onBlur,
    onClick,
    onContextMenu,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onHoverEnd,
    onHoverStart,
    onPressChange,
    onPressEnd,
    onPressStart,
    preventContextMenu,
    role,
    style,
    suppressFocusRing,
    suppressHydrationWarning,
    testid,
    testOnly_pressed = false,
    xstyle,
  } = props;

  const buttonPopoverContext = useContext(BaseButtonPopoverContext);

  const pressEventHandler = useFeedPressEventHandler(onClick);
  const pressStartEventHandler = useFeedPressEventHandler(onPressStart);
  const contextMenuEventHandler = useFeedPressEventHandler(onContextMenu);

  const accessibilityLabel = role !== "none" ? ariaLabel ?? label : undefined;

  const btnProps = {
    accessibilityLabel,
    accessibilityRelationship: {
      activedescendant,
      controls: ariaControls,
      current: ariaCurrent,
      describedby: ariaDescribedby,
      haspopup:
        buttonPopoverContext !== null && ariaHaspopup === null
          ? buttonPopoverContext.haspopup
          : ariaHaspopup,
      labelledby: ariaLabelledby,
    },
    accessibilityState: {
      checked: ariaChecked,
      disabled,
      expanded:
        buttonPopoverContext !== null && ariaExpanded === null
          ? buttonPopoverContext.expanded
          : ariaExpanded,
      hidden: ariaHidden,
      invalid: ariaInvalid,
      pressed: ariaPressed,
      selected: ariaSelected,
    },
    className_DEPRECATED,
    disabled,
    forwardedRef: ref,
    nativeID: id,
    onBlur,
    onContextMenu: contextMenuEventHandler,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onHoverEnd,
    onHoverStart,
    onPress: pressEventHandler,
    onPressChange,
    onPressEnd,
    onPressStart: pressStartEventHandler,
    preventContextMenu,
    style,
    suppressHydrationWarning,
    testID: testid,
    testOnly_state: {
      disabled: !1,
      focused: !1,
      focusVisible: !1,
      hovered: !1,
      pressed: testOnly_pressed,
    },
    xstyle,
  };

  if (display === "block") {
    const accessibilityRole =
      role === "menuitem" ||
      role === "none" ||
      role === "gridcell" ||
      role === "switch" ||
      role === "combobox" ||
      role === "checkbox" ||
      role === "tab" ||
      role === "radio" ||
      role === "option"
        ? role
        : "button";

    return (
      <Pressable
        {...btnProps}
        accessibilityRole={accessibilityRole}
        allowClickEventPropagation={allowClickEventPropagation}
        suppressFocusRing={suppressFocusRing}
        tabbable={focusable}
      >
        {children}
      </Pressable>
    );
  } else {
    const accessibilityRole =
      role === "combobox" ||
      role === "menuitem" ||
      role === "menuitemcheckbox" ||
      role === "menuitemradio" ||
      role === "option" ||
      role === "none" ||
      role === "tab"
        ? role
        : "button";

    return (
      <PressableText
        {...btnProps}
        focusable={focusable}
        accessibilityRole={accessibilityRole}
        direction="none"
        suppressFocusRing={suppressFocusRing}
      >
        {children}
      </PressableText>
    );
  }
});

BaseButton.displayName = "BaseButton";

export { BaseButton };
