// __d(
//   "BizKitLeftNavRouteItem.react",
//   ["BizKitLeftNavRouteItem_item.graphql", "CometRelay", "RelayHooks", "react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i,
//       j = i || d("react");
//     function a(a) {
//       a = a.item;
//       a = d("RelayHooks").useFragment(
//         h !== void 0 ? h : (h = b("BizKitLeftNavRouteItem_item.graphql")),
//         a
//       );
//       a = a.content_renderer;
//       return j.jsx(d("CometRelay").MatchContainer, {
//         match: a,
//         props: { item: a },
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React from "react";
import { useFragment } from "RelayHooks";
import { MatchContainer } from "CometRelay";
import { BizKitLeftNavRouteItem_item } from "BizKitLeftNavRouteItem_item.graphql";

interface BizKitLeftNavRouteItemProps {
  item: any;
}

const BizKitLeftNavRouteItem: React.FC<BizKitLeftNavRouteItemProps> = ({
  item,
}) => {
  const data = useFragment(BizKitLeftNavRouteItem_item, item);
  const { content_renderer } = data;

  return (
    <MatchContainer
      match={content_renderer}
      props={{ item: content_renderer }}
    />
  );
};

BizKitLeftNavRouteItem.displayName = `${BizKitLeftNavRouteItem.name} [from ${module.id}]`;

export default BizKitLeftNavRouteItem;
