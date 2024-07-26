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

/* eslint-disable no-undef */

const LSIntEnum = {
  ofNumber: (n) => BigInt(n),
};

const I64 = {
  equal: (a, b) => a === b,
};

const LSThreadBitOffset = {
  has: (offset, thread) => {
    // Implement bit offset checking logic here
    return false;
  },
};

const MessagingThreadSubtype = {
  IGD_BC_PARTNERSHIP: BigInt(0),
  BUSINESS_SUPPORT_THREAD: BigInt(0),
  SUPPORT_MESSAGING_THREAD: BigInt(0),
  PAGE_TO_USER: BigInt(0),
  WORKCHAT_GROUP_THREAD: BigInt(0),
  WORKROOM_GROUP_THREAD: BigInt(0),
  WORKCHAT_ONE_TO_ONE: BigInt(0),
};

const LSMessageThreadUnsendabilityStatus = {
  DENY_IF_PAGE_THREAD: BigInt(0),
};

const MWCMIsAnyCMThread = (threadKey) => {
  // Implement logic to check if the thread is a CM thread
  return false;
};

const MetaConfig = {
  _: (configKey) => {
    // Implement logic to retrieve config value based on the key
    return false;
  },
};

const isGroup = (threadType) =>
  I64.equal(threadType, LSIntEnum.ofNumber(2)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(8)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(16)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(5)) ||
  MWCMIsAnyCMThread(threadType) ||
  I64.equal(threadType, LSIntEnum.ofNumber(3)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(150)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(151)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(154)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(155)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(152)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(153)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(26));

const isOpenOneToOne = (threadType) =>
  I64.equal(threadType, LSIntEnum.ofNumber(1)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(7)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(10)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(13)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(201));

const isOneToOne = (threadType) =>
  isOpenOneToOne(threadType) || I64.equal(threadType, LSIntEnum.ofNumber(15));

const isArmadilloSecure = (threadType) =>
  I64.equal(threadType, LSIntEnum.ofNumber(15)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(16));

const isRecentsSectionAllowedTypes = (threadType) =>
  I64.equal(threadType, LSIntEnum.ofNumber(15)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(16)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(1)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(201)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(2));

const isMessengerOrE2EEInbox = (inboxType) =>
  inboxType === "e2ee_cutover" || inboxType === "inbox";

const isMessageRequest = (thread, shouldCheckParentThread = true) =>
  !shouldCheckParentThread &&
  I64.equal(thread.parentThreadKey, LSIntEnum.ofNumber(0))
    ? false
    : LSThreadBitOffset.has(21, thread);

const isPartnership = (threadSubtype) =>
  threadSubtype !== null &&
  I64.equal(
    threadSubtype,
    LSIntEnum.ofNumber(MessagingThreadSubtype.IGD_BC_PARTNERSHIP)
  );

const isIGDMessageRequest = (thread) => isMessageRequest(thread, false);

const isHiddenRequest = (thread) =>
  I64.equal(thread.parentThreadKey, LSIntEnum.ofNumber(-3));

const isBusinessSupportThread = (threadSubtype) =>
  threadSubtype !== null &&
  (I64.equal(
    threadSubtype,
    LSIntEnum.ofNumber(MessagingThreadSubtype.BUSINESS_SUPPORT_THREAD)
  ) ||
    I64.equal(
      threadSubtype,
      LSIntEnum.ofNumber(MessagingThreadSubtype.SUPPORT_MESSAGING_THREAD)
    ));

const isOpenFnFThread = (thread) => {
  const isGroup = I64.equal(thread.threadType, LSIntEnum.ofNumber(2));
  const isOneToOne =
    I64.equal(thread.threadType, LSIntEnum.ofNumber(1)) &&
    !isThreadForPage(thread);
  return (
    !isBusinessSupportThread(thread.threadSubtype) && (isGroup || isOneToOne)
  );
};

const isPageToUserThread = (threadSubtype) =>
  threadSubtype !== null &&
  I64.equal(
    threadSubtype,
    LSIntEnum.ofNumber(MessagingThreadSubtype.PAGE_TO_USER)
  );

const isJoinedSocialChannel = (threadType) =>
  I64.equal(threadType, LSIntEnum.ofNumber(150)) ||
  (I64.equal(threadType, LSIntEnum.ofNumber(154)) && MetaConfig._("36"));

const isDiscoverablePublicBroadcastChannel = (threadType) =>
  (isJoinedDiscoverablePublicBroadcastChannel(threadType) ||
    isUnjoinedDiscoverablePublicBroadcastChannel(threadType)) &&
  MetaConfig._("32");

const isDiscoverablePublicBroadcastChannelWithNoAccessibility = (threadType) =>
  (isJoinedDiscoverablePublicBroadcastChannel(threadType) ||
    isUnjoinedDiscoverablePublicBroadcastChannel(threadType)) &&
  !MetaConfig._("32");

