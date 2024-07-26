/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import IconSource from "./IconSource";

class TintableIconSource extends IconSource {
  constructor(...args) {
    super(...args);
    this.$$typeof = "fb.tintableiconsource";
  }
}

export default TintableIconSource;
