/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import useGeoPrivateIsNextTheme from "./useGeoPrivateIsNextTheme";
import useGeoTheme from "./useGeoTheme";

const styles = { root: { alignSelf: "xkh2ocl", $$css: true } };

function mapStatusToSurface(status) {
  switch (status) {
    case "info":
      return "wash";
    case "policy-warning":
      return "warning";
    case "policy-violation":
      return "error";
    default:
      return status;
  }
}

function useGeoPrivateNoticeStyle({ status }) {
  const isNextTheme = useGeoPrivateIsNextTheme();
  const theme = useGeoTheme();
  const selectBorderRadius = theme.selectBorderRadius;
  const selectStaticBackgroundColor = theme.selectStaticBackgroundColor;
  const selectSpacing = theme.selectSpacing;

  return [
    styles.root,
    selectBorderRadius({ context: "content" }),
    selectStaticBackgroundColor({
      isMuted: !isNextTheme || status !== "info",
      surface: mapStatusToSurface(status),
    }),
    selectSpacing({
      context: "component",
      bounds: "internal",
      target: "coarse",
    }),
  ];
}

export default useGeoPrivateNoticeStyle;
