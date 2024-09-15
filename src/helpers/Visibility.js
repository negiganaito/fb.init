/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";

import BaseEventEmitter from "./BaseEventEmitter";
import TimeSlice from "./TimeSlice";

let hiddenKey;
let visibilityChangeEvent;

if (ExecutionEnvironment.canUseDOM) {
  if (document.hidden !== undefined) {
    hiddenKey = "hidden";
    visibilityChangeEvent = "visibilitychange";
  } else if (document.mozHidden !== undefined) {
    hiddenKey = "mozHidden";
    visibilityChangeEvent = "mozvisibilitychange";
  } else if (document.msHidden !== undefined) {
    hiddenKey = "msHidden";
    visibilityChangeEvent = "msvisibilitychange";
  } else if (document.webkitHidden !== undefined) {
    hiddenKey = "webkitHidden";
    visibilityChangeEvent = "webkitvisibilitychange";
  }
}

class Visibility extends BaseEventEmitter {
  HIDDEN = "hidden";
  VISIBLE = "visible";
  hiddenKey = hiddenKey;
  hiddenEvent = visibilityChangeEvent;

  isHidden() {
    return hiddenKey ? document[hiddenKey] : false;
  }

  isSupported() {
    return (
      ExecutionEnvironment.canUseDOM &&
      document.addEventListener &&
      visibilityChangeEvent !== undefined
    );
  }
}

const visibilityInstance = new Visibility();

if (visibilityInstance.isSupported()) {
  document.addEventListener(
    visibilityInstance.hiddenEvent,
    TimeSlice.guard((event) => {
      visibilityInstance.emit(
        visibilityInstance.isHidden()
          ? visibilityInstance.HIDDEN
          : visibilityInstance.VISIBLE,
        { changeTime: event.timeStamp }
      );
    }, "visibility change")
  );
}

export default visibilityInstance;
