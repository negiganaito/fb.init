/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import useMAWEditMessageData from "../../hooks/useMAWEditMessageData";

const MWEditMessageOverlay = ({ messageId }) => {
  const editMessageData = useMAWEditMessageData();
  const hasEditMessageData = editMessageData !== null;
  const isSameMessage =
    messageId !== null && messageId === editMessageData?.messageId;

  if (!hasEditMessageData || isSameMessage) {
    return null;
  }

  return (
    <div className="xyl4keb x5yr21d x1ks1olk x10l6tqk x17qophe x13vifvy xh8yej3 x1vjfegm" />
  );
};

MWEditMessageOverlay.displayName = `MWEditMessageOverlay [from ${MWEditMessageOverlay.id}]`;

export default MWEditMessageOverlay;
