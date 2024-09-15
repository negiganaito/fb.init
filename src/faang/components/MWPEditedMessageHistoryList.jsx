/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useEffect, useMemo } from "react";
import { stylex } from "@stylexjs/stylex";
import { _ as qpl } from "qpl";

import { useMWMessageEditContext } from "../../context/MWMessageEditContext";
import { to_int32 } from "../../helpers/I64";
import useReStore from "../../hooks/useReStore";

import { MWPEditedMessageHistoryEntry } from "./MWPEditedMessageHistoryEntry";
import { addAnnotations, endFailure, endSuccess } from "./QPLUserFlow";
import ReQL from "./ReQL";
import { useArray } from "./ReQLSuspense";

const styles = {
  base: {
    backgroundColor: "x1eb86dx",
    maxWidth: "x193iq5w",
    zIndex: "x1vjfegm",
    ,
  },
  incoming: {
    display: "x1lliihq",
    paddingStart: "xd06s5i",
    ,
  },
  outgoing: {
    display: "x1lliihq",
    paddingEnd: "x1sxyh0",
    ,
  },
};

function useEditedMessageHistory(msgId, isSecureMessage) {
  const store = useReStore();
  const historyEntries = useArray(
    () =>
      ReQL.fromTableAscending(
        store.tables.edit_message_history.index("originalMsgPkEditTs")
      ).getKeyRange(msgId),
    [store, msgId],
    `${module.id}:57`
  );

  return useMemo(
    () => (isSecureMessage ? historyEntries.slice(0, -1) : historyEntries),
    [historyEntries, isSecureMessage]
  );
}

const MWPEditedMessageHistoryList = ({
  editCount,
  isReply,
  isSecureMessage,
  msgId,
  outgoing,
  renderMessageActions,
  threadType,
  xstyle,
}) => {
  const { showEdits = false } = useMWMessageEditContext() || {};
  const messageHistory = useEditedMessageHistory(msgId, isSecureMessage);

  useEffect(() => {
    if (showEdits) {
      addAnnotations(qpl(1056849214, "1777"), {
        bool: { isSecureMessage },
        int: { threadType: to_int32(threadType) },
      });

      if (
        messageHistory !== null &&
        editCount !== null &&
        messageHistory.length === to_int32(editCount)
      ) {
        endSuccess(qpl(1056849214, "1777"));
      } else {
        endFailure(qpl(1056849214, "1777"), "no edits found");
      }
    }
  }, [messageHistory, editCount, showEdits, isSecureMessage, threadType]);

  const historyList = (
    <div
      className={stylex(
        styles.base,
        outgoing ? styles.outgoing : styles.incoming,
        xstyle
      )}
      role="none"
    >
      {messageHistory.map((entry, index) => (
        <MWPEditedMessageHistoryEntry
          key={index}
          isReply={isReply}
          isSecureMessage={isSecureMessage}
          messageHistoryEntry={entry}
          outgoing={outgoing}
          renderMessageActions={renderMessageActions}
        />
      ))}
    </div>
  );

  return showEdits ? historyList : null;
};

MWPEditedMessageHistoryList.displayName = `${MWPEditedMessageHistoryList.name} [from ${module.id}]`;

export default MWPEditedMessageHistoryList;
