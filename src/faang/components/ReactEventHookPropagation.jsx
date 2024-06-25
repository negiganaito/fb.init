/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
function hasEventHookPropagationStopped(event, eventName) {
  const _stopEventHookPropagation = event._stopEventHookPropagation;
  return (
    _stopEventHookPropagation !== undefined &&
    _stopEventHookPropagation[eventName]
  );
}
function stopEventHookPropagation(event, eventName) {
  let _stopEventHookPropagation = event._stopEventHookPropagation;
  _stopEventHookPropagation ||
    (_stopEventHookPropagation = event._stopEventHookPropagation = {});
  _stopEventHookPropagation[eventName] = true;
}

const ReactEventHookPropagation = {
  hasEventHookPropagationStopped,
  stopEventHookPropagation,
};

export default ReactEventHookPropagation;
