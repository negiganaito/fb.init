/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import stylex from "@stylexjs/stylex";

import { textTransforms } from "./MWChatTextTransform";
import { useMWUnvaultedText } from "./MWUnvaultedText";
import MWXMessageTextWithEntities from "./MWXMessageTextWithEntities";
import MWXText from "./MWXText.react";

const styles = {
  incoming: {
    color: "x18lvrbx",
    ,
  },
  outgoing: {
    color: "xyk4ms5",
    ,
  },
  regular: {
    marginTop: "x1gslohp",
    marginEnd: 0,
    marginBottom: "x12nagc",
    marginStart: 0,
    textAlign: "x1yc453h",
    whiteSpace: "x126k92a",
    ,
  },
};

const MWPEditMessageHistoryListText = ({
  isSecureMessage,
  maxLength,
  maxLines,
  seeLessLinkProps,
  seeMoreLinkProps,
  text,
  truncationStyle,
  outgoing,
  ranges,
  renderers,
  transforms,
  xstyleForText,
}) => {
  const processedText = useMWUnvaultedText(isSecureMessage, text);
  return (
    <MWXText color={outgoing ? "white" : "primary"} type="body3">
      <div
        className={stylex(
          styles.regular,
          xstyleForText,
          outgoing ? styles.outgoing : styles.incoming
        )}
        dir="auto"
      >
        <MWXMessageTextWithEntities
          maxLength={maxLength}
          maxLines={maxLines}
          ranges={ranges}
          renderers={renderers}
          seeLessLinkProps={seeLessLinkProps}
          seeMoreLinkProps={seeMoreLinkProps}
          text={processedText || ""}
          transforms={transforms !== null ? transforms : textTransforms}
          truncationStyle={truncationStyle}
          truncationThreshold={2}
          withParagraphs={true}
        />
      </div>
    </MWXText>
  );
};

MWPEditMessageHistoryListText.displayName = `${MWPEditMessageHistoryListText.name} [from ${module.id}]`;

export default MWPEditMessageHistoryListText;
