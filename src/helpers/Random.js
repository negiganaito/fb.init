/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import Alea from "./Alea";

const MAX_UINT32 = 4294967296;
const serverNonce = {
  ServerNonce: "P3fcYBNTyBVNVwxQ2uS1w-",
};
let aleaInstance;

function getAleaInstance() {
  if (aleaInstance === null) {
    aleaInstance = Alea(serverNonce);
  }
  return aleaInstance;
}

const Random = {
  random: (function () {
    const uint32Array =
      typeof Uint32Array === "function" ? new Uint32Array(1) : null;
    const crypto = window.crypto || window.msCrypto;

    if (uint32Array !== null) {
      try {
        const getRandomValues = crypto?.getRandomValues;

        if (typeof getRandomValues === "function") {
          const boundGetRandomValues = getRandomValues.bind(crypto);

          return function () {
            try {
              boundGetRandomValues(uint32Array);
            } catch (error) {
              return getAleaInstance()();
            }
            return uint32Array[0] / MAX_UINT32;
          };
        }
      } catch (error) {
        // Fall back to Alea instance
      }
    }

    return getAleaInstance();
  })(),

  uint32() {
    return Math.floor(this.random() * MAX_UINT32);
  },

  intBetween(min, max) {
    return Math.floor(this.random() * (max - min + 1) + min);
  },

  coinflip(probability) {
    if (probability === 0) return false;
    return probability <= 1 ? true : this.random() * probability <= 1;
  },
};

export default Random;
