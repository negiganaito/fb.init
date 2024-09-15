/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import performanceNowSinceAppStart from "../../helpers/performanceNowSinceAppStart";

import addAnnotations from "./addAnnotations";
import { dump } from "./HeroPendingPlaceholderTracker";

const interactionMap = new Map();
const globalMetadata = new Map();
const activeInteractions = new Map();
const defaultAnnotations = {
  string: {},
  int: {},
  double: {},
  bool: {},
  string_array: {},
  int_array: {},
  double_array: {},
  bool_array: {},
};
const interactionStats = { interactionCount: 0 };
const MAX_REACT_RENDER_RECORDS = 10000;

function createInteractionLogger() {
  const currentActiveInteractions = new Map(activeInteractions);

  const iterateActiveInteractions = (callback) => {
    currentActiveInteractions.forEach((interaction) => {
      callback(interaction);
    });
  };

  return {
    addGlobalMetadata(key, value) {
      if (typeof value === "number") {
        addAnnotations(defaultAnnotations, { int: { [key]: value } });
      } else if (typeof value === "string") {
        addAnnotations(defaultAnnotations, { string: { [key]: value } });
      } else if (typeof value === "boolean") {
        addAnnotations(defaultAnnotations, { bool: { [key]: value } });
      }
      this.addMetadata(key, value);
    },
    addMetadata(key, value) {
      iterateActiveInteractions((interaction) => {
        if (typeof value === "number") {
          addAnnotations(interaction.annotations, { int: { [key]: value } });
        } else if (typeof value === "string") {
          addAnnotations(interaction.annotations, { string: { [key]: value } });
        } else if (typeof value === "boolean") {
          addAnnotations(interaction.annotations, { bool: { [key]: value } });
        }
      });
    },
    addRequireDeferred(name, start) {
      const requires = [];
      iterateActiveInteractions((interaction) => {
        if (!interaction.requireDeferreds[name]) {
          interaction.requireDeferreds[name] = { start };
          requires.push(interaction.requireDeferreds[name]);
        }
      });
      return (end, alreadyRequired) => {
        requires.forEach((require) => {
          require.end = end;
          require.duration = end - start;
          if (alreadyRequired) require.alreadyRequired = true;
        });
      };
    },
    forEach(callback) {
      iterateActiveInteractions(callback);
    },
  };
}

