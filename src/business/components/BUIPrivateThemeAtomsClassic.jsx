/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { Themes } from "../helpers/BUIPrivateThemeAtomsType";

import { getAlphaTransformer } from "./BUIPrivateAlphaTransformer";
import { FONT_FAMILY, LETTER_SPACING } from "./BUISystemFonts";
// import cssVar from "cssVar";

const colors = {
  active: "#3578E5",
  default: "rgba(53, 120, 229, 0.2)",
  disabled: "rgba(53, 120, 229, 0.2)",
};

const borderRadiusSizes = {
  xsmall: 2,
  small: 4,
  medium: 6,
  large: 8,
  xlarge: 12,
};

const alphaFlat = [0, 0, 0, 1];
const alphaDefault = [245, 246, 247, 1];
const alphaActive = [236, 243, 255, 1];

const BUIPrivateThemeAtomsClassic = {
  id: Themes.BUI_CLASSIC,
  type: {
    fontFamily: FONT_FAMILY,
    letterSpacing: LETTER_SPACING,
    size: 12,
    lineHeight: "16px",
    base: 14,
    scale: {
      display: [2.857, 1.2],
      header1: [1.714, 1.166],
      header2: [1.428, 1.2],
      header3: [1.142, 1.25],
      header4: [1, 1.286],
      body1: [1, 1.286],
      body2: [0.928, 1.308],
      body3: [0.857, 1.333],
    },
  },
  colors: {
    text: {
      default: "#444950",
      primary: "#1C1E21",
      secondary: "#606770",
      disabled: "#BEC3C9",
      header: "#444950",
      blueLink: "#216FDB",
      negative: "#FA383E",
      positive: "#00A400",
      placeholder: "#8D949E",
    },
    layers: {
      background: "#FFFFFF",
      border: "#CCD0D5",
    },
    flat: {
      transform: getAlphaTransformer(alphaFlat, 0),
    },
    default: {
      transform: getAlphaTransformer(alphaDefault, 1),
    },
    active: {
      transform: getAlphaTransformer(alphaActive, 1),
    },
  },
  baseUnit: 1,
  gutters: {
    text: 0,
    icon: 0,
    iconInline: 0,
    grid: 0,
  },
  elevation: {
    depth0: "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
    depth1: "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
    depth2: "0 4px 8px 1px rgba(0, 0, 0, 0.1)",
    depth3: "0 4px 8px 1px rgba(0, 0, 0, 0.1)",
  },
  ratios: {
    square: 1,
    circle: 1,
    landscape: 1.5,
    portrait: 1.25,
  },
  visualAlignment: "strict",
  borderRadius: {
    control: borderRadiusSizes.xsmall,
    container: borderRadiusSizes.small,
    layer: borderRadiusSizes.small,
  },
  dropdown: {
    offsetY: 4,
  },
  list: {
    paddingVert: 0,
    paddingHoriz: 0,
    item: {
      marginVert: 4,
      marginHoriz: 4,
      paddingVert: 4,
      paddingHoriz: 4,
    },
  },
  tab: {
    active: {
      background: colors.active,
      color: "#1C1E21",
    },
    item: {
      color: "#606770",
      height: 42,
      hover: "#CCD0D5",
    },
    subItem: {
      active: {
        backgroundColor: "#FFFFFF",
        color: "#444950",
      },
      hover: {
        backgroundColor: colors.active,
        color: "#FFFFFF",
      },
      padding: 8,
    },
  },
  binaryControls: {
    slider: {
      checked: {
        marginLeft: 13,
        size: {
          medium: 12,
          large: 16,
        },
      },
      disabled: {
        backgroundColor: "#BEC3C9",
      },
      margin: null,
      size: {
        medium: 10,
        large: 12,
      },
    },
    checked: {
      active: {
        backgroundColor: "#FFFFFF",
        opacity: 1,
      },
      disabled: {
        backgroundColor: "#EBEDF0",
        opacity: 1,
      },
      hover: {
        backgroundColor: colors.default,
        opacity: 1,
      },
      normal: {
        backgroundColor: colors.default,
        opacity: 1,
      },
    },
    unchecked: {
      active: {
        backgroundColor: "#FFFFFF",
        border: "1px solid #3578E5",
        boxShadow: "inset 0 0 0 3px rgba(53, 120, 229, 0.2)",
      },
      disabled: {
        backgroundColor: "#EBEDF0",
        border: "1px solid #CCD0D5",
        boxShadow: "none",
      },
      hover: {
        backgroundColor: "#EBEDF0",
        border: "1px solid #CCD0D5",
        boxShadow: "inset 0 0 0 3px #FFFFFF",
      },
      normal: {
        backgroundColor: "#EBEDF0",
        border: "1px solid #CCD0D5",
        boxShadow: "inset 0 0 0 3px #FFFFFF",
      },
    },
    borderRadius: 30,
    height: {
      medium: 20,
      large: 24,
    },
    width: {
      medium: 30,
      large: 34,
    },
  },
  inputs: {
    active: {
      backgroundColor: "#FFFFFF",
    },
    borderRadius: 4,
    default: {
      border: "1px solid #CCD0D5",
      boxShadow: "none",
    },
    disabled: {
      border: "1px solid #CCD0D5",
      backgroundColor: "#F5F6F7",
      boxShadow: "none",
    },
    edited: {
      backgroundColor: "#FFFBF0",
    },
    error: {
      border: "1px solid #FA383E",
    },
    focused: {
      border: "1px solid #3578E5",
      boxShadow: "inset 0 0 0 3px rgba(53, 120, 229, 0.2)",
      error: {
        boxShadow: "inset 0 0 0 3px rgba(250, 56, 62, 0.3)",
      },
      valid: {
        boxShadow: "inset 0 0 0 3px rgba(0, 164, 0, 0.1)",
      },
      warning: {
        boxShadow: "inset 0 0 0 3px rgba(255, 186, 0, 0.3)",
      },
    },
    valid: {
      border: "1px solid #00A400",
    },
    warning: {
      border: "1px solid #FFBA00",
    },
    size: {
      medium: 20,
      large: 24,
    },
  },
  controls: {
    fontWeight: "bold",
    fontWeightAlt: "bold",
    height: {
      small: 24,
      medium: 28,
      large: 36,
    },
    default: {
      active: {
        background: "#DADDE1",
        borderColor: "#DADDE1",
        color: "#444950",
      },
      disabled: {
        background: "#F5F6F7",
        borderColor: "#EBEDF0",
        color: "#BEC3C9",
      },
      hover: {
        background: "#EBEDF0",
        borderColor: "#DADDE1",
        color: "#444950",
      },
      normal: {
        background: "#F5F6F7",
        borderColor: "#DADDE1",
        color: "#444950",
      },
    },
    confirm: {
      active: {
        background: "#043B87",
        borderColor: "#043B87",
        color: "#FFFFFF",
      },
      disabled: {
        background: "#B0D5FF",
        borderColor: "#B0D5FF",
        color: "#FFFFFF",
      },
      hover: {
        background: "#0E52B0",
        borderColor: "#0E52B0",
        color: "#FFFFFF",
      },
      normal: {
        background: "#1877F2",
        borderColor: "#1877F2",
        color: "#FFFFFF",
      },
    },
    special: {
      active: {
        background: "#006900",
        borderColor: "#006900",
        color: "#FFFFFF",
      },
      disabled: {
        background: "#86DF81",
        borderColor: "#86DF81",
        color: "#FFFFFF",
      },
      hover: {
        background: "#008C00",
        borderColor: "#008C00",
        color: "#FFFFFF",
      },
      normal: {
        background: "#00A400",
        borderColor: "#00A400",
        color: "#FFFFFF",
      },
    },
    flat: {
      active: {
        background: "rgba(0, 0, 0, 0.1)",
        borderColor: "rgba(0, 0, 0, 0.1)",
        color: "#444950",
      },
      disabled: {
        background: "transparent",
        borderColor: "transparent",
        color: "#BEC3C9",
      },
      hover: {
        background: "rgba(0, 0, 0, 0.05)",
        borderColor: "rgba(0, 0, 0, 0.05)",
        color: "#444950",
      },
      normal: {
        background: "transparent",
        borderColor: "transparent",
        color: "#444950",
      },
    },
    flatWhite: {
      active: {
        background: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        color: "#FFFFFF",
      },
      disabled: {
        background: "transparent",
        borderColor: "transparent",
        color: "rgba(255, 255, 255, 0.4)",
      },
      hover: {
        background: "rgba(255, 255, 255, 0.05)",
        borderColor: "rgba(255, 255, 255, 0.05)",
        color: "#FFFFFF",
      },
      normal: {
        background: "transparent",
        borderColor: "transparent",
        color: "#FFFFFF",
      },
    },
  },
  inputPrimitive: {
    size: {
      medium: 28,
      large: 36,
    },
  },
  layout: {
    sidebar: {
      sparse: {
        width: {
          expanded: "300px",
          collapsed: "72px",
        },
        gutter: "12px",
        itemPaddingHorz: "12px",
        itemPaddingVert: "8px",
      },
      dense: {
        width: {
          expanded: "240px",
          collapsed: "52px",
        },
        gutter: "4px",
        itemPaddingHorz: "12px",
        itemPaddingVert: "4px",
      },
    },
    borderColor: "#DADDE1",
    card: {
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1)",
    },
    modal: {
      boxShadow:
        "0 0 0 1px rgba(0, 0, 0, 0.1), 0 16px 32px 2px rgba(0, 0, 0, 0.15)",
    },
    tile: {
      padding: 8,
      selected: {
        boxShadow: "0 0 0 1px #3578E5, 0 0 3px 0 #B0D5FF, 0 0 0 3px #D1E7FF",
      },
    },
  },
};

export default BUIPrivateThemeAtomsClassic;
