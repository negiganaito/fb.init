__d(
  "GeoBaseInlinePressable.react",
  [
    "GeoBasePressable.react",
    "GeoBaseText.react",
    "GeoPrivateMakeComponent",
    "react",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react");
    function a(a) {
      var b = a.children;
      a = babelHelpers.objectWithoutPropertiesLoose(a, ["children"]);
      return i.jsx(
        c("GeoBasePressable.react"),
        babelHelpers["extends"]({}, a, {
          children: i.jsx(c("GeoBaseText.react"), {
            color: "inherit",
            size: "value",
            weight: "inherit",
            xstyle: j.fullWidth,
            children: b,
          }),
        })
      );
    }
    a.displayName = a.name + " [from " + f.id + "]";
    var j = { fullWidth: { width: "xh8yej3", $$css: !0 } };
    b = d("GeoPrivateMakeComponent").makeGeoComponent(
      "GeoBaseInlinePressable",
      a
    );
    g["default"] = b;
  },
  98
);

import React from "react";
import GeoBasePressable from "GeoBasePressable.react";
import GeoBaseText from "GeoBaseText.react";
import { makeGeoComponent } from "GeoPrivateMakeComponent";

interface Props {
  children: React.ReactNode;
  [key: string]: any; // For other props passed to GeoBasePressable
}

const GeoBaseInlinePressable: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <GeoBasePressable {...rest}>
      <GeoBaseText
        color="inherit"
        size="value"
        weight="inherit"
        xstyle={styles.fullWidth}
      >
        {children}
      </GeoBaseText>
    </GeoBasePressable>
  );
};

GeoBaseInlinePressable.displayName = `${GeoBaseInlinePressable.name} [from ${__filename}]`;

const styles = {
  fullWidth: {
    width: "xh8yej3",
    $$css: true,
  },
};

export default makeGeoComponent(
  "GeoBaseInlinePressable",
  GeoBaseInlinePressable
);
