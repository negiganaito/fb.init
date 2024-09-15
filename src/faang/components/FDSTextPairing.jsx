/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import getFDSTextHierarchyStyle from "../../helpers/getFDSTextHierarchyStyle";
import stylex from "../../helpers/stylex";

import CometHeadlineWithAddOn from "./CometHeadlineWithAddOn";
import FDSText from "./FDSText";

const styles = {
  item: { marginBottom: "xu06os2", marginTop: "x1ok221b",  },
  root: {
    display: "x78zum5",
    flexDirection: "xdt5ytf",
    marginBottom: "xz62fqu",
    marginTop: "x16ldp7u",
    ,
  },
};

const levelStyles = {
  1: { marginBottom: "x11tup63", marginTop: "x16z1lm9",  },
  2: { marginBottom: "x4cne27", marginTop: "xifccgj",  },
  3: {  },
  4: {  },
  entityHeader1: {
    marginBottom: "x1wsgfga",
    marginTop: "x9otpla",
    ,
  },
  entityHeader2: {
    marginBottom: "x1wsgfga",
    marginTop: "x9otpla",
    ,
  },
};

const emphasisStyles = {
  1: { marginBottom: "xwoyzhm", marginTop: "x1rhet7l",  },
  2: { marginBottom: "xzueoph", marginTop: "x1k70j0n",  },
  3: {  },
  4: {  },
  entityHeader1: {
    marginBottom: "x1e56ztr",
    marginTop: "x1xmf6yo",
    ,
  },
  entityHeader2: {
    marginBottom: "x1e56ztr",
    marginTop: "x1xmf6yo",
    ,
  },
};

const FDSTextPairing = ({
  body,
  bodyColor = "primary",
  bodyId,
  bodyLineLimit,
  bodyRef,
  bodyTruncationTooltip,
  dir = "auto",
  headline,
  headlineAddOn,
  headlineColor = "primary",
  headlineId,
  headlineLineLimit,
  headlineRef,
  headlineTruncationTooltip,
  isPrimaryHeading,
  isSemanticHeading,
  level,
  meta,
  metaColor = "secondary",
  metaId,
  metaLineLimit,
  metaLocation = "below",
  metaRef,
  metaTestID,
  metaTruncationTooltip,
  reduceEmphasis = false,
  testid,
  textAlign = "start",
}) => {
  const { bodyType, headlineType, metaType } = getFDSTextHierarchyStyle(
    level,
    reduceEmphasis
  );
  const itemStyle = stylex(styles.item, emphasisStyles[level]);

  const headlineElement = headline !== null && (
    <div className={itemStyle}>
      {headlineAddOn !== null ? (
        <CometHeadlineWithAddOn
          addOn={headlineAddOn}
          color={headlineColor}
          headlineRef={headlineRef}
          id={headlineId}
          isPrimaryHeading={isPrimaryHeading}
          isSemanticHeading={isSemanticHeading}
          numberOfLines={headlineLineLimit}
          truncationTooltip={headlineTruncationTooltip}
          type={headlineType}
        >
          {headline}
        </CometHeadlineWithAddOn>
      ) : (
        <FDSText
          align={textAlign}
          color={headlineColor}
          dir={dir}
          id={headlineId}
          isPrimaryHeading={isPrimaryHeading}
          isSemanticHeading={isSemanticHeading}
          numberOfLines={headlineLineLimit}
          ref={headlineRef}
          truncationTooltip={headlineTruncationTooltip}
          type={headlineType}
        >
          {headline}
        </FDSText>
      )}
    </div>
  );

  const metaElement = meta !== null && (
    <div className={itemStyle}>
      <FDSText
        align={textAlign}
        color={metaColor}
        dir={dir}
        id={metaId}
        isSemanticHeading={false}
        numberOfLines={metaLineLimit}
        ref={metaRef}
        testid={metaTestID}
        truncationTooltip={metaTruncationTooltip}
        type={metaType}
      >
        {meta}
      </FDSText>
    </div>
  );

  return (
    <div
      className={stylex(styles.root, levelStyles[level])}
      data-testid={testid}
    >
      {metaLocation === "above" && metaElement}
      {headlineElement}
      {body !== null && (
        <div className={itemStyle}>
          <FDSText
            align={textAlign}
            color={bodyColor}
            dir={dir}
            id={bodyId}
            isSemanticHeading={false}
            numberOfLines={bodyLineLimit}
            ref={bodyRef}
            truncationTooltip={bodyTruncationTooltip}
            type={bodyType}
          >
            {body}
          </FDSText>
        </div>
      )}
      {metaLocation === "below" && metaElement}
    </div>
  );
};

FDSTextPairing.displayName = `${FDSTextPairing.name} [from ${module.id}]`;

export default FDSTextPairing;
