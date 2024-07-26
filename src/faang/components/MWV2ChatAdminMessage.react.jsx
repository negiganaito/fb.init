/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { html } from "react-strict-dom";
import gkx from "gkx";
import MWNotificationMessageInstantGameCustomUpdateMuteManagementAdminMsgCta from "MWNotificationMessageInstantGameCustomUpdateMuteManagementAdminMsgCta.react";
import MWNotificationMessageInstantGameSubscriptionManagementAdminMsgCta from "MWNotificationMessageInstantGameSubscriptionManagementAdminMsgCta.react";
import MWV2AdminMsgArmadilloEphemeralChangeDuration from "MWV2AdminMsgArmadilloEphemeralChangeDuration.react";
import MWV2AdminMsgDMLearnMore from "MWV2AdminMsgDMLearnMore.react";
import MWV2AdminMsgE2EECutoverRollback from "MWV2AdminMsgE2EECutoverRollback.react";
import MWV2AdminMsgE2EEDescription from "MWV2AdminMsgE2EEDescription.react";
import MWV2AdminMsgICDC from "MWV2AdminMsgICDC.react";
import MWV2AdminMsgNotificationMessageManageNotifications from "MWV2AdminMsgNotificationMessageManageNotifications.react";
import MWV2AdminMsgP2BPrivacyDisclosure from "MWV2AdminMsgP2BPrivacyDisclosure.react";
import MWV2AdminMsgPostMessageRemoveActions from "MWV2AdminMsgPostMessageRemoveActions.react";
import MWV2AdminMsgServiceBookingLegalDisclaimer from "MWV2AdminMsgServiceBookingLegalDisclaimer.react";
import MWV2AdminMsgShowPinnedMessages from "MWV2AdminMsgShowPinnedMessages.react";
import MWV2AdminMsgViewMessagesDualThreadCutover from "MWV2AdminMsgViewMessagesDualThreadCutover.react";
import MWV2AdminMsgViewPoll from "MWV2AdminMsgViewPoll.react";
import MWV2AdminMsgWebUrl from "MWV2AdminMsgWebUrl.react";
import MWV2SBGProactiveChatMutationUrl from "MWV2SBGProactiveChatMutationUrl.react";

import MWAdminTextLayout from "./MWAdminTextLayout.react";
import MWXText from "./MWXText.react";

const styles = {
  color: {
    color: "x186z157",
    fontWeight: "xk50ysn",
    $$css: true,
  },
  container: {
    paddingTop: "xyamay9",
    paddingBottom: "x1l90r2v",
    paddingStart: "x5ib6vp",
    paddingLeft: null,
    paddingRight: null,
    paddingEnd: "xc73u3c",
    $$css: true,
  },
  containerThatPrecedesAdminMessage: {
    paddingBottom: "x1a8lsjc",
    $$css: true,
  },
  containerThatProceedsAdminMessage: {
    paddingTop: "x889kno",
    $$css: true,
  },
  content: {
    marginTop: "xr1yuqi",
    marginEnd: "xkrivgy",
    marginBottom: "x4ii5y1",
    marginStart: "x1gryazu",
    maxWidth: "x1ekjcvx",
    textAlign: "x2b8uid",
    wordBreak: "x13faqbe",
    $$css: true,
  },
};

const isAdminMessage = (message) => {
  return message?.isAdminMessage ?? false;
};

const MWV2ChatAdminMessageContainer = ({
  children,
  nextMessage,
  prevMessage,
}) => (
  <html.div
    data-testid={undefined}
    style={[
      styles.container,
      isAdminMessage(prevMessage)
        ? styles.containerThatProceedsAdminMessage
        : false,
      isAdminMessage(nextMessage)
        ? styles.containerThatPrecedesAdminMessage
        : false,
    ]}
  >
    <html.div style={styles.content}>{children}</html.div>
  </html.div>
);

MWV2ChatAdminMessageContainer.displayName = `MWV2ChatAdminMessageContainer [from ${MWV2ChatAdminMessageContainer.id}]`;

