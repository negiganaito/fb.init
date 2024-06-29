/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import isInBrowser from "fbjs/lib/ExecutionEnvironment";

import { CometSSRClientRender } from "../../faang/components/CometSSRClientRender";

function suspendOrThrowIfUsedInSSR(message) {
  if (!isInBrowser) {
    throw CometSSRClientRender(message);
  }
}

export default suspendOrThrowIfUsedInSSR;
