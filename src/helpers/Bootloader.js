/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable complexity */
/* eslint-disable max-params */

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
import CSRBitMap from "CSRBitMap";
import CSRIndexUtil from "CSRIndexUtil";
import CSSLoader from "CSSLoader";
import err from "err";
import ErrorPubSub from "ErrorPubSub";
import ExecutionEnvironment from "ExecutionEnvironment";
import fbError from "fb-error";
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

let isDeferBootloads = !!BootloaderConfig.deferBootloads;

if (isDeferBootloads && !ExecutionEnvironment.isInWorker) {
  setTimeoutAcrossTransitions(() => {
    Bootloader.undeferBootloads(true);
  }, 15000);
}

let pendingLoadModules = [];
const bootloadStartTimes = new Map();
const resourceLoadStartTimes = new Map();
const resourceLoadEndTimes = new Map();
const resourceLoadErrors = new Map();
const componentDescriptors = new Map();
const resourceDescriptors = new Map();
const resourceIndexToHashMap = new Map();
const resourceHashToRevisionMap = new Map();
const bootloadedComponents = new Map();
let isEventListenerSetup = false;

const componentsToMarkAsImmediate = new Set();
const loadedResourceIds = new Set();
let isProcessingLoadModuleQueue = false;

const bootloaderEvents = new BootloaderEventsManager();

const bootloaderRetryTracker = new BootloaderRetryTracker({
  retries: BootloaderConfig.jsRetries,
  abortNum: BootloaderConfig.jsRetryAbortNum,
  abortTime: BootloaderConfig.jsRetryAbortTime,
  abortCallback: () => {
    FBLogger("bootloader", "js_retry_abort").info("JS retry abort");
  },
});

ErrorPubSub.unshiftListener((errorEvent) => {
  const loadingUrls = [];

  for (const [resourceId] of resourceLoadStartTimes) {
    if (resourceLoadEndTimes.has(resourceId)) continue;

    const resourceInfo = getResourceDescriptor(resourceId);
    if (resourceInfo.type === "csr" || resourceInfo.type === "async") continue;

    loadingUrls.push(resourceInfo.src);
  }

  errorEvent.loadingUrls = loadingUrls;
});

function areAllResourcesReady(resourceIds) {
  if (isDeferBootloads || !isProcessingLoadModuleQueue) return false;
  for (let i = 0; i < resourceIds.length; i++) {
    const resource = componentDescriptors.get(resourceIds[i]);
    if (!resource) return false;
    const rMap = [resource.r, resource.rdfds?.r || [], resource.rds?.r || []];
    for (let j = 0; j < rMap.length; j++) {
      for (const hash of rMap[j]) {
        if (!resourceLoadEndTimes.has(hash)) return false;
      }
    }
  }
  return true;
}

function getComponentDescriptor(componentName) {
  const componentDescriptor = componentDescriptors.get(componentName);
  if (!componentDescriptor) {
    throw fbError.TAAL.blameToPreviousFile(
      err(`Bootloader: ${componentName} is not in the component map`)
    );
  }
  return componentDescriptor;
}

function markComponentAsImmediate(componentName) {
  const componentDescriptor = getComponentDescriptor(componentName);
  if (componentDescriptor.be) {
    delete componentDescriptor.be;
    Bootloader.done(ResourceHasher.getAsyncHash(componentName));
  }
}

function getResourceDescriptor(hash) {
  const resource = resourceDescriptors.get(hash);
  if (!resource) {
    throw fbError.TAAL.blameToPreviousFile(
      err("No resource entry for hash: %s", hash)
    );
  }
  return resource;
}

function registerAsyncResource(moduleName, isBlocking = false) {
  const resourceHash = ResourceHasher.getAsyncHash(moduleName);
  if (!resourceDescriptors.has(resourceHash)) {
    resourceDescriptors.set(resourceHash, {
      type: "async",
      module: moduleName,
      blocking: isBlocking,
    });
  } else {
    const resourceDescriptor = getResourceDescriptor(resourceHash);
    resourceDescriptor.type === "async"; // h(0,21557)
    if (resourceDescriptor.blocking && !isBlocking) {
      resourceDescriptor.blocking = false;
    }
  }
  return resourceHash;
}

function isAsyncComponent(componentName) {
  return !isRequireableComponent(componentName);
}

function hasAsyncBootloadData(componentName) {
  if (!isAsyncComponent(componentName)) return false;
  const componentDescriptor = getComponentDescriptor(componentName);
  return !!componentDescriptor.be;
}

async function loadJSResource(resourceName, resource, onComplete) {
  const startTime = performanceAbsoluteNow();
  const { src } = resource;
  const resourceUID = ResourceTimingsStore.getUID("js", src);

  ResourceTimingsStore.annotate("js", resourceUID)
    .addStringAnnotation("name", resourceName)
    .addStringAnnotation("source", src);

  ResourceTimingsStore.measureRequestSent("js", resourceUID);

  try {
    await nullthrows(self.bl_worker_import_wrapper)(src);
    const retries = bootloaderRetryTracker.getNumRetriesForSource(src);
    if (retries > 0) {
      FBLogger("bootloader").info(
        "JS retry success [%s] at %s | time: %s | retries: %s",
        resourceName,
        src,
        performanceAbsoluteNow() - startTime,
        retries
      );
    }

    ResourceTimingsStore.measureResponseReceived("js", resourceUID);
    onComplete();
  } catch (error) {
    ResourceTimingsStore.measureResponseReceived("js", resourceUID);

    const errorTime = performanceAbsoluteNow();

    bootloaderRetryTracker.maybeScheduleRetry(
      src,
      () => loadJSResource(resourceName, resource, onComplete),
      () => {
        resourceLoadErrors.set(resourceName, errorTime);
        FBLogger("bootloader")
          .catching(error)
          .warn(
            "JS loading error [%s] at %s | time: %s | retries: %s | concurrency: %s",
            resourceName,
            src,
            errorTime - startTime,
            bootloaderRetryTracker.getNumRetriesForSource(src),
            resourceLoadStartTimes.size - resourceLoadEndTimes.size
          );
        NetworkStatus.reportError();
        onComplete();
      }
    );
  }
}

