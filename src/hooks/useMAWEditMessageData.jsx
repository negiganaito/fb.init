/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext } from "react";

import { MAWEditMessageContext } from "../context/MAWEditMessageContext.react";

const useMAWEditMessageData = () => {
  const { editMessageData } = useContext(MAWEditMessageContext);
  return editMessageData;
};

export default useMAWEditMessageData;
