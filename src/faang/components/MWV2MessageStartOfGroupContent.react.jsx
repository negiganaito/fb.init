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
import { createElement } from "react";
import { MWPDateBreak } from "MWPDateBreak.react";
import { MWV2ChatAdminMessageContainer } from "MWV2ChatAdminMessage.react";

import {
  abs,
  compare,
  of_string,
  sub,
  to_float,
} from "../../business/helpers/I64";

import { MWPMessageListColumnShrinkwrap } from "./MWPMessageListColumn.react";
import MWV2MessageRowSimple from "./MWV2MessageRowSimple.react";

const isTimeDifferenceGreaterThan15Minutes = (
  currentMessage,
  previousMessage
) => {
  if (previousMessage) {
    return (
      compare(
        abs(sub(currentMessage.timestampMs, previousMessage.timestampMs)),
        of_string("900000")
      ) > 0
    );
  }
  return true;
};

const MessageStartOfGroupContent = ({
  domElementRef,
  message,
  prevMessage,
  renderTextWrapper,
}) => {
  if (isTimeDifferenceGreaterThan15Minutes(message, prevMessage)) {
    return createElement(MWV2MessageRowSimple, {
      domElementRef,
      children: createElement(MWPMessageListColumnShrinkwrap, {
        children: createElement(MWV2ChatAdminMessageContainer, {
          nextMessage: message,
          prevMessage,
          children: createElement(MWPDateBreak, {
            renderTextWrapper,
            timestamp: to_float(message.timestampMs),
          }),
        }),
      }),
    });
  }
  return null;
};

MessageStartOfGroupContent.displayName = `MessageStartOfGroupContent`;

export default MessageStartOfGroupContent;
