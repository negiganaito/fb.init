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

import { isTimestampExpired } from "./LSMediaUrlUtils";
import rewriteFallbackUrl from "./rewriteFallbackUrl";

function previewUrl(attachment) {
  const { previewUrlExpirationTimestampMs, previewUrl, previewUrlFallback } =
    attachment;
  return previewUrlExpirationTimestampMs !== null &&
    isTimestampExpired(previewUrlExpirationTimestampMs)
    ? rewriteFallbackUrl(previewUrlFallback)
    : previewUrl;
}

function previewUrlLarge(attachment) {
  const {
    previewUrlExpirationTimestampMs,
    previewUrlLarge,
    previewUrlFallback,
  } = attachment;
  return previewUrlExpirationTimestampMs !== null &&
    isTimestampExpired(previewUrlExpirationTimestampMs)
    ? rewriteFallbackUrl(previewUrlFallback)
    : previewUrlLarge;
}

function playableUrl(attachment) {
  const { playableUrlExpirationTimestampMs, playableUrl, playableUrlFallback } =
    attachment;
  return playableUrlExpirationTimestampMs !== null &&
    isTimestampExpired(playableUrlExpirationTimestampMs)
    ? rewriteFallbackUrl(playableUrlFallback)
    : playableUrl;
}

function imageUrl(attachment) {
  const { imageUrlExpirationTimestampMs, imageUrl, imageUrlFallback } =
    attachment;
  return imageUrlExpirationTimestampMs !== null &&
    isTimestampExpired(imageUrlExpirationTimestampMs)
    ? rewriteFallbackUrl(imageUrlFallback)
    : imageUrl;
}

function faviconUrl(attachment) {
  const { faviconUrlExpirationTimestampMs, faviconUrl, faviconUrlFallback } =
    attachment;
  return faviconUrlExpirationTimestampMs !== null &&
    isTimestampExpired(faviconUrlExpirationTimestampMs)
    ? rewriteFallbackUrl(faviconUrlFallback)
    : faviconUrl;
}

function listItemContactUrlList1(attachment) {
  try {
    const {
      listItemContactUrlExpirationTimestampList1,
      listItemContactUrlFallbackList1,
      listItemContactUrlList1,
    } = attachment;
    return listItemContactUrlExpirationTimestampList1 !== null &&
      isTimestampExpired(
        I64.of_string(listItemContactUrlExpirationTimestampList1)
      )
      ? rewriteFallbackUrl(listItemContactUrlFallbackList1)
      : listItemContactUrlList1;
  } catch (error) {
    return attachment.listItemContactUrlList1;
  }
}

function listItemContactUrlList2(attachment) {
  try {
    const {
      listItemContactUrlExpirationTimestampList2,
      listItemContactUrlFallbackList2,
      listItemContactUrlList2,
    } = attachment;
    return listItemContactUrlExpirationTimestampList2 !== null &&
      isTimestampExpired(
        I64.of_string(listItemContactUrlExpirationTimestampList2)
      )
      ? rewriteFallbackUrl(listItemContactUrlFallbackList2)
      : listItemContactUrlList2;
  } catch (error) {
    return attachment.listItemContactUrlList2;
  }
}

function listItemContactUrlList3(attachment) {
  try {
    const {
      listItemContactUrlExpirationTimestampList3,
      listItemContactUrlFallbackList3,
      listItemContactUrlList3,
    } = attachment;
    return listItemContactUrlExpirationTimestampList3 !== null &&
      isTimestampExpired(
        I64.of_string(listItemContactUrlExpirationTimestampList3)
      )
      ? rewriteFallbackUrl(listItemContactUrlFallbackList3)
      : listItemContactUrlList3;
  } catch (error) {
    return attachment.listItemContactUrlList3;
  }
}

function headerImageUrl(attachment) {
  const {
    headerImageUrlExpirationTimestampMs,
    headerImageUrl,
    headerImageUrlFallback,
  } = attachment;
  return headerImageUrlExpirationTimestampMs !== null &&
    isTimestampExpired(headerImageUrlExpirationTimestampMs)
    ? rewriteFallbackUrl(headerImageUrlFallback)
    : headerImageUrl;
}

function listItemProfilePictureUrl1(attachment) {
  try {
    const {
      listItemProfilePictureUrlExpirationTimestamp1,
      listItemProfilePictureUrlFallback1,
      listItemProfilePictureUrl1,
    } = attachment;
    return listItemProfilePictureUrlExpirationTimestamp1 !== null &&
      isTimestampExpired(
        I64.of_string(listItemProfilePictureUrlExpirationTimestamp1)
      )
      ? rewriteFallbackUrl(listItemProfilePictureUrlFallback1)
      : listItemProfilePictureUrl1;
  } catch (error) {
    return attachment.listItemProfilePictureUrl1;
  }
}

function listItemProfilePictureUrl2(attachment) {
  try {
    const {
      listItemProfilePictureUrlExpirationTimestamp2,
      listItemProfilePictureUrlFallback2,
      listItemProfilePictureUrl2,
    } = attachment;
    return listItemProfilePictureUrlExpirationTimestamp2 !== null &&
      isTimestampExpired(
        I64.of_string(listItemProfilePictureUrlExpirationTimestamp2)
      )
      ? rewriteFallbackUrl(listItemProfilePictureUrlFallback2)
      : listItemProfilePictureUrl2;
  } catch (error) {
    return attachment.listItemProfilePictureUrl2;
  }
}

function listItemProfilePictureUrl3(attachment) {
  try {
    const {
      listItemProfilePictureUrlExpirationTimestamp3,
      listItemProfilePictureUrlFallback3,
      listItemProfilePictureUrl3,
    } = attachment;
    return listItemProfilePictureUrlExpirationTimestamp3 !== null &&
      isTimestampExpired(
        I64.of_string(listItemProfilePictureUrlExpirationTimestamp3)
      )
      ? rewriteFallbackUrl(listItemProfilePictureUrlFallback3)
      : listItemProfilePictureUrl3;
  } catch (error) {
    return attachment.listItemProfilePictureUrl3;
  }
}

export {
  faviconUrl,
  headerImageUrl,
  imageUrl,
  listItemContactUrlList1,
  listItemContactUrlList2,
  listItemContactUrlList3,
  listItemProfilePictureUrl1,
  listItemProfilePictureUrl2,
  listItemProfilePictureUrl3,
  playableUrl,
  previewUrl,
  previewUrlLarge,
};
