/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import JSResourceReferenceImpl from "./JSResourceReferenceImpl";

const resources = {};

function registerResource(name, resource) {
  resources[name] = resource;
}

function getResource(name) {
  return resources[name];
}

function JSResource(name) {
  let resource = getResource(name);
  if (resource) {
    return resource;
  }
  resource = new JSResourceReferenceImpl(name);
  registerResource(name, resource);
  return resource;
}

JSResource.loadAll = JSResourceReferenceImpl.loadAll;

export default JSResource;
