/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import BaseMiddot from "BaseMiddot.react";
import MWForwardedContent from "MWForwardedContent.react";
import MWPBaseMessageRowHeader from "MWPBaseMessageRowHeader.react";
import MWPMessagePinnedText from "MWPMessagePinnedText.react";
import MWReplySnippet from "MWReplySnippet.react";
import MWXText from "MWXText.react";

function MWMessageRowHeader({
  isCMThread,
  isFirstMessageInGroup,
  isGroupThread,
  isPinnedMessageList,
  isStandardMessageList,
  message,
  outgoing,
  threadType,
}) {
  const renderTextWrapper = (text) => (
    <MWXText color="secondary" type="meta4">
      {text}
    </MWXText>
  );

  return (
    <MWPBaseMessageRowHeader
      alwaysRenderSenderName={isPinnedMessageList}
      isAnyCMThread={isCMThread}
      isFirstMessageInGroup={isFirstMessageInGroup}
      isGroupThread={isGroupThread}
      message={message}
      outgoing={outgoing}
      renderForwardSnippet={() => (
        <MWForwardedContent
          message={message}
          outgoing={outgoing}
          threadType={threadType}
        />
      )}
      renderPinnedText={(text, hasDivider) =>
        isStandardMessageList ? (
          <MWPMessagePinnedText
            divider={hasDivider && <BaseMiddot />}
            message={message}
          />
        ) : null
      }
      renderReplySnippet={() => (
        <MWReplySnippet message={message} outgoing={outgoing} />
      )}
      renderTextWrapper={renderTextWrapper}
      renderTimestamp={isPinnedMessageList ? renderTextWrapper : undefined}
    />
  );
}

MWMessageRowHeader.displayName = `${MWMessageRowHeader.name} [from ${MWMessageRowHeader.id}]`;

export default MWMessageRowHeader;
