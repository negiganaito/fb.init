/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext, useContext } from "react";

import { of_string } from "../../helpers/I64";
import unrecoverableViolation from "../../helpers/unrecoverableViolation";
import { useMemoInt64 } from "../../hooks/Int64Hooks";

const MWThreadKeyContext = createContext(undefined);

const MWThreadKeyProvider = ({ children, id, isSubthread = false }) => {
  const parentThreadKey = useContext(MWThreadKeyContext);
  const threadKey = useMemoInt64(() => id, [id]);

  if (parentThreadKey !== null && !isSubthread) {
    throw unrecoverableViolation(
      "You can't nest MWThreadKey in another MWThreadKey. This will cause SEVs as things might think they're in the wrong thread",
      "messenger_web_messaging"
    );
  }

  return (
    <MWThreadKeyContext.Provider value={threadKey}>
      {children}
    </MWThreadKeyContext.Provider>
  );
};

MWThreadKeyProvider.displayName = `${MWThreadKeyProvider.name} [from ${MWThreadKeyProvider.id}]`;

const XPlatThreadKeyProvider = ({ children, id, isSubthread = false }) => {
  return id !== null ? (
    <MWThreadKeyProvider id={of_string(id)} isSubthread={isSubthread}>
      {children}
    </MWThreadKeyProvider>
  ) : (
    { children }
  );
};

XPlatThreadKeyProvider.displayName = `${XPlatThreadKeyProvider.name} [from ${XPlatThreadKeyProvider.id}]`;

const useMWThreadKeyMemoized = () => useContext(MWThreadKeyContext);

const useMWThreadKeyMemoizedExn = () => {
  const threadKey = useContext(MWThreadKeyContext);
  if (threadKey !== null) {
    return threadKey;
  }
  throw unrecoverableViolation(
    "Tried to get a thread key when there was none",
    "messenger_web_ia"
  );
};

export {
  MWThreadKeyProvider,
  useMWThreadKeyMemoized,
  useMWThreadKeyMemoizedExn,
  XPlatThreadKeyProvider,
};
