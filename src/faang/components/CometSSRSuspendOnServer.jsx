/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { CometSSRClientRender } from "./CometSSRClientRender";
import { useIsServerRenderingOrHydrating } from "./CometSSRRenderingStateHooks";

const CometSSRSuspendOnServer = ({ children }) => {
  const isServerRenderingOrHydrating = useIsServerRenderingOrHydrating();

  if (isServerRenderingOrHydrating) {
    throw CometSSRClientRender(
      "CometSSRSuspendOnServer: This component is marked to be client rendered"
    );
  }

  return children;
};

CometSSRSuspendOnServer.displayName = `${CometSSRSuspendOnServer.name} [from ${module.id}]`;

export default CometSSRSuspendOnServer;
