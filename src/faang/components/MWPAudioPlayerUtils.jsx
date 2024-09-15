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
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cancelAnimationFrame } from "cancelAnimationFrame";
import { fbt } from "fbt";
import { gkx } from "gkx";
import { promiseDone } from "promiseDone";

import { useMWLSThreadDisplayContext } from "../../context/MWLSThreadDisplayContext";
import {
  useMWPAudioOutOfChatPlayback,
  useMWPAudioPlaybackElement,
} from "../../context/MWPAudioPlaybackContext.react";
import $InternalEnum from "../../helpers/$InternalEnum";
import getErrorNameFromMediaErrorCode from "../../helpers/getErrorNameFromMediaErrorCode";
import useStable from "../../hooks/useStable";

import { useIsQuickChatSurface } from "./MessengerSurfaceQuickChat.bs";
import requestAnimationFrameAcrossTransitions from "./requestAnimationFrameAcrossTransitions";

const PlaybackStateEnum = $InternalEnum.Mirrored([
  "ENDED",
  "LOADING",
  "NONE",
  "PAUSED",
  "PLAYING",
]);

const UseCase = $InternalEnum.Mirrored(["PLAYER", "RECORDER"]);
const UseCaseContext = createContext(UseCase.PLAYER);
const isEnabled = gkx("24145");

function useShowNewUX() {
  const context = useContext(UseCaseContext);
  return isEnabled && context === UseCase.PLAYER;
}

function getMousePos(event, element) {
  if (!element) return 0;
  const rect = element.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const width = rect.width;
  return clamp(offsetX / width, 0, 1);
}

function clamp(value, min, max) {
  return Math.min(Math.max(min, value), max);
}

function ScreenReaderLabel({ currentTime, duration }) {
  return (
    <div
      aria-label={fbt._("__JHASH__cCPjPb_WWZb__JHASH__")}
      aria-valuemax={duration}
      aria-valuemin={0}
      aria-valuenow={currentTime}
      role="slider"
      style={{ position: "absolute" }}
      tabIndex={0}
    />
  );
}
ScreenReaderLabel.displayName = `ScreenReaderLabel [from ${ScreenReaderLabel.name}]`;

function usePlaybackButtonContainerStyle() {
  return useShowNewUX()
    ? { marginLeft: 12, marginRight: 12 }
    : { marginLeft: 6, marginRight: 6 };
}

function useResetHighlightProgress(scrubberRef) {
  return useCallback(
    (event) => {
      const scrubber = scrubberRef.current;
      if (scrubber) {
        event.stopPropagation();
        scrubber.updateHighlight(0);
      }
    },
    [scrubberRef]
  );
}

// eslint-disable-next-line max-params
function useProgressLiveUpdate(
  duration,
  progressRef,
  currentTime,
  isProgressing,
  isUpdateHighlight,
  isCompleted
) {
  const animationRef = useRef();

  useEffect(() => {
    const updateHighlight = (progress) => {
      const scrubber = animationRef.current;
      if (scrubber) scrubber.updateHighlight(progress);
    };

    if (isCompleted) {
      isUpdateHighlight ? updateHighlight(100) : updateHighlight(0);
      return;
    }

    if (isProgressing) {
      let lastTime = { contents: undefined };
      let requestId;

      const step = (timestamp) => {
        let percentage;

        const progress = progressRef.current;

        if (progress) {
          percentage = progress.currentTime / progress.duration;
        } else {
          const { contents } = lastTime;
          let elapsed = 0;

          if (contents !== null) {
            elapsed = timestamp - contents;
          } else {
            lastTime.contents = timestamp;
          }
          percentage = elapsed / (duration * 1000);
        }

        const clampedProgress = Math.min(percentage * 100, 100);
        updateHighlight(clampedProgress);

        if (clampedProgress < 100) {
          requestId = requestAnimationFrameAcrossTransitions(step);
          return;
        }
      };

      requestId = requestAnimationFrameAcrossTransitions(step);
      return () => {
        if (requestId) cancelAnimationFrame(animationRef.current);
      };
    }

    if (progressRef.current !== null) {
      const progress =
        progressRef.current.currentTime / progressRef.current.duration;
      updateHighlight(progress * 100);
    }
  }, [
    duration,
    isProgressing,
    isCompleted,
    progressRef,
    animationRef,
    isUpdateHighlight,
    currentTime,
  ]);

  return animationRef;
}

