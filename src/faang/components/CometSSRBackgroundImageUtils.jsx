/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";

import { addImage } from "./CometSSRPreloadImageCollection";

let executionEnv;

export function processSpritedImagesForSSRPreload(imageData) {
  if (
    imageData === null ||
    (executionEnv || (executionEnv = ExecutionEnvironment)).canUseDOM
  )
    return;

  const imageUri = imageData.spi ?? imageData._spi ?? imageData.uri;

  if (!imageUri) return;

  addImage(imageUri);
}
