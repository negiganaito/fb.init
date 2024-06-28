/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import { graphql, useFragment } from "react-relay";

let query;

const UserProfile = ({ user }) => {
  const data = useFragment(
    query
      ? query
      : (query = graphql`
          fragment userProfile_user on UserProfile {
            name
            age
          }
        `),
    user
  );

  console.log({ data });

  return <div>demo</div>;
};

export default UserProfile;
