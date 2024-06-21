/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { useApplyGeoDomIDsDirectly } from "GeoDomID";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import stylex from "stylex";
import { useMergeRefs } from "useMergeRefs";

const styles = {
  hidden: {
    clip: "x1qvwoe0",
    height: "xjm9jq1",
    marginTop: "x1y332i5",
    marginEnd: "xcwd3tp",
    marginBottom: "x1jyxor1",
    marginStart: "x39eecv",
    overflowX: "x6ikm8r",
    overflowY: "x10wlt62",
    position: "x10l6tqk",
    whiteSpace: "xuxw1ft",
    width: "x1i1rx1s",
    $$css: true,
  },
};

const GeoBaseAccessibleElement = ({
  children,
  containerRef,
  id,
  isHidden = false,
  xstyle,
  ...rest
}) => {
  const domID = useApplyGeoDomIDsDirectly({
    id: id ?? undefined,
  });
  const mergedRef = useMergeRefs(containerRef, domID.ref);

  return (
    <div
      {...rest}
      {...domID}
      className={stylex(xstyle, isHidden && styles.hidden)}
      data-sscoverage-ignore="true"
      ref={mergedRef}
    >
      {children}
    </div>
  );
};

GeoBaseAccessibleElement.displayName = "GeoBaseAccessibleElement";

export default makeGeoComponent(
  "GeoBaseAccessibleElement",
  GeoBaseAccessibleElement
);
