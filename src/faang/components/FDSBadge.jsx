/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import BaseStyledBadge from "./BaseStyledBadge";
import getFDSBadgeColorStyle from "./getFDSBadgeColorStyle";

const styles = {
  borderDark: {
    borderTopColor: "x1o7swki",
    borderEndColor: "xp7cj6j",
    borderBottomColor: "x1bkzgmd",
    borderStartColor: "xl02xpf",
    ,
  },
  borderWhite: {
    borderTopColor: "x6zyg47",
    borderEndColor: "x1xm1mqw",
    borderBottomColor: "xpn8fn3",
    borderStartColor: "xtct9fg",
    ,
  },
  isNoneProfileBadge: {
    marginEnd: "x1emribx",
    ,
  },
};

const wideStyles = {
  6: { marginStart: "x1w4ip6v", width: "x1wc42o8",  },
  7: { marginStart: "x1b2warb", width: "xaw7vzs",  },
  8: { marginStart: "xsgj6o6", width: "xsmyaan",  },
  9: { marginStart: "x1hvlnb8", width: "x197psvt",  },
  10: { marginStart: "x8j4wrb", width: "x1a00udw",  },
  12: { marginStart: "x1mnrxsn", width: "x1xp8n7a",  },
  14: { marginStart: "xnfveip", width: "x1kl0l3y",  },
  15: { marginStart: "xpw6ms", width: "xpcibvc",  },
  18: { marginStart: "x1cxxrxm", width: "xo7uitg",  },
  20: { marginStart: "x17adc0v", width: "x1849jeq",  },
  22: { marginStart: "x1hy63sm", width: "x1npj6m0",  },
  24: { marginStart: "x16n37ib", width: "x14qfxbe",  },
  32: { marginStart: "x1d52u69", width: "x1useyqa",  },
  41: { marginStart: "x1v860g0", width: "x1yaf2ey",  },
};

const extraWideStyles = {
  6: { marginStart: "x1mnrxsn", width: "xsmyaan",  },
  7: { marginStart: "xnfveip", width: "x6jxa94",  },
  8: { marginStart: "x1i64zmx", width: "x1kky2od",  },
  9: { marginStart: "x1cxxrxm", width: "x1xp8n7a",  },
  10: { marginStart: "x17adc0v", width: "xw4jnvo",  },
  12: { marginStart: "x16n37ib", width: "xvy4d1p",  },
  14: { marginStart: "xwycmqc", width: "xgd8bvy",  },
  15: { marginStart: "x13ibhcj", width: "x1849jeq",  },
  18: { marginStart: "x1sliqq", width: "x14qfxbe",  },
  20: { marginStart: "xmn8rco", width: "x100vrsf",  },
  22: { marginStart: "x1tv9t25", width: "x187nhsf",  },
  24: { marginStart: "xmupa6y", width: "x1useyqa",  },
  32: { marginStart: "x8vdgqj", width: "x1fu8urw",  },
  41: { marginStart: "x2vb376", width: "x1pigqs1",  },
};

const FDSBadge = ({
  border = "none",
  color = "blue",
  colorOverride,
  isProfileBadge = false,
  wide = "normal",
  children,
  size = 8,
  ...props
}) => {
  return (
    <BaseStyledBadge
      {...props}
      border={border !== "none"}
      colorXStyle={colorOverride ?? getFDSBadgeColorStyle(color)}
      size={size}
      xstyle={[
        !isProfileBadge && styles.isNoneProfileBadge,
        border === "white" && styles.borderWhite,
        border === "dark" && styles.borderDark,
        wide === "wide" && wideStyles[size],
        wide === "extraWide" && extraWideStyles[size],
      ]}
    >
      {children}
    </BaseStyledBadge>
  );
};

FDSBadge.displayName = `${FDSBadge.name} [from ${module.id}]`;

export default FDSBadge;
