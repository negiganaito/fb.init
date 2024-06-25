__d(
  "GeoPrivateMenuItemWrapper.react",
  [
    "GeoBaseListRowContext",
    "GeoMenuLayoutContext",
    "GeoPrivateMakeComponent",
    "react",
    "useGeoSelection",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || d("react"),
      j = { isNested: !0 },
      k = { isSeparator: !1 };
    function a(a) {
      var b = a.children,
        d = a.containerRef;
      a.forwardedRef;
      var e = a.onMouseEnter;
      a = babelHelpers.objectWithoutPropertiesLoose(a, [
        "children",
        "containerRef",
        "forwardedRef",
        "onMouseEnter",
      ]);
      var f = c("useGeoSelection")(null);
      f = f.clearSelection;
      var g = c("GeoMenuLayoutContext").useLayoutContext(k);
      g[0];
      g = g[1];
      e = (e = e) != null ? e : f;
      return i.jsx(c("GeoBaseListRowContext").Provider, {
        value: j,
        children: i.jsx(
          "div",
          babelHelpers["extends"]({}, a, {
            onMouseEnter: e,
            ref: d,
            children: i.jsx("div", { ref: g, children: b }),
          })
        ),
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    b = d("GeoPrivateMakeComponent").makeGeoComponent(
      "GeoPrivateMenuItemWrapper",
      a
    );
    g["default"] = b;
  },
  98
);

import {
  GeoBaseListRowContext,
  GeoMenuLayoutContext,
  GeoPrivateMakeComponent,
} from "./modules";
import React from "react";
import { useGeoSelection } from "useGeoSelection";

interface GeoPrivateMenuItemWrapperProps {
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLDivElement>;
  forwardedRef?: React.RefObject<HTMLDivElement>;
  onMouseEnter?: () => void;
  [key: string]: any;
}

const GeoPrivateMenuItemWrapper = ({
  children,
  containerRef,
  forwardedRef,
  onMouseEnter,
  ...rest
}: GeoPrivateMenuItemWrapperProps) => {
  const { clearSelection } = useGeoSelection(null);
  const [, setLayoutRef] = GeoMenuLayoutContext.useLayoutContext({
    isSeparator: false,
  });
  const handleMouseEnter = onMouseEnter ?? clearSelection;

  return (
    <GeoBaseListRowContext.Provider value={{ isNested: true }}>
      <div {...rest} onMouseEnter={handleMouseEnter} ref={containerRef}>
        <div ref={setLayoutRef}>{children}</div>
      </div>
    </GeoBaseListRowContext.Provider>
  );
};

GeoPrivateMenuItemWrapper.displayName = `${
  GeoPrivateMenuItemWrapper.name
} [from ${import.meta.url}]`;

export default GeoPrivateMakeComponent.makeGeoComponent(
  "GeoPrivateMenuItemWrapper",
  GeoPrivateMenuItemWrapper
);
