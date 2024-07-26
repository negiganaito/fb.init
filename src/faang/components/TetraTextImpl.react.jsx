/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { forwardRef, jsx as _jsx, useContext } from "react";
import stylex from "@stylexjs/stylex";

import { useTranslationKeyForTextParent as useTranslationKeyForTextParentDefault } from "../../business/components/DocumentTranslationStatusProvider.react";

import BaseHeading from "./BaseHeading.react";
import { BaseTextContextProvider, useBaseTextContext } from "./BaseTextContext";
import CometDensityModeContext from "./CometDensityModeContext";
import CometLineClamp from "./CometLineClamp.react";
import { CometTextContextProviderNonNull } from "./CometTextContext.react";
import CometTextLangContext from "./CometTextLangContext";
import CometTextTypography from "./CometTextTypography.react";

const styles = {
  base: {
    maxWidth: "x193iq5w",
    minWidth: "xeuugli",
    wordBreak: "x13faqbe",
    wordWrap: "x1vvkbs",
    $$css: true,
  },
  block: {
    display: "x1lliihq",
    "::after_content": "x1s928wv",
    "::after_display": "xhkezso",
    "::after_height": "x1gmr53x",
    "::before_content": "x1cpjm7i",
    "::before_display": "x1fgarty",
    "::before_height": "x1943h6x",
    $$css: true,
  },
  heading: { maxWidth: "x193iq5w", minWidth: "xeuugli", $$css: true },
  preserveNewLines: { whiteSpace: "x1fj9vlw", $$css: true },
};

const textAlignStyles = {
  center: { textAlign: "x2b8uid", $$css: true },
  end: { textAlign: "xp4054r", $$css: true },
  start: { textAlign: "x1yc453h", $$css: true },
};

const colorStyles = {
  blueLink: { color: "x1fey0fg", $$css: true },
  disabled: { color: "x1dntmbh", $$css: true },
  disabledButton: { color: "x1x80s81", $$css: true },
  highlight: { color: "x1qq9wsj", $$css: true },
  negative: { color: "x1a1m0xk", $$css: true },
  placeholder: { color: "x12scifz", $$css: true },
  positive: { color: "x6u5lvz", $$css: true },
  primary: { color: "xzsf02u", $$css: true },
  primaryButton: { color: "xtk6v10", $$css: true },
  primaryDeemphasizedButton: { color: "x1mvi0mv", $$css: true },
  primaryOnMedia: { color: "x17z8epw", $$css: true },
  secondary: { color: "xi81zsa", $$css: true },
  secondaryButton: { color: "x1dem4cn", $$css: true },
  secondaryOnMedia: { color: "xkxfvhb", $$css: true },
  selectedOption: { color: "x1qoxp87", $$css: true },
  tertiary: { color: "x12scifz", $$css: true },
  tooltip: { color: "xzsf02u", $$css: true },
  white: { color: "x14ctfv", $$css: true },
};

const fontSizeStyles = {
  12: { fontSize: "x1pg5gke", lineHeight: "xvq8zen", $$css: true },
  13: { fontSize: "x1nxh6w3", lineHeight: "x1sibtaa", $$css: true },
  14: { fontSize: "x1f6kntn", lineHeight: "x1ruc54x", $$css: true },
  15: { fontSize: "x6prxxf", lineHeight: "xvq8zen", $$css: true },
  16: { fontSize: "x1jchvi3", lineHeight: "x132q4wb", $$css: true },
  17: { fontSize: "x1lkfr7t", lineHeight: "x1lbecb7", $$css: true },
  20: { fontSize: "x1603h9y", lineHeight: "x1u7k74", $$css: true },
  24: { fontSize: "xngnso2", lineHeight: "x1qb5hxa", $$css: true },
  28: { fontSize: "x1q74xe4", lineHeight: "xyesn5m", $$css: true },
  32: { fontSize: "x579bpy", lineHeight: "xjkpybl", $$css: true },
};

const denseFontSizeStyles = {
  12: { fontSize: "x1pg5gke", lineHeight: "xvq8zen", $$css: true },
  13: { fontSize: "x1pg5gke", lineHeight: "x1sibtaa", $$css: true },
  15: { fontSize: "x1f6kntn", lineHeight: "xvq8zen", $$css: true },
  17: { fontSize: "x1jchvi3", lineHeight: "x1lbecb7", $$css: true },
  20: { fontSize: "x1603h9y", lineHeight: "x1u7k74", $$css: true },
  24: { fontSize: "xngnso2", lineHeight: "x1qb5hxa", $$css: true },
  28: { fontSize: "x1q74xe4", lineHeight: "xyesn5m", $$css: true },
  32: { fontSize: "x579bpy", lineHeight: "xjkpybl", $$css: true },
};

