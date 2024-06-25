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
import { useEffect } from "react";

import ReactEventHookPropagation from "./ReactEventHookPropagation";
import { ReactUseEvent_React } from "./ReactUseEvent.react";

function useContextMenu(ref, props) {
  const { disabled, onContextMenu, preventDefault } = props;

  const handleContextMenu = ReactUseEvent_React("contextmenu");

  useEffect(() => {
    const element = ref.current;

    if (element !== null) {
      handleContextMenu.setListener(element, (event) => {
        if (disabled === true) return;
        if (
          ReactEventHookPropagation.hasEventHookPropagationStopped(
            event,
            "useContextMenu"
          )
        )
          return;
        ReactEventHookPropagation.stopEventHookPropagation(
          event,
          "useContextMenu"
        );
        if (preventDefault !== false && !event.nativeEvent.defaultPrevented) {
          event.preventDefault();
        }
        onContextMenu && onContextMenu(event);
      });
    }
  }, [disabled, ref, handleContextMenu, preventDefault, onContextMenu]);
}

export { useContextMenu };
