/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import JSResourceForInteraction from "JSResourceForInteraction";
import MWV2MessageProfilePhotoMenuQueryParameters from "MWV2MessageProfilePhotoMenuQuery$Parameters";

const MWV2MessageProfilePhotoMenuEntrypoint = {
  getPreloadProps({ groupID, userID }) {
    return {
      queries: {
        messageProfilePhotoMenuQueryRef: {
          parameters: MWV2MessageProfilePhotoMenuQueryParameters,
          variables: { groupID, userID },
        },
      },
    };
  },
  root: JSResourceForInteraction("MWV2MessageProfilePhotoMenu.react").__setRef(
    "MWV2MessageProfilePhotoMenu.entrypoint"
  ),
};

export default MWV2MessageProfilePhotoMenuEntrypoint;
