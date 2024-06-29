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
    marginTop: "xdj266r",
    marginEnd: "x11i5rnm",
    marginBottom: "xat24cr",
    marginStart: "x1mh8g0r",
    paddingTop: "xexx8yu",
    paddingEnd: "x4uap5",
    paddingBottom: "x18d9i69",
    paddingStart: "xkhd6sd",
    $$css: true,
  },
  vertical: { flexDirection: "xdt5ytf", $$css: true },
  horizontal: { flexDirection: "x1q0g3np", $$css: true },
  verticalSpaced: {
    ":not([stylex-hack]) > * + *": { marginTop: "xdm93yi" },
    $$css: true,
  },
  horizontalSpaced: {
    ":not([stylex-hack]) > * + *": { marginStart: "xe9zolg" },
    $$css: true,
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
