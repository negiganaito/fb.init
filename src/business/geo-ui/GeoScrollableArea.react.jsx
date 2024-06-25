__d(
  "GeoScrollableArea.react",
  ["BaseScrollableArea.react", "GeoDomID", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react");
    function a(a) {
      var b = a.containerRef,
        e = a.direction;
      e = e === void 0 ? "both" : e;
      var f = a.id,
        g = a["aria-labelledby"],
        h = a["aria-activedescendant"],
        j = a["aria-controls"],
        k = a["aria-describedby"],
        l = a["aria-details"],
        m = a["aria-errormessage"],
        n = a["aria-flowto"],
        o = a["aria-owns"];
      a = babelHelpers.objectWithoutPropertiesLoose(a, [
        "containerRef",
        "direction",
        "id",
        "aria-labelledby",
        "aria-activedescendant",
        "aria-controls",
        "aria-describedby",
        "aria-details",
        "aria-errormessage",
        "aria-flowto",
        "aria-owns",
      ]);
      var p = e === "horizontal" || e === "both";
      e = e === "vertical" || e === "both";
      h = d("GeoDomID").useApplyGeoDomIDsDirectly({
        id: f,
        "aria-labelledby": (f = g) != null ? f : void 0,
        "aria-activedescendant": (g = h) != null ? g : void 0,
        "aria-controls": (f = j) != null ? f : void 0,
        "aria-describedby": (h = k) != null ? h : void 0,
        "aria-details": (g = l) != null ? g : void 0,
        "aria-errormessage": (j = m) != null ? j : void 0,
        "aria-flowto": (f = n) != null ? f : void 0,
        "aria-owns": (k = o) != null ? k : void 0,
      });
      h.htmlFor;
      l = babelHelpers.objectWithoutPropertiesLoose(h, ["htmlFor"]);
      return i.jsx(
        c("BaseScrollableArea.react"),
        babelHelpers["extends"]({ horizontal: p, vertical: e }, a, l, {
          ref: b,
          testid: void 0,
        })
      );
    }
    a.displayName = a.name + " [from " + f.id + "]";
    b = a;
    g["default"] = b;
  },
  98
);

import React from "react";
import BaseScrollableArea from "path/to/BaseScrollableArea.react";
import { useApplyGeoDomIDsDirectly } from "path/to/GeoDomID";

interface GeoScrollableAreaProps
  extends React.ComponentPropsWithoutRef<typeof BaseScrollableArea> {
  containerRef?: React.RefObject<HTMLDivElement>;
  direction?: "horizontal" | "vertical" | "both";
  id?: string;
  "aria-labelledby"?: string;
  "aria-activedescendant"?: string;
  "aria-controls"?: string;
  "aria-describedby"?: string;
  "aria-details"?: string;
  "aria-errormessage"?: string;
  "aria-flowto"?: string;
  "aria-owns"?: string;
}

const GeoScrollableArea: React.FC<GeoScrollableAreaProps> = (props) => {
  const {
    containerRef,
    direction = "both",
    id,
    "aria-labelledby": ariaLabelledby,
    "aria-activedescendant": ariaActivedescendant,
    "aria-controls": ariaControls,
    "aria-describedby": ariaDescribedby,
    "aria-details": ariaDetails,
    "aria-errormessage": ariaErrormessage,
    "aria-flowto": ariaFlowto,
    "aria-owns": ariaOwns,
    ...restProps
  } = props;

  const isHorizontal = direction === "horizontal" || direction === "both";
  const isVertical = direction === "vertical" || direction === "both";

  const ariaProps = useApplyGeoDomIDsDirectly({
    id,
    "aria-labelledby": ariaLabelledby ?? undefined,
    "aria-activedescendant": ariaActivedescendant ?? undefined,
    "aria-controls": ariaControls ?? undefined,
    "aria-describedby": ariaDescribedby ?? undefined,
    "aria-details": ariaDetails ?? undefined,
    "aria-errormessage": ariaErrormessage ?? undefined,
    "aria-flowto": ariaFlowto ?? undefined,
    "aria-owns": ariaOwns ?? undefined,
  });

  return (
    <BaseScrollableArea
      {...restProps}
      {...ariaProps}
      horizontal={isHorizontal}
      vertical={isVertical}
      ref={containerRef}
      testid={undefined}
    />
  );
};

GeoScrollableArea.displayName = `${GeoScrollableArea.name} [from ${module.id}]`;

export default GeoScrollableArea;
