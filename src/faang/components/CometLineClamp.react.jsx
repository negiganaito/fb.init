/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useCallback, useRef, useState } from "react";
import stylex from "@stylexjs/stylex";

import { useTranslationKeyForTextParent as useTranslationKeyForTextParentDefault } from "../../business/components/DocumentTranslationStatusProvider.react";
import lazyLoadComponent from "../../business/helpers/lazyLoadComponent";
import useMergeRefs from "../../hooks/useMergeRefs";

import CometPlaceholder from "./CometPlaceholder.react";
import { useCometTextContext } from "./CometTextContext.react";
import CometTextTypography from "./CometTextTypography.react";
import CSSUserAgentSupports from "./CSSUserAgentSupports";
import JSResourceForInteraction from "./JSResourceForInteraction";

const useTranslationKeyForTextParent =
  useTranslationKeyForTextParentDefault || (() => {});

const CometTooltip_DEPRECATED = JSResourceForInteraction(
  "CometTooltip_DEPRECATED.react"
).__setRef("CometLineClamp.react");
const LazyLoadedCometTooltip = lazyLoadComponent(CometTooltip_DEPRECATED);
const supportsWebkitLineClamp = CSSUserAgentSupports.webkitLineClamp();

const styles = {
  oneLine: {
    textOverflow: "xlyipyv",
    whiteSpace: "xuxw1ft",
    $$css: true,
  },
  root: {
    display: "x1lliihq",
    overflowX: "x6ikm8r",
    overflowY: "x10wlt62",
    position: "x1n2onr6",
    $$css: true,
  },
};

const CometLineClamp = forwardRef((props, ref) => {
  const {
    children,
    id,
    lines,
    testid,
    truncationTooltip,
    useAutomaticTextDirection = false,
    xstyle,
  } = props;
  const textContext = useCometTextContext();
  const translationKey = useTranslationKeyForTextParent();
  const [isOverflowing, setIsOverflowing] = useState(false);
  const spanRef = useRef(null);

  let content = children;
  let maxHeightStyle;

  if (lines > 1) {
    if (supportsWebkitLineClamp) {
      maxHeightStyle = {
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: lines,
        display: "-webkit-box",
      };
    } else {
      const lineHeight = getLineHeight(textContext?.type);
      maxHeightStyle = { maxHeight: lineHeight * lines + 0.1 };
      const fadeOutStyle = {
        maxHeight: `calc((100% - ${lineHeight * lines}px) * 999)`,
        top: lineHeight * (lines - 1),
      };
      content = (
        <>
          {children}
          <span
            aria-hidden={true}
            className="xds687c x6ikm8r x10wlt62 x10l6tqk"
            style={fadeOutStyle}
          >
            …
          </span>
        </>
      );
    }
  }

  const checkOverflow = () => {
    const el = spanRef.current;
    if (!el || lines < 1) return;
    setIsOverflowing(
      el.offsetWidth < el.scrollWidth || el.offsetHeight < el.scrollHeight
    );
  };

  const handleMouseEnter = useCallback(
    (event) => {
      if (!event || !truncationTooltip) return;
      CometTooltip_DEPRECATED.preload();
    },
    [truncationTooltip]
  );

  const mergedRef = useMergeRefs(ref, spanRef, handleMouseEnter);

  const spanElement = (
    <span
      key={translationKey}
      className={stylex(styles.root, lines === 1 && styles.oneLine, xstyle)}
      data-testid={testid}
      dir={useAutomaticTextDirection ? "auto" : undefined}
      id={id}
      onMouseEnter={truncationTooltip ? checkOverflow : undefined}
      ref={mergedRef}
      style={maxHeightStyle}
    >
      {content}
    </span>
  );

  return isOverflowing ? (
    <CometPlaceholder fallback={spanElement}>
      <LazyLoadedCometTooltip tooltip={truncationTooltip}>
        {spanElement}
      </LazyLoadedCometTooltip>
    </CometPlaceholder>
  ) : (
    spanElement
  );
});

CometLineClamp.displayName = `CometLineClamp [from ${CometLineClamp.id}]`;

function getLineHeight(type) {
  return type && type in CometTextTypography
    ? CometTextTypography[type].lineHeight
    : 16;
}

export default CometLineClamp;
