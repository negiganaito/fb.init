/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { getTextTruncateStyle } from "../geo-ui/GeoTextUtils";

import useGeoTheme from "./useGeoTheme";

const styles = {
  inherit: { color: "x1heor9g", $$css: true },
};

const overflowStyles = {
  breakWord: {
    overflowWrap: "x1mzt3pk",
    wordWrap: "x1vvkbs",
    wordBreak: "x13faqbe",
    $$css: true,
  },
  normalOverflowWrap: { overflowWrap: "x1h4wwuj", $$css: true },
};

const weightStyles = {
  normal: { fontWeight: "x1fcty0u", $$css: true },
  bold: { fontWeight: "x117nqv4", $$css: true },
  inherit: { fontWeight: "x1pd3egz", $$css: true },
};

const alignStyles = {
  center: { textAlign: "x2b8uid", $$css: true },
  end: { textAlign: "xp4054r", $$css: true },
  start: { textAlign: "x1yc453h", $$css: true },
};

const whiteSpaceStyles = {
  inherit: { whiteSpace: "xq9mrsl", $$css: true },
  initial: { whiteSpace: "xti2ec1", $$css: true },
  normal: { whiteSpace: "xeaf4i8", $$css: true },
  nowrap: { whiteSpace: "xuxw1ft", $$css: true },
  pre: { whiteSpace: "x1sdyfia", $$css: true },
  preLine: { whiteSpace: "x1fj9vlw", $$css: true },
  preWrap: { whiteSpace: "x126k92a", $$css: true },
};

function useGeoPrivateTextStyle({
  color = "value",
  display = "inline",
  isDisabled = false,
  isInverted = false,
  overflowWrap = "inherit",
  size = "value",
  textAlign = "inherit",
  weight,
  whiteSpace = "inherit",
}) {
  const { selectFont, selectTextColor } = useGeoTheme();

  const whiteSpaceStyle = [
    whiteSpace === "inherit" && whiteSpaceStyles.inherit,
    whiteSpace === "initial" && whiteSpaceStyles.initial,
    whiteSpace === "normal" && whiteSpaceStyles.normal,
    whiteSpace === "nowrap" && whiteSpaceStyles.nowrap,
    whiteSpace === "pre" && whiteSpaceStyles.pre,
    whiteSpace === "pre-line" && whiteSpaceStyles.preLine,
    whiteSpace === "pre-wrap" && whiteSpaceStyles.preWrap,
  ];

  const textAlignStyle = [
    textAlign === "center" && alignStyles.center,
    textAlign === "start" && alignStyles.start,
    textAlign === "end" && alignStyles.end,
  ];

  return [
    selectFont({ size }),
    color === "inherit"
      ? styles.inherit
      : selectTextColor({ color, isDisabled, isInverted }),
    whiteSpaceStyle,
    textAlignStyle,
    display === "truncate" && getTextTruncateStyle(),
    overflowWrap === "break-word" && overflowStyles.breakWord,
    overflowWrap === "normal" && overflowStyles.normalOverflowWrap,
    weight !== null && weightStyles[weight],
  ];
}

export default useGeoPrivateTextStyle;
