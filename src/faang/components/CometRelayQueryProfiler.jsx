/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import emptyFunction from "fbjs/lib/emptyFunction";
// import performanceNow from "fbjs/lib/performanceNow";
import { RelayProfiler } from "relay-runtime";

// import { InteractionTracingCore } from "./interaction-tracing";

// let performanceNowCached;

function profileRelayQuery(query, metadata) {
  if (!metadata) return emptyFunction;

  // const startTime =
  //   performanceNowCached || (performanceNowCached = performanceNow());

  return function (error) {
    const profileData = {
      is_preloaded: metadata.usedPrefetcher,
      usedCache: metadata.usedCache,
      usedPrefetcher: metadata.usedPrefetcher,
    };

    if (error) {
      profileData.error = error.message;
    }

    // InteractionTracingCore.getPendingInteractions().forEach((interaction) => {
    //   interaction.addSubspan(
    //     `Relay_${metadata.queryName}`,
    //     "RelayQuery",
    //     startTime,
    //     performanceNowCached || (performanceNowCached = performanceNow()),
    //     {
    //       ...profileData,
    //       full_duration: (performanceNowCached() - startTime) / 1000,
    //     }
    //   );
    // });
  };
}

let isProfilerInstalled = false;

function installProfiler() {
  if (isProfilerInstalled) return;

  RelayProfiler.attachProfileHandler("fetchRelayQuery", profileRelayQuery);
  isProfilerInstalled = true;
}

export { installProfiler as install };
