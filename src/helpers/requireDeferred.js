/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import RDRequireDeferredReference from "RDRequireDeferredReference";

const modules = {};

function defineModule(name, module) {
  modules[name] = module;
}

function getModule(name) {
  return modules[name];
}

function requireDeferred(name) {
  let module = getModule(name);
  if (module) return module;
  module = new RDRequireDeferredReference(name);
  defineModule(name, module);
  return module;
}

export default requireDeferred;
