/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable no-restricted-globals */

import __debug from "__debug";
import BootloaderConfig from "BootloaderConfig";
import BootloaderDocumentInserter from "BootloaderDocumentInserter";
import BootloaderEndpoint from "BootloaderEndpoint";
import BootloaderEvents from "BootloaderEvents";
import BootloaderEventsManager from "BootloaderEventsManager";
import BootloaderPreloader from "BootloaderPreloader";
import BootloaderRetryTracker from "BootloaderRetryTracker";
import clearTimeout from "clearTimeout";
import ClientConsistency from "ClientConsistency";
import cr_696703 from "cr:696703";
import CSRBitMap from "CSRBitMap";
import CSRIndexUtil from "CSRIndexUtil";
import CSSLoader from "CSSLoader";
import err from "err";
import ErrorPubSub from "ErrorPubSub";
import ExecutionEnvironment from "ExecutionEnvironment";
import fb_error from "fb-error";
import FBLogger from "FBLogger";
import ifRequireable from "ifRequireable";
import ifRequired from "ifRequired";
import invariant from "invariant";
import JSResourceReferenceImpl from "JSResourceReferenceImpl";
import MakeHasteTranslations from "MakeHasteTranslations";
import NetworkStatus from "NetworkStatus";
import nullthrows from "nullthrows";
import performanceAbsoluteNow from "performanceAbsoluteNow";
import performanceNow from "performanceNow";
import promiseDone from "promiseDone";
import RequireDeferredReference from "RequireDeferredReference";
import ResourceHasher from "ResourceHasher";
import ResourceTimingsStore from "ResourceTimingsStore";
import setTimeoutAcrossTransitions from "setTimeoutAcrossTransitions";
import SiteData from "SiteData";
import TimeSlice from "TimeSlice";
import TrustedTypesBootloaderDataURIScriptURLPolicy from "TrustedTypesBootloaderDataURIScriptURLPolicy";
import TrustedTypesMetaURIScriptURLPolicy from "TrustedTypesMetaURIScriptURLPolicy";

