/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useState } from "react";
import stylex from "@stylexjs/stylex";

import MWPEditMessageHistoryListText from "./MWPEditMessageHistoryListText";
import MWXMessageBubble from "./MWXMessageBubble";

const styles = {
  border: {
    boxShadow: "x7h7r2v",
    ,
  },
  inner: {
    display: "x78zum5",
    flexGrow: "x1iyjqo2",
    flexShrink: "xs83m0k",
    marginBottom: "xjpr12u",
    minWidth: "xeuugli",
    opacity: "xbyyjgo",
    ,
  },
  makeSpaceForMessageActions: {
    maxWidth: "x1no2skz",
    ,
  },
  messageBubbleIncoming: {
    paddingEnd: "x1k62owy",
    ,
  },
  messageBubbleOutgoing: {
    paddingStart: "x6plb61",
    ,
  },
  outgoing: {
    flexDirection: "x15zctf7",
    ,
  },
};

function MWPEditedMessageHistoryEntry({
  isReply,
  isSecureMessage,
  messageHistoryEntry,
  outgoing,
  renderMessageActions,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const linkProps = {
    color: outgoing ? "white" : undefined,
    weight: "semibold",
  };

  return (
    <div
      className={stylex(styles.inner, outgoing && styles.outgoing)}
      data-testid={undefined}
      onMouseEnter={() => {
        if (renderMessageActions) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (renderMessageActions) setIsHovered(false);
      }}
      role="none"
    >
      <div
        className={stylex(
          renderMessageActions
            ? styles.makeSpaceForMessageActions
            : outgoing
            ? styles.messageBubbleOutgoing
            : styles.messageBubbleIncoming
        )}
      >
        <MWXMessageBubble
          align={outgoing ? "right" : "left"}
          color={outgoing ? "outgoing" : "incoming"}
          connectBottom={false}
          connectTop={false}
          variant="opaque"
          xstyle={!outgoing && isReply && styles.border}
        >
          <MWPEditMessageHistoryListText
            isSecureMessage={isSecureMessage}
            maxLength={300}
            maxLines={3}
            outgoing={outgoing}
            ranges={[]}
            seeLessLinkProps={linkProps}
            seeMoreLinkProps={linkProps}
            text={messageHistoryEntry.messageContent || ""}
            truncationStyle="see-more-and-less"
          />
        </MWXMessageBubble>
      </div>
      {renderMessageActions && isHovered && (
        <div className="xc26acl x78zum5">
          {renderMessageActions(messageHistoryEntry)}
        </div>
      )}
    </div>
  );
}

MWPEditedMessageHistoryEntry.displayName = `${MWPEditedMessageHistoryEntry.name} [from ${module.id}]`;

export { MWPEditedMessageHistoryEntry };
