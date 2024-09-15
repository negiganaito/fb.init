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
    ,
  },
  block: {
    display: "x1lliihq",
    "::after_content": "",
    "::after_display": "xhkezso",
    "::after_height": "x1gmr53x",
    "::before_content": "x1cpjm7i",
    "::before_display": "x1fgarty",
    "::before_height": "x1943h6x",
    ,
  },
  heading: { maxWidth: "x193iq5w", minWidth: "xeuugli",  },
  preserveNewLines: { whiteSpace: "x1fj9vlw",  },
};

const textAlignStyles = {
  center: { textAlign: "x2b8uid",  },
  end: { textAlign: "xp4054r",  },
  start: { textAlign: "x1yc453h",  },
};

const colorStyles = {
  blueLink: { color: "x1fey0fg",  },
  disabled: { color: "x1dntmbh",  },
  disabledButton: { color: "x1x80s81",  },
  highlight: { color: "x1qq9wsj",  },
  negative: { color: "x1a1m0xk",  },
  placeholder: { color: "x12scifz",  },
  positive: { color: "x6u5lvz",  },
  primary: { color: "xzsf02u",  },
  primaryButton: { color: "xtk6v10",  },
  primaryDeemphasizedButton: { color: "x1mvi0mv",  },
  primaryOnMedia: { color: "x17z8epw",  },
  secondary: { color: "xi81zsa",  },
  secondaryButton: { color: "x1dem4cn",  },
  secondaryOnMedia: { color: "xkxfvhb",  },
  selectedOption: { color: "x1qoxp87",  },
  tertiary: { color: "x12scifz",  },
  tooltip: { color: "xzsf02u",  },
  white: { color: "x14ctfv",  },
};

const fontSizeStyles = {
  12: { fontSize: "x1pg5gke", lineHeight: "xvq8zen",  },
  13: { fontSize: "x1nxh6w3", lineHeight: "x1sibtaa",  },
  14: { fontSize: "x1f6kntn", lineHeight: "x1ruc54x",  },
  15: { fontSize: "x6prxxf", lineHeight: "xvq8zen",  },
  16: { fontSize: "x1jchvi3", lineHeight: "x132q4wb",  },
  17: { fontSize: "x1lkfr7t", lineHeight: "x1lbecb7",  },
  20: { fontSize: "x1603h9y", lineHeight: "x1u7k74",  },
  24: { fontSize: "xngnso2", lineHeight: "x1qb5hxa",  },
  28: { fontSize: "x1q74xe4", lineHeight: "xyesn5m",  },
  32: { fontSize: "x579bpy", lineHeight: "xjkpybl",  },
};

const denseFontSizeStyles = {
  12: { fontSize: "x1pg5gke", lineHeight: "xvq8zen",  },
  13: { fontSize: "x1pg5gke", lineHeight: "x1sibtaa",  },
  15: { fontSize: "x1f6kntn", lineHeight: "xvq8zen",  },
  17: { fontSize: "x1jchvi3", lineHeight: "x1lbecb7",  },
  20: { fontSize: "x1603h9y", lineHeight: "x1u7k74",  },
  24: { fontSize: "xngnso2", lineHeight: "x1qb5hxa",  },
  28: { fontSize: "x1q74xe4", lineHeight: "xyesn5m",  },
  32: { fontSize: "x579bpy", lineHeight: "xjkpybl",  },
};

const fontWeightStyles = {
  bold: { fontWeight: "x1xlr1w8",  },
  medium: { fontWeight: "xk50ysn",  },
  normal: { fontWeight: "xo1l8bm",  },
  semibold: { fontWeight: "x1s688f",  },
};

const hyphenStyles = {
  auto: { hyphens: "xkjl1po",  },
  manual: { hyphens: "xxydokm",  },
};

const offsetStyles = {
  0: {  },
  1: { "::before_marginTop": "x1ckan80",  },
  2: { "::before_marginTop": "x1s3etm8",  },
  3: { "::before_marginTop": "x1tu3fi",  },
  4: { "::before_marginTop": "x4zkp8e",  },
  5: { "::before_marginTop": "xudqn12",  },
  6: { "::before_marginTop": "xtoi2st",  },
  7: { "::before_marginTop": "x14z4hjw",  },
  8: { "::before_marginTop": "x1ill7wo",  },
  9: { "::before_marginTop": "xhau9xz",  },
  10: { "::before_marginTop": "x14qwyeo",  },
};

const marginBottomStyles = {
  1: { "::after_marginBottom": "xo8pqpo",  },
  2: { "::after_marginBottom": "xlf94lp",  },
  3: { "::after_marginBottom": "x676frb",  },
  4: { "::after_marginBottom": "x3x7a5m",  },
  5: { "::after_marginBottom": "x41vudc",  },
  6: { "::after_marginBottom": "xw06pyt",  },
  7: { "::after_marginBottom": "x1g2y4wz",  },
  8: { "::after_marginBottom": "x1x48ksl",  },
  9: { "::after_marginBottom": "x1guzi96",  },
  10: { "::after_marginBottom": "x1y9wsrc",  },
};

const paddingBottomStyles = {
  1: { paddingBottom: "x1j85h84",  },
  2: { paddingBottom: "x1120s5i",  },
  3: { paddingBottom: "xg8j3zb",  },
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
