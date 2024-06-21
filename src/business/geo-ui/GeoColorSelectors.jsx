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
import * as GeoPrivateDefaultColorGeneratedStyles from "./GeoPrivateDefaultColorGeneratedStyles";

const glimmerLinearGradientStyle = {
  default: {
    backgroundImage: "x1k7hgvv",
    backgroundColor: "x1k74hu9",
    $$css: true,
  },
  input: {
    backgroundImage: "x598uhx",
    backgroundColor: "x1k74hu9",
    $$css: true,
  },
};

const selectGlimmer = ({
  index = 0,
  variant = "default",
  isLargeArea = false,
} = {}) => {
  return [
    variant === "input"
      ? GeoPrivateDefaultColorGeneratedStyles.glimmerVariantsStyles.input
      : GeoPrivateDefaultColorGeneratedStyles.glimmerStyles[index],
    isLargeArea && glimmerLinearGradientStyle[variant],
  ];
};

const selectIconColor = ({ color, isDisabled = false }) => {
  return [
    !isDisabled &&
      GeoPrivateDefaultColorGeneratedStyles.iconActiveStyles[color],
    isDisabled &&
      GeoPrivateDefaultColorGeneratedStyles.iconDisabledStyles[color],
  ];
};

const selectStrokeColor = ({ shade, element }) => {
  return element === "bar"
    ? GeoPrivateDefaultColorGeneratedStyles.barElementStrokeStyles[shade]
    : GeoPrivateDefaultColorGeneratedStyles.trackElementStrokeStyles[shade];
};

const selectStaticBackgroundColor = ({
  isInverted = false,
  isMuted = false,
  surface,
}) => {
  const styles = isInverted
    ? isMuted
      ? GeoPrivateDefaultColorGeneratedStyles.staticBackgroundInvertedMutedStyles
      : GeoPrivateDefaultColorGeneratedStyles.staticBackgroundInvertedStyles
    : isMuted
    ? GeoPrivateDefaultColorGeneratedStyles.staticBackgroundMutedStyles
    : GeoPrivateDefaultColorGeneratedStyles.staticBackgroundStyles;
  return styles[surface];
};

const selectTextColor = ({ color, isDisabled = false, isInverted = false }) => {
  const colorKey =
    color === "inverted"
      ? "value"
      : color === "headingDescription" || color === "valueLabel"
      ? "heading"
      : color;
  const styles = isInverted
    ? !isDisabled
      ? GeoPrivateDefaultColorGeneratedStyles.textInvertedActiveStyles
      : GeoPrivateDefaultColorGeneratedStyles.textInvertedDisabledStyles
    : !isDisabled
    ? GeoPrivateDefaultColorGeneratedStyles.textActiveStyles
    : GeoPrivateDefaultColorGeneratedStyles.textDisabledStyles;
  return styles[colorKey];
};

const selectBorderColor = ({
  color,
  isDisabled = false,
  isFocused = false,
}) => {
  const colorKey = color === "selected" ? "info" : color;
  return [
    !isDisabled &&
      !isFocused &&
      GeoPrivateDefaultColorGeneratedStyles.borderDefaultActiveStyles[colorKey],
    !isDisabled &&
      isFocused &&
      GeoPrivateDefaultColorGeneratedStyles.borderFocusedActiveStyles[colorKey],
    isDisabled &&
      !isFocused &&
      GeoPrivateDefaultColorGeneratedStyles.borderDefaultDisabledStyles[
        colorKey
      ],
    isDisabled &&
      isFocused &&
      GeoPrivateDefaultColorGeneratedStyles.borderFocusedDisabledStyles[
        colorKey
      ],
  ];
};

const selectCategoricalBackgroundColor = ({ index = 0 }) => {
  const styles =
    GeoPrivateDefaultColorGeneratedStyles.categoricalBackgroundIdleStyles;
  return styles[index % Object.keys(styles).length];
};

const selectCategoricalForegroundColor = ({ index = 0 }) => {
  const styles =
    GeoPrivateDefaultColorGeneratedStyles.categoricalForegroundTextStyles;
  return styles[index % Object.keys(styles).length];
};

const selectInteractiveColorPalette = ({
  color,
  isDisabled = false,
  isFocused = false,
  isActive = false,
}) => {
  return [
    GeoPrivateDefaultColorGeneratedStyles.interactiveBackgroundTextWeightStyles[
      color
    ],
    GeoPrivateDefaultColorGeneratedStyles.interactiveBackgroundTextActiveStyles[
      color
    ],
    GeoPrivateDefaultColorGeneratedStyles.interactiveBackgroundIdleStyles[
      color
    ],
    isFocused &&
      GeoPrivateDefaultColorGeneratedStyles.interactiveBackgroundFocusedStyles[
        color
      ],
    isActive &&
      GeoPrivateDefaultColorGeneratedStyles.interactiveBackgroundActiveStyles[
        color
      ],
    isDisabled &&
      GeoPrivateDefaultColorGeneratedStyles.interactiveBackgroundDisabledStyles[
        color
      ],
    isDisabled &&
      GeoPrivateDefaultColorGeneratedStyles
        .interactiveBackgroundTextDisabledStyles[color],
  ];
};

const selectInteractiveOverlay = ({
  color,
  isFocused = false,
  isActive = false,
}) => {
  return [
    GeoPrivateDefaultColorGeneratedStyles.interactiveOverlayColorStyles[color],
    GeoPrivateDefaultColorGeneratedStyles.interactiveOverlayIdleStyles[color],
    isFocused &&
      GeoPrivateDefaultColorGeneratedStyles.interactiveOverlayFocusedStyles[
        color
      ],
    isActive &&
      GeoPrivateDefaultColorGeneratedStyles.interactiveOverlayActiveStyles[
        color
      ],
  ];
};

const selectOutline = ({ color, isActive = false }) => {
  return isActive
    ? GeoPrivateDefaultColorGeneratedStyles.outlineActiveStyles[color]
    : GeoPrivateDefaultColorGeneratedStyles.outlineFocusedStyles[color];
};

const selectInteractiveBorder = ({ context, color, isDisabled, isFocused }) =>
  null;

const selectOnboardingPulseAnimation = ({ variant }) => [
  GeoPrivateDefaultColorGeneratedStyles.onboardingTourHighlightStyles[variant],
  GeoPrivateDefaultColorGeneratedStyles.onboardingPulseAnimationStyles[variant],
];

export {
  glimmerLinearGradientStyle,
  selectBorderColor,
  selectCategoricalBackgroundColor,
  selectCategoricalForegroundColor,
  selectGlimmer,
  selectIconColor,
  selectInteractiveBorder,
  selectInteractiveColorPalette,
  selectInteractiveOverlay,
  selectOnboardingPulseAnimation,
  selectOutline,
  selectStaticBackgroundColor,
  selectStrokeColor,
  selectTextColor,
};