const fontWeightStyles = {
  bold: { fontWeight: "x1xlr1w8", $$css: true },
  medium: { fontWeight: "xk50ysn", $$css: true },
  normal: { fontWeight: "xo1l8bm", $$css: true },
  semibold: { fontWeight: "x1s688f", $$css: true },
};

const hyphenStyles = {
  auto: { hyphens: "xkjl1po", $$css: true },
  manual: { hyphens: "xxydokm", $$css: true },
};

const offsetStyles = {
  0: { $$css: true },
  1: { "::before_marginTop": "x1ckan80", $$css: true },
  2: { "::before_marginTop": "x1s3etm8", $$css: true },
  3: { "::before_marginTop": "x1tu3fi", $$css: true },
  4: { "::before_marginTop": "x4zkp8e", $$css: true },
  5: { "::before_marginTop": "xudqn12", $$css: true },
  6: { "::before_marginTop": "xtoi2st", $$css: true },
  7: { "::before_marginTop": "x14z4hjw", $$css: true },
  8: { "::before_marginTop": "x1ill7wo", $$css: true },
  9: { "::before_marginTop": "xhau9xz", $$css: true },
  10: { "::before_marginTop": "x14qwyeo", $$css: true },
};

const marginBottomStyles = {
  1: { "::after_marginBottom": "xo8pqpo", $$css: true },
  2: { "::after_marginBottom": "xlf94lp", $$css: true },
  3: { "::after_marginBottom": "x676frb", $$css: true },
  4: { "::after_marginBottom": "x3x7a5m", $$css: true },
  5: { "::after_marginBottom": "x41vudc", $$css: true },
  6: { "::after_marginBottom": "xw06pyt", $$css: true },
  7: { "::after_marginBottom": "x1g2y4wz", $$css: true },
  8: { "::after_marginBottom": "x1x48ksl", $$css: true },
  9: { "::after_marginBottom": "x1guzi96", $$css: true },
  10: { "::after_marginBottom": "x1y9wsrc", $$css: true },
};

const paddingBottomStyles = {
  1: { paddingBottom: "x1j85h84", $$css: true },
  2: { paddingBottom: "x1120s5i", $$css: true },
  3: { paddingBottom: "xg8j3zb", $$css: true },
};

const TetraText = forwardRef((props, ref) => {
  const {
    align = "auto",
    children,
    color,
    dir = "auto",
    hyphens = "none",
    id,
    isPrimaryHeading = false,
    isSemanticHeading = false,
    numberOfLines,
    preserveNewLines = false,
    suppressHydrationWarning,
    testid,
    truncationTooltip,
    type,
  } = props;

  const densityMode = useContext(CometDensityModeContext);
  const [density] = densityMode;
  const lang = useContext(CometTextLangContext);
  const typography = CometTextTypography[type];
  const {
    fontFamily,
    fontSize,
    fontWeight = "normal",
    offsets = [0, 0],
  } = typography;
  const [topOffset, bottomOffset] = offsets;
  const marginBottom =
    numberOfLines !== null
      ? bottomOffset + (offsets.length === 3 ? offsets[2] : 0)
      : bottomOffset;

  const baseTextContext = useBaseTextContext();
  const isNested = baseTextContext?.nested === true;

  const useTranslationKeyForTextParent =
    useTranslationKeyForTextParentDefault.useTranslationKeyForTextParent ||
    (() => ({}));
  const translationKey = useTranslationKeyForTextParent();

  const textComponent = _jsx(BaseTextContextProvider, {
    nested: true,
    children: _jsx(CometTextContextProviderNonNull, {
      color,
      type,
      children: ({ color: textColor }) =>
        _jsx(
          "span",
          {
            className: stylex(
              styles.base,
              fontFamily,
              !isNested && styles.block,
              !isNested && offsetStyles[topOffset],
              !isNested && marginBottomStyles[marginBottom],
              density
                ? denseFontSizeStyles[fontSize]
                : fontSizeStyles[fontSize],
              fontWeightStyles[fontWeight],
              colorStyles[textColor],
              align !== "auto" && textAlignStyles[align],
              hyphens !== "none" && hyphenStyles[hyphens],
              preserveNewLines && styles.preserveNewLines
            ),
            "data-testid": testid,
            dir: isNested ? undefined : dir,
            id,
            lang,
            ref,
            suppressHydrationWarning,
            children:
              numberOfLines !== null
                ? _jsx(CometLineClamp, {
                    lines: numberOfLines,
                    truncationTooltip,
                    xstyle:
                      offsets.length === 3 && paddingBottomStyles[offsets[2]],
                    children,
                  })
                : children,
          },
          translationKey
        ),
    }),
  });

  return isSemanticHeading || isPrimaryHeading
    ? _jsx(BaseHeading, {
        isPrimaryHeading,
        xstyle: styles.heading,
        children: textComponent,
      })
    : textComponent;
});

TetraText.displayName = "TetraText";

export default TetraText;
