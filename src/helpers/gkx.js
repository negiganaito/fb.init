/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import emptyFunction from "fbjs/lib/emptyFunction";
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";
import invariant from "invariant";

import BanzaiLazyQueue from "./BanzaiLazyQueue";

const gkData = {};
const loggedGKs = {};

function gkx(identifier) {
  const gk = gkData[identifier];
  invariant(gk !== null, `GK with identifier "${identifier}" does not exist.`);

  if (!loggedGKs[identifier]) {
    loggedGKs[identifier] = true;
    if (
      gk.hash !== null &&
      (ExecutionEnvironment.canUseDOM || ExecutionEnvironment.isInWorker)
    ) {
      BanzaiLazyQueue.queuePost("gk2_exposure", { identifier, hash: gk.hash });
    }
  }

  return gk.result;
}

gkx.add = function (newGKs, stats) {
  // eslint-disable-next-line guard-for-in
  for (const identifier in newGKs) {
    if (stats) {
      stats.entry++;
    }

    if (!(identifier in gkData)) {
      gkData[identifier] = newGKs[identifier];
    } else if (stats) {
      stats.dup_entry++;
    }
  }
};

gkx.addLoggedInternal = function (newGKs) {
  gkx.add(newGKs);
  // eslint-disable-next-line guard-for-in
  for (const identifier in newGKs) {
    loggedGKs[identifier] = true;
  }
};

gkx.getGKs = function () {
  return null;
};

gkx.getLogged = function () {
  return Object.keys(loggedGKs).map((identifier) => ({
    identifier,
    hash: gkData[identifier].hash,
  }));
};

gkx.setPass = emptyFunction;
gkx.setFail = emptyFunction;
gkx.clear = emptyFunction;

export default gkx;
