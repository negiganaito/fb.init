/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

// import { requireDeferred } from "requireDeferred";
import BaseToasterStateManager from "./BaseToasterStateManager";
import CometToast from "./CometToast";
// import deferredLoadComponent from "./deferredLoadComponent";
import FBIconCautionTriangleFilled20 from "./FBIconCautionTriangleFilled20.svg";
import FDSIcon from "./FDSIcon";

// const CometToast = deferredLoadComponent(
//   requireDeferred("CometToast.react").__setRef("cometPushToast")
// );
const toasterStateManager = BaseToasterStateManager.getInstance();

const cometPushToast = (
  toastProps,
  duration = 2750,
  stateManager = toasterStateManager
) => {
  const toastId = stateManager.push(
    <CometToast
      {...toastProps}
      loadImmediately={true}
      onDismiss={() => stateManager.expire(toastId)}
    />,
    duration
  );
  return toastId;
};

const cometPushSimpleToast = (message, duration) =>
  cometPushToast({ message }, duration);

const cometPushErrorToast = (toastProps, duration = 2750, stateManager) =>
  cometPushToast(
    {
      ...toastProps,
      icon: (
        <FDSIcon
          color="warning"
          icon={FBIconCautionTriangleFilled20}
          size={20}
        />
      ),
    },
    duration,
    stateManager
  );

export { cometPushErrorToast, cometPushSimpleToast, cometPushToast };
