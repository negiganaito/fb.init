/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { equal } from "../../helpers/I64";

import getMAWLocalizedFallbackMsgSnippet from "./getMAWLocalizedFallbackMsgSnippet";
import { ofNumber } from "./LSIntEnum";
import MAWLocalizationType from "./MAWLocalizationType";
import MAWSecurePlaceholderTombstone from "./MAWSecurePlaceholderTombstone";
import MAWUnavailablePlaceholder from "./MAWUnavailablePlaceholder";
import { MWPMessageListColumnShrinkwrap } from "./MWPMessageListColumn.react";
import MWV2TombstonedMessage from "./MWV2TombstonedMessage";

const MAWSecurePlaceholder = ({ actorId, message }) => {
  const displayedContentTypes = message.displayedContentTypes;
  const isOutgoing = equal(message.senderId, actorId);

  if (equal(displayedContentTypes, ofNumber(65536))) {
    return (
      <MWV2TombstonedMessage isOutgoing={isOutgoing}>
        {getMAWLocalizedFallbackMsgSnippet(
          MAWLocalizationType.USER_SEND_ENCRYPTED_MESSAGE
        )}
      </MWV2TombstonedMessage>
    );
  }

  if (equal(displayedContentTypes, ofNumber(131072))) {
    return (
      <MWV2TombstonedMessage isOutgoing={isOutgoing}>
        {getMAWLocalizedFallbackMsgSnippet(
          isOutgoing
            ? MAWLocalizationType.CURRENT_USER_SEND_UNRENDERABLE_MESSAGE
            : MAWLocalizationType.PARTICIPANT_SEND_UNRENDERABLE_MESSAGE
        )}
      </MWV2TombstonedMessage>
    );
  }

  if (equal(displayedContentTypes, ofNumber(524288))) {
    return (
      <MWV2TombstonedMessage isOutgoing={isOutgoing}>
        {getMAWLocalizedFallbackMsgSnippet(
          isOutgoing
            ? MAWLocalizationType.CURRENT_USER_SEND_LOCATION
            : MAWLocalizationType.PARTICIPANT_SEND_LOCATION
        )}
      </MWV2TombstonedMessage>
    );
  }

  if (equal(displayedContentTypes, ofNumber(1048576))) {
    return (
      <MWV2TombstonedMessage isOutgoing={isOutgoing}>
        {getMAWLocalizedFallbackMsgSnippet(
          isOutgoing
            ? MAWLocalizationType.CURRENT_USER_SEND_POLL_CREATION
            : MAWLocalizationType.PARTICIPANT_SEND_POLL_CREATION
        )}
      </MWV2TombstonedMessage>
    );
  }

  if (equal(displayedContentTypes, ofNumber(2097152))) {
    return (
      <MWV2TombstonedMessage isOutgoing={isOutgoing}>
        {getMAWLocalizedFallbackMsgSnippet(
          isOutgoing
            ? MAWLocalizationType.CURRENT_USER_SEND_CONTACT_SHARE
            : MAWLocalizationType.PARTICIPANT_SEND_CONTACT_SHARE
        )}
      </MWV2TombstonedMessage>
    );
  }

  if (equal(displayedContentTypes, ofNumber(4194304))) {
    return (
      <MWV2TombstonedMessage isOutgoing={isOutgoing}>
        {getMAWLocalizedFallbackMsgSnippet(
          isOutgoing
            ? MAWLocalizationType.CURRENT_USER_SEND_STORY_MENTION
            : MAWLocalizationType.PARTICIPANT_SEND_STORY_MENTION
        )}
      </MWV2TombstonedMessage>
    );
  }

  if (equal(displayedContentTypes, ofNumber(8388608))) {
    return (
      <MWV2TombstonedMessage isOutgoing={isOutgoing}>
        {getMAWLocalizedFallbackMsgSnippet(
          MAWLocalizationType.META_AI_SEND_MESSAGE
        )}
      </MWV2TombstonedMessage>
    );
  }

  if (equal(displayedContentTypes, ofNumber(16777216))) {
    return (
      <MWV2TombstonedMessage isOutgoing={isOutgoing}>
        {getMAWLocalizedFallbackMsgSnippet(
          isOutgoing
            ? MAWLocalizationType.CURRENT_USER_SEND_BUMP_MESSAGE
            : MAWLocalizationType.PARTICIPANT_SEND_BUMP_MESSAGE
        )}
      </MWV2TombstonedMessage>
    );
  }

  if (equal(displayedContentTypes, ofNumber(262144))) {
    return <MAWUnavailablePlaceholder isOutgoing={isOutgoing} />;
  }

  if (equal(displayedContentTypes, ofNumber(256))) {
    return (
      <MAWSecurePlaceholderTombstone
        isOutgoing={isOutgoing}
        message={message}
      />
    );
  }

  if (equal(displayedContentTypes, ofNumber(33554432))) {
    return (
      <MWV2TombstonedMessage isOutgoing={isOutgoing}>
        {getMAWLocalizedFallbackMsgSnippet(
          MAWLocalizationType.PARTICIPANT_SEND_BUMP_MESSAGE_ORIGINAL_UNAVAILABLE
        )}
      </MWV2TombstonedMessage>
    );
  }

  if (equal(displayedContentTypes, ofNumber(67108864))) {
    return (
      <MWV2TombstonedMessage isOutgoing={isOutgoing}>
        {getMAWLocalizedFallbackMsgSnippet(
          isOutgoing
            ? MAWLocalizationType.CURRENT_USER_SEND_STICKER_RECEIVER_FETCH_MESSAGE
            : MAWLocalizationType.PARTICIPANT_SEND_STICKER_RECEIVER_FETCH_MESSAGE
        )}
      </MWV2TombstonedMessage>
    );
  }

  return null;
};

MAWSecurePlaceholder.displayName = `${MAWSecurePlaceholder.name}`;

const MAWSecurePlaceholderContainer = ({ actorId, message }) => (
  <MWPMessageListColumnShrinkwrap>
    <div className="x1eb86dx x36qwtl xh8yej3" />
    <MAWSecurePlaceholder actorId={actorId} message={message} />
  </MWPMessageListColumnShrinkwrap>
);

MAWSecurePlaceholderContainer.displayName = `${MAWSecurePlaceholderContainer.name}`;

export default MAWSecurePlaceholderContainer;
