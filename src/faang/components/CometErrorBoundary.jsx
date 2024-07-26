/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useCallback, useContext } from "react";
import ErrorBoundary from "ErrorBoundary.react";
import { ErrorMetadata } from "fb-error";
import { InteractionTracingMetricsCore } from "interaction-tracing-metrics";
import useHeroFailTrigger from "useHeroFailTrigger";

import HeroCurrentInteractionForLoggingContext from "../../context/HeroCurrentInteractionForLoggingContext";
import useHeroErrorMetadata from "../../hooks/useHeroErrorMetadata";

const useCometErrorBoundary = () => {
  const heroInteractionContext = useContext(
    HeroCurrentInteractionForLoggingContext
  );
  const heroFailTrigger = useHeroFailTrigger();

  return useCallback(
    (error) => {
      const interactionUUID = heroInteractionContext.current?.interactionUUID;
      if (!interactionUUID) return;

      const tracingMetrics = InteractionTracingMetricsCore.get(interactionUUID);
      const annotations = tracingMetrics?.annotations?.int;

      if (annotations?.failOnCometErrorBoundaryEnabled === 1) {
        heroFailTrigger({ error });
      }

      if (
        annotations?.failOnCometErrorBoundaryEnabled === 1 ||
        annotations?.failOnCometErrorBoundaryAnnotated === 1
      ) {
        InteractionTracingMetricsCore.addAnnotationInt(
          interactionUUID,
          "failedOnCometErrorBoundary",
          1
        );
      }
    },
    [heroInteractionContext, heroFailTrigger]
  );
};

const CometErrorBoundary = forwardRef((props, ref) => {
  const { augmentError, onError, type, ...restProps } = props;
  const heroErrorMetadata = useHeroErrorMetadata();
  const cometErrorBoundaryHandler = useCometErrorBoundary();

  const handleError = useCallback(
    (error, info) => {
      cometErrorBoundaryHandler(error);
      if (onError) onError(error, info);
    },
    [onError, cometErrorBoundaryHandler]
  );

  const handleAugmentError = useCallback(
    (error) => {
      if (augmentError) augmentError(error);
      heroErrorMetadata(error);
      if (type) {
        error.type = type;
        const metadata = error.metadata || new ErrorMetadata();
        error.metadata = metadata;
        metadata.addEntry(
          "COMET_INFRA",
          "EXPLICITLY_MARKED_ERROR_BOUNDARY",
          "true"
        );
      }
    },
    [augmentError, heroErrorMetadata, type]
  );

  return (
    <ErrorBoundary
      {...restProps}
      augmentError={handleAugmentError}
      fallback={props.fallback}
      onError={handleError}
      ref={ref}
    />
  );
});

CometErrorBoundary.displayName = `${CometErrorBoundary.name} [from ${module.id}]`;

export default CometErrorBoundary;