// eslint-disable-next-line max-params
function useControlCenter(
  playable,
  nextPlayable,
  messageId,
  nextMessageId,
  logBrowserDenyAccess,
  highlightProgress,
  duration,
  mediaRenderQpl
) {
  const showNewUX = useShowNewUX();
  const stableError = useStable(() => logBrowserDenyAccess);
  const playbackElement = useMWPAudioPlaybackElement(
    playable,
    nextPlayable,
    messageId,
    nextMessageId,
    showNewUX
  );

  const currentAudioRef = useRef(playbackElement);
  const [playbackState, setPlaybackStateInternal] = useState(
    PlaybackStateEnum.NONE
  );
  const [currentTime, setCurrentTime] = useState(
    currentAudioRef?.currentTime ?? 0
  );

  useEffect(() => {
    if (!playbackElement) {
      setPlaybackStateInternal(PlaybackStateEnum.NONE);
      return;
    }

    playbackElement.ended && setPlaybackStateInternal(PlaybackStateEnum.ENDED);
    setPlaybackStateInternal(
      playbackElement.paused
        ? PlaybackStateEnum.PAUSED
        : PlaybackStateEnum.PLAYING
    );
    setCurrentTime(playbackElement.currentTime);
    currentAudioRef.current = playbackElement;
  }, [playbackElement]);

  useEffect(() => {
    const audioElement = currentAudioRef.current;
    if (!audioElement) return;

    const handleLoadError = (event) => {
      const error = event.currentTarget.error;
      const errorName = getErrorNameFromMediaErrorCode(error?.code);
      mediaRenderQpl?.endFail(`load-audio-error`, {
        string: { audio_error_name: errorName },
      });
    };

    const handleCanPlay = () => {
      audioElement.currentTime = audioElement;
      mediaRenderQpl?.endSuccess();
      setPlaybackStateInternal(PlaybackStateEnum.PAUSED);
    };

    const handlePlaying = () =>
      setPlaybackStateInternal(PlaybackStateEnum.PLAYING);
    const handlePause = () =>
      setPlaybackStateInternal(PlaybackStateEnum.PAUSED);
    const handleLoading = () =>
      setPlaybackStateInternal(PlaybackStateEnum.LOADING);
    const handleTimeUpdate = () => {
      if (currentAudioRef.current)
        setCurrentTime(currentAudioRef.current.currentTime);
    };

    const handleEnd = () => {
      if (currentAudioRef.current) currentAudioRef.current.currentTime = 0;
      setCurrentTime(0);
      setPlaybackStateInternal(PlaybackStateEnum.ENDED);
    };

    audioElement.addEventListener("loadstart", handleLoading);
    audioElement.addEventListener("canplay", handleCanPlay);
    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("playing", handlePlaying);
    audioElement.addEventListener("pause", handlePause);
    audioElement.addEventListener("ended", handleEnd);
    audioElement.addEventListener("error", handleLoadError);

    return () => {
      audioElement.removeEventListener("loadstart", handleLoading);
      audioElement.removeEventListener("canplay", handleCanPlay);
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("playing", handlePlaying);
      audioElement.removeEventListener("pause", handlePause);
      audioElement.removeEventListener("ended", handleEnd);
      audioElement.removeEventListener("error", handleLoadError);
      if (!showNewUX) audioElement.pause();
    };
  }, [playbackElement, mediaRenderQpl, showNewUX]);

  const togglePlayPause = useCallback(() => {
    const audioElement = currentAudioRef.current;
    if (!audioElement) return;

    switch (playbackState) {
      case PlaybackStateEnum.NONE:
      case PlaybackStateEnum.LOADING:
        return;
      case PlaybackStateEnum.ENDED:
      case PlaybackStateEnum.PAUSED:
        promiseDone(
          audioElement.play(),
          () => setPlaybackStateInternal(PlaybackStateEnum.PLAYING),
          stableError
        );
        return;
      case PlaybackStateEnum.PLAYING:
        audioElement.pause();
        setPlaybackStateInternal(PlaybackStateEnum.PAUSED);
        return;
    }
  }, [playbackState, stableError]);

  const setCurrentTimeAndHighlight = useCallback((newTime) => {
    const audioElement = currentAudioRef.current;
    if (!audioElement) return;
    audioElement.currentTime = newTime;
    setCurrentTime(newTime);
  }, []);

  return [
    playbackState,
    currentTime,
    currentAudioRef,
    togglePlayPause,
    useProgressLiveUpdate(
      duration,
      currentAudioRef,
      currentTime,
      playbackState === PlaybackStateEnum.PLAYING,
      highlightProgress,
      playbackState === PlaybackStateEnum.ENDED
    ),
    setCurrentTimeAndHighlight,
  ];
}

