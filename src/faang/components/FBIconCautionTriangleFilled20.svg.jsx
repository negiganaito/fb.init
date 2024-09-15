/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import { Defs, G, Path, Svg } from "./XPlatReactSVG";

const FBIconCautionTriangleFilled20 = (props) => {
  return (
    <Svg
      viewBox="0 0 20 20"
      width="1em"
      height="1em"
      fill="currentColor"
      title={props.title}
      {...props}
    >
      {props.children !== null && <Defs>{props.children}</Defs>}
      <G stroke="none" strokeWidth={1} fillRule="evenodd">
        <Path
          d="m105.497 199.534-.44 5.04c-.047.523-.505.926-1.056.926-.55 0-1.01-.403-1.055-.927l-.442-5.039A1.46 1.46 0 0 1 104 198a1.46 1.46 0 0 1 1.497 1.534zm-1.496 9.966c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5a1.501 1.501 0 0 1 0 3zm1.812-14.96a2.034 2.034 0 0 0-1.78-1.04h-.003c-.741 0-1.407.387-1.78 1.034l-7.966 13.835a2.082 2.082 0 0 0-.01 2.08 2.033 2.033 0 0 0 1.79 1.051h15.874c.748 0 1.416-.392 1.788-1.049a2.084 2.084 0 0 0-.005-2.077l-7.908-13.833z"
          transform="translate(-446 -350) translate(352 157)"
        />
      </G>
    </Svg>
  );
};

FBIconCautionTriangleFilled20.displayName =
  "FBIconCautionTriangleFilled20 [from " + __filename + "]";
FBIconCautionTriangleFilled20._isSVG = true;

export default FBIconCautionTriangleFilled20;
