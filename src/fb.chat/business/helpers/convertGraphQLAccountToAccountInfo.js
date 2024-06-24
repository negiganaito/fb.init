/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

const convertGraphQLAccountToAccountInfo = (account) => {
  const {
    active_session: activeSession = false,
    contact_point: contactPoint,
    cuid,
    is_curr_user: isCurrUser = false,
    name,
    profile_url: profileURL,
    uid,
    user_type: userType,
  } = account;

  if (
    name !== null &&
    profileURL !== null &&
    userType !== null &&
    uid !== null &&
    cuid !== null
  ) {
    return {
      activeSession,
      contactPoint,
      cuid,
      isCurrUser,
      name,
      profileURL,
      uid,
      userType,
    };
  }
  return null;
};

export { convertGraphQLAccountToAccountInfo };
