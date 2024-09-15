/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import HiddenSubtreeContextProvider from "./HiddenSubtreeContextProvider";

const CometPrerenderer = ({ children, prerenderingProps = {} }) => {
  const { isVisible = true, shouldPrerender = false } = prerenderingProps;

  return isVisible || shouldPrerender ? (
    <HiddenSubtreeContextProvider isHidden={!isVisible && shouldPrerender}>
      {children({ hidden: !isVisible && shouldPrerender })}
    </HiddenSubtreeContextProvider>
  ) : null;
};

CometPrerenderer.displayName = `${CometPrerenderer.name} [from ${module.id}]`;

export default CometPrerenderer;
