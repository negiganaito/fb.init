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

import { PauseIcon, PlayIcon } from "./MWPAudioPlayerIcons.react";
import { useShowNewUX } from "./MWPAudioPlayerUtils";

const MWPAudioPlaybackIcon = ({
  disabled,
  hasEnded,
  isPaused,
  isPlaying,
  outgoing,
}) => {
  const showNewUX = useShowNewUX();

  const color = showNewUX
    ? outgoing
      ? "var(--always-white)"
      : "var(--progress-ring-neutral-foreground)"
    : outgoing
    ? "var(--chat-outgoing-message-bubble-background-color)"
    : undefined;

  if (isPlaying) {
    return <PauseIcon color={color} />;
  }

  if (isPaused || hasEnded || disabled) {
    return <PlayIcon color={color} />;
  }

  return null;
};

MWPAudioPlaybackIcon.displayName = `${MWPAudioPlaybackIcon.name} [from MWPAudioPlaybackIcon.react]`;

export default MWPAudioPlaybackIcon;
