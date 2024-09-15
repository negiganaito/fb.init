/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";

import Promise from "../../helpers/Promise";
import { setDisplayName } from "../../helpers/PromiseAnnotate";
import suspendOrThrowIfUsedInSSR from "../../helpers/suspendOrThrowIfUsedInSSR";

const componentCache = {};
const loadImmediatelyCache = {};
const componentMap = new Map();

function setComponentInMap(key, component) {
  componentMap.set(key, component);
}

function getComponentFromMap(key) {
  return componentMap.get(key);
}

function deferredLoadComponentBase(module, transform) {
  const cachedComponent = getComponentFromMap(module);
  if (cachedComponent) return cachedComponent;

  const moduleId = module.getModuleId();

  function loadImmediately() {
    let promise = loadImmediatelyCache[moduleId];
    if (!promise) {
      promise = loadImmediatelyCache[moduleId] = new Promise((resolve) => {
        module.loadImmediately((loadedModule) => {
          delete loadImmediatelyCache[moduleId];
          componentCache[moduleId] = transform(loadedModule);
          resolve();
        });
      });
    }
    return promise;
  }

  function loadWhenReady() {
    let promise = componentCache[moduleId];
    if (!promise) {
      promise = componentCache[moduleId] = new Promise((resolve) => {
        module.onReady((loadedModule) => {
          componentCache[moduleId] = transform(loadedModule);
          delete componentCache[moduleId];
          resolve();
        });
      });
    }
    return promise;
  }

  function DeferredLoadComponent(props, ref) {
    const { loadImmediately: shouldLoadImmediately, ...restProps } = props;

    if (!componentCache[moduleId]) {
      const immediatelyAvailableModule = module.getModuleIfRequireable();
      if (immediatelyAvailableModule !== null) {
        componentCache[moduleId] = transform(immediatelyAvailableModule);
      } else {
        if (
          !ExecutionEnvironment.isInBrowser &&
          !module.isAvailableInSSR_DO_NOT_USE()
        ) {
          suspendOrThrowIfUsedInSSR(
            "Loading bootloaded and T3 components are disabled during SSR"
          );
        }

        const promise =
          shouldLoadImmediately === true ? loadImmediately() : loadWhenReady();
        setDisplayName(promise, DeferredLoadComponent.displayName);
        throw promise;
      }
    }

    const Component = componentCache[moduleId];
    return <Component {...restProps} ref={ref} />;
  }

  DeferredLoadComponent.displayName = `deferredLoadComponent(${moduleId})`;
  const ForwardedComponent = forwardRef(DeferredLoadComponent);
  setComponentInMap(module, ForwardedComponent);

  return ForwardedComponent;
}

export default deferredLoadComponentBase;
