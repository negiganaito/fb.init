/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import isEmpty from "fbjs/lib/isEmpty";

// const { expandoKey, useExpando } = DataStoreConfig;

const DataStoreConfig = {
  expandoKey: "__FB_STORE",
  useExpando: true,
};

const gkx_25572 = true;
const weakMapEnabled = gkx_25572 && window.WeakMap;
const weakMap = weakMapEnabled ? new window.WeakMap() : null;
const store = {};
let idCounter = 1;

function getKey(key) {
  if (typeof key === "string") {
    return `str_${key}`;
  } else {
    let token;
    if ((token = key.__FB_TOKEN) === null) {
      token = key.__FB_TOKEN = [idCounter++];
    }
    return `elem_${token[0]}`;
  }
}

function getDataStoreContainer(key) {
  if (weakMapEnabled && typeof key === "object") {
    if (weakMap.get(key) === undefined) {
      weakMap.set(key, {});
    }
    return weakMap.get(key);
  } else if (DataStoreConfig.useExpando && typeof key === "object") {
    // eslint-disable-next-line no-return-assign
    return (
      key[DataStoreConfig.expandoKey] || (key[DataStoreConfig.expandoKey] = {})
    );
  }
  const id = getKey(key);
  // eslint-disable-next-line no-return-assign
  return store[id] || (store[id] = {});
}

const DataStore = {
  set(namespace, key, value) {
    if (!namespace) {
      throw new TypeError(
        `DataStore.set: namespace is required, got ${typeof namespace}`
      );
    }
    const dataStore = getDataStoreContainer(namespace);
    dataStore[key] = value;
    return namespace;
  },

  get(namespace, key, defaultValue) {
    console.log("🚀 ~ get ~ namespace:", namespace.hasAttribute(`data-${key}`));
    if (!namespace) return;
    if (!namespace) {
      throw new TypeError(
        `DataStore.get: namespace is required, got ${typeof namespace}`
      );
    }
    // const dataStore = getDataStoreContainer(namespace);
    const dataStore = getDataStoreContainer(namespace);
    let value = dataStore[key];

    if (value === undefined && namespace.getAttribute !== null) {
      if (
        namespace.hasAttribute !== null &&
        !namespace.hasAttribute(`data-${key}`)
      ) {
        value = undefined;
      } else {
        const attributeValue = namespace.getAttribute(`data-${key}`);
        value = attributeValue === null ? undefined : attributeValue;
      }
    }

    if (defaultValue !== undefined && value === undefined) {
      value = dataStore[key] = defaultValue;
    }

    return value;
  },

  remove(namespace, key) {
    if (!namespace) {
      throw new TypeError(
        `DataStore.remove: namespace is required, got ${typeof namespace}`
      );
    }
    const dataStore = getDataStoreContainer(namespace);
    const value = dataStore[key];
    delete dataStore[key];
    if (isEmpty(dataStore)) {
      this.purge(namespace);
    }
    return value;
  },

  purge(namespace) {
    if (weakMapEnabled && typeof namespace === "object") {
      return weakMap.delete(namespace);
    } else if (DataStoreConfig.useExpando && typeof namespace === "object") {
      delete namespace[DataStoreConfig.expandoKey];
    } else {
      delete store[getKey(namespace)];
    }
  },

  _storage: store,
};

export default DataStore;
