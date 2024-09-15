/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

const ComponentWithDataAttributes = ({ children, dataAttributes }) => {
  const dataAttrs = dataAttributes
    ? Object.keys(dataAttributes).reduce((acc, key) => {
        if (acc !== null && key !== null) {
          acc[`data-${key}`] = dataAttributes[key];
        }
        return acc;
      }, {})
    : null;

  return dataAttrs !== null ? <div {...dataAttrs}>{children}</div> : children;
};

ComponentWithDataAttributes.displayName = `${ComponentWithDataAttributes.name}`;

export default ComponentWithDataAttributes;
