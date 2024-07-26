/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback } from "react";

import CometPlaceholder from "./CometPlaceholder.react";
import MAWMsg from "./MAWMsg";
import MAWSecureAttachment from "./MAWSecureAttachment";
import MAWSecurePlaceholder from "./MAWSecurePlaceholder";
import { useActor } from "./MWPActor.react";
import {
  shouldConnectBottom,
  shouldConnectTop,
} from "./MWPMessageParsingUtils";

// eslint-disable-next-line max-params
function renderAttachment(
  message,
  prevMessage,
  nextMessage,
  isOutgoing,
  mediaRenderQpl,
  hasText,
  hasEmphasisRing,
  actorId
) {
  const connectTop = shouldConnectTop(message, prevMessage, "below");
  const connectBottom = shouldConnectBottom(message, nextMessage, "below");

  return (
    <CometPlaceholder fallback={null}>
      {MAWMsg.isMediaMsg(message) || MAWMsg.isXMAMsg(message) ? (
        <MAWSecureAttachment
          connectBottom={connectBottom}
          connectTop={connectTop}
          hasEmphasisRing={hasEmphasisRing}
          hasText={hasText}
          mediaRenderQpl={mediaRenderQpl}
          message={message}
          outgoing={isOutgoing}
        />
      ) : (
        <MAWSecurePlaceholder actorId={actorId} message={message} />
      )}
    </CometPlaceholder>
  );
}

renderAttachment.displayName = `${renderAttachment.name}`;

function useRenderAttachment(hasText) {
  const actorId = useActor();
  return useCallback(
    (
      message,
      prevMessage,
      nextMessage,
      isOutgoing,
      mediaRenderQpl,
      hasEmphasisRing
      // eslint-disable-next-line max-params
    ) =>
      renderAttachment(
        message,
        prevMessage,
        nextMessage,
        isOutgoing,
        mediaRenderQpl,
        hasText,
        hasEmphasisRing,
        actorId
      ),
    [actorId, hasText]
  );
}

export { renderAttachment as render, useRenderAttachment };
