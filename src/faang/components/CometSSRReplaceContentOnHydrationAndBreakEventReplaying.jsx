/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { Suspense } from "react";

import CometPlaceholder from "./CometPlaceholder.react";
import CometSSRSuspendOnServer from "./CometSSRSuspendOnServer";

const CometSSRReplaceContentOnHydrationAndBreakEventReplaying = ({
  children,
  useSuspenseDirectlyForSVG,
}) => {
  const Wrapper = useSuspenseDirectlyForSVG ? Suspense : CometPlaceholder;
  return (
    <Wrapper fallback={children}>
      <CometSSRSuspendOnServer>{children}</CometSSRSuspendOnServer>
    </Wrapper>
  );
};

CometSSRReplaceContentOnHydrationAndBreakEventReplaying.displayName = `${CometSSRReplaceContentOnHydrationAndBreakEventReplaying.name} [from ${module.id}]`;

export default CometSSRReplaceContentOnHydrationAndBreakEventReplaying;
