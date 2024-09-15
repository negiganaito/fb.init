/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import BanzaiAdapterComet from "BanzaiAdapterComet";
import * as BanzaiCompressionUtils from "BanzaiCompressionUtils";
import * as BanzaiConsts from "BanzaiConsts";
import * as BanzaiUtils from "BanzaiUtils";
import * as CurrentUser from "CurrentUser";
import ErrorGuard from "ErrorGuard";
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";
import recoverableViolation from "recoverableViolation";
import setTimeoutCometLoggingPriWithFallback from "setTimeoutCometLoggingPriWithFallback";
import setTimeoutCometSpeculativeWithFallback from "setTimeoutCometSpeculativeWithFallback";

import BanzaiLazyQueue from "./BanzaiLazyQueue";
import FBLogger from "./FBLogger";
import performanceAbsoluteNow from "./performanceAbsoluteNow";
import { onAfterLoad, onBeforeUnload } from "./Run";
import Visibility from "./Visibility";
import { getId } from "./WebSession";

const postBuffers = {
  basic: [],
  vital: [],
};

const inPreparationPosts = [];
const scheduleTimers = {
  basic: null,
  vital: null,
};
const sendTimers = {
  basic: null,
  vital: null,
};

const batchMap = new Map();
let batchTimer;
let triggerRoute = null;

