/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useMemo } from "react";
import { gkx } from "gkx";
import { useMWLSThreadDisplayContext } from "MWLSThreadDisplayContext";

function useMWMessageRowTheme() {
  const threadDisplayContext = useMWLSThreadDisplayContext();

  return useMemo(() => {
    const padding = gkx("23219")
      ? "12px"
      : threadDisplayContext === "Inbox"
      ? "16px"
      : "8px";
    return {
      dark: { "mwp-message-list-profile-start-padding": padding },
      light: { "mwp-message-list-profile-start-padding": padding },
      type: "VARIABLES",
    };
  }, [threadDisplayContext]);
}

export default useMWMessageRowTheme;
