/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import gkx from "gkx";
import recoverableViolation from "recoverableViolation";

import FbtResult from "./FbtResult";
import { FbtResultGK } from "./FbtResultGK";
import getUnwrappedFbt from "./getUnwrappedFbt";
import InlineFbtResult from "./InlineFbtResult";

if (gkx("20935") && FbtResultGK.inlineMode === "TRANSLATION") {
  recoverableViolation(
    `TransAppInlineMode=TRANSLATION should not happen on Comet yet. [inlineMode=${
      FbtResultGK.inlineMode !== null ? FbtResultGK.inlineMode : ""
      // eslint-disable-next-line no-useless-concat
    }]` + `[runtime_site_is_comet=${String(gkx("20935"))}]`,
    "internationalization"
  );
}

const getFbtResult = (result) => {
  const unwrappedFbt = getUnwrappedFbt(result);
  if (unwrappedFbt !== null) return unwrappedFbt;

  const { contents, patternString, patternHash } = result;
  if (
    FbtResultGK.inlineMode !== null &&
    FbtResultGK.inlineMode !== "NO_INLINE"
  ) {
    return new InlineFbtResult(
      contents,
      FbtResultGK.inlineMode,
      patternString,
      patternHash
    );
  }

  return FbtResult.get(result);
};

export default getFbtResult;