const BanzaiComet = {
  // ... (include all the methods from the original object here)
  _expiredBatchMap: () => {
    const currentTime = performanceAbsoluteNow();

    for (const [key, batch] of batchMap) {
      if (batch.expiryTime <= currentTime) {
        const firstPost = batch.posts[0];
        const priority = firstPost.__meta.priority ?? BanzaiConsts.BASIC;
        const postBuffer = BanzaiComet._getPostBuffer(priority);
        postBuffer.push(...batch.posts);
        batchMap.delete(key);
      }
    }

    if (batchMap.size > 0) {
      batchTimer = setTimeout(
        BanzaiComet._expiredBatchMap,
        BanzaiConsts.BATCH_TIMEOUT
      );
    }
  },
  _flushBatchMap: () => {
    clearTimeout(batchTimer);
    batchTimer = null;

    for (const batch of batchMap.values()) {
      const firstPost = batch.posts[0];
      const priority = firstPost.__meta.priority ?? BanzaiConsts.BASIC;
      const postBuffer = BanzaiComet._getPostBuffer(priority);
      postBuffer.push(...batch.posts);
    }

    batchMap.clear();
  },
  _flushLazyQueue: () => {
    BanzaiLazyQueue.flushQueue().forEach((args) => BanzaiComet.post(...args));
  },
  // eslint-disable-next-line max-params
  _gatherWadsAndPostsFromBuffer: (
    wadMap,
    posts,
    keepRetryable,
    bufferType,
    buffers,
    sendMinimumOnePost
  ) => {
    const state = {
      currentSize: 0,
      keepRetryable,
      overlimit: false,
      sendMinimumOnePost,
      wadMap: new Map(),
    };

    const filteredPosts = buffers[bufferType].filter((post) =>
      BanzaiUtils.filterPost(post, wadMap, posts, state)
    );

    if (!state.overlimit && bufferType === "vital") {
      buffers.basic = buffers.basic.filter((post) =>
        BanzaiUtils.filterPost(post, wadMap, posts, state)
      );
    }

    return filteredPosts;
  },
  _getPostBuffer: (bufferType) => {
    return bufferType === null
      ? postBuffers.basic
      : postBuffers[bufferType] || [];
  },
  _handleBatchPost: (post, bufferType, batchTime) => {
    if (batchTime === null) return false;

    const [route, , timestamp] = post;
    let batch = batchMap.get(route);

    if (batch !== null && batch.expiryTime <= timestamp) {
      const buffer = BanzaiComet._getPostBuffer(bufferType);
      buffer.push(...batch.posts);
      batchMap.delete(route);
      return false;
    }

    if (batch !== null && batch.expiryTime > timestamp) {
      batch.posts.push(post);
      return true;
    }

    batch = { expiryTime: timestamp + batchTime, posts: [post] };
    batchMap.set(route, batch);

    if (!batchTimer) {
      batchTimer = setTimeout(
        BanzaiComet._expiredBatchMap,
        BanzaiConsts.BATCH_TIMEOUT
      );
    }

    return true;
  },
  _handlePostPreflightChecks: (route, data, options) => {
    if (BanzaiComet.adapter.config.disabled === true) return true;
    if (!ExecutionEnvironment.canUseDOM && !ExecutionEnvironment.isInWorker)
      return true;
    if (BanzaiAdapterComet.config.disabled === true) return true;

    const blacklist = BanzaiAdapterComet.config.blacklist;
    return (
      blacklist !== null &&
      typeof blacklist.indexOf === "function" &&
      blacklist.indexOf(route) !== -1
    );
  },
  _handleSignalPost: (post, bufferType, isSignal) => {
    if (!isSignal) return false;

    const postCopy = post;
    postCopy.__meta.status = BanzaiConsts.POST_INFLIGHT;

    const data = [
      {
        app_id: CurrentUser.getAppID(),
        posts: [post],
        trigger: post[0],
        user: CurrentUser.getPossiblyNonFacebookUserID(),
        webSessionId: getId(),
      },
    ];

    BanzaiAdapterComet.send(
      BanzaiComet._prepForTransit(data),
      () => {
        postCopy.__meta.status = BanzaiConsts.POST_SENT;
        postCopy.__meta.callback?.();
      },
      (error) => {
        BanzaiUtils.retryPost(post, error, postBuffers[bufferType]);
      },
      true
    );

    return !postCopy.__meta.retry;
  },
  _initialize: () => {
    const priorities = [BanzaiConsts.VITAL, BanzaiConsts.BASIC];

    if (ExecutionEnvironment.canUseDOM) {
      if (Visibility.isSupported()) {
        Visibility.addListener(Visibility.HIDDEN, () => {
          BanzaiComet._flushLazyQueue();
          priorities.forEach((priority) => {
            if (BanzaiComet._getPostBuffer(priority).length > 0) {
              BanzaiComet._tryToSendViaBeacon(priority);
            }
          });
          BanzaiComet._store();
        });

        Visibility.addListener(Visibility.VISIBLE, () => {
          BanzaiComet._flushLazyQueue();
          priorities.forEach((priority) => {
            BanzaiComet._tryToSendViaBeacon(priority);
          });
          BanzaiComet._restore();
        });
      } else {
        BanzaiComet.adapter.setHooks(BanzaiComet);
      }

      onBeforeUnload(() => {
        BanzaiComet._flushLazyQueue();
        BanzaiComet._flushBatchMap();
        BanzaiComet._sendBeacon(BanzaiConsts.VITAL);
        BanzaiComet._sendBeacon(BanzaiConsts.BASIC);
      }, false);

      BanzaiComet.adapter.setUnloadHook(BanzaiComet);

      onAfterLoad(() => {
        BanzaiComet._restore();
      });
    } else if (ExecutionEnvironment.isInWorker) {
      // eslint-disable-next-line no-restricted-globals
      self.addEventListener("force-flush-logs", () => {
        BanzaiComet.flush();
        BanzaiComet._flushLazyQueue();
        BanzaiComet._flushBatchMap();
      });
    }
  },
  _isShutdown: false,
  _prepForTransit: (posts) => {
    const formData = new FormData();
    formData.append("ts", String(Date.now()));

    const outOfBandData = BanzaiCompressionUtils.outOfBandsPosts(posts);
    Object.entries(outOfBandData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("q", JSON.stringify(posts));
    return formData;
  },

  _prepWadForTransit: (wad) => {
    BanzaiCompressionUtils.compressWad(
      wad,
      BanzaiAdapterComet.preferredCompressionMethod()
    );
  },

  _prepWadForTransitAsync: (wad) => {
    return BanzaiCompressionUtils.compressWadAsync(
      wad,
      BanzaiAdapterComet.preferredCompressionMethod()
    );
  },

  _restore: () => {
    const restorePost = (post) => {
      const priority =
        post.__meta.priority === BanzaiConsts.VITAL
          ? BanzaiConsts.VITAL
          : BanzaiConsts.BASIC;
      BanzaiComet._getPostBuffer(priority).push(post);
    };

    const storage = BanzaiAdapterComet.getStorage();
    ErrorGuard.applyWithGuard(storage.restore, storage, [restorePost]);
    BanzaiComet._schedule(BanzaiConsts.VITAL_WAIT, BanzaiConsts.VITAL);
  },

  _schedule: (delay, priority) => {
    if (priority === null) return false;

    const sendCallback = () => {
      sendTimers[priority] = null;
      scheduleTimers[priority] = null;
      BanzaiComet._sendWithCallbacks(priority, null, null);
    };

    const scheduledTime = performanceAbsoluteNow() + delay;

    if (
      scheduleTimers[priority] === null ||
      scheduledTime < scheduleTimers[priority]
    ) {
      scheduleTimers[priority] = scheduledTime;
      sendTimers[priority] !== null && clearTimeout(sendTimers[priority]);

      sendTimers[priority] =
        priority === BanzaiConsts.VITAL
          ? setTimeoutCometLoggingPriWithFallback(sendCallback, delay)
          : setTimeoutCometSpeculativeWithFallback(sendCallback, delay);

      return true;
    }

    return false;
  },

  _sendBeacon: (priority) => {
    if (BanzaiComet._getPostBuffer(priority).length > 0) {
      BanzaiComet._tryToSendViaBeacon(priority);
    }
  },
  _sendWithCallbacks: (priority, successCallback, errorCallback) => {
    if (postBuffers[priority].length > 0) {
      BanzaiComet._schedule(
        priority === "vital"
          ? BanzaiConsts.VITAL_WAIT
          : BanzaiConsts.BASIC_WAIT_COMET,
        priority
      );
    }

    if (!BanzaiAdapterComet.readyToSend()) {
      errorCallback?.();
      return;
    }

    const storage = BanzaiAdapterComet.getStorage();
    ErrorGuard.applyWithGuard(storage.flush, storage, [BanzaiComet._restore]);
    BanzaiAdapterComet.inform(BanzaiConsts.SEND);

    const wads = [];
    const posts = [];
    postBuffers[priority] = BanzaiComet._gatherWadsAndPostsFromBuffer(
      wads,
      posts,
      true,
      priority,
      postBuffers,
      true
    );

    if (wads.length <= 0) {
      BanzaiAdapterComet.inform(BanzaiConsts.OK);
      successCallback?.();
      return;
    }

    wads[0].trigger = triggerRoute;
    triggerRoute = null;
    // eslint-disable-next-line no-return-assign
    wads.forEach((wad) => (wad.send_method = "ajax"));
    inPreparationPosts.push(...posts);

    Promise.all(wads.map(BanzaiComet._prepWadForTransitAsync)).finally(() => {
      if (BanzaiComet._isShutdown) return;

      posts.forEach((post) => {
        const index = inPreparationPosts.indexOf(post);
        if (index === -1) {
          recoverableViolation(
            "inflight post not found in inPreparationPosts",
            "comet_infra"
          );
          return;
        }
        inPreparationPosts.splice(index, 1);
      });

      BanzaiAdapterComet.send(
        BanzaiComet._prepForTransit(wads),
        () => {
          posts.forEach((post) => {
            post.__meta.status = BanzaiConsts.POST_SENT;
            typeof post.__meta.callback === "function" &&
              post.__meta.callback();
          });
          successCallback?.();
        },
        (error) => {
          posts.forEach((post) => {
            BanzaiUtils.retryPost(post, error, postBuffers[priority]);
          });
          BanzaiComet._store();
          errorCallback?.();
        }
      );
    });
  },

  _store: () => {
    const storage = BanzaiAdapterComet.getStorage();
    ErrorGuard.applyWithGuard(storage.store, storage, [
      postBuffers[BanzaiConsts.VITAL],
    ]);
    ErrorGuard.applyWithGuard(storage.store, storage, [
      postBuffers[BanzaiConsts.BASIC],
    ]);
  },

  _testState: () => ({
    postBuffer: postBuffers.basic,
    triggerRoute,
  }),

  _tryToSendViaBeacon: (priority) => {
    if (!(navigator && navigator.sendBeacon)) return false;

    let success = true;
    const wads = [];
    const posts = [];
    postBuffers[priority] = BanzaiComet._gatherWadsAndPostsFromBuffer(
      wads,
      posts,
      false,
      priority,
      postBuffers,
      false
    );

    if (wads.length <= 0) return false;

    // eslint-disable-next-line no-return-assign
    wads.forEach((wad) => (wad.send_method = "beacon"));
    wads.map(BanzaiComet._prepWadForTransit);
    const data = BanzaiComet._prepForTransit(wads);

    const endpointUrl = BanzaiComet.adapter.getEndPointUrl(true);
    const sent = navigator.sendBeacon(endpointUrl, data);

    if (!sent) {
      success = false;
      posts.forEach((post) => {
        BanzaiUtils.resetPostStatus(post);
        BanzaiComet._getPostBuffer(priority).push(post);
      });
    }

    return success;
  },

  _unload: () => {
    BanzaiComet._flushLazyQueue();
    BanzaiComet._flushBatchMap();
    BanzaiAdapterComet.cleanup();
    BanzaiAdapterComet.inform(BanzaiConsts.SHUTDOWN);
    BanzaiComet._isShutdown = true;

    inPreparationPosts.forEach((post) => {
      const priority = post.__meta.priority;
      BanzaiUtils.retryPost(
        post,
        444,
        BanzaiComet._getPostBuffer(priority ?? BanzaiConsts.VITAL)
      );
    });

    BanzaiComet._sendBeacon(BanzaiConsts.VITAL);
    BanzaiComet._sendBeacon(BanzaiConsts.BASIC);
    BanzaiComet._store();
  },
  _validateRouteAndSize: (route, data) => {
    if (!route) {
      FBLogger("banzai")
        .blameToPreviousFrame()
        .blameToPreviousFrame()
        .mustfix("BanzaiComet.post called without specifying a route");
    }
    return (JSON.stringify(data) ?? "").length;
  },

  BASIC: { delay: BanzaiConsts.BASIC_WAIT },
  BASIC_WAIT: BanzaiConsts.BASIC_WAIT,
  ERROR: BanzaiConsts.ERROR,
  EXPIRY: undefined,
  OK: BanzaiConsts.OK,
  SEND: BanzaiConsts.SEND,
  SHUTDOWN: BanzaiConsts.SHUTDOWN,
  VITAL: { delay: BanzaiConsts.VITAL_WAIT },
  VITAL_WAIT: BanzaiConsts.VITAL_WAIT,

  adapter: BanzaiAdapterComet,

  canUseNavigatorBeacon: () => {
    return !!(
      navigator &&
      navigator.sendBeacon &&
      BanzaiAdapterComet.isOkToSendViaBeacon()
    );
  },

  flush: (successCallback, errorCallback) => {
    BanzaiComet.flushHelper(BanzaiConsts.VITAL, successCallback, errorCallback);
    BanzaiComet.flushHelper(BanzaiConsts.BASIC, successCallback, errorCallback);
  },

  flushHelper: (priority, successCallback, errorCallback) => {
    scheduleTimers[priority] = null;
    if (sendTimers[priority] !== null) {
      clearTimeout(sendTimers[priority]);
      sendTimers[priority] = null;
    }
    BanzaiComet._sendWithCallbacks(priority, successCallback, errorCallback);
  },

  isEnabled: (feature) => {
    return !!(
      BanzaiAdapterComet.config.gks && BanzaiAdapterComet.config.gks[feature]
    );
  },
  post: (route, data, options) => {
    BanzaiComet._flushLazyQueue();

    if (BanzaiComet._handlePostPreflightChecks(route, data, options)) return;

    const [routePrefix] = route.split(":");
    if (
      (BanzaiAdapterComet.config.known_routes || []).indexOf(routePrefix) === -1
    ) {
      if (BanzaiAdapterComet.config.should_log_unknown_routes === true) {
        FBLogger("banzai")
          .blameToPreviousFrame()
          .mustfix(
            `Attempted to post to invalid Banzai route '${route}'. This call site should be cleaned up.`
          );
      }
      if (BanzaiAdapterComet.config.should_drop_unknown_routes === true) return;
    }

    const sizeInBytes = BanzaiComet._validateRouteAndSize(route, data);
    options = options || {};

    const wrappedData = BanzaiUtils.wrapData(
      route,
      data,
      performanceAbsoluteNow(),
      options.retry,
      sizeInBytes
    );
    let post = wrappedData;

    if (options.callback) {
      post.__meta.callback = options.callback;
    }

    if (options.compress !== null) {
      post.__meta.compress = options.compress;
    }

    const delay = options.delay ?? BanzaiConsts.BASIC_WAIT_COMET;
    const priority =
      delay > BanzaiConsts.VITAL_WAIT ? BanzaiConsts.BASIC : BanzaiConsts.VITAL;
    post.__meta.priority = priority;

    if (
      BanzaiComet._handleSignalPost(
        wrappedData,
        priority,
        options.signal ?? false
      )
    )
      return;
    if (BanzaiComet._handleBatchPost(wrappedData, priority, options.batch))
      return;

    BanzaiComet._getPostBuffer(priority).push(wrappedData);

    if (BanzaiComet._schedule(delay, priority) || triggerRoute === null) {
      triggerRoute = route;
    }
  },
  postsCount: new Map(),
  subscribe: BanzaiAdapterComet.subscribe,
};

BanzaiComet._initialize();

export default BanzaiComet;
