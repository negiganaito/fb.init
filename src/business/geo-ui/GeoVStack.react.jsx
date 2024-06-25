__d(
  "GeoVStack.react",
  ["GeoFlexbox.react", "GeoPrivateMakeComponent", "react", "useGeoTheme"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react");
    function a(a) {
      var b = a.alignItems;
      b = b === void 0 ? null : b;
      var d = a.containerRef,
        e = a.context;
      e = e === void 0 ? "component" : e;
      var f = a.direction;
      f = f === void 0 ? "column" : f;
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
        "containerRef",
        "context",
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
        context: e,
        relation: j,
        direction: f === "column" ? "vertical" : "vertical-reverse",
      });
      return i.jsx(
        c("GeoFlexbox.react"),
        babelHelpers["extends"](
          {
            alignItems: b,
            containerRef: d,
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
    b = d("GeoPrivateMakeComponent").makeGeoComponent("GeoVStack", a);
    g["default"] = b;
  },
  98
);

import React, { ReactNode, Ref } from "react";
import GeoFlexbox from "GeoFlexbox.react";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import { useGeoTheme } from "useGeoTheme";

interface Props {
  alignItems?: string | null;
  containerRef?: Ref<HTMLDivElement>;
  context?: string;
  direction?: "column" | "column-reverse" | "row" | "row-reverse";
  display?: string;
  grow?: number;
  relation?: string;
  shrink?: number;
  xstyle?: any;
  children?: ReactNode;
}

const GeoVStack: React.FC<Props> = ({
  alignItems = null,
  containerRef,
  context = "component",
  direction = "column",
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
    direction: direction === "column" ? "vertical" : "vertical-reverse",
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

GeoVStack.displayName = `${GeoVStack.name}`;

export default makeGeoComponent("GeoVStack", GeoVStack);
