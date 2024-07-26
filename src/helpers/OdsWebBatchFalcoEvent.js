/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { create } from "./FalcoLoggerInternal";
import getFalcoLogPolicy_DO_NOT_USE from "./getFalcoLogPolicy_DO_NOT_USE";

const logPolicy = getFalcoLogPolicy_DO_NOT_USE("1838142");
const odsWebBatchFalcoEvent = create("ods_web_batch", logPolicy);

export default odsWebBatchFalcoEvent;
