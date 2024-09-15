/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import useKeyCommands from "../../hooks/useKeyCommands";

import CometKeyCommandWrapper from "./CometKeyCommandWrapper";

const styles = {
  displayInherit: { display: "x1jfb8zj",  },
  inherit: {
    alignContent: "x4k7w5x",
    alignItems: "x1h91t0o",
    flexDirection: "x1beo9mf",
    flexGrow: "xaigb6o",
    flexShrink: "x12ejxvf",
    height: "x3igimt",
    justifyContent: "xarpa2k",
    maxHeight: "xedcshv",
    maxWidth: "x1lytzrv",
    minHeight: "x1t2pt76",
    minWidth: "x7ja8zs",
    position: "relative",
    width: "x1qrby5j",
    ,
  },
};

const KeyCommandHandler = ({ commandConfigs }) => {
  useKeyCommands(commandConfigs);
  return null;
};

KeyCommandHandler.displayName = `${KeyCommandHandler.name} [from ${module.id}]`;

const CometComponentWithKeyCommands = ({
  children,
  commandConfigs,
  elementType = "div",
  xstyle,
  ...restProps
}) => {
  const combinedStyles =
    elementType === "span"
      ? styles.inherit
      : [styles.inherit, styles.displayInherit];

  return (
    <CometKeyCommandWrapper
      elementType={elementType}
      xstyle={xstyle ?? combinedStyles}
      {...restProps}
    >
      <KeyCommandHandler commandConfigs={commandConfigs} />
      {children}
    </CometKeyCommandWrapper>
  );
};

CometComponentWithKeyCommands.displayName = `${CometComponentWithKeyCommands.name} [from ${module.id}]`;

export default CometComponentWithKeyCommands;
