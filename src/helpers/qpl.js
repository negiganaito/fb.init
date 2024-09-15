/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import QPLHasteSupportDataStorage from "QPLHasteSupportDataStorage";
import recoverableViolation from "recoverableViolation";

const eventCache = {};

const qpl = {
  _: function (a, b) {
    let event = eventCache[b];
    if (event === null) {
      const hasteData = QPLHasteSupportDataStorage.get(b);
      if (hasteData === null) {
        recoverableViolation(
          `Failed to find a Haste-supplied config for the QPL event identified by token '${b}'.`,
          "staticresources"
        );
        event = { i: a };
      } else {
        event = { i: a, ...hasteData };
      }
      eventCache[b] = event;
    }
    return event;
  },
};

export default qpl;
