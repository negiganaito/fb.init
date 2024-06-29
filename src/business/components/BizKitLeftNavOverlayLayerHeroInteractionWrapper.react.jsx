// __d(
//   "BizKitLeftNavOverlayLayerHeroInteractionWrapper.react",
//   [
//     "BizKitLeftNavOverlayLayer.react",
//     "BizKitOverlayContext",
//     "CometHeroInteractionWithDiv.react",
//     "GeoSpinner.react",
//     "gkx",
//     "hero-tracing",
//     "hero-tracing-placeholder",
//     "react",
//   ],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = h || (h = d("react")),
//       j = h.useContext;
//     function a(a) {
//       a = a.scoping;
//       var b = c("gkx")("20935"),
//         e = "overlay VC",
//         f = j(c("BizKitOverlayContext"));
//       f = f.interactionUUID;
//       var g = "bizkit.leftnav.overlay";
//       if (b)
//         return i.jsx(c("CometHeroInteractionWithDiv.react"), {
//           interactionDesc: e,
//           interactionUUID: f,
//           pageletName: g,
//           children: i.jsx(d("hero-tracing-placeholder").HeroPlaceholder, {
//             fallback: i.jsx(c("GeoSpinner.react"), { center: !0 }),
//             children: i.jsx(c("BizKitLeftNavOverlayLayer.react"), {
//               scoping: a,
//             }),
//           }),
//         });
//       else
//         return i.jsx(d("hero-tracing").HeroInteraction, {
//           interactionDesc: e,
//           interactionUUID: f,
//           pageletName: g,
//           children: i.jsx(d("hero-tracing-placeholder").HeroPlaceholder, {
//             fallback: i.jsx(c("GeoSpinner.react"), { center: !0 }),
//             children: i.jsx(c("BizKitLeftNavOverlayLayer.react"), {
//               scoping: a,
//             }),
//           }),
//         });
//     }
//     a.displayName = a.name + " [from " + f.id + "]";
//     g["default"] = a;
//   },
//   98
// );

import BizKitLeftNavOverlayLayer from "BizKitLeftNavOverlayLayer.react";
import { BizKitOverlayContext } from "BizKitOverlayContext";
import CometHeroInteractionWithDiv from "CometHeroInteractionWithDiv.react";
import GeoSpinner from "GeoSpinner.react";
import gkx from "gkx";
import { HeroInteraction } from "hero-tracing";
import { HeroPlaceholder } from "hero-tracing-placeholder";
import React, { useContext } from "react";

interface BizKitLeftNavOverlayLayerHeroInteractionWrapperProps {
  scoping: any; // Adjust the type based on your specific props
}

const BizKitLeftNavOverlayLayerHeroInteractionWrapper: React.FC<
  BizKitLeftNavOverlayLayerHeroInteractionWrapperProps
> = ({ scoping }) => {
  const isFeatureEnabled = gkx("20935");
  const interactionDesc = "overlay VC";
  const { interactionUUID } = useContext(BizKitOverlayContext);
  const pageletName = "bizkit.leftnav.overlay";

  if (isFeatureEnabled) {
    return (
      <CometHeroInteractionWithDiv
        interactionDesc={interactionDesc}
        interactionUUID={interactionUUID}
        pageletName={pageletName}
      >
        <HeroPlaceholder fallback={<GeoSpinner center />}>
          <BizKitLeftNavOverlayLayer scoping={scoping} />
        </HeroPlaceholder>
      </CometHeroInteractionWithDiv>
    );
  } else {
    return (
      <HeroInteraction
        interactionDesc={interactionDesc}
        interactionUUID={interactionUUID}
        pageletName={pageletName}
      >
        <HeroPlaceholder fallback={<GeoSpinner center />}>
          <BizKitLeftNavOverlayLayer scoping={scoping} />
        </HeroPlaceholder>
      </HeroInteraction>
    );
  }
};

BizKitLeftNavOverlayLayerHeroInteractionWrapper.displayName = `${BizKitLeftNavOverlayLayerHeroInteractionWrapper.name} [from some-module-id]`;

export default BizKitLeftNavOverlayLayerHeroInteractionWrapper;
