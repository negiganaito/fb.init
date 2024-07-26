/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import performanceAbsoluteNow from "./performanceAbsoluteNow";

const MAX_ENTRIES = 50;
const eventsMap = new Map();

function notify(moduleId, ref, eventType) {
  ref = ref !== null ? ref : "";

  let refMap = eventsMap.get(moduleId);
  if (!refMap) {
    refMap = new Map();
    eventsMap.set(moduleId, refMap);
  }

  let eventTypeMap = refMap.get(ref);
  if (!eventTypeMap) {
    eventTypeMap = new Map();
    refMap.set(ref, eventTypeMap);
  }

  let eventData = eventTypeMap.get(eventType);
  if (!eventData) {
    eventData = [0, []];
    eventTypeMap.set(eventType, eventData);
  }

  const [index, timestamps] = eventData;
  timestamps[index % MAX_ENTRIES] = performanceAbsoluteNow();
  eventData[0]++;
}

function getEvents(moduleId, startTime, endTime) {
  const refMap = eventsMap.get(moduleId);
  if (!refMap) return [];

  const events = [];

  for (const [ref, eventTypeMap] of refMap) {
    for (const [eventType, eventData] of eventTypeMap) {
      const [, timestamps] = eventData;
      for (const timestamp of timestamps) {
        if (timestamp >= startTime && timestamp <= endTime) {
          events.push({
            module: moduleId,
            ref: ref || null,
            type: eventType,
            time: timestamp,
          });
        }
      }
    }
  }

  return events.sort((a, b) => a.time - b.time);
}

function getAllModuleEvents(startTime, endTime) {
  const allEvents = new Map();

  for (const moduleId of eventsMap.keys()) {
    const moduleEvents = getEvents(moduleId, startTime, endTime);
    if (moduleEvents.length) {
      allEvents.set(moduleId, moduleEvents);
    }
  }

  return allEvents;
}

export { getAllModuleEvents, getEvents, notify };
