/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import CallbackDependencyManager from "CallbackDependencyManager";
import performanceNow from "fbjs/lib/performanceNow";
import RequireDeferredFactoryEvent from "RequireDeferredFactoryEvent";
import requireWeak from "requireWeak";

import ifRequireable from "./ifRequireable";
import ifRequired from "./ifRequired";
import promiseDone from "./promiseDone";

const FLAG_A = 1;
const FLAG_D = 2;
const FLAG_E = 16;
const FLAGS = FLAG_A | FLAG_D | FLAG_E;
let callbackDependencyManagerInstance = null;

function getCallbackDependencyManager() {
  if (callbackDependencyManagerInstance === null) {
    callbackDependencyManagerInstance = new CallbackDependencyManager();
  }
  return callbackDependencyManagerInstance;
}

function createDependencyKey(moduleId, event) {
  return `${moduleId}:${event}`;
}

const deferredModules = new Set();

class RequireDeferredReference {
  constructor(moduleId) {
    this.moduleId = moduleId;
  }

  getModuleId() {
    return this.moduleId;
  }

  getModuleIdAsRef() {
    return this.moduleId;
  }

  preload() {}

  getModuleIfRequired() {
    return ifRequired(this.moduleId, (module) => module);
  }

  getModuleIfRequireable() {
    return ifRequireable(this.moduleId, (module) => module);
  }

  isAvailableInSSR_DO_NOT_USE() {
    return true;
  }

  loadModule(callback) {
    const moduleId = this.moduleId;
    const interactionLoggerCallback = ifRequireable(
      "InteractionTracingMetrics",
      (module) =>
        module
          .currentInteractionLogger()
          .addRequireDeferred(moduleId, performanceNow())
    );

    let isRemoved = false;

    const handleModuleLoad = (module, isRequireable) => {
      if (interactionLoggerCallback) {
        interactionLoggerCallback(performanceNow(), isRequireable);
      }
      if (!isRemoved) {
        callback(module);
      }
    };

    ifRequireable(
      moduleId,
      (module) => handleModuleLoad(module, true),
      () => {
        requireWeak(moduleId, (module) => handleModuleLoad(module, false));
      }
    );

    return {
      remove() {
        isRemoved = true;
      },
    };
  }

  load() {
    return new Promise((resolve) => {
      this.loadModule(resolve);
    });
  }

  __setRef(ref) {
    return this;
  }

  onReadyImmediately(callback) {
    return this.loadModule(callback);
  }

  onReady(callback) {
    let isRemoved = false;
    const removeCallback = this.loadModule((module) => {
      promiseDone(
        Promise.resolve().then(() => {
          if (!isRemoved) {
            callback(module);
          }
        })
      );
    });

    return {
      remove() {
        isRemoved = true;
        removeCallback.remove();
      },
    };
  }

  loadImmediately(callback) {
    return this.loadModule(callback);
  }

  static getRDModuleName_DO_NOT_USE(moduleId) {
    return `rd:${moduleId}`;
  }

  static unblock(modules, event) {
    const callbackManager = getCallbackDependencyManager();

    const registerModule = (index) => {
      const moduleId = modules[index];
      if (!deferredModules.has(moduleId)) {
        deferredModules.add(moduleId);
        callbackManager.registerCallback(
          () => {
            define(
              RequireDeferredReference.getRDModuleName_DO_NOT_USE(moduleId),
              [moduleId],
              () => {
                ifRequired(moduleId, (module) => module);
              },
              FLAGS
            );
          },
          Array.from(RequireDeferredFactoryEvent.members(), (evt) =>
            createDependencyKey(moduleId, evt)
          )
        );
      }
      callbackManager.satisfyPersistentDependency(
        createDependencyKey(moduleId, event)
      );
    };

    for (let i = 0; i < modules.length; i++) {
      registerModule(i);
    }
  }
}

export default RequireDeferredReference;
