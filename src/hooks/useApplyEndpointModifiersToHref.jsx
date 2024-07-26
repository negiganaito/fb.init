/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useCallback, useContext } from "react";

import BaseLinkEndpointModifierContext from "../context/BaseLinkEndpointModifierContext";
import isCometRouterUrl from "../helpers/isCometRouterUrl";

function applyEndpointModifiers(modifiers, href, enforceCometRouterUrl) {
  if (modifiers === null) return null;
  return modifiers.reduce((currentHref, modifier) => {
    const modifiedHref = modifier(currentHref);
    if (enforceCometRouterUrl && !isCometRouterUrl(modifiedHref)) {
      console.log(
        "Endpoint modifier returned a non-router URL, ignoring.",
        "comet_infra"
      );
      return currentHref;
    }
    return modifiedHref;
  }, href);
}

function useApplyEndpointModifiersToHref(enforceCometRouterUrl = true) {
  const modifiers = useContext(BaseLinkEndpointModifierContext);
  return useCallback(
    (href) => applyEndpointModifiers(modifiers, href, enforceCometRouterUrl),
    [modifiers, enforceCometRouterUrl]
  );
}

export default useApplyEndpointModifiersToHref;
