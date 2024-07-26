/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

let currentDispatcher;

function useReStoreTrackInRender() {
  const internals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  currentDispatcher = internals?.ReactCurrentDispatcher?.current;
}

function isWithinReactRenderingContext() {
  const internals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  const current = internals?.ReactCurrentDispatcher?.current;
  return current !== null && current === currentDispatcher;
}

export { isWithinReactRenderingContext, useReStoreTrackInRender };