function loadJSResourceInBrowser(
  resourceName,
  resource,
  onComplete,
  parentNode
) {
  if (ExecutionEnvironment.isInWorker) {
    loadJSResource(resourceName, resource, onComplete);
    return;
  }

  const safeParentNode = nullthrows(parentNode);
  const scriptElement = document.createElement("script");

  if (resource.d) {
    scriptElement.src =
      TrustedTypesBootloaderDataURIScriptURLPolicy.createScriptURL(
        resource.src
      );
  } else {
    scriptElement.src = TrustedTypesMetaURIScriptURLPolicy.createScriptURL(
      resource.src
    );
  }

  scriptElement.async = true;

  if (!resource.nc) {
    scriptElement.crossOrigin = "anonymous";
  }

  if (resource.m !== null) {
    scriptElement.dataset.btmanifest = resource.m;
  }

  if (resource.tsrc !== null) {
    scriptElement.dataset.tsrc = resource.tsrc;
  }

  scriptElement.dataset.bootloaderHashClient = resourceName;

  setupScriptLoadHandler(scriptElement, resourceName, resource, onComplete);
  safeParentNode.appendChild(scriptElement);
}

function setupScriptLoadHandler(
  scriptElement,
  resourceName,
  resource,
  onComplete
) {
  const { src } = resource;
  const startTime = performanceAbsoluteNow();
  const guardedContinuation = TimeSlice.getGuardedContinuation(
    "Bootloader script.onresponse"
  );
  const resourceUID = ResourceTimingsStore.getUID("js", src);

  ResourceTimingsStore.annotate("js", resourceUID)
    .addStringAnnotation("name", resourceName)
    .addStringAnnotation("source", src);

  ifRequireable("TimeSliceInteraction", (TimeSliceInteraction) => {
    TimeSliceInteraction.informGlobally("bootloader._loadJS")
      .addStringAnnotation("source", src)
      .addStringAnnotation("name", resourceName);
  });

  ResourceTimingsStore.measureRequestSent("js", resourceUID);

  scriptElement.onload = guardedContinuation.bind(undefined, () => {
    const retries = bootloaderRetryTracker.getNumRetriesForSource(src);
    if (retries > 0) {
      FBLogger("bootloader").info(
        "JS retry success [%s] at %s | time: %s | retries: %s",
        resourceName,
        src,
        performanceAbsoluteNow() - startTime,
        retries
      );
    }
    ResourceTimingsStore.measureResponseReceived("js", resourceUID);
    onComplete();
  });

  scriptElement.onerror = guardedContinuation.bind(undefined, () => {
    ResourceTimingsStore.measureResponseReceived("js", resourceUID);
    const errorTime = performanceAbsoluteNow();

    bootloaderRetryTracker.maybeScheduleRetry(
      src,
      () => {
        const parentNode = scriptElement.parentNode;
        if (parentNode) {
          parentNode.removeChild(scriptElement);
          loadJSResourceInBrowser(
            resourceName,
            resource,
            onComplete,
            parentNode
          );
        }
      },
      () => {
        resourceLoadErrors.set(resourceName, errorTime);
        FBLogger("bootloader").warn(
          "JS loading error [%s] at %s | time: %s | retries: %s | concurrency: %s",
          resourceName,
          src,
          errorTime - startTime,
          bootloaderRetryTracker.getNumRetriesForSource(src),
          resourceLoadStartTimes.size - resourceLoadEndTimes.size
        );
        NetworkStatus.reportError();
        onComplete();
      }
    );
  });
}

function createCSSLoadTimeoutHandler(resourceName, resource, onComplete) {
  return () => {
    FBLogger("bootloader").warn(
      "CSS timeout [%s] at %s | concurrency: %s",
      resourceName,
      resource.src,
      resourceLoadStartTimes.size - resourceLoadEndTimes.size
    );

    resourceLoadErrors.set(resourceName, performanceAbsoluteNow());
    NetworkStatus.reportError();
    onComplete();
  };
}

function getResourcesInBTManifest(indexes, src, excludedIndexes, cutoffIndex) {
  if (!src.includes("/rsrc.php") || src.includes("/intern/rsrc.php")) return [];

  const match = src.match(/(.*\/)([^.]+)(\.)/);
  if (!match) return [];

  const [, , resourcePart] = match;
  if (!resourcePart) return [];

  const chunks = resourcePart.match(/.{1,11}/g);
  if (!chunks) return [];

  return chunks.filter(
    (chunk, index) =>
      !excludedIndexes.has(index) && indexes[index] > cutoffIndex
  );
}

