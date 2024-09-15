/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useEffect, useId, useState } from "react";

import BaseTheme from "./BaseTheme.react";
import CometPageletWithDiv from "./CometPageletWithDiv.react";
import CometScreenReaderText from "./CometScreenReaderText.react";
import { to_string } from "./I64";
import { useMemoInt64 } from "./Int64Hooks";
import MAWMessageListRow from "./MAWMessageListRow.react";
import { empty as MWBaseThemeEmpty } from "./MWBaseTheme";
import MWBlockingProtectionContext from "./MWBlockingProtectionContext.react";
import MWPBaseMessageList_DEPRECATED from "./MWPBaseMessageList_DEPRECATED";
import { MWPMessageListColumnGrow } from "./MWPMessageListColumn.react";
import MWPMessageListFocusTable from "./MWPMessageListFocusTable.react";
import { Provider as MWPThreadCapabilitiesContextProvider } from "./MWPThreadCapabilitiesContext";
import {
  MWPTypingIndicators,
  useAccessibilityText,
  useTypingParticipants,
} from "./MWPTypingIndicators.react";
import MWV2MessageRowSimple from "./MWV2MessageRowSimple.react";
import { fromTableAscending, mergeJoin } from "./ReQL";
import { useArray } from "./ReQLSuspense";
import useMWEncryptedBackupsGetLatestMessageTimestampForThreadInEB from "./useMWEncryptedBackupsGetLatestMessageTimestampForThreadInEB";
import useMWMessageRowTheme from "./useMWMessageRowTheme";
import useMWPAriaLabelForMessageListGrid from "./useMWPAriaLabelForMessageListGrid";
import { useReStore } from "./useReStore";
import withCometPlaceholder from "./withCometPlaceholder";

const useParticipants = (thread, store) => {
  return new Map(
    useArray(
      () =>
        mergeJoin(
          fromTableAscending(store.tables.participants).getKeyRange(
            thread.threadKey
          ),
          fromTableAscending(store.tables.contacts)
        ).map(([participant, contact]) => [
          to_string(contact.id),
          [participant, contact],
        ]),
      [store, thread.threadKey]
    )
  );
};

const useScrollToBottom = (scrollerRefs, typingParticipants) => {
  useEffect(() => {
    const scrollPosition = scrollerRefs?.scrollPositionRef.current;
    if (scrollPosition?.type === "Bottom" && typingParticipants.length > 0) {
      scrollerRefs.scrollerRef.current?.scrollToBottom();
    }
  }, [typingParticipants, scrollerRefs]);
};

const TypingIndicator = ({
  scrollerRefs,
  theme = MWBaseThemeEmpty,
  threadKey,
  threadType,
}) => {
  const typingParticipants = useTypingParticipants(threadKey);
  const accessibilityText = useAccessibilityText(typingParticipants);

  useScrollToBottom(scrollerRefs, typingParticipants);

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

const TypingIndicatorWithPlaceholder = withCometPlaceholder(TypingIndicator);

const MAWMessageList_DEPRECATED = ({
  messageElementRefs,
  messages,
  scrollerRefs,
  thread,
}) => {
  const store = useReStore();
  const participants = useParticipants(thread, store);
  const ariaLabel = useMWPAriaLabelForMessageListGrid(thread);
  const messageRowTheme = useMWMessageRowTheme();
  const [modal, setModal] = useState("");
  const id = useId();
  const threadType = useMemoInt64(() => thread.threadType, [thread.threadType]);
  const latestEbMessageTimestamp =
    useMWEncryptedBackupsGetLatestMessageTimestampForThreadInEB(
      thread.threadKey
    );

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <MWPBaseMessageList_DEPRECATED
      messages={messages}
      participants={participants}
      renderRow={({ message, nextMessage, prevMessage }) => (
        <MAWMessageListRow
          domElementRef={messageElementRefs.set(message.messageId)}
          lastEbMessageTime={latestEbMessageTimestamp}
          modal={modal}
          row={{ message, nextMessage, prevMessage }}
          thread={thread}
        />
      )}
      thread={thread}
    >
      {(content) => (
        <div data-testid={undefined} id={id}>
          <CometPageletWithDiv.Placeholder
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
                  <>
                    {content}
                    <TypingIndicatorWithPlaceholder
                      scrollerRefs={scrollerRefs}
                      theme={messageRowTheme}
                      threadKey={thread.threadKey}
                      threadType={threadType}
                    />
                  </>
                </MWPMessageListFocusTable>
              </MWBlockingProtectionContext.Provider>
            </MWPThreadCapabilitiesContextProvider>
          </CometPageletWithDiv.Placeholder>
        </div>
      )}
    </MWPBaseMessageList_DEPRECATED>
  );
};

export default MAWMessageList_DEPRECATED;
