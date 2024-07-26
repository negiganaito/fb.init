/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import emptyFunction from "fbjs/lib/emptyFunction";
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";
import FBLogger from "FBLogger";
import recoverableViolation from "recoverableViolation";

import createCancelableFunction from "./createCancelableFunction";
import unexpectedUseInComet from "./unexpectedUseInComet";

// Internal state and flags
let eventListeners = {};
let domContentLoadedFired = false;
let loadFired = false;
const emptyRemove = { remove: emptyFunction };

// Initialize event listener arrays and add unload event listeners
function initializeEventListener(type, callback) {
  if (!eventListeners.unload) {
    eventListeners.unload = [];
    eventListeners.afterunload = [];
    if (ExecutionEnvironment.canUseEventListeners) {
      window.addEventListener("unload", () => {
        fireEventListeners("unload");
        fireEventListeners("afterunload");
      });
    }
  }
  if (!eventListeners[type]) {
    recoverableViolation(
      `EVENT_LISTENERS.${type} wasn't initialized but should have been!`,
      "comet_infra"
    );
    eventListeners[type] = [callback];
  } else {
    eventListeners[type].push(callback);
  }
}

// Wrap a function to make it cancelable
function wrapCancelableFunction(fn) {
  if (!fn) {
    recoverableViolation(
      "Undefined event listener handler is not allowed",
      "comet_infra"
    );
  }
  return createCancelableFunction(fn || emptyFunction);
}

// Return an object with a remove method to cancel the function
function createRemoveObject(cancelableFn) {
  return {
    remove() {
      cancelableFn.cancel();
    },
  };
}

// Execute all listeners for a specific event type and clear the listener array
function fireEventListeners(type) {
  const listeners = eventListeners[type] || [];
  for (let listener of listeners) {
    try {
      listener();
    } catch (error) {
      FBLogger("comet_infra")
        .catching(error)
        .mustfix(`Hit an error while executing '${type}' event listeners.`);
    }
  }
  eventListeners[type] = [];
}

// Add a DOMContentLoaded event listener
function onLoad(callback) {
  if (domContentLoadedFired) {
    callback();
    return createRemoveObject(wrapCancelableFunction(emptyFunction));
  }
  const wrappedCallback = wrapCancelableFunction(callback);
  if (!eventListeners.domcontentloaded) {
    eventListeners.domcontentloaded = [wrappedCallback];
    if (ExecutionEnvironment.canUseEventListeners) {
      window.addEventListener(
        "DOMContentLoaded",
        () => fireEventListeners("domcontentloaded"),
        true
      );
    }
  } else {
    eventListeners.domcontentloaded.push(wrappedCallback);
  }
  return createRemoveObject(wrappedCallback);
}

// Add an afterunload event listener
function onAfterUnload(callback) {
  const wrappedCallback = wrapCancelableFunction(callback);
  initializeEventListener("afterunload", wrappedCallback);
  return createRemoveObject(wrappedCallback);
}

// Add a load event listener
function onAfterLoad(callback) {
  const wrappedCallback = wrapCancelableFunction(callback);
  if (!eventListeners.load) {
    eventListeners.load = [wrappedCallback];
    if (ExecutionEnvironment.canUseEventListeners) {
      window.addEventListener("load", () => {
        fireEventListeners("domcontentloaded");
        fireEventListeners("load");
      });
    }
  } else {
    eventListeners.load.push(wrappedCallback);
  }
  if (loadFired) {
    setTimeout(() => {
      fireEventListeners("domcontentloaded");
      fireEventListeners("load");
    }, 0);
  }
  return createRemoveObject(wrappedCallback);
}

// Add an unload event listener
function onUnload(callback) {
  const wrappedCallback = wrapCancelableFunction(callback);
  initializeEventListener("unload", wrappedCallback);
  return createRemoveObject(wrappedCallback);
}

// Add a beforeunload event listener
function onBeforeUnload(callback, includeQuicklingEvents = true) {
  if (includeQuicklingEvents !== false) {
    const message =
      "Run.onBeforeUnload was called with include_quickling_events as true or undefined, but this is not valid in Comet.";
    FBLogger("comet_infra").blameToPreviousFrame().mustfix(message);
  }
  const wrappedCallback = wrapCancelableFunction(callback);
  if (!eventListeners.beforeunload) {
    eventListeners.beforeunload = [];
    if (ExecutionEnvironment.canUseEventListeners) {
      window.addEventListener("beforeunload", (event) => {
        const listeners = eventListeners.beforeunload || [];
        for (let listener of listeners) {
          try {
            const result = listener();
            if (result !== undefined) {
              if (result !== null && result.body !== null) {
                event.returnValue = result.body;
              } else {
                event.returnValue = result;
              }
              event.preventDefault();
              return result;
            }
          } catch (error) {
            FBLogger("comet_infra")
              .catching(error)
              .mustfix(
                "Hit an error while executing onBeforeUnload event listeners."
              );
          }
        }
      });
    }
  }
  eventListeners.beforeunload.push(wrappedCallback);
  return createRemoveObject(wrappedCallback);
}

// Placeholder functions for unsupported features in Comet
function onLeave() {
  unexpectedUseInComet("Run.onLeave");
  return emptyRemove;
}

function onCleanupOrLeave() {
  unexpectedUseInComet("Run.onCleanupOrLeave");
  return emptyRemove;
}

function removeHook() {
  unexpectedUseInComet("Run.removeHook");
}

// Initialize event listeners based on document ready state
function initializeReadyState() {
  if (document.readyState === "loading") {
    onLoad(() => {
      domContentLoadedFired = true;
    });
  } else {
    domContentLoadedFired = true;
  }
  if (document.readyState === "complete") {
    loadFired = true;
  } else {
    const originalOnload = window.onload;
    window.onload = function () {
      if (originalOnload) {
        originalOnload();
      }
      loadFired = true;
    };
  }
}

if (ExecutionEnvironment.canUseDOM) {
  initializeReadyState();
}

// Exported functions
export {
  initializeReadyState as __domContentCallback,
  removeHook as __removeHook,
  onBeforeUnload as maybeOnBeforeUnload,
  onAfterLoad,
  onAfterUnload,
  onBeforeUnload,
  onCleanupOrLeave,
  onLeave,
  onLoad,
  onUnload,
};

export const __onloadCallback = null;
