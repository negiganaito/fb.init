__d(
  "BizSuiteHomeICERoute",
  [
    "AdsInterfacesICERoute",
    "BizKitHomeRouteHandler",
    "BizSuiteRootICERoute",
    "immutable",
  ],
  function (a, b, c, d, e, f) {
    "use strict";
    a = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b() {
        return a.apply(this, arguments) || this;
      }
      return b;
    })(b("AdsInterfacesICERoute"));
    a.routeName = "BizSuiteHomeICERoute";
    a.configName = "BizSuite";
    a.configPath = b("immutable").List(["home"]);
    a.givenName = "home";
    a.path = "/latest/home";
    a.paramDefinitions = {};
    a.queryParamDefinitions = {
      bpn_id: {
        type: "String",
        flowType: "?string",
        customType: "String",
        required: !1,
      },
      business_id: {
        type: "String",
        flowType: "?string",
        customType: "String",
        required: !1,
      },
      global_scope_id: {
        type: "String",
        flowType: "?string",
        customType: "String",
        required: !1,
      },
      asset_id: {
        type: "String",
        flowType: "?string",
        customType: "String",
        required: !1,
      },
      asset_ids: {
        type: "String",
        flowType: "?$ReadOnlyArray<string>",
        customType: "Array<String>",
        required: !1,
      },
      nav_id: {
        type: "String",
        flowType: "?string",
        customType: "String",
        required: !1,
      },
      nav_ref: {
        type: "String",
        flowType: "?string",
        customType: "String",
        required: !1,
      },
      composer_link_preview: {
        type: "String",
        flowType: "?string",
        customType: "String",
        required: !1,
      },
      modal: {
        type: "String",
        flowType: "?string",
        customType: "String",
        required: !1,
      },
      request_product_tour: {
        type: "String",
        flowType: "?boolean",
        customType: "boolean",
        required: !1,
      },
      mio: {
        type: "String",
        flowType: "?boolean",
        customType: "boolean",
        required: !1,
      },
    };
    a.parentRoute = b("BizSuiteRootICERoute");
    a.activeState = { routeName: "HOME" };
    a.handler = b("BizKitHomeRouteHandler");
    a.forceLoad = !1;
    a.viewModuleName = "BizKitHomeView.react";
    e.exports = a;
  },
  null
);

import AdsInterfacesICERoute from "AdsInterfacesICERoute";
import BizKitHomeRouteHandler from "BizKitHomeRouteHandler";
import BizSuiteRootICERoute from "BizSuiteRootICERoute";
import { List } from "immutable";

interface QueryParamDefinition {
  type: string;
  flowType: string;
  customType: string;
  required: boolean;
}

interface ActiveState {
  routeName: string;
}

class BizSuiteHomeICERoute extends AdsInterfacesICERoute {
  static routeName = "BizSuiteHomeICERoute";
  static configName = "BizSuite";
  static configPath = List(["home"]);
  static givenName = "home";
  static path = "/latest/home";
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
    composer_link_preview: {
      type: "String",
      flowType: "?string",
      customType: "String",
      required: false,
    },
    modal: {
      type: "String",
      flowType: "?string",
      customType: "String",
      required: false,
    },
    request_product_tour: {
      type: "String",
      flowType: "?boolean",
      customType: "boolean",
      required: false,
    },
    mio: {
      type: "String",
      flowType: "?boolean",
      customType: "boolean",
      required: false,
    },
  };
  static parentRoute = BizSuiteRootICERoute;
  static activeState: ActiveState = { routeName: "HOME" };
  static handler = BizKitHomeRouteHandler;
  static forceLoad = false;
  static viewModuleName = "BizKitHomeView.react";
}

export default BizSuiteHomeICERoute;
