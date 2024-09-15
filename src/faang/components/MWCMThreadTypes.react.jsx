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
import { LSCommunityBitOffset } from "LSCommunityBitOffset";
import { MessagingThreadSubtype } from "MessagingThreadSubtype";
import { MetaConfig } from "MetaConfig";

import { equal } from "../../helpers/I64";
import { isUnjoinedCMThread as isUnjoinedCMThreadUtil } from "../../helpers/isUnjoinedCMThread";

import { ofNumber } from "./LSIntEnum";

const isJoinedCMThread = (a) => {
  return (
    equal(a, ofNumber(18)) || equal(a, ofNumber(23)) || equal(a, ofNumber(21))
  );
};

const isStandardCMThread = (a) => {
  return equal(a, ofNumber(18)) || equal(a, ofNumber(19));
};

const isBroadcastThread = (a) => {
  return equal(a, ofNumber(23)) || equal(a, ofNumber(24));
};

const isMarketplaceThread = (a) => {
  return a !== null
    ? equal(a, ofNumber(MessagingThreadSubtype.MARKETPLACE_THREAD))
    : false;
};

const isIGBroadcastChannelThread = (a) => {
  return a !== null
    ? equal(
        a,
        ofNumber(MessagingThreadSubtype.IG_CREATOR_SUBSCRIBER_BROADCAST_CHAT)
      )
    : false;
};

const isPrivateThread = (a) => {
  return equal(a, ofNumber(21)) || equal(a, ofNumber(22));
};

const isThreadEnabled = (a, b) => {
  const hasCommunityBit = LSCommunityBitOffset.has(1, b);
  const isPrivate = equal(a.threadType, ofNumber(21));
  const broadcastThread = isBroadcastThread(a.threadType) && MetaConfig._("34");
  const privateThread = isPrivateThread(a.threadType) && MetaConfig._("35");
  const isTakedown =
    b.takedownState !== null && equal(b.takedownState, ofNumber(1));

  return (
    !isTakedown &&
    (isStandardCMThread(a.threadType) ||
      broadcastThread ||
      privateThread ||
      hasCommunityBit ||
      isPrivate ||
      a.hasPendingInvitation)
  );
};

export {
  isBroadcastThread,
  isIGBroadcastChannelThread,
  isJoinedCMThread,
  isMarketplaceThread,
  isPrivateThread,
  isStandardCMThread,
  isThreadEnabled,
  isUnjoinedCMThreadUtil as isUnjoinedCMThread,
};
