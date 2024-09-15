/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback } from "react";
import { html } from "react-strict-dom";

import BaseRadio from "./BaseRadio";
import { isWeb } from "./XPlatReactEnvironment";

const styles = {
  checkedIcon: {
    backgroundColor: "x4a0cgk",
    borderTopStartRadius: "xzolkzo",
    borderTopEndRadius: "x12go9s9",
    borderBottomEndRadius: "x1rnf11y",
    borderBottomStartRadius: "xprq8jg",
    ,
  },
  checkedIconDisabled: {
    backgroundColor: "x1h4ntba",
    ,
  },
  checkedIconLarge: {
    height: "x12argms",
    width: "xfw7k77",
    ,
  },
  checkedIconMedium: {
    height: "x11pg2cd",
    width: "x1uygn3o",
    ,
  },
  deselectedBorder: {
    borderTopColor: "xdcada7",
    borderEndColor: "x1dfjofp",
    borderBottomColor: "x520ylh",
    borderStartColor: "x1snnzal",
    ,
  },
  disabledBorder: {
    borderTopColor: "xncqo9g",
    borderEndColor: "xjzxvc5",
    borderBottomColor: "x19gsqmy",
    borderStartColor: "xen8era",
    ,
  },
  radio: {
    display: "x78zum5",
    ,
  },
  radioBorder: {
    alignItems: "x6s0dn4",
    borderTopStartRadius: "xzolkzo",
    borderTopEndRadius: "x12go9s9",
    borderBottomEndRadius: "x1rnf11y",
    borderBottomStartRadius: "xprq8jg",
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "x7p5aqh",
    borderEndWidth: "xhmw3ml",
    borderBottomWidth: "xtqzso9",
    borderStartWidth: "x1gj0nxp",
    boxSizing: "x9f619",
    flexShrink: "x2lah0s",
    justifyContent: "xl56j7k",
    position: "relative",
    ,
  },
  selectedBorder: {
    borderTopColor: "x1uuarju",
    borderEndColor: "xg4qi04",
    borderBottomColor: "x1357zma",
    borderStartColor: "x1skcyn1",
    ,
  },
  sizeLarge: {
    height: "x17yl4rm",
    width: "x1b5gfsw",
    ,
  },
  sizeMedium: {
    height: "xvq70eu",
    width: "x1evt7rs",
    ,
  },
  web: {
    display: 0,
    ,
  },
};

function CheckedIcon({ disabled, size }) {
  return (
    <html.div
      style={[
        styles.checkedIcon,
        disabled && styles.checkedIconDisabled,
        size === "large" || size === "xlarge"
          ? styles.checkedIconLarge
          : styles.checkedIconMedium,
      ]}
    />
  );
}

CheckedIcon.displayName = `${CheckedIcon.name} [from ${module.id}]`;

function BaseStyledRadio({
  checked,
  checkedIcon,
  children,
  deselectedBorderXStyle,
  disabled = false,
  id,
  name,
  onSelect,
  selectedBorderXStyle,
  size = "large",
  suppressFocusRing,
  tabIndex,
  testid,
  value,
  ...rest
}) {
  const icon = checkedIcon ?? <CheckedIcon disabled={disabled} size={size} />;
  const handleSelect = useCallback(() => {
    onSelect(value);
  }, [onSelect, value]);

  return (
    <BaseRadio
      {...rest}
      checked={checked}
      disabled={disabled}
      id={id}
      name={name}
      onValueChange={handleSelect}
      suppressFocusRing={suppressFocusRing}
      tabIndex={tabIndex}
      testid={undefined}
      value={value !== null ? String(value) : null}
      xstyle={styles.radio}
    >
      <html.div
        style={[
          styles.radioBorder,
          isWeb() && styles.web,
          !disabled && checked && styles.selectedBorder,
          !disabled && checked && selectedBorderXStyle,
          !disabled && !checked && styles.deselectedBorder,
          !disabled && !checked && deselectedBorderXStyle,
          disabled && styles.disabledBorder,
          (size === "large" || size === "xlarge") && styles.sizeLarge,
          size === "medium" && styles.sizeMedium,
        ]}
      >
        {checked ? icon : null}
      </html.div>
      {children}
    </BaseRadio>
  );
}

BaseStyledRadio.displayName = `${BaseStyledRadio.name} [from ${module.id}]`;

export default BaseStyledRadio;
