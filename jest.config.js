/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
module.exports = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  transform: {
    "^.+\\.(ts|tsx)$": "@swc/jest",
    "^.+\\.(js|jsx)$": "@swc/jest",
  },
};
