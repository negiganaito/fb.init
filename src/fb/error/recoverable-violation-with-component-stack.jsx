/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import { CometErrorBoundary } from "./comet-error-boundary";
import { err } from "./err";

function ThrowErr(props) {
  const { errorMessage } = props;
  throw err(errorMessage);
}

export const RecoverableViolationWithComponentStack = (props) => {
  const { errorMessage, fallback, projectName } = props;

  return (
    <CometErrorBoundary
      context={{ project: projectName, type: "error" }}
      fallback={() => fallback ?? null}
      // eslint-disable-next-line react/no-children-prop
      children={<ThrowErr errorMessage={errorMessage} />}
    />
  );
};

RecoverableViolationWithComponentStack.displayName = `RecoverableViolationWithComponentStack.react`;
