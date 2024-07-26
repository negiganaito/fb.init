/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const styles = {
  flatBottom: {
    borderBottomEndRadius: "x5pf9jr",
    borderBottomStartRadius: "xo71vjh",
    $$css: true,
  },
  flatTop: {
    borderTopEndRadius: "x13lgxp2",
    borderTopStartRadius: "x168nmei",
    $$css: true,
  },
  rounded: {
    borderTopStartRadius: "xp5s12f",
    borderTopEndRadius: "x11ucwad",
    borderBottomEndRadius: "xgtuqic",
    borderBottomStartRadius: "x155c047",
    $$css: true,
  },
};

const leftAlignStyles = {
  connectBottom: { borderBottomStartRadius: "x10y3i5r", $$css: true },
  connectTop: { borderTopStartRadius: "x1lcm9me", $$css: true },
};

const rightAlignStyles = {
  connectBottom: { borderBottomEndRadius: "xrt01vj", $$css: true },
  connectTop: { borderTopEndRadius: "x1yr5g0i", $$css: true },
};

function getMWXBubbleCornerStyles({
  align = "left",
  connectBottom = false,
  connectTop = false,
  flatten = "none",
  corners = "round",
} = {}) {
  const baseStyles = align === "right" ? rightAlignStyles : leftAlignStyles;

  return [
    corners === "round" && styles.rounded,
    connectTop && baseStyles.connectTop,
    connectBottom && baseStyles.connectBottom,
    (flatten === "all" || flatten === "bottom") && styles.flatBottom,
    (flatten === "all" || flatten === "top") && styles.flatTop,
  ];
}

export { getMWXBubbleCornerStyles };
