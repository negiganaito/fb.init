/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import gkx from "../../helpers/gkx";

import { mwxSvgIcon } from "./MWXSvgIcon";
import { SVGIcon } from "./SVGIcon";
import WorkplaceChatFilled12 from "./WorkplaceChatFilled12.svg";

const MWXIconMessage = mwxSvgIcon(
  SVGIcon.svgIcon(WorkplaceChatFilled12),
  gkx("23219")
);

export default MWXIconMessage;
