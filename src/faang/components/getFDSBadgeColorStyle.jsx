/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import unrecoverableViolation from "../../helpers/unrecoverableViolation";

const styles = {
  blue: { backgroundColor: "xwnonoy" },
  darkGray: { backgroundColor: "x167v862" },
  gray: { backgroundColor: "x80cks" },
  green: { backgroundColor: "xv9rvxn" },
  lightBlue: { backgroundColor: "x56hhle" },
  red: { backgroundColor: "xdi0jry" },
  yellow: { backgroundColor: "x1ajtyu9" },
};

const getFDSBadgeColorStyle = (color) => {
  switch (color) {
    case "blue":
      return styles.blue;
    case "gray":
      return styles.gray;
    case "darkGray":
      return styles.darkGray;
    case "green":
      return styles.green;
    case "lightBlue":
      return styles.lightBlue;
    case "red":
      return styles.red;
    case "yellow":
      return styles.yellow;
    default:
      throw unrecoverableViolation(
        "Invalid color in getFDSBadgeColorStyle",
        "comet_ui"
      );
  }
};

export default getFDSBadgeColorStyle;
