/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
(function (global) {
  if (global.require != null) return;

  let defaultExport = null;
  let globalContext = null;
  let pendingModules = [];
  let moduleMap = {};
  let moduleMetadata = {};
  let totalModules = 0;
  let currentGeneration = 0;
  let currentIndex = 0;
  let tarjanIndex = 0;
  let currentLowLink = 0;
  const SPECIAL_FLAG = 1;
  const HAS_FACTORY_FUNCTION = 2;
  const HAS_SPECIAL_DEPENDENCY = 4;
  const IS_READY = 8;
  const HAS_DEFAULT_EXPORT = 32;
  const HAS_SPECIAL_CONTEXT = 64;
  const VIRTUAL_MODULE = 128;
  const virtualModuleMap = {};
  const moduleDependencyMap = {};
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const objectToString = Object.prototype.toString;

  const resolveDependencies = (args) => {
    args = Array.prototype.slice.call(args);
    const visitedModules = {};
    const unvisitedModules = [];
    const dependencies = [];
    while (args.length) {
      const id = args.shift();
      if (visitedModules[id]) continue;
      visitedModules[id] = true;
      const module = moduleMap[id];
      if (!module || isReady(module)) continue;
      if (module.dependencies) {
        for (let i = 0; i < module.dependencies.length; i++) {
          const dep = module.dependencies[i];
          if (!isReady(dep)) args.push(dep.id);
        }
      }
    }

    for (const id in visitedModules) {
      if (hasOwnProperty.call(visitedModules, id)) args.push(id);
    }

    const messages = [];
    for (let i = 0; i < args.length; i++) {
      const id = args[i];
      let msg = id;
      const module = moduleMap[id];
      if (!module || !module.dependencies) {
        msg += " is not defined";
      } else if (isReady(module)) {
        msg += " is ready";
      } else {
        const missingDependencies = [];
        for (let j = 0; j < module.dependencies.length; j++) {
          const dep = module.dependencies[j];
          if (!isReady(dep)) missingDependencies.push(dep.id);
        }
        msg += " is waiting for " + missingDependencies.join(", ");
      }
      messages.push(msg);
    }

    return messages.join("\n");
  };

  const createModuleError = (message, ...params) => {
    const err = new Error(message);
    err.name = "ModuleError";
    err.messageFormat = message;
    err.messageParams = params.map((param) => String(param));
    err.taalOpcodes = [2, 2];
    return err;
  };

  const envConfig = global.Env || {};
  const requireInOrder = !!envConfig.gk_require_when_ready_in_order;
  const clearFactoryAfterUsed = !!envConfig.gk_clear_js_factory_after_used;
  const profileRequireFactories = !!envConfig.profile_require_factories;
  const performance = global.performance || {};
  let getTime;
  if (
    performance.now &&
    performance.timing &&
    performance.timing.navigationStart
  ) {
    const navigationStart = performance.timing.navigationStart;
    getTime = () => performance.now() + navigationStart;
  } else {
    getTime = () => Date.now();
  }
  let moduleLoadCount = 0;

  const getModuleById = (id) => {
    moduleLoadCount++;
    let module = moduleMap[id];
    if (!module || (module.exports === null && !module.factoryFinished))
      loadModule(id), (module = moduleMap[id]);
    if (module) module.refcount--;
    return module;
  };

  const getDefaultExport = (module) =>
    module.defaultExport !== moduleDependencyMap
      ? module.defaultExport
      : module.exports;
  const requireModule = (id) => {
    const module = getModuleById(id);
    return module ? getDefaultExport(module) : undefined;
  };
  const importDefault = (id) => {
    const module = getModuleById(id);
    return module
      ? module.defaultExport !== moduleDependencyMap
        ? module.defaultExport
        : null
      : undefined;
  };
  const importNamespace = (id) => {
    const module = getModuleById(id);
    return module ? module.exports : undefined;
  };

  const updateFactoryLength = (module) => {
    if (module.factoryLength === -1)
      module.factoryLength = module.factory.length;
    return module.factoryLength;
  };

  const loadModule = (id) => {
    const errorGuard = global.ErrorGuard;
    if (errorGuard && !errorGuard.inGuard())
      return errorGuard.applyWithGuard(loadModule, null, [id]);
    const module = moduleMap[id];
    if (!module) throw createModuleError('Requiring unknown module "%s"', id);
    global.__onBeforeModuleFactory == null
      ? void 0
      : global.__onBeforeModuleFactory(module);

    if (module.hasError) {
      if (module.error == null)
        throw createModuleError(
          'Requiring module "%s" which threw an exception',
          id
        );
      const err = createSafeError(module.error);
      aggregateError(err, {
        messageFormat: 'Requiring module "%s" which threw an exception',
        messageParams: [id],
      });
      throw err;
    }

    if (!isReady(module))
      throw createModuleError(
        'Requiring module "%s" with unresolved dependencies: %s',
        id,
        resolveDependencies([id])
      );

    processModule(module);

    let exports = {};
    const factory = module.factory;
    const dependencies = module.dependencies;

    if (
      objectToString.call(factory) === "[object Function]" &&
      dependencies != null
    ) {
      const depCount = dependencies.length;
      try {
        try {
          runModuleSideEffects(module);
        } catch (err) {
          handleModuleError(err, id);
        }
        const args = [];
        let len = depCount;
        if (module.special & IS_READY) {
          const base =
            module.special & HAS_DEFAULT_EXPORT ? globalContext : defaultExport;
          args.push(...base.slice(0));
          args[base.length - 2] = module;
          args[base.length - 1] = exports;
          len += args.length;
        }
        if (module.special & HAS_FACTORY_FUNCTION) {
          const factoryLength = updateFactoryLength(module);
          len = Math.min(depCount + args.length, factoryLength);
        }
        for (let i = 0; i < depCount; i++) {
          const dep = dependencies[i];
          args.length < len && args.push(requireModule.call(null, dep.id));
        }

        let startTime;
        profileRequireFactories && (startTime = getTime());
        moduleMetadata[module.id].factoryRun = true;
        let result;
        try {
          result =
            module.context != null
              ? factory.apply(module.context, args)
              : factory(...args);
        } catch (err) {
          handleModuleError(err, id);
        } finally {
          if (profileRequireFactories) {
            const endTime = getTime();
            const timing = moduleMetadata[module.id];
            timing.factoryTime = endTime - (startTime || 0);
            timing.factoryEnd = endTime;
            timing.factoryStart = startTime;
            if (factory.__SMmeta) {
              for (const key in factory.__SMmeta) {
                if (
                  Object.prototype.hasOwnProperty.call(factory.__SMmeta, key)
                ) {
                  timing[key] = factory.__SMmeta[key];
                }
              }
            }
          }
        }

        if (result) module.exports = result;
        const defExp = module.exports;
        if (module.special & HAS_SPECIAL_CONTEXT) {
          if (
            module.exports != null &&
            hasOwnProperty.call(module.exports, "default")
          ) {
            module.defaultExport = defExp = module.exports["default"];
          }
        } else {
          module.defaultExport = defExp = module.exports;
        }
        if (typeof defExp === "function") {
          const superConstructor = defExp.__superConstructor__;
          if (
            !defExp.displayName ||
            (superConstructor &&
              superConstructor.displayName === defExp.displayName)
          ) {
            try {
              defExp.displayName =
                (defExp.name || "(anonymous)") + " [from " + id + "]";
            } catch (err) {}
          }
        }
        module.factoryFinished = true;
        clearFactoryAfterUsed && (module.factory = null);
      } catch (err) {
        module.hasError = true;
        module.error = err;
        module.exports = null;
        throw err;
      }
    } else {
      module.exports = factory;
    }
    const isRequired = "__isRequired__" + id;
    const requiredModule = moduleMap[isRequired];
    if (requiredModule && !isReady(requiredModule))
      processVirtualModule(isRequired, virtualModuleMap);
    global.__onAfterModuleFactory == null
      ? void 0
      : global.__onAfterModuleFactory(module);
  };

  const createSafeError = (err) => {
    if (global.getErrorSafe != null) return global.getErrorSafe(err);
    return err != null &&
      typeof err === "object" &&
      typeof err.message === "string"
      ? err
      : createModuleError("Non-error thrown: %s", String(err));
  };

  const aggregateError = (err, params) => {
    const serializer = global.ErrorSerializer;
    serializer && serializer.aggregateError(err, params);
  };

  const handleModuleError = (err, id) => {
    const safeErr = createSafeError(err);
    aggregateError(safeErr, {
      messageFormat: 'Module "%s"',
      messageParams: [id],
      forcedKey: id.startsWith("__") ? null : id,
    });
    throw safeErr;
  };

  const getTotalModules = () => moduleLoadCount;

  const getModuleMetadata = () => {
    const data = {};
    for (const id in moduleMetadata) {
      if (Object.prototype.hasOwnProperty.call(moduleMetadata, id)) {
        data[id] = moduleMetadata[id];
      }
    }
    return data;
  };

  const processModule = (module) => {
    if (module.nonJSDeps) return;
    module.nonJSDeps = true;
    if (module.dependencies) {
      module.dependencies.forEach(processModule);
    }
  };

  const isBrowserEnvironment = !!(
    global != null &&
    global.document != null &&
    "createElement" in global.document
  );
  const isWorkerEnvironment = typeof WorkerGlobalScope === "function";
  isBrowserEnvironment = isBrowserEnvironment || isWorkerEnvironment;
  const useVirtualModules =
    envConfig.use_fbt_virtual_modules === true && isBrowserEnvironment;
  const virtualModuleSuffix = "$fbt_virtual";
  const virtualModules = {};
  let virtualModuleCheckTimer = null;
  const virtualModuleTimeout = 60000;

  const markVirtualModule = (id) => {
    if (!(id in moduleMap) && !(id in virtualModules)) {
      virtualModules[id] = getTime();
    }
    if (!virtualModuleCheckTimer) {
      virtualModuleCheckTimer = setTimeout(
        getGuardedFunction(
          checkVirtualModuleTimeout,
          "_checkFbtVirtualModuleTimeout"
        ),
        virtualModuleTimeout
      );
    }
  };

  const checkVirtualModuleTimeout = () => {
    virtualModuleCheckTimer = null;
    const now = getTime();
    const expiredModules = Object.keys(virtualModules).filter((id) => {
      const isExpired = now - virtualModules[id] > virtualModuleTimeout;
      if (isExpired) delete virtualModules[id];
      return isExpired;
    });

    if (Object.keys(virtualModules).length > 0) {
      virtualModuleCheckTimer = setTimeout(
        getGuardedFunction(
          checkVirtualModuleTimeout,
          "_checkFbtVirtualModuleTimeout"
        ),
        virtualModuleTimeout
      );
    }

    if (expiredModules.length > 0) {
      requireLazy(["FBLogger"], (logger) => {
        logger("binary_transparency", "vmod_timeout").warn(
          "The following virtual modules are taking over %sms to be defined: %s...",
          virtualModuleTimeout,
          expiredModules.join(",").slice(0, 300)
        );
      });
    }
  };

  const defineVirtualModule = (id, dependencies, category) => {
    if (useVirtualModules && category != null && category & VIRTUAL_MODULE) {
      const virtualId = id + virtualModuleSuffix;
      dependencies.push(virtualId);
      markVirtualModule(virtualId);
    }
  };

  const processVirtualModule = (
    id,
    dependencies = [],
    factory,
    category,
    context,
    refCount,
    meta
  ) => {
    if (category === undefined) {
      category = HAS_FACTORY_FUNCTION;
    }

    const module = new Module(id, 0);
    module.factory = factory;
    module.dependencies = dependencies.map(getModuleById);
    module.context = context;
    module.special = category;

    if (!refCount) {
      module.refcount = 1;
    }

    moduleMetadata[id] = {
      id,
      dependencies: dependencies,
      meta,
      category,
      defined: profileRequireFactories ? getTime() : null,
      factoryTime: null,
      factoryStart: null,
      factoryEnd: null,
      factoryRun: false,
    };

    moduleMap[id] = module;
    scheduleModule(module);

    if (pendingModules.length > 0) {
      const workItems = pendingModules;
      pendingModules = [];
      const scheduleJSWork = global.ScheduleJSWork
        ? global.ScheduleJSWork
        : runImmediateWork;
      scheduleJSWork(() => {
        if (requireInOrder) {
          for (let i = 0; i < workItems.length; i++) {
            requireModule.call(null, workItems[i].id);
          }
          workItems.length = 0;
        } else {
          while (workItems.length > 0) {
            requireModule.call(null, workItems.pop().id);
          }
        }
      });
    }
    return { cancel: cancelModule.bind(this, id) };
  };

  // const getModuleById = (id) => {
  //   let module = moduleMap[id];
  //   if (module) return module;
  //   module = new Module(id, 0);
  //   moduleMap[id] = module;
  //   return module;
  // };

  class Module {
    constructor(id, refcount, exports = null) {
      this.id = id;
      this.refcount = refcount;
      this.exports = exports || null;
      this.defaultExport = exports || moduleDependencyMap;
      this.factory = undefined;
      this.factoryLength = -1;
      this.factoryFinished = false;
      this.dependencies = undefined;
      this.depPosition = 0;
      this.context = undefined;
      this.special = 0;
      this.hasError = false;
      this.error = null;
      this.ranRecursiveSideEffects = false;
      this.sideEffectDependencyException = null;
      this.nextDepWaitingHead = null;
      this.nextDepWaitingNext = null;
      this.tarjanGeneration = -1;
      this.tarjanLow = 0;
      this.tarjanIndex = 0;
      this.tarjanOnStack = false;
      this.nonJSDeps = false;
    }
  }

  const cancelModule = (id) => {
    if (!moduleMap[id]) return;
    const module = moduleMap[id];
    moduleMap[id] = null;
    if (module.dependencies) {
      for (let i = 0; i < module.dependencies.length; i++) {
        const dep = module.dependencies[i];
        dep.refcount--;
        if (dep.refcount === 1) {
          cancelModule(dep.id);
        }
      }
    }
  };

  const requireLazy = (dependencies, callback, context) => {
    const id = "__requireLazy__x__" + totalModules++;
    return processVirtualModule(
      "__requireLazy__" + id,
      dependencies,
      getGuardedFunction(callback, "requireLazy", { propagationType: 0 }),
      SPECIAL_FLAG | IS_READY,
      context,
      1
    );
  };

  const generateModuleId = (suffix) =>
    "__mod__" + (suffix != null ? suffix + "__" : "") + totalModules++;

  const detectCycles = (cycle, stack, module) => {
    module.tarjanGeneration = currentGeneration;
    module.tarjanLow = module.tarjanIndex = currentIndex++;
    module.tarjanOnStack = true;
    stack.push(module);

    const dependencies = module.dependencies;
    if (dependencies) {
      for (let j = module.depPosition; j < dependencies.length; j++) {
        const dep = dependencies[j];
        if (dep.tarjanGeneration !== currentGeneration) {
          detectCycles(cycle, stack, dep);
          module.tarjanLow = Math.min(module.tarjanLow, dep.tarjanLow);
        } else if (dep.tarjanOnStack) {
          module.tarjanLow = Math.min(module.tarjanLow, dep.tarjanIndex);
        }
      }
    }

    if (module.tarjanLow === module.tarjanIndex) {
      const components = [];
      let current;
      do {
        current = stack.pop();
        current.tarjanOnStack = false;
        components.push(current);
      } while (current !== module);

      if (
        module === stack[0] &&
        current !== module &&
        current.dependencies != null
      ) {
        for (
          let j = current.depPosition;
          j < current.dependencies.length;
          j++
        ) {
          const dep = current.dependencies[j];
          if (
            !isReady(dep) &&
            cycle.indexOf(dep) === -1 &&
            stack.indexOf(dep) === -1 &&
            components.indexOf(dep) === -1
          ) {
            cycle.push(dep);
          }
        }
      }
    }
  };

  const replaceCycleLinkWithSCCDeps = (module) => {
    if (!module.dependencies)
      throw createModuleError(
        "Called _replaceCycleLinkWithSCCDeps on an undefined module"
      );
    currentGeneration++;
    detectCycles(module.dependencies, [], module);
    module.depPosition++;
    scheduleModule(module);
  };

  const processModuleDependency = (cycle, module) => {
    while (true) {
      if (
        module.dependencies &&
        module.depPosition !== module.dependencies.length
      ) {
        module = module.dependencies[module.depPosition];
      } else {
        break;
      }
      if (module === cycle) {
        replaceCycleLinkWithSCCDeps(cycle);
        return;
      }
    }
    cycle.nextDepWaitingNext = module.nextDepWaitingHead;
    module.nextDepWaitingHead = cycle;
  };

  const isReady = (module) =>
    module.dependencies != null &&
    module.depPosition >= module.dependencies.length;

  const incrementDepPosition = (module) => {
    module.depPosition++;
    scheduleModule(module);
  };

  const handleNextDepWaiting = (module) => {
    let next = module.nextDepWaitingHead;
    module.nextDepWaitingHead = null;
    while (next != null) {
      const current = next;
      if (current.nonJSDeps) {
        processModule(module);
      }
      next = current.nextDepWaitingNext;
      current.nextDepWaitingNext = null;
      incrementDepPosition(current);
    }
  };

  const isSpecialFlag = (module) => module.special & SPECIAL_FLAG;
  const isReadyFlag = (module) => module.special & IS_READY;

  const scheduleModule = (module) => {
    while (
      module.dependencies != null &&
      module.depPosition < module.dependencies.length
    ) {
      const dep = module.dependencies[module.depPosition];
      if (!isReady(dep) && module !== dep) {
        processModuleDependency(module, dep);
        return;
      }
      module.depPosition++;
    }
    if (isSpecialFlag(module)) pendingModules.push(module);
    if (module.nextDepWaitingHead !== null) handleNextDepWaiting(module);
  };

  const runModuleSideEffects = (module) => {
    if (module.sideEffectDependencyException != null)
      throw module.sideEffectDependencyException;
    if (module.ranRecursiveSideEffects) return;
    module.ranRecursiveSideEffects = true;
    const dependencies = module.dependencies;
    if (dependencies) {
      for (let j = 0; j < dependencies.length; j++) {
        const dep = dependencies[j];
        try {
          runModuleSideEffects(dep);
        } catch (err) {
          module.sideEffectDependencyException = err;
          throw err;
        }
        if (dep.special & HAS_SPECIAL_DEPENDENCY) {
          try {
            requireModule.call(null, dep.id);
          } catch (err) {
            module.sideEffectDependencyException = err;
            throw err;
          }
        }
      }
    }
  };

  const defineModule = (id, refcount, exports) => {
    moduleMap[id] = new Module(id, 0, exports);
    moduleMetadata[id] = {
      id,
      dependencies: [],
      category: 0,
      factoryLengthAccessTime: null,
      factoryTime: null,
      factoryStart: null,
      factoryEnd: null,
      factoryRun: false,
    };
  };

  defineModule("module", 0);
  defineModule("exports", 0);
  defineModule("define", processVirtualModule);
  defineModule("global", global);
  defineModule("require", requireModule);
  defineModule("requireInterop", requireModule);
  defineModule("importDefault", importDefault);
  defineModule("importNamespace", importNamespace);
  defineModule("requireDynamic", requireDynamicModule);
  defineModule("requireLazy", requireLazy);
  defineModule("requireWeak", requireWeakModule);
  defineModule("ifRequired", ifRequired);
  defineModule("ifRequireable", ifRequireable);

  const globalContextDependencies = [
    requireModule.call(null, "global"),
    requireModule.call(null, "require"),
    requireModule.call(null, "requireDynamic"),
    requireModule.call(null, "requireLazy"),
    requireModule.call(null, "requireInterop"),
    null,
  ];
  const defaultExportDependencies = [
    requireModule.call(null, "global"),
    requireModule.call(null, "require"),
    requireModule.call(null, "importDefault"),
    requireModule.call(null, "importNamespace"),
    requireModule.call(null, "requireLazy"),
    requireModule.call(null, "requireInterop"),
    null,
  ];

  processVirtualModule.amd = {};
  global.define = processVirtualModule;
  global.require = requireModule;
  global.requireInterop = requireModule;
  global.importDefault = importDefault;
  global.importNamespace = importNamespace;
  global.requireDynamic = requireDynamicModule;
  global.requireLazy = requireLazy;
  global.__onBeforeModuleFactory = null;
  global.__onAfterModuleFactory = null;

  const requireDynamicModule = (id, callback) => {
    throw new ReferenceError("requireDynamic is not defined");
  };

  const requireWeakModule = (id, callback) => {
    ifRequired.call(
      null,
      id,
      (module) => {
        callback(module);
      },
      () => {
        processVirtualModule(
          "__requireWeak__" + id + "__" + totalModules++,
          ["__isRequired__" + id],
          getGuardedFunction(() => {
            return callback(getDefaultExport(moduleMap[id]));
          }, "requireWeak"),
          SPECIAL_FLAG,
          null,
          1
        );
      }
    );
  };

  const ifRequired = (id, callback, errorCallback) => {
    const module = moduleMap[id];
    if (module && module.factoryFinished) {
      if (typeof callback === "function")
        return callback(getDefaultExport(module));
    } else if (typeof errorCallback === "function") return errorCallback();
  };

  const ifRequireable = (id, callback, errorCallback) => {
    const module = moduleMap[id];
    if (module && module.nonJSDeps && isReady(module)) {
      if (typeof callback === "function")
        return callback(requireModule.call(null, id));
    } else if (typeof errorCallback === "function") return errorCallback();
  };

  const debugUtils = {
    getDupCount: () => [tarjanIndex, currentLowLink],
    getModules: () => {
      const data = {};
      for (const id in moduleMap) {
        if (Object.prototype.hasOwnProperty.call(moduleMap, id)) {
          data[id] = moduleMap[id];
        }
      }
      return data;
    },
    modulesMap: moduleMap,
    debugUnresolvedDependencies: resolveDependencies,
  };

  const runImmediateWork = (work) => work;

  const getGuardedFunction = () => {
    const guard =
      global.TimeSlice && global.TimeSlice.guard
        ? global.TimeSlice.guard
        : runImmediateWork;
    return function () {
      return guard.apply(void 0, arguments);
    };
  };

  defineModule("__getTotalRequireCalls", getTotalModules);
  defineModule("__getModuleTimeDetails", getModuleMetadata);
  defineModule("__debug", debugUtils);

  global.__d = (id, dependencies, factory, special) => {
    getGuardedFunction(
      () => {
        processVirtualModule(
          id,
          dependencies,
          factory,
          (special || HAS_FACTORY_FUNCTION) | IS_READY,
          null,
          null,
          null
        );
      },
      "define " + id,
      { root: true }
    )();
  };

  const validateModule = (global, module) => true;

  if (global.__d_stub) {
    for (let i = 0; i < global.__d_stub.length; i++)
      global.__d.apply(null, global.__d_stub[i]);
    delete global.__d_stub;
  }

  if (global.__rl_stub) {
    for (let i = 0; i < global.__rl_stub.length; i++)
      requireLazy.apply(null, global.__rl_stub[i]);
    delete global.__rl_stub;
  }

  global.$RefreshReg$ = () => {};
  global.$RefreshSig$ = () =>
    function (arg) {
      return arg;
    };
})(
  typeof this !== "undefined"
    ? this
    : typeof global !== "undefined"
    ? global
    : typeof window !== "undefined"
    ? window
    : typeof self !== "undefined"
    ? self
    : {}
);
