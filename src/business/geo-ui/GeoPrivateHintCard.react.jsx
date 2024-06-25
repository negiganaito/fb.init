/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import stylex from "@stylexjs/stylex";
import GeoBaseContextualLayer from "GeoBaseContextualLayer.react";
import GeoBaseLayerBlurBehavior from "GeoBaseLayerBlurBehavior.react";
import GeoBaseLayerEscapeBehavior from "GeoBaseLayerEscapeBehavior.react";
import GeoBaseLayerExitBehavior from "GeoBaseLayerExitBehavior.react";
import GeoBaseLayerFadeBehavior from "GeoBaseLayerFadeBehavior.react";
import GeoDomID from "GeoDomID";
import * as GeoLayerUtils from "GeoLayerUtils";
import GeoPrivateAnimationLayerContainer from "GeoPrivateAnimationLayerContainer.react";
import * as GeoPrivateHintLayerUtils from "GeoPrivateHintLayerUtils";
import GeoPrivateResetAnimationLayer from "GeoPrivateResetAnimationLayer.react";
import gkx from "gkx";
import stopPropagation from "stopPropagation";
import useGeoPrivateAnimationLayerStyles from "useGeoPrivateAnimationLayerStyles";

const GeoPrivateHintCard = ({
  align,
  children,
  context,
  "data-testid": dataTestId,
  hideOnBlur,
  id,
  isShown,
  isSticky = false,
  layerRef,
  popoverType = "infoTooltip",
  position = "above",
  onHide,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  ...rest
}) => {
  const isPositionVertical = position === "above" || position === "below";
  const content = (
    <GeoBaseLayerEscapeBehavior onEscape={onHide}>
      <HintCardWrapper
        context={context}
        hideOnBlur={!!hideOnBlur}
        onBlur={onHide}
      >
        <GeoBaseContextualLayer
          align={align}
          containerRef={layerRef}
          context={context}
          position={GeoLayerUtils.mapPosition(position)}
        >
          <div
            className={stylex(
              GeoPrivateHintLayerUtils.useLayerContentContainerStyle({
                isPositionVertical,
              })
            )}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            {...rest}
          >
            <HintCardContent id={id} popoverType={popoverType}>
              {children}
            </HintCardContent>
          </div>
        </GeoBaseContextualLayer>
      </HintCardWrapper>
    </GeoBaseLayerEscapeBehavior>
  );

  return (
    <StickyLayerWrapper isSticky={isSticky} onHide={onHide}>
      <VisibilityLayerWrapper isShown={isShown}>
        {content}
      </VisibilityLayerWrapper>
    </StickyLayerWrapper>
  );
};

GeoPrivateHintCard.displayName = "GeoPrivateHintCard";

const VisibilityLayerWrapper = ({ isShown, children }) => {
  return gkx("24835") ? (
    <GeoPrivateAnimationLayerContainer isLayerShown={isShown}>
      {children}
    </GeoPrivateAnimationLayerContainer>
  ) : (
    <GeoBaseLayerFadeBehavior isShown={isShown}>
      {children}
    </GeoBaseLayerFadeBehavior>
  );
};

VisibilityLayerWrapper.displayName = "VisibilityLayerWrapper";

const HintCardContent = ({ children, id, popoverType }) => {
  const domIdProps = GeoDomID.useApplyGeoDomIDsDirectly({ id });
  const animationLayerStyles = useGeoPrivateAnimationLayerStyles({
    elevation: 2,
  });
  return (
    <div
      className={stylex(
        GeoPrivateHintLayerUtils.useLayerContentStyle(),
        GeoPrivateHintLayerUtils.useTooltipContainerStyle({
          type: popoverType,
        }),
        gkx("24835") && animationLayerStyles
      )}
      onClick={stopPropagation}
      onMouseDown={stopPropagation}
      {...domIdProps}
    >
      <GeoPrivateResetAnimationLayer>{children}</GeoPrivateResetAnimationLayer>
    </div>
  );
};

HintCardContent.displayName = "HintCardContent";

const StickyLayerWrapper = ({ isSticky, onHide, children }) => {
  return !isSticky ? (
    <GeoBaseLayerExitBehavior delay={50} onExit={onHide}>
      {children}
    </GeoBaseLayerExitBehavior>
  ) : (
    children
  );
};

StickyLayerWrapper.displayName = "StickyLayerWrapper";

const HintCardWrapper = ({ children, context, hideOnBlur, onBlur }) => {
  return hideOnBlur ? (
    <GeoBaseLayerBlurBehavior onBlur={onBlur}>
      {children}
    </GeoBaseLayerBlurBehavior>
  ) : (
    children
  );
};

HintCardWrapper.displayName = "HintCardWrapper";

export default GeoPrivateHintCard;
