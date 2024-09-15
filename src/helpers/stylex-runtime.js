/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { styleq } from "styleq";

const createError = (functionName) =>
  new Error(
    `'stylex.${functionName}' should never be called at runtime. It should be compiled away by '@stylexjs/babel-plugin'`
  );

const createTypeError = (typeName) => createError(`types.${typeName}`);

function props(...args) {
  if (monkeyPatchedFunctions.props) return monkeyPatchedFunctions.props(args);

  const [className, style] = styleq(args);
  const result = {};
  if (className !== null && className !== "") result.className = className;
  if (style !== null && Object.keys(style).length > 0) result.style = style;
  return result;
}

function attrs(...args) {
  const { className, style } = props(...args);
  const result = {};
  if (className !== null && className !== "") result["class"] = className;
  if (style !== null && Object.keys(style).length > 0) {
    result.style = Object.keys(style)
      .map((key) => `${key}:${style[key]};`)
      .join("");
  }
  return result;
}

function create(styles) {
  if (monkeyPatchedFunctions.create) {
    return monkeyPatchedFunctions.create(styles);
  }
  throw createError("create");
}

function defineVars(vars) {
  if (monkeyPatchedFunctions.defineVars)
    return monkeyPatchedFunctions.defineVars(vars);
  throw createError("defineVars");
}

const createTheme = (name, vars) => {
  if (monkeyPatchedFunctions.createTheme)
    return monkeyPatchedFunctions.createTheme(name, vars);
  throw createError("createTheme");
};

const include = (styles) => {
  if (monkeyPatchedFunctions.include)
    return monkeyPatchedFunctions.include(styles);
  throw createError("include");
};

const types = {
  angle: () => {
    throw createTypeError("angle");
  },
  color: () => {
    throw createTypeError("color");
  },
  url: () => {
    throw createTypeError("url");
  },
  image: () => {
    throw createTypeError("image");
  },
  integer: () => {
    throw createTypeError("integer");
  },
  lengthPercentage: () => {
    throw createTypeError("lengthPercentage");
  },
  length: () => {
    throw createTypeError("length");
  },
  percentage: () => {
    throw createTypeError("percentage");
  },
  number: () => {
    throw createTypeError("number");
  },
  resolution: () => {
    throw createTypeError("resolution");
  },
  time: () => {
    throw createTypeError("time");
  },
  transformFunction: () => {
    throw createTypeError("transformFunction");
  },
  transformList: () => {
    throw createTypeError("transformList");
  },
};

const keyframes = (frames) => {
  if (monkeyPatchedFunctions.keyframes)
    return monkeyPatchedFunctions.keyframes(frames);
  throw createError("keyframes");
};

const firstThatWorks = (...args) => {
  if (monkeyPatchedFunctions.firstThatWorks)
    return monkeyPatchedFunctions.firstThatWorks(...args);
  throw createError("firstThatWorks");
};

function legacyMerge(...args) {
  const [className] = styleq(args);
  return className;
}

legacyMerge.props = props;
legacyMerge.attrs = attrs;
legacyMerge.create = create;
legacyMerge.defineVars = defineVars;
legacyMerge.createTheme = createTheme;
legacyMerge.include = include;
legacyMerge.keyframes = keyframes;
legacyMerge.firstThatWorks = firstThatWorks;
legacyMerge.types = types;

const monkeyPatchedFunctions = {};

function __monkey_patch__(key, value) {
  if (key === "types") {
    Object.assign(types, value);
  } else {
    monkeyPatchedFunctions[key] = value;
  }
}

export {
  __monkey_patch__,
  attrs,
  create,
  createTheme,
  defineVars,
  firstThatWorks,
  include,
  keyframes,
  legacyMerge,
  props,
  types,
};
