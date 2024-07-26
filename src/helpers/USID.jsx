// __d(
//   "USID",
//   ["USIDCore", "USIDMetadata", "USIDUtils"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h = null,
//       i = function (a) {
//         if (h != null) return h;
//         var b = d("USIDUtils").getExistingTabId(),
//           e = c("USIDMetadata").page_id,
//           f = c("USIDMetadata").transition_id,
//           g = c("USIDMetadata").version,
//           i = d("USIDUtils").getFlags();
//         h = new (c("USIDCore"))(b, e, f, g, i, a);
//         return h;
//       };
//     a = function () {
//       return i({ activityTrigger: "request" });
//     };
//     b = { init: i, get: a };
//     g["default"] = b;
//   },
//   98
// );

// USID.ts

import { USIDCore } from "USIDCore";
import { USIDMetadata } from "USIDMetadata";
import { USIDUtils } from "USIDUtils";

type USIDOptions = {
  activityTrigger: string;
};

let usidInstance: USIDCore | null = null;

const init = (options: USIDOptions): USIDCore => {
  if (usidInstance != null) return usidInstance;

  const existingTabId = USIDUtils.getExistingTabId();
  const pageId = USIDMetadata.page_id;
  const transitionId = USIDMetadata.transition_id;
  const version = USIDMetadata.version;
  const flags = USIDUtils.getFlags();

  usidInstance = new USIDCore(
    existingTabId,
    pageId,
    transitionId,
    version,
    flags,
    options
  );
  return usidInstance;
};

const get = (): USIDCore => {
  return init({ activityTrigger: "request" });
};

export default { init, get };
