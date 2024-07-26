/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import Env from "./Env";
import ifRequireable from "./ifRequireable";

let envInstance;

const reloadPageNow = (forceReload) => {
  const BlueCompatRouter = ifRequireable(
    "BlueCompatRouter",
    (module) => module
  );
  envInstance = envInstance || Env;

  if (envInstance.isCQuick && BlueCompatRouter) {
    BlueCompatRouter.sendMessage({ compatAction: "reload" });
  } else {
    window.location.reload(forceReload);
  }
};

const reloadPageWithDelay = (delay) => {
  setTimeout(reloadPageNow, delay);
};

const ReloadPage = {
  now: reloadPageNow,
  delay: reloadPageWithDelay,
};

export default ReloadPage;
