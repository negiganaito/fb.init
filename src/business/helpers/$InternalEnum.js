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
const WeakMapOrMap = typeof WeakMap === "function" ? new WeakMap() : new Map();

function getEnumMap(enumObject) {
  const cachedMap = WeakMapOrMap.get(enumObject);
  if (cachedMap !== undefined) {
    return cachedMap;
  }

  const enumMap = new Map();
  Object.getOwnPropertyNames(enumObject).forEach((key) => {
    enumMap.set(enumObject[key], key);
  });

  try {
    WeakMapOrMap.set(enumObject, enumMap);
  } catch (error) {}

  return enumMap;
}

const EnumMethods = Object.freeze({
  isValid(value) {
    return getEnumMap(this).has(value);
  },

  cast(value) {
    return this.isValid(value) ? value : undefined;
  },

  members() {
    return getEnumMap(this).keys();
  },

  getName(value) {
    return getEnumMap(this).get(value);
  },
});

function createEnum(enumObject) {
  const enumInstance = Object.create(EnumMethods);

  for (const key in enumObject) {
    if (Object.prototype.hasOwnProperty.call(enumObject, key)) {
      Object.defineProperty(enumInstance, key, { value: enumObject[key] });
    }
  }

  return Object.freeze(enumInstance);
}

const SimpleEnum = Object.freeze({
  isValid(value) {
    return typeof value === "string" ? this.hasOwnProperty(value) : false;
  },

  cast() {
    return EnumMethods.cast;
  },

  members() {
    return Object.getOwnPropertyNames(this).values();
  },

  getName(value) {
    return value;
  },
});

createEnum.Mirrored = function (enumArray) {
  const mirroredEnum = Object.create(SimpleEnum);

  for (let i = 0; i < enumArray.length; ++i) {
    Object.defineProperty(mirroredEnum, enumArray[i], { value: enumArray[i] });
  }

  return Object.freeze(mirroredEnum);
};

export default createEnum;
