/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { CometErrorBoundary } from "./comet-error-boundary";
import { err } from "./err";

function ParseError(errorMessage) {
  // throw new Error(errorMessage);
  throw err(errorMessage);
}

/**
 *
 * @param {import("./types").RecoverableViolationWithComponentStackReactProps} props
 */
export const RecoverableViolationWithComponentStack = (props) => {
  const { errorMessage, fallback, projectName } = props;

  // return jsx(CometErrorBoundary, {
  //   children: jsx(ParseError, {
  //     errorMessage,
  //   }),
  //   context: { project: projectName, type: "error" },
  //   fallback: () => (fallback ? fallback : null),
  // });

  return (
    <CometErrorBoundary
      context={{
        project: projectName,
        type: "error",
      }}
      fallback={() => (fallback ? fallback : null)}
    >
      <ParseError errorMessage={errorMessage} />
    </CometErrorBoundary>
  );
};
