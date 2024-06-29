__d(
  "logBizKitError",
  ["BizKitConstants", "FBLogger"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    a = function (a) {
      c("FBLogger")(d("BizKitConstants").BIZKIT_PROJECT_NAME)
        .catching(a)
        .mustfix(a.message);
    };
    g["default"] = a;
  },
  98
);

import BizKitConstants from "BizKitConstants";
import FBLogger from "FBLogger";

const logBizKitError = (error: Error): void => {
  FBLogger(BizKitConstants.BIZKIT_PROJECT_NAME)
    .catching(error)
    .mustfix(error.message);
};

export default logBizKitError;
