/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useGeoTheme } from "useGeoTheme";

const inheritStyle = { inherit: { color: "x1heor9g", $$css: true } };

function useGeoIconStyle({ color, isDisabled }) {
  const { selectIconColor } = useGeoTheme();
  return color === "inherit"
    ? inheritStyle.inherit
    : selectIconColor({ color, isDisabled });
}

export default useGeoIconStyle;
