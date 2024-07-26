/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
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

const BaseCometTextWithExpansionEntities = ({
  LinkRenderer,
  seeLessLinkProps,
  seeMoreLinkProps,
  truncationStyle,
  ...props
}) => {
  const renderTruncation = useCallback(
    (isTruncated, textLength, onClick) => {
      if (isTruncated) {
        if (truncationStyle === "see-more-and-less") {
          return (
            <>
              {" "}
              <LinkRenderer
                onClick={onClick}
                role="button"
                testid={undefined}
                {...seeLessLinkProps}
              >
                {fbt("__JHASH__HOgvcwAgZf9__JHASH__")}
              </LinkRenderer>
            </>
          );
        }
      } else {
        if (truncationStyle === "none") return null;
        if (textLength !== null && textLength !== -1) {
          switch (truncationStyle) {
            case "ellipsis-only":
              return <>{fbt("__JHASH__7lNkK2cLc2S__JHASH__")}</>;
            case "see-more":
            case "see-more-and-less":
            case "see-more-with-attachments":
              return (
                <>
                  {fbt("__JHASH__7lNkK2cLc2S__JHASH__")}{" "}
                  <LinkRenderer
                    onClick={onClick}
                    role="button"
                    testid={undefined}
                    {...seeMoreLinkProps}
                  >
                    {fbt("__JHASH__JO3lyYgE_aY__JHASH__")}
                  </LinkRenderer>
                </>
              );
          }
        } else if (truncationStyle === "see-more-with-attachments") {
          return (
            <html.div>
              <LinkRenderer
                onClick={onClick}
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
      seeMoreFragment={renderTruncation}
    />
  );
};

BaseCometTextWithExpansionEntities.displayName = `BaseCometTextWithExpansionEntities [from ${module.id}]`;

export default BaseCometTextWithExpansionEntities;
