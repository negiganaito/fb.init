/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/* eslint-disable max-params */
import FalcoConsentChecker from "FalcoConsentChecker";
import nullthrows from "fbjs/lib/nullthrows";
import FBLogger from "FBLogger";

import { AnalyticsCoreData } from "./AnalyticsCoreData";
import BaseEventEmitter from "./BaseEventEmitter";
import {
  bumpODSMetrics,
  getTaggedBitmap,
  identityToString,
  xorBitmap,
} from "./FalcoUtils";
import performanceAbsoluteNow from "./performanceAbsoluteNow";
import PersistedQueue from "./PersistedQueue";
import Random from "./Random";
import { getOffsetMillis } from "./ServerTime";

const taggedBitmap33 = getTaggedBitmap(33);
const taggedBitmap0 = getTaggedBitmap(0);
const taggedBitmap37 = getTaggedBitmap(37);
const MAX_SIZE = 500 * 1024 * 0.6;
const queueMap = new Map();

function onLoadFunction(event) {
  event.tags = xorBitmap(event.tags ?? [0, 0], taggedBitmap33);
  return event;
}

function createPersistedQueue(key, suffix) {
  let suffixes = PersistedQueue.getSuffixesForKey(key) ?? [];
  suffixes.push(suffix);
  for (let s of suffixes) {
    let queueKey = `${key}^$${s}`;
    if (queueMap.has(queueKey)) continue;
    let useFalcoAsMutexKey = AnalyticsCoreData.use_falco_as_mutex_key ?? false;

    const queue = useFalcoAsMutexKey
      ? PersistedQueue.create(key, {
          onLoad: onLoadFunction,
          queueNameSuffix: s,
          application: "falco",
        })
      : PersistedQueue.create(key, {
          onLoad: onLoadFunction,
          queueNameSuffix: s,
        });

    queueMap.set(queueKey, queue);
  }
  return nullthrows(queueMap.get(`${key}^$${suffix}`));
}

const identity = identityToString(AnalyticsCoreData.identity);
const falcoQueueLog = createPersistedQueue("falco_queue_log", identity);
const falcoQueueImmediately = createPersistedQueue(
  "falco_queue_immediately",
  identity
);
const falcoQueueCritical = createPersistedQueue(
  "falco_queue_critical",
  identity
);
const eventEmitter = new BaseEventEmitter();
const consentMap = {};

function shouldLogEvent(name, policy, metadata) {
  let shouldSample = Random.coinflip(policy.r);
  if (!shouldSample) {
    bumpODSMetrics(metadata, "event.filters.sampling", 1);
    return false;
  }

  let consent = policy.c;
  if (consent !== null && AnalyticsCoreData.consents !== null) {
    let hasConsent = checkConsent(consent, AnalyticsCoreData.consents, name);
    if (!hasConsent) {
      bumpODSMetrics(metadata, "event.filters.consent", 1);
      return false;
    }
  }

  return true;
}

function checkConsent(consentString, consents, eventName) {
  if (!consentMap[consentString]) {
    consentMap[consentString] = JSON.parse(consentString);
  }
  return FalcoConsentChecker(
    consents,
    eventName,
    consentMap[consentString],
    consentMap[consentString][0]
  );
}

function getCurrentTime() {
  return performanceAbsoluteNow()() - getOffsetMillis();
}

function emitEvent(
  eventName,
  time,
  sampled,
  policy,
  getData,
  getPrivacyContext
) {
  if (AnalyticsCoreData.enable_observer) {
    let event = {
      name: eventName,
      time: time,
      sampled: sampled,
      getData: getData,
      policy: policy,
      ...(getPrivacyContext && { getPrivacyContext: getPrivacyContext }),
    };
    eventEmitter.emit("event", event);
  }
}

