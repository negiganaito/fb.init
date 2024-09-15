/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { FbtResultGK } from "./FbtResultGK";

const getUnwrappedFbt = (fbtResult) => {
  const contents = fbtResult.contents;

  if (
    !FbtResultGK.shouldReturnFbtResult &&
    FbtResultGK.inlineMode !== "REPORT"
  ) {
    if (contents === null) return undefined;
    if (contents.length === 1 && typeof contents[0] === "string") {
      return contents[0];
    }
    return contents;
  }
  return contents;
};

export default getUnwrappedFbt;
