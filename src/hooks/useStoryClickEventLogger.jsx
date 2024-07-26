/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useContext } from "react";

import CometTrackingNodesContext from "../context/CometTrackingNodesContext";

import { isDataUrl } from "./DataUrlUtils"; // Replace with the correct import path
import { getAbsoluteUrl } from "./getAbsoluteUrl"; // Replace with the correct import path
import { isMailToLink } from "./MailLinkUtils"; // Replace with the correct import path
import {
  CometFeedClickEventsLoggerContext,
  CometFeedLoggingExtraFieldsContext,
  CometTrackingCodeContext,
} from "./your-context-paths"; // Replace with the correct import paths

const useStoryClickEventLogger = () => {
  const loggerContext = useContext(CometFeedClickEventsLoggerContext);
  const trackingNodes = useContext(CometTrackingNodesContext);
  const trackingCode = useContext(CometTrackingCodeContext);
  const encryptedTracking = trackingCode.encrypted_tracking[0];
  const extraFields = useContext(CometFeedLoggingExtraFieldsContext);

  const logEvent = useCallback(
    // eslint-disable-next-line max-params
    (timestamp, eventType, url, eventId) => {
      let finalUrl = url;
      if (!isMailToLink(url) && !isDataUrl(url)) {
        finalUrl = getAbsoluteUrl(url);
      }
      loggerContext(
        timestamp,
        trackingNodes,
        encryptedTracking,
        eventType,
        finalUrl,
        extraFields,
        eventId
      );
    },
    [loggerContext, trackingNodes, encryptedTracking, extraFields]
  );

  return logEvent;
};

export default useStoryClickEventLogger;
