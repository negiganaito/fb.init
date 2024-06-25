__d(
  "useUniqueID",
  ["uniqueID", "useUnsafeRef_DEPRECATED"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    function a() {
      var a = (h || (h = c("useUnsafeRef_DEPRECATED")))(null);
      a.current === null && (a.current = c("uniqueID")());
      return a.current;
    }
    g["default"] = a;
  },
  98
); /*FB_PKG_DELIM*/

import { useRef } from "react";
import uniqueID from "uniqueID";

const useUniqueID = (): string => {
  const idRef = useRef<string | null>(null);

  if (idRef.current === null) {
    idRef.current = uniqueID();
  }

  return idRef.current;
};

export default useUniqueID;
