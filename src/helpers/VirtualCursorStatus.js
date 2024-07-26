/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import emptyFunction from "fbjs/lib/emptyFunction";
import UserAgent from "fbjs/lib/UserAgent";

import Event from "./Event";

let currentKeyCode = null;
let blurEventListener = null;

function attachBlurListener() {
  if (!blurEventListener) {
    blurEventListener = Event.listen(window, "blur", () => {
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
  currentKeyCode = event.keyCode;
  attachBlurListener();
}

function handleKeyUp() {
  currentKeyCode = null;
  detachBlurListener();
}

if (
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
) {
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

const KeyStatus = {
  isKeyDown: () => !!currentKeyCode,
  getKeyDownCode: () => currentKeyCode,
};

let isTrackingClick = false;
let isTrackingMouseUp = false;
let potentialCursorTypes = null;
let isVirtualCursorTriggeredState = false;

// eslint-disable-next-line complexity
function detectCursorType(event) {
  const cursorTypes = new Set();
  const isKeyDown = KeyStatus.isKeyDown();
  const {
    clientX,
    clientY,
    isTrusted,
    offsetX,
    offsetY,
    mozInputSource,
    WEBKIT_FORCE_AT_MOUSE_DOWN,
    webkitForce,
    target,
  } = event;
  const { clientWidth, clientHeight } = target;

  if (
    clientX === 0 &&
    clientY === 0 &&
    offsetX >= 0 &&
    offsetY >= 0 &&
    isTrackingMouseUp &&
    isTrusted &&
    mozInputSource === null
  ) {
    cursorTypes.add("Chrome");
  }

  if (
    isTrackingClick &&
    isTrackingMouseUp &&
    !isKeyDown &&
    webkitForce !== null &&
    webkitForce < WEBKIT_FORCE_AT_MOUSE_DOWN &&
    offsetX === 0 &&
    offsetY === 0 &&
    mozInputSource === null
  ) {
    cursorTypes.add("Safari-edge");
  }

  if (
    clientX === 0 &&
    clientY === 0 &&
    offsetX < 0 &&
    offsetY < 0 &&
    isTrackingMouseUp &&
    mozInputSource === null
  ) {
    cursorTypes.add("Safari-old");
  }

  if (
    !isTrackingClick &&
    !isTrackingMouseUp &&
    !isKeyDown &&
    isTrusted &&
    UserAgent.isBrowser("IE >= 10") &&
    mozInputSource === null
  ) {
    if (clientX < 0 && clientY < 0) {
      cursorTypes.add("IE");
    } else if (
      offsetX < 0 ||
      offsetX > clientWidth ||
      offsetY < 0 ||
      offsetY > clientHeight
    ) {
      cursorTypes.add("MSIE");
    }
  }

  if (mozInputSource === 0 && isTrusted) {
    cursorTypes.add("Firefox");
  }

  return cursorTypes;
}

function handleMouseDown() {
  isTrackingClick = true;
  setImmediate(() => {
    isTrackingClick = false;
  });
}

function handleMouseUp() {
  isTrackingMouseUp = true;
  setImmediate(() => {
    isTrackingMouseUp = false;
  });
}

function handleClick(event, callback) {
  if (potentialCursorTypes === null) {
    potentialCursorTypes = detectCursorType(event);
  }
  isVirtualCursorTriggeredState = potentialCursorTypes.size > 0;
  const isVirtualCursor =
    event.target.getAttribute("data-accessibilityid") ===
    "virtual_cursor_trigger";
  callback(
    isVirtualCursorTriggeredState,
    potentialCursorTypes,
    isVirtualCursor
  );
  setImmediate(() => {
    isVirtualCursorTriggeredState = false;
    potentialCursorTypes = null;
  });
}

const VirtualCursorStatus = {
  isVirtualCursorTriggered: () => isVirtualCursorTriggeredState,
  add: (element, callback = emptyFunction) => {
    const handleClickEvent = (event) => handleClick(event, callback);
    element.addEventListener("click", handleClickEvent);

    const mouseDownListener = Event.listen(
      element,
      "mousedown",
      handleMouseDown
    );
    const mouseUpListener = Event.listen(element, "mouseup", handleMouseUp);

    return {
      remove: () => {
        element.removeEventListener("click", handleClickEvent);
        mouseDownListener.remove();
        mouseUpListener.remove();
      },
    };
  },
};

export default VirtualCursorStatus;
