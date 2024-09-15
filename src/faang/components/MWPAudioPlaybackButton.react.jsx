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
import React from "react";
import stylex from "@stylexjs/stylex";
import { MWXSpinner } from "required-modules";

import MWPAudioPlaybackIcon from "./MWPAudioPlaybackIcon.react";
import { AudioPlayerPlaybackButton } from "./MWPAudioPlayerButtons.react";
import { pauseLabel, playLabel } from "./MWPAudioPlayerLabels";
import MWPAudioPlayerSharedStyles from "./MWPAudioPlayerSharedStyles";
import {
  usePlaybackButtonContainerStyle,
  useResetHighlightProgress,
} from "./MWPAudioPlayerUtils";

const MWPAudioPlaybackButton = ({
  isLoading,
  onPress,
  scrubberRef,
  disabled,
  hasEnded,
  isPaused,
  isPlaying,
  outgoing,
}) => {
  const containerStyle = usePlaybackButtonContainerStyle();
  const resetHighlightProgress = useResetHighlightProgress(scrubberRef);
  const isActive = isPlaying || isPaused;

  const handleMouseMove = isActive ? resetHighlightProgress : undefined;

  return isLoading ? (
    <div
      className={stylex(MWPAudioPlayerSharedStyles.pressable)}
      onMouseMove={handleMouseMove}
      style={containerStyle}
    >
      <MWXSpinner color="disabled" size={16} />
    </div>
  ) : (
    <div onMouseMove={handleMouseMove} style={containerStyle}>
      <AudioPlayerPlaybackButton
        disabled={disabled}
        icon={
          <MWPAudioPlaybackIcon
            disabled={disabled}
            hasEnded={hasEnded}
            isPaused={isPaused}
            isPlaying={isPlaying}
            outgoing={outgoing}
          />
        }
        label={isPlaying ? pauseLabel : playLabel}
        onPress={onPress}
      />
    </div>
  );
};

MWPAudioPlaybackButton.displayName = `${MWPAudioPlaybackButton.name}`;

export default MWPAudioPlaybackButton;
