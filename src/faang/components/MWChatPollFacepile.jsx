/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import stylex from "@stylexjs/stylex";
import fbt from "fbt";

import { fbicon } from "../../helpers/fbicon";
import intlList from "../../helpers/intlList";
import intlSummarizeNumber from "../../helpers/intlSummarizeNumber";

import CometImage from "./CometImage.react";
import FDSTintedIcon from "./FDSTintedIcon";
import MWXPressable from "./MWXPressable";
import MWXTooltip from "./MWXTooltip";
import MWXTooltipGroup from "./MWXTooltipGroup";

const styles = {
  contact: {
    borderTopStartRadius: "x14yjl9h",
    borderTopEndRadius: "xudhj91",
    borderBottomEndRadius: "x18nykt9",
    borderBottomStartRadius: "xww2gxu",
    ,
  },
  contactGapNegative: {
    marginStart: "xrzrlj5",
    ,
  },
  contactGapNormal: {
    marginStart: "xsgj6o6",
    ,
  },
  contactLarge: {
    height: "x10w6t97",
    width: "x1td3qas",
    ,
  },
  contactMedium: {
    height: "x1qx5ct2",
    width: "xw4jnvo",
    ,
  },
  contactMediumLarge: {
    height: "xxk0z11",
    width: "xvy4d1p",
    ,
  },
  contactSmall: {
    height: "x1v9usgg",
    width: "x6jxa94",
    ,
  },
  contactWithBorder: {
    borderTopColor: "x1exxf4d",
    borderEndColor: "x1y71gwh",
    borderBottomColor: "x1nb4dca",
    borderStartColor: "xu1343h",
    borderTopStyle: "x13fuv20",
    borderEndStyle: "xu3j5b3",
    borderBottomStyle: "x1q0q8m5",
    borderStartStyle: "x26u7qi",
    borderTopWidth: "x178xt8z",
    borderEndWidth: "xm81vs4",
    borderBottomWidth: "xso031l",
    borderStartWidth: "xy80clv",
    marginTop: "x1y332i5",
    ,
  },
  photoWrap: {
    display: "x1rg5ohu",
    marginBottom: "x4ii5y1",
    marginTop: "xr1yuqi",
    position: "relative",
    ,
  },
  root: {
    display: "x78zum5",
    ,
  },
  rootReversed: {
    flexDirection: "x15zctf7",
    ,
  },
};

function getSizeStyle(size) {
  switch (size) {
    case "small":
      return styles.contactSmall;
    case "medium":
      return styles.contactMedium;
    case "mediumLarge":
      return styles.contactMediumLarge;
    case "large":
      return styles.contactLarge;
    default:
      return null;
  }
}

function TooltipWrapper({ children, tooltip }) {
  return tooltip !== null ? (
    <MWXTooltip
      align="middle"
      label={fbt("__JHASH__kWn4paD6Vaw__JHASH__")}
      position="above"
      tooltip={tooltip}
    >
      {children}
    </MWXTooltip>
  ) : (
    children
  );
}

TooltipWrapper.displayName = `${TooltipWrapper.name} [from ${module.id}]`;

function MWChatPollFacepile({
  contacts,
  contactWithBorder = true,
  countOverride,
  direction = "normal",
  gap = "normal",
  limit = 2,
  onPress,
  overflowStyle = "showTotalCount",
  size,
}) {
  const hasOverflow = contacts.length > limit;
  const visibleContacts = hasOverflow ? limit : contacts.length;
  const tooltipContacts = contacts
    .slice(0, -limit)
    .reverse()
    .filter((contact) => contact.name !== null);
  const tooltipText = tooltipContacts.length
    ? tooltipContacts.map((contact) => contact.name).join(", ")
    : null;

  const overflowTooltip = tooltipText
    ? fbt("__JHASH__KVtJcih6CQz__JHASH__", [tooltipText])
    : null;

  const contactsToShow = contacts.slice(-visibleContacts).reverse();
  const tooltip = contacts.length
    ? fbt("__JHASH__txKVTNOBaVY__JHASH__", [
        intlSummarizeNumber(contacts.length),
        intlList(contactsToShow.map((contact) => contact.name)),
      ])
    : fbt("__JHASH__S_P0VuqDnbo__JHASH__");

  const facepile = (
    <MWXTooltipGroup>
      {hasOverflow && overflowStyle === "showTotalCount" && (
        <TooltipWrapper tooltip={overflowTooltip}>
          <div className="x1vtvx1t x1a2cdl4 xnhgr82 x1qt0ttw xgk8upj x9f619 xi81zsa x1nxh6w3 xk50ysn x1qx5ct2 x1u7k74 x4ii5y1 xrzrlj5 xr1yuqi x1nn3v0j x1sxyh0 x1120s5i xurb0ha">
            {"+" + intlSummarizeNumber(contacts.length - limit)}
          </div>
        </TooltipWrapper>
      )}
      {contactsToShow.map((contact, index) => (
        <div
          key={index}
          className={stylex(
            styles.photoWrap,
            gap === "normal"
              ? styles.contactGapNormal
              : styles.contactGapNegative,
            getSizeStyle(size)
          )}
        >
          <TooltipWrapper tooltip={contact.name}>
            <CometImage
              src={contact.profile_picture_url}
              xstyle={[
                styles.contact,
                getSizeStyle(size),
                contactWithBorder && styles.contactWithBorder,
              ]}
            />
          </TooltipWrapper>
          {hasOverflow &&
            overflowStyle === "overlayLastPhoto" &&
            index === limit - 1 && (
              <div className="x6s0dn4 xdit8p8 x14yjl9h xudhj91 x18nykt9 xww2gxu x1ey2m1c x78zum5 xds687c xl56j7k x1us6l5c x6ikm8r x10wlt62 x10l6tqk x17qophe x13vifvy x1vjfegm">
                <FDSTintedIcon color="white" icon={fbicon._("484386", 16)} />
              </div>
            )}
        </div>
      ))}
    </MWXTooltipGroup>
  );

  return onPress ? (
    <MWXPressable
      label={tooltip}
      onPress={onPress}
      overlayDisabled
      xstyle={[styles.root, direction === "reversed" && styles.rootReversed]}
    >
      {facepile}
    </MWXPressable>
  ) : (
    <div
      aria-label={tooltip}
      className={stylex(
        styles.root,
        direction === "reversed" && styles.rootReversed
      )}
    >
      {facepile}
    </div>
  );
}

MWChatPollFacepile.displayName = `${MWChatPollFacepile.name} [from ${module.id}]`;

export default MWChatPollFacepile;
