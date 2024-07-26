/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

function isNested(option) {
  return option.BS_PRIVATE_NESTED_SOME_NONE !== undefined;
}

function some(value) {
  if (value === undefined) {
    return { BS_PRIVATE_NESTED_SOME_NONE: 0 };
  } else if (
    value !== null &&
    value.BS_PRIVATE_NESTED_SOME_NONE !== undefined
  ) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: value.BS_PRIVATE_NESTED_SOME_NONE + 1,
    };
  } else {
    return value;
  }
}

function nullableToOpt(value) {
  if (value === null) {
    return;
  } else {
    return some(value);
  }
}

function undefinedToOpt(value) {
  if (value === undefined) {
    return;
  } else {
    return some(value);
  }
}

function nullToOpt(value) {
  if (value === null) {
    return;
  } else {
    return some(value);
  }
}

function valFromOption(option) {
  if (!(option !== null && option.BS_PRIVATE_NESTED_SOME_NONE !== undefined)) {
    return option;
  }
  const nestedLevel = option.BS_PRIVATE_NESTED_SOME_NONE;
  if (nestedLevel === 0) {
    return;
  } else {
    return { BS_PRIVATE_NESTED_SOME_NONE: nestedLevel - 1 };
  }
}

function optionGet(option) {
  if (option === undefined) {
    return;
  } else {
    return valFromOption(option);
  }
}

function optionUnwrap(option) {
  if (option !== undefined) {
    return option.VAL;
  } else {
    return option;
  }
}

export {
  isNested,
  nullableToOpt,
  nullToOpt,
  optionGet,
  optionUnwrap,
  some,
  undefinedToOpt,
  valFromOption,
};
