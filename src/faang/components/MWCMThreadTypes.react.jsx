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
import { I64 } from "I64";
import { isUnjoinedCMThread as isUnjoinedCMThreadUtil } from "isUnjoinedCMThread";
import { LSCommunityBitOffset } from "LSCommunityBitOffset";
import { LSIntEnum } from "LSIntEnum";
import { MessagingThreadSubtype } from "MessagingThreadSubtype";
import { MetaConfig } from "MetaConfig";

const isJoinedCMThread = (a) => {
  return (
    I64.equal(a, LSIntEnum.ofNumber(18)) ||
    I64.equal(a, LSIntEnum.ofNumber(23)) ||
    I64.equal(a, LSIntEnum.ofNumber(21))
  );
};

const isStandardCMThread = (a) => {
  return (
    I64.equal(a, LSIntEnum.ofNumber(18)) || I64.equal(a, LSIntEnum.ofNumber(19))
  );
};

const isBroadcastThread = (a) => {
  return (
    I64.equal(a, LSIntEnum.ofNumber(23)) || I64.equal(a, LSIntEnum.ofNumber(24))
  );
};

const isMarketplaceThread = (a) => {
  return a !== null
    ? I64.equal(
        a,
        LSIntEnum.ofNumber(MessagingThreadSubtype.MARKETPLACE_THREAD)
      )
    : false;
};

const isIGBroadcastChannelThread = (a) => {
  return a !== null
    ? I64.equal(
        a,
        LSIntEnum.ofNumber(
          MessagingThreadSubtype.IG_CREATOR_SUBSCRIBER_BROADCAST_CHAT
        )
      )
    : false;
};

const isPrivateThread = (a) => {
  return (
    I64.equal(a, LSIntEnum.ofNumber(21)) || I64.equal(a, LSIntEnum.ofNumber(22))
  );
};

const isThreadEnabled = (a, b) => {
  const hasCommunityBit = LSCommunityBitOffset.has(1, b);
  const isPrivate = I64.equal(a.threadType, LSIntEnum.ofNumber(21));
  const broadcastThread = isBroadcastThread(a.threadType) && MetaConfig._("34");
  const privateThread = isPrivateThread(a.threadType) && MetaConfig._("35");
  const isTakedown =
    b.takedownState !== null &&
    I64.equal(b.takedownState, LSIntEnum.ofNumber(1));

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
