/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";

import CometProfilePhoto from "./CometProfilePhoto";

const TetraProfilePhoto = forwardRef((props, ref) => {
  return <CometProfilePhoto {...props} ref={ref} />;
});

TetraProfilePhoto.displayName = `${TetraProfilePhoto.name} [from ${module.id}]`;

export default TetraProfilePhoto;