function useOutOfChatControlCenter() {
  const [audioElement, setAudioElement] = useMWPAudioOutOfChatPlayback();
  const [playbackState, setPlaybackState] = useState(() => {
    if (!audioElement) return PlaybackStateEnum.NONE;
    return audioElement.ended
      ? PlaybackStateEnum.ENDED
      : audioElement.paused
      ? PlaybackStateEnum.PAUSED
      : PlaybackStateEnum.PLAYING;
  });

  const [remainingTime, setRemainingTime] = useState(() => {
    return audioElement ? audioElement.duration - audioElement.currentTime : 0;
  });

  useEffect(() => {
    if (!audioElement) return;

    const handleTimeUpdate = () =>
      setRemainingTime(audioElement.duration - audioElement.currentTime);
    const handleLoading = () => setPlaybackState(PlaybackStateEnum.LOADING);
    const handleEnd = () => setPlaybackState(PlaybackStateEnum.ENDED);

    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("loadstart", handleLoading);
    audioElement.addEventListener("ended", handleEnd);

    promiseDone(audioElement.play(), () =>
      setPlaybackState(PlaybackStateEnum.PLAYING)
    );

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("loadstart", handleLoading);
      audioElement.removeEventListener("ended", handleEnd);
    };
  }, [audioElement]);

  const togglePlayPause = useCallback(() => {
    if (!audioElement) return;

    switch (playbackState) {
      case PlaybackStateEnum.NONE:
      case PlaybackStateEnum.LOADING:
        return;
      case PlaybackStateEnum.ENDED:
      case PlaybackStateEnum.PAUSED:
        promiseDone(audioElement.play(), () =>
          setPlaybackState(PlaybackStateEnum.PLAYING)
        );
        return;
      case PlaybackStateEnum.PLAYING:
        audioElement.pause();
        setPlaybackState(PlaybackStateEnum.PAUSED);
        return;
    }
  }, [audioElement, playbackState]);

  return [
    audioElement,
    playbackState === PlaybackStateEnum.PLAYING,
    audioElement && isEnabled,
    remainingTime,
    togglePlayPause,
    setAudioElement,
  ];
}

function useCalculatePlayerWidth(surface) {
  const displayContext = useMWLSThreadDisplayContext();
  const isQuickChatSurface = useIsQuickChatSurface();
  return (
    surface ??
    (displayContext === "Inbox"
      ? 218
      : displayContext === "ChatTab" && isQuickChatSurface
      ? 168
      : 180)
  );
}

function useCalculatePlayerHeight(surface) {
  const showNewUX = useShowNewUX();
  return showNewUX && surface === UseCase.PLAYER ? 70 : 36;
}

export {
  getMousePos,
  isEnabled,
  ScreenReaderLabel,
  PlaybackStateEnum as State,
  useCalculatePlayerHeight,
  useCalculatePlayerWidth,
  UseCase,
  UseCaseContext,
  useControlCenter,
  useOutOfChatControlCenter,
  usePlaybackButtonContainerStyle,
  useProgressLiveUpdate,
  useResetHighlightProgress,
  useShowNewUX,
};