// eslint-disable-next-line complexity
const getAdminMessageComponent = (message) => {
  switch (message.adminMsgCtaType) {
    case "admin_msg_armadillo_ephemeral_change_duration":
      return <MWV2AdminMsgArmadilloEphemeralChangeDuration message={message} />;
    case "admin_msg_dual_thread_cutover":
      return <MWV2AdminMsgViewMessagesDualThreadCutover message={message} />;
    case "admin_msg_web_url":
      return <MWV2AdminMsgWebUrl message={message} />;
    case "admin_msg_sbg_proactive_chat_opt_in":
      return <MWV2SBGProactiveChatMutationUrl message={message} opted_in />;
    case "admin_msg_sbg_proactive_chat_opt_out":
      return (
        <MWV2SBGProactiveChatMutationUrl message={message} opted_in={false} />
      );
    case "admin_msg_p2b_privacy_disclosure":
      if (gkx("24144"))
        return <MWV2AdminMsgP2BPrivacyDisclosure message={message} />;
      break;
    case "admin_notification_messages_opt_out":
      return (
        <MWV2AdminMsgNotificationMessageManageNotifications
          isOptOut
          message={message}
        />
      );
    case "admin_notification_messages_opt_in":
      return (
        <MWV2AdminMsgNotificationMessageManageNotifications
          isOptOut={false}
          message={message}
        />
      );
    case "admin_msg_thread_level_cutover":
      return <MWV2AdminMsgE2EEDescription message={message} />;
    case "admin_msg_e2ee_thread":
      return null;
    case "admin_msg_cutover_rollback":
      return <MWV2AdminMsgE2EECutoverRollback message={message} />;
    case "xmat_instant_game_bot_message_subscribe":
      return (
        <MWNotificationMessageInstantGameSubscriptionManagementAdminMsgCta
          message={message}
          shouldSubscribe
        />
      );
    case "xmat_instant_game_bot_message_unsubscribe":
      return (
        <MWNotificationMessageInstantGameSubscriptionManagementAdminMsgCta
          message={message}
          shouldSubscribe={false}
        />
      );
    case "admin_msg_view_pin_msgs_v2":
      return <MWV2AdminMsgShowPinnedMessages message={message} />;
    case "xmat_instant_game_custom_update_message_mute":
      return (
        <MWNotificationMessageInstantGameCustomUpdateMuteManagementAdminMsgCta
          message={message}
          shouldMute
        />
      );
    case "xmat_instant_game_custom_update_message_unmute":
      return (
        <MWNotificationMessageInstantGameCustomUpdateMuteManagementAdminMsgCta
          message={message}
          shouldMute={false}
        />
      );
    case "admin_message_service_booking_legal_disclaimer":
      return <MWV2AdminMsgServiceBookingLegalDisclaimer message={message} />;
    case "admin_msg_admod_post_msg_remove_actions":
      return <MWV2AdminMsgPostMessageRemoveActions message={message} />;
    case "admin_msg_poll_details":
      return <MWV2AdminMsgViewPoll message={message} />;
    case "admin_msg_icdc":
      return <MWV2AdminMsgICDC message={message} />;
    case "admin_msg_ig_dm_learn_more":
      return <MWV2AdminMsgDMLearnMore message={message} />;
    default:
      return <MWAdminTextLayout message={message} />;
  }
};

const MWV2ChatAdminMessage = ({ message, nextMessage, prevMessage }) => {
  if (message.adminMsgCtaType === "admin_msg_e2ee_thread") return null;
  return (
    <MWV2ChatAdminMessageContainer
      nextMessage={nextMessage}
      prevMessage={prevMessage}
    >
      <MWXText color="tertiary" type="meta4">
        <html.div style={styles.color}>
          {getAdminMessageComponent(message)}
        </html.div>
      </MWXText>
    </MWV2ChatAdminMessageContainer>
  );
};

MWV2ChatAdminMessage.displayName = `MWV2ChatAdminMessage [from ${MWV2ChatAdminMessage.id}]`;

export { isAdminMessage, MWV2ChatAdminMessage, MWV2ChatAdminMessageContainer };
