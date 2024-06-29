/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import Event1 from "../helpers/Event";

import ExecutionEnvironment from "./ExecutionEnvironment";

let currentKeyCode = null;
let blurEventListener = null;

function attachBlurListener() {
  if (!blurEventListener) {
    blurEventListener = Event1.prototype.listen(window, "blur", () => {
      currentKeyCode = null;
      detachBlurListener();
    });
  }
}

function detachBlurListener() {
  if (blurEventListener) {
    blurEventListener.remove();
    blurEventListener = null;
  }
}

function handleKeyDown(event) {
  currentKeyCode = Event1.prototype.getKeyCode(event);
  attachBlurListener();
}

function handleKeyUp() {
  currentKeyCode = null;
  detachBlurListener();
}

if (ExecutionEnvironment.canUseDOM) {
  const docElement = document.documentElement;
  if (docElement) {
    if (docElement.addEventListener) {
      docElement.addEventListener("keydown", handleKeyDown, true);
      docElement.addEventListener("keyup", handleKeyUp, true);
    } else if (docElement.attachEvent) {
      docElement.attachEvent("onkeydown", handleKeyDown);
      docElement.attachEvent("onkeyup", handleKeyUp);
    }
  }
}

function isKeyDown() {
  return !!currentKeyCode;
}

function getKeyDownCode() {
  return currentKeyCode;
}

export { getKeyDownCode, isKeyDown };
