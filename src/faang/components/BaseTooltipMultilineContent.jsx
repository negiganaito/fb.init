/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

function BaseTooltipMultilineContent({ children }) {
  if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {index < children.length - 1 && (
              <>
                <span className="xzpqnlu x1hyvwdk xjm9jq1 x6ikm8r x10wlt62 x10l6tqk x1i1rx1s">
                  ,{" "}
                </span>
                <br aria-hidden="true" />
              </>
            )}
          </React.Fragment>
        ))}
      </>
    );
  }
  return children;
}

BaseTooltipMultilineContent.displayName = `BaseTooltipMultilineContent`;

export default BaseTooltipMultilineContent;
