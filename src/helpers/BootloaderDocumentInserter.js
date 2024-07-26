/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import ExecutionEnvironment from "ExecutionEnvironment";

let headElement = null;

const getDOMContainerNode = () => {
  if (!headElement) {
    headElement =
      document.head ||
      document.getElementsByTagName("head")[0] ||
      document.body;
  }
  return headElement;
};

const batchDOMInsert = (callback) => {
  if (ExecutionEnvironment.isInWorker) {
    callback(null);
    return;
  }
  const fragment = document.createDocumentFragment();
  callback(fragment);
  getDOMContainerNode().appendChild(fragment);
};

export { batchDOMInsert, getDOMContainerNode };
