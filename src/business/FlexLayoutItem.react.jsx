__d(
  "FlexLayoutItem.react",
  ["cx", "joinClasses", "react"],
  function (a, b, c, d, e, f, g, h) {
    "use strict";
    var i,
      j = i || d("react");
    a = (function (a) {
      babelHelpers.inheritsLoose(b, a);
      function b() {
        return a.apply(this, arguments) || this;
      }
      var d = b.prototype;
      d.render = function () {
        var a = this.props,
          c = a.align,
          d = a.basis,
          e = a.children,
          f = a.className,
          g = a.grow,
          h = a.order,
          i = a.shrink;
        a = a.style;
        var k = this.props["data-testid"];
        k = b.flexLayoutItem({
          align: c,
          basis: d,
          grow: g,
          order: h,
          shrink: i,
          className: f,
          style: a,
        });
        return j.jsx(
          "div",
          babelHelpers["extends"]({}, k, { "data-testid": void 0, children: e })
        );
      };
      b.flexLayoutItem = function (a) {
        a = a !== void 0 ? a : {};
        var d = a.className,
          e = a.order,
          f = a.grow,
          g = a.shrink,
          h = a.basis,
          i = a.align;
        a = a.style;
        e === void 0 && (e = b.defaultProps.order);
        f === void 0 && (f = b.defaultProps.grow);
        g === void 0 && (g = b.defaultProps.shrink);
        h === void 0 && (h = b.defaultProps.basis);
        i === void 0 && (i = b.defaultProps.align);
        return {
          className: c("joinClasses")(
            (i === "auto" ? "_6g3g" : "") +
              (i === "start" ? " _6g3m" : "") +
              (i === "center" ? " _6g3n" : "") +
              (i === "end" ? " _6g3v" : "") +
              (i === "stretch" ? " _6g3w" : ""),
            d
          ),
          style: babelHelpers["extends"]({}, a, {
            flexBasis: h,
            flexGrow: f,
            flexShrink: g,
            order: e,
          }),
        };
      };
      return b;
    })(j.Component);
    a.defaultProps = {
      align: "auto",
      basis: "auto",
      grow: 0,
      order: 0,
      shrink: 1,
    };
    g["default"] = a;
  },
  98
);

import React, { Component, ReactNode, CSSProperties } from "react";
import joinClasses from "joinClasses";

interface Props {
  align?: "auto" | "start" | "center" | "end" | "stretch";
  basis?: string | number;
  children?: ReactNode;
  className?: string;
  grow?: number;
  order?: number;
  shrink?: number;
  style?: CSSProperties;
  "data-testid"?: string;
}

interface FlexLayoutItemProps {
  align?: string;
  basis?: string | number;
  className?: string;
  grow?: number;
  order?: number;
  shrink?: number;
  style?: CSSProperties;
}

class FlexLayoutItem extends Component<Props> {
  static defaultProps = {
    align: "auto",
    basis: "auto",
    grow: 0,
    order: 0,
    shrink: 1,
  };

  render() {
    const { align, basis, children, className, grow, order, shrink, style } =
      this.props;
    const dataTestId = this.props["data-testid"];

    const flexLayoutItemProps = FlexLayoutItem.flexLayoutItem({
      align,
      basis,
      grow,
      order,
      shrink,
      className,
      style,
    });

    return (
      <div {...flexLayoutItemProps} data-testid={void 0}>
        {children}
      </div>
    );
  }

  static flexLayoutItem({
    align,
    basis,
    className,
    grow,
    order,
    shrink,
    style,
  }: FlexLayoutItemProps) {
    if (order === undefined) {
      order = FlexLayoutItem.defaultProps.order;
    }
    if (grow === undefined) {
      grow = FlexLayoutItem.defaultProps.grow;
    }
    if (shrink === undefined) {
      shrink = FlexLayoutItem.defaultProps.shrink;
    }
    if (basis === undefined) {
      basis = FlexLayoutItem.defaultProps.basis;
    }
    if (align === undefined) {
      align = FlexLayoutItem.defaultProps.align;
    }

    const classNames = joinClasses(
      (align === "auto" ? "_6g3g" : "") +
        (align === "start" ? " _6g3m" : "") +
        (align === "center" ? " _6g3n" : "") +
        (align === "end" ? " _6g3v" : "") +
        (align === "stretch" ? " _6g3w" : ""),
      className
    );

    return {
      className: classNames,
      style: {
        ...style,
        flexBasis: basis,
        flexGrow: grow,
        flexShrink: shrink,
        order,
      },
    };
  }
}

export default FlexLayoutItem;