function filterResourceSrc(src, excludedIndexes) {
  const cleanedSrc = src.replace(/\/y[a-zA-Z0-9_-]\//, "/");

  if (
    cleanedSrc.includes("/intern/rsrc.php") ||
    cleanedSrc.includes("/intern/rsrc-translations.php")
  ) {
    return cleanedSrc.replace(
      /(!)(.+)(\.(?:css|js)(?:$|\?))/,
      (_, prefix, resources, suffix) =>
        prefix +
        resources
          .split(",")
          .filter((_, index) => !excludedIndexes.has(index))
          .join(",") +
        suffix
    );
  } else if (
    cleanedSrc.includes("/rsrc.php") ||
    cleanedSrc.includes("/rsrc-translations.php")
  ) {
    return cleanedSrc.replace(
      /(.*\/)([^.]+)(\.)/,
      (_, prefix, resources, suffix) =>
        prefix +
        resources
          .match(/.{1,11}/g)
          .filter((_, index) => !excludedIndexes.has(index))
          .join("") +
        suffix
    );
  }

  return src;
}

function loadResource(resourceName, resource, insertPoint, sourceName) {
  if (resourceLoadStartTimes.has(resourceName)) return;
  resourceLoadStartTimes.set(resourceName, performanceAbsoluteNow());

  const longTailResources = [];

  if (
    (resource.type === "js" || resource.type === "css") &&
    resource.p !== null &&
    resource.d !== 1 &&
    BootloaderConfig.hypStep4
  ) {
    const indexes = CSRIndexUtil.parseCSRIndexes(resource.p);
    const excludedIndexes = new Set();
    let maxIndex = 0;

    indexes.forEach((index, position) => {
      if (
        index !== CSRIndexUtil.UNKNOWN_RESOURCE_INDEX &&
        resourceIndexToHashMap.get(index) !== resourceName
      ) {
        excludedIndexes.add(position);
      } else if (index > maxIndex) {
        maxIndex = index;
      }
    });

    if (maxIndex > BootloaderConfig.btCutoffIndex) {
      const btResources = getResourcesInBTManifest(
        indexes,
        resource.src,
        excludedIndexes,
        BootloaderConfig.btCutoffIndex
      );
      if (BootloaderConfig.deferLongTailManifest) {
        longTailResources.push(btResources);
      } else {
        BootloaderEvents.notifyResourceInLongTailBTManifest(
          btResources,
          sourceName
        );
      }
    }

    if (excludedIndexes.size === indexes.length) return;
    if (excludedIndexes.size > 0) {
      resource.src = filterResourceSrc(resource.src, excludedIndexes);
      if (
        resource.type === "js" &&
        resource.tsrc !== null &&
        resource.tsrc.trim() !== ""
      ) {
        resource.tsrc = filterResourceSrc(
          nullthrows(resource.tsrc),
          excludedIndexes
        );
      }
    }
  }

  if (
    resource.type === "js" &&
    resource.tsrc !== null &&
    resource.tsrc.trim() !== ""
  ) {
    promiseDone(
      MakeHasteTranslations.genFetchAndProcessTranslations(
        resourceName,
        nullthrows(resource.tsrc)
      )
    );
  }

  BootloaderPreloader.preloadResource(resource, insertPoint);

  switch (resource.type) {
    case "js":
      loadJSResourceInBrowser(
        resourceName,
        resource,
        () => {
          Bootloader.done(resourceName);
          longTailResources.forEach((resources) =>
            BootloaderEvents.notifyResourceInLongTailBTManifest(
              resources,
              sourceName
            )
          );
        },
        insertPoint
      );
      break;
    case "css":
      if (ExecutionEnvironment.isInWorker) {
        Bootloader.done(resourceName);
      } else {
        CSSLoader.loadStyleSheet(
          resourceName,
          resource.src,
          nullthrows(insertPoint),
          !resource.nc,
          () => Bootloader.done(resourceName),
          createCSSLoadTimeoutHandler(resourceName, resource, () =>
            Bootloader.done(resourceName)
          )
        );
      }
      break;
    case "async":
      BootloaderEndpoint.load(resource.module, resource.blocking, resourceName);
      break;
    default:
      throw new Error(`Unexpected resource type: ${resource.type}`);
  }
}

function getComponentResources(componentNames) {
  const resourceMap = new Map();

  for (const componentName of componentNames) {
    const resource = this.resourceDescriptors.get(componentName);
    if (!resource) {
      FBLogger("bootloader").mustfix(
        "Unable to resolve resource %s.",
        componentName
      );
      continue;
    }

    let indexes;
    if (resource.type === "csr") {
      indexes = this.CSRIndexUtil.parseCSRIndexes(resource.src);
    } else if (resource.p) {
      indexes = this.CSRIndexUtil.parseCSRIndexes(resource.p);
      if (indexes.includes(this.CSRIndexUtil.UNKNOWN_RESOURCE_INDEX)) {
        resourceMap.set(componentName, resource);
      }
      indexes = indexes.filter(
        (index) => index !== this.CSRIndexUtil.UNKNOWN_RESOURCE_INDEX
      );
    } else {
      resourceMap.set(componentName, resource);
      continue;
    }

    for (const index of indexes) {
      const resourceHash = this.resourceIndexToHashMap.get(index);
      if (resourceHash == null) {
        const debugInfo = JSON.stringify(
          componentNames.map((name) => {
            const descriptor = this.getResourceDescriptor(name);
            const src =
              descriptor.type === "js" || descriptor.type === "css"
                ? descriptor.d
                  ? ""
                  : descriptor.src.split("?")[0]
                : descriptor.src;
            return JSON.stringify({
              hash: name,
              rev: this.resourceHashToRevisionMap.get(name),
              ...descriptor,
              src,
              tsrc: null,
            });
          })
        );

        throw FBLogger("bootloader", "missing-index-map").mustfixThrow(
          `No hash for rsrcIndex ${index} (rev: ${this.SiteData.client_revision}, cohort: ${this.SiteData.pkg_cohort}). ${debugInfo}`
        );
      }

      const indexedResource = this.getResourceDescriptor(resourceHash);
      if (indexedResource.type === "csr") {
        throw new Error(
          `Unexpected CSR type for resource hash ${resourceHash}`
        );
      }
      resourceMap.set(resourceHash, indexedResource);
    }
  }

  return resourceMap.entries();
}

function processResources(
  resourceList,
  callbacks,
  environment,
  options,
  resourceMap
) {
  let newResources = new Map();
  let resourceEventMap =
    resourceMap !== null ? resourceMap : BootloaderEvents.newResourceMapSet();
  let blockingResources = [];
  let nonBlockingResources = [];
  let allResources = [];

  const componentResources = getComponentResources(resourceList);

  for (let [resourceName, resourceDetails] of componentResources) {
    let resourceType;

    switch (resourceDetails.type) {
      case "css":
        resourceType = resourceDetails.nonblocking ? "nonblocking" : "blocking";
        break;
      case "js":
        resourceType = "default";
        break;
      case "async":
        resourceType = resourceDetails.blocking ? "blocking" : "nonblocking";
        break;
      default:
        throw new Error(`Unknown resource type: ${resourceDetails.type}`);
    }

    resourceEventMap[resourceType].set(resourceName, resourceDetails);
    let resourceDone = BootloaderEventsManager.rsrcDone(resourceName);
    allResources.push(resourceDone);
    if (resourceType !== "nonblocking") {
      blockingResources.push(resourceDone);
      if (resourceType === "blocking") blockingResources.push(resourceDone);
    }

    if (!resourceLoadStartTimes.has(resourceName))
      newResources.set(resourceName, resourceDetails);
  }

  let scheduleCallback = (cb) => {
    cb();
  };
  let blockingCallback = callbacks.onBlocking;
  let allCallback = callbacks.onAll;
  let logCallback = callbacks.onLog;

  if (blockingCallback) {
    bootloaderEvents.registerCallback(
      () => scheduleCallback(blockingCallback),
      blockingResources
    );
  }
  if (allCallback) {
    bootloaderEvents.registerCallback(
      () => scheduleCallback(allCallback),
      nonBlockingResources
    );
  }
  if (logCallback) {
    bootloaderEvents.registerCallback(
      () => scheduleCallback(() => logCallback(resourceEventMap)),
      allResources
    );
  }

  for (let [resourceName, resourceDetails] of newResources) {
    loadResource(resourceName, resourceDetails, environment, options);
  }
}

function registerResource(resourceName, resource, forceUpdate = false) {
  resourceDescriptors.set(resourceName, resource);

  if (resource.type === "async" || resource.type === "csr") return;

  const indexes = resource.p ? CSRIndexUtil.parseCSRIndexes(resource.p) : [];

  for (const index of indexes) {
    if (index === CSRIndexUtil.UNKNOWN_RESOURCE_INDEX) continue;

    if (!resourceIndexToHashMap.has(index) || forceUpdate) {
      resourceIndexToHashMap.set(index, resourceName);
    }

    const shouldAddToBitMap = BootloaderConfig.phdOn
      ? resource.c === 2
      : resource.c;
    if (shouldAddToBitMap) {
      CSRBitMap.add(index);
    }
  }
}

function startBootload(referenceSource, componentNames) {
  const bootloadEventId = bootloaderEvents.bootload(componentNames);

  if (bootloadedEvents.has(bootloadEventId)) {
    return [bootloadEventId, null];
  }

  bootloadedEvents.add(bootloadEventId);

  const currentTime = performanceAbsoluteNow();
  const startTime = bootloadStartTimes.get(bootloadEventId) ?? currentTime;

  const bootloadMetadata = {
    ref: referenceSource,
    components: componentNames,
    timesliceContext: TimeSlice.getContext(),
    startTime,
    fetchStartTime: currentTime,
    callbackStart: 0,
    callbackEnd: 0,
    tierOne: BootloaderEvents.newResourceMapSet(),
    tierTwo: BootloaderEvents.newResourceMapSet(),
    tierThree: BootloaderEvents.newResourceMapSet(),
    beRequests: new Map(),
  };

  BootloaderEvents.notifyBootloadStart(bootloadMetadata);

  return [bootloadEventId, bootloadMetadata];
}

const isModuleRequired = (moduleName) =>
  ifRequired(
    null,
    moduleName,
    () => true,
    () => false
  );

const isModuleRequireable = (moduleName) =>
  ifRequireable(
    null,
    moduleName,
    () => true,
    () => false
  );

function loadComponent(componentName, bootloadEventId, insertPoint, metadata) {
  if (!componentLoadData.has(componentName)) {
    componentLoadData.set(componentName, {
      firstBootloadStart: performanceAbsoluteNow(),
      logData: new Set(),
    });
  }

  if (metadata) {
    nullthrows(componentLoadData.get(componentName)).logData.add(metadata);
  }

  const {
    r: resources,
    rdfds,
    rds,
    be,
  } = getComponentDescriptor(componentName);

  const asyncResource = isAsyncComponent(componentName)
    ? registerAsyncResource(componentName, be)
    : null;

  if (asyncResource === null) {
    bootloaderEvents.notify(bootloaderEvents.beDone(componentName));
  }

  const allResources = asyncResource
    ? [asyncResource, ...resources]
    : resources;

  loadResourceBatch(
    allResources,
    {
      onAll: () =>
        bootloaderEvents.notify(bootloaderEvents.tierOne(componentName)),
      onLog: () =>
        bootloaderEvents.notify(bootloaderEvents.tierOneLog(componentName)),
    },
    insertPoint,
    componentName,
    metadata?.tierOne
  );

  const rdfdModules = rdfds?.m || [];

  const loadRDFDS = (insertPoint) => {
    loadResourceBatch(
      rdfds?.r || [],
      {
        onBlocking: () => RequireDeferredReference.unblock(rdfdModules, "css"),
        onAll: () =>
          bootloaderEvents.registerCallback(() => {
            bootloaderEvents.notify(
              bootloaderEvents.tierTwoStart(componentName)
            );
            require(rdfdModules.map(
              RequireDeferredReference.getRDModuleName_DO_NOT_USE
            ), () =>
              bootloaderEvents.notify(bootloaderEvents.tierTwo(componentName)));
          }, [bootloaderEvents.tierOne(componentName), bootloadEventId]),
        onLog: () =>
          bootloaderEvents.notify(bootloaderEvents.tierTwoLog(componentName)),
      },
      insertPoint,
      componentName,
      metadata?.tierTwo
    );
  };

  if (
    BootloaderConfig.tieredLoadingFromTier !== null &&
    BootloaderConfig.tieredLoadingFromTier <= 2
  ) {
    bootloaderEvents.registerCallback(
      () => BootloaderDocumentInserter.batchDOMInsert(loadRDFDS),
      [bootloaderEvents.tierOne(componentName)]
    );
  } else {
    loadRDFDS(insertPoint);
  }

  const rdModules = rds?.m || [];

  const loadRDS = (insertPoint) => {
    loadResourceBatch(
      rds?.r || [],
      {
        onBlocking: () => RequireDeferredReference.unblock(rdModules, "css"),
        onAll: () =>
          bootloaderEvents.registerCallback(() => {
            bootloaderEvents.notify(
              bootloaderEvents.tierThreeStart(componentName)
            );
            require(rdModules.map(
              RequireDeferredReference.getRDModuleName_DO_NOT_USE
            ), () =>
              bootloaderEvents.notify(
                bootloaderEvents.tierThree(componentName)
              ));
          }, [bootloaderEvents.tierTwo(componentName)]),
        onLog: () =>
          bootloaderEvents.notify(bootloaderEvents.tierThreeLog(componentName)),
      },
      insertPoint,
      componentName,
      metadata?.tierThree
    );
  };

  if (
    BootloaderConfig.tieredLoadingFromTier !== null &&
    BootloaderConfig.tieredLoadingFromTier <= 3
  ) {
    bootloaderEvents.registerCallback(
      () => BootloaderDocumentInserter.batchDOMInsert(loadRDS),
      [bootloaderEvents.tierTwo(componentName)]
    );
  } else {
    loadRDS(insertPoint);
  }
}

function setupResourceFromDOM(element) {
  const resourceHash = element.getAttribute("data-bootloader-hash");
  if (resourceHash === null) return;

  const validResourceHash = ResourceHasher.getValidResourceHash(resourceHash);

  if (element.id) {
    if (loadedResourceIds.has(element.id)) return;
    loadedResourceIds.add(element.id);
  }

  const resource =
    element.tagName === "SCRIPT"
      ? { src: element.src, type: "js" }
      : { src: element.href, type: "css" };

  if (element.crossOrigin === null) {
    resource.nc = 1;
  }

  if (
    resource.type === "js" &&
    element.dataset.tsrc !== null &&
    element.dataset.tsrc.trim() !== ""
  ) {
    resource.tsrc = element.dataset.tsrc;
    promiseDone(
      MakeHasteTranslations.genFetchAndProcessTranslations(
        validResourceHash,
        resource.tsrc
      )
    );
  }

  if (resource.type === "css" && element.getAttribute("data-nonblocking")) {
    resource.nonblocking = 1;
  }

  const integrityValue = element.getAttribute("data-c");
  if (integrityValue === "1") {
    resource.c = 1;
  } else if (integrityValue === "2") {
    resource.c = 2;
  }

  const csrIndexes = element.getAttribute("data-p");
  if (csrIndexes !== null) {
    resource.p = csrIndexes;
    const indexes = CSRIndexUtil.parseCSRIndexes(csrIndexes);
    const maxIndex = Math.max(...indexes);
    if (maxIndex > BootloaderConfig.btCutoffIndex) {
      BootloaderEvents.notifyResourceInLongTailBTManifest(
        getResourcesInBTManifest(
          indexes,
          resource.src,
          new Set(),
          BootloaderConfig.btCutoffIndex
        ),
        "pickupPageResource"
      );
    }
  }

  const btManifest = element.getAttribute("data-btmanifest");
  if (btManifest !== null) {
    resource.m = btManifest;
  }

  if (
    resourceDescriptors.has(validResourceHash) &&
    !BootloaderConfig.silentDups
  ) {
    FBLogger("bootloader").warn(
      "Duplicate resource [%s]: %s",
      validResourceHash,
      resource.src
    );
  }

  registerResource(validResourceHash, resource, true);
  resourceLoadStartTimes.set(validResourceHash, performanceAbsoluteNow());

  const onLoad = () => Bootloader.done(validResourceHash);

  const isAsync =
    resource.type === "js"
      ? !element.getAttribute("async")
      : element.parentNode?.tagName === "HEAD";

  if (isAsync || (window._btldr && window._btldr[validResourceHash])) {
    onLoad();
  } else if (resource.type === "js") {
    setupScriptLoadHandler(element, validResourceHash, resource, onLoad);
  } else {
    CSSLoader.setupEventListeners(
      validResourceHash,
      resource.src,
      BootloaderDocumentInserter.getDOMContainerNode(),
      onLoad,
      createCSSLoadTimeoutHandler(validResourceHash, resource, onLoad),
      null
    );
  }
}

function setupInitialResources() {
  if (isEventListenerSetup) return;
  isEventListenerSetup = true;

  if (!ExecutionEnvironment.canUseDOM || ExecutionEnvironment.isInWorker)
    return;

  Array.from(document.getElementsByTagName("link")).forEach(
    setupResourceFromDOM
  );
  Array.from(document.getElementsByTagName("script")).forEach(
    setupResourceFromDOM
  );
}

function processLoadModuleQueue() {
  isProcessingLoadModuleQueue = true;
  const queueToProcess = pendingLoadModules;
  pendingLoadModules = [];

  queueToProcess.forEach(
    ([moduleNames, callback, errorHandler, continuation]) => {
      continuation(() => {
        Bootloader.loadModules(moduleNames, callback, errorHandler);
      });
    }
  );
}

function isRequireableComponent(componentName) {
  return ifRequireable(
    componentName,
    () => true,
    () => false
  );
}

const Bootloader = {
  loadModules(
    moduleNames,
    callback = () => {},
    errorHandler = "loadModules: unknown caller"
  ) {
    let timeoutHandle;
    let isCanceled = false;

    const wrappedCallback = (...args) => {
      clearTimeout(timeoutHandle);
      if (!isCanceled) callback(...args);
    };

    const removeHandler = {
      remove: () => {
        isCanceled = true;
      },
    };

    if (
      BootloaderConfig.fastPathForAlreadyRequired &&
      moduleNames.every(isModuleRequireable)
    ) {
      require(moduleNames, wrappedCallback);
      return removeHandler;
    }

    if (!this.isResourceSetReady(moduleNames)) {
      const continuation = TimeSlice.getGuardedContinuation(
        "Deferred: Bootloader.loadModules"
      );
      this.pendingLoadModules.push([
        moduleNames,
        wrappedCallback,
        errorHandler,
        continuation,
      ]);
      const bootloadEventId = bootloaderEvents.bootload(moduleNames);
      this.requested.set(
        bootloadEventId,
        this.requested.get(bootloadEventId) ?? performanceAbsoluteNow()
      );
      return removeHandler;
    }

    const [bootloadEventId, metadata] = this.startBootload(
      errorHandler,
      moduleNames
    );

    BootloaderEvents.registerCallback(
      require.bind(null, moduleNames, (...args) => {
        if (metadata) metadata.callbackStart = performanceAbsoluteNow();
        wrappedCallback(...args);
        if (metadata) metadata.callbackEnd = performanceAbsoluteNow();
        BootloaderEvents.notify(bootloadEventId);
      }),
      moduleNames.map((moduleName) => BootloaderEvents.tierOne(moduleName))
    );

    BootloaderDocumentInserter.batchDOMInsert((insertPoint) => {
      for (const moduleName of moduleNames) {
        loadComponent(moduleName, bootloadEventId, insertPoint, metadata);
      }
    });

    if (metadata) {
      const eventIds = new Set([
        bootloadEventId,
        ...moduleNames.flatMap((moduleName) => [
          BootloaderEvents.beDone(moduleName),
          BootloaderEvents.tierThree(moduleName),
          BootloaderEvents.tierOneLog(moduleName),
          BootloaderEvents.tierTwoLog(moduleName),
          BootloaderEvents.tierThreeLog(moduleName),
        ]),
      ]);

      BootloaderEvents.registerCallback(
        () => BootloaderEvents.notifyBootload(metadata),
        Array.from(eventIds)
      );

      ifRequireable("TimeSliceInteraction", (TimeSliceInteraction) => {
        TimeSliceInteraction.informGlobally("Bootloader.loadResources")
          .addSetAnnotation(
            "requested_hashes",
            Array.from(
              BootloaderEvents.flattenResourceMapSet(metadata.tierOne).keys()
            )
          )
          .addSetAnnotation(
            "rdfd_requested_hashes",
            Array.from(
              BootloaderEvents.flattenResourceMapSet(metadata.tierTwo).keys()
            )
          )
          .addSetAnnotation(
            "rd_requested_hashes",
            Array.from(
              BootloaderEvents.flattenResourceMapSet(metadata.tierThree).keys()
            )
          )
          .addStringAnnotation("bootloader_reference", errorHandler)
          .addSetAnnotation("requested_components", moduleNames);
      });

      timeoutHandle = setTimeoutAcrossTransitions(
        () => BootloaderEvents.notifyBootloaderCallbackTimeout(metadata),
        BootloaderConfig.timeout
      );
    }

    return removeHandler;
  },
  loadResources(resources, options = {}) {
    setupInitialResources();
    BootloaderDocumentInserter.batchDOMInsert((insertPoint) => {
      return loadResourceBatch(
        resources.map((resource) =>
          ResourceHasher.getValidResourceHash(resource)
        ),
        options,
        insertPoint,
        "loadResources"
      );
    });
  },
  requestJSResource_UNSAFE_NEEDS_REVIEW_BY_SECURITY_AND_XFN(src) {
    const resourceHash = ResourceHasher.createExternalJSHash();
    registerResource(
      resourceHash,
      { type: "js", src, noCrossOrigin: true },
      false
    );
    Bootloader.loadResources([resourceHash]);
  },
  done(resourceHash) {
    resourceLoadEndTimes.set(resourceHash, performanceAbsoluteNow());
    BootloaderEvents.notify(BootloaderEvents.resourceDoneLoading(resourceHash));
  },
  beDone(componentName, requestId, requestStart) {
    const componentData = bootloadedComponents.get(componentName);
    if (componentData?.logData) {
      for (const logData of componentData.logData) {
        logData.beRequests.set(requestId, requestStart);
      }
    }
    BootloaderEvents.notify(BootloaderEvents.beDone(componentName));
  },
  handlePayload(payload, referenceProvider) {
    for (const resourceTag of payload.rsrcTags ?? []) {
      setupInitialResources(document.getElementById(resourceTag));
    }

    const clientRevision = payload.consistency?.rev ?? null;
    Bootloader.setResourceMap(
      payload.rsrcMap ?? {},
      payload.sotUpgrades,
      clientRevision,
      referenceProvider
    );

    const csrUpgrades =
      payload.csrUpgrade !== null
        ? CSRIndexUtil.parseCSRIndexes(payload.csrUpgrade)
        : [];
    const unknownUpgradeIndex = csrUpgrades.find(
      (index) => !resourceIndexToHashMap.has(index)
    );

    if (
      csrUpgrades.length &&
      clientRevision !== null &&
      clientRevision !== SiteData.client_revision
    ) {
      FBLogger("bootloader", "csr-mismatch").warn(
        "CSR upgrades included on mismatched rev %s (client rev: %s, cohort: %s).",
        clientRevision,
        SiteData.client_revision,
        SiteData.pkg_cohort
      );
    } else if (unknownUpgradeIndex !== null && isEventListenerSetup) {
      FBLogger("bootloader", "missing-csr-upgrade").warn(
        "CSR upgrades included unknown rsrcIndex %d (client rev: %s, cohort: %s).",
        unknownUpgradeIndex,
        SiteData.client_revision,
        SiteData.pkg_cohort
      );
    } else {
      csrUpgrades.forEach(CSRBitMap.add);
    }

    if (payload.compMap) {
      Bootloader.enableBootload(payload.compMap, referenceProvider);
    }
  },
  enableBootload(componentMap, referenceProvider) {
    // eslint-disable-next-line guard-for-in
    for (const componentName in componentMap) {
      if (referenceProvider) {
        referenceProvider.comp++;
      }
      if (!componentDescriptors.has(componentName)) {
        componentDescriptors.set(componentName, componentMap[componentName]);
        if (componentsToMarkAsImmediate.has(componentName)) {
          componentsToMarkAsImmediate.delete(componentName);
          markComponentAsImmediate(componentName);
        }
      } else if (referenceProvider) {
        referenceProvider.dup_comp++;
      }
    }
    setupInitialResources();
    if (!isDeferBootloads) {
      processLoadModuleQueue();
    }
  },
  undeferBootloads(isTimeout = false) {
    if (window.location.search.indexOf("&__deferBootloads=") !== -1) {
      return;
    }
    if (isTimeout && isDeferBootloads) {
      BootloaderEvents.notifyDeferTimeout({
        componentMapSize: componentDescriptors.size,
        pending: pendingLoadModules.map(([components, , ref]) => ({
          components,
          ref,
        })),
        time: performanceNow(),
      });
    }
    isDeferBootloads = false;
    if (componentDescriptors.size) {
      processLoadModuleQueue();
    }
  },
  markComponentsAsImmediate(components) {
    for (let i = 0; i < components.length; i++) {
      const component = components[i];
      if (componentDescriptors.has(component)) {
        markComponentAsImmediate(component);
      } else {
        componentsToMarkAsImmediate.add(component);
      }
    }
  },
  // eslint-disable-next-line max-params
  setResourceMap(resourceMap, sotUpgrades, clientRevision, referenceProvider) {
    let hasNewJSResource = false;
    // eslint-disable-next-line guard-for-in
    for (const resourceHash in resourceMap) {
      if (referenceProvider) {
        referenceProvider.rsrc++;
      }
      const validResourceHash =
        ResourceHasher.getValidResourceHash(resourceHash);
      if (clientRevision !== null) {
        resourceHashToRevisionMap.set(validResourceHash, clientRevision);
      }
      const resource = resourceMap[resourceHash];
      const existingResource = resourceDescriptors.get(validResourceHash);
      if (!existingResource) {
        if (resource.type === "js") {
          hasNewJSResource = true;
        }
        registerResource(validResourceHash, resource, false);
      } else {
        if (referenceProvider) {
          referenceProvider.dup_rsrc++;
        }
        if (
          (existingResource.type === "js" && resource.type === "js") ||
          (existingResource.type === "css" && resource.type === "css")
        ) {
          if (resource.d && !existingResource.d) {
            if (resource.type === "js") {
              hasNewJSResource = true;
            }
            existingResource.src = resource.src;
            existingResource.d = 1;
          }
        }
      }
    }
    if (hasNewJSResource && clientRevision !== null) {
      ClientConsistency.addAdditionalRevision(clientRevision);
    }
    if (sotUpgrades) {
      for (const upgrade of sotUpgrades) {
        const resource = resourceDescriptors.get(upgrade);
        if (resource) {
          registerResource(upgrade, resource, true);
        }
      }
    }
  },
  getURLToHashMap() {
    const urlToHashMap = new Map();
    for (const [resourceHash, resource] of resourceDescriptors) {
      if (resource.type === "async" || resource.type === "csr") {
        continue;
      }
      urlToHashMap.set(resource.src, resourceHash);
    }
    return urlToHashMap;
  },
  loadPredictedResourceMap(predictedMap, referenceProvider, clientRevision) {
    Bootloader.setResourceMap(predictedMap, null, clientRevision);
    Bootloader.loadResources(Object.keys(predictedMap), referenceProvider);
  },
  getCSSResources(componentNames) {
    const cssResources = [];
    const componentResources = getComponentResources(componentNames);

    for (const [resourceHash, resource] of componentResources) {
      if (resource.type === "css") {
        cssResources.push(resourceHash);
      }
    }
    return cssResources;
  },
  getBootloadPendingComponents() {
    const pendingComponents = new Map();

    for (const [componentName] of this.bootloaded) {
      if (!this.isModuleRequired(componentName)) {
        pendingComponents.set(
          componentName,
          this.getComponentDebugState(componentName)
        );
      }
    }

    return pendingComponents;
  },
  getComponentDebugState(componentName) {
    const hasEventOccurred = (event) => !!bootloaderEvents.getEventTime(event);

    return {
      phases: {
        tierOne: hasEventOccurred(bootloaderEvents.tierOne(componentName)),
        tierTwo: hasEventOccurred(bootloaderEvents.tierTwo(componentName)),
        tierThree: hasEventOccurred(bootloaderEvents.tierThree(componentName)),
        beDone: hasEventOccurred(bootloaderEvents.beDone(componentName)),
      },
      unresolvedDeps: __debug.debugUnresolvedDependencies([componentName]),
      nonJSDeps: __debug.modulesMap[componentName]?.nonJSDeps,
      hasError: __debug.modulesMap[componentName]?.hasError,
    };
  },
  getBootloadedComponents() {
    const bootloadedComponents = new Map();

    for (const [componentName, componentData] of this.bootloaded) {
      bootloadedComponents.set(componentName, componentData.firstBootloadStart);
    }

    return bootloadedComponents;
  },
  notifyManuallyLoadedResourcesInWorker(resourceMap, fetchPromises) {
    const processResource = (resourceHash) => {
      const validResourceHash =
        ResourceHasher.getValidResourceHash(resourceHash);
      const resource = resourceMap[validResourceHash];
      if (resource.type === "js" || resource.type === "css") {
        if (
          resourceDescriptors.has(validResourceHash) &&
          !BootloaderConfig.silentDups
        ) {
          FBLogger("bootloader").warn(
            "Duplicate manual resource [%s]: %s",
            validResourceHash,
            resource.src
          );
        }
        registerResource(validResourceHash, resource, true);
        if (
          resource.type === "js" &&
          resource.tsrc !== null &&
          resource.tsrc.trim() !== ""
        ) {
          promiseDone(
            MakeHasteTranslations.genFetchAndProcessTranslations(
              validResourceHash,
              nullthrows(resource.tsrc)
            )
          );
        }
        resourceLoadStartTimes.set(validResourceHash, performanceAbsoluteNow());
        const onLoad = () => Bootloader.done(validResourceHash);
        const fetchPromise = fetchPromises[validResourceHash];
        if (resource.type === "js" && fetchPromise) {
          promiseDone(fetchPromise, onLoad, () => {
            loadJSResource(validResourceHash, resource, onLoad);
          });
        } else {
          onLoad();
        }
      }
    };
    // eslint-disable-next-line guard-for-in
    for (const resourceHash in resourceMap) {
      processResource(resourceHash);
    }
  },
  getResourceState(resourceHash) {
    return {
      loadStart: resourceLoadStartTimes.get(resourceHash),
      loadEnd: resourceLoadEndTimes.get(resourceHash),
      loadError: resourceLoadErrors.get(resourceHash),
    };
  },
  getComponentTiming(componentName) {
    return {
      tierTwoStart:
        BootloaderEvents.getEventTime(
          BootloaderEvents.tierTwoStart(componentName)
        ) ?? 0,
      tierTwoEnd:
        BootloaderEvents.getEventTime(
          BootloaderEvents.tierTwo(componentName)
        ) ?? 0,
      tierThreeStart:
        BootloaderEvents.getEventTime(
          BootloaderEvents.tierThreeStart(componentName)
        ) ?? 0,
      tierThreeEnd:
        BootloaderEvents.getEventTime(
          BootloaderEvents.tierThree(componentName)
        ) ?? 0,
    };
  },
  getLoadedResourceCount() {
    return resourceLoadEndTimes.size;
  },
  getErrorCount() {
    return resourceLoadErrors.size;
  },
  forceFlush() {
    BootloaderEndpoint.forceFlush();
  },

  __debug: {
    componentMap: componentDescriptors,
    requested: resourceLoadStartTimes,
    resources: resourceDescriptors,
    riMap: resourceIndexToHashMap,
    retries: BootloaderRetryTracker.getAllRetryAttempts_FOR_DEBUG_ONLY(),
    errors: resourceLoadErrors,
    loaded: resourceLoadEndTimes,
    bootloaded: bootloadedComponents,
    queuedToMarkAsImmediate: componentsToMarkAsImmediate,
    _resolveCSRs: getComponentResources,
    revMap: resourceHashToRevisionMap,
    _getQueuedLoadModules: () => pendingLoadModules,
    _dequeueLoadModules: (idx) => {
      const dequeued = pendingLoadModules.splice(idx, 1);
      if (!dequeued.length) return;
      const [moduleNames, callback, errorHandler, continuation] = dequeued[0];
      const prevIsDeferBootloads = isDeferBootloads;
      const prevIsProcessingLoadModuleQueue = isProcessingLoadModuleQueue;
      isDeferBootloads = false;
      isProcessingLoadModuleQueue = true;
      continuation(() => {
        Bootloader.loadModules(Bootloader, [
          moduleNames,
          callback,
          errorHandler,
        ]);
      });
      isDeferBootloads = prevIsDeferBootloads;
      isProcessingLoadModuleQueue = prevIsProcessingLoadModuleQueue;
    },
  },
};

JSResourceReferenceImpl.setBootloader(Bootloader);

export default Bootloader;
