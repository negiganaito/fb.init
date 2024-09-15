/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable max-depth */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-invalid-this */

((globalScope) => {
  if (globalScope.require !== null) return;

  // let standardDeps = null;
  // let standardDepsPlusExports = null;
  let pendingDefinitions = [];
  let moduleMap = {};
  let moduleTimeDetails = {};
  let totalModuleId = 0;
  let tarjanGeneration = 0;
  let syncModuleCount = 0;
  let asyncModuleCount = 0;
  let tarjanIndex = 0;

  const MODULE_FACTORY_TYPE = 1;
  const ASYNC_MODULE_TYPE = 2;
  const POST_LOAD_HOOK_TYPE = 4;
  const WEBPACK_MODULE_TYPE = 8;
  const OPTIONAL_MODULE_TYPE = 16;
  const WEBPACK_ASYNC_MODULE_TYPE = 32;
  const BEHAVIOR_DEPS_TYPE = 64;
  const FBT_VIRTUAL_MODULE_TYPE = 128;

  const virtualModules = {};
  const factoryMap = {};

  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const objectToString = Object.prototype.toString;

  const getUnresolvedDependencies = (moduleIds) => {
    moduleIds = Array.prototype.slice.call(moduleIds);
    const resolvedModules = {};
    const unresolvedModules = [];

    while (moduleIds.length) {
      const id = moduleIds.shift();
      if (resolvedModules[id]) continue;
      resolvedModules[id] = true;

      const module = moduleMap[id];
      if (!module || isModuleReady(module)) continue;

      if (module.dependencies) {
        for (let i = 0; i < module.dependencies.length; i++) {
          const dependency = module.dependencies[i];
          if (!isModuleReady(dependency)) {
            moduleIds.push(dependency.id);
          }
        }
      }
    }

    for (const id in resolvedModules) {
      if (hasOwnProperty.call(resolvedModules, id)) {
        unresolvedModules.push(id);
      }
    }

    const result = unresolvedModules.map((id) => {
      const module = moduleMap[id];
      const dependencies = module ? module.dependencies : null;

      if (!module || !dependencies) {
        return `${id} is not defined`;
      } else if (isModuleReady(module)) {
        return `${id} is ready`;
      } else {
        const unresolvedDeps = dependencies
          .filter((dep) => !isModuleReady(dep))
          .map((dep) => dep.id);
        return `${id} is waiting for ${unresolvedDeps.join(", ")}`;
      }
    });

    return result.join("\n");
  };
  const createModuleError = (errorMessage, ...args) => {
    const error = new Error(errorMessage);
    error.name = "ModuleError";
    error.messageFormat = errorMessage;
    error.messageParams = args.map(String);
    error.taalOpcodes = [2, 2];
    return error;
  };

  const ENV = globalScope.Env || {};
  const REQUIRE_WHEN_READY_IN_ORDER = !!ENV.gk_require_when_ready_in_order;
  const CLEAR_JS_FACTORY_AFTER_USE = !!ENV.clear_js_factory_after_used;
  const PROFILE_REQUIRE_FACTORIES = !!ENV.profile_require_factories;

  const performance = globalScope.performance || {};
  let getCurrentTimestamp;

  if (
    performance.now &&
    performance.timing &&
    performance.timing.navigationStart
  ) {
    const navigationStart = performance.timing.navigationStart;
    getCurrentTimestamp = () => performance.now() + navigationStart;
  } else {
    getCurrentTimestamp = () => Date.now();
  }

  let requireCallCount = 0;

  const decrementModuleRefCount = (moduleId) => {
    requireCallCount++;
    let module = moduleMap[moduleId];

    if (!module || (module.exports === null && !module.factoryFinished)) {
      instantiateModule(moduleId);
      module = moduleMap[moduleId];
    }

    if (module && module.refcount-- === 1) {
      moduleMap[moduleId] = null;
    }

    return module;
  };

  const getModuleExports = (module) => {
    return module.defaultExport !== factoryMap
      ? module.defaultExport
      : module.exports;
  };

  const requireModule = (moduleId) => {
    const module = decrementModuleRefCount(moduleId);
    if (module) return getModuleExports(module);
  };

  const importDefault = (moduleId) => {
    const module = decrementModuleRefCount(moduleId);
    if (module)
      return module.defaultExport !== factoryMap ? module.defaultExport : null;
  };

  const importNamespace = (moduleId) => {
    const module = decrementModuleRefCount(moduleId);
    if (module) return module.exports;
  };

  const getFactoryParamCount = (module) => {
    if (module.factoryLength === -1) {
      module.factoryLength = module.factory.length;
    }
    return module.factoryLength;
  };

  // eslint-disable-next-line complexity
  const instantiateModule = (moduleId) => {
    const ErrorGuard = globalScope.ErrorGuard;
    if (ErrorGuard && !ErrorGuard.inGuard()) {
      return ErrorGuard.applyWithGuard(instantiateModule, null, [moduleId]);
    }

    const module = moduleMap[moduleId];
    if (!module) {
      throw createModuleError('Requiring unknown module "%s"', moduleId);
    }

    globalScope.__onBeforeModuleFactory?.(module);

    if (module.hasError) {
      if (module.error === null) {
        throw createModuleError(
          'Requiring module "%s" which threw an exception',
          moduleId
        );
      } else {
        const error = getSafeError(module.error);
        aggregateError(error, {
          messageFormat: 'Requiring module "%s" which threw an exception',
          messageParams: [moduleId],
        });
        throw error;
      }
    }

    if (!isModuleReady(module)) {
      throw createModuleError(
        'Requiring module "%s" with unresolved dependencies: %s',
        moduleId,
        getUnresolvedDependencies([moduleId])
      );
    }

    markModuleAsNonJSDep(module);
    module.exports = {};

    let factory = module.factory;
    const dependencies = module.dependencies;

    if (
      objectToString.call(factory) === "[object Function]" &&
      dependencies !== null
    ) {
      const dependencyCount = dependencies.length;
      let factoryResult;

      try {
        try {
          runRecursiveSideEffects(module);
        } catch (error) {
          throwModuleError(error, moduleId);
        }

        const factoryArgs = [];
        let argCount = dependencyCount;

        if (module.special & WEBPACK_MODULE_TYPE) {
          const specialDeps =
            module.special & WEBPACK_ASYNC_MODULE_TYPE
              ? standardDependenciesPlusExports
              : standardDependencies;
          factoryArgs.push(...specialDeps.slice(0));
          factoryArgs[specialDeps.length - 2] = module;
          factoryArgs[specialDeps.length - 1] = module.exports;
          argCount += factoryArgs.length;
        }

        if (module.special & ASYNC_MODULE_TYPE) {
          const factoryArgCount = getFactoryParamCount(module);
          argCount = Math.min(
            dependencyCount + factoryArgs.length,
            factoryArgCount
          );
        }

        for (let i = 0; i < dependencyCount; i++) {
          const dependency = dependencies[i];
          if (factoryArgs.length < argCount) {
            factoryArgs.push(requireModule(dependency.id));
          }
        }

        let factoryStartTime;
        if (PROFILE_REQUIRE_FACTORIES) {
          factoryStartTime = getCurrentTimestamp();
        }

        moduleTimeDetails[module.id].factoryRun = true;

        try {
          const factoryThis =
            module.context !== null ? module.context : globalScope;
          factoryResult = factory.apply(factoryThis, factoryArgs);
        } catch (error) {
          throwModuleError(error, moduleId);
        } finally {
          if (PROFILE_REQUIRE_FACTORIES) {
            const factoryEndTime = getCurrentTimestamp();
            const moduleProfile = moduleTimeDetails[module.id];
            moduleProfile.factoryTime =
              factoryEndTime - (factoryStartTime || 0);
            moduleProfile.factoryEnd = factoryEndTime;
            moduleProfile.factoryStart = factoryStartTime;
            if (factory.__SMmeta) {
              for (const key in factory.__SMmeta) {
                if (
                  Object.prototype.hasOwnProperty.call(factory.__SMmeta, key)
                ) {
                  moduleProfile[key] = factory.__SMmeta[key];
                }
              }
            }
          }
        }
      } catch (error) {
        module.hasError = true;
        module.error = error;
        module.exports = null;
        throw error;
      }

      if (factoryResult) {
        module.exports = factoryResult;
      }

      let defaultExport;
      if (module.special & BEHAVIOR_DEPS_TYPE) {
        if (
          module.exports !== null &&
          hasOwnProperty.call(module.exports, "default")
        ) {
          module.defaultExport = defaultExport = module.exports["default"];
        }
      } else {
        module.defaultExport = defaultExport = module.exports;
      }

      if (typeof defaultExport === "function") {
        const superConstructor = defaultExport.__superConstructor__;
        if (
          !defaultExport.displayName ||
          (superConstructor &&
            superConstructor.displayName === defaultExport.displayName)
        ) {
          try {
            defaultExport.displayName =
              (defaultExport.name || "(anonymous)") +
              " [from " +
              moduleId +
              "]";
          } catch (error) {
            // Ignore errors when setting displayName
          }
        }
      }

      module.factoryFinished = true;
      if (CLEAR_JS_FACTORY_AFTER_USE) {
        module.factory = null;
        factory = undefined;
      }
    } else {
      module.exports = factory;
    }

    const isRequiredModuleId = "__isRequired__" + moduleId;
    const isRequiredModule = moduleMap[isRequiredModuleId];
    if (isRequiredModule && !isModuleReady(isRequiredModule)) {
      defineModule(isRequiredModuleId, virtualModules);
    }

    globalScope.__onAfterModuleFactory?.(module);
  };

  const getSafeError = (error) => {
    if (globalScope.getErrorSafe !== null) {
      return globalScope.getErrorSafe(error);
    }
    return error !== null &&
      typeof error === "object" &&
      typeof error.message === "string"
      ? error
      : createModuleError("Non-error thrown: %s", String(error));
  };

  const aggregateError = (error, errorInfo) => {
    const ErrorSerializer = globalScope.ErrorSerializer;
    ErrorSerializer && ErrorSerializer.aggregateError(error, errorInfo);
  };

  const throwModuleError = (error, moduleId) => {
    error = getSafeError(error);
    aggregateError(error, {
      messageFormat: 'Module "%s"',
      messageParams: [moduleId],
      forcedKey: moduleId.startsWith("__") ? null : moduleId,
    });
    throw error;
  };

  const getTotalRequireCalls = () => requireCallCount;

  const getModuleTimeDetails = () => {
    const details = {};
    for (const moduleId in moduleTimeDetails) {
      if (Object.prototype.hasOwnProperty.call(moduleTimeDetails, moduleId)) {
        details[moduleId] = moduleTimeDetails[moduleId];
      }
    }
    return details;
  };

  const markModuleAsNonJSDep = (module) => {
    if (module.nonJSDeps) return;
    module.nonJSDeps = true;
    module.dependencies && module.dependencies.forEach(markModuleAsNonJSDep);
  };

  const isClientEnvironment = !!(
    globalScope !== null &&
    globalScope.document !== null &&
    "createElement" in globalScope.document
  );
  const isWorkerEnvironment = typeof WorkerGlobalScope === "function";
  const isBrowserLikeEnvironment = isClientEnvironment || isWorkerEnvironment;

  const USE_FBT_VIRTUAL_MODULES =
    ENV.use_fbt_virtual_modules === true && isBrowserLikeEnvironment;
  const FBT_VIRTUAL_MODULE_SUFFIX = "$fbt_virtual";

  const virtualModuleMap = {};
  let virtualModuleTimeout = null;
  const VIRTUAL_MODULE_TIMEOUT = 60000; // 60 seconds

  const trackVirtualModule = (moduleId) => {
    if (!(moduleId in moduleMap) && !(moduleId in virtualModuleMap)) {
      virtualModuleMap[moduleId] = getCurrentTimestamp();
    }
    if (!virtualModuleTimeout) {
      virtualModuleTimeout = setTimeout(
        getTimeSliceGuard(
          checkVirtualModuleTimeout,
          "_checkFbtVirtualModuleTimeout"
        ),
        VIRTUAL_MODULE_TIMEOUT
      );
    }
  };

  const checkVirtualModuleTimeout = () => {
    virtualModuleTimeout = null;
    const currentTime = getCurrentTimestamp();
    const timedOutModules = Object.keys(virtualModuleMap).filter((moduleId) => {
      const hasTimedOut =
        currentTime - virtualModuleMap[moduleId] > VIRTUAL_MODULE_TIMEOUT;
      if (hasTimedOut) {
        delete virtualModuleMap[moduleId];
      }
      return hasTimedOut;
    });

    if (Object.keys(virtualModuleMap).length > 0) {
      virtualModuleTimeout = setTimeout(
        getTimeSliceGuard(
          checkVirtualModuleTimeout,
          "_checkFbtVirtualModuleTimeout"
        ),
        VIRTUAL_MODULE_TIMEOUT
      );
    }

    if (timedOutModules.length > 0) {
      requireLazy("FBLogger", (FBLogger) => {
        FBLogger("binary_transparency", "vmod_timeout").warn(
          "The following virtual modules are taking over %sms to be defined: %s...",
          VIRTUAL_MODULE_TIMEOUT,
          timedOutModules.join(",").slice(0, 300)
        );
      });
    }
  };

  const addFbtVirtualModule = (moduleId, dependencies, flags) => {
    if (
      USE_FBT_VIRTUAL_MODULES &&
      flags !== null &&
      flags & FBT_VIRTUAL_MODULE_TYPE
    ) {
      const virtualModuleId = moduleId + FBT_VIRTUAL_MODULE_SUFFIX;
      dependencies.push(virtualModuleId);
      trackVirtualModule(virtualModuleId);
    }
  };

  const defineModule = (
    id,
    dependencies,
    factory,
    flags,
    context,
    refCount,
    metadata
    // eslint-disable-next-line max-params
  ) => {
    if (dependencies === undefined) {
      dependencies = [];
      factory = id;
      id = generateModuleId();
    } else if (factory === undefined) {
      factory = dependencies;
      if (objectToString.call(id) === "[object Array]") {
        dependencies = id;
        id = generateModuleId(dependencies.join(","));
      } else {
        dependencies = [];
      }
    }

    const cancellableDefinition = {
      cancel: cancelModuleDefinition.bind(this, id),
    };
    const module = getOrCreateModule(id);

    if (!dependencies && !factory && refCount) {
      module.refcount += refCount;
      return cancellableDefinition;
    }

    if (USE_FBT_VIRTUAL_MODULES) {
      if (id in virtualModuleMap) {
        delete virtualModuleMap[id];
      }
      if (Array.isArray(dependencies)) {
        addFbtVirtualModule(id, dependencies, flags);
      }
    }

    moduleTimeDetails[id] = {
      id,
      dependencies,
      meta: metadata,
      category: flags,
      defined: PROFILE_REQUIRE_FACTORIES ? getCurrentTimestamp() : null,
      factoryTime: null,
      factoryStart: null,
      factoryEnd: null,
      factoryRun: false,
    };

    if (module.dependencies && module.reload !== true) {
      id.indexOf(":") !== -1 ? asyncModuleCount++ : syncModuleCount++;
      return cancellableDefinition;
    }

    if (refCount) {
      module.refcount += refCount;
    }

    module.factory = factory;
    module.dependencies = dependencies.map(getOrCreateModule);
    module.context = context;
    module.special = flags;

    if (module.nonJSDeps || isAsyncModule(module)) {
      module.nonJSDeps = false;
      markModuleAsNonJSDep(module);
    }

    startExecution(module);

    if (pendingDefinitions.length > 0) {
      const defQueue = pendingDefinitions;
      pendingDefinitions = [];
      const scheduleWork = globalScope.ScheduleJSWork || identityFunction;
      scheduleWork(() => {
        if (REQUIRE_WHEN_READY_IN_ORDER) {
          for (let i = 0; i < defQueue.length; i++) {
            requireModule(defQueue[i].id);
          }
          defQueue.length = 0;
        } else {
          while (defQueue.length > 0) {
            requireModule(defQueue.pop().id);
          }
        }
      })();
    }

    return cancellableDefinition;
  };

  const getOrCreateModule = (id) => {
    let module = moduleMap[id];
    if (module) return module;
    module = new Module(id, 0);
    moduleMap[id] = module;
    return module;
  };

  class Module {
    constructor(id, refcount, exports = null) {
      this.id = id;
      this.refcount = refcount;
      this.exports = exports;
      this.defaultExport = exports || factoryMap;
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

  const cancelModuleDefinition = (moduleId) => {
    if (!moduleMap[moduleId]) return;
    const module = moduleMap[moduleId];
    moduleMap[moduleId] = null;
    if (module.dependencies) {
      for (let i = 0; i < module.dependencies.length; i++) {
        const dependency = module.dependencies[i];
        if (--dependency.refcount === 0) {
          cancelModuleDefinition(dependency.id);
        }
      }
    }
  };

  const requireLazy = (dependencies, factory, context) => {
    const id = `__requireLazy__x__${totalModuleId++}`;
    return defineModule(
      `__requireLazy__${id}`,
      dependencies,
      getTimeSliceGuard(factory, "requireLazy", { propagationType: 0 }),
      MODULE_FACTORY_TYPE | OPTIONAL_MODULE_TYPE,
      context,
      1
    );
  };

  const generateModuleId = (prefix) => {
    return `__mod__${prefix !== null ? prefix + "__" : ""}${totalModuleId++}`;
  };

  const tarjan = (modules, stack, module) => {
    if (module.tarjanGeneration !== tarjanGeneration) {
      module.tarjanGeneration = tarjanGeneration;
      module.tarjanLow = module.tarjanIndex = tarjanIndex++;
      module.tarjanOnStack = true;
      stack.push(module);

      if (module.dependencies !== null) {
        for (let i = module.depPosition; i < module.dependencies.length; i++) {
          const dependency = module.dependencies[i];
          if (dependency.tarjanGeneration !== tarjanGeneration) {
            tarjan(modules, stack, dependency);
            module.tarjanLow = Math.min(module.tarjanLow, dependency.tarjanLow);
          } else if (dependency.tarjanOnStack) {
            module.tarjanLow = Math.min(
              module.tarjanLow,
              dependency.tarjanIndex
            );
          }
        }
      }

      if (module.tarjanLow === module.tarjanIndex) {
        const scc = [];
        let node;
        do {
          node = stack.pop();
          node.tarjanOnStack = false;
          scc.push(node);
          if (
            module === stack[0] &&
            node !== module &&
            node.dependencies !== null
          ) {
            for (let i = node.depPosition; i < node.dependencies.length; i++) {
              const dependency = node.dependencies[i];
              if (
                !isModuleReady(dependency) &&
                modules.indexOf(dependency) === -1 &&
                stack.indexOf(dependency) === -1 &&
                scc.indexOf(dependency) === -1
              ) {
                modules.push(dependency);
              }
            }
          }
        } while (node !== module);
      }
    }
  };

  const replaceCycleLinkWithSCCDeps = (module) => {
    const dependencies = module.dependencies;
    if (!dependencies) {
      throw createModuleError(
        "Called _replaceCycleLinkWithSCCDeps on an undefined module"
      );
    }
    tarjanGeneration++;
    tarjan(dependencies, [], module);
    module.depPosition++;
    startExecution(module);
  };

  const handleCircularDependency = (module, dependency) => {
    let currentDep = dependency;
    while (true) {
      if (
        currentDep.dependencies &&
        currentDep.depPosition !== currentDep.dependencies.length
      ) {
        currentDep = currentDep.dependencies[currentDep.depPosition];
      } else {
        break;
      }
      if (currentDep === module) {
        replaceCycleLinkWithSCCDeps(module);
        return;
      }
    }
    module.nextDepWaitingNext = dependency.nextDepWaitingHead;
    dependency.nextDepWaitingHead = module;
  };

  const isModuleReady = (module) => {
    return (
      module.dependencies !== null &&
      module.depPosition >= module.dependencies.length
    );
  };

  const incrementDependencyPosition = (module) => {
    module.depPosition++;
    startExecution(module);
  };

  const processDependencyQueue = (module) => {
    let waitingDep = module.nextDepWaitingHead;
    module.nextDepWaitingHead = null;
    while (waitingDep !== null) {
      const currentDep = waitingDep;
      if (currentDep.nonJSDeps) {
        markModuleAsNonJSDep(module);
      }
      waitingDep = currentDep.nextDepWaitingNext;
      currentDep.nextDepWaitingNext = null;
      const isModuleDeleted = !moduleMap[currentDep.id];
      if (!isModuleDeleted) {
        incrementDependencyPosition(currentDep);
      }
    }
  };

  const isFactoryModule = (module) => {
    return module.special & MODULE_FACTORY_TYPE;
  };

  const isAsyncModule = (module) => {
    return module.special & OPTIONAL_MODULE_TYPE;
  };

  const startExecution = (module) => {
    while (
      module.dependencies !== null &&
      module.depPosition < module.dependencies.length
    ) {
      const dependency = module.dependencies[module.depPosition];
      const isDependencyReady = isModuleReady(dependency);
      if (!isDependencyReady && module !== dependency) {
        handleCircularDependency(module, dependency);
        return;
      }
      module.depPosition++;
    }
    if (isFactoryModule(module)) {
      pendingDefinitions.push(module);
    }
    if (module.nextDepWaitingHead !== null) {
      processDependencyQueue(module);
    }
  };

  const runRecursiveSideEffects = (module) => {
    if (module.sideEffectDependencyException !== null) {
      throw module.sideEffectDependencyException;
    }
    if (module.ranRecursiveSideEffects) return;
    module.ranRecursiveSideEffects = true;

    const dependencies = module.dependencies;
    if (dependencies) {
      for (let i = 0; i < dependencies.length; i++) {
        const dependency = dependencies[i];
        try {
          runRecursiveSideEffects(dependency);
        } catch (error) {
          module.sideEffectDependencyException = error;
          throw error;
        }
        if (dependency.special & POST_LOAD_HOOK_TYPE) {
          try {
            requireModule(dependency.id);
          } catch (error) {
            module.sideEffectDependencyException = error;
            throw error;
          }
        }
      }
    }
  };

  const defineSystemModule = (id, exports) => {
    moduleMap[id] = new Module(id, 0, exports);
    moduleTimeDetails[id] = {
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

  // Define system modules
  defineSystemModule("module", 0);
  defineSystemModule("exports", 0);
  defineSystemModule("define", defineModule);
  defineSystemModule("global", globalScope);
  defineSystemModule("require", requireModule);
  defineSystemModule("requireInterop", requireModule);
  defineSystemModule("importDefault", importDefault);
  defineSystemModule("importNamespace", importNamespace);
  defineSystemModule("requireDynamic", requireDynamic);
  defineSystemModule("requireLazy", requireLazy);
  defineSystemModule("requireWeak", requireWeak);
  defineSystemModule("ifRequired", ifRequired);
  defineSystemModule("ifRequireable", ifRequireable);

  // Standard dependencies
  const standardDependencies = [
    requireModule("global"),
    requireModule("require"),
    requireModule("requireDynamic"),
    requireModule("requireLazy"),
    requireModule("requireInterop"),
    null,
  ];

  const standardDependenciesPlusExports = [
    requireModule("global"),
    requireModule("require"),
    requireModule("importDefault"),
    requireModule("importNamespace"),
    requireModule("requireLazy"),
    requireModule("requireInterop"),
    null,
  ];

  // AMD compatibility
  defineModule.amd = {};

  // Expose API
  globalScope.define = defineModule;
  globalScope.require = requireModule;
  globalScope.requireInterop = requireModule;
  globalScope.importDefault = importDefault;
  globalScope.importNamespace = importNamespace;
  globalScope.requireDynamic = requireDynamic;
  globalScope.requireLazy = requireLazy;
  globalScope.__onBeforeModuleFactory = null;
  globalScope.__onAfterModuleFactory = null;

  function requireDynamic(moduleId, context) {
    throw new ReferenceError("requireDynamic is not defined");
  }

  function requireWeak(moduleId, callback) {
    ifRequired(
      moduleId,
      (module) => {
        callback(module);
      },
      () => {
        defineModule(
          `__requireWeak__${moduleId}__${totalModuleId++}`,
          [`__isRequired__${moduleId}`],
          getTimeSliceGuard(() => {
            return callback(getModuleExports(moduleMap[moduleId]));
          }, "requireWeak"),
          MODULE_FACTORY_TYPE,
          null,
          1
        );
      }
    );
  }

  function ifRequired(moduleId, whenDefined, whenNotDefined) {
    const module = moduleMap[moduleId];
    if (module && module.factoryFinished) {
      if (typeof whenDefined === "function")
        return whenDefined(getModuleExports(module));
    } else if (typeof whenNotDefined === "function") return whenNotDefined();
  }

  function ifRequireable(moduleId, whenRequireable, whenNotRequireable) {
    const module = moduleMap[moduleId];
    if (module && module.nonJSDeps && isModuleReady(module)) {
      if (typeof whenRequireable === "function")
        return whenRequireable(requireModule(moduleId));
    } else if (typeof whenNotRequireable === "function")
      return whenNotRequireable();
  }

  const debugUtils = {
    getDupCount: () => {
      return [syncModuleCount, asyncModuleCount];
    },
    getModules: () => {
      const modules = {};
      for (const moduleId in moduleMap) {
        if (
          moduleMap[moduleId] &&
          Object.prototype.hasOwnProperty.call(moduleMap, moduleId)
        ) {
          modules[moduleId] = moduleMap[moduleId];
        }
      }
      return modules;
    },
    modulesMap: moduleMap,
    debugUnresolvedDependencies: getUnresolvedDependencies,
  };

  const identityFunction = (arg) => arg;

  const getTimeSliceGuard = () => {
    const timeSliceGuard =
      globalScope.TimeSlice && globalScope.TimeSlice.guard
        ? globalScope.TimeSlice.guard
        : identityFunction;
    return function () {
      return timeSliceGuard.apply(undefined, arguments);
    };
  };

  defineSystemModule("__getTotalRequireCalls", getTotalRequireCalls);
  defineSystemModule("__getModuleTimeDetails", getModuleTimeDetails);
  defineSystemModule("__debug", debugUtils);

  // eslint-disable-next-line max-params
  globalScope.__d = function (moduleId, dependencies, factory, options) {
    getTimeSliceGuard()(
      () => {
        defineModule(
          moduleId,
          dependencies,
          factory,
          (options || ASYNC_MODULE_TYPE) | WEBPACK_ASYNC_MODULE_TYPE,
          null,
          null,
          null
        );
      },
      `define ${moduleId}`,
      { root: true }
    )();
  };

  // const isModuleInitialized = (moduleId, moduleInitEvent) => {
  //   return true;
  // };

  // Handle pre-loaded module definitions
  if (globalScope.__d_stub) {
    for (let i = 0; i < globalScope.__d_stub.length; i++) {
      globalScope.__d(globalScope.__d_stub[i]);
    }
    delete globalScope.__d_stub;
  }

  // Handle pre-loaded lazy requires
  if (globalScope.__rl_stub) {
    for (let i = 0; i < globalScope.__rl_stub.length; i++) {
      requireLazy(globalScope.__rl_stub[i]);
    }
    delete globalScope.__rl_stub;
  }

  // React Refresh compatibility (no-op in this context)
  const refreshReg = () => {};
  globalScope.$RefreshReg$ = refreshReg;
  globalScope.$RefreshSig$ = () => (arg) => arg;
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
