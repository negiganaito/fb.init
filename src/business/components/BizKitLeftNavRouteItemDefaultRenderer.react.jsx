// __d(
//   "BizKitLeftNavRouteItemDefaultRenderer.react",
//   [
//     "BizKitLeftNavDefaultRouteItem.react",
//     "BizKitLeftNavRouteItemDefaultRenderer_item.graphql",
//     "RelayHooks",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i,
//       j = i || d("react");
//     function a(a) {
//       a = a.item;
//       a = d("RelayHooks").useFragment(
//         h !== void 0
//           ? h
//           : (h = b("BizKitLeftNavRouteItemDefaultRenderer_item.graphql")),
//         a
//       );
//       a = a.nav_item;
//       return j.jsx(c("BizKitLeftNavDefaultRouteItem.react"), { item: a });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React from "react";
import { useFragment } from "RelayHooks";
import BizKitLeftNavDefaultRouteItem from "BizKitLeftNavDefaultRouteItem.react";
import { BizKitLeftNavRouteItemDefaultRenderer_item } from "BizKitLeftNavRouteItemDefaultRenderer_item.graphql";

interface BizKitLeftNavRouteItemDefaultRendererProps {
  item: any;
}

const BizKitLeftNavRouteItemDefaultRenderer: React.FC<
  BizKitLeftNavRouteItemDefaultRendererProps
> = ({ item }) => {
  const data = useFragment(BizKitLeftNavRouteItemDefaultRenderer_item, item);
  const { nav_item } = data;

  return <BizKitLeftNavDefaultRouteItem item={nav_item} />;
};

BizKitLeftNavRouteItemDefaultRenderer.displayName = `${BizKitLeftNavRouteItemDefaultRenderer.name} [from ${module.id}]`;

export default BizKitLeftNavRouteItemDefaultRenderer;
