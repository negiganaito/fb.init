/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { graphql } from "react-relay";

import * as add from "../__generated__/UserProfileRenderer_renderer.graphql";

export const userQuery = graphql`
  query UserQuery {
    user {
      userProfile_renderer {
        ...UserProfileRenderer_renderer @module(name: "user-profile.jsx")
      }
    }
  }
`;
