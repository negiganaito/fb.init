// __d(
//   "BizKitLeftNavSidebarItem.react",
//   [
//     "BizKitLeftNavSidebarItem_item.graphql",
//     "RelayFBMatchContainer",
//     "RelayHooks",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i,
//       j = i || (i = d("react")),
//       k = i.Suspense;
//     function a(a) {
//       a = a.item;
//       var e = d("RelayHooks").useFragment(
//         h !== void 0 ? h : (h = b("BizKitLeftNavSidebarItem_item.graphql")),
//         a
//       );
//       return j.jsx(k, {
//         fallback: null,
//         children: j.jsx(c("RelayFBMatchContainer"), {
//           match: e,
//           props: { item: a },
//         }),
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import React, { Suspense } from "react";
import { useFragment } from "relay-hooks";
import RelayFBMatchContainer from "path/to/RelayFBMatchContainer";
import { BizKitLeftNavSidebarItem_item } from "path/to/__generated__/BizKitLeftNavSidebarItem_item.graphql";

interface BizKitLeftNavSidebarItemProps {
  item: BizKitLeftNavSidebarItem_item;
}

const BizKitLeftNavSidebarItem: React.FC<BizKitLeftNavSidebarItemProps> = ({
  item,
}) => {
  const data = useFragment(BizKitLeftNavSidebarItem_item, item);

  return (
    <Suspense fallback={null}>
      <RelayFBMatchContainer match={data} props={{ item }} />
    </Suspense>
  );
};

BizKitLeftNavSidebarItem.displayName = `${BizKitLeftNavSidebarItem.name}`;

export default BizKitLeftNavSidebarItem;
