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
import React, { useContext } from "react";
import stylex from "@stylexjs/stylex";
import emptyFunction from "emptyFunction";
import GeoPrivateCardLayoutContext from "GeoPrivateCardLayoutContext";
import GeoPrivateCardSectionContext from "GeoPrivateCardSectionContext";
import GeoPrivateLoggingRegion from "GeoPrivateLoggingRegion.react";
import GeoPrivateSectionStyleContext from "GeoPrivateSectionStyleContext";
import useGeoTheme from "useGeoTheme";
import useMergeRefs from "useMergeRefs";

import { makeGeoComponent } from "./GeoPrivateMakeComponent";

const styles = {
  root: {
    flexGrow: "x1iyjqo2",
    flexShrink: "xs83m0k",
    flexBasis: "xdl72j9",
    height: "x3igimt",
    maxHeight: "xedcshv",
    minHeight: "x1t2pt76",
  },
  noBorder: {
    borderTopWidth: "x972fbf",
    borderEndWidth: "xcfux6l",
    borderBottomWidth: "x1qhh985",
    borderStartWidth: "xm0m39n",
  },
};

const GeoSection = ({
  children,
  containerRef,
  "data-testid": dataTestId,
  variant,
  xstyle,
}) => {
  const { selectBorderRadius, selectSpacing, selectStaticBackgroundColor } =
    useGeoTheme();
  const [layoutContext, setLayoutContext] = useContext(
    GeoPrivateCardLayoutContext
  );
  const sectionStyleContext = useContext(GeoPrivateSectionStyleContext);
  const cardSectionContext = useContext(GeoPrivateCardSectionContext);
  const mergedRefs = useMergeRefs(setLayoutContext, containerRef);

  const isSecondary = variant === "secondary";
  const stylesToApply = [
    selectSpacing({
      context: "container",
      bounds: "internal",
      relation: "component",
    }),
    isSecondary &&
      selectStaticBackgroundColor({ isMuted: true, surface: "wash" }),
    isSecondary && selectBorderRadius({ context: "container" }),
  ];

  return (
    <GeoPrivateLoggingRegion
      inputRef={mergedRefs}
      isDependentRegion={cardSectionContext}
      name="GeoSection"
    >
      {(ref) => (
        <div
          className={stylex([
            styles.root,
            xstyle,
            stylesToApply,
            layoutContext,
            isSecondary && styles.noBorder,
            sectionStyleContext,
          ])}
          data-testid={dataTestId}
          ref={ref}
        >
          <GeoPrivateCardLayoutContext.Provider value={emptyFunction}>
            {children}
          </GeoPrivateCardLayoutContext.Provider>
        </div>
      )}
    </GeoPrivateLoggingRegion>
  );
};

GeoSection.displayName = `${GeoSection.name} [from some-module-id]`;

const ExportedGeoSection = makeGeoComponent("GeoSection", GeoSection);
export default ExportedGeoSection;
