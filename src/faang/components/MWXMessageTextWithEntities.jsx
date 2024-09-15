/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import CometTextWithEntities from "./CometTextWithEntities.react";

function MWXMessageTextWithEntities(props) {
  if (CometTextWithEntities !== null) {
    return <CometTextWithEntities {...props} />;
  }

  // if (Component5867 !== null) {
  //   const {
  //     seeLessLinkProps = {},
  //     seeMoreLinkProps = {},
  //     ...restProps
  //   } = props;
  //   const { color: seeLessColor, ...restSeeLessLinkProps } = seeLessLinkProps;
  //   const { color: seeMoreColor, ...restSeeMoreLinkProps } = seeMoreLinkProps;

  //   return (
  //     <Component5867
  //       {...restProps}
  //       seeLessLinkProps={{
  //         color: seeLessColor === "primary" ? "primary" : undefined,
  //         ...restSeeLessLinkProps,
  //       }}
  //       seeMoreLinkProps={{
  //         color: seeMoreColor === "primary" ? "primary" : undefined,
  //         ...restSeeMoreLinkProps,
  //       }}
  //     />
  //   );
  // }

  return null;
}

MWXMessageTextWithEntities.displayName = `${MWXMessageTextWithEntities.name} [from ${module.id}]`;

export default MWXMessageTextWithEntities;
