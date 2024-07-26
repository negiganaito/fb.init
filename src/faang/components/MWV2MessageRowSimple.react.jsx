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
import React, { useEffect, useRef } from "react";
import { stylex } from "@stylexjs/stylex";

import useMAWEditMessageData from "../../hooks/useMAWEditMessageData";
import useMWPEditMessageDeemphasizer from "../../hooks/useMWPEditMessageDeemphasizer";

import FocusWithinHandler from "./FocusWithinHandler.react";
import MWEditMessageOverlay from "./MWEditMessageOverlay.react";
import { FocusTable, scopeID } from "./MWMessageTableFocusTable.react";

const styles = {
  row: { position: "x1n2onr6", $$css: true },
  rowFocusVisible: { zIndex: "x1vjfegm", $$css: true },
};

function MWV2MessageRowSimple({
  children,
  domElementRef,
  focusCellOnRender = false,
}) {
  const editMessageData = useMAWEditMessageData();
  const hasEditMessageData = editMessageData !== null;
  const deemphasizer = useMWPEditMessageDeemphasizer();
  const cellRef = useRef(null);

  useEffect(() => {
    if (focusCellOnRender) {
      cellRef.current?.focus();
      cellRef.current?.scrollIntoView();
    }
  }, [focusCellOnRender]);

  return (
    <FocusTable.Table>
      <div className={stylex(deemphasizer)} ref={domElementRef} role="row">
        <FocusTable.TableCell>
          <FocusWithinHandler>
            {(focusWithin, isFocused) => (
              <div
                className={stylex(
                  styles.row,
                  isFocused ? styles.rowFocusVisible : false
                )}
                data-release-focus-from="CLICK"
                data-scope={scopeID}
                ref={cellRef}
                role="gridcell"
                tabIndex={hasEditMessageData ? -1 : 0}
              >
                {children}
                <MWEditMessageOverlay />
              </div>
            )}
          </FocusWithinHandler>
        </FocusTable.TableCell>
      </div>
    </FocusTable.Table>
  );
}

MWV2MessageRowSimple.displayName = `MWV2MessageRowSimple`;

export default MWV2MessageRowSimple;
