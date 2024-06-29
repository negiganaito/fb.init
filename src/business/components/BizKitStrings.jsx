/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import * as BizKitPermissionDisclosureLoggingUtils from "BizKitPermissionDisclosureLoggingUtils";
import * as BusinessAccountRenameGating from "BusinessAccountRenameGating";
import { fbt as h } from "fbt";
import formatDate from "formatDate";
import GeoLink from "GeoLink.react";
import getShouldUseNomen from "getShouldUseNomen";
import Image from "Image.react";
import { ix as i } from "ix";
import Link from "Link.react";
import * as LWICometContentConsistencyConstants from "LWICometContentConsistencyConstants";
import URI from "URI";

const BizKitStrings = {
  SIDEBAR_SECTION_LABEL: h._("Links"),
  MORE_PROMINENT_OPT_OUT_MODAL_HEADER: h._("Switch back to old version?"),
  MORE_PROMINENT_OPT_OUT_MODAL_SUBTEXT_1: h._(
    "Moving forward, you'll be redirected to Business Manager instead of Meta Business Suite. To switch back to Meta Business Suite, go to the Business Tools menu in Business Manager."
  ),
  MORE_PROMINENT_OPT_OUT_MODAL_SUBTEXT_2: h._(
    "Posts scheduled in Meta Business Suite will be published as planned. You won't be able to see or manage these posts in Business Manager."
  ),
  OPT_OUT_AFTER_LAUNCH: h._("Switch to Business Manager"),
  GO_TO_BUSINESS_MANAGER: h._("Go to Business Manager"),
  OPT_OUT_DESCRIPTION_AFTER_LAUNCH: h._(
    "You'll no longer be redirected to Meta Business Suite."
  ),
  REDIRECTION_TO_BM_DESCRIPTION: h._(
    "You’ll still be able to access Meta Business Suite at any time."
  ),
  OPT_OUT_SWITCH_AFTER_LAUNCH: h._("Switch"),
  AUTOMATED_RESPONSES: h._("Automated responses"),
  HELP: h._("Help"),
  CONTACT_US: h._("Need help? Talk to us."),
  GIVE_FEEDBACK: h._("Give feedback"),
  SETTINGS_AND_HELP: h._("Settings & help"),
  CREATE_APPOINTMENT: h._("Create Appointment"),
  CREATE_POST: h._("Create post"),
  EDIT_PUBLISHED_POST: h._("Edit published post"),
  EDIT_SCHEDULED_POST: h._("Edit scheduled post"),
  EDIT_STORY: h._("Edit story"),
  EDIT_DRAFT_POST: h._("Edit draft post"),
  SHARE_POST_TO_STORY: h._("Share post to story"),
  SHARE_TO_STORY: h._("Share to story"),
  RESHARE_TO_STORY: h._("Add to your story"),
  CREATE_STORY: h._("Create story"),
  CREATE_LIVE: h._("Go live"),
  CREATE_EVENT: h._("Create event"),
  CREATE_MARKETING_EMAIL: h._("Create Marketing Email"),
  CREATE: h._("Create"),
  MSG_ICEBREAKER_API_SET_ALERT_HEADER: h._(
    "Frequently asked questions on Messenger can’t be edited"
  ),
  MSG_ICEBREAKER_API_SET_ALERT_BODY: h._(
    "Your frequently asked questions are connected to an API and can't be edited in Inbox"
  ),
  IGD_ICEBREAKER_ALERT_HEADER: h._(
    "Frequently asked questions on Instagram can’t be edited"
  ),
  IGD_ICEBREAKER_PROFESSIONAL_ACCOUNT_ALERT_BODY: h._(
    "Your connected Instagram account is a personal account. Switch your Instagram account to a professional account to access frequently asked questions. You can switch account by going to Instagram app setting -> account -> switch account."
  ),
  IGD_ICEBREAKER_IGDM_ALERT_BODY: h._(
    "Instagram is unavailable in Inbox until you confirm message access for the people who manage your Page."
  ),
  IGD_ICEBREAKER_IGDM_ALERT_BUTTON: h._("Go to settings"),
  BIZ_INBOX_THREADLIST_INSTAGRAM_MESSAGES_ACCESS_TITLE: h._(
    "Confirm Instagram message access"
  ),
  BIZ_INBOX_THREADLIST_INSTAGRAM_MESSAGES_ACCESS_DESCRIPTION: h._(
    "Instagram messages are unavailable until you confirm that people who manage your Facebook Page can also manage your Instagram messages."
  ),
  BIZ_INBOX_THREADLIST_INSTAGRAM_MESSAGES_ACCESS_BUTTON: h._("Get started"),
  BIZ_INBOX_THREADLIST_INSTAGRAM_CONNECT_TITLE: h._(
    "Connect Instagram to Inbox"
  ),
  BIZ_INBOX_THREADLIST_INSTAGRAM_CONNECT_DESCRIPTION_MANAGE_MESSAGE: h._(
    "Manage all your messages in one place by connecting Instagram to Inbox"
  ),
  BIZ_INBOX_THREADLIST_INSTAGRAM_CONNECT_DESCRIPTION_ROLE_SETTING: h._(
    "Depending on their role, people who manage your Facebook Page or Instagram account may have access to view and respond to Instagram messages in Inbox"
  ),
  BIZ_INBOX_THREADLIST_INSTAGRAM_CONNECT_BUTTON: h._("Connect"),
  SEE_ALL: h._("See all"),
  SEE_ALL_POSTS: h._("See all posts"),
  SEE_ALL_POSTS_AND_REELS: h._("See all posts & reels"),
  UPDATES: h._("Updates"),
  ACTIVITY: h._("Activity"),
  NOTIFICATIONS: h._("Notifications"),
  REACH: getShouldUseNomen()
    ? h._("Accounts Center accounts Reached")
    : h._("People reached"),
  COMMENTS: h._("Comments"),
  MARK_AS_UNREAD: h._("Mark as unread"),
  MARK_AS_READ: h._("Mark as read"),
  WELCOME_MODAL_HEADER: h._("Welcome to Meta Business Suite"),
  OK: h._("Ok"),
  PERMISSION_DISCLOSURE_MODAL_HEADING: h._("Confirm access"),
  PERMISSION_DISCLOSURE_MODAL_SECOND_PARAGRAPH: h._(
    "Depending on Facebook Page roles, people may manage content, inboxes, settings and permissions for Facebook and Instagram, including things like:"
  ),
  PERMISSION_DISCLOSURE_MODAL_ENTITY_POSTS: h._("Posts and stories"),
  PERMISSION_DISCLOSURE_MODAL_ENTITY_ADS: h._("Ads and comments on them"),
  PERMISSION_DISCLOSURE_MODAL_ENTITY_MESSAGES: h._("Messages and comments"),
  PERMISSION_DISCLOSURE_MODAL_ENTITY_CONTACTS: h._(
    "Business contact information"
  ),
  PERMISSION_DISCLOSURE_MODAL_BUTTON_LABEL_CONFIRM: h._("Confirm"),
  PERMISSION_DISCLOSURE_MODAL_ERROR_HEADER: h._("Something went wrong"),
  PERMISSION_DISCLOSURE_MODAL_ERROR_MESSAGE: h._("Please try again later."),
  PERMISSION_DISCLOSURE_MODAL_SUCCESS_HEADER: h._("Access confirmed"),
  PERMISSION_DISCLOSURE_MODAL_SUCCESS_MESSAGE: h._(
    "Now people who manage your Facebook Page can manage things on Instagram."
  ),
  PERMISSION_DISCLOSURE_MODAL_BUTTON_LABEL_TRY_AGAIN: h._("Try again"),
  INSTAGRAM_MESSAGES_ACCESS_MODAL_BUTTON_LABEL_CONFIRM: h._("Confirm"),
  INSTAGRAM_MESSAGES_ACCESS_MODAL_BUTTON_LABEL_CANCEL: h._("Cancel"),
  INSTAGRAM_MESSAGES_ACCESS_MODAL_SETTING_HEADING: h._(
    "Choose Instagram message settings"
  ),
  INSTAGRAM_MESSAGES_ACCESS_MODAL_SUCCESS_HEADER: h._("Instagram connected"),
  INSTAGRAM_MESSAGES_ACCESS_MODAL_BUTTON_LABEL_TRY_AGAIN: h._("Try again"),
  INSTAGRAM_MESSAGES_ACCESS_MODAL_ERROR_HEADER: h._("Something went wrong"),
  INSTAGRAM_MESSAGES_ACCESS_MODAL_ERROR_MESSAGE: h._(
    "We're having trouble connecting your Instagram account. Please try again."
  ),
  INSTAGRAM_MESSAGES_ACCESS_MODAL_BUTTON_LABEL_DONE: h._("Done"),

  getInstagramMessagesAccessModalSuccessMessage: (a, b) =>
    h._(
      "The {Facebook page name} Facebook Page and the {Instagram account name} Instagram account are now connected.",
      [
        h._param("Facebook page name", <strong>{a}</strong>),
        h._param("Instagram account name", <strong>@{b}</strong>),
      ]
    ),

  PROMOTE_BUTTON: LWICometContentConsistencyConstants.PROMOTE_LABEL,
  SURVEY_CONTINUE_BUTTON: h._("Continue"),
  SURVEY_DONE_BUTTON: h._("Done"),
  ICEBREAKER_IMPORT_ALERT_CARD_HEADER: h._("Update your imported question"),

  getIcebreakerAlertCardBody: (a) =>
    a === "messenger"
      ? h._(
          "You can add automated responses with attachments, personalization and buttons."
        )
      : h._(
          "Instagram supports up to 4 frequently asked questions, so only your first 4 questions were imported. Responses will be imported only when it is plain text."
        ),

  ICEBREAKER_IMPORT_CONFIRM_BUTTON: h._("Import questions"),
  ICEBREAKER_IMPORT_CANCEL_BUTTON: h._("No thanks"),

  getIcebreakerImportHeader: (a) =>
    a === "messenger"
      ? h._("Import your frequently asked questions from Instagram?")
      : h._("Import your frequently asked questions from Messenger?"),

  getIcebreakerImportBody: (a) =>
    a === "messenger"
      ? h._(
          "Save time by using the same frequently asked questions you already have set up on Instagram. Once imported, you can edit the questions and add automated responses."
        )
      : h._(
          "Save time by using the same frequently asked questions you already have set up on Messenger. Once imported, you can edit the questions and add automated responses."
        ),

  getInstagramHandle: (a) => h._("\u0040{username}", [h._param("username", a)]),

  getPermissionDisclosureModalFirstParagraph: (a, b, e) =>
    h._(
      "To get the most out of all features, people who manage the {Facebook page name} Facebook Page also need access to manage things on the {Instagram account name} Instagram account. {=m10}",
      [
        h._param("Facebook page name", <strong>{a}</strong>),
        h._param("Instagram account name", <strong>@{b}</strong>),
        h._implicitParam(
          "=m10",
          <GeoLink
            href={new URI("/help/2546917405323366").setSubdomain("www")}
            target="_blank"
            onClick={() =>
              BizKitPermissionDisclosureLoggingUtils.logCustomEvent(
                e,
                "learn_more_clicked"
              )
            }
          >
            {h._("Learn More")}
          </GeoLink>
        ),
      ]
    ),

  getUnreadLabel: (a) => h._("{numUnread} unread", [h._param("numUnread", a)]),
  getGoToHomeBannerTitle: () => h._("Welcome to Meta Business Suite"),
  getGoToHomeBannerDescription: () =>
    h._(
      "To create a post, find any additional things that need your attention, and see recent ads and posts, go to Home."
    ),
  getGoToHomeBannerButton: () => h._("Go to Home"),
  LINK_CONFIRMATION_CONFIRM_TITLE: h._(
    "Confirm Your Facebook Page and Instagram connection"
  ),

  getLinkConfirmationConfirmSingleAccountIntro: (a, b) =>
    h._("A Page admin or editor connected {pageName} to {igName}.", [
      h._param("pageName", <strong>{a}</strong>),
      h._param("igName", <strong>@{b}</strong>),
    ]),

  LINK_CONFIRMATION_CONFIRM_SINGLE_ACCOUNT_CONTENT: h._(
    "Confirm this connection and access all features across Facebook and Instagram by logging into Instagram. You can also disconnect the account."
  ),

  getLinkConfirmationConfirmMultipleAccountsIntro: (a) =>
    h._(
      "Page admins or editors previously connected {pageName} to 2 Instagram accounts. To access all features across Facebook and Instagram, choose one account to connect, then confirm your connection by logging in.",
      [h._param("pageName", <strong>{a}</strong>)]
    ),

  LINK_CONFIRMATION_CONFIRM_MULTIPLE_ACCOUNTS_CONTENT: h._(
    "The other Instagram account will be disconnected from your Page."
  ),

  getIGCreationTime: (a) =>
    h._("Connected on {igConnectTime}", [
      h._param("igConnectTime", formatDate(a, "M j, Y")),
    ]),

  CONFIRM_DISCONNECT_SINGLE_ACCOUNT_TITLE: h._("Disconnect Instagram account?"),
  CONFIRM_DISCONNECT_MULTIPLE_ACCOUNTS_TITLE: h._(
    "Disconnect both Instagram accounts?"
  ),
  CONFIRM_DISCONNECT_SINGLE_ACCOUNT_INTRO: h._(
    "If you disconnect the Instagram account, most shared information will be removed from the other platform. For example, ads insights and comments and messages in Inbox will be removed from Facebook."
  ),
  CONFIRM_DISCONNECT_MULTIPLE_ACCOUNT_INTRO: h._(
    "If you disconnect both Instagram accounts, most shared information will be removed from the other platform. For example, ads insights and comments and messages in Inbox will be removed from Facebook."
  ),
  CONFIRM_DISCONNECT_CONTENT: h._(
    "People will still see any shared posts and previously synced business information."
  ),
  DISCONNECT_SINGLE_ACCOUNT_SUCCESS_TITLE: h._("Account disconnected"),
  DISCONNECT_MULTIPLE_ACCOUNTS_SUCCESS_TITLE: h._("Accounts disconnected"),
  DISCONNECT_CONTENT: h._(
    "You can connect your Page to an Instagram account at any time in Page settings."
  ),
  CONNECT_SUCCESS_TITLE: h._("Connection confirmed"),

  getConnectSuccessContent: (a, b) =>
    h._(
      "The connection between {page name} and {IG username} has been confirmed.",
      [
        h._param("page name", <strong>{a}</strong>),
        h._param("IG username", <strong>@{b}</strong>),
      ]
    ),

  CONNECT_FAILURE_TITLE: h._("Connection failed"),
  DISCONNECT_FAILURE_TITLE: h._("Disconnection failed"),
  CONNECT_FAILURE_GENERAL_ERROR: h._("Something went wrong. Please try again."),
  CONFIRM_CONNECT_BUTTON: h._("Confirm connection"),
  DISCONNECT_BUTTON: h._("Disconnect account"),
  DISCONNECT_MULTIPLE_ACCOUNTS_BUTTON: h._("Disconnect both accounts"),
  PERMISSION_INTRO: h._(
    "Depending on their Facebook Page roles, people who help manage your Page may have access to help manage things on both Facebook and Instagram like:"
  ),
  DROPDOWN_MENU_TITLE: h._("{=m0}", [
    h._implicitParam(
      "=m0",
      <strong>{h._("Things People Can Help Manage")}</strong>
    ),
  ]),
  CONTENT_ADS_INSIGHTS_PERMISSION: h._("Content, ads, and insights"),
  SETTING_PERMISSION: h._("Settings and permissions"),
  MESSAGES_COMMENTS: h._("Messages and comments"),
  POSTS_AND_STORIES: h._("Posts and stories"),
  CUSTOMER_AND_BUSINESS_INFO: h._("Customer and business info"),
  ADS_AND_PROMOTIONS: h._("Ads and promotions"),
  COMMENTS_AND_REPLIES: h._("Comments and replies"),
  AUDIENCE_ENGAGEMENT_DATA: h._("Audience engagement data"),
  ACCESS: h._("Access for other people"),
  MESSAGES_AND_RESPONSES: h._("Messages and responses"),
  PASSWORD_TITLE: h._("{=m0}", [
    h._implicitParam("=m0", <strong>{h._("Don't know the password?")}</strong>),
  ]),
  PASSWORD_EXPLANATION_ONE: h._(
    "If you created the Instagram account, you can tap Confirm Connection, then Forgot Password? to reset the password."
  ),
  PASSWORD_EXPLANATION_TWO: h._(
    "If someone else created the Instagram account, ask them to confirm this connection if they also manage the Page."
  ),
  NOT_BUSINESS_ADMIN_ERROR: h._(
    "You must be an admin of the associated Page’s business in Business Manager to connect an Instagram account."
  ),
  NOT_MATCH_IG_USER: h._(
    "The username you entered doesn’t belong to the Instagram account connected to this Facebook Page. Please check your username."
  ),
  LEARN_MORE: h._("Learn more"),

  getPagesComposerUpsellGeneric: (a) =>
    h._("Post scheduling and additional options are available {=m2}", [
      h._implicitParam("=m2", <Link onClick={a}>{h._("here.")}</Link>),
    ]),

  ACTIVITIES_ERROR_TITLE: h._("Something went wrong"),
  ACTIVITIES_ERROR_MESSAGE: h._(
    "There was a problem loading activity. Please refresh to try again."
  ),
  HELP_CENTER: h._("Help Center"),
  FACEBOOK_BUSINESS_SUITE: h._("Meta Business Suite"),
  GUIDANCE_SHARED_CONTENT: { footer_cta: h._("Get started") },
  CUSTOM_COMPONENT_REMINDER: {
    heading: h._("Visit Inbox in Meta Business Suite"),
    content: h._("Connect with your customers and create automated messages"),
  },
  HOME_SCHEDULE_POST_REMINDER: {
    heading: h._("Plan ahead by scheduling posts"),
    content: h._(
      "Scheduling gives you more control over when you create content for your business"
    ),
    geoOverride_moreLabel: h._("Schedule post"),
  },
  INTRODUCING_FBS_HEADER: h._("Introducing Meta Business Suite"),
  PAGE_UNAVAILABLE_DESCRIPTION: h._(
    "Meta Business Suite allows you to manage your business across Facebook and Instagram, all in one place. If your business doesn’t have a Facebook Page, you’ll need to create one before you can log in."
  ),
  PAGE_UNAVAILABLE_CREATE_PAGE_CTA: h._("Create a Facebook Page"),
  PAGE_UNAVAILABLE_CREATE_BUSINESS_PAGE_CTA: h._("Create a business Page"),

  getPageUnavailableHelpCenterText: (a) =>
    h._("You can learn more about Meta Business Suite by visiting the {=m1}.", [
      h._implicitParam(
        "=m1",
        <GeoLink
          href={new URI("/business/help/205614130852988").setSubdomain("www")}
          onClick={a}
          target="_blank"
        >
          {h._("Help Center")}
        </GeoLink>
      ),
    ]),

  PUBLISHING_TOOLS_UPSELL_BODY_BRANDED: h._(
    "With Meta Business Suite, you can post to both Facebook and Instagram at the same time, see updates at a glance and get insights in one place. In the coming months, Pages Publishing Tools will no longer support published, scheduled and expiring posts."
  ),
  PUBLISHING_TOOLS_UPSELL_SHARE_VALUE_BRANDED: h._(
    "Schedule, publish and manage posts for both Facebook and Instagram."
  ),
  PUBLISHING_TOOLS_UPSELL_UPDATE_VALUE_BRANDED: h._(
    "View all Facebook and Instagram messages, notifications and alerts."
  ),
  PUBLISHING_TOOLS_UPSELL_ANALYSIS_VALUE_BRANDED: h._(
    "Get insights for Facebook and Instagram, so you know how you’re doing on each."
  ),
  PUBLISHING_TOOLS_UPSELL_FOOTER_BRANDED: h._(
    "Questions about Meta Business Suite? You can learn more by visiting the {Link to the BizWeb Help Center}",
    [
      h._param(
        "Link to the BizWeb Help Center",
        <GeoLink
          href={new URI("/business/help/205614130852988").setSubdomain("www")}
          target="_blank"
        >
          {h._("Help Center")}
        </GeoLink>
      ),
    ]
  ),
  IG_MESSAGE_SECTION_HEADER: h._("Allow access to Instagram messages in Inbox"),
  IG_MESSAGE_SECTION_DESCRIPTION: h._(
    "Depending on their Page roles, people who help manage your Page may have access to view and respond to Instagram messages. You can change this in your settings anytime."
  ),
  IG_ONLY_IG_MESSAGE_SECTION_DESCRIPTION: h._(
    "Depending on their roles, people who help manage your Instagram account may have access to view and respond to Instagram messages. You can change this in your settings anytime."
  ),
  REVIEW_MESSAGE_DESCRIPTION: h._("Learn more"),
  MANAGE_MESSAGE_TITLE: h._("Choose Instagram message settings"),
  MULTISELECT_MODAL_HEADER: h._("More flexibility in managing business assets"),
  MULTISELECT_MODAL_CONTENT: h._(
    "You can now select any Facebook Page and Instagram account to manage them together across Meta Business Suite’s tools."
  ),
  MULTISELECT_MODAL_CONTENT_V2: BusinessAccountRenameGating.getBARenameEnabled()
    ? h._(
        "People in this business portfolio can now select any Facebook Page and Instagram account they’re assigned to manage together."
      )
    : h._(
        "People in this Business Account can now select any Facebook Page and Instagram account they’re assigned to manage together."
      ),
  INBOX_PUSHABILITY_CARD_TITLE: h._("Turn on notifications to stay connected"),
  INBOX_PUSHABILITY_CARD_BODY: h._(
    "Know right away when you get new messages and other important updates."
  ),
  INBOX_PUSHABILITY_CARD_BUTTON: h._("Turn on notifications"),
  PUSHABILITY_DIALOG_TITLE: h._(
    "Allow notifications so you don’t miss messages and more"
  ),
  PUSHABILITY_DIALOG_BODY: h._(
    "Find out right away when you get new messages, comments and other important activity related to your business."
  ),
  PUSHABILITY_DIALOG_BUTTON_CLOSE: h._("OK"),
  PUSHABILITY_DIALOG_BUTTON_ALLOW_NOTIFICATION: h._("Allow notifications"),

  PUSHABILITY_DIALOG_INSTRUCTION_B: h._(
    "{Notifications instruction step} Choose {Lock Icon} in your browser’s address bar.",
    [
      h._param(
        "Notifications instruction step",
        <strong>{h._("Step 1:")}</strong>
      ),
      h._param(
        "Lock Icon",
        <Image src={i("1437907")} alt={h._("the lock icon")} />
      ),
    ]
  ),

  PUSHABILITY_DIALOG_INSTRUCTION_C: h._(
    "{Notifications instruction step} Locate {Bell Icon} {Notifications menu item} and select {allow option}.",
    [
      h._param(
        "Notifications instruction step",
        <strong>{h._("Step 2:")}</strong>
      ),
      h._param("Bell Icon", <Image src={i("1330183")} />),
      h._param(
        "Notifications menu item",
        <strong>{h._("Notifications")}</strong>
      ),
      h._param("allow option", <strong>{h._("Allow")}</strong>),
    ]
  ),

  PUSHABILITY_DIALOG_INSTRUCTION_DESCRIPTION: h._(
    "You can also allow desktop notifications from your browser settings."
  ),
  CONTENT_MANAGEMENT_TOUR_CARD_TEXT: h._(
    "View, manage and schedule all of your Facebook and Instagram posts and stories from one place."
  ),
  CONTENT_MANAGEMENT_TOUR_CARD_TITLE: h._(
    "An easier way to manage your Facebook and Instagram posts and stories."
  ),
  CONTENT_MANAGEMENT_TOUR_CARD_CTA: h._("See what's new"),
};

export default BizKitStrings;
