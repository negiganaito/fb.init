/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";
import { html } from "react-strict-dom";

import { getBadgePosition } from "../../helpers/profilePhotoUtils";

import FDSIcon from "./FDSIcon";

const styles = {
  circle: {
    borderTopStartRadius: "x14yjl9h",
    borderTopEndRadius: "xudhj91",
    borderBottomEndRadius: "x18nykt9",
    borderBottomStartRadius: "xww2gxu",
    ,
  },
  iconBadge: {
    alignItems: "x6s0dn4",
    backgroundColor: "xwnonoy",
    borderTopColor: "x6zyg47",
    borderEndColor: "x1xm1mqw",
    borderBottomColor: "xpn8fn3",
    borderStartColor: "xtct9fg",
    borderTopStartRadius: "x14yjl9h",
    borderTopEndRadius: "xudhj91",
    borderBottomEndRadius: "x18nykt9",
    borderBottomStartRadius: "xww2gxu",
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "xamhcws",
    borderEndWidth: "xol2nv",
    borderBottomWidth: "xlxy82",
    borderStartWidth: "x19p7ews",
    display: "x78zum5",
    justifyContent: "xl56j7k",
    overflowX: "x6ikm8r",
    overflowY: "x10wlt62",
    paddingTop: "x1nn3v0j",
    paddingEnd: "xg83lxy",
    paddingBottom: "x1120s5i",
    paddingStart: "x1h0ha7o",
    position: "x10l6tqk",
    ,
  },
  roundedRect: {
    borderTopStartRadius: "x1lq5wgf",
    borderTopEndRadius: "xgqcy7u",
    borderBottomEndRadius: "x30kzoy",
    borderBottomStartRadius: "x9jhf4c",
    ,
  },
  skittle: {
    alignItems: "x6s0dn4",
    borderTopWidth: "x972fbf",
    borderEndWidth: 0,
    borderBottomWidth: 0,
    borderStartWidth: 0,
    boxSizing: "x9f619",
    display: 0,
    justifyContent: "xl56j7k",
    position: "relative",
    ,
  },
};

const colors = {
  accent: { backgroundColor: "xwnonoy",  },
  blue: { backgroundColor: "x11goek",  },
  cherry: { backgroundColor: "x1tzrqqp",  },
  grape: { backgroundColor: "x17f3y5z",  },
  gray: { backgroundColor: "x1qhmfi1",  },
  green: { backgroundColor: "xv9rvxn",  },
  lemon: { backgroundColor: "xacajkf",  },
  lightblue: { backgroundColor: "x1hr4nm9",  },
  lime: { backgroundColor: "xbmc1ew",  },
  pink: { backgroundColor: "x1qrsksh",  },
  red: { backgroundColor: "x1ciooss",  },
  seafoam: { backgroundColor: "x1tw9p8u",  },
  teal: { backgroundColor: "x1emf0wh",  },
  tomato: { backgroundColor: "xqjkjv5",  },
  white: { backgroundColor: "x14hiurz",  },
};

const sizes = {
  32: { height: "x10w6t97", width: "x1td3qas",  },
  36: { height: "xc9qbxq", width: "x14qfxbe",  },
  40: { height: "x1vqgdyp", width: "x100vrsf",  },
  48: { height: "xsdox4t", width: "x1useyqa",  },
  56: { height: "xnnlda6", width: "x15yg21f",  },
  60: { height: "xng8ra", width: "x1247r65",  },
};

const iconSizes = {
  24: 16,
  36: 20,
  40: 24,
  48: 24,
  56: 24,
  60: 24,
};

const getColor = (color) => {
  switch (color) {
    case "gray":
    case "white":
      return "primary";
    case "lightblue":
      return "highlight";
    default:
      return "white";
  }
};

const FDSSkittleIcon = forwardRef((props, ref) => {
  const {
    color,
    disabled = false,
    icon,
    iconBadge,
    iconBadgeAria,
    shape = "circle",
    size,
    ...rest
  } = props;

  const isDecorative =
    props["aria-label"] === null && props["aria-labelledby"] === null;
  const isIconBadgeDecorative =
    iconBadgeAria?.["aria-label"] === null &&
    iconBadgeAria?.["aria-labelledby"] === null;

  return (
    <html.div
      ref={ref}
      style={[
        shape === "circle" && styles.circle,
        shape === "roundedRect" && styles.roundedRect,
        styles.skittle,
        colors[color],
        sizes[size],
      ]}
    >
      <FDSIcon
        {...(isDecorative ? { isDecorative } : rest)}
        color={disabled ? "disabled" : getColor(color)}
        icon={icon}
        size={iconSizes[size]}
      />
      {iconBadge !== null && (
        <html.div style={[styles.iconBadge, getBadgePosition(size / 2)]}>
          <FDSIcon
            {...(isIconBadgeDecorative
              ? { isDecorative: isIconBadgeDecorative }
              : iconBadgeAria)}
            color="white"
            icon={iconBadge}
            size={8}
          />
        </html.div>
      )}
    </html.div>
  );
});

FDSSkittleIcon.displayName = `${FDSSkittleIcon.name} [from ${module.id}]`;

export default FDSSkittleIcon;
