/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import RDFDRequireDeferredReference from "RDFDRequireDeferredReference";

function requireDeferredForDisplay(moduleName) {
  return new RDFDRequireDeferredReference(moduleName);
}

export default requireDeferredForDisplay;
