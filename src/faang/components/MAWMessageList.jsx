/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useId, useState } from "react";

import BaseTheme from "./BaseTheme.react";
import CometErrorBoundary from "./CometErrorBoundary.react";
import CometPageletWithDiv from "./CometPageletWithDiv.react";
import CometScreenReaderText from "./CometScreenReaderText.react";
import gkx from "./gkx";
import { equal } from "./I64";
import { isArmadilloSecure } from "./LSMessagingThreadTypeUtil";
import { outstandingUIReadyOfflineQueueSelector } from "./MAWLoadingStateOutstandingUIReadyOfflineQueueSelector";
import MAWMessageListRow from "./MAWMessageListRow.react";
import { empty as MWBaseThemeEmpty } from "./MWBaseTheme";
import MWBlockingProtectionContext from "./MWBlockingProtectionContext.react";
import MWContextBanner from "./MWContextBanner.react";
import MWInboxThreadMessagesSpinner from "./MWInboxThreadMessagesSpinner.react";
import MWJumpToMostRecentMessageButton from "./MWJumpToMostRecentMessageButton.react";
import { useActor } from "./MWPActor.react";
import MWPMessageIsReply from "./MWPMessageIsReply";
import {
  MWPMessageListColumnGrow,
  MWPMessageListColumnGrowJustified,
  MWPMessageListColumnVerticalRhythm,
} from "./MWPMessageListColumn.react";
import MWPMessageListFocusTable from "./MWPMessageListFocusTable.react";
import MWPRelayBaseMessageList from "./MWPRelayBaseMessageList";
import { Provider as MWPThreadCapabilitiesContextProvider } from "./MWPThreadCapabilitiesContext";
import {
  MWPTypingIndicators,
  useAccessibilityText,
  useTypingParticipants,
} from "./MWPTypingIndicators.react";
import MWV2ChatErrorBubble from "./MWV2ChatErrorBubble.react";
import MWV2MessageRowSimple from "./MWV2MessageRowSimple.react";
import useCheckMessageIntegrityForSecureThread from "./useCheckMessageIntegrityForSecureThread";
import useMAWOfflineQueueLoadingIndicator from "./useMAWOfflineQueueLoadingIndicator";
import useMWEncryptedBackupsGetLatestMessageTimestampForThreadInEB from "./useMWEncryptedBackupsGetLatestMessageTimestampForThreadInEB";
import useMWMessageRowTheme from "./useMWMessageRowTheme";
import useMWPAriaLabelForMessageListGrid from "./useMWPAriaLabelForMessageListGrid";
import useReStore from "./useReStore";
import withCometPlaceholder from "./withCometPlaceholder";

const renderJumpToMostRecentMessageButton = (onPress) => {
  return <MWJumpToMostRecentMessageButton onPress={onPress} />;
};

renderJumpToMostRecentMessageButton.displayName = `${renderJumpToMostRecentMessageButton.name} [from MAWMessageList.react]`;

const TypingIndicator = ({
  theme = MWBaseThemeEmpty,
  threadKey,
  threadType,
}) => {
  const typingParticipants = useTypingParticipants(threadKey);
  const accessibilityText = useAccessibilityText(typingParticipants);

  if (typingParticipants.length > 0) {
    return (
      <BaseTheme config={theme}>
        <MWV2MessageRowSimple>
          <MWPMessageListColumnGrow>
            <div aria-live="polite">
              <CometScreenReaderText text={accessibilityText} />
            </div>
            <MWPTypingIndicators
              threadKey={threadKey}
              threadType={threadType}
            />
          </MWPMessageListColumnGrow>
        </MWV2MessageRowSimple>
      </BaseTheme>
    );
  }
  return null;
};

TypingIndicator.displayName = `${TypingIndicator.name} [from MAWMessageList.react]`;

const TypingIndicatorWithPlaceholder = withCometPlaceholder(TypingIndicator);

