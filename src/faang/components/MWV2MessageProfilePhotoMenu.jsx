/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { usePreloadedQuery } from "CometRelay";
import emptyFunction from "emptyFunction";
import { has as hasBitOffset } from "LSContactBitOffset";
import { ofNumber } from "LSIntEnum";
import { is_msplit_account } from "MessengerMSplitFlag";
import MWCMAdmodActionMenuItemsWrapper from "MWCMAdmodActionMenuItemsWrapper.react";
import MWCMIsAnyCMThread from "MWCMIsAnyCMThread";
import MWLSGroupMembershipBlockOrUnblockMenuItem from "MWLSGroupMembershipBlockOrUnblockMenuItem.react";
import MWLSGroupMembershipMessageUserMenuItem from "MWLSGroupMembershipMessageUserMenuItem.react";
import MWLSGroupMembershipViewProfileMenuItem from "MWLSGroupMembershipViewProfileMenuItem.react";
import MWV2MessageProfilePhotoMenuQuery from "MWV2MessageProfilePhotoMenuQuery.graphql";
import MWXMenu from "MWXMenu.react";

import { equal, to_string } from "../../helpers/I64";
import useReStore from "../../hooks/useReStore";

import { ReQL } from "./ReQL";
import { useFirst } from "./ReQLSuspense";

// eslint-disable-next-line complexity
const MWV2MessageProfilePhotoMenu = ({ props }) => {
  const { isGroupThread, message, onClose } = props;
  const { messageProfilePhotoMenuQueryRef } = props.queries;
  const data = usePreloadedQuery(
    MWV2MessageProfilePhotoMenuQuery,
    messageProfilePhotoMenuQueryRef
  );

  const canSeeBanInChatEducation =
    data.group?.if_viewer_can_see_ban_in_chat_education ?? false;
  const groupChat = data.group?.fb_group_chats?.nodes?.find(
    (node) => node?.id === to_string(message.threadKey)
  );

  const isChatHost = groupChat?.isChatHost ?? false;
  const isAdmin = groupChat?.isAdmin ?? false;
  const isModerator = groupChat?.isModerator ?? false;

  const store = useReStore();
  const thread = useFirst(
    () =>
      ReQL.fromTableAscending(store.tables.threads).getKeyRange(
        message.threadKey
      ),
    [store, message.threadKey]
  );
  const contact = useFirst(
    () =>
      ReQL.fromTableAscending(store.tables.contacts).getKeyRange(
        message.senderId
      ),
    [store, message.senderId]
  );

  const hasBitOffset77 = (contact) =>
    contact !== null ? hasBitOffset(77, contact) : false;
  const isGenerativeAIBot = (contact) =>
    contact !== null
      ? equal(contact?.contactTypeExact, ofNumber("GENERATIVE_AI_BOT"))
      : false;

  const viewProfileMenuItem =
    contact !== null &&
    !is_msplit_account &&
    thread !== null &&
    !hasBitOffset77(contact) &&
    !isGenerativeAIBot(contact) ? (
      <MWLSGroupMembershipViewProfileMenuItem
        contactId={contact.id}
        isIgUser={false}
        onCloseDialog={onClose ?? emptyFunction}
        secondaryName={contact.secondaryName}
      />
    ) : null;

  const messageUserMenuItem =
    contact !== null &&
    thread !== null &&
    !hasBitOffset77(contact) &&
    (isGroupThread || isGenerativeAIBot(contact)) ? (
      <MWLSGroupMembershipMessageUserMenuItem contactId={contact.id} />
    ) : null;

  const blockOrUnblockMenuItem =
    contact !== null &&
    thread !== null &&
    !hasBitOffset77(contact) &&
    !isGenerativeAIBot(contact) ? (
      <MWLSGroupMembershipBlockOrUnblockMenuItem
        contactId={contact.id}
        thread={thread}
      />
    ) : null;

  const showAdmodActionMenuItems =
    (isChatHost || isAdmin || isModerator) &&
    thread !== null &&
    contact !== null &&
    MWCMIsAnyCMThread(thread.threadType) &&
    !hasBitOffset77(contact);
  const admodActionMenuItems = showAdmodActionMenuItems ? (
    <MWCMAdmodActionMenuItemsWrapper
      contactId={contact.id}
      isBanInChatEnabled={canSeeBanInChatEducation}
      isChatHost={isChatHost}
      parentSurface="thread_view"
      surface="profile_photo_menu_popover"
      thread={thread}
    />
  ) : null;

  if (
    viewProfileMenuItem === null &&
    messageUserMenuItem === null &&
    admodActionMenuItems === null
  ) {
    return null;
  }

  return (
    <MWXMenu aria-label="ARIA_LABEL_PLACEHOLDER_FIXME" size="small" withArrow>
      {messageUserMenuItem}
      {viewProfileMenuItem}
      {blockOrUnblockMenuItem}
      {admodActionMenuItems}
    </MWXMenu>
  );
};

MWV2MessageProfilePhotoMenu.displayName = `${MWV2MessageProfilePhotoMenu.name} [from ${MWV2MessageProfilePhotoMenu.displayName}]`;

export default MWV2MessageProfilePhotoMenu;
