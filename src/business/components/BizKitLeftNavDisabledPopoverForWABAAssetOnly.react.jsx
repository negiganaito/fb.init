// __d(
//   "BizKitLeftNavDisabledPopoverForWABAAssetOnly.react",
//   [
//     "fbt",
//     "BizKitGlobalScopeSelectorContext",
//     "GeoHintActionButton.react",
//     "GeoHintText.react",
//     "GeoPopover.react",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g, h) {
//     "use strict";
//     var i,
//       j = i || (i = d("react"));
//     b = i;
//     var k = b.useContext,
//       l = b.useRef;
//     function a(a) {
//       a = a.children;
//       var b = k(c("BizKitGlobalScopeSelectorContext")),
//         d = b.setIsOpen,
//         e = l(null);
//       b = h._("Unavailable for WhatsApp");
//       var f = h._(
//           "To use these tools, you'll need to switch to managing a different business asset like a Facebook Page or Instagram account."
//         ),
//         g = h._("Switch business asset");
//       return j.jsx(c("GeoPopover.react"), {
//         action: j.jsx(c("GeoHintActionButton.react"), {
//           label: g,
//           onClick: function () {
//             var a;
//             (a = e.current) == null ? void 0 : a.hide();
//             d(!0);
//           },
//         }),
//         content: [j.jsx(c("GeoHintText.react"), { children: f }, "text")],
//         "data-testid": void 0,
//         heading: b,
//         imperativeRef: e,
//         isSticky: !1,
//         children: a,
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   226
// );

import { fbt } from "fbt";
import { BizKitGlobalScopeSelectorContext } from "BizKitGlobalScopeSelectorContext";
import GeoHintActionButton from "GeoHintActionButton.react";
import GeoHintText from "GeoHintText.react";
import GeoPopover from "GeoPopover.react";
import React, { useContext, useRef } from "react";

interface BizKitLeftNavDisabledPopoverForWABAAssetOnlyProps {
  children: React.ReactNode;
}

const BizKitLeftNavDisabledPopoverForWABAAssetOnly: React.FC<
  BizKitLeftNavDisabledPopoverForWABAAssetOnlyProps
> = ({ children }) => {
  const { setIsOpen } = useContext(BizKitGlobalScopeSelectorContext);
  const popoverRef = useRef<{ hide: () => void } | null>(null);

  const heading = fbt._("Unavailable for WhatsApp");
  const contentText = fbt._(
    "To use these tools, you'll need to switch to managing a different business asset like a Facebook Page or Instagram account."
  );
  const actionLabel = fbt._("Switch business asset");

  return (
    <GeoPopover
      action={
        <GeoHintActionButton
          label={actionLabel}
          onClick={() => {
            popoverRef.current?.hide();
            setIsOpen(true);
          }}
        />
      }
      content={[<GeoHintText key="text">{contentText}</GeoHintText>]}
      heading={heading}
      imperativeRef={popoverRef}
      isSticky={false}
    >
      {children}
    </GeoPopover>
  );
};

BizKitLeftNavDisabledPopoverForWABAAssetOnly.displayName = `${BizKitLeftNavDisabledPopoverForWABAAssetOnly.name} [from some-module-id]`;

export default BizKitLeftNavDisabledPopoverForWABAAssetOnly;
