/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useMemo } from "react";

import { unvault, unvaultOrThrow } from "./MAWVault";

const getMWUnvaultedText = (isSecure, text) => {
  if (unvault === null || text === null) return text;
  return isSecure ? unvaultOrThrow(text) : unvault(text, true);
};

const useMWUnvaultedText = (isSecure, text) => {
  const result = useMemo(
    () => getMWUnvaultedText(isSecure, text),
    [isSecure, text]
  );
  return result;
};

export { getMWUnvaultedText, useMWUnvaultedText };
