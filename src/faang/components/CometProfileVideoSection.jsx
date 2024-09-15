/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { graphql } from "CometProfileVideoSection_profileVideo.graphql";
import { MatchContainer, useFragment } from "CometRelay";

const CometProfileVideoSection = ({ profileVideo, ...props }) => {
  const fragmentData = useFragment(graphql, profileVideo);
  return <MatchContainer match={fragmentData} props={{ ...props }} />;
};

CometProfileVideoSection.displayName = `${CometProfileVideoSection.name} [from ${module.id}]`;

export default CometProfileVideoSection;
