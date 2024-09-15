/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { of_string, zero } from "../../helpers/I64";

function getMessageId(entity) {
  if (entity.type === "sent") {
    return entity.value.messageId;
  }
}

function getThreadId(entity) {
  if (entity.type === "sent") {
    return entity.value.threadId;
  }
}

function getTimestamp(entity) {
  if (entity.type === "sent") {
    return entity.value.timestamp;
  }
}

function makeSent(threadId, messageId, timestamp) {
  return {
    type: "sent",
    value: {
      messageId,
      threadId: of_string(threadId),
      timestamp: of_string(timestamp),
    },
  };
}

function emptyForExamplesWithId(messageId) {
  return {
    type: "sent",
    value: {
      messageId,
      threadId: zero,
      timestamp: zero,
    },
  };
}

const emptyForExamples = {
  type: "sent",
  value: {
    messageId: "",
    threadId: zero,
    timestamp: zero,
  },
};

export {
  emptyForExamples,
  emptyForExamplesWithId,
  getMessageId,
  getThreadId,
  getTimestamp,
  makeSent,
};
