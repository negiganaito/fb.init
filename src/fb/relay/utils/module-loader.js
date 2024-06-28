/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/**
 * @typedef {Object} PendingJSModule
 * @property {'pending'} kind - The type of the module, set to 'pending'.
 * @property {(reason?: Error) => void} reject - The function to reject the promise.
 * @property {(value: JSModule | undefined) => void} resolve - The function to resolve the promise.
 */

/**
 * @typedef {Object} RegisteredJSModule
 * @property {'registered'} kind - The type of the module, set to 'registered'.
 * @property {() => Promise<JSModuleLoaded>} loaderFn - The function to load the module.
 */

/**
 * @typedef {PendingJSModule | RegisteredJSModule} JSModule
 */

/**
 * @typedef {Object} JSModuleLoaded
 * @property {JSModule} default - The default export of the loaded module.
 */

/**
 * Map containing pending module loaders.
 * @type {Map<string, PendingJSModule>}
 */
const loaders = new Map();

/**
 * Map containing loaded modules.
 * @type {Map<string, JSModuleLoaded>}
 */
const loadedModules = new Map();

/**
 * Map containing failed modules and associated errors.
 * @type {Map<string, Error>}
 */
const failedModules = new Map();

/**
 * Map containing pending loaders and associated promises.
 * @type {Map<string, Promise<JSModule | undefined>>}
 */
const pendingLoaders = new Map();

/**
 * Function to create a module loader for a specific module name.
 * @param {string} name - The name of the module.
 * @returns {Object} - An object with utility functions for the module loader.
 */
export default function moduleLoader(name) {
  return {
    /**
     * Get the error associated with the module.
     * @returns {Error | undefined} - The error object, if any.
     */
    getError() {
      return failedModules.get(name);
    },

    /**
     * Reset the error associated with the module.
     */
    resetError() {
      failedModules.delete(name);
    },

    /**
     * Get the loaded module.
     * @returns {JSModule | null} - The loaded module or null if not loaded.
     */
    get() {
      const jsModule = loadedModules.get(name);
      return !jsModule ? null : jsModule.default;
    },

    /**
     * Load the module.
     * @returns {Promise<JSModule | undefined>} - A promise that resolves to the loaded module.
     */
    load() {
      const loader = loaders.get(name);

      if (!loader) {
        const promise = new Promise((resolve, reject) => {
          loaders.set(name, {
            kind: "pending",
            resolve,
            reject,
          });
        });

        pendingLoaders.set(name, promise);
        return promise;
      } else if (loader.kind === "registered") {
        return loader.loaderFn().then(
          (module) => {
            loadedModules.set(name, module);
            return module.default;
          },
          (error) => {
            failedModules.set(name, error);
            throw error;
          }
        );
      } else if (loader.kind === "pending") {
        return pendingLoaders.get(name);
      } else {
        return;
      }
    },
  };
}

/**
 * Register a loader function for a specific module name.
 * @param {string} name - The name of the module.
 * @param {() => Promise<JSModuleLoaded>} loaderFn - The loader function.
 */
export function registerLoader(name, loaderFn) {
  const loader = loaders.get(name);

  if (!loader) {
    loaders.set(name, {
      kind: "registered",
      loaderFn,
    });
  } else if (loader.kind === "pending") {
    loaderFn().then(
      (module) => {
        loadedModules.set(name, module);
        pendingLoaders.delete(name);
        loader.resolve(module.default);
      },
      (error) => {
        failedModules.set(name, error);
        pendingLoaders.delete(name);
        loader.reject(error);
      }
    );
  }
}
