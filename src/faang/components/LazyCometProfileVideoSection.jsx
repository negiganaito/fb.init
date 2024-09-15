/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import CometPlaceholder from "CometPlaceholder.react";
import CometProfileVideoGlimmer from "CometProfileVideoGlimmer.react";
import JSResourceForInteraction from "JSResourceForInteraction";
import lazyLoadComponent from "lazyLoadComponent";

const CometProfileVideoSection = lazyLoadComponent(
  JSResourceForInteraction("CometProfileVideoSection.react").__setRef(
    "LazyCometProfileVideoSection.react"
  )
);

const LazyCometProfileVideoSection = (props) => {
  return (
    <CometPlaceholder fallback={<CometProfileVideoGlimmer size={props.size} />}>
      <CometProfileVideoSection {...props} />
    </CometPlaceholder>
  );
};

LazyCometProfileVideoSection.displayName = `${LazyCometProfileVideoSection.name} [from ${module.id}]`;

export default LazyCometProfileVideoSection;
