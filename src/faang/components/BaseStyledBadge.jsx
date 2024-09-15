/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import BaseBadge from "./BaseBadge";

const sizeStyles = {
  6: { height: "xols6we", width: "x1v4s8kt",  },
  7: { height: "x1hagigm", width: "xci0xqf",  },
  8: { height: "xdk7pt", width: "x1xc55vz",  },
  9: { height: "xegnrdp", width: "x1wc42o8",  },
  10: { height: "x170jfvy", width: "x1fsd2vl",  },
  12: { height: "x1kpxq89", width: "xsmyaan",  },
  14: { height: "x1v9usgg", width: "x6jxa94",  },
  15: { height: "xx3o462", width: "x1a00udw",  },
  18: { height: "xmix8c7", width: "x1xp8n7a",  },
  20: { height: "x1qx5ct2", width: "xw4jnvo",  },
  22: { height: "x17rw0jw", width: "x17z2i9w",  },
  24: { height: "xxk0z11", width: "xvy4d1p",  },
  32: { height: "x10w6t97", width: "x1td3qas",  },
  41: { height: "x1njhlm6", width: "x1r9kitl",  },
};

const borderStyles = {
  6: {
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "x5see2y",
    borderEndWidth: "x8ebbdf",
    borderBottomWidth: "x1pzews7",
    borderStartWidth: "x1r61nuk",
    height: "xegnrdp",
    width: "x1wc42o8",
    ,
  },
  7: {
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "xamhcws",
    borderEndWidth: "xol2nv",
    borderBottomWidth: "xlxy82",
    borderStartWidth: "x19p7ews",
    height: "x6w4g8m",
    width: "x10vfzb2",
    ,
  },
  8: {
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "xamhcws",
    borderEndWidth: "xol2nv",
    borderBottomWidth: "xlxy82",
    borderStartWidth: "x19p7ews",
    height: "x1kpxq89",
    width: "xsmyaan",
    ,
  },
  9: {
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "xamhcws",
    borderEndWidth: "xol2nv",
    borderBottomWidth: "xlxy82",
    borderStartWidth: "x19p7ews",
    height: "x18gnavp",
    width: "x1fxhmyf",
    ,
  },
  10: {
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "xamhcws",
    borderEndWidth: "xol2nv",
    borderBottomWidth: "xlxy82",
    borderStartWidth: "x19p7ews",
    height: "x1v9usgg",
    width: "x6jxa94",
    ,
  },
  12: {
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "xamhcws",
    borderEndWidth: "xol2nv",
    borderBottomWidth: "xlxy82",
    borderStartWidth: "x19p7ews",
    height: "xlup9mm",
    width: "x1kky2od",
    ,
  },
  14: {
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "xamhcws",
    borderEndWidth: "xol2nv",
    borderBottomWidth: "xlxy82",
    borderStartWidth: "x19p7ews",
    height: "xmix8c7",
    width: "x1xp8n7a",
    ,
  },
  15: {
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "xamhcws",
    borderEndWidth: "xol2nv",
    borderBottomWidth: "xlxy82",
    borderStartWidth: "x19p7ews",
    height: "xhvdbge",
    width: "xn6xy2s",
    ,
  },
  18: {
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "xamhcws",
    borderEndWidth: "xol2nv",
    borderBottomWidth: "xlxy82",
    borderStartWidth: "x19p7ews",
    height: "x17rw0jw",
    width: "x17z2i9w",
    ,
  },
  20: {
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "x1gp4ovq",
    borderEndWidth: "xdio9jc",
    borderBottomWidth: "x1h2mt7u",
    borderStartWidth: "x7g060r",
    height: "x1fgtraw",
    width: "xgd8bvy",
    ,
  },
  22: {
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "x1gp4ovq",
    borderEndWidth: "xdio9jc",
    borderBottomWidth: "x1h2mt7u",
    borderStartWidth: "x7g060r",
    height: "x1gnnpzl",
    width: "x1849jeq",
    ,
  },
  24: {
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "x1gp4ovq",
    borderEndWidth: "xdio9jc",
    borderBottomWidth: "x1h2mt7u",
    borderStartWidth: "x7g060r",
    height: "x10w6t97",
    width: "x1td3qas",
    ,
  },
  32: {
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "x1gp4ovq",
    borderEndWidth: "xdio9jc",
    borderBottomWidth: "x1h2mt7u",
    borderStartWidth: "x7g060r",
    height: "x1vqgdyp",
    width: "x100vrsf",
    ,
  },
  41: {
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "x1gp4ovq",
    borderEndWidth: "xdio9jc",
    borderBottomWidth: "x1h2mt7u",
    borderStartWidth: "x7g060r",
    height: "x112a4uq",
    width: "x15jighw",
    ,
  },
};

const BaseStyledBadge = ({
  border = false,
  colorXStyle,
  size = 8,
  xstyle,
  children,
  ...props
}) => {
  return (
    <BaseBadge
      {...props}
      xstyle={[
        colorXStyle,
        border ? borderStyles[size] : sizeStyles[size],
        xstyle,
      ]}
    >
      {children}
    </BaseBadge>
  );
};

BaseStyledBadge.displayName = `${BaseStyledBadge.name} [from ${module.id}]`;

export default BaseStyledBadge;
