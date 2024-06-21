/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "chore",
        "docs",
        "feat",
        "fix",
        "refactor",
        "revert",
        "unit",
        "test",
        "wip",
      ],
    ],
  },
};
