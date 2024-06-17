/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { init } from 'fbt';

import { getTranslatedInput } from './getTranslatedInput';

init({
  // translations: require("./fbt/translatedFbts.json"),
  hooks: { getTranslatedInput },
});

export default {};
