/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useContext } from "react";
// import BizKitHelpTraySideBarChatButton from "BizKitHelpTraySideBarChatButton.react";
import {
  getButtonActiveStyle,
  getButtonHoverStyle,
  getButtonNormalStyle,
} from "BizKitSideBarButtonStyles.react";
import BizKitSidebarItem from "BizKitSidebarItem.react";
// import BusinessCometHelpTraySideBarChatButton from "BusinessCometHelpTraySideBarChatButton.react";
// import CometPlaceholder from "CometPlaceholder.react";
import { fbt } from "fbt";
import GeoFlexbox from "GeoFlexbox.react";
import Image from "Image.react";
import { ix as iconSrc } from "ix";

import useHoverState from "../../hooks/useHoverState";
import AbstractSidebarNavigationDisplayContext from "../contexts/AbstractSidebarNavigationDisplayContext";

import { HELP as HELP_LABEL } from "./BizKitStrings";

const styles = {
  collapsed: {
    borderTopStartRadius: "x10vuhgg",
    borderTopEndRadius: "x1883u4",
    borderBottomEndRadius: "xr1wzlq",
    borderBottomStartRadius: "xb8s3i7",
    overflowX: "x6ikm8r",
    overflowY: "x10wlt62",
    width: "x1guw455",
    flexDirection: "xdt5ytf",
    flexGrow: "x1iyjqo2",
    paddingTop: "xexx8yu",
    paddingEnd: "x4uap5",
    paddingBottom: "x18d9i69",
    paddingStart: "xkhd6sd",
    marginTop: "x1gslohp",
    $$css: true,
  },
  expanded: {
    borderTopStartRadius: "xhk9q7s",
    borderTopEndRadius: "x1otrzb0",
    borderBottomEndRadius: "x1i1ezom",
    borderBottomStartRadius: "x1o6z2jb",
    overflowX: "x6ikm8r",
    overflowY: "x10wlt62",
    flexDirection: "xdt5ytf",
    flexGrow: "x1iyjqo2",
    paddingTop: "xexx8yu",
    paddingEnd: "x4uap5",
    paddingBottom: "x18d9i69",
    paddingStart: "xkhd6sd",
    marginTop: "x1gslohp",
    $$css: true,
  },
  normalBg: { paddingTop: "xcxk34k", $$css: true },
};

const BizKitHelpTraySideBarButton = ({
  // businessCometHelpTraySideBarChatButtonQueryReference,
  buttonRef,
  isOpen,
  onclick,
}) => {
  const { isCollapsed } = useContext(AbstractSidebarNavigationDisplayContext);
  const { isHovered, onMouseEnter, onMouseLeave } = useHoverState();
  const helpLabel = fbt._("Help");
  const helpIcon = <Image src={iconSrc("371500")} />;

  return (
    <GeoFlexbox
      xstyle={[
        isCollapsed ? styles.collapsed : styles.expanded,
        styles.normalBg,
      ]}
      data-testid={undefined}
    >
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="x1rdy4ex"
      >
        <BizKitSidebarItem
          icon={helpIcon}
          iconActive={helpIcon}
          isFirst={false}
          onActivate={onclick}
          label={helpLabel}
          ref={buttonRef}
          value={HELP_LABEL}
          backgroundStyle={
            isOpen
              ? getButtonActiveStyle()
              : isHovered
              ? getButtonHoverStyle()
              : getButtonNormalStyle()
          }
        />
      </div>
      {/* <CometPlaceholder fallback={null}>
        {businessCometHelpTraySideBarChatButtonQueryReference != null ? (
          <BusinessCometHelpTraySideBarChatButton
            businessCometHelpTraySideBarChatButtonQueryReference={
              businessCometHelpTraySideBarChatButtonQueryReference
            }
          />
        ) : (
          <BizKitHelpTraySideBarChatButton />
        )}
      </CometPlaceholder> */}
    </GeoFlexbox>
  );
};

BizKitHelpTraySideBarButton.displayName = `${BizKitHelpTraySideBarButton.name}`;

export default BizKitHelpTraySideBarButton;
