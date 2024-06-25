/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import invariant from "fbjs/lib/invariant";

let __flight;
const assets = {};

const usedPaths = new Set();

export default function ix(assetID) {
  const asset = assets[assetID];
  invariant(asset, `Asset not found: ${assetID}`);
  return asset;
}

ix.add = (assetsToAdd, stats) => {
  // eslint-disable-next-line guard-for-in
  for (const id in assetsToAdd) {
    if (stats) stats.entry++;
    if (!(id in assets)) {
      assetsToAdd[id].loggingID = id;
      assets[id] = assetsToAdd[id];
    } else if (stats) {
      stats.dup_entry++;
    }
  }
};

ix.getUsedPaths_ONLY_FOR_REACT_FLIGHT = () => {
  if (__flight.__flight_execution_mode_DO_NOT_USE === "flight") {
    return Array.from(usedPaths);
  } else {
    invariant(false, "Method only usable during React Flight");
  }
};

ix.getAllPaths = () => {
  const allPaths = new Set();
  Object.values(assets)
    // eslint-disable-next-line array-callback-return
    .map((asset) => {
      if (asset?.sprited === 0) return asset.uri;
      else if (asset?.sprited === 1) return asset._spi;
      else if (asset?.sprited === 2) return asset.spi;
    })
    .forEach((path) => {
      if (path !== null) allPaths.add(path);
    });

  return allPaths;
};
