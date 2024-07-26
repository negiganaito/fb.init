// __d(
//   "personalGlobalScope",
//   ["CurrentUser"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     a = { id: c("CurrentUser").getAccountID(), type: "PERSONAL" };
//     g.personalGlobalScope = a;
//   },
//   98
// );

// personalGlobalScope.ts

import { CurrentUser } from "CurrentUser";

type GlobalScope = {
  id: string;
  type: string;
};

const personalGlobalScope: GlobalScope = {
  id: CurrentUser.getAccountID(),
  type: "PERSONAL",
};

export { personalGlobalScope };