const Bootloader = (() => {
  let perfNowFunc;
  const noop = () => {};
  const immediateComponents = new Set();
  let deferBootloads = !!BootloaderConfig.deferBootloads;

  if (deferBootloads && !window.__comet_ssr_is_server_env_DO_NOT_USE) {
    setTimeoutAcrossTransitions(() => {
      Bootloader.undeferBootloads(true);
    }, 15000);
  }

  let loadModuleQueue = [];
  const startTimeMap = new Map();
  const requestedResourcesMap = new Map();
  const loadedResourcesMap = new Map();
  const loadErrorMap = new Map();
  const componentMap = new Map();
  const resourceMap = new Map();
  const csrIndexMap = new Map();
  const revisionMap = new Map();
  const bootloadedComponentsMap = new Map();
  const bootloadQueueSet = new Set();
  let areResourcesMarkedImmediate = false;
  const processedIdsSet = new Set();
  let isDeferred = false;
  const bootloaderEventsManager = new BootloaderEventsManager();
  const bootloaderRetryTracker = new BootloaderRetryTracker({
    retries: BootloaderConfig.jsRetries,
    abortNum: BootloaderConfig.jsRetryAbortNum,
    abortTime: BootloaderConfig.jsRetryAbortTime,
    abortCallback: () => {
      FBLogger("bootloader", "js_retry_abort").info("JS retry abort");
    },
  });

  ErrorPubSub.unshiftListener((errorData) => {
    const loadingUrls = [];
    for (const [resourceHash] of requestedResourcesMap) {
      if (loadedResourcesMap.has(resourceHash)) continue;
      const resourceInfo = getResourceInfo(resourceHash);
      if (resourceInfo.type === "csr" || resourceInfo.type === "async")
        continue;
      loadingUrls.push(resourceInfo.src);
    }
    errorData.loadingUrls = loadingUrls;
  });

  const canLoadModules = (modules) => {
    if (deferBootloads || !isDeferred) return false;
    for (const module of modules) {
      const componentInfo = componentMap.get(module);
      if (!componentInfo) return false;
      const dependencies = [
        componentInfo.r,
        componentInfo.rdfds?.r || [],
        componentInfo.rds?.r || [],
      ];
      for (const depGroup of dependencies) {
        for (const dependency of depGroup) {
          if (!resourceMap.has(dependency)) return false;
        }
      }
    }
    return true;
  };

  const getComponentInfo = (component) => {
    const componentInfo = componentMap.get(component);
    if (!componentInfo) {
      throw fb_error.TAAL.blameToPreviousFile(
        err("Bootloader: %s is not in the component map", component)
      );
    }
    return componentInfo;
  };

  const handleComponentLoadComplete = (component) => {
    const componentInfo = getComponentInfo(component);
    if (componentInfo.be) {
      delete componentInfo.be;
      Bootloader.done(ResourceHasher.getAsyncHash(component));
    }
  };

  const getResourceInfo = (resourceHash) => {
    const resourceInfo = resourceMap.get(resourceHash);
    if (!resourceInfo) {
      throw fb_error.TAAL.blameToPreviousFile(
        err("No resource entry for hash: %s", resourceHash)
      );
    }
    return resourceInfo;
  };

  const registerAsyncResource = (component, isBlocking) => {
    const asyncHash = ResourceHasher.getAsyncHash(component);
    if (!resourceMap.has(asyncHash)) {
      resourceMap.set(asyncHash, {
        type: "async",
        module: component,
        blocking: !!isBlocking,
      });
    } else {
      const resourceInfo = getResourceInfo(asyncHash);
      if (resourceInfo.type !== "async") {
        invariant(0, 21557);
      }
      if (resourceInfo.blocking && !isBlocking) {
        resourceInfo.blocking = false;
      }
    }
    return asyncHash;
  };

  const isNotAlreadyLoaded = (component) => !isModuleLoaded(component);

  const isModuleLoaded = (component) => {
    if (!isNotAlreadyLoaded(component)) return false;
    const componentInfo = getComponentInfo(component);
    return !!componentInfo.be;
  };

  const loadScript = (component, resourceInfo, callback) => {
    const startTime = performanceAbsoluteNow();
    const scriptUrl = resourceInfo.src;
    const timingUID = ResourceTimingsStore.getUID("js", scriptUrl);
    ResourceTimingsStore.annotate("js", timingUID)
      .addStringAnnotation("name", component)
      .addStringAnnotation("source", scriptUrl);
    ResourceTimingsStore.measureRequestSent("js", timingUID);
    nullthrows(self.bl_worker_import_wrapper)(scriptUrl)
      .then(() => {
        const retryCount =
          bootloaderRetryTracker.getNumRetriesForSource(scriptUrl);
        if (retryCount > 0) {
          FBLogger("bootloader").info(
            "JS retry success [%s] at %s | time: %s | retries: %s",
            component,
            scriptUrl,
            performanceAbsoluteNow() - startTime,
            retryCount
          );
        }
        ResourceTimingsStore.measureResponseReceived("js", timingUID);
        callback();
      })
      .catch((error) => {
        ResourceTimingsStore.measureResponseReceived("js", timingUID);
        const errorTime = performanceAbsoluteNow();
        bootloaderRetryTracker.maybeScheduleRetry(
          scriptUrl,
          () => loadScript(component, resourceInfo, callback),
          () => {
            loadErrorMap.set(component, errorTime);
            FBLogger("bootloader")
              .catching(error)
              .warn(
                "JS loading error [%s] at %s | time: %s | retries: %s | concurrency: %s",
                component,
                scriptUrl,
                errorTime - startTime,
                bootloaderRetryTracker.getNumRetriesForSource(scriptUrl),
                requestedResourcesMap.size - loadedResourcesMap.size
              );
            NetworkStatus.reportError();
            callback();
          }
        );
      });
  };

  const insertScriptElement = (
    component,
    resourceInfo,
    callback,
    parentElement
    // eslint-disable-next-line max-params
  ) => {
    if (ExecutionEnvironment.isInWorker) {
      loadScript(component, resourceInfo, callback);
      return;
    }
    const scriptElement = document.createElement("script");
    scriptElement.src = resourceInfo.d
      ? TrustedTypesBootloaderDataURIScriptURLPolicy.createScriptURL(
          resourceInfo.src
        )
      : TrustedTypesMetaURIScriptURLPolicy.createScriptURL(resourceInfo.src);
    scriptElement.async = true;
    if (!resourceInfo.nc) scriptElement.crossOrigin = "anonymous";
    if (resourceInfo.m !== null)
      scriptElement.dataset.btmanifest = resourceInfo.m;
    if (resourceInfo.tsrc !== null)
      scriptElement.dataset.tsrc = resourceInfo.tsrc;
    scriptElement.dataset.bootloaderHashClient = component;
    attachScriptEvents(scriptElement, component, resourceInfo, callback);
    parentElement.appendChild(scriptElement);
  };

  const attachScriptEvents = (
    scriptElement,
    component,
    resourceInfo,
    callback
    // eslint-disable-next-line max-params
  ) => {
    const scriptUrl = scriptElement.src;
    const startTime = performanceAbsoluteNow();
    const timingUID = ResourceTimingsStore.getUID("js", scriptUrl);
    const guardedCallback = TimeSlice.getGuardedContinuation(
      "Bootloader script.onresponse"
    );
    ResourceTimingsStore.annotate("js", timingUID)
      .addStringAnnotation("name", component)
      .addStringAnnotation("source", scriptUrl);
    ifRequireable("TimeSliceInteraction", (interaction) => {
      interaction
        .informGlobally("bootloader._loadJS")
        .addStringAnnotation("source", scriptUrl)
        .addStringAnnotation("name", component);
    });
    ResourceTimingsStore.measureRequestSent("js", timingUID);
    scriptElement.onload = guardedCallback(() => {
      const retryCount =
        bootloaderRetryTracker.getNumRetriesForSource(scriptUrl);
      if (retryCount > 0) {
        FBLogger("bootloader").info(
          "JS retry success [%s] at %s | time: %s | retries: %s",
          component,
          scriptUrl,
          performanceAbsoluteNow() - startTime,
          retryCount
        );
      }
      ResourceTimingsStore.measureResponseReceived("js", timingUID);
      callback();
    });
    scriptElement.onerror = guardedCallback(() => {
      ResourceTimingsStore.measureResponseReceived("js", timingUID);
      const errorTime = performanceAbsoluteNow();
      bootloaderRetryTracker.maybeScheduleRetry(
        scriptUrl,
        () => {
          const parentElement = scriptElement.parentNode;
          if (parentElement) {
            parentElement.removeChild(scriptElement);
            insertScriptElement(
              component,
              resourceInfo,
              callback,
              parentElement
            );
          }
        },
        () => {
          loadErrorMap.set(component, errorTime);
          FBLogger("bootloader").warn(
            "JS loading error [%s] at %s | time: %s | retries: %s | concurrency: %s",
            component,
            scriptUrl,
            errorTime - startTime,
            bootloaderRetryTracker.getNumRetriesForSource(scriptUrl),
            requestedResourcesMap.size - loadedResourcesMap.size
          );
          NetworkStatus.reportError();
          callback();
        }
      );
    });
  };

  const cssTimeoutHandler = (component, resourceInfo, callback) => () => {
    FBLogger("bootloader").warn(
      "CSS timeout [%s] at %s | concurrency: %s",
      component,
      resourceInfo.src,
      requestedResourcesMap.size - loadedResourcesMap.size
    );
    loadErrorMap.set(component, performanceAbsoluteNow());
    NetworkStatus.reportError();
    callback();
  };

  const filterLongTailManifest = (
    csrIndexes,
    resourceUrl,
    processedIndexes,
    cutoffIndex
    // eslint-disable-next-line max-params
  ) => {
    if (
      !resourceUrl.includes("/rsrc.php") ||
      resourceUrl.includes("/intern/rsrc.php")
    )
      return [];
    const resourceName = (resourceUrl.match(/(.*\/)([^.]+)(\.)/) || [])[2];
    if (!resourceName) return [];
    return (
      resourceName
        .match(/.{1,11}/g)
        ?.filter(
          (part, index) =>
            !processedIndexes.has(index) && csrIndexes[index] > cutoffIndex
        ) || []
    );
  };

  const updateUrlWithSkippedIndexes = (url, skippedIndexes) => {
    const cleanUrl = url.replace(/\/y[a-zA-Z0-9_-]\//, "/");
    if (
      cleanUrl.includes("/intern/rsrc.php") ||
      cleanUrl.includes("/intern/rsrc-translations.php")
    ) {
      return cleanUrl.replace(
        /(!)(.+)(\.(?:css|js)(?:$|\?))/,
        // eslint-disable-next-line max-params
        (match, prefix, resourceName, suffix) =>
          `${prefix}${resourceName
            .split(",")
            .filter((_, index) => !skippedIndexes.has(index))
            .join(",")}${suffix}`
      );
    } else if (
      cleanUrl.includes("/rsrc.php") ||
      cleanUrl.includes("/rsrc-translations.php")
    ) {
      return cleanUrl.replace(
        /(.*\/)([^.]+)(\.)/,
        // eslint-disable-next-line max-params
        (match, basePath, resourceName, suffix) =>
          `${basePath}${resourceName
            .match(/.{1,11}/g)
            .filter((_, index) => !skippedIndexes.has(index))
            .join("")}${suffix}`
      );
    } else {
      return url;
    }
  };

  // eslint-disable-next-line complexity, max-params
  const loadResource = (component, resourceInfo, parentElement, phase) => {
    if (requestedResourcesMap.has(component)) return;
    requestedResourcesMap.set(component, performanceAbsoluteNow());
    let longTailManifests = [];
    if (
      (resourceInfo.type === "js" || resourceInfo.type === "css") &&
      resourceInfo.p !== null &&
      resourceInfo.d !== 1 &&
      BootloaderConfig.hypStep4
    ) {
      const csrIndexes = CSRIndexUtil.parseCSRIndexes(resourceInfo.p);
      const skippedIndexes = new Set();
      let maxIndex = 0;
      csrIndexes.forEach((csrIndex, index) => {
        if (
          csrIndex !== CSRIndexUtil.UNKNOWN_RESOURCE_INDEX &&
          csrIndexMap.get(csrIndex) !== component
        ) {
          skippedIndexes.add(index);
        } else if (csrIndex > maxIndex) {
          maxIndex = csrIndex;
        }
      });
      if (maxIndex > BootloaderConfig.btCutoffIndex) {
        const longTailManifest = filterLongTailManifest(
          csrIndexes,
          resourceInfo.src,
          skippedIndexes,
          BootloaderConfig.btCutoffIndex
        );
        if (BootloaderConfig.deferLongTailManifest) {
          longTailManifests.push(longTailManifest);
        } else {
          BootloaderEvents.notifyResourceInLongTailBTManifest(
            longTailManifest,
            phase
          );
        }
      }
      if (skippedIndexes.size === csrIndexes.length) return;
      if (skippedIndexes.size > 0) {
        resourceInfo.src = updateUrlWithSkippedIndexes(
          resourceInfo.src,
          skippedIndexes
        );
        if (
          resourceInfo.type === "js" &&
          resourceInfo.tsrc !== null &&
          resourceInfo.tsrc.trim() !== ""
        ) {
          resourceInfo.tsrc = updateUrlWithSkippedIndexes(
            nullthrows(resourceInfo.tsrc),
            skippedIndexes
          );
        }
      }
    }
    if (
      resourceInfo.type === "js" &&
      resourceInfo.tsrc !== null &&
      resourceInfo.tsrc.trim() !== ""
    ) {
      promiseDone(
        MakeHasteTranslations.genFetchAndProcessTranslations(
          component,
          nullthrows(resourceInfo.tsrc)
        )
      );
    }
    BootloaderPreloader.preloadResource(resourceInfo, parentElement);
    switch (resourceInfo.type) {
      case "js":
        insertScriptElement(
          component,
          resourceInfo,
          () => {
            Bootloader.done(component);
            for (const longTailManifest of longTailManifests) {
              BootloaderEvents.notifyResourceInLongTailBTManifest(
                longTailManifest,
                phase
              );
            }
          },
          parentElement
        );
        break;
      case "css":
        // eslint-disable-next-line no-case-declarations
        const onComplete = () => Bootloader.done(component);
        if (ExecutionEnvironment.isInWorker) {
          onComplete();
          break;
        }
        CSSLoader.loadStyleSheet(
          component,
          resourceInfo.src,
          nullthrows(parentElement),
          !resourceInfo.nc,
          onComplete,
          cssTimeoutHandler(component, resourceInfo, onComplete)
        );
        break;
      case "async":
        BootloaderEndpoint.load(
          resourceInfo.module,
          resourceInfo.blocking,
          component
        );
        break;
      default:
        invariant(false, `Unknown resource type: ${resourceInfo.type}`);
    }
  };

  const loadResources = (
    components,
    options,
    parentElement,
    phase,
    resourceMapSet
    // eslint-disable-next-line max-params
  ) => {
    const resourcesToLoad = new Map();
    const resourcesToLoadMapSet =
      resourceMapSet ?? BootloaderEvents.newResourceMapSet();
    const pendingResources = [];
    const blockingResources = [];
    const allResources = [];
    for (const [component, resourceInfo] of resolveCSRIndexes(components)) {
      let resourceTier;
      switch (resourceInfo.type) {
        case "css":
          resourceTier = resourceInfo.nonblocking ? "nonblocking" : "blocking";
          break;
        case "js":
          resourceTier = "default";
          break;
        case "async":
          resourceTier = resourceInfo.blocking ? "blocking" : "nonblocking";
          break;
        default:
          invariant(false, `Unknown resource type: ${resourceInfo.type}`);
      }
      resourcesToLoadMapSet[resourceTier].set(component, resourceInfo);
      const resourceDoneEvent = bootloaderEventsManager.rsrcDone(component);
      allResources.push(resourceDoneEvent);
      if (resourceTier !== "nonblocking") {
        blockingResources.push(resourceDoneEvent);
        if (resourceTier === "blocking")
          pendingResources.push(resourceDoneEvent);
      }
      if (!requestedResourcesMap.has(component)) {
        resourcesToLoad.set(component, resourceInfo);
      }
    }
    let executeBlocking;
    let executeAll;
    if (!cr_696703) {
      executeBlocking = executeAll = (fn) => fn();
    } else {
      executeAll = cr_696703.scheduleLoggingPriCallback;
      executeBlocking =
        cr_696703.getUserBlockingRunAtCurrentPriCallbackScheduler_DO_NOT_USE();
    }
    const { onBlocking, onAll, onLog } = options;
    if (onBlocking) {
      bootloaderEventsManager.registerCallback(
        () => executeBlocking(onBlocking),
        pendingResources
      );
    }
    if (onAll) {
      bootloaderEventsManager.registerCallback(
        () => executeBlocking(onAll),
        blockingResources
      );
    }
    if (onLog) {
      bootloaderEventsManager.registerCallback(
        () => executeAll(() => onLog(resourcesToLoadMapSet)),
        allResources
      );
    }
    for (const [component, resourceInfo] of resourcesToLoad) {
      loadResource(component, resourceInfo, parentElement, phase);
    }
  };

  const setResource = (resourceHash, resourceInfo, isPreload) => {
    resourceMap.set(resourceHash, resourceInfo);
    if (resourceInfo.type === "async" || resourceInfo.type === "csr") return;
    const csrIndexes = resourceInfo.p
      ? CSRIndexUtil.parseCSRIndexes(resourceInfo.p)
      : [];
    for (const csrIndex of csrIndexes) {
      if (csrIndex === CSRIndexUtil.UNKNOWN_RESOURCE_INDEX) continue;
      if (!csrIndexMap.has(csrIndex) || isPreload) {
        csrIndexMap.set(csrIndex, resourceHash);
      }
      if (BootloaderConfig.phdOn ? resourceInfo.c === 2 : resourceInfo.c) {
        CSRBitMap.add(csrIndex);
      }
    }
  };

  const getBootloadEventAndData = (caller, components) => {
    const bootloadEvent = bootloaderEventsManager.bootload(components);
    if (bootloadQueueSet.has(bootloadEvent)) return [bootloadEvent, null];
    bootloadQueueSet.add(bootloadEvent);
    const fetchStartTime = performanceAbsoluteNow();
    const bootloadData = {
      ref: caller,
      components,
      timesliceContext: TimeSlice.getContext(),
      startTime: startTimeMap.get(bootloadEvent) ?? fetchStartTime,
      fetchStartTime,
      callbackStart: 0,
      callbackEnd: 0,
      tierOne: BootloaderEvents.newResourceMapSet(),
      tierTwo: BootloaderEvents.newResourceMapSet(),
      tierThree: BootloaderEvents.newResourceMapSet(),
      beRequests: new Map(),
    };
    BootloaderEvents.notifyBootloadStart(bootloadData);
    return [bootloadEvent, bootloadData];
  };

  const isModuleRequired = (moduleName) =>
    ifRequired(
      null,
      moduleName,
      () => true,
      () => false
    );

  const isModuleLoadable = (moduleName) =>
    ifRequireable(
      null,
      moduleName,
      () => true,
      () => false
    );

  const processBootload = (
    component,
    bootloadEvent,
    parentElement,
    resourceMapSet
    // eslint-disable-next-line max-params
  ) => {
    if (!bootloadedComponentsMap.has(component)) {
      bootloadedComponentsMap.set(component, {
        firstBootloadStart: performanceAbsoluteNow(),
        logData: new Set(),
      });
    }
    if (resourceMapSet)
      nullthrows(bootloadedComponentsMap.get(component)).logData.add(
        resourceMapSet
      );
    const componentInfo = getComponentInfo(component);
    const {
      r: requiredModules,
      rdfds: deferredCSSModules,
      rds: deferredJSModules,
    } = componentInfo;
    const beRequestId = isNotAlreadyLoaded(component)
      ? registerAsyncResource(component, componentInfo.be)
      : null;
    if (beRequestId === null)
      bootloaderEventsManager.notify(bootloaderEventsManager.beDone(component));
    loadResources(
      beRequestId !== null
        ? [beRequestId].concat(requiredModules)
        : requiredModules,
      {
        onAll: () =>
          bootloaderEventsManager.notify(
            bootloaderEventsManager.tierOne(component)
          ),
        onLog: () =>
          bootloaderEventsManager.notify(
            bootloaderEventsManager.tierOneLog(component)
          ),
      },
      parentElement,
      component,
      resourceMapSet?.tierOne
    );
    const deferredCSSModulesMap = deferredCSSModules?.m || [];
    const processDeferredCSSModules = (parentElement) => {
      loadResources(
        deferredCSSModules?.r || [],
        {
          onBlocking: () =>
            RequireDeferredReference.unblock(deferredCSSModulesMap, "css"),
          onAll: () => {
            bootloaderEventsManager.registerCallback(() => {
              bootloaderEventsManager.notify(
                bootloaderEventsManager.tierTwoStart(component)
              );
              executeModules(
                deferredCSSModulesMap.map(
                  RequireDeferredReference.getRDModuleName_DO_NOT_USE
                ),
                () =>
                  bootloaderEventsManager.notify(
                    bootloaderEventsManager.tierTwo(component)
                  )
              );
            }, [bootloaderEventsManager.tierOne(component), bootloadEvent]);
          },
          onLog: () =>
            bootloaderEventsManager.notify(
              bootloaderEventsManager.tierTwoLog(component)
            ),
        },
        parentElement,
        component,
        resourceMapSet?.tierTwo
      );
    };
    if (
      BootloaderConfig.tieredLoadingFromTier !== null &&
      BootloaderConfig.tieredLoadingFromTier <= 2
    ) {
      bootloaderEventsManager.registerCallback(
        () =>
          BootloaderDocumentInserter.batchDOMInsert(processDeferredCSSModules),
        [bootloaderEventsManager.tierOne(component)]
      );
    } else {
      processDeferredCSSModules(parentElement);
    }
    const deferredJSModulesMap = deferredJSModules?.m || [];
    const processDeferredJSModules = (parentElement) => {
      loadResources(
        deferredJSModules?.r || [],
        {
          onBlocking: () =>
            RequireDeferredReference.unblock(deferredJSModulesMap, "css"),
          onAll: () => {
            bootloaderEventsManager.registerCallback(() => {
              bootloaderEventsManager.notify(
                bootloaderEventsManager.tierThreeStart(component)
              );
              executeModules(
                deferredJSModulesMap.map(
                  RequireDeferredReference.getRDModuleName_DO_NOT_USE
                ),
                () =>
                  bootloaderEventsManager.notify(
                    bootloaderEventsManager.tierThree(component)
                  )
              );
            }, [bootloaderEventsManager.tierTwo(component)]);
          },
          onLog: () =>
            bootloaderEventsManager.notify(
              bootloaderEventsManager.tierThreeLog(component)
            ),
        },
        parentElement,
        component,
        resourceMapSet?.tierThree
      );
    };
    if (
      BootloaderConfig.tieredLoadingFromTier !== null &&
      BootloaderConfig.tieredLoadingFromTier <= 3
    ) {
      bootloaderEventsManager.registerCallback(
        () =>
          BootloaderDocumentInserter.batchDOMInsert(processDeferredJSModules),
        [bootloaderEventsManager.tierTwo(component)]
      );
    } else {
      processDeferredJSModules(parentElement);
    }
  };

  const resolveCSRIndexes = (components) => {
    const resourceEntries = new Map();
    for (const component of components) {
      const resourceInfo = resourceMap.get(component);
      if (!resourceInfo) {
        FBLogger("bootloader").mustfix(
          "Unable to resolve resource %s.",
          component
        );
        continue;
      }
      let csrIndexes;
      if (resourceInfo.type === "csr") {
        csrIndexes = CSRIndexUtil.parseCSRIndexes(resourceInfo.src);
      } else if (resourceInfo.p) {
        csrIndexes = CSRIndexUtil.parseCSRIndexes(resourceInfo.p);
        if (csrIndexes.includes(CSRIndexUtil.UNKNOWN_RESOURCE_INDEX)) {
          resourceEntries.set(component, resourceInfo);
        }
        csrIndexes = csrIndexes.filter(
          (csrIndex) => csrIndex !== CSRIndexUtil.UNKNOWN_RESOURCE_INDEX
        );
      } else {
        resourceEntries.set(component, resourceInfo);
        continue;
      }
      for (const csrIndex of csrIndexes) {
        const resourceHash = csrIndexMap.get(csrIndex);
        if (resourceHash === null) {
          const componentData = JSON.stringify(
            components.map((component) => {
              const resourceInfo = getResourceInfo(component);
              const cleanSrc =
                resourceInfo.type === "js" || resourceInfo.type === "css"
                  ? resourceInfo.d
                    ? ""
                    : resourceInfo.src.split("?")[0]
                  : resourceInfo.src;
              return JSON.stringify({
                hash: component,
                rev: revisionMap.get(component),
                ...resourceInfo,
                src: cleanSrc,
                tsrc: null,
              });
            })
          );
          throw FBLogger("bootloader", "missing-index-map").mustfixThrow(
            `No hash for rsrcIndex ${csrIndex} (rev: ${SiteData.client_revision}, cohort: ${SiteData.pkg_cohort}). ${componentData}`
          );
        }
        const resourceHashInfo = getResourceInfo(resourceHash);
        invariant(resourceHashInfo.type === "csr", 20056, resourceHash);
        resourceEntries.set(resourceHash, resourceHashInfo);
      }
    }
    return resourceEntries.entries();
  };

  // eslint-disable-next-line complexity
  const processResourceElement = (element) => {
    const resourceHash = element.getAttribute("data-bootloader-hash");
    if (!resourceHash) return;
    const validResourceHash = ResourceHasher.getValidResourceHash(resourceHash);
    if (element.id) {
      if (processedIdsSet.has(element.id)) return;
      processedIdsSet.add(element.id);
    }
    const resourceData =
      element.tagName === "SCRIPT"
        ? { src: element.src, type: "js" }
        : { src: element.href, type: "css" };
    if (element.crossOrigin === null) resourceData.nc = 1;
    if (
      resourceData.type === "js" &&
      element.dataset.tsrc !== null &&
      element.dataset.tsrc.trim() !== ""
    ) {
      resourceData.tsrc = element.dataset.tsrc;
      promiseDone(
        MakeHasteTranslations.genFetchAndProcessTranslations(
          validResourceHash,
          resourceData.tsrc
        )
      );
    }
    if (
      resourceData.type === "css" &&
      element.getAttribute("data-nonblocking")
    ) {
      resourceData.nonblocking = 1;
    }
    const resourcePriority = element.getAttribute("data-c");
    if (resourcePriority === "1") resourceData.c = 1;
    else if (resourcePriority === "2") resourceData.c = 2;
    const csrIndexes = element.getAttribute("data-p");
    if (csrIndexes !== null) {
      resourceData.p = csrIndexes;
      const parsedIndexes = CSRIndexUtil.parseCSRIndexes(csrIndexes);
      const maxIndex = Math.max(...parsedIndexes);
      if (maxIndex > BootloaderConfig.btCutoffIndex) {
        BootloaderEvents.notifyResourceInLongTailBTManifest(
          filterLongTailManifest(
            parsedIndexes,
            resourceData.src,
            new Set(),
            BootloaderConfig.btCutoffIndex
          ),
          "pickupPageResource"
        );
      }
    }
    const btManifest = element.getAttribute("data-btmanifest");
    if (btManifest !== null) resourceData.m = btManifest;
    if (resourceMap.has(validResourceHash) && !BootloaderConfig.silentDups) {
      FBLogger("bootloader").warn(
        "Duplicate resource [%s]: %s",
        validResourceHash,
        resourceData.src
      );
    }
    setResource(validResourceHash, resourceData, true);
    requestedResourcesMap.set(validResourceHash, performanceAbsoluteNow());
    const doneCallback = () => Bootloader.done(validResourceHash);
    const isSyncJS =
      resourceData.type === "js"
        ? !element.getAttribute("async")
        : element.parentNode?.tagName === "HEAD";
    if (isSyncJS || (window._btldr && window._btldr[validResourceHash])) {
      doneCallback();
    } else if (resourceData.type === "js") {
      attachScriptEvents(
        element,
        validResourceHash,
        resourceData,
        doneCallback
      );
    } else {
      CSSLoader.setupEventListeners(
        validResourceHash,
        resourceData.src,
        BootloaderDocumentInserter.getDOMContainerNode(),
        doneCallback,
        cssTimeoutHandler(validResourceHash, resourceData, doneCallback),
        null
      );
    }
  };

  const processDocumentResources = () => {
    if (areResourcesMarkedImmediate) return;
    areResourcesMarkedImmediate = true;
    if (!ExecutionEnvironment.canUseDOM || ExecutionEnvironment.isInWorker)
      return;
    Array.from(document.getElementsByTagName("link")).forEach(
      processResourceElement
    );
    Array.from(document.getElementsByTagName("script")).forEach(
      processResourceElement
    );
  };

  const markDeferredComponents = () => {
    isDeferred = true;
    const deferredModules = loadModuleQueue;
    loadModuleQueue = [];
    deferredModules.forEach(
      ([components, callback, caller, deferredCallback]) => {
        deferredCallback(() => {
          Bootloader.loadModules(components, callback, caller);
        });
      }
    );
  };

  const Bootloader = {
    loadModules: (
      modules,
      callback = noop,
      caller = "loadModules: unknown caller"
    ) => {
      const allModules = modules;
      let timeoutId;
      let isRemoved = false;
      const safeCallback = (...args) => {
        clearTimeout(timeoutId);
        if (!isRemoved) callback(...args);
      };
      const deferredModule = {
        remove: () => {
          isRemoved = true;
        },
      };
      if (
        BootloaderConfig.fastPathForAlreadyRequired &&
        allModules.every(isModuleLoadable)
      ) {
        executeModules(allModules, (...args) => safeCallback(...args));
        return deferredModule;
      }
      if (!canLoadModules(allModules)) {
        const deferredExecution = TimeSlice.getGuardedContinuation(
          "Deferred: Bootloader.loadModules"
        );
        loadModuleQueue.push([
          allModules,
          safeCallback,
          caller,
          deferredExecution,
        ]);
        const bootloadEvent = bootloaderEventsManager.bootload(allModules);
        startTimeMap.set(
          bootloadEvent,
          startTimeMap.get(bootloadEvent) ?? performanceAbsoluteNow()
        );
        return deferredModule;
      }
      const [bootloadEvent, bootloadData] = getBootloadEventAndData(
        caller,
        allModules
      );
      bootloaderEventsManager.registerCallback(
        executeModules.bind(null, allModules, (...args) => {
          if (bootloadData) {
            bootloadData.callbackStart = performanceAbsoluteNow();
            safeCallback(...args);
            bootloadData.callbackEnd = performanceAbsoluteNow();
          }
          bootloaderEventsManager.notify(bootloadEvent);
        }),
        allModules.map((module) => bootloaderEventsManager.tierOne(module))
      );
      BootloaderDocumentInserter.batchDOMInsert((parentElement) => {
        for (const module of allModules) {
          processBootload(module, bootloadEvent, parentElement, bootloadData);
        }
      });
      if (bootloadData) {
        const allEventsSet = new Set([bootloadEvent]);
        for (const module of allModules) {
          allEventsSet.add(bootloaderEventsManager.beDone(module));
          allEventsSet.add(bootloaderEventsManager.tierThree(module));
          allEventsSet.add(bootloaderEventsManager.tierOneLog(module));
          allEventsSet.add(bootloaderEventsManager.tierTwoLog(module));
          allEventsSet.add(bootloaderEventsManager.tierThreeLog(module));
        }
        bootloaderEventsManager.registerCallback(
          () => BootloaderEvents.notifyBootload(bootloadData),
          Array.from(allEventsSet)
        );
        ifRequireable("TimeSliceInteraction", (interaction) => {
          interaction
            .informGlobally("Bootloader.loadResources")
            .addSetAnnotation(
              "requested_hashes",
              Array.from(
                BootloaderEvents.flattenResourceMapSet(
                  bootloadData.tierOne
                ).keys()
              )
            )
            .addSetAnnotation(
              "rdfd_requested_hashes",
              Array.from(
                BootloaderEvents.flattenResourceMapSet(
                  bootloadData.tierTwo
                ).keys()
              )
            )
            .addSetAnnotation(
              "rd_requested_hashes",
              Array.from(
                BootloaderEvents.flattenResourceMapSet(
                  bootloadData.tierThree
                ).keys()
              )
            )
            .addStringAnnotation("bootloader_reference", caller)
            .addSetAnnotation("requested_components", allModules);
        });
        timeoutId = setTimeoutAcrossTransitions(() => {
          BootloaderEvents.notifyBootloaderCallbackTimeout(bootloadData);
        }, BootloaderConfig.timeout);
      }
      return deferredModule;
    },

    loadResources: (resourceNames, options) => {
      processDocumentResources();
      BootloaderDocumentInserter.batchDOMInsert((parentElement) => {
        let loadOptions;
        // eslint-disable-next-line no-return-assign
        return loadResources(
          resourceNames.map((resourceName) =>
            ResourceHasher.getValidResourceHash(resourceName)
          ),
          (loadOptions = options) !== null ? loadOptions : Object.freeze({}),
          parentElement,
          "loadResources"
        );
      });
    },

    requestJSResource_UNSAFE_NEEDS_REVIEW_BY_SECURITY_AND_XFN: (url) => {
      const jsHash = ResourceHasher.createExternalJSHash();
      setResource(jsHash, { type: "js", src: url, nc: 1 }, false);
      Bootloader.loadResources([jsHash]);
    },

    done: (resourceHash) => {
      loadedResourcesMap.set(resourceHash, performanceAbsoluteNow());
      bootloaderEventsManager.notify(
        bootloaderEventsManager.rsrcDone(resourceHash)
      );
    },

    beDone: (component, resourceName, resourceHash) => {
      for (const logData of bootloadedComponentsMap.get(component)?.logData ??
        []) {
        logData.beRequests.set(resourceName, resourceHash);
      }
      bootloaderEventsManager.notify(bootloaderEventsManager.beDone(component));
    },

    handlePayload: (payload, bootloadData) => {
      for (const resourceTag of payload.rsrcTags ?? []) {
        processResourceElement(document.getElementById(resourceTag));
      }
      const clientRevision = payload.consistency?.rev ?? null;
      Bootloader.setResourceMap(
        payload.rsrcMap ?? {},
        payload.sotUpgrades,
        clientRevision,
        bootloadData
      );
      const csrUpgradeIndexes =
        payload.csrUpgrade !== null
          ? CSRIndexUtil.parseCSRIndexes(payload.csrUpgrade)
          : [];
      const missingCSRIndex = csrUpgradeIndexes.find(
        (csrIndex) => !csrIndexMap.has(csrIndex)
      );
      if (
        csrUpgradeIndexes.length &&
        clientRevision !== null &&
        clientRevision !== SiteData.client_revision
      ) {
        FBLogger("bootloader", "csr-mismatch").warn(
          `CSR upgrades included on mismatched rev
          ${clientRevision} (client rev: ${SiteData.client_revision}, cohort: ${SiteData.pkg_cohort}).`
        );
      } else if (missingCSRIndex !== null && areResourcesMarkedImmediate) {
        FBLogger("bootloader", "missing-csr-upgrade").warn(
          `CSR upgrades included unknown rsrcIndex ${missingCSRIndex} (client rev: ${SiteData.client_revision}, cohort: ${SiteData.pkg_cohort}).`
        );
      } else {
        csrUpgradeIndexes.forEach(CSRBitMap.add);
      }
      if (payload.compMap)
        Bootloader.enableBootload(payload.compMap, bootloadData);
    },

    enableBootload: (componentMap, bootloadData) => {
      // eslint-disable-next-line guard-for-in
      for (const component in componentMap) {
        if (bootloadData) bootloadData.comp++;
        if (!componentMap.hasOwnProperty(component)) continue;
        if (!componentMap.has(component)) {
          componentMap.set(component, componentMap[component]);
          if (immediateComponents.has(component)) {
            immediateComponents.delete(component);
            handleComponentLoadComplete(component);
          }
        } else if (bootloadData) {
          bootloadData.dup_comp++;
        }
      }
      processDocumentResources();
      if (!deferBootloads) markDeferredComponents();
    },

    undeferBootloads: (isTimeout = false) => {
      if (window.location.search.includes("&__deferBootloads=")) return;
      if (isTimeout && deferBootloads) {
        BootloaderEvents.notifyDeferTimeout({
          componentMapSize: componentMap.size,
          pending: loadModuleQueue.map(([components, , caller]) => ({
            components,
            ref: caller,
          })),
          time: perfNowFunc || performanceNow(),
        });
      }
      deferBootloads = false;
      if (componentMap.size) markDeferredComponents();
    },

    markComponentsAsImmediate: (components) => {
      for (const component of components) {
        if (componentMap.has(component)) {
          handleComponentLoadComplete(component);
        } else {
          immediateComponents.add(component);
        }
      }
    },

    // eslint-disable-next-line max-params
    setResourceMap: (resourceMap, upgrades, revision, bootloadData) => {
      let isClientConsistencyRequired = false;
      for (const resourceHash in resourceMap) {
        if (!resourceMap.hasOwnProperty(resourceHash)) continue;
        if (bootloadData) bootloadData.rsrc++;
        const validResourceHash =
          ResourceHasher.getValidResourceHash(resourceHash);
        if (revision !== null) revisionMap.set(validResourceHash, revision);
        const resourceInfo = resourceMap[validResourceHash];
        const existingResourceInfo = resourceMap.get(validResourceHash);
        if (!existingResourceInfo) {
          if (resourceInfo.type === "js") isClientConsistencyRequired = true;
          setResource(validResourceHash, resourceInfo, false);
        } else if (bootloadData) {
          bootloadData.dup_rsrc++;
          if (
            (existingResourceInfo.type === "js" &&
              resourceInfo.type === "js") ||
            (existingResourceInfo.type === "css" && resourceInfo.type === "css")
          ) {
            if (resourceInfo.d && !existingResourceInfo.d) {
              if (resourceInfo.type === "js")
                isClientConsistencyRequired = true;
              existingResourceInfo.src = resourceInfo.src;
              existingResourceInfo.d = 1;
            }
          }
        }
      }
      if (isClientConsistencyRequired && revision !== null)
        ClientConsistency.addAdditionalRevision(revision);
      if (upgrades) {
        for (const resourceHash of upgrades) {
          const existingResourceInfo = resourceMap.get(resourceHash);
          if (existingResourceInfo)
            setResource(resourceHash, existingResourceInfo, true);
        }
      }
    },

    getURLToHashMap: () => {
      const urlToHashMap = new Map();
      for (const [resourceHash, resourceInfo] of resourceMap) {
        if (resourceInfo.type === "async" || resourceInfo.type === "csr")
          continue;
        urlToHashMap.set(resourceInfo.src, resourceHash);
      }
      return urlToHashMap;
    },

    loadPredictedResourceMap: (predictedResourceMap, options, revision) => {
      Bootloader.setResourceMap(predictedResourceMap, null, revision);
      Bootloader.loadResources(Object.keys(predictedResourceMap), options);
    },

    getCSSResources: (components) => {
      const cssResources = [];
      for (const [resourceHash, resourceInfo] of resolveCSRIndexes(
        components
      )) {
        if (resourceInfo.type === "css") cssResources.push(resourceHash);
      }
      return cssResources;
    },

    getBootloadPendingComponents: () => {
      const pendingComponents = new Map();
      for (const [component] of bootloadedComponentsMap) {
        if (!isModuleRequired(component)) {
          pendingComponents.set(
            component,
            Bootloader.getComponentDebugState(component)
          );
        }
      }
      return pendingComponents;
    },

    getComponentDebugState: (component) => {
      const isEventTimeAvailable = (event) =>
        !!bootloaderEventsManager.getEventTime(event);
      return {
        phases: {
          tierOne: isEventTimeAvailable(
            bootloaderEventsManager.tierOne(component)
          ),
          tierTwo: isEventTimeAvailable(
            bootloaderEventsManager.tierTwo(component)
          ),
          tierThree: isEventTimeAvailable(
            bootloaderEventsManager.tierThree(component)
          ),
          beDone: isEventTimeAvailable(
            bootloaderEventsManager.beDone(component)
          ),
        },
        unresolvedDeps: __debug.debugUnresolvedDependencies([component]),
        nonJSDeps: __debug.modulesMap[component]?.nonJSDeps,
        hasError: __debug.modulesMap[component]?.hasError,
      };
    },

    getBootloadedComponents: () => {
      const bootloadedComponents = new Map();
      for (const [component, bootloadData] of bootloadedComponentsMap) {
        bootloadedComponents.set(component, bootloadData.firstBootloadStart);
      }
      return bootloadedComponents;
    },

    notifyManuallyLoadedResourcesInWorker: (resources, loadCallbacks) => {
      for (const resourceHash in resources) {
        if (!resources.hasOwnProperty(resourceHash)) continue;
        const validResourceHash =
          ResourceHasher.getValidResourceHash(resourceHash);
        const resourceInfo = resources[validResourceHash];
        if (resourceInfo.type === "js" || resourceInfo.type === "css") {
          if (
            resourceMap.has(validResourceHash) &&
            !BootloaderConfig.silentDups
          ) {
            FBLogger("bootloader").warn(
              "Duplicate manual resource [%s]: %s",
              validResourceHash,
              resourceInfo.src
            );
          }
          setResource(validResourceHash, resourceInfo, true);
          if (
            resourceInfo.type === "js" &&
            resourceInfo.tsrc !== null &&
            resourceInfo.tsrc.trim() !== ""
          ) {
            promiseDone(
              MakeHasteTranslations.genFetchAndProcessTranslations(
                validResourceHash,
                nullthrows(resourceInfo.tsrc)
              )
            );
          }
          requestedResourcesMap.set(
            validResourceHash,
            performanceAbsoluteNow()
          );
          const doneCallback = () => Bootloader.done(validResourceHash);
          const isJSResourceLoaded = loadCallbacks[validResourceHash];
          if (resourceInfo.type === "js" && isJSResourceLoaded) {
            promiseDone(isJSResourceLoaded, doneCallback, () =>
              loadScript(validResourceHash, resourceInfo, doneCallback)
            );
          } else {
            doneCallback();
          }
        }
      }
    },

    getResourceState: (resourceHash) => ({
      loadStart: requestedResourcesMap.get(resourceHash),
      loadEnd: loadedResourcesMap.get(resourceHash),
      loadError: loadErrorMap.get(resourceHash),
    }),

    getComponentTiming: (component) => ({
      tierTwoStart:
        bootloaderEventsManager.getEventTime(
          bootloaderEventsManager.tierTwoStart(component)
        ) ?? 0,
      tierTwoEnd:
        bootloaderEventsManager.getEventTime(
          bootloaderEventsManager.tierTwo(component)
        ) ?? 0,
      tierThreeStart:
        bootloaderEventsManager.getEventTime(
          bootloaderEventsManager.tierThreeStart(component)
        ) ?? 0,
      tierThreeEnd:
        bootloaderEventsManager.getEventTime(
          bootloaderEventsManager.tierThree(component)
        ) ?? 0,
    }),

    getLoadedResourceCount: () => loadedResourcesMap.size,

    getErrorCount: () => loadErrorMap.size,

    forceFlush: () => BootloaderEndpoint.forceFlush(),

    __debug: {
      componentMap,
      requested: requestedResourcesMap,
      resources: resourceMap,
      riMap: csrIndexMap,
      retries: bootloaderRetryTracker.getAllRetryAttempts_FOR_DEBUG_ONLY(),
      errors: loadErrorMap,
      loaded: loadedResourcesMap,
      bootloaded: bootloadedComponentsMap,
      queuedToMarkAsImmediate: immediateComponents,
      _resolveCSRs: resolveCSRIndexes,
      revMap: revisionMap,
      _getQueuedLoadModules: () => loadModuleQueue,
      _dequeueLoadModules: (index) => {
        const [modules, callback, caller, deferredCallback] =
          loadModuleQueue.splice(index, 1)[0];
        const previousDeferBootloads = deferBootloads;
        const previousIsDeferred = isDeferred;
        deferBootloads = false;
        isDeferred = true;
        deferredCallback(() =>
          Bootloader.loadModules(modules, callback, caller)
        );
        deferBootloads = previousDeferBootloads;
        isDeferred = previousIsDeferred;
      },
    },
  };

  JSResourceReferenceImpl.setBootloader(Bootloader);
  return Bootloader;
})();

export default Bootloader;
