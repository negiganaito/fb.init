/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import keyMirror from "fbjs/lib/keyMirror";
import PropTypes from "prop-types";

import objectValues from "./objectValues";

const PositionEnum = keyMirror({
  above: null,
  below: null,
  left: null,
  right: null,
});

const positionValues = objectValues(PositionEnum);

const positionPropType = PropTypes.oneOf(positionValues);

const PositionEnumWithPropType = {
  ...PositionEnum,
  propType: positionPropType,
};

export default PositionEnumWithPropType;
