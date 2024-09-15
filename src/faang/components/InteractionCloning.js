/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { v4 as uuidv4 } from "uuid";

import { InteractionTracingMetricsCore } from "./interaction-tracing-metrics";
import { getTraceStatus, initQPL, logQPL } from "./InteractionTracingLogger";
import { getMarkerId } from "./QPLEvent";

function getClonedInteraction(interaction) {
  const clonedInteractionId =
    interaction.annotations?.string?.clonedInteractionId;
  return clonedInteractionId !== null
    ? InteractionTracingMetricsCore.get(clonedInteractionId)
    : null;
}

function addAnnotationCloneSafe(interaction, key, value) {
  const clonedInteraction = getClonedInteraction(interaction);
  if (clonedInteraction) {
    if (clonedInteraction.annotations === interaction.annotations) {
      interaction.annotations = { ...interaction.annotations };
    }
    if (
      clonedInteraction.annotations.string === interaction.annotations.string
    ) {
      interaction.annotations.string = { ...interaction.annotations.string };
    }
    InteractionTracingMetricsCore.addAnnotation(
      interaction.traceId,
      key,
      value
    );
  }
}

function addTagCloneSafe(interaction, key, value) {
  const clonedInteraction = getClonedInteraction(interaction);
  if (clonedInteraction) {
    if (clonedInteraction.tagSet === interaction.tagSet) {
      interaction.tagSet = { ...interaction.tagSet };
    }
    InteractionTracingMetricsCore.addTag(interaction.traceId, key, value);
  }
}

// eslint-disable-next-line max-params
function addMarkerPointCloneSafe(interaction, key, value, timestamp) {
  const clonedInteraction = getClonedInteraction(interaction);
  if (clonedInteraction) {
    if (clonedInteraction.markerPoints === interaction.markerPoints) {
      interaction.markerPoints = { ...interaction.markerPoints };
    }
    InteractionTracingMetricsCore.addMarkerPoint(
      interaction.traceId,
      key,
      value,
      timestamp
    );
  }
}

// eslint-disable-next-line max-params
function addSubspanCloneSafe(
  interaction,
  key,
  value,
  startTime,
  endTime,
  duration
) {
  const clonedInteraction = getClonedInteraction(interaction);
  if (clonedInteraction) {
    if (clonedInteraction.subSpans === interaction.subSpans) {
      interaction.subSpans = { ...interaction.subSpans };
    }
    InteractionTracingMetricsCore.addSubspan(
      interaction.traceId,
      key,
      value,
      startTime,
      endTime,
      duration
    );
  }
}

// eslint-disable-next-line max-params
function cloneAndStart(
  interaction,
  qplEvent,
  debugName,
  config,
  dependencies,
  loggerData
) {
  const newTraceId = uuidv4();
  let clonedInteraction = InteractionTracingMetricsCore.addTracedInteraction(
    newTraceId,
    interaction.start,
    () => {}
  );
  clonedInteraction = Object.assign(clonedInteraction, interaction);
  clonedInteraction.traceId = newTraceId;
  clonedInteraction.annotations = { ...interaction.annotations };
  clonedInteraction.annotations.string = { ...interaction.annotations.string };

  InteractionTracingMetricsCore.addAnnotation(
    newTraceId,
    "clonedInteractionId",
    interaction.traceId
  );
  addAnnotationCloneSafe(clonedInteraction, "interactionId", newTraceId);
  addTagCloneSafe(clonedInteraction, "traceID", newTraceId);

  clonedInteraction.qplEvent = qplEvent;
  clonedInteraction.debugName = debugName;

  initQPL(config, dependencies, qplEvent, clonedInteraction.start, loggerData, {
    qplMarkerType: config.qplMarkerType,
  });

  const traceDetails = {
    interaction_class: clonedInteraction.interactionClass,
    interaction_id: clonedInteraction.traceId,
    qpl_marker_id: `${getMarkerId(qplEvent)}`,
    sample_rate: 1,
    trace_policy: clonedInteraction.tracePolicy,
    type: "INTERACTION",
  };

  const loomTrace = dependencies.WebLoom?.startTrace(
    clonedInteraction.traceId,
    traceDetails,
    clonedInteraction.start + config.appStart
  );
  const loomRefId = loomTrace?.traceReferenceId;

  if (loomRefId !== null) {
    addAnnotationCloneSafe(clonedInteraction, "loomRefId", loomRefId);
  }

  return clonedInteraction;
}

// eslint-disable-next-line max-params
function logClone(interaction, qplEvent, event, config, dependencies) {
  const traceStatus = getTraceStatus(interaction);
  const logEvent = logQPL(
    event,
    config,
    qplEvent,
    traceStatus,
    interaction,
    dependencies
  );
  dependencies.WebLoom?.endTraceForInteraction(interaction, logEvent);
}

const InteractionCloning = {
  addMarkerPointCloneSafe,
  addSubspanCloneSafe,
  // eslint-disable-next-line max-params
  clone(interaction, qplEvent, debugName, loggerData) {
    const trace = interaction.getTrace();
    if (!trace) return;

    const { cfg: config, deps: dependencies } =
      interaction.getConfigAndDependencies();
    const clonedInteraction = cloneAndStart(
      trace,
      qplEvent,
      debugName,
      config,
      dependencies,
      loggerData
    );
    logClone(clonedInteraction, qplEvent, loggerData, config, dependencies);
  },
  cloneAndStart,
  log: logClone,
};

export default InteractionCloning;
