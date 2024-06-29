// __d(
//   "BizKitLeftNavHeaderAllToolsMenuButton.react",
//   [
//     "ix",
//     "BizKitOverlayContext",
//     "GeoIcon.react",
//     "GeoPrivateWebPressable.react",
//     "fbicon",
//     "react",
//     "useNavOverlayLinkDataInner",
//   ],
//   function (a, b, c, d, e, f, g, h) {
//     "use strict";
//     var i,
//       j = i || (i = d("react")),
//       k = i.useContext,
//       l = {
//         button: {
//           paddingTop: "x1y1aw1k",
//           paddingEnd: "x1sxyh0",
//           paddingBottom: "xwib8y2",
//           paddingStart: "xurb0ha",
//           borderTopStartRadius: "xhk9q7s",
//           borderTopEndRadius: "x1otrzb0",
//           borderBottomEndRadius: "x1i1ezom",
//           borderBottomStartRadius: "x1o6z2jb",
//           $$css: !0,
//         },
//         buttonActive: {
//           color: "xg32yw2",
//           backgroundColor: "xy99zzx",
//           $$css: !0,
//         },
//       };
//     function a() {
//       var a = k(c("BizKitOverlayContext"));
//       a = a.activeOverlay;
//       var b = c("useNavOverlayLinkDataInner")("MORE_TOOLS", 0);
//       b = b.onClick;
//       a = a === "MORE_TOOLS";
//       return j.jsx(c("GeoPrivateWebPressable.react"), {
//         accessibilityRole: "button",
//         accessibilityLabel: "All Tools menu",
//         onPress: b,
//         xstyle: [l.button, a && l.buttonActive],
//         children: j.jsx(c("GeoIcon.react"), {
//           color: a ? "inherit" : "default",
//           icon: d("fbicon")._(h("533528"), 20),
//         }),
//       });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import { ix } from "ix";
import BizKitOverlayContext from "BizKitOverlayContext";
import GeoIcon from "GeoIcon.react";
import GeoPrivateWebPressable from "GeoPrivateWebPressable.react";
import fbicon from "fbicon";
import React, { useContext } from "react";
import useNavOverlayLinkDataInner from "useNavOverlayLinkDataInner";

const styles = {
  button: {
    paddingTop: "x1y1aw1k",
    paddingEnd: "x1sxyh0",
    paddingBottom: "xwib8y2",
    paddingStart: "xurb0ha",
    borderTopStartRadius: "xhk9q7s",
    borderTopEndRadius: "x1otrzb0",
    borderBottomEndRadius: "x1i1ezom",
    borderBottomStartRadius: "x1o6z2jb",
    $$css: true,
  },
  buttonActive: {
    color: "xg32yw2",
    backgroundColor: "xy99zzx",
    $$css: true,
  },
};

const BizKitLeftNavHeaderAllToolsMenuButton: React.FC = () => {
  const { activeOverlay } = useContext(BizKitOverlayContext);
  const { onClick } = useNavOverlayLinkDataInner("MORE_TOOLS", 0);
  const isActive = activeOverlay === "MORE_TOOLS";

  return (
    <GeoPrivateWebPressable
      accessibilityRole="button"
      accessibilityLabel="All Tools menu"
      onPress={onClick}
      xstyle={[styles.button, isActive && styles.buttonActive]}
    >
      <GeoIcon
        color={isActive ? "inherit" : "default"}
        icon={fbicon(ix("533528"), 20)}
      />
    </GeoPrivateWebPressable>
  );
};

BizKitLeftNavHeaderAllToolsMenuButton.displayName =
  "BizKitLeftNavHeaderAllToolsMenuButton";

export default BizKitLeftNavHeaderAllToolsMenuButton;
