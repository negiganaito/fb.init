/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import { useLazyLoadQuery } from "react-relay/lib/relay-hooks/useLazyLoadQuery.js";
import { RelayMatchContainer } from "@fb-relay/relay-match-container";

import { userQuery } from "@/fb/@graphql/UserQuery";

let query;

export const UserInfo = () => {
  const { user } = useLazyLoadQuery(query ? query : (query = userQuery), {});

  return <RelayMatchContainer match={user.userProfile} />;
};
