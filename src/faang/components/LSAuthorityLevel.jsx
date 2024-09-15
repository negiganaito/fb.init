/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const LSAuthorityLevel = Object.freeze({
  OPTIMISTIC: 20,
  CLIENT_PARTIAL: 40,
  SERVER_PARTIAL: 60,
  AUTHORITATIVE_PENDING_REPLACEMENT: 75,
  AUTHORITATIVE: 80,
  CLIENT_AUTHORITATIVE_DELETE: 100,
});

export default LSAuthorityLevel;
