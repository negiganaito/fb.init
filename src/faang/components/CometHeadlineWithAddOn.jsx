/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from "react";

import Locale from "../../helpers/Locale";

import BaseRow from "./BaseRow";
import BaseRowItem from "./BaseRowItem";
import FDSText from "./FDSText";

const styles = {
  addOn: {
    display: "x78zum5",
    flexDirection: "xdt5ytf",
    justifyContent: "xl56j7k",
    marginStart: "x1i64zmx",
    marginLeft: null,
    marginRight: null,
  },
  nonBreakingSpace: {
    visibility: "xlshs6z",
    width: "xnalus7",
  },
};

const directionStyles = {
  ltr: { direction: "xzt5al7" },
  rtl: { direction: "xzyj77d" },
};

const CometHeadlineWithAddOn = forwardRef((props, ref) => {
  const {
    headlineRef,
    addOn,
    children,
    color,
    id,
    isPrimaryHeading,
    isSemanticHeading,
    numberOfLines,
    truncationTooltip,
    type,
    ...rest
  } = props;

  return (
    <FDSText isSemanticHeading={false} ref={ref} type={type} {...rest}>
      <BaseRow
        verticalAlign="center"
        xstyle={directionStyles[Locale.isRTL() ? "rtl" : "ltr"]}
      >
        <BaseRowItem expanding={true}>
          <FDSText
            color={color}
            id={id}
            isPrimaryHeading={isPrimaryHeading}
            isSemanticHeading={isSemanticHeading}
            numberOfLines={numberOfLines}
            ref={headlineRef}
            truncationTooltip={truncationTooltip}
            type={type}
          >
            {children}
          </FDSText>
        </BaseRowItem>
        <BaseRowItem verticalAlign="top" xstyle={styles.addOn}>
          <BaseRow verticalAlign="center">
            <BaseRowItem xstyle={styles.nonBreakingSpace}>&nbsp;</BaseRowItem>
            <BaseRowItem>
              <BaseRow>{addOn}</BaseRow>
            </BaseRowItem>
          </BaseRow>
        </BaseRowItem>
      </BaseRow>
    </FDSText>
  );
});

CometHeadlineWithAddOn.displayName = `${CometHeadlineWithAddOn.name} [from ${module.id}]`;

export default CometHeadlineWithAddOn;
