/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import BaseView from "BaseView.react";
import MWMessageListAttachmentContainer from "MWMessageListAttachmentContainer.react";
import { MWPMessageListColumnShrinkwrap } from "MWPMessageListColumn.react";
import MWPMessageListRowWithKeyboardInteractions from "MWPMessageListRowWithKeyboardInteractions.react";
import MWV2ChatAdminMessage from "MWV2ChatAdminMessage.react";
import MWV2MessageRowSimple from "MWV2MessageRowSimple.react";
import { useMWMessageRowTheme, useMWPEditMessageDeemphasizer } from "stylex";

const styles = {
  adminMessageAttachment: {
    boxSizing: "x9f619",
    maxWidth: "x4ndzw7",
    minWidth: "xwj5yc2",
    paddingBottom: "xdvlbce",
    paddingStart: "x5ib6vp",
    paddingLeft: null,
    paddingRight: null,
    paddingEnd: "xc73u3c",
    paddingTop: "x1nn3v0j",
    $$css: true,
  },
  adminMessageContainer: {
    maxWidth: "x193iq5w",
    $$css: true,
  },
};

const MWMessageRowAdminMessage = ({
  domElementRef,
  isDialogOpened,
  isFirstMessageInGroup,
  isFocused,
  isModal,
  message,
  messageDomID,
  nextMessage,
  outgoing,
  prevMessage,
  setFocusedInTransition,
  setHoveredInTransition,
  setIsDialogOpened,
  stopHoveringRef,
}) => {
  const editMessageDeemphasizer = useMWPEditMessageDeemphasizer();
  const theme = useMWMessageRowTheme();
  const content = (
    <MWPMessageListColumnShrinkwrap centered>
      <BaseView
        xstyle={[editMessageDeemphasizer, styles.adminMessageContainer]}
      >
        <MWV2ChatAdminMessage
          message={message}
          nextMessage={nextMessage}
          prevMessage={prevMessage}
        />
        <MWMessageListAttachmentContainer
          connectBottom={false}
          connectTop={false}
          mediaRenderQpl={null}
          message={message}
          outgoing={outgoing}
          xstyle={styles.adminMessageAttachment}
        />
      </BaseView>
    </MWPMessageListColumnShrinkwrap>
  );

  if (message.adminMsgCtaType === null) {
    return <MWV2MessageRowSimple>{content}</MWV2MessageRowSimple>;
  } else {
    return (
      <MWPMessageListRowWithKeyboardInteractions
        domElementRef={isFirstMessageInGroup ? undefined : domElementRef}
        isDialogOpened={isDialogOpened}
        isFocused={isFocused}
        isModal={isModal}
        message={message}
        messageDomID={messageDomID}
        outgoing={outgoing}
        setFocused={setFocusedInTransition}
        setHovered={setHoveredInTransition}
        setIsDialogOpened={setIsDialogOpened}
        stopHoveringRef={stopHoveringRef}
        theme={theme}
      >
        {content}
      </MWPMessageListRowWithKeyboardInteractions>
    );
  }
};

MWMessageRowAdminMessage.displayName = `MWMessageRowAdminMessage [from ${MWMessageRowAdminMessage.id}]`;

export default MWMessageRowAdminMessage;
