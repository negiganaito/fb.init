/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback, useContext } from "react";

import GeoPrivateThemeContext from "../contexts/GeoPrivateThemeContext";
import { GeoPrivateToasterContext } from "../contexts/GeoPrivateToasterContext";
import { GeoPrivateToasterGlobalContext } from "../contexts/GeoPrivateToasterGlobalContext";

import useGeoTheme from "./useGeoTheme";

const useGeoToasterContext = () => useContext(GeoPrivateToasterContext);

const useGeoToasterGlobalContext = () => {
  const theme = useGeoTheme();
  const globalContext = useContext(GeoPrivateToasterGlobalContext);
  const { add, ...rest } = globalContext;

  const addToast = useCallback(
    (content, ...args) => {
      const themedContent = (
        <GeoPrivateThemeContext.Provider value={theme}>
          {content}
        </GeoPrivateThemeContext.Provider>
      );
      return add(themedContent, ...args);
    },
    [add, theme]
  );

  return { add: addToast, ...rest };
};

const useGeoToaster = () => {
  const toasterContext = useGeoToasterContext();
  const globalToasterContext = useGeoToasterGlobalContext();
  return toasterContext || globalToasterContext;
};

export default useGeoToaster;