function logEvent(eventName, policy, time, privacyContext, extraData, queue) {
  let extraDataString = JSON.stringify(extraData);
  if (extraDataString.length > MAX_SIZE) {
    bumpODSMetrics(eventName, "event.filters.exceeded_size", 1);
    FBLogger("falco", `oversized_message:${eventName}`).warn(
      'Dropping event "%s" due to exceeding the max size %s at %s',
      eventName,
      MAX_SIZE,
      extraDataString.length
    );
    return;
  }

  let tags = xorBitmap([0, 0], taggedBitmap0);
  tags = xorBitmap(tags, taggedBitmap37);
  queue.wrapAndEnqueueItem({
    name: eventName,
    policy: policy,
    time: time,
    extra: extraDataString,
    privacyContext: privacyContext,
    tags: tags,
  });

  bumpODSMetrics(eventName, "event.captured", 1);
}

function handleEvent(
  eventName,
  policy,
  extraDataFunc,
  getPrivacyContextFunc,
  queue
) {
  try {
    let time = getCurrentTime();
    bumpODSMetrics(eventName, "event.logged", 1);
    let shouldLog = shouldLogEvent(eventName, policy, eventName);

    if (shouldLog) {
      let extraData = extraDataFunc();
      let privacyContext = getPrivacyContextFunc?.();
      logEvent(eventName, policy, time, privacyContext, extraData, queue);
    }

    emitEvent(
      eventName,
      time,
      shouldLog,
      policy,
      extraDataFunc,
      getPrivacyContextFunc
    );
  } catch (error) {
    handleError(error);
  }
}

function handleAsyncEvent(
  eventName,
  policy,
  extraDataFunc,
  getPrivacyContextFunc,
  queue
) {
  try {
    let time = getCurrentTime();
    bumpODSMetrics(eventName, "event.logged", 1);
    let shouldLog = shouldLogEvent(eventName, policy, eventName);

    if (shouldLog) {
      let extraDataPromise = Promise.resolve(extraDataFunc());
      let privacyContextPromise = Promise.resolve(getPrivacyContextFunc?.());

      return Promise.all([extraDataPromise, privacyContextPromise]).then(
        ([extraData, privacyContext]) => {
          logEvent(eventName, policy, time, privacyContext, extraData, queue);
          emitEvent(
            eventName,
            time,
            shouldLog,
            policy,
            () => extraData,
            () => privacyContext
          );
        }
      );
    } else {
      emitEvent(
        eventName,
        time,
        shouldLog,
        policy,
        extraDataFunc,
        getPrivacyContextFunc
      );
      return Promise.resolve();
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

function handleError(error) {
  let logger = FBLogger("falco");
  if (error instanceof Error) {
    logger.catching(error).warn("Error while attempting to log to Falco");
  } else {
    logger.warn(
      "Caught non-error while attempting to log to Falco: %s",
      JSON.stringify(error)
    );
  }
}

function createLogger(eventName, policy) {
  return {
    log: (extraDataFunc, getPrivacyContextFunc) =>
      handleEvent(
        eventName,
        policy,
        extraDataFunc,
        getPrivacyContextFunc,
        falcoQueueLog
      ),
    logAsync: (extraDataFunc, getPrivacyContextFunc) =>
      handleAsyncEvent(
        eventName,
        policy,
        extraDataFunc,
        getPrivacyContextFunc,
        falcoQueueLog
      ).catch(handleError),
    logImmediately: (extraDataFunc, getPrivacyContextFunc) =>
      handleEvent(
        eventName,
        policy,
        extraDataFunc,
        getPrivacyContextFunc,
        falcoQueueImmediately
      ),
    logCritical: (extraDataFunc, getPrivacyContextFunc) =>
      handleEvent(
        eventName,
        policy,
        extraDataFunc,
        getPrivacyContextFunc,
        falcoQueueCritical
      ),
    logRealtimeEvent: (extraDataFunc, getPrivacyContextFunc) =>
      handleEvent(
        eventName,
        policy,
        extraDataFunc,
        getPrivacyContextFunc,
        falcoQueueCritical
      ),
  };
}

export const observable = eventEmitter;
export const create = createLogger;
