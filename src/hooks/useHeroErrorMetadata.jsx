/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useContext } from "react";

import HeroCurrentInteractionForLoggingContext from "../context/HeroCurrentInteractionForLoggingContext";
import { Context } from "../context/HeroInteractionContext";
import InteractionTracingMetricsCore from "../faang/components/InteractionTracingMetricsCore";
import { getMarkerId } from "../faang/components/QPLEvent";
import FBError from "../helpers/fb-error";

const useHeroErrorMetadata = () => {
  const heroCurrentInteraction = useContext(
    HeroCurrentInteractionForLoggingContext
  );
  const heroInteractionContext = useContext(Context);
  const pageletStack = heroInteractionContext.pageletStack;

  return useCallback(
    (error) => {
      let metadata = error.metadata ?? new FBError.ErrorMetadata();
      error.metadata = metadata;

      const interactionUUID = heroCurrentInteraction.current?.interactionUUID;
      if (interactionUUID !== null) {
        const tracingMetrics =
          InteractionTracingMetricsCore.get(interactionUUID);

        if (pageletStack !== null) {
          metadata.addEntry(
            "COMET_INFRA",
            "INTERACTION_PAGELET_STACK",
            pageletStack.join(",")
          );
        }

        if (tracingMetrics !== null && tracingMetrics.qplAction === null) {
          if (tracingMetrics.qplEvent !== null) {
            metadata.addEntry(
              "COMET_INFRA",
              "INTERACTION_QPL_EVENT",
              String(getMarkerId(tracingMetrics.qplEvent))
            );
          }
          if (tracingMetrics.tracePolicy !== null) {
            metadata.addEntry(
              "COMET_INFRA",
              "INTERACTION_TRACE_POLICY",
              tracingMetrics.tracePolicy
            );
          }
        }
      }
    },
    [heroCurrentInteraction, pageletStack]
  );
};

export default useHeroErrorMetadata;
