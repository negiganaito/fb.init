/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const queryRegex = /^([-_\w]+)((?:\[[-_\w]*\])+)=?(.*)/;

const sanitizeKey = (key) => {
  return key === "hasOwnProperty" || key === "__proto__" ? "\ud83d\udf56" : key;
};

const deserialize = (queryString, decodeFn) => {
  if (queryString === null || queryString === "") return {};

  const result = {};
  queryString = queryString.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  const pairs = queryString.split("&");
  const hasOwn = Object.prototype.hasOwnProperty;

  pairs.forEach((pair) => {
    const match = pair.match(queryRegex);
    if (!match) {
      const index = pair.indexOf("=");
      if (index === -1) {
        result[decodeFn(pair)] = null;
      } else {
        const key = pair.substring(0, index);
        const value = pair.substring(index + 1);
        result[decodeFn(key)] = decodeFn(value);
      }
    } else {
      const keys = match[2].split(/\]\[|\[|\]/).slice(0, -1);
      const mainKey = match[1];
      const value = decodeFn(match[3] || "");
      keys[0] = mainKey;

      let temp = result;
      for (let i = 0; i < keys.length - 1; i++) {
        const sanitizedKey = sanitizeKey(keys[i]);
        if (sanitizedKey) {
          if (!hasOwn.call(temp, sanitizedKey)) {
            const nextKey =
              keys[i + 1] && !keys[i + 1].match(/^\d{1,3}$/) ? {} : [];
            temp[sanitizedKey] = nextKey;
            if (temp[sanitizedKey] !== nextKey) return result;
          }
          temp = temp[sanitizedKey];
        } else {
          const nextKey =
            keys[i + 1] && !keys[i + 1].match(/^\d{1,3}$/) ? {} : [];
          temp.push(nextKey);
          temp = temp[temp.length - 1];
        }
      }

      if (Array.isArray(temp) && keys[keys.length - 1] === "") {
        temp.push(value);
      } else {
        temp[sanitizeKey(keys[keys.length - 1])] = value;
      }
    }
  });

  return result;
};

export default deserialize;
