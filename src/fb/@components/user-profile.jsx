/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import { useFragment } from "react-relay";

import { userProfileRendererFragment } from "@/fb/@graphql/UserProfileRenderer";

let query;

const UserProfile = ({ renderer }) => {
  const data = useFragment(
    query ? query : (query = userProfileRendererFragment),
    renderer
  );

  console.log({ data });

  return <div>demo</div>;
};

export default UserProfile;
