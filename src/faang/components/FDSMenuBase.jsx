/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { Children, useContext } from "react";
import { html } from "react-strict-dom";
import FDSMenuHeaderListCell from "FDSMenuHeaderListCell.react";
import FDSMenuItemBaseRoleContext from "FDSMenuItemBaseRoleContext";

import BaseContextualLayerAvailableHeightContext from "../../context/BaseContextualLayerAvailableHeightContext";
import BasePopoverReflowSheetContext from "../../context/BasePopoverReflowSheetContext";

import BaseScrollableArea from "./BaseScrollableArea";
import CometErrorBoundary from "./CometErrorBoundary";
import FDSMenuFocusRegion from "./FDSMenuFocusRegion";
import FDSSeparatorMenuItem from "./FDSSeparatorMenuItem";
import FDSTextPairing from "./FDSTextPairing";

const styles = {
  listItem: {
    borderTopStartRadius: "x1lcm9me",
    borderTopEndRadius: "x1yr5g0i",
    borderBottomEndRadius: "xrt01vj",
    borderBottomStartRadius: "x10y3i5r",
    display: "x78zum5",
    flexDirection: "x1q0g3np",
    marginStart: "x1i64zmx",
    marginLeft: null,
    marginRight: null,
    marginEnd: "x1emribx",
    paddingTop: "x12j3hk6",
    paddingBottom: "x11d8vdq",
    paddingStart: "x9wwqvz",
    paddingLeft: null,
    paddingRight: null,
    paddingEnd: "xev2ry7",
    ,
  },
  maxHeight: (a) => [
    { maxHeight: "xqvb90d",  },
    {
      "--maxHeight":
        typeof a === "number" ? `${a}px` : a !== null ? a : "initial",
    },
  ],
  root: {
    boxSizing: "x9f619",
    display: "x78zum5",
    flexDirection: "xdt5ytf",
    paddingTop: "x1ten1a2",
    paddingBottom: "xz7cn9q",
    paddingStart: 0,
    paddingLeft: null,
    paddingRight: null,
    paddingEnd: 0,
    ,
  },
  sizeFull: {
    marginEnd: "x2xt60n",
    marginLeft: null,
    marginRight: null,
    width: "xh8yej3",
    ,
  },
  sizeNormal: {
    width: "x168biu4",
    ,
  },
  sizeSmall: {
    width: "xi55695",
    ,
  },
};

const roleMap = {
  listbox: "option",
  menu: "menuitem",
};

const FDSMenuBase = (props) => {
  const {
    // "aria-label": ariaLabel,
    // "aria-labelledby": ariaLabelledby,
    // arrowAlignment,
    children,
    footer,
    header,
    // id,
    maxHeight,
    // onClose,
    role = "menu",
    size = "normal",
    // testid,
    // withArrow,
  } = props;

  const isReflowSheet = useContext(BasePopoverReflowSheetContext).isReflowSheet;
  const availableHeight = useContext(BaseContextualLayerAvailableHeightContext);
  const calculatedMaxHeight = isReflowSheet
    ? availableHeight !== null
      ? availableHeight
      : 0
    : maxHeight;
  const items = Children.toArray(children).map((child, index) =>
    child === null ? null : (
      <CometErrorBoundary key={index}>{child}</CometErrorBoundary>
    )
  );
  const roleValue = roleMap[role];

  return Children.count(children) > 0 ? (
    <BaseScrollableArea
      horizontal={false}
      style={
        calculatedMaxHeight !== null
          ? { maxHeight: Math.max(calculatedMaxHeight, 145) }
          : undefined
      }
      vertical={true}
      xstyle={[
        styles.root,
        size === "full" && styles.sizeFull,
        size === "normal" && styles.sizeNormal,
        size === "small" && styles.sizeSmall,
        calculatedMaxHeight !== null &&
          styles.maxHeight(Math.max(calculatedMaxHeight, 145)),
      ]}
    >
      <FDSMenuItemBaseRoleContext.Provider value={roleValue}>
        {header !== null ? (
          <>
            {header.onPressBack !== null ? (
              <FDSMenuHeaderListCell {...header} />
            ) : (
              <html.div style={styles.listItem}>
                <FDSTextPairing
                  body={header.body}
                  headline={header.title}
                  isSemanticHeading={true}
                  level={3}
                  meta={header.meta}
                  reduceEmphasis={true}
                />
              </html.div>
            )}
            <FDSSeparatorMenuItem />
          </>
        ) : null}
        <FDSMenuFocusRegion items={items} role={role} />
        {footer !== null ? (
          <>
            <FDSSeparatorMenuItem />
            <html.div style={styles.listItem}>
              <FDSTextPairing level={3} meta={footer.text} />
            </html.div>
          </>
        ) : null}
      </FDSMenuItemBaseRoleContext.Provider>
    </BaseScrollableArea>
  ) : null;
};

FDSMenuBase.displayName = `${FDSMenuBase.name} [from FDSMenuBase.react]`;

export default FDSMenuBase;
