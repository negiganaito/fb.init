/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback } from "react";

import { getSource } from "../faang/components/LSThreadAttributionTypeUtil";

import useLSMessagingSource from "./useLSMessagingSource";

const useMWLSDefaultThreadSource = () => {
  const messagingSource = useLSMessagingSource();

  return useCallback(
    (thread) => getSource(thread, messagingSource),
    [messagingSource]
  );
};

export default useMWLSDefaultThreadSource;
