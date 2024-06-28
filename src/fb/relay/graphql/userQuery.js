/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { graphql } from "react-relay";

export const userQuery = graphql`
  query userQuery {
    user {
      userProfile {
        ...userProfile_user @module(name: "user-profile.jsx")
      }
    }
  }
`;
