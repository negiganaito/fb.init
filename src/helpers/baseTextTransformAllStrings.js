/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { Children, cloneElement, Fragment } from "react";

import dangerouslyAccessReactElementInternals from "./DangerouslyAccessReactElementInternals_DO_NOT_USE_IN_NEW_CODE";

function isFragmentWithStringChildren(element) {
  const internals = dangerouslyAccessReactElementInternals(element);
  return (
    internals?.type === Fragment &&
    typeof internals?.props?.children === "string"
  );
}

// eslint-disable-next-line max-params
function baseTextTransformAllStrings(
  element,
  transformFunction,
  depth = 3,
  currentDepth = 0
) {
  let count = 0;
  if (
    element === null ||
    typeof element === "number" ||
    typeof element === "boolean"
  ) {
    return element;
  }
  if (typeof element === "string") {
    return transformFunction(element, `${currentDepth}-${count++}`);
  }
  if (Array.isArray(element)) {
    return element.map((child) => {
      if (isFragmentWithStringChildren(child)) {
        return cloneElement(child, {
          children: transformFunction(
            child.props.children,
            `${currentDepth}-${count++}`
          ),
        });
      }
      return currentDepth < depth
        ? baseTextTransformAllStrings(
            child,
            transformFunction,
            depth,
            currentDepth + 1
          )
        : child;
    });
  }
  const singleChild = Children.only(element);
  if (isFragmentWithStringChildren(singleChild)) {
    return cloneElement(singleChild, {
      children: transformFunction(
        singleChild.props.children,
        `${currentDepth}-${count++}`
      ),
    });
  }
  const { children } = singleChild.props;
  if (typeof children === "string") {
    return cloneElement(singleChild, {
      children: transformFunction(children, `${currentDepth}-${count++}`),
    });
  }
  if (Array.isArray(children)) {
    return cloneElement(singleChild, {
      children: baseTextTransformAllStrings(
        children,
        transformFunction,
        depth,
        currentDepth + 1
      ),
    });
  }
  return element;
}

baseTextTransformAllStrings.displayName = `${baseTextTransformAllStrings.name}`;

export default baseTextTransformAllStrings;
