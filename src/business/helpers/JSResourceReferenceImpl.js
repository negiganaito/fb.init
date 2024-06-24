/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import ifRequireable from "./ifRequireable";
import ifRequired from "./ifRequired";
import { notify } from "./JSResourceEvents";
import Promise from "./Promise";
import { setDisplayName } from "./PromiseAnnotate";

const identity = (a) => a;
let callbacks = [];
let bootloader = null;

function registerCallback(callback) {
  if (bootloader) {
    callback(bootloader);
  } else {
    callbacks.push(callback);
  }
}

const UNKNOWN_CALLER = "JSResource: unknown caller";

class JSResourceReferenceImpl {
  static setBootloader(loader) {
    bootloader = loader;
    callbacks.forEach((callback) => callback(loader));
    callbacks = [];
  }

  constructor(moduleId) {
    this.moduleId = moduleId;
  }

  getModuleId() {
    return this.moduleId;
  }

  getModuleIdAsRef() {
    return this.moduleId;
  }

  load() {
    notify(this.moduleId, this.ref, "LOADED");

    const promise = new Promise((resolve) => {
      registerCallback((loader) => {
        loader.loadModules(
          [this.getModuleIdAsRef()],
          (module) => {
            notify(this.moduleId, this.ref, "PROMISE_RESOLVED");
            resolve(module);
          },
          this.ref !== null ? this.ref : UNKNOWN_CALLER
        );
      });
    });

    setDisplayName(promise, `Bootload(${this.getModuleId()})`);
    return promise;
  }

  preload() {
    const ref = this.ref !== null ? this.ref : UNKNOWN_CALLER;
    registerCallback((loader) => {
      loader.loadModules(
        [this.getModuleIdAsRef()],
        () => {},
        `preload: ${ref}`
      );
    });
  }

  equals(other) {
    return this === other || this.moduleId === other.moduleId;
  }

  getModuleIfRequireable() {
    notify(this.moduleId, this.ref, "ACCESSED");
    return ifRequireable(this.moduleId, identity);
  }

  getModuleIfRequired() {
    notify(this.moduleId, this.ref, "ACCESSED");
    return ifRequired(this.moduleId, identity);
  }

  static disableForSSR_DO_NOT_USE() {
    this.isEnabledForSSR = false;
  }

  isAvailableInSSR_DO_NOT_USE() {
    return JSResourceReferenceImpl.isEnabledForSSR;
  }

  __setRef(ref) {
    this.ref = ref;
    notify(this.moduleId, this.ref, "CREATED");
    return this;
  }

  static loadAll(resources, callback) {
    const refs = {};
    let hasRef = false;

    for (const resource of resources) {
      const ref = resource.ref;
      if (ref) {
        hasRef = true;
        refs[ref] = true;
      }
      notify(resource.moduleId, ref, "LOADED");
    }

    registerCallback((loader) => {
      loader.loadModules(
        resources.map((resource) => resource.getModuleId()),
        callback,
        hasRef ? Object.keys(refs).join(":") : UNKNOWN_CALLER
      );
    });
  }
}

JSResourceReferenceImpl.isEnabledForSSR = true;

export default JSResourceReferenceImpl;
