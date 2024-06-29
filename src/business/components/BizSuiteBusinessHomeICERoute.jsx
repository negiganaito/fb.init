// __d(
//   "BizSuiteBusinessHomeICERoute",
//   [
//     "AdsInterfacesICERoute",
//     "BizKitAllUsersOnCometHandler",
//     "BizSuiteRootICERoute",
//     "immutable",
//   ],
//   function (a, b, c, d, e, f) {
//     "use strict";
//     a = (function (a) {
//       babelHelpers.inheritsLoose(b, a);
//       function b() {
//         return a.apply(this, arguments) || this;
//       }
//       return b;
//     })(b("AdsInterfacesICERoute"));
//     a.routeName = "BizSuiteBusinessHomeICERoute";
//     a.configName = "BizSuite";
//     a.configPath = b("immutable").List(["business_home"]);
//     a.givenName = "business_home";
//     a.path = "/latest/business_home";
//     a.paramDefinitions = {};
//     a.queryParamDefinitions = {
//       bpn_id: {
//         type: "String",
//         flowType: "?string",
//         customType: "String",
//         required: !1,
//       },
//       business_id: {
//         type: "String",
//         flowType: "?string",
//         customType: "String",
//         required: !1,
//       },
//       global_scope_id: {
//         type: "String",
//         flowType: "?string",
//         customType: "String",
//         required: !1,
//       },
//       asset_id: {
//         type: "String",
//         flowType: "?string",
//         customType: "String",
//         required: !1,
//       },
//       asset_ids: {
//         type: "String",
//         flowType: "?$ReadOnlyArray<string>",
//         customType: "Array<String>",
//         required: !1,
//       },
//       nav_id: {
//         type: "String",
//         flowType: "?string",
//         customType: "String",
//         required: !1,
//       },
//       nav_ref: {
//         type: "String",
//         flowType: "?string",
//         customType: "String",
//         required: !1,
//       },
//     };
//     a.parentRoute = b("BizSuiteRootICERoute");
//     a.activeState = { isCometOnlyRoute: "true", routeName: "BUSINESS_HOME" };
//     a.handler = b("BizKitAllUsersOnCometHandler");
//     a.forceLoad = !1;
//     a.viewModuleName = "BizKitRedirectToCometView.react";
//     e.exports = a;
//   },
//   null
// );

import AdsInterfacesICERoute from "AdsInterfacesICERoute";
import BizKitAllUsersOnCometHandler from "BizKitAllUsersOnCometHandler";
import BizSuiteRootICERoute from "BizSuiteRootICERoute";
import { List } from "immutable";

interface QueryParamDefinition {
  type: string;
  flowType: string;
  customType: string;
  required: boolean;
}

interface ActiveState {
  isCometOnlyRoute: string;
  routeName: string;
}

class BizSuiteBusinessHomeICERoute extends AdsInterfacesICERoute {
  static routeName = "BizSuiteBusinessHomeICERoute";
  static configName = "BizSuite";
  static configPath = List(["business_home"]);
  static givenName = "business_home";
  static path = "/latest/business_home";
  static paramDefinitions = {};
  static queryParamDefinitions: Record<string, QueryParamDefinition> = {
    bpn_id: {
      type: "String",
      flowType: "?string",
      customType: "String",
      required: false,
    },
    business_id: {
      type: "String",
      flowType: "?string",
      customType: "String",
      required: false,
    },
    global_scope_id: {
      type: "String",
      flowType: "?string",
      customType: "String",
      required: false,
    },
    asset_id: {
      type: "String",
      flowType: "?string",
      customType: "String",
      required: false,
    },
    asset_ids: {
      type: "String",
      flowType: "?$ReadOnlyArray<string>",
      customType: "Array<String>",
      required: false,
    },
    nav_id: {
      type: "String",
      flowType: "?string",
      customType: "String",
      required: false,
    },
    nav_ref: {
      type: "String",
      flowType: "?string",
      customType: "String",
      required: false,
    },
  };
  static parentRoute = BizSuiteRootICERoute;
  static activeState: ActiveState = {
    isCometOnlyRoute: "true",
    routeName: "BUSINESS_HOME",
  };
  static handler = BizKitAllUsersOnCometHandler;
  static forceLoad = false;
  static viewModuleName = "BizKitRedirectToCometView.react";
}

export default BizSuiteBusinessHomeICERoute;
