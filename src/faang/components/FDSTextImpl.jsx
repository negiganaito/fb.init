/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useContext } from "react";

import { useTranslationKeyForTextParent } from "../../business/components/DocumentTranslationStatusProvider.react";
import { FDSTextContextProviderNonNull } from "../../context/FDSTextContext";
import stylex from "../../helpers/stylex";

import BaseHeading from "./BaseHeading.react";
import { BaseTextContextProvider, useBaseTextContext } from "./BaseTextContext";
import CometDensityModeContext from "./CometDensityModeContext";
import CometLineClamp from "./CometLineClamp.react";
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
  heading: {
    maxWidth: "x193iq5w",
    minWidth: "xeuugli",
    ,
  },
  preserveNewLines: {
    whiteSpace: "x1fj9vlw",
    ,
  },
};

const alignmentStyles = {
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

const paddingBottomStyles = {
  1: { paddingBottom: "x1j85h84",  },
  2: { paddingBottom: "x1120s5i",  },
  3: { paddingBottom: "xg8j3zb",  },
};

const FDSTextImpl = forwardRef((props, ref) => {
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
    // testid,
    truncationTooltip,
    type,
  } = props;

  const [densityMode] = useContext(CometDensityModeContext);
  const lang = useContext(CometTextLangContext);
  const {
    fontFamily,
    fontSize,
    fontWeight = "normal",
    offsets = [0, 0],
  } = CometTextTypography[type];
  const [beforeMarginTop, afterMarginBottom, paddingBottom] =
    offsets.length === 3 ? offsets : [...offsets, 0];

  const baseTextContext = useBaseTextContext();
  const isNested =
    (baseTextContext === null ? void 0 : baseTextContext.nested) === true;
  const translationKey = useTranslationKeyForTextParent();

  const content = (
    <BaseTextContextProvider nested={true}>
      <FDSTextContextProviderNonNull color={color} type={type}>
        {(context) => (
          <span
            key={translationKey}
            className={stylex(
              styles.base,
              fontFamily,
              !isNested && styles.block,
              !isNested && paddingBottomStyles[beforeMarginTop],
              !isNested && paddingBottomStyles[afterMarginBottom],
              densityMode ? fontSizeStyles[fontSize] : fontSizeStyles[fontSize],
              { fontWeight },
              colorStyles[context.color],
              align !== "auto" && alignmentStyles[align],
              hyphens !== "none" && hyphens !== "none",
              preserveNewLines && styles.preserveNewLines
            )}
            data-testid={undefined}
            dir={isNested ? undefined : dir}
            id={id}
            lang={lang}
            ref={ref}
            suppressHydrationWarning={suppressHydrationWarning}
          >
            {numberOfLines !== null ? (
              <CometLineClamp
                lines={numberOfLines}
                truncationTooltip={truncationTooltip}
                xstyle={
                  paddingBottom !== 0 && paddingBottomStyles[paddingBottom]
                }
              >
                {children}
              </CometLineClamp>
            ) : (
              children
            )}
          </span>
        )}
      </FDSTextContextProviderNonNull>
    </BaseTextContextProvider>
  );

  return isSemanticHeading || isPrimaryHeading ? (
    <BaseHeading isPrimaryHeading={isPrimaryHeading} xstyle={styles.heading}>
      {content}
    </BaseHeading>
  ) : (
    content
  );
});

FDSTextImpl.displayName = `${FDSTextImpl.name}`;

export default FDSTextImpl;
