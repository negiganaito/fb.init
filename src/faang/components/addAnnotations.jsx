/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

function addAnnotations(target, annotations) {
  Object.keys(annotations).forEach((key) => {
    target[key] = Object.assign(
      target[key] !== null ? target[key] : {},
      annotations[key]
    );
  });
}

export default addAnnotations;
