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
import React, { useCallback, useContext, useMemo, useState } from "react";
import joinClasses from "fbjs/lib/joinClasses";

import useUniqueID from "../../hooks/useUniqueID";
import AbstractSidebarNavigationDisplayContext from "../contexts/AbstractSidebarNavigationDisplayContext";
import AbstractSidebarSectionActionContext from "../contexts/AbstractSidebarSectionActionContext";
import AbstractSidebarSectionContext from "../contexts/AbstractSidebarSectionContext";
import { useApplyGeoDomIDsDirectly } from "../geo-ui/GeoDomID";

const defaultLabelRenderer = ({ label, id }) => <span id={id}>{label}</span>;

const AbstractSidebarSection = ({
  actions,
  children,
  className,
  headerClassName,
  headerStyle,
  label,
  labelIsHidden = false,
  labelRenderer = defaultLabelRenderer,
  link,
  linkRenderer,
  style,
}) => {
  const uniqueID = useUniqueID();
  const navDisplayContext = useContext(AbstractSidebarNavigationDisplayContext);
  const { isUniquelyExpandable } = navDisplayContext;
  const expansionState = useExpansionState(isUniquelyExpandable);
  const { expandedValues, onExpansionChange, isActivated } = expansionState;

  const sectionContextValue = useMemo(
    () => ({ expandedValues, isActivated, onChange: onExpansionChange }),
    [expandedValues, isActivated, onExpansionChange]
  );

  const ariaProps = useApplyGeoDomIDsDirectly({ "aria-labelledby": uniqueID });
  const idProps = useApplyGeoDomIDsDirectly({ id: uniqueID });

  return (
    <AbstractSidebarSectionContext.Provider value={sectionContextValue}>
      <nav {...ariaProps} className={className} style={style}>
        <div
          className={joinClasses(
            "_7399" + (labelIsHidden ? " _739a" : ""),
            headerClassName
          )}
          style={headerStyle}
        >
          {labelIsHidden ? (
            <span className="accessible_elem" {...idProps}>
              {label}
            </span>
          ) : (
            labelRenderer({ label, id: uniqueID })
          )}
          {link !== undefined &&
            linkRenderer !== undefined &&
            linkRenderer({ children: link })}
        </div>
        <ul className="_6no_">
          <AbstractSidebarSectionActionContext.Provider
            value={standaloneActionContextValue}
          >
            {children}
          </AbstractSidebarSectionActionContext.Provider>
        </ul>
        <AbstractSidebarSectionActionContext.Provider
          value={notStandaloneActionContextValue}
        >
          {actions}
        </AbstractSidebarSectionActionContext.Provider>
      </nav>
    </AbstractSidebarSectionContext.Provider>
  );
};

AbstractSidebarSection.displayName = `${AbstractSidebarSection.name}`;

const standaloneActionContextValue = { isStandaloneAction: true };
const notStandaloneActionContextValue = { isStandaloneAction: false };

function useExpansionState(isUniquelyExpandable) {
  const [isActivated, setIsActivated] = useState(false);
  const [expandedMap, setExpandedMap] = useState(new Map());

  const onExpansionChange = useCallback(
    (id, expand = false) => {
      setExpandedMap((prevMap) => {
        const newMap = new Map(prevMap);
        if (newMap.has(id)) {
          newMap.delete(id);
        } else {
          if (isUniquelyExpandable && !expand) {
            for (const [key] of newMap) {
              if (!newMap.get(key)) {
                newMap.delete(key);
              }
            }
          }
          newMap.set(id, expand);
        }
        return newMap;
      });
      setIsActivated(true);
    },
    [isUniquelyExpandable]
  );

  const expandedValues = useMemo(
    () => new Set(expandedMap.keys()),
    [expandedMap]
  );

  return { expandedValues, onExpansionChange, isActivated };
}

export default AbstractSidebarSection;
