/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import CallbackDependencyManager from "CallbackDependencyManager";
import ifRequireable from "ifRequireable";
import ifRequired from "ifRequired";
import performanceNow from "performanceNow";
import Promise from "Promise";
import promiseDone from "promiseDone";
import RequireDeferredFactoryEvent from "RequireDeferredFactoryEvent";
import requireWeak from "requireWeak";

const FLAG_ONE = 1;
const FLAG_TWO = 2;
const FLAG_SIXTEEN = 16;
const DEFAULT_FLAGS = FLAG_ONE | FLAG_TWO | FLAG_SIXTEEN;

let callbackDependencyManager = null;

function getCallbackDependencyManager() {
  if (callbackDependencyManager === null) {
    callbackDependencyManager = new CallbackDependencyManager();
  }
  return callbackDependencyManager;
}

function createDependencyKey(moduleId, eventName) {
  return `${moduleId}:${eventName}`;
}

const registeredModules = new Set();

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

  handleReady(callback) {
    const manager = ifRequireable("InteractionTracingMetrics", (module) => {
      module
        .currentInteractionLogger()
        .addRequireDeferred(this.getModuleId(), performanceNow());
    });

    let removed = false;

    const onReadyCallback = (module, isImmediate) => {
      manager?.(performanceNow(), isImmediate);
      if (!removed) {
        callback(module);
      }
    };

    ifRequireable(
      this.moduleId,
      (module) => onReadyCallback(module, true),
      () => {
        requireWeak(this.moduleId, (module) => onReadyCallback(module, false));
      }
    );

    return {
      remove() {
        removed = true;
      },
    };
  }

  load() {
    return new Promise((resolve) => this.handleReady(resolve));
  }

  __setRef(ref) {
    return this;
  }

  onReadyImmediately(callback) {
    return this.handleReady(callback);
  }

  onReady(callback) {
    let removed = false;

    const handleReadyCallback = this.handleReady((module) => {
      promiseDone(
        Promise.resolve().then(() => {
          if (!removed) {
            callback(module);
          }
        })
      );
    });

    return {
      remove() {
        removed = true;
        handleReadyCallback.remove();
      },
    };
  }

  loadImmediately(callback) {
    return this.handleReady(callback);
  }

  static getRDModuleName_DO_NOT_USE(moduleId) {
    return `rd:${moduleId}`;
  }

  static unblock(moduleIds, eventName) {
    const manager = getCallbackDependencyManager();

    const registerModule = (moduleId) => {
      const key = moduleIds[moduleId];
      if (!registeredModules.has(key)) {
        registeredModules.add(key);
        manager.registerCallback(
          () => {
            define(
              RequireDeferredReference.getRDModuleName_DO_NOT_USE(key),
              [key],
              () => {
                require(key);
              },
              DEFAULT_FLAGS
            );
          },
          Array.from(RequireDeferredFactoryEvent.members(), (event) =>
            createDependencyKey(key, event)
          )
        );
      }
      manager.satisfyPersistentDependency(createDependencyKey(key, eventName));
    };

    moduleIds.forEach(registerModule);
  }
}

export default RequireDeferredReference;
