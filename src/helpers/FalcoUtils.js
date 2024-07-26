/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { AnalyticsCoreData } from "./AnalyticsCoreData";
import * as ODS from "./ODS";

const ODS_WEB_BATCH = "ods_web_batch";
let cachedODS;
let cachedAnalyticsCoreData;

export function identityToString(identity) {
  if (!identity) return "";

  const { fbIdentity, appScopedIdentity, claim } = identity;
  let idString = "";

  if (fbIdentity) {
    const { accountId, actorId } = fbIdentity;
    idString = `${accountId}^#${actorId}^#`;
  } else if (appScopedIdentity !== undefined) {
    idString = `^#^#${appScopedIdentity}`;
  }

  return `${idString}^#${claim}`;
}

export function getTaggedBitmap(bit) {
  return bit > 30 ? [0, 1 << (bit - 30)] : [1 << bit, 0];
}

export function xorBitmap(bitmap1, bitmap2) {
  return [bitmap1[0] | bitmap2[0], bitmap1[1] | bitmap2[1]];
}

export function bumpODSMetrics(entity, key, value) {
  if (entity === ODS_WEB_BATCH) return;

  if (!cachedODS) {
    cachedODS = ODS;
  }
  if (!cachedAnalyticsCoreData) {
    cachedAnalyticsCoreData = AnalyticsCoreData;
  }

  cachedODS.bumpEntityKey(
    7173,
    `entities.ff_js_web.${entity}.${cachedAnalyticsCoreData.app_id}.${
      cachedAnalyticsCoreData.app_version ?? "0"
    }.${cachedAnalyticsCoreData.push_phase}`,
    key,
    value
  );
}
