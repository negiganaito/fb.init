/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { Fragment, useLayoutEffect, useRef } from "react";

import gkx from "../../helpers/gkx";
import useCometDisplayTimingTrackerForInteraction from "../../hooks/useCometDisplayTimingTrackerForInteraction";
import useFadeEffect from "../../hooks/useFadeEffect";
import useTooltipDelayedContent from "../../hooks/useTooltipDelayedContent";

import BaseContextualLayer from "./BaseContextualLayer";
import BaseTooltipContainer from "./BaseTooltipContainer";
import CometHeroInteractionContextPassthrough from "./CometHeroInteractionContextPassthrough";
import CometPlaceholder from "./CometPlaceholder.react";

const contextualLayerStyle = {
  pointerEvents: "x47corl",
  ,
};

function ContextualLayerRepositioner({ contextualLayerRef }) {
  useLayoutEffect(() => {
    const layer = contextualLayerRef.current;
    if (layer) {
      layer.reposition({ autoflip: true });
    }
  }, [contextualLayerRef]);

  return null;
}

ContextualLayerRepositioner.displayName =
  "ContextualLayerRepositioner [from 98]";

const BaseTooltipImpl = ({
  loadingState,
  contentKey,
  delayContentMs = 0,
  headline,
  id,
  isVisible,
  themeWrapper: ThemeWrapper = Fragment,
  tooltip,
  tooltipTheme,
  xstyle,
  ...rest
}) => {
  const contextualLayerRef = useRef(null);
  const [shouldRender, shouldFadeIn, ref] = useFadeEffect(isVisible);
  const timingTrackerRef =
    useCometDisplayTimingTrackerForInteraction("ToolTip");
  const { isPending } = useTooltipDelayedContent({
    delayContentMs,
    isVisible,
  });
  const isFeatureEnabled = gkx("4384");

  if (!tooltip || !shouldRender) return null;

  return (
    <CometHeroInteractionContextPassthrough clear>
      <BaseContextualLayer
        align="middle"
        imperativeRef={contextualLayerRef}
        ref={timingTrackerRef}
        xstyle={!isFeatureEnabled && contextualLayerStyle.contextualLayer}
        {...rest}
      >
        <ThemeWrapper>
          <BaseTooltipContainer
            id={id}
            ref={ref}
            shouldFadeIn={shouldFadeIn}
            xstyle={xstyle}
          >
            {isPending ? (
              <div className="x78zum5 xl56j7k">{loadingState}</div>
            ) : (
              <CometPlaceholder fallback={loadingState}>
                <ContextualLayerRepositioner
                  contextualLayerRef={contextualLayerRef}
                />
                {tooltip}
              </CometPlaceholder>
            )}
          </BaseTooltipContainer>
        </ThemeWrapper>
      </BaseContextualLayer>
    </CometHeroInteractionContextPassthrough>
  );
};

BaseTooltipImpl.displayName = "BaseTooltipImpl [from 98]";

export default BaseTooltipImpl;
