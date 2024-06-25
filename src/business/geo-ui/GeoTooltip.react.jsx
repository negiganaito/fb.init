/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useRef, useState } from "react";

import { isFbt } from "./GeoFbtUtils";
import GeoPrivateHintContent from "./GeoPrivateHintContent.react";
import GeoPrivateHintLayer from "./GeoPrivateHintLayer.react";
import { makeGeoComponent } from "./GeoPrivateMakeComponent";
import GeoTooltipText from "./GeoTooltipText.react";

const GeoTooltip = ({
  content,
  groupName = "GeoTooltip",
  heading,
  onToggle,
  whiteSpace,
  ...props
}) => {
  const contentRef = useRef < HTMLDivElement > null;
  const [isLayerHoverable, setIsLayerHoverable] = useState(false);

  const isContentFbt = isFbt(content);
  const hasHeadingOrNonFbtContent = heading !== null || !isContentFbt;
  let renderedContent = content;

  if (isContentFbt) {
    renderedContent = (
      <GeoTooltipText whiteSpace={whiteSpace}>{content}</GeoTooltipText>
    );
  }

  const handleToggle = (isOpen) => {
    onToggle?.(isOpen);

    if (isOpen) {
      setIsLayerHoverable(Boolean(contentRef.current?.querySelector("a")));
    }
  };

  const renderContent = (hintProps) => (
    <GeoPrivateHintContent
      {...hintProps}
      content={renderedContent}
      contentRef={contentRef}
      heading={heading}
    />
  );

  return (
    <GeoPrivateHintLayer
      {...props}
      contentRenderer={renderContent}
      groupName={groupName}
      isLayerHoverable={isLayerHoverable}
      isSticky={false}
      onToggle={handleToggle}
      popoverType={hasHeadingOrNonFbtContent ? "infoTooltip" : "simpleTooltip"}
    />
  );
};

GeoTooltip.displayName = `GeoTooltip [from ${__filename}]`;

const GeoTooltipComponent = makeGeoComponent("GeoTooltip", GeoTooltip);
export default GeoTooltipComponent;