const InteractionTracingMetricsCore = {
  addFactoryTiming(traceId, timing) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      interaction.factoryTimings.push(timing);
    }
  },
  addGlobalMetadata(traceId, key, value) {
    if (typeof value === "number") {
      addAnnotations(defaultAnnotations, { int: { [key]: value } });
      this.addAnnotationInt(traceId, key, value);
    } else if (typeof value === "string") {
      addAnnotations(defaultAnnotations, { string: { [key]: value } });
      this.addAnnotation(traceId, key, value);
    } else if (typeof value === "boolean") {
      addAnnotations(defaultAnnotations, { bool: { [key]: value } });
      this.addAnnotationBoolean(traceId, key, value);
    }
  },
  addHeroBootload(traceId, bootload) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      interaction.heroBootloads.push(bootload);
    }
  },
  addHeroRelay(traceId, relay) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      interaction.heroRelay.push(relay);
    }
  },
  addHeroPendingPlaceholders(traceId, placeholders) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      interaction.pendingPlaceholders =
        interaction.pendingPlaceholders.concat(placeholders);
    }
  },
  addHiddenTiming(traceId, timings) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      interaction.hiddenTimings = timings;
    }
  },
  addImagePreloader(traceId, key, timing) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      interaction.imagePreloaderTimings[key] = timing;
    }
  },
  // eslint-disable-next-line max-params
  addMarkerPoint(
    traceId,
    name,
    type,
    data,
    timestamp = performanceNowSinceAppStart()
  ) {
    const interaction = interactionMap.get(traceId);
    if (interaction && timestamp >= interaction.start) {
      interaction.markerPoints[name] = { timestamp, type };
      if (data) interaction.markerPoints[name].data = data;
    }
  },
  // eslint-disable-next-line max-params
  addFirstMarkerPoint(traceId, name, type, timestamp, data = {}) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      const existingMarker = interaction.markerPoints[name];
      if (
        timestamp >= interaction.start &&
        (!existingMarker || existingMarker.timestamp > timestamp)
      ) {
        interaction.markerPoints[name] = { timestamp, type };
        if (data) interaction.markerPoints[name].data = data;
      }
    }
  },
  addMetadata(traceId, key, value) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      if (typeof value === "number") {
        addAnnotations(interaction.annotations, { int: { [key]: value } });
      } else if (typeof value === "string") {
        addAnnotations(interaction.annotations, { string: { [key]: value } });
      } else if (typeof value === "boolean") {
        addAnnotations(interaction.annotations, { bool: { [key]: value } });
      }
    }
  },
  addAnnotation(traceId, key, value) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      addAnnotations(interaction.annotations, { string: { [key]: value } });
    }
  },
  addAnnotationInt(traceId, key, value) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      addAnnotations(interaction.annotations, { int: { [key]: value } });
    }
  },
  addAnnotationDouble(traceId, key, value) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      addAnnotations(interaction.annotations, { double: { [key]: value } });
    }
  },
  addAnnotationBoolean(traceId, key, value) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      addAnnotations(interaction.annotations, { bool: { [key]: value } });
    }
  },
  addAnnotationStringArray(traceId, key, value) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      addAnnotations(interaction.annotations, {
        string_array: { [key]: value },
      });
    }
  },
  addAnnotationIntArray(traceId, key, value) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      addAnnotations(interaction.annotations, { int_array: { [key]: value } });
    }
  },
  addAnnotationDoubleArray(traceId, key, value) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      addAnnotations(interaction.annotations, {
        double_array: { [key]: value },
      });
    }
  },
  addAnnotationBooleanArray(traceId, key, value) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      addAnnotations(interaction.annotations, { bool_array: { [key]: value } });
    }
  },
  addOfflineTiming(traceId, timings) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      interaction.offlineTimings = timings;
    }
  },
  addPayloadResource(traceId, key, resource) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      interaction.payloadResources[key] = resource;
    }
  },
  addPayloadTiming(traceId, key, timing) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      interaction.payloadTimings[key] = timing;
    }
  },
  // eslint-disable-next-line max-params
  addReactRender(
    traceId,
    key,
    start,
    end,
    actualDuration,
    baseDuration,
    phase
  ) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      const renderTiming = {
        actualDuration,
        baseDuration,
        duration: end - start,
        end,
        phase,
        start,
      };
      const renderTimings = interaction.reactRender[key] || [];
      if (renderTimings.length < MAX_REACT_RENDER_RECORDS) {
        renderTimings.push(renderTiming);
        interaction.commitSet.add(end);
      }
      interaction.reactRender[key] = renderTimings;
    }
  },
  // eslint-disable-next-line max-params
  addSubspan(traceId, name, start, end, type, data) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      const subspan = { data, end, start, type };
      const subspans = interaction.subSpans[name] || [];
      subspans.push(subspan);
      interaction.subSpans[name] = subspans;
    }
  },
  addMountPoint(traceId, timestamp, name) {
    this.addFirstMarkerPoint(
      traceId,
      `Mount_${name}`,
      "VisualCompletion",
      timestamp
    );
  },
  addMountPointMetadata(traceId, name, metadata) {
    const interaction = this.get(traceId);
    const markerName = `Mount_${name}`;
    const marker = interaction?.markerPoints[markerName];
    if (marker) {
      const markerData = marker.data || {};
      Object.assign(markerData, metadata);
      marker.data = markerData;
    }
  },
  addTag(traceId, key, value) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      const tagSet = interaction.tagSet[key] || new Set();
      tagSet.add(value);
      interaction.tagSet[key] = tagSet;
    }
  },
  addTracedInteraction(traceId, start, callback) {
    const interaction = {
      annotations: {
        string: {},
        int: {},
        double: {},
        bool: {},
        string_array: {},
        int_array: {},
        double_array: {},
        bool_array: {},
      },
      commitSet: new Set(),
      factoryTimings: [],
      hasVcReport: false,
      heroBootloads: [],
      heroRelay: [],
      hiddenTimings: [],
      imagePreloaderTimings: {},
      lateMutationIgnoreElements: new Set(),
      markerPoints: {},
      navigationTiming: {},
      offlineTimings: [],
      payloadResources: {},
      payloadTimings: {},
      pendingPlaceholders: [],
      reactRender: {},
      requireDeferreds: {},
      start,
      subSpans: {},
      tagSet: {},
      traceId,
      vcStateLog: null,
      wasCanceled: false,
      wasOffline: false,
    };

    Object.keys(defaultAnnotations).forEach((key) => {
      Object.keys(defaultAnnotations[key]).forEach((subKey) => {
        interaction.annotations[key][subKey] = defaultAnnotations[key][subKey];
      });
    });

    interactionMap.set(traceId, interaction);
    activeInteractions.set(traceId, interaction);
    globalMetadata.set(traceId, callback);
    interactionStats.interactionCount++;

    return interaction;
  },
  complete(traceId) {
    const interaction = interactionMap.get(traceId);
    if (interaction && interaction.completed === null) {
      addAnnotations(interaction.annotations, {
        int: { endedByHeroComplete: 1 },
      });
      interaction.completed = performanceNowSinceAppStart();

      const callback = globalMetadata.get(traceId);
      if (callback) callback(interaction);

      globalMetadata.delete(traceId);
      activeInteractions.delete(traceId);
    }
  },
  currentInteractionLogger: createInteractionLogger,
  dump() {
    const interactions = Array.from(interactionMap.values()).sort(
      (a, b) => a.start - b.start
    );
    const dumpedInteractions = {};

    interactions.forEach((interaction) => {
      const pendingPlaceholders = dump(interaction.traceId);
      dumpedInteractions[interaction.traceId] = {
        ...interaction,
        pendingPlaceholders,
        e2e:
          interaction.completed !== null
            ? ((interaction.completed - interaction.start) / 1000).toFixed(2)
            : "?",
      };
    });

    return dumpedInteractions;
  },
  get(traceId) {
    return interactionMap.get(traceId);
  },
  removeMarkerPoint(traceId, name) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      delete interaction.markerPoints[name];
    }
  },
  setInteractionClass(traceId, interactionClass) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      interaction.interactionClass = interactionClass;
    }
  },
  // eslint-disable-next-line max-params
  setInteractionType(traceId, interactionClass, type, qplEvent) {
    const interaction = interactionMap.get(traceId);
    if (interaction) {
      interaction.interactionClass = interactionClass;
      interaction.type = type;
      interaction.qplEvent = qplEvent;
    }
  },
  delete(traceId) {
    interactionMap.delete(traceId);
  },
  getInteractionStat() {
    return interactionStats;
  },
};

export default InteractionTracingMetricsCore;
