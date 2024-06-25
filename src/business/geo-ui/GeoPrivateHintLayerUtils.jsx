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
import ix from "../helpers/ix";
import useGeoTheme from "../hooks/useGeoTheme";

const styles = {
  root: {
    boxSizing: "x9f619",
    maxWidth: "xxc7z9f",
    wordBreak: "x13faqbe",
    $$css: true,
  },
  headerWrapper: { display: "x78zum5", $$css: true },
  icon: {
    display: "x78zum5",
    cursor: "x1ypdohk",
    verticalAlign: "x1uuroth",
    pointerEvents: "x67bb7w",
    $$css: true,
  },
  infoTooltipContainer: { flexShrink: "x2lah0s", $$css: true },
  mediaIcon: {
    display: "x78zum5",
    borderTopStartRadius: "x14yjl9h",
    borderTopEndRadius: "xudhj91",
    borderBottomEndRadius: "x18nykt9",
    borderBottomStartRadius: "xww2gxu",
    flexShrink: "x2lah0s",
    height: "xxk0z11",
    justifyContent: "xl56j7k",
    alignItems: "x6s0dn4",
    width: "xvy4d1p",
    $$css: true,
  },
};

function getStatus(status) {
  switch (status) {
    case "policy-restriction":
      return "error";
    case "disabled-restriction":
    case "normal":
      return "info";
    default:
      return status;
  }
}

function getStatusIcon(status) {
  if (status === null || status === "normal") return null;
  let icon = null;
  switch (status) {
    case "error":
      icon = ix("489534");
      break;
    case "warning":
      icon = ix("480789");
      break;
    case "policy-restriction":
      icon = ix("1280864");
      break;
    case "disabled-restriction":
      icon = ix("1826783");
      break;
    default:
      break;
  }
  return icon;
}

function useLayerContentStyle() {
  const theme = useGeoTheme();
  return [
    styles.root,
    theme.selectBorderRadius({ context: "content" }),
    theme.selectElevation({ level: 3 }),
    theme.selectFont({ size: "value" }),
    theme.selectStaticBackgroundColor({ surface: "content" }),
    theme.selectTextColor({ color: "value" }),
  ];
}

function useLayerContentContainerStyle({ isPositionVertical }) {
  const theme = useGeoTheme();
  return [
    isPositionVertical &&
      theme.selectSpacing({
        context: "control",
        bounds: "internal",
        target: "fine",
        positions: ["vertical"],
      }),
    !isPositionVertical &&
      theme.selectSpacing({
        context: "control",
        bounds: "internal",
        target: "normal",
        positions: ["horizontal"],
      }),
  ];
}

function useHeaderWrapperStyle() {
  const theme = useGeoTheme();
  return [
    styles.headerWrapper,
    theme.selectSpacing({
      context: "content",
      bounds: "external",
      relation: "heading",
      positions: ["bottom"],
    }),
  ];
}

function useMediaIconStyle() {
  const theme = useGeoTheme();
  return [
    styles.mediaIcon,
    theme.selectSpacing({
      context: "component",
      bounds: "external",
      relation: "related",
      positions: ["start"],
    }),
    theme.selectStaticBackgroundColor({ surface: "wash" }),
  ];
}

function useCloseButtonStyle() {
  const theme = useGeoTheme();
  return [
    theme.selectSpacing({
      context: "component",
      bounds: "external",
      relation: "unrelated",
      positions: ["start"],
    }),
  ];
}

function useIconStyle() {
  const theme = useGeoTheme();
  return [
    styles.icon,
    theme.selectSpacing({
      context: "component",
      bounds: "external",
      relation: "related",
      positions: ["horizontal"],
    }),
  ];
}

function useTooltipContainerStyle({ type }) {
  const theme = useGeoTheme();
  const commonStyles = [
    theme.selectSpacing({
      context: "control",
      bounds: "internal",
      target: "fine",
      positions: ["vertical"],
    }),
    theme.selectSpacing({
      context: "control",
      bounds: "internal",
      target: "normal",
      positions: ["horizontal"],
    }),
  ];
  const infoTooltipStyles = [
    styles.infoTooltipContainer,
    theme.selectSpacing({
      context: "container",
      bounds: "internal",
      relation: "component",
    }),
  ];
  return type === "simpleTooltip" ? commonStyles : infoTooltipStyles;
}

export {
  getStatus,
  getStatusIcon,
  useCloseButtonStyle,
  useHeaderWrapperStyle,
  useIconStyle,
  useLayerContentContainerStyle,
  useLayerContentStyle,
  useMediaIconStyle,
  useTooltipContainerStyle,
};
