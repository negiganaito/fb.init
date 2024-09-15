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
import React, { useContext } from "react";
import { stylex } from "@stylexjs/stylex";
import { CometCompositeStructureContext } from "CometCompositeStructureContext";
import CometIcon from "CometIcon.react";
import { _ } from "fbicon";
import { gkx } from "gkx";

const focusArrowStyles = {
  backgroundColor: "x2bj2ny",
  borderTop: "xn7ya7q",
  borderEnd: "x1su9jv1",
  borderBottom: "xt02mhb",
  borderStart: "xb4krs4",
  borderTopStartRadius: "x1npaq5j",
  borderTopEndRadius: "x1c83p5e",
  borderBottomEndRadius: "x1enjb0b",
  borderBottomStartRadius: "x199158v",
  height: "xdk7pt",
  lineHeight: "x14ju556",
  paddingTop: "x1nn3v0j",
  paddingEnd: "xg83lxy",
  paddingBottom: "xg8j3zb",
  paddingStart: "x1k2j06m",
  position: "x10l6tqk",
  width: "x1xc55vz",
  ,
};

const arrowStyles = {
  downArrow: {
    bottom: "xqd3l62",
    marginStart: "x1orzsq4",
    start: "xtzzx4i",
    ,
  },
  leftArrow: {
    marginTop: "x9otpla",
    start: "x67uiyb",
    top: "xwa60dl",
    ,
  },
  rightArrow: {
    end: "x1wtad8d",
    marginTop: "x9otpla",
    top: "xwa60dl",
    ,
  },
  upArrow: {
    marginStart: "x1orzsq4",
    start: "xtzzx4i",
    top: "x1fur4o1",
    ,
  },
};

const combinedStyles = gkx("4855")
  ? { ...arrowStyles, ...focusArrowStyles }
  : arrowStyles;

const shouldHideArrowSignifiers = gkx("1721477") || gkx("1459");

function CometCompositeItemFocusIndicator() {
  const context = useContext(CometCompositeStructureContext);

  if (!shouldHideArrowSignifiers || context.hideArrowSignifiers === true) {
    return null;
  }

  return (
    <>
      {context.horizontal === true ? (
        <>
          <div
            className={stylex(
              combinedStyles.focusArrow,
              combinedStyles.leftArrow
            )}
          >
            <CometIcon color="primary" icon={_(1739808, 8)} />
          </div>
          <div
            className={stylex(
              combinedStyles.focusArrow,
              combinedStyles.rightArrow
            )}
          >
            <CometIcon color="primary" icon={_(897949, 8)} />
          </div>
        </>
      ) : null}
      {context.vertical === true ? (
        <>
          <div
            className={stylex(
              combinedStyles.focusArrow,
              combinedStyles.upArrow
            )}
          >
            <CometIcon color="primary" icon={_(702721, 8)} />
          </div>
          <div
            className={stylex(
              combinedStyles.focusArrow,
              combinedStyles.downArrow
            )}
          >
            <CometIcon color="primary" icon={_(701592, 8)} />
          </div>
        </>
      ) : null}
    </>
  );
}

export default CometCompositeItemFocusIndicator;
