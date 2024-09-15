/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useMemo, useRef } from "react";
import stylex from "@stylex/stylex";
import { MWPAudioPlaybackButton } from "MWPAudioPlaybackButton.react";
import { MWPAudioPlayerButtons } from "MWPAudioPlayerButtons.react";
import { MWPAudioPlayerContainer } from "MWPAudioPlayerContainer.react";
import { MWPAudioPlayerHighlight } from "MWPAudioPlayerHighlight.react";
import { MWPAudioPlayerKeyCommands } from "MWPAudioPlayerKeyCommands.react";
import { MWPAudioPlayerSharedStyles } from "MWPAudioPlayerSharedStyles";
import { MWPAudioPlayerTimer } from "MWPAudioPlayerTimer.react";
import { requireDeferred } from "requireDeferred";
import { useMWNextAttachment } from "useMWNextAttachment";
import { useMWPAudioWaveformData } from "useMWPAudioWaveformData.react";
import { useMWPMarkAudioAttachmentAsConsumed } from "useMWPMarkAudioAttachmentAsConsumed.react";

import { zero } from "../../helpers/I64";

import { MWChatImageStyles } from "./MWChatImageStyles";
import { MWPAudioPlayerUtils, State, UseCase } from "./MWPAudioPlayerUtils";

const MWChatAudioLog = requireDeferred("MWChatAudioLog").__setRef(
  "MWAudioPlayer.react"
);

const styles = {
  incoming: {
    backgroundColor: "x1arowe1",
    opacity: "x1ptxcow",
    ,
  },
  outgoing: {
    backgroundColor: "x14hiurz",
    opacity: "xz5rk10",
    ,
  },
  root: { transform: "x5i6ehr",  },
};

function useHighlightStyles(outgoing) {
  return useMemo(
    () => [styles.root, outgoing ? styles.outgoing : styles.incoming],
    [outgoing]
  );
}

function logBrowserDenyAccess() {
  MWChatAudioLog.onReady((log) => log.logBrowserDenyAccess());
}

const MWAudioPlayer = ({
  attachment,
  connectBottom,
  connectTop,
  getPlayableUrl,
  isReply = false,
  mediaRenderQpl,
  message,
  outgoing,
  renderUnsupportedAttachment,
  width,
}) => {
  const playableDurationMs =
    to_float(attachment.playableDurationMs ?? zero) / 1000;
  const nextAttachment = useMWNextAttachment(attachment, message);
  const playableUrl = getPlayableUrl(
    attachment,
    "MWAudioPlayer",
    mediaRenderQpl
  );
  const waveformData = useMWPAudioWaveformData(attachment, playableUrl);

  const borderStyles = MWChatImageStyles.calculateBorderStyles(
    connectBottom,
    connectTop,
    false,
    outgoing
  );
  const [
    state,
    currentTime,
    audioEl,
    handlePlayback,
    progressHighlightRef,
    handleScrubber,
  ] = MWPAudioPlayerUtils.useControlCenter(
    playableUrl,
    nextAttachment
      ? getPlayableUrl(nextAttachment, "MWAudioPlayer")
      : undefined,
    message.messageId,
    nextAttachment?.messageId,
    logBrowserDenyAccess,
    false,
    playableDurationMs,
    mediaRenderQpl
  );

  useMWPMarkAudioAttachmentAsConsumed(audioEl, attachment);

  const isNone = state === State.NONE;
  const isPlaying = state === State.PLAYING;
  const isPaused = state === State.PAUSED;
  const isLoading = state === State.LOADING;
  const hasEnded = state === State.ENDED;
  const hasScrubber = isPlaying || isPaused;
  const scrubberRef = useRef < HTMLDivElement > null;
  const playerWidth = MWPAudioPlayerUtils.useCalculatePlayerWidth(width);
  const playerStyle = { width: `${playerWidth}px` };
  const remainingTime = hasScrubber
    ? Math.max(playableDurationMs - currentTime, 0)
    : 0;
  const highlightStyles = useHighlightStyles(outgoing);

  if (!playableUrl || playableUrl.length === 0) {
    mediaRenderQpl?.addPoint("empty_playable_url");
    if (renderUnsupportedAttachment) {
      return renderUnsupportedAttachment(attachment);
    }
  }

  return (
    <MWPAudioPlayerKeyCommands audioEl={audioEl}>
      <MWPAudioPlayerContainer
        audioEl={audioEl}
        hasScrubber={hasScrubber}
        scrubberRef={scrubberRef}
        style={playerStyle}
        useCase={UseCase.PLAYER}
      >
        <div
          className={stylex(
            MWPAudioPlayerSharedStyles.styles.common,
            borderStyles.imageStyles,
            outgoing
              ? MWPAudioPlayerSharedStyles.styles.commonOutgoing
              : MWPAudioPlayerSharedStyles.styles.commonIncoming,
            isReply && MWPAudioPlayerSharedStyles.styles.commonReply,
            outgoing &&
              isReply &&
              MWPAudioPlayerSharedStyles.styles.commonOutgoingReply
          )}
        >
          <MWPAudioPlayerHighlight
            audioEl={audioEl}
            currentTime={currentTime}
            duration={playableDurationMs}
            hasEnded={hasEnded}
            hasScrubber={hasScrubber}
            isListened={attachment.isAttachmentConsumed === true}
            isPlaying={isPlaying}
            onUpdateScrubber={handleScrubber}
            outgoing={outgoing}
            progressHighlightRef={progressHighlightRef}
            scrubberRef={scrubberRef}
            waveformData={waveformData}
            xstyle={highlightStyles}
          >
            <MWPAudioPlaybackButton
              disabled={isNone}
              hasEnded={hasEnded}
              isLoading={isLoading}
              isPaused={isPaused}
              isPlaying={isPlaying}
              onPress={handlePlayback}
              outgoing={outgoing}
              scrubberRef={scrubberRef}
            />
          </MWPAudioPlayerHighlight>
          <div>
            {isPlaying ? (
              <>
                <MWPAudioPlayerTimer outgoing={outgoing} time={remainingTime} />
                <MWPAudioPlayerButtons.PlaybackRateButton outgoing={outgoing} />
              </>
            ) : (
              <MWPAudioPlayerTimer outgoing={outgoing} time={remainingTime} />
            )}
          </div>
        </div>
      </MWPAudioPlayerContainer>
    </MWPAudioPlayerKeyCommands>
  );
};

MWAudioPlayer.displayName = `${MWAudioPlayer.name} [from ${__filename}]`;

export { MWAudioPlayer, useHighlightStyles };
