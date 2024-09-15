/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from "react";

const HiddenSubtreeContext = createContext({
  backgrounded: false,
  hidden: false,
  hiddenOrBackgrounded: false,
  hiddenOrBackgrounded_FIXME: false,
});

export default HiddenSubtreeContext;
