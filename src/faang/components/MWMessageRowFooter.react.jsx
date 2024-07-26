/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import MWClickToReavealMustachTextInPinnedMessageList from "MWClickToReavealMustachTextInPinnedMessageList.react";
import { isAlwaysShownStatus } from "MWMessageDeliveryStatus";
import { MWPBaseMessageListRowFooter } from "MWPBaseMessageListRow.react";
import { MWV2MessageEndOfGroupContent } from "MWV2MessageEndOfGroupContent.react";

function MWMessageRowFooter({
  displayMode,
  hasClickState,
  incoming,
  isBroadcastThread,
  isFromBlockedContact,
  isLastMessage,
  message,
  nextMessage,
  outgoing,
  status,
}) {
  if (displayMode === "standard") {
    return (
      <MWPBaseMessageListRowFooter
        message={message}
        nextMessage={nextMessage}
        showContent={hasClickState || isAlwaysShownStatus(status)}
      >
        {() => (
          <MWV2MessageEndOfGroupContent
            alignLeft={hasClickState && incoming}
            hasTextBasedMessageReceipts={true}
            isFromBlockedContact={isFromBlockedContact}
            isLastMessage={isLastMessage}
            isOutgoing={outgoing}
            isTextOnly={isBroadcastThread}
            message={message}
            status={status}
          />
        )}
      </MWPBaseMessageListRowFooter>
    );
  }

  if (displayMode === "pinnedMessages") {
    return isFromBlockedContact ? (
      <MWClickToReavealMustachTextInPinnedMessageList
        isLastMessage={isLastMessage}
        message={message}
        nextMessage={nextMessage}
      />
    ) : null;
  }

  return null;
}

MWMessageRowFooter.displayName = `${MWMessageRowFooter.name} [from ${MWMessageRowFooter.id}]`;

export default MWMessageRowFooter;
