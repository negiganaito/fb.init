/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { of_string } from "../../helpers/I64";

const threadAttributionMap = new Map();

const getSource = (key, defaultValue) => {
  let source = threadAttributionMap.get(defaultValue);
  source =
    source !== null ? source : { type: "MWLSEntrypoint", value: "unknown" };
  threadAttributionMap.delete(defaultValue);
  return source;
};

const setSource = (key, value) => {
  threadAttributionMap.set(key, { type: "MWLSEntrypoint", value });
};

const setLSMessagingThreadAttribution = (key, value) => {
  const stringValue = of_string(value);
  threadAttributionMap.set(key, {
    type: "LSThreadAttribution",
    value: stringValue,
  });
};

const setSourceForNewThread = (value) => {
  threadAttributionMap.set("", { type: "MWLSEntrypoint", value });
};

const getSourceForNewThread = () => {
  const source = threadAttributionMap.get("");
  if (source === null || source.type === "LSThreadAttribution") {
    return "unknown";
  }
  return source.value;
};

export {
  getSource,
  getSourceForNewThread,
  setLSMessagingThreadAttribution,
  setSource,
  setSourceForNewThread,
};
