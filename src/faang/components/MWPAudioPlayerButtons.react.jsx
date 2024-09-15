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

import { useMWPAudioPlaybackRate } from "../../context/MWPAudioPlaybackContext.react";

import sharedStyles from "./MWPAudioPlayerSharedStyles";
import { useShowNewUX } from "./MWPAudioPlayerUtils";
import MWXPressable from "./MWXPressable";

const PlaybackRateButton = ({ outgoing }) => {
  const showNewUX = useShowNewUX();
  const [playbackRate, setPlaybackRate] = useMWPAudioPlaybackRate();

  if (!showNewUX) return null;

  const color = outgoing
    ? "var(--always-white)"
    : "var(--progress-ring-neutral-foreground)";

  return (
    <MWXPressable onPress={setPlaybackRate} overlayDisabled>
      <div
        className={stylex(
          sharedStyles.rightSideTop,
          sharedStyles.rightSideMargin,
          sharedStyles.rightSideBottom,
          sharedStyles.rightSideImprove
        )}
        style={{
          backgroundColor: "var(--placeholder-text-on-media)",
          borderRadius: 10,
          color: color,
        }}
      >
        {playbackRate}
      </div>
    </MWXPressable>
  );
};

PlaybackRateButton.displayName = `${PlaybackRateButton.name} [from ${module.id}]`;

const AudioPlayerPlaybackButton = ({
  disabled,
  icon,
  label,
  onHoverMove,
  onPress,
}) => {
  const showNewUX = useShowNewUX();
  const style = showNewUX ? { backgroundColor: "transparent" } : {};

  return (
    <MWXPressable
      aria-label={label}
      disabled={disabled}
      onPress={onPress}
      overlayDisabled={showNewUX}
      overlayRadius="50%"
      style={style}
      xstyle={sharedStyles.pressable}
    >
      {icon}
    </MWXPressable>
  );
};

AudioPlayerPlaybackButton.displayName = `${AudioPlayerPlaybackButton.name} [from ${module.id}]`;

export { AudioPlayerPlaybackButton, PlaybackRateButton };
