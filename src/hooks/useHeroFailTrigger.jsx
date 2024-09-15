/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useContext } from "react";
import performanceNow from "fbjs/lib/performanceNow";

import HeroInteractionContext from "../context/CometHeroInteractionContext";
import HeroCurrentInteractionForLoggingContext from "../context/HeroCurrentInteractionForLoggingContext";
import InteractionTracingMetricsCore from "../faang/components/InteractionTracingMetricsCore";

const MAX_DESCRIPTION_LENGTH = 1000;

function truncateDescription(description) {
  description = description ?? "";
  return description.length > MAX_DESCRIPTION_LENGTH
    ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
    : description;
}

function useHeroFailTrigger() {
  const currentInteraction = useContext(
    HeroCurrentInteractionForLoggingContext
  );
  const interactionContext = useContext(HeroInteractionContext.Context);

  return useCallback(
    ({ description, error }) => {
      let errorMessage = error?.message;
      if (error?.messageFormat) {
        let index = 0;
        errorMessage = error.messageFormat.replace(/%s/g, () =>
          error.messageParams ? error.messageParams[index++] : "unknown"
        );
      }

      description =
        errorMessage === null && description === null
          ? "unknown"
          : [
              truncateDescription(description),
              truncateDescription(errorMessage),
            ]
              .filter(Boolean)
              .join(", ");
      const interactionUUID = currentInteraction.current?.interactionUUID;

      if (interactionUUID === null) return;

      const interaction = InteractionTracingMetricsCore.get(interactionUUID);
      if (interaction?.annotations?.int?.isError === 1) return;

      InteractionTracingMetricsCore.addMetadata(interactionUUID, "isError", 1);
      InteractionTracingMetricsCore.addMetadata(
        interactionUUID,
        "errorComponent",
        description
      );

      const pageletStack = interactionContext.pageletStack;
      if (interaction) {
        InteractionTracingMetricsCore.addSubspan(
          interactionUUID,
          `Error: ${description}`,
          "HeroTracing",
          interaction.start,
          performanceNow(),
          {
            pagelet: pageletStack[pageletStack.length - 1],
            pageletStack,
            spanType: "Error",
          }
        );
      }
    },
    [interactionContext, currentInteraction]
  );
}

export default useHeroFailTrigger;
