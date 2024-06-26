/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CometDarkModeContext } from "@fb-theme/contexts/comet-dark-mode-context";
import stylex from "@stylexjs/stylex";

const styles = stylex.create({
  root: {
    backgroundColor: "green",
  },
});

const HomePage = () => {
  const { currentSetting, setDarkModeSetting } =
    useContext(CometDarkModeContext);

  return (
    <>
      <button
        className={stylex(styles.root)}
        onClick={() => {
          setDarkModeSetting(
            currentSetting === "ENABLED" ? "DISABLED" : "ENABLED"
          );
        }}
      >
        Toggle theme
      </button>

      <Link to="/about">about</Link>
    </>
  );
};

export default HomePage;
