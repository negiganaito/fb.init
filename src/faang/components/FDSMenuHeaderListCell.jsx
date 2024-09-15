/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import ArrowLeftOutline24 from "ArrowLeftOutline24.svg.react";
import CometListCellStrict_DEPRECATED from "CometListCellStrict_DEPRECATED.react";
import fbt from "fbt";

const FDSMenuHeaderListCell = (props) => {
  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <CometListCellStrict_DEPRECATED
      addOnStart={{
        "aria-label": fbt._("__JHASH__sqTeJmgA5ut__JHASH__"),
        icon: <ArrowLeftOutline24 />,
        onPress: props.onPressBack,
        size: 24,
        tooltip: fbt._("__JHASH__sqTeJmgA5ut__JHASH__"),
        type: "icon",
      }}
      addOnStartVerticalAlign="center"
      emphasized={false}
      headline={props.title}
      isSemanticHeading={true}
      level={3}
      meta={props.meta}
      paddingHorizontal={8}
    />
  );
};

FDSMenuHeaderListCell.displayName = `${FDSMenuHeaderListCell.name} [from ${module.id}]`;

export default FDSMenuHeaderListCell;
