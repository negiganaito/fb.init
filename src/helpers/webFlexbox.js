/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const alignContentStyles = {
  center: { alignContent: "xc26acl" },
  end: { alignContent: "xnwe2h8" },
  "space-around": { alignContent: "x1jpljmv" },
  "space-between": { alignContent: "xcdzlcm" },
  start: { alignContent: "x8gbvx8" },
  stretch: { alignContent: "xqjyukv" },
};

const alignItemsStyles = {
  baseline: { alignItems: "x1pha0wt" },
  center: { alignItems: "x6s0dn4" },
  end: { alignItems: "xuk3077" },
  start: { alignItems: "x1cy8zhl" },
  stretch: { alignItems: "x1qjc9v5" },
};

const flexDirectionStyles = {
  column: { flexDirection: "xdt5ytf" },
  "column-reverse": { flexDirection: "x3ieub6" },
  row: { flexDirection: "x1q0g3np" },
  "row-reverse": { flexDirection: "x15zctf7" },
};

const displayStyles = {
  flex: { display: "x78zum5" },
  "inline-flex": { display: 0 },
};

const columnGapStyles = {
  0: { columnGap: "x1o1pmfc" },
  4: { columnGap: "x17zd0t2" },
  8: { columnGap: "xfex06f" },
  12: { columnGap: "xtqikln" },
  16: { columnGap: "x40hh3e" },
  20: { columnGap: "x18hwk67" },
  24: { columnGap: "x1qgv0r9" },
};

const rowGapStyles = {
  0: { rowGap: "xxs79tx" },
  4: { rowGap: "x1r0jzty" },
  8: { rowGap: "x3pnbk8" },
  12: { rowGap: "xp1r0qw" },
  16: { rowGap: "xgpatz3" },
  20: { rowGap: "x1kb72lq" },
  24: { rowGap: "x1na6gtj" },
};

const justifyContentStyles = {
  center: { justifyContent: "xl56j7k" },
  end: { justifyContent: "x13a6bvl" },
  "space-around": { justifyContent: "x1l1ennw" },
  "space-between": { justifyContent: "x1qughib" },
  "space-evenly": { justifyContent: "xaw8158" },
  start: { justifyContent: "x1nhvcw1" },
};

const flexWrapStyles = {
  nowrap: { flexWrap: "xozqiw3" },
  wrap: { flexWrap: "x1a02dak" },
  "wrap-reverse": { flexWrap: "x8hhl5t" },
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
