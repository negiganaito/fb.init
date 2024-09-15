/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const hasFocusKeyboardEventPropagationStopped = (event) =>
  event._stopFocusKeyboardPropagation === true;

const stopFocusKeyboardEventPropagation = (event) => {
  event._stopFocusKeyboardPropagation = true;
};

export {
  hasFocusKeyboardEventPropagationStopped,
  stopFocusKeyboardEventPropagation,
};
