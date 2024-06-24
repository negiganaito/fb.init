/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";

import useHeroBootloadedComponent from "../../hooks/useHeroBootloadedComponent"; // You may need to replace this import with the actual import path.

import { BootloaderResource } from "./BootloaderResource"; // You may need to replace this import with the actual import path.

const componentMap = new Map();

function setComponent(name, component) {
  componentMap.set(name, component);
}

function getComponent(name) {
  return componentMap.get(name);
}

function lazyLoadComponent(name) {
  const existingComponent = getComponent(name);
  if (existingComponent) return existingComponent;

  function LazyLoadedComponent(props, ref) {
    const resource = BootloaderResource.read(name);
    useHeroBootloadedComponent(name);
    return React.createElement(resource, { ...props, ref });
  }

  LazyLoadedComponent.displayName = `lazyLoadComponent(${name})`;

  const ComponentWithRef = forwardRef(LazyLoadedComponent);
  setComponent(name, ComponentWithRef);

  return ComponentWithRef;
}

export default lazyLoadComponent;
