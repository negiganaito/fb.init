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
import {
  selectBorderRadius,
  selectBorderWidth,
  selectSize,
} from "GeoAppearanceSelectors";
import { selectElevation } from "GeoElevationSelectors";
import { selectAnimation } from "GeoPrivateAnimationSelectors";
import { selectFont } from "GeoTextSelectors";

import {
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
} from "./GeoColorSelectors";
import { selectLayoutSpacing, selectSpacing } from "./GeoSpacingSelectors";
import { inject as injectStyleXDefaultSheet } from "./GeoStyleXDefaultSheet";
import { selectTransition } from "./GeoTransitionSelectors";

injectStyleXDefaultSheet();

const GeoPrivateDefaultTheme = {
  selectAnimation,
  selectBorderWidth,
  selectBorderColor,
  selectBorderRadius,
  selectFont,
  selectGlimmer,
  selectIconColor,
  selectInteractiveBorder,
  selectInteractiveColorPalette,
  selectInteractiveOverlay,
  selectCategoricalBackgroundColor,
  selectCategoricalForegroundColor,
  selectOnboardingPulseAnimation,
  selectOutline,
  selectSize,
  selectStaticBackgroundColor,
  selectTextColor,
  selectElevation,
  selectLayoutSpacing,
  selectSpacing,
  selectStrokeColor,
  selectTransition,
};

export default GeoPrivateDefaultTheme;
