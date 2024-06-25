__d(
  "GeoMenuItem.react",
  [
    "GeoBaseListRow.react",
    "GeoPrivateMakeComponent",
    "GeoPrivateMenuItemContext",
    "GeoPrivateMenuItemWrapper.react",
    "react",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h,
      i = h || (h = d("react"));
    b = h;
    var j = b.useCallback,
      k = b.useContext;
    function a(a) {
      var b = a.containerRef,
        d = a.icon,
        e = a.label,
        f = a.onClick,
        g = a.rightContent;
      a = babelHelpers.objectWithoutPropertiesLoose(a, [
        "containerRef",
        "icon",
        "label",
        "onClick",
        "rightContent",
      ]);
      var h = k(c("GeoPrivateMenuItemContext")),
        l = h.onClick;
      h = h.isHighlighted;
      var m = j(
        function (a) {
          f == null ? void 0 : f(a), l == null ? void 0 : l();
        },
        [f, l]
      );
      return i.jsx(c("GeoPrivateMenuItemWrapper.react"), {
        containerRef: b,
        children: i.jsx(
          c("GeoBaseListRow.react"),
          babelHelpers["extends"](
            {
              accessibilityRole: "menuitem",
              align: "center",
              endContent: g,
              isFocusable: !0,
              isHighlighted: h,
              label: e,
              loggingName: "GeoMenuItem",
              media: d,
              onPress: m,
            },
            a
          )
        ),
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    e = d("GeoPrivateMakeComponent").makeGeoComponent("GeoMenuItem", a);
    g["default"] = e;
  },
  98
);

import React, { useCallback, useContext } from "react";
import { GeoBaseListRow } from "GeoBaseListRow.react";
import { makeGeoComponent } from "GeoPrivateMakeComponent";
import { GeoPrivateMenuItemContext } from "GeoPrivateMenuItemContext";
import { GeoPrivateMenuItemWrapper } from "GeoPrivateMenuItemWrapper.react";

type Props = {
  containerRef?: React.RefObject<HTMLDivElement>;
  icon?: React.ReactNode;
  label: string;
  onClick?: (event: React.MouseEvent) => void;
  rightContent?: React.ReactNode;
  [key: string]: any;
};

const GeoMenuItem: React.FC<Props> = ({
  containerRef,
  icon,
  label,
  onClick,
  rightContent,
  ...restProps
}) => {
  const { onClick: contextOnClick, isHighlighted } = useContext(
    GeoPrivateMenuItemContext
  );

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (onClick) {
        onClick(event);
      }
      if (contextOnClick) {
        contextOnClick();
      }
    },
    [onClick, contextOnClick]
  );

  return (
    <GeoPrivateMenuItemWrapper containerRef={containerRef}>
      <GeoBaseListRow
        accessibilityRole="menuitem"
        align="center"
        endContent={rightContent}
        isFocusable={true}
        isHighlighted={isHighlighted}
        label={label}
        loggingName="GeoMenuItem"
        media={icon}
        onPress={handleClick}
        {...restProps}
      />
    </GeoPrivateMenuItemWrapper>
  );
};

GeoMenuItem.displayName = "GeoMenuItem";

export default makeGeoComponent("GeoMenuItem", GeoMenuItem);
