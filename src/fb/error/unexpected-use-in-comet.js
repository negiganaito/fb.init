/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { FBLogger } from "./fb-logger";

export function unexpectedUseInComet(a) {
  // if (!c("gkx")("708253")) return;
  a = a + " called unexpectedly. This is not supported in Comet!";
  let b = FBLogger("comet_infra").blameToPreviousFrame().blameToPreviousFrame();
  b.mustfix(a);
}
