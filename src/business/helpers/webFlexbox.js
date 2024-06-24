/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const alignContentStyles = {
  center: { alignContent: "xc26acl", $$css: true },
  end: { alignContent: "xnwe2h8", $$css: true },
  "space-around": { alignContent: "x1jpljmv", $$css: true },
  "space-between": { alignContent: "xcdzlcm", $$css: true },
  start: { alignContent: "x8gbvx8", $$css: true },
  stretch: { alignContent: "xqjyukv", $$css: true },
};

const alignItemsStyles = {
  baseline: { alignItems: "x1pha0wt", $$css: true },
  center: { alignItems: "x6s0dn4", $$css: true },
  end: { alignItems: "xuk3077", $$css: true },
  start: { alignItems: "x1cy8zhl", $$css: true },
  stretch: { alignItems: "x1qjc9v5", $$css: true },
};

const flexDirectionStyles = {
  column: { flexDirection: "xdt5ytf", $$css: true },
  "column-reverse": { flexDirection: "x3ieub6", $$css: true },
  row: { flexDirection: "x1q0g3np", $$css: true },
  "row-reverse": { flexDirection: "x15zctf7", $$css: true },
};

const displayStyles = {
  flex: { display: "x78zum5", $$css: true },
  "inline-flex": { display: "x3nfvp2", $$css: true },
};

const columnGapStyles = {
  0: { columnGap: "x1o1pmfc", $$css: true },
  4: { columnGap: "x17zd0t2", $$css: true },
  8: { columnGap: "xfex06f", $$css: true },
  12: { columnGap: "xtqikln", $$css: true },
  16: { columnGap: "x40hh3e", $$css: true },
  20: { columnGap: "x18hwk67", $$css: true },
  24: { columnGap: "x1qgv0r9", $$css: true },
};

const rowGapStyles = {
  0: { rowGap: "xxs79tx", $$css: true },
  4: { rowGap: "x1r0jzty", $$css: true },
  8: { rowGap: "x3pnbk8", $$css: true },
  12: { rowGap: "xp1r0qw", $$css: true },
  16: { rowGap: "xgpatz3", $$css: true },
  20: { rowGap: "x1kb72lq", $$css: true },
  24: { rowGap: "x1na6gtj", $$css: true },
};

const justifyContentStyles = {
  center: { justifyContent: "xl56j7k", $$css: true },
  end: { justifyContent: "x13a6bvl", $$css: true },
  "space-around": { justifyContent: "x1l1ennw", $$css: true },
  "space-between": { justifyContent: "x1qughib", $$css: true },
  "space-evenly": { justifyContent: "xaw8158", $$css: true },
  start: { justifyContent: "x1nhvcw1", $$css: true },
};

const flexWrapStyles = {
  nowrap: { flexWrap: "xozqiw3", $$css: true },
  wrap: { flexWrap: "x1a02dak", $$css: true },
  "wrap-reverse": { flexWrap: "x8hhl5t", $$css: true },
};

function webFlexbox({
  alignContent,
  alignItems,
  display = "flex",
  direction,
  justifyContent,
  gap,
  columnGap,
  rowGap,
  wrap,
}) {
  columnGap = columnGap ?? gap;
  rowGap = rowGap ?? gap;

  return [
    alignContent && alignContentStyles[alignContent],
    alignItems && alignItemsStyles[alignItems],
    displayStyles[display],
    direction && flexDirectionStyles[direction],
    justifyContent && justifyContentStyles[justifyContent],
    columnGap !== null && columnGapStyles[columnGap],
    rowGap !== null && rowGapStyles[rowGap],
    wrap && flexWrapStyles[wrap],
  ];
}

export default webFlexbox;
