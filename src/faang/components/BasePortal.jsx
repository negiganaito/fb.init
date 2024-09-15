/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { stylex } from "@stylexjs/stylex";
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";

import BaseChameleonThemeContext from "../../context/BaseChameleonThemeContext";
import BasePortalTargetContext from "../../context/BasePortalTargetContext";
import suspendOrThrowIfUsedInSSR from "../../helpers/suspendOrThrowIfUsedInSSR";
import useStable from "../../hooks/useStable";

import BaseDOMContainer from "./BaseDOMContainer";
import BaseThemeProvider from "./BaseThemeProvider";

const BasePortal = ({ children, hidden = false, target, xstyle }) => {
  const defaultTarget = useContext(BasePortalTargetContext);
  const chameleonTheme = useContext(BaseChameleonThemeContext);
  const portalTarget = target || defaultTarget;

  const stableDiv = useStable(() =>
    ExecutionEnvironment.canUseDOM ? document.createElement("div") : null
  );

  suspendOrThrowIfUsedInSSR(
    "BasePortal: Portals are not currently supported by the server renderer."
  );

  if (portalTarget === null) {
    return null;
  }

  return createPortal(
    <BaseThemeProvider>
      {(theme, inlineStyle) => (
        <div
          {...(hidden && { hidden: true })}
          className={
            stylex(theme, chameleonTheme.classNames, xstyle) || undefined
          }
          style={inlineStyle}
        >
          <BasePortalTargetContext.Provider value={stableDiv}>
            {children}
          </BasePortalTargetContext.Provider>
          <BaseDOMContainer node={stableDiv} />
        </div>
      )}
    </BaseThemeProvider>,
    portalTarget
  );
};

BasePortal.displayName = `BasePortal [from ${__filename}]`;

export default BasePortal;
