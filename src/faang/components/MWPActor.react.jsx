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
import React, { createContext, useContext, useMemo } from "react";
import { useActor as useActorHook } from "Actor";
import { getPageMessagingMailboxId } from "CurrentMessengerUser";
import { of_string, to_string } from "I64";

const MWPActorContext = createContext(null);

function useActor() {
  const contextValue = useContext(MWPActorContext);
  const [actor] = useActorHook();
  const actorId = useMemo(() => of_string(actor), [actor]);
  const pageMailboxId = useMemo(() => {
    const id = getPageMessagingMailboxId();
    return id !== "0" ? of_string(id) : null;
  }, []);

  return useMemo(
    () => contextValue ?? pageMailboxId ?? actorId,
    [actorId, contextValue, pageMailboxId]
  );
}

function isAPPlus() {
  return getAPPlusMailboxId() !== null;
}

function getAPPlusMailboxId() {
  const id = getPageMessagingMailboxId();
  return id === "0" ? null : id;
}

function MWPActorProvider({ actorId, children }) {
  return actorId !== undefined ? (
    <MWPActorContext.Provider value={to_string(actorId)}>
      {children}
    </MWPActorContext.Provider>
  ) : (
    { children }
  );
}

MWPActorProvider.displayName = `${MWPActorProvider.name}`;

export { getAPPlusMailboxId, isAPPlus, MWPActorProvider, useActor };
