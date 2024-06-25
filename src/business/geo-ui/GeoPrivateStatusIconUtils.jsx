/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import fbicon from "../helpers/fbicon";
import ix from "../helpers/ix";

const errorIcons = {
  8: fbicon(ix("502060"), 12),
  12: fbicon(ix("502060"), 12),
  16: fbicon(ix("502061"), 16),
  20: fbicon(ix("502062"), 20),
  28: fbicon(ix("502062"), 20),
  32: fbicon(ix("502062"), 20),
  shape: "rectangle",
};

const errorEmphasizedIcons = {
  8: fbicon(ix("648667"), 12),
  12: fbicon(ix("648667"), 12),
  16: fbicon(ix("648668"), 16),
  20: fbicon(ix("648669"), 20),
  28: fbicon(ix("648669"), 20),
  32: fbicon(ix("648669"), 20),
  shape: "rounded",
};

const STATUS_ICONS = Object.freeze({
  error: errorIcons,
  warning: errorIcons,
  info: {
    8: fbicon(ix("492698"), 12),
    12: fbicon(ix("492698"), 12),
    16: fbicon(ix("492700"), 16),
    20: fbicon(ix("492702"), 20),
    28: fbicon(ix("492702"), 20),
    32: fbicon(ix("492702"), 20),
    shape: "rectangle",
  },
  progress: {
    8: fbicon(ix("478791"), 12),
    12: fbicon(ix("478791"), 12),
    16: fbicon(ix("478793"), 16),
    20: fbicon(ix("478795"), 20),
    28: fbicon(ix("478795"), 20),
    32: fbicon(ix("478795"), 20),
    shape: "rounded",
  },
  success: {
    8: fbicon(ix("498144"), 12),
    12: fbicon(ix("498144"), 12),
    16: fbicon(ix("498145"), 16),
    20: fbicon(ix("498146"), 20),
    28: fbicon(ix("498146"), 20),
    32: fbicon(ix("498146"), 20),
    shape: "rectangle",
  },
  "error-emphasized": errorEmphasizedIcons,
  "warning-emphasized": errorEmphasizedIcons,
});

const nextErrorIcons = {
  8: fbicon(ix("502060"), 12),
  12: fbicon(ix("502060"), 12),
  16: fbicon(ix("502064"), 16),
  20: fbicon(ix("502065"), 20),
  28: fbicon(ix("502065"), 20),
  32: fbicon(ix("502065"), 20),
  shape: "rectangle",
};

const NEXT_STATUS_ICONS = Object.freeze({
  error: nextErrorIcons,
  warning: nextErrorIcons,
  info: {
    8: fbicon(ix("492698"), 12),
    12: fbicon(ix("492698"), 12),
    16: fbicon(ix("492706"), 16),
    20: fbicon(ix("492708"), 20),
    28: fbicon(ix("492708"), 20),
    32: fbicon(ix("492708"), 20),
    shape: "rectangle",
  },
  progress: {
    8: fbicon(ix("478791"), 12),
    12: fbicon(ix("478791"), 12),
    16: fbicon(ix("478793"), 16),
    20: fbicon(ix("478795"), 20),
    28: fbicon(ix("478795"), 20),
    32: fbicon(ix("478795"), 20),
    shape: "rounded",
  },
  success: {
    8: fbicon(ix("498144"), 12),
    12: fbicon(ix("498144"), 12),
    16: fbicon(ix("498148"), 16),
    20: fbicon(ix("498149"), 20),
    28: fbicon(ix("498149"), 20),
    32: fbicon(ix("498149"), 20),
    shape: "rectangle",
  },
  "error-emphasized": {
    8: fbicon(ix("648667"), 12),
    12: fbicon(ix("648667"), 12),
    16: fbicon(ix("812005"), 16),
    20: fbicon(ix("1166721"), 20),
    28: fbicon(ix("1166721"), 20),
    32: fbicon(ix("1166721"), 20),
    shape: "rounded",
  },
  "warning-emphasized": nextErrorIcons,
});

function getIcon(status, size) {
  return STATUS_ICONS[status][size];
}

function getNextIcon(status, size) {
  return NEXT_STATUS_ICONS[status][size];
}

function getIconShape(status) {
  return STATUS_ICONS[status].shape;
}

export { getIcon, getIconShape, getNextIcon, NEXT_STATUS_ICONS, STATUS_ICONS };
