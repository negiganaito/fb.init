/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable no-unused-vars */

import React from "react";
import { _ } from "fbt";
import { isRTL } from "Locale";

import { fbicon } from "../../helpers/fbicon";

import CometSwitch from "./CometSwitch";
import FDSButton from "./FDSButton";
import FDSIcon from "./FDSIcon";

const getCheckboxAddOn = (props, disabled, labelId) => {
  const {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    on,
    onPress,
    testOnly_pressed,
    type,
    ...rest
  } = props;
  const iconProps = {
    ...rest,
    "aria-checked": onPress !== null ? on : undefined,
    color: disabled ? "disabled" : on ? "highlight" : "secondary",
    disabled,
    hideHoverOverlay: true,
    icon: on ? fbicon._("484757", 20) : fbicon._("659288", 20),
    onPress,
    role: onPress !== null ? "checkbox" : undefined,
    testOnly_pressed,
  };
  return ariaLabel !== null ? (
    <FDSIcon {...iconProps} aria-label={ariaLabel} />
  ) : (
    <FDSIcon
      {...iconProps}
      aria-labelledby={ariaLabelledBy !== null ? ariaLabelledBy : labelId}
    />
  );
};

const getRadioAddOn = (props, disabled, labelId) => {
  const {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    on,
    onPress,
    testOnly_pressed,
    type,
    ...rest
  } = props;
  const iconProps = {
    ...rest,
    "aria-checked": onPress !== null ? on : undefined,
    color: disabled ? "disabled" : on ? "highlight" : "secondary",
    disabled,
    hideHoverOverlay: true,
    icon: on ? fbicon("621399", 20) : fbicon("545517", 20),
    onPress,
    role: onPress !== null ? "radio" : undefined,
    testOnly_pressed,
  };
  return ariaLabel !== null ? (
    <FDSIcon {...iconProps} aria-label={ariaLabel} />
  ) : (
    <FDSIcon
      {...iconProps}
      aria-labelledby={ariaLabelledBy !== null ? ariaLabelledBy : labelId}
    />
  );
};

const getDisclosureAddOn = (props, disabled, level) => {
  const { text, type, ...rest } = props;
  const icon =
    level === 3
      ? isRTL()
        ? fbicon._("492521", 24)
        : fbicon._("492575", 24)
      : isRTL()
      ? fbicon._("492518", 20)
      : fbicon._("492572", 20);
  return (
    <FDSIcon
      {...rest}
      color={disabled ? "disabled" : "secondary"}
      disabled={disabled}
      icon={icon}
    />
  );
};

const getExpanderAddOn = (props, disabled, labelId) => {
  const {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    children,
    onPress,
    open,
    type,
    ...rest
  } = props;
  const iconProps = {
    ...rest,
    color: disabled ? "disabled" : "secondary",
    disabled,
    icon: open ? fbicon._("505565", 20) : fbicon._("492454", 20),
  };
  if (onPress !== null && ariaLabel !== null) {
    return <FDSIcon {...iconProps} aria-label={ariaLabel} onPress={onPress} />;
  }
  return onPress !== null && ariaLabelledBy !== null ? (
    <FDSIcon
      {...iconProps}
      aria-labelledby={ariaLabelledBy}
      onPress={onPress}
    />
  ) : (
    <FDSIcon {...iconProps} />
  );
};

const getIconAddOn = (props, disabled) => {
  const {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    color,
    icon,
    onHoverIn,
    onHoverOut,
    onPress,
    onPressIn,
    testOnly_pressed,
    type,
    ...rest
  } = props;
  const iconProps = {
    ...rest,
    color: disabled ? "disabled" : color !== null ? color : "primary",
    disabled,
    hideHoverOverlay: true,
    icon,
    testOnly_pressed,
  };
  const eventHandlers = { onHoverIn, onHoverOut, onPress, onPressIn };
  if (onPress !== null && ariaLabel !== undefined) {
    return <FDSIcon aria-label={ariaLabel} {...iconProps} {...eventHandlers} />;
  }
  return onPress !== null && ariaLabelledBy !== null ? (
    <FDSIcon
      aria-labelledby={ariaLabelledBy}
      {...iconProps}
      {...eventHandlers}
    />
  ) : (
    <FDSIcon {...iconProps} />
  );
};

const getButtonAddOn = (props, disabled) => {
  const { labelIsHidden = false, type, ...rest } = props;
  const buttonType = type === "primary-button" ? "primary" : "secondary";
  const buttonProps = labelIsHidden
    ? { disabled, labelIsHidden: true, type: buttonType, ...rest }
    : { disabled, type: buttonType, ...rest };
  return <FDSButton {...buttonProps} />;
};

const getSwitchAddOn = (props, disabled) => {
  const { onChange, size, type, value, ...rest } = props;
  return (
    <CometSwitch
      disabled={disabled}
      onClick={onChange}
      size={size}
      tabIndex={-1}
      value={value}
      {...rest}
      aria-label={
        rest.disabled === true
          ? _("__JHASH__AVRl6ij3kje__JHASH__")
          : _("__JHASH__AOlGHVa_PET__JHASH__")
      }
    />
  );
};

const getMoreOrCloseAddOn = (props, disabled) => {
  const { onPress, type, ...rest } = props;
  return (
    <FDSIcon
      {...rest}
      color={disabled ? "disabled" : "secondary"}
      disabled={disabled}
      icon={type === "more" ? fbicon._("484391", 24) : fbicon._("478237", 16)}
      onPress={onPress}
    />
  );
};

const getEndAddOn = (props, disabled, level, labelId) => {
  switch (props.type) {
    case "checkbox":
      return getCheckboxAddOn(props, disabled, labelId);
    case "radio":
      return getRadioAddOn(props, disabled, labelId);
    case "disclosure":
      return getDisclosureAddOn(props, disabled, level);
    case "expander":
      return getExpanderAddOn(props, disabled, labelId);
    case "icon":
      return getIconAddOn(props, disabled);
    case "primary-button":
    case "secondary-button":
      return getButtonAddOn(props, disabled);
    case "switch":
      return getSwitchAddOn(props, disabled);
    case "more":
    case "close":
      return getMoreOrCloseAddOn(props, disabled);
    case "body":
      return props.addOn;
    default:
      return null;
  }
};

export { getEndAddOn };
