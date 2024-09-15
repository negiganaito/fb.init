/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import RequireDeferredReference from "RequireDeferredReference";

class RDRequireDeferredReference extends RequireDeferredReference {
  static disableForSSR_DO_NOT_USE() {
    this.$RDRequireDeferredReference1 = false;
  }

  isAvailableInSSR_DO_NOT_USE() {
    return this.constructor.$RDRequireDeferredReference1;
  }
}

RDRequireDeferredReference.$RDRequireDeferredReference1 = true;

export default RDRequireDeferredReference;
