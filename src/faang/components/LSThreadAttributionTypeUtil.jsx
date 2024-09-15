/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable complexity */

import { to_string } from "../../helpers/I64";

import { ofNumber } from "./LSIntEnum";
import { LSMessagingThreadAttributionType } from "./LSMessagingThreadAttributionType";
import { getSource } from "./LSThreadAttributionStore";

const _getSource = (threadId, source) => {
  const attributionSource = getSource(
    { type: "MWLSEntrypoint", value: source },
    to_string(threadId)
  );

  if (attributionSource.type === "LSThreadAttribution")
    return attributionSource.value;

  const sourceValue = attributionSource.value;

  switch (sourceValue) {
    case "communityFriendsDialog":
    case "pagesHomeFriendsDialog":
    case "mutualFriendsDialog":
    case "birthday":
    case "groupMembers":
    case "fundraiserSupportersList":
    case "memories":
    case "feedPoll":
    case "reactorList":
    case "friendsList":
    case "pagesPrivateReply":
    case "timeline":
    case "feedOrganicPost":
      return ofNumber(LSMessagingThreadAttributionType.FB_FEED_ORGANIC_POST);
    case "inboxPendingRequests":
      return ofNumber(
        LSMessagingThreadAttributionType.MESSENGER_INBOX_PENDING_REQUESTS
      );
    case "fullscreenChat":
      return ofNumber(
        LSMessagingThreadAttributionType.MESSENGER_COMMUNITY_MESSAGING_FULLSCREEN_CHAT
      );
    case "sidebarGroupsList":
      return ofNumber(LSMessagingThreadAttributionType.SIDEBAR_CONTACTS_GROUPS);
    case "jewel":
      return ofNumber(LSMessagingThreadAttributionType.JEWEL_THREAD_LIST);
    case "shop":
      return ofNumber(
        LSMessagingThreadAttributionType.MINI_SHOP_VIEW_MENU_BUTTON
      );
    case "chatheadsOverflow":
      return ofNumber(LSMessagingThreadAttributionType.CHATHEADS_OVERFLOW);
    case "hovercard":
    case "feedDynamicHoverCard":
      return ofNumber(
        LSMessagingThreadAttributionType.FB_FEED_DYNAMIC_HOVER_CARD
      );
    case "search":
    case "messengerUniversalSearch":
      return ofNumber(
        LSMessagingThreadAttributionType.MESSENGER_UNIVERSAL_SEARCH
      );
    case "story":
    case "storyAggregatedUsers":
    case "storySeenByList":
      return ofNumber(LSMessagingThreadAttributionType.FB_STORY);
    case "pageAboutCard":
      return ofNumber(LSMessagingThreadAttributionType.FB_PAGE_ABOUT_CARD);
    case "inboxInThread":
      return ofNumber(
        LSMessagingThreadAttributionType.MESSENGER_INBOX_IN_THREAD
      );
    case "notificationInThreadReply":
      return ofNumber(
        LSMessagingThreadAttributionType.MESSENGER_NOTIFICATION_IN_THREAD_REPLY
      );
    case "archieve":
      return ofNumber(
        LSMessagingThreadAttributionType.MESSENGER_ARCHIVED_THREADS
      );
    case "storyViewerSheetRow":
      return ofNumber(
        LSMessagingThreadAttributionType.FB_STORY_VIEWER_SHEET_ROW
      );
    case "chatheadsNewMessage":
      return ofNumber(LSMessagingThreadAttributionType.CHATHEADS_NEW_MESSAGE);
    case "event":
      return ofNumber(LSMessagingThreadAttributionType.FB_EVENT);
    case "jewelSearch":
      return ofNumber(LSMessagingThreadAttributionType.JEWEL_SEARCH);
    case "inboxSpam":
    case "inboxThreadList":
    case "inboxRestricted":
      return ofNumber(LSMessagingThreadAttributionType.MESSENGER_INBOX);
    case "jewelNewMessage":
      return ofNumber(LSMessagingThreadAttributionType.JEWEL_NEW_MESSAGE);
    case "pendingRequests":
      return ofNumber(
        LSMessagingThreadAttributionType.MESSENGER_PENDING_REQUESTS_INBOX_THREAD_LIST
      );
    case "sidebarSearch":
      return ofNumber(LSMessagingThreadAttributionType.SIDEBAR_CONTACTS_SEARCH);
    case "inboxRemainingThreads":
      return ofNumber(
        LSMessagingThreadAttributionType.MESSENGER_INBOX_REMAINING_THREADS
      );
    case "pagesHeader":
      return ofNumber(
        LSMessagingThreadAttributionType.FB_PAGE_PROFILE_HEADER_MESSAGE_BUTTON
      );
    case "inboxRecentThreads":
      return ofNumber(
        LSMessagingThreadAttributionType.MESSENGER_INBOX_RECENT_THREADS
      );
    case "chatheads":
      return ofNumber(LSMessagingThreadAttributionType.CHATHEADS);
    case "pageResponsivenessCard":
      return ofNumber(
        LSMessagingThreadAttributionType.FB_PAGE_RESPONSIVENESS_CONTEXT_CARD
      );
    case "inboxSearch":
      return ofNumber(
        LSMessagingThreadAttributionType.MESSENGER_INBOX_MESSAGE_SEARCH
      );
    case "jewelNestedFolder":
      return ofNumber(LSMessagingThreadAttributionType.JEWEL_NESTED_FOLDER);
    case "marketplace":
      return ofNumber(
        LSMessagingThreadAttributionType.MARKETPLACE_SEND_MESSAGE
      );
    case "feedOrganicPostViewAndMessage":
      return ofNumber(
        LSMessagingThreadAttributionType.FB_FEED_ORGANIC_POST_VIEW_AND_MESSAGE
      );
    case "adsCta":
      return ofNumber(
        LSMessagingThreadAttributionType.CLICK_TO_MESSENGER_AD_SEND_MESSAGE_CTA
      );
    case "chatInThread":
      return ofNumber(
        LSMessagingThreadAttributionType.MESSENGER_CHAT_IN_THREAD
      );
    case "payments":
      return ofNumber(LSMessagingThreadAttributionType.PAYMENTS);
    case "inboxFolder":
      return ofNumber(
        LSMessagingThreadAttributionType.MESSENGER_INBOX_NESTED_FOLDER
      );
    case "inboxArchived":
      return ofNumber(
        LSMessagingThreadAttributionType.MESSENGER_INBOX_ARCHIVED_THREADS
      );
    case "inboxActiveContacts":
      return ofNumber(
        LSMessagingThreadAttributionType.MESSENGER_INBOX_ACTIVE_CONTACTS
      );
    case "sidebarContactsList":
      return ofNumber(LSMessagingThreadAttributionType.SIDEBAR_CONTACTS_LIST);
    case "sidebarCommunityChatsList":
      return ofNumber(
        LSMessagingThreadAttributionType.SIDEBAR_CONTACTS_COMMUNITY_CHATS
      );
    default:
      return ofNumber(LSMessagingThreadAttributionType.UNKNOWN);
  }
};

export { _getSource as getSource };
