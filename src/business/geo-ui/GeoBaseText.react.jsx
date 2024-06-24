/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, {
  forwardRef,
  Suspense,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import stylex from "stylex";

import useMergeRefs from "../../hooks/useMergeRefs";
import { DocumentTranslationStatusProvider } from "../components/DocumentTranslationStatusProvider.react";
import GeoPrivateBaseTextContext from "../contexts/GeoPrivateBaseTextContext";
import GeoPrivateDisabledContext from "../contexts/GeoPrivateDisabledContext";
import GeoPrivateGlimmeringHeadingStyleContext from "../contexts/GeoPrivateGlimmeringHeadingStyleContext";
import GeoPrivateInvertThemeContext from "../contexts/GeoPrivateInvertThemeContext";
import GeoPrivateLayerVisibilityContext from "../contexts/GeoPrivateLayerVisibilityContext";
import GeoPrivateTruncationContext from "../contexts/GeoPrivateTruncationContext";
import JSResource from "../helpers/JSResource";
import justknobx from "../helpers/justknobx";
import lazyLoadComponent from "../helpers/lazyLoadComponent";
import useGeoPrivateTextStyle from "../hooks/useGeoPrivateTextStyle";

import { useApplyGeoDomIDsDirectly } from "./GeoDomID";
import { makeGeoComponent } from "./GeoPrivateMakeComponent";
import { getAriaLevelForSize, isHeader } from "./GeoTextUtils";

const useTranslationKeyForTextParent =
  DocumentTranslationStatusProvider !== null
    ? DocumentTranslationStatusProvider.useTranslationKeyForTextParent
    : () => {};

const GeoTooltip = lazyLoadComponent(
  JSResource("GeoTooltip.react").__setRef("GeoBaseText.react")
);

const rootStyles = {
  minWidth: "xeuugli",
  $$css: true,
};

const singleLineNoWrapStyles = {
  overflowX: "x6ikm8r",
  overflowY: "x10wlt62",
  textOverflow: "xlyipyv",
  whiteSpace: "xuxw1ft",
  $$css: true,
};

const singleLinePreStyles = {
  overflowX: "x6ikm8r",
  overflowY: "x10wlt62",
  textOverflow: "xlyipyv",
  whiteSpace: "x1sdyfia",
  $$css: true,
};

const multiLineStyles = {
  display: "x104kibb",
  overflowX: "x6ikm8r",
  overflowY: "x10wlt62",
  WebkitBoxOrient: "x1ua5tub",
  $$css: true,
};

const rootStyleMap = {
  root: rootStyles,
  singleLineNoWrap: singleLineNoWrapStyles,
  singleLinePre: singleLinePreStyles,
  multiLine: multiLineStyles,
};

const GeoBaseText = forwardRef((props, ref) => {
  const {
    alwaysAddTooltip = false,
    children,
    color,
    "data-testid": dataTestId,
    display = "inline",
    id,
    isDisabled = false,
    maxLines = 0,
    overflowWrap = "normal",
    showTruncationTooltip = true,
    size = "value",
    textAlign = "inherit",
    tooltipRenderDelay,
    weight,
    whiteSpace = "inherit",
    xstyle,
  } = props;

  const elementRef = useRef(null);
  const Element = getElement(display);
  const disabledContext = useContext(GeoPrivateDisabledContext);
  const invertThemeContext = useContext(GeoPrivateInvertThemeContext);
  const glimmeringHeadingStyleContext = useContext(
    GeoPrivateGlimmeringHeadingStyleContext
  );
  const truncationContext = useContext(GeoPrivateTruncationContext);

  const textStyle = useGeoPrivateTextStyle({
    color,
    display,
    isDisabled: isDisabled || !!disabledContext,
    isInverted: !!invertThemeContext,
    overflowWrap,
    size,
    textAlign,
    weight,
    whiteSpace,
  });

  const isMultiLine = display === "block" && maxLines > 0;
  const isSingleLine = isMultiLine && maxLines === 1;
  const isMultiLineWithMoreLines = isMultiLine && maxLines > 1;
  const inlineStyle = isMultiLine
    ? {
        WebkitLineClamp: maxLines,
        ...(maxLines > 1 ? { textWrap: "wrap" } : {}),
      }
    : undefined;

  const shouldShowTooltip =
    alwaysAddTooltip ||
    (truncationContext !== null ? truncationContext : showTruncationTooltip);
  const tooltipData = useTooltipData(shouldShowTooltip, alwaysAddTooltip);

  const applyGeoDomIDs = useApplyGeoDomIDsDirectly({
    id,
  });

  const mergedRefs = useMergeRefs(
    elementRef,
    tooltipData[3],
    ref,
    applyGeoDomIDs.ref
  );

  const translationKey = useTranslationKeyForTextParent();

  return (
    <GeoPrivateBaseTextContext.Provider value={true}>
      <Element
        aria-level={getAriaLevelForSize(size)}
        className={stylex([
          textStyle,
          rootStyleMap.root,
          glimmeringHeadingStyleContext,
          isSingleLine &&
            (whiteSpace === "pre" && justknobx._("1568")
              ? rootStyleMap.singleLinePre
              : rootStyleMap.singleLineNoWrap),
          isMultiLineWithMoreLines && rootStyleMap.multiLine,
          xstyle,
        ])}
        data-testid={dataTestId}
        key={translationKey}
        onMouseEnter={shouldShowTooltip ? tooltipData[2] : undefined}
        ref={mergedRefs}
        role={isHeader(size) ? "heading" : undefined}
        style={inlineStyle}
        {...applyGeoDomIDs}
      >
        {children}
      </Element>
      {tooltipData[0] && tooltipData[1] !== null && (
        <Suspense fallback={null}>
          <GeoPrivateLayerVisibilityContext.Provider
            value={tooltipData[0] ? undefined : false}
          >
            <GeoTooltip
              content={tooltipData[1]}
              renderDelay={tooltipRenderDelay}
              triggerRef={elementRef}
            />
          </GeoPrivateLayerVisibilityContext.Provider>
        </Suspense>
      )}
    </GeoPrivateBaseTextContext.Provider>
  );
});

GeoBaseText.displayName = `GeoBaseText`;

function getElement(display) {
  switch (display) {
    case "block":
    case "truncate":
      return "div";
    default:
      return "span";
  }
}

function useTooltipData(alwaysAddTooltip, showTruncationTooltip) {
  const [tooltipContent, setTooltipContent] = useState(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const handleTooltipCheck = useCallback(
    (element) => {
      if (element !== null) {
        setIsTruncated(alwaysAddTooltip || isElementTruncated(element));
        setTooltipContent(element.textContent);
      }
    },
    [alwaysAddTooltip]
  );

  const handleMouseEnter = useCallback(
    (event) => {
      handleTooltipCheck(event.target);
    },
    [handleTooltipCheck]
  );

  return [
    tooltipContent,
    isTruncated,
    showTruncationTooltip || alwaysAddTooltip ? handleMouseEnter : undefined,
    showTruncationTooltip || alwaysAddTooltip ? handleTooltipCheck : undefined,
  ];
}

function isElementTruncated(element) {
  return (
    element.scrollWidth > element.offsetWidth ||
    element.scrollHeight > element.offsetHeight
  );
}

export default makeGeoComponent("GeoBaseText", GeoBaseText);
