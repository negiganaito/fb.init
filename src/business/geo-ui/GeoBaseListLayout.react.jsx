/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import stylex from "@stylexjs/stylex";
import { BUIPrivateBoldItemLabelContext } from "BUIPrivateBoldItemLabelContext";
import { GeoBaseListLayoutContext } from "GeoBaseListLayoutContext";
import { GeoDomID } from "GeoDomID";
import { GeoPrivateBaseListMediaBackgroundContext } from "GeoPrivateBaseListMediaBackgroundContext";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import { useGeoPrivateListResponsiveDensity } from "useGeoPrivateListResponsiveDensity";
import { useMergeRefs } from "useMergeRefs";
import { useShallowEqualMemo } from "useShallowEqualMemo";

const styles = {
  root: {
    display: "x78zum5",
    listStyle: "xe8uvvx",
    marginTop: 0,
    marginEnd: 0,
    marginBottom: 0,
    marginStart: 0,
    paddingTop: 0,
    paddingEnd: 0,
    paddingBottom: 0,
    paddingStart: 0,
    ,
  },
  vertical: { flexDirection: "xdt5ytf",  },
  horizontal: { flexDirection: "x1q0g3np",  },
  verticalSpaced: {
    ":not([stylex-hack]) > * + *": { marginTop: "xdm93yi" },
    ,
  },
  horizontalSpaced: {
    ":not([stylex-hack]) > * + *": { marginStart: "xe9zolg" },
    ,
  },
};

const GeoBaseListLayout = ({
  accessibilityRole = "list",
  children,
  containerRef,
  "data-testid": dataTestId,
  density = "dense",
  describedBy,
  direction = "vertical",
  hasBoldItemLabel = false,
  id,
  labelledBy,
  shouldAlignRows = false,
  shouldSpaceRows = true,
  hasMediaBackground = false,
  xstyle,
  ...rest
}) => {
  const responsiveDensity = useGeoPrivateListResponsiveDensity(density);
  const [densityClassName, densityClassName2] = responsiveDensity;
  const memoizedValue = useShallowEqualMemo({
    density: densityClassName,
    direction,
    isWithinList: true,
    shouldAlignRows,
  });

  const domIDProps = GeoDomID.useApplyGeoDomIDsDirectly({
    id,
    "aria-labelledby": labelledBy,
    "aria-describedby": describedBy,
  });

  const { ref: domIDRef, ...domIDAttributes } = domIDProps;
  const mergedRefs = useMergeRefs(containerRef, domIDRef);

  return (
    <BUIPrivateBoldItemLabelContext.Provider value={hasBoldItemLabel}>
      <GeoPrivateBaseListMediaBackgroundContext.Provider
        value={hasMediaBackground}
      >
        <GeoBaseListLayoutContext.Provider value={memoizedValue}>
          {densityClassName2}
          <div
            {...domIDAttributes}
            className={stylex(
              styles.root,
              direction === "vertical" && styles.vertical,
              direction === "horizontal" && styles.horizontal,
              shouldSpaceRows &&
                direction === "vertical" &&
                styles.verticalSpaced,
              shouldSpaceRows &&
                direction === "horizontal" &&
                styles.horizontalSpaced,
              xstyle
            )}
            data-testid={undefined}
            ref={mergedRefs}
            role={accessibilityRole}
            children={children}
          />
        </GeoBaseListLayoutContext.Provider>
      </GeoPrivateBaseListMediaBackgroundContext.Provider>
    </BUIPrivateBoldItemLabelContext.Provider>
  );
};

GeoBaseListLayout.displayName = "GeoBaseListLayout [from GeoBaseListLayout]";

const GeoBaseListLayoutComponent = makeGeoComponent(
  "GeoBaseListLayout",
  GeoBaseListLayout
);

export default GeoBaseListLayoutComponent;