const MAWMessageList = forwardRef((props, ref) => {
  const { cutoverOpenThread, entryPoint, onScrollToBottom, thread } = props;
  const reStore = useReStore();
  const actor = useActor();
  const ariaLabel = useMWPAriaLabelForMessageListGrid(thread);
  const messageRowTheme = useMWMessageRowTheme();
  const [modal, setModal] = useState("");
  const id = useId();
  const latestEbMessageTimestamp =
    useMWEncryptedBackupsGetLatestMessageTimestampForThreadInEB(
      thread.threadKey
    );
  const useCheckMessageIntegrityForSecureThreadFunction =
    useCheckMessageIntegrityForSecureThread(
      reStore,
      thread.threadKey,
      thread.threadType
    );
  const shouldPausePageLoadTracking = useMAWOfflineQueueLoadingIndicator(
    false,
    thread,
    outstandingUIReadyOfflineQueueSelector
  );
  const isThreadSecure = isArmadilloSecure(thread.threadType);

  const messageList = (
    <MWPRelayBaseMessageList
      entryPoint={entryPoint}
      onPageLoaded={(a, b, c, d) => {
        if (isThreadSecure)
          useCheckMessageIntegrityForSecureThreadFunction(a, b, c, d);
      }}
      onScrollToBottom={onScrollToBottom}
      pageSize={gkx("23432") ? 3 : 15}
      ref={ref}
      renderFooter={() => (
        <TypingIndicatorWithPlaceholder
          theme={messageRowTheme}
          threadKey={thread.threadKey}
          threadType={thread.threadType}
        />
      )}
      renderHeader={() => (
        <MWPMessageListColumnGrowJustified>
          <MWPMessageListColumnVerticalRhythm height={20} />
          <MWContextBanner
            threadKey={thread.threadKey}
            threadType={thread.threadType}
          />
        </MWPMessageListColumnGrowJustified>
      )}
      renderJumpToMostRecentMessageButton={renderJumpToMostRecentMessageButton}
      renderLoadingAnimation={() => <MWInboxThreadMessagesSpinner />}
      renderRow={({ domElementRef, message, nextMessage, prevMessage }) => {
        const isReply = MWPMessageIsReply(message);
        const isOutgoing = equal(message.senderId, actor);
        return (
          <CometErrorBoundary
            // eslint-disable-next-line react/no-unstable-nested-components
            fallback={() => (
              <MWV2ChatErrorBubble isOutgoing={isOutgoing} isReply={isReply} />
            )}
          >
            <MAWMessageListRow
              domElementRef={domElementRef}
              lastEbMessageTime={latestEbMessageTimestamp}
              modal={modal}
              row={{ message, nextMessage, prevMessage }}
              thread={thread}
            />
          </CometErrorBoundary>
        );
      }}
      secondaryThread={cutoverOpenThread}
      shouldPausePageLoadTracking={shouldPausePageLoadTracking}
      thread={thread}
    />
  );

  return (
    <div className="x78zum5 xdt5ytf x1iyjqo2 x5yr21d" id={id}>
      <CometPageletWithDiv.Placeholder
        className="x78zum5 xdt5ytf x1iyjqo2 x5yr21d"
        fallback={null}
        name="MWV2MessageList"
      >
        <MWPThreadCapabilitiesContextProvider thread={thread}>
          <MWBlockingProtectionContext.Provider>
            <MWPMessageListFocusTable
              ariaLabel={ariaLabel}
              modal={modal}
              setModal={setModal}
            >
              {messageList}
            </MWPMessageListFocusTable>
          </MWBlockingProtectionContext.Provider>
        </MWPThreadCapabilitiesContextProvider>
      </CometPageletWithDiv.Placeholder>
    </div>
  );
});

MAWMessageList.displayName = `${MAWMessageList.name} [from MAWMessageList.react]`;

export default MAWMessageList;
