/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { MAWSendOrRemoveReaction } from "MAWSendOrRemoveReaction";
import promiseDone from "promiseDone";
import requireDeferred from "requireDeferred";

import { to_string } from "../../helpers/I64";
import { useMemoInt64 } from "../../hooks/Int64Hooks";
import useIsSecureMessage from "../../hooks/useIsSecureMessage";
import useMWPSendOrUnsendReaction from "../../hooks/useMWPSendOrUnsendReaction";
import useReStore from "../../hooks/useReStore";

import { useActor } from "./MWPActor.react";

const MWLogMessageAction = requireDeferred("MWLogMessageAction").__setRef(
  "MAWPSendOrRemoveReaction.react"
);

function useSendOrRemoveReaction(message, fallbackIsSecure, logContext) {
  const store = useReStore();
  const actor = useActor();
  const secureSendOrRemoveReaction =
    MAWSendOrRemoveReaction?.useSendOrRemoveReaction(
      message.threadKey,
      to_string(message.senderId)
    ) ?? null;
  const isSecureMessage = useIsSecureMessage(store, message, {
    fallbackIsSecure,
  });
  const sendOrUnsendReaction = useMWPSendOrUnsendReaction(message);

  return useMemoInt64(() => {
    return (reactionId, reactionType, isRemove) => {
      if (isSecureMessage && secureSendOrRemoveReaction !== null) {
        secureSendOrRemoveReaction(reactionId, reactionType);
      } else {
        sendOrUnsendReaction(reactionId ?? "");
      }

      MWLogMessageAction.onReady((logModule) => {
        promiseDone(
          logModule.log(
            store,
            message.messageId,
            message.threadKey,
            logContext,
            isRemove,
            undefined,
            undefined,
            undefined,
            message.senderId,
            undefined,
            actor
          )
        );
      });
    };
  }, [
    isSecureMessage,
    secureSendOrRemoveReaction,
    sendOrUnsendReaction,
    store,
    message.messageId,
    message.threadKey,
    message.senderId,
    logContext,
    actor,
  ]);
}

export { useSendOrRemoveReaction };
