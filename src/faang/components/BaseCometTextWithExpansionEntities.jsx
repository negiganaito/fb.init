/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback } from "react";
import { html } from "react-strict-dom";
import fbt from "fbt";

import BaseCometTextWithEntities from "./BaseCometTextWithEntities.react";

function BaseCometTextWithExpansionEntities({
  LinkRenderer,
  seeLessLinkProps,
  seeMoreLinkProps,
  truncationStyle,
  ...props
}) {
  const renderExpansionFragment = useCallback(
    (isTruncated, numTruncatedLines, handleExpand) => {
      if (isTruncated) {
        if (truncationStyle === "see-more-and-less") {
          return (
            <React.Fragment key="seeless">
              {" "}
              <LinkRenderer
                onClick={handleExpand}
                role="button"
                testid={undefined}
                {...seeLessLinkProps}
              >
                {fbt("__JHASH__HOgvcwAgZf9__JHASH__")}
              </LinkRenderer>
            </React.Fragment>
          );
        }
      } else {
        if (truncationStyle === "none") {
          return null;
        }
        if (numTruncatedLines !== null && numTruncatedLines !== -1) {
          switch (truncationStyle) {
            case "ellipsis-only":
              return (
                <React.Fragment key="seemore">
                  {fbt("__JHASH__7lNkK2cLc2S__JHASH__")}
                </React.Fragment>
              );
            case "see-more":
            case "see-more-and-less":
            case "see-more-with-attachments":
              return (
                <React.Fragment key="seemore">
                  {fbt("__JHASH__7lNkK2cLc2S__JHASH__")}{" "}
                  <LinkRenderer
                    onClick={handleExpand}
                    role="button"
                    testid={undefined}
                    {...seeMoreLinkProps}
                  >
                    {fbt("__JHASH__JO3lyYgE_aY__JHASH__")}
                  </LinkRenderer>
                </React.Fragment>
              );
          }
        } else if (truncationStyle === "see-more-with-attachments") {
          return (
            <html.div key="seemore">
              <LinkRenderer
                onClick={handleExpand}
                role="button"
                testid={undefined}
                {...seeMoreLinkProps}
              >
                {fbt("__JHASH__JO3lyYgE_aY__JHASH__")}
              </LinkRenderer>
            </html.div>
          );
        }
      }
    },
    [LinkRenderer, seeLessLinkProps, seeMoreLinkProps, truncationStyle]
  );

  return (
    <BaseCometTextWithEntities
      truncationStyle={truncationStyle}
      {...props}
      seeMoreFragment={renderExpansionFragment}
    />
  );
}

BaseCometTextWithExpansionEntities.displayName = `${BaseCometTextWithExpansionEntities.name} [from ${module.id}]`;

export default BaseCometTextWithExpansionEntities;
