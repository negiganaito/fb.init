/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useMWLSThreadDisplayContext } from "../context/MWLSThreadDisplayContext";

const useLSMessagingSource = () => {
  const context = useMWLSThreadDisplayContext();

  switch (context) {
    case "Inbox":
      return "inboxInThread";
    case "FullscreenChat":
      return "fullscreenChat";
    case "ChatTab":
      return "chatInThread";
    default:
      return "unknown";
  }
};

export default useLSMessagingSource;
