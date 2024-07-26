/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { applyWithGuard } from "./TimeSlice";

class CallbackDependencyManager {
  constructor() {
    this.dependencies = new Map();
    this.callbacks = new Map();
    this.nextId = 1;
    this.satisfiedDependencies = new Map();
  }

  addDependenciesToExistingCallback(callbackId, dependencies) {
    const callbackInfo = this.callbacks.get(callbackId);
    if (!callbackInfo) return null;

    const additionalDepsCount = this.addDependencies(callbackId, dependencies);
    callbackInfo.pendingDependencies += additionalDepsCount;

    return callbackId;
  }

  isPersistentDependencySatisfied(dependency) {
    return !!this.satisfiedDependencies.get(dependency);
  }

  satisfyPersistentDependency(dependency) {
    this.satisfiedDependencies.set(dependency, 1);
    this.notifyCallbacks(dependency);
  }

  satisfyNonPersistentDependency(dependency) {
    const wasAlreadySatisfied =
      this.satisfiedDependencies.get(dependency) === 1;
    if (!wasAlreadySatisfied) {
      this.satisfiedDependencies.set(dependency, 1);
    }
    this.notifyCallbacks(dependency);
    if (!wasAlreadySatisfied) {
      this.satisfiedDependencies.delete(dependency);
    }
  }

  registerCallback(callback, dependencies) {
    const callbackId = this.nextId++;
    const pendingDependencies = this.addDependencies(callbackId, dependencies);

    if (pendingDependencies === 0) {
      applyWithGuard(callback, null, []);
      return null;
    }

    this.callbacks.set(callbackId, {
      callback,
      pendingDependencies,
    });

    return callbackId;
  }

  addDependencies(callbackId, dependencies) {
    let addedCount = 0;
    const uniqueDependencies = new Set(dependencies);

    for (const dependency of uniqueDependencies) {
      if (this.satisfiedDependencies.get(dependency)) continue;
      addedCount++;
      let dependencyMap = this.dependencies.get(dependency);
      if (!dependencyMap) {
        dependencyMap = new Map();
        this.dependencies.set(dependency, dependencyMap);
      }
      dependencyMap.set(callbackId, (dependencyMap.get(callbackId) || 0) + 1);
    }

    return addedCount;
  }

  notifyCallbacks(dependency) {
    const dependencyMap = this.dependencies.get(dependency);
    if (!dependencyMap) return;

    for (const [callbackId, count] of dependencyMap.entries()) {
      dependencyMap.set(callbackId, count - 1);
      if (count - 1 <= 0) {
        dependencyMap.delete(callbackId);
        const callbackInfo = this.callbacks.get(callbackId);
        if (callbackInfo) {
          callbackInfo.pendingDependencies--;
          if (callbackInfo.pendingDependencies <= 0) {
            this.callbacks.delete(callbackId);
            applyWithGuard(callbackInfo.callback, null, []);
          }
        }
      }
    }
  }
}

export default CallbackDependencyManager;
