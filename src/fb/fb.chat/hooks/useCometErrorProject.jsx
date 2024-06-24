/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useContext } from "react";

const CometErrorProjectContext = React.createContext(undefined);

function useCometErrorProject() {
  return useContext(CometErrorProjectContext);
}

export default useCometErrorProject;
