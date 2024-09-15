/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useSyncExternalStore } from "react";

const noop = () => () => {};

function useIsClientRendering() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false
  );
}

function useIsServerRenderingOrHydrating() {
  return !useIsClientRendering();
}

export { useIsClientRendering, useIsServerRenderingOrHydrating };
