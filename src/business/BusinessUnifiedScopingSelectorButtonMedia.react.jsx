__d(
  "BusinessUnifiedScopingSelectorButtonMedia.react",
  ["BusinessUnifiedScopingSelectorUtils", "GeoMediaItem.react", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react");
    function a(a) {
      var b = a.scopePictureUri;
      a = a.scopeType;
      b = d("BusinessUnifiedScopingSelectorUtils").getMediaImg(b, a);
      return a === "business"
        ? i.jsx(c("GeoMediaItem.react"), {
            media: d("BusinessUnifiedScopingSelectorUtils").getMediaWithBorder(
              b
            ),
            ratio: "square",
            size: 32,
          })
        : i.jsx(c("GeoMediaItem.react"), {
            media: d("BusinessUnifiedScopingSelectorUtils").getMediaWithBorder(
              b
            ),
            platform: d("BusinessUnifiedScopingSelectorUtils").getMediaIcon(a),
            ratio: "circle",
            size: 24,
          });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);

import {
  getMediaImg,
  getMediaWithBorder,
  getMediaIcon,
} from "BusinessUnifiedScopingSelectorUtils";
import GeoMediaItem from "GeoMediaItem.react";
import React from "react";

interface BusinessUnifiedScopingSelectorButtonMediaProps {
  scopePictureUri: string;
  scopeType: string;
}

const BusinessUnifiedScopingSelectorButtonMedia: React.FC<
  BusinessUnifiedScopingSelectorButtonMediaProps
> = ({ scopePictureUri, scopeType }) => {
  const mediaImg = getMediaImg(scopePictureUri, scopeType);

  return scopeType === "business" ? (
    <GeoMediaItem
      media={getMediaWithBorder(mediaImg)}
      ratio="square"
      size={32}
    />
  ) : (
    <GeoMediaItem
      media={getMediaWithBorder(mediaImg)}
      platform={getMediaIcon(scopeType)}
      ratio="circle"
      size={24}
    />
  );
};

BusinessUnifiedScopingSelectorButtonMedia.displayName = `BusinessUnifiedScopingSelectorButtonMedia [from ${module.id}]`;

export default BusinessUnifiedScopingSelectorButtonMedia;
