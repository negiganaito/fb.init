__d(
  "BusinessUnifiedScopingSelectorCollapsedButton.react",
  [
    "BusinessUnifiedScopingSelectorButtonMedia.react",
    "GeoBaseInlinePressable.react",
    "geoMargin",
    "gkx",
    "react",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react");
    function a(a) {
      var b = a.isCollapsed,
        d = a.onCollapsedChange,
        e = a.scopePictureUri;
      a = a.scopeType;
      var f = function () {
        b && d && d(!1);
      };
      return i.jsx(c("GeoBaseInlinePressable.react"), {
        "aria-label": "Pressable",
        "data-testid": void 0,
        onPress: f,
        variant: "flat",
        xstyle:
          a === "business" || !c("gkx")("21034") ? null : c("geoMargin").start4,
        children: i.jsx(c("BusinessUnifiedScopingSelectorButtonMedia.react"), {
          scopePictureUri: e,
          scopeType: a,
        }),
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);

import React from "react";
import BusinessUnifiedScopingSelectorButtonMedia from "BusinessUnifiedScopingSelectorButtonMedia.react";
import GeoBaseInlinePressable from "GeoBaseInlinePressable.react";
import geoMargin from "geoMargin";
import gkx from "gkx";

interface Props {
  isCollapsed: boolean;
  onCollapsedChange?: (isCollapsed: boolean) => void;
  scopePictureUri?: string;
  scopeType: string;
}

const BusinessUnifiedScopingSelectorCollapsedButton: React.FC<Props> = ({
  isCollapsed,
  onCollapsedChange,
  scopePictureUri,
  scopeType,
}) => {
  const handlePress = () => {
    if (isCollapsed && onCollapsedChange) {
      onCollapsedChange(false);
    }
  };

  return (
    <GeoBaseInlinePressable
      aria-label="Pressable"
      data-testid={undefined}
      onPress={handlePress}
      variant="flat"
      xstyle={
        scopeType === "business" || !gkx("21034") ? null : geoMargin.start4
      }
    >
      <BusinessUnifiedScopingSelectorButtonMedia
        scopePictureUri={scopePictureUri}
        scopeType={scopeType}
      />
    </GeoBaseInlinePressable>
  );
};

BusinessUnifiedScopingSelectorCollapsedButton.displayName = `${BusinessUnifiedScopingSelectorCollapsedButton.name} [from ${__filename}]`;

export default BusinessUnifiedScopingSelectorCollapsedButton;
