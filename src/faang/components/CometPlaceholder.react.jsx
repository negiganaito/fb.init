/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import useCometPlaceholderImpl from "../../hooks/useCometPlaceholderImpl.react";

const CometPlaceholder = (props) => {
  return useCometPlaceholderImpl(props);
};

CometPlaceholder.displayName = `${CometPlaceholder.name}`;

export default CometPlaceholder;
