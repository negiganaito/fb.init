/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useLayoutEffect, useState } from "react";
import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";

import {
  addUseMatchViewportResult,
  check,
  getDimension,
} from "../faang/components/CometSSRViewportHints";

const useMatchViewport = (comparison, dimension, value) => {
  const [matches, setMatches] = useState(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      const dim = getDimension(dimension);
      return dim !== null ? check[comparison](dim, value) : false;
    }
    return (
      !!window.matchMedia &&
      window.matchMedia(generateMediaQuery(comparison, dimension, value))
        .matches
    );
  });

  if (!ExecutionEnvironment.canUseDOM) {
    addUseMatchViewportResult(dimension, value, comparison, matches);
  }

  useLayoutEffect(() => {
    if (!window.matchMedia) return;

    const mediaQuery = generateMediaQuery(comparison, dimension, value);
    const mediaList = window.matchMedia(mediaQuery);
    const handleChange = (event) => setMatches(event.matches);

    mediaList.addListener(handleChange);
    return () => mediaList.removeListener(handleChange);
  }, [comparison, dimension, value]);

  return matches;
};

const generateMediaQuery = (comparison, dimension, value) =>
  `(${comparison}-${dimension}: ${value}px)`;

export default useMatchViewport;
