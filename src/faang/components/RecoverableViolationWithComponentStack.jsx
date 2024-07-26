/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import CometErrorBoundary from "./CometErrorBoundary";

function ThrowError({ errorMessage }) {
  throw Error(errorMessage);
}

ThrowError.displayName = `${ThrowError.name}`;

function RecoverableViolationWithComponentStack({
  errorMessage,
  fallback,
  projectName,
}) {
  return (
    <CometErrorBoundary
      context={{ project: projectName, type: "error" }}
      fallback={() => fallback ?? null}
    >
      <ThrowError errorMessage={errorMessage} />
    </CometErrorBoundary>
  );
}

RecoverableViolationWithComponentStack.displayName = `${RecoverableViolationWithComponentStack.name}`;

export default RecoverableViolationWithComponentStack;