const isJoinedDiscoverablePublicBroadcastChannel = (threadType) =>
  I64.equal(threadType, LSIntEnum.ofNumber(152));

const isUnjoinedDiscoverablePublicBroadcastChannel = (threadType) =>
  I64.equal(threadType, LSIntEnum.ofNumber(153));

const isSocialChannelV2 = (threadType) =>
  (I64.equal(threadType, LSIntEnum.ofNumber(155)) ||
    I64.equal(threadType, LSIntEnum.ofNumber(154))) &&
  MetaConfig._("36");

const isJoinedSocialChannelV2 = (threadType) =>
  I64.equal(threadType, LSIntEnum.ofNumber(154)) && MetaConfig._("36");

const isSocialChannel = (threadType) =>
  threadType !== null &&
  (I64.equal(threadType, LSIntEnum.ofNumber(150)) ||
    I64.equal(threadType, LSIntEnum.ofNumber(154)));

const isDiscoverableChannel = (threadType) =>
  isSocialChannel(threadType) ||
  isDiscoverablePublicBroadcastChannel(threadType);

const isCMSubthread = (threadType) =>
  I64.equal(threadType, LSIntEnum.ofNumber(26));

const isCMFolder = (threadType) =>
  I64.equal(threadType, LSIntEnum.ofNumber(17));

const isCMGroupUnjoined = (threadType) =>
  I64.equal(threadType, LSIntEnum.ofNumber(19));

const isSocialChannelUnjoined = (threadType) =>
  threadType !== null &&
  (I64.equal(threadType, LSIntEnum.ofNumber(151)) ||
    I64.equal(threadType, LSIntEnum.ofNumber(155)));

const isChannelPreview = (threadType) =>
  threadType !== null &&
  (isSocialChannelUnjoined(threadType) ||
    isUnjoinedDiscoverablePublicBroadcastChannel(threadType));

const isAiBot = (threadType) =>
  threadType !== null && I64.equal(threadType, LSIntEnum.ofNumber(201));

const isAiBotSummoning = (thread) => LSThreadBitOffset.has(183, thread);

const isPrivateThread = (threadType) =>
  isArmadilloSecure(threadType) ||
  I64.equal(threadType, LSIntEnum.ofNumber(1)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(2)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(3)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(4)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(5)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(6)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(10)) ||
  I64.equal(threadType, LSIntEnum.ofNumber(11));

const isPublicCMThread = (threadType) =>
  isDiscoverableChannel(threadType) ||
  isSocialChannelUnjoined(threadType) ||
  isUnjoinedDiscoverablePublicBroadcastChannel(threadType) ||
  MWCMIsAnyCMThread(threadType) ||
  I64.equal(threadType, LSIntEnum.ofNumber(17)) ||
  isCMSubthread(threadType);

const isThreadForPage = (thread) =>
  I64.equal(thread.threadType, LSIntEnum.ofNumber(1)) &&
  thread.cannotUnsendReason !== null &&
  I64.equal(
    thread.cannotUnsendReason,
    LSIntEnum.ofNumber(LSMessageThreadUnsendabilityStatus.DENY_IF_PAGE_THREAD)
  );

const isWorkThread = (threadSubtype) =>
  threadSubtype !== null &&
  (I64.equal(
    threadSubtype,
    LSIntEnum.ofNumber(MessagingThreadSubtype.WORKCHAT_GROUP_THREAD)
  ) ||
    I64.equal(
      threadSubtype,
      LSIntEnum.ofNumber(MessagingThreadSubtype.WORKROOM_GROUP_THREAD)
    ) ||
    I64.equal(
      threadSubtype,
      LSIntEnum.ofNumber(MessagingThreadSubtype.WORKCHAT_ONE_TO_ONE)
    ));

export {
  isAiBot,
  isAiBotSummoning,
  isArmadilloSecure,
  isBusinessSupportThread,
  isChannelPreview,
  isCMFolder,
  isCMGroupUnjoined,
  isCMSubthread,
  isDiscoverableChannel,
  isDiscoverablePublicBroadcastChannel,
  isDiscoverablePublicBroadcastChannelWithNoAccessibility,
  isGroup,
  isHiddenRequest,
  isIGDMessageRequest,
  isJoinedDiscoverablePublicBroadcastChannel,
  isJoinedSocialChannel,
  isJoinedSocialChannelV2,
  isMessageRequest,
  isMessengerOrE2EEInbox,
  isOneToOne,
  isOpenFnFThread,
  isOpenOneToOne,
  isPageToUserThread,
  isPartnership,
  isPrivateThread,
  isPublicCMThread,
  isRecentsSectionAllowedTypes,
  isSocialChannel,
  isSocialChannelUnjoined,
  isSocialChannelV2,
  isThreadForPage,
  isUnjoinedDiscoverablePublicBroadcastChannel,
  isWorkThread,
};
