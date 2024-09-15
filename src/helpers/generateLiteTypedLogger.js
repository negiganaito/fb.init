/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import getDataWithLoggerOptions from "getDataWithLoggerOptions";
import { log as logJstlMigrationFalcoEvent } from "JstlMigrationFalcoEvent";

import Banzai from "./Banzai";

const postLog = (loggerName, data, options) => {
  const [type, configName] = loggerName.split(":");

  if (type === "logger") {
    logJstlMigrationFalcoEvent(() => ({
      logger_config_name: configName,
      payload: data,
    }));
  } else {
    Banzai.post(loggerName, data, options);
  }
};

const generateLiteTypedLogger = (loggerName) => ({
  log: (data, options) => {
    postLog(loggerName, getDataWithLoggerOptions(data, options), Banzai.BASIC);
  },
  logVital: (data, options) => {
    postLog(loggerName, getDataWithLoggerOptions(data, options), Banzai.VITAL);
  },
  logImmediately: (data, options) => {
    postLog(loggerName, getDataWithLoggerOptions(data, options), {
      signal: true,
    });
  },
});

export default generateLiteTypedLogger;
