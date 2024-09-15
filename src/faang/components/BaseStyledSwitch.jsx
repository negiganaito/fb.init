/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";
import { isRTL } from "fbjs/lib/Locale";

import BaseRow from "./BaseRow";
import BaseRowItem from "./BaseRowItem";
import BaseSwitch from "./BaseSwitch";
import BaseViewReact from "./BaseView.react";

const styles = {
  alignIcon: { alignItems: "x6s0dn4",  },
  background: {
    backgroundColor: "xvs79uf",
    bottom: "x1ey2m1c",
    boxSizing: "x9f619",
    end: "xds687c",
    left: null,
    right: null,
    start: "x17qophe",
    opacity: "xg01cxk",
    pointerEvents: "x47corl",
    position: "x10l6tqk",
    top: "x13vifvy",
    transitionDuration: "x1eub6wo",
    transitionProperty: "x19991ni",
    transitionTimingFunction: "x1d72o",
    ,
  },
  backgroundActive: {
    opacity: "x1hc1fzr",
    transitionDuration: "xii2z7h",
    transitionTimingFunction: "x1r7x56h",
    ,
  },
  disabled: {
    opacity: "xti2d7y",
    transitionDuration: "xii2z7h",
    transitionTimingFunction: "x1r7x56h",
    ,
  },
  innerShadow: {
    borderTopStartRadius: "xhw592a",
    borderTopEndRadius: "xwihvcr",
    borderBottomEndRadius: "x7wuybg",
    borderBottomStartRadius: "xb9tvrk",
    boxShadow: "xzdp66v",
    height: "x1fgtraw",
    width: "xvni27",
    ,
  },
  slider: {
    backgroundColor: "x14hiurz",
    borderTopStartRadius: "xyi19xy",
    borderTopEndRadius: "x1ccrb07",
    borderBottomEndRadius: "xtf3nb5",
    borderBottomStartRadius: "x1pc53ja",
    boxShadow: "x3bazc0",
    height: "xxk0z11",
    start: "xb1c2wi",
    left: null,
    right: null,
    pointerEvents: "x47corl",
    position: "x10l6tqk",
    top: "xs7f9wi",
    transitionDuration: "x1eub6wo",
    transitionProperty: "x11xpdln",
    transitionTimingFunction: "x1d72o",
    width: "xvy4d1p",
    ,
  },
  sliderActive: {
    transitionDuration: "xii2z7h",
    transitionTimingFunction: "x1r7x56h",
    ,
  },
  sliderActiveLeft: { transform: "x92xnlw",  },
  sliderActiveLeftSmall: { transform: "x13gy369",  },
  sliderActiveRight: { transform: "x13t98kf",  },
  sliderActiveRightSmall: { transform: "x13n5tbt",  },
  sliderIconContainer: { height: "x5yr21d", width: "xh8yej3",  },
  sliderSmall: { height: "x1qx5ct2", width: "xw4jnvo",  },
  switch: {
    backgroundColor: "xvjj3ju",
    borderTopStartRadius: "xhw592a",
    borderTopEndRadius: "xwihvcr",
    borderBottomEndRadius: "x7wuybg",
    borderBottomStartRadius: "xb9tvrk",
    boxSizing: "x9f619",
    display: "x1rg5ohu",
    height: "x1fgtraw",
    opacity: "x1hc1fzr",
    overflowX: "x6ikm8r",
    overflowY: "x10wlt62",
    paddingTop: 0,
    paddingEnd: 0,
    paddingBottom: 0,
    paddingStart: 0,
    position: "relative",
    transitionDuration: "x1eub6wo",
    transitionProperty: "x19991ni",
    transitionTimingFunction: "x1d72o",
    width: "xvni27",
    ,
  },
  switchSmall: {
    borderTopStartRadius: "xyi19xy",
    borderTopEndRadius: "x1ccrb07",
    borderBottomEndRadius: "xtf3nb5",
    borderBottomStartRadius: "x1pc53ja",
    height: "xxk0z11",
    width: "x187nhsf",
    ,
  },
};

const BaseStyledSwitch = forwardRef((props, ref) => {
  const {
    disabled = false,
    icon,
    onClick,
    onValueChange,
    size = "medium",
    suppressFocusRing,
    tabIndex,
    // testid,
    value,
    xstyle,
    ...rest
  } = props;

  const isSmall = size === "small";

  return (
    <BaseSwitch
      {...rest}
      checked={value}
      disabled={disabled}
      onClick={onClick}
      onValueChange={onValueChange}
      ref={ref}
      suppressFocusRing={suppressFocusRing}
      tabIndex={tabIndex}
      testid={undefined}
      xstyle={[
        styles.switch,
        isSmall && styles.switchSmall,
        disabled && styles.disabled,
        xstyle,
      ]}
    >
      <BaseViewReact
        xstyle={[styles.innerShadow, isSmall && styles.switchSmall, xstyle]}
      >
        <BaseViewReact
          xstyle={[styles.background, value && styles.backgroundActive]}
        />
        <BaseViewReact
          xstyle={[
            styles.slider,
            isSmall && styles.sliderSmall,
            value && styles.sliderActive,
            value &&
              (isRTL()
                ? [
                    styles.sliderActiveLeft,
                    isSmall && styles.sliderActiveLeftSmall,
                  ]
                : [
                    styles.sliderActiveRight,
                    isSmall && styles.sliderActiveRightSmall,
                  ]),
          ]}
        >
          {icon === null ? null : (
            <BaseRow
              align="center"
              expanding
              verticalAlign="center"
              xstyle={styles.sliderIconContainer}
            >
              <BaseRowItem
                expanding
                verticalAlign="center"
                xstyle={styles.alignIcon}
              >
                {icon}
              </BaseRowItem>
            </BaseRow>
          )}
        </BaseViewReact>
      </BaseViewReact>
    </BaseSwitch>
  );
});

BaseStyledSwitch.displayName = `${BaseStyledSwitch.name}`;

export default BaseStyledSwitch;
