/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { FBLogger } from "./FBLogger";
import useStoryClickEventLogger from "./useStoryClickEventLogger";

const useFeedPressEventHandler = (customCallback, additionalData) => {
  const logEvent = useStoryClickEventLogger();
  const customLogger = additionalData !== null ? additionalData : () => {};

  return useCallback(
    (event) => {
      try {
        customLogger(event);
      } catch (error) {
        FBLogger("voyage").catching(error).mustfix("Voyage press logger threw");
      }

      if (customCallback) {
        customCallback(event);
      }

      const { buttons, timeStamp, type } = event;
      if (
        type === "click" ||
        type === "press" ||
        type === "contextmenu" ||
        (type === "pressstart" && buttons === 4)
      ) {
        const eventType = type === "contextmenu" ? 2 : buttons === 4 ? 1 : 0;
        const eventId = uuidv4();
        logEvent(timeStamp, eventType, additionalData, eventId);
      }
    },
    [customCallback, logEvent, additionalData, customLogger]
  );
};

export default useFeedPressEventHandler;
