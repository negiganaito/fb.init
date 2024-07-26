/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext, useState } from "react";
import { flushSync } from "react-dom";
import { gkx } from "gkx";

import CometGHLRenderingContext from "../context/CometGHLRenderingContext";

function useCometRouterLinkShimEventHandlers({
  href,
  lynxMode,
  onContextMenu,
  onHoverStart,
  onPress,
  shimmed,
  unshimmedHref,
}) {
  const context = useContext(CometGHLRenderingContext);
  const [useOrigHref, setUseOrigHref] = useState(context);

  function handleContextMenu(event) {
    if (onContextMenu) onContextMenu(event);
    if (useOrigHref) {
      flushSync(() => setUseOrigHref(false));
    }
  }

  function handlePress(event) {
    if (onPress) onPress(event);
    if (
      shimmed === true &&
      lynxMode === "ASYNCLAZY" &&
      href !== null &&
      unshimmedHref !== null &&
      gkx("26334")
    ) {
      if (!useOrigHref) {
        flushSync(() => setUseOrigHref(true));
      }
    } else if (useOrigHref) {
      flushSync(() => setUseOrigHref(false));
    }
  }

  function handleHoverStart(event) {
    if (onHoverStart) onHoverStart(event);
    if (shimmed === true) {
      setUseOrigHref(true);
    }
  }

  return {
    onContextMenu: handleContextMenu,
    onHoverStart: handleHoverStart,
    onPress: handlePress,
    useOrigHref,
  };
}

export default useCometRouterLinkShimEventHandlers;
