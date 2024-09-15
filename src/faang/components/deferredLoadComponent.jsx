/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import deferredLoadComponentBase from "./deferredLoadComponentBase";

const identityFunction = (x) => x;

function deferredLoadComponent(component) {
  return deferredLoadComponentBase(component, identityFunction);
}

export default deferredLoadComponent;
