/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";

import BaseContextualLayerAnchorRootContextProvider from "../../context/BaseContextualLayerAnchorRootContext";
import useStable from "../../hooks/useStable";
import useUnsafeRef_DEPRECATED from "../../hooks/useUnsafeRef_DEPRECATED";

import BaseDOMContainer from "./BaseDOMContainer";

const BaseContextualLayerAnchorRoot = ({ children }) => {
  const stableDiv = useStable(() =>
    ExecutionEnvironment.canUseDOM ? document.createElement("div") : null
  );

  const divRef = useUnsafeRef_DEPRECATED(stableDiv);

  return (
    <>
      <BaseContextualLayerAnchorRootContextProvider value={divRef}>
        {children}
      </BaseContextualLayerAnchorRootContextProvider>
      <BaseDOMContainer node={stableDiv} />
    </>
  );
};

BaseContextualLayerAnchorRoot.displayName = `BaseContextualLayerAnchorRoot [from ${__filename}]`;

export default BaseContextualLayerAnchorRoot;
