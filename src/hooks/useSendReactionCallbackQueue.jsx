/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useRef, useState } from "react";

const IDLE_TIMEOUT = 1000;
const EXECUTION_INTERVAL = 1500;

const useSendReactionCallbackQueue = () => {
  const queueRef = useRef(new Map());
  const timeoutRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const queueSendReactionCallback = (key, callback) => {
    setIsProcessing(true);
    window.clearTimeout(timeoutRef.current);
    queueRef.current.set(key, callback);
    timeoutRef.current = window.setTimeout(processQueue, EXECUTION_INTERVAL);
  };

  const processQueue = () => {
    if (queueRef.current.size > 0) {
      setIsProcessing(true);
      const [key, callback] = Array.from(queueRef.current.entries())[0];
      callback();
      queueRef.current.delete(key);
      timeoutRef.current = window.setTimeout(processQueue, EXECUTION_INTERVAL);
    } else {
      finishProcessing();
    }
  };

  const finishProcessing = () => {
    window.setTimeout(() => {
      timeoutRef.current = null;
      setIsProcessing(false);
    }, IDLE_TIMEOUT);
  };

  return [queueSendReactionCallback, isProcessing];
};

export default useSendReactionCallbackQueue;
