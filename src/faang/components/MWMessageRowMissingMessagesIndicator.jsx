/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import CometErrorBoundary from "CometErrorBoundary.react";
import { gt, lt, of_int32, sub } from "I64";
import MWEBRestoreGapUIWithEBCheck from "MWEBRestoreGapUIWithEBCheck.react";
import { MWPMessageListColumnGrow } from "MWPMessageListColumn.react";
import MWV2MessageRowSimple from "MWV2MessageRowSimple.react";

const fiveThousandMilliseconds = of_int32(5000);

function MWMessageRowMissingMessagesIndicator({
  lastEbMessageTime,
  message,
  nextMessage,
}) {
  const isEbMessageTimeConditionMet =
    lastEbMessageTime !== null &&
    gt(sub(lastEbMessageTime, message.timestampMs), fiveThousandMilliseconds);
  const isNextMessageConditionMet =
    nextMessage === null || lt(lastEbMessageTime, nextMessage.timestampMs);
  const shouldShowRestoreGapUI =
    isEbMessageTimeConditionMet && isNextMessageConditionMet;

  return shouldShowRestoreGapUI && MWEBRestoreGapUIWithEBCheck ? (
    <MWV2MessageRowSimple>
      <MWPMessageListColumnGrow>
        <CometErrorBoundary fallback={() => null}>
          <MWEBRestoreGapUIWithEBCheck />
        </CometErrorBoundary>
      </MWPMessageListColumnGrow>
    </MWV2MessageRowSimple>
  ) : null;
}

MWMessageRowMissingMessagesIndicator.displayName = `${MWMessageRowMissingMessagesIndicator.name} [from ${MWMessageRowMissingMessagesIndicator.id}]`;

export default MWMessageRowMissingMessagesIndicator;
