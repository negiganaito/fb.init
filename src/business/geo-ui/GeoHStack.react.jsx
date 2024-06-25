__d(
  "GeoHStack.react",
  ["GeoFlexbox.react", "GeoPrivateMakeComponent", "react", "useGeoTheme"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react");
    function a(a) {
      var b = a.alignItems;
      b = b === void 0 ? "start" : b;
      var d = a.context;
      d = d === void 0 ? "component" : d;
      var e = a.containerRef,
        f = a.direction;
      f = f === void 0 ? "row" : f;
      var g = a.display;
      g = g === void 0 ? "flex" : g;
      var h = a.grow;
      h = h === void 0 ? 1 : h;
      var j = a.relation;
      j = j === void 0 ? "unrelated" : j;
      var k = a.shrink;
      k = k === void 0 ? 1 : k;
      var l = a.xstyle;
      a = babelHelpers.objectWithoutPropertiesLoose(a, [
        "alignItems",
        "context",
        "containerRef",
        "direction",
        "display",
        "grow",
        "relation",
        "shrink",
        "xstyle",
      ]);
      var m = c("useGeoTheme")();
      m = m.selectLayoutSpacing;
      m = m({
        context: d,
        relation: j,
        direction: f === "row" ? "horizontal" : "horizontal-reverse",
      });
      return i.jsx(
        c("GeoFlexbox.react"),
        babelHelpers["extends"](
          {
            alignItems: b,
            containerRef: e,
            direction: f,
            display: g,
            grow: h,
            shrink: k,
            wrap: "nowrap",
            xstyle: [m, l],
          },
          a
        )
      );
    }
    a.displayName = a.name + " [from " + f.id + "]";
    b = d("GeoPrivateMakeComponent").makeGeoComponent("GeoHStack", a);
    g["default"] = b;
  },
  98
);

import GeoFlexbox from "GeoFlexbox.react";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import React from "react";
import useGeoTheme from "useGeoTheme";

interface GeoHStackProps {
  alignItems?: "start" | "center" | "end";
  context?: string;
  containerRef?: React.Ref<HTMLDivElement>;
  direction?: "row" | "row-reverse";
  display?: "flex" | "inline-flex";
  grow?: number;
  relation?: string;
  shrink?: number;
  xstyle?: any;
  [key: string]: any;
}

const GeoHStack: React.FC<GeoHStackProps> = ({
  alignItems = "start",
  context = "component",
  containerRef,
  direction = "row",
  display = "flex",
  grow = 1,
  relation = "unrelated",
  shrink = 1,
  xstyle,
  ...rest
}) => {
  const theme = useGeoTheme();
  const layoutSpacing = theme.selectLayoutSpacing({
    context,
    relation,
    direction: direction === "row" ? "horizontal" : "horizontal-reverse",
  });

  return (
    <GeoFlexbox
      alignItems={alignItems}
      containerRef={containerRef}
      direction={direction}
      display={display}
      grow={grow}
      shrink={shrink}
      wrap="nowrap"
      xstyle={[layoutSpacing, xstyle]}
      {...rest}
    />
  );
};

GeoHStack.displayName = "GeoHStack [from 98]";

export default makeGeoComponent("GeoHStack", GeoHStack);
