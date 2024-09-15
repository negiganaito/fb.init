/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import MWV2MessageProfilePhotoContent from "MWV2MessageProfilePhotoContent.react";

const MWV2MessageProfilePhoto = ({
  ariaHidden = false,
  display = "visible",
  isGroupThread,
  message,
}) => {
  return (
    <div className="xgd8bvy">
      {display === "visible" && (
        <MWV2MessageProfilePhotoContent
          ariaHidden={ariaHidden}
          isGroupThread={isGroupThread}
          message={message}
        />
      )}
    </div>
  );
};

MWV2MessageProfilePhoto.displayName = `MWV2MessageProfilePhoto [from ${__filename}]`;

export default MWV2MessageProfilePhoto;
