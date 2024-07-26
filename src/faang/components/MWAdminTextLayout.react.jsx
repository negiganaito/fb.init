/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import { fromTableAscending } from "ReQL";
import { useFirst } from "ReQLSuspense";
import { useReStore } from "useReStore";
import { useStringWithSubstitutions } from "useStringWithSubstitutions";

import CometTextWithEntities from "./CometTextWithEntities.react";
import { isArmadilloSecure } from "./LSMessagingThreadTypeUtil";
import { unvault } from "./MAWVault";
import { textTransformsNoVault } from "./MWChatTextTransform";

function MWAdminTextLayout({ cta, message }) {
  const store = useReStore();
  const threadData = useFirst(
    () =>
      fromTableAscending(store.tables.threads, ["threadType"]).getKeyRange(
        message.threadKey
      ),
    [store, message.threadKey],
    MWAdminTextLayout.id + ":29"
  );

  const threadType = threadData?.threadType;
  const isSecure = threadType ? isArmadilloSecure(threadType) : false;
  const messageText = message.text ? unvault(message.text) : null;

  const displayText =
    useStringWithSubstitutions(
      isSecure ? messageText : null,
      message.threadKey
    ) ?? messageText;

  if (displayText !== null) {
    if (cta !== null) {
      return (
        <>
          <CometTextWithEntities
            text={displayText}
            transforms={textTransformsNoVault}
          />{" "}
          {cta}
        </>
      );
    } else {
      return (
        <CometTextWithEntities
          text={displayText}
          transforms={textTransformsNoVault}
        />
      );
    }
  } else if (cta !== null) {
    return cta;
  } else {
    return null;
  }
}

MWAdminTextLayout.displayName = `${MWAdminTextLayout.name} [from ${MWAdminTextLayout.id}]`;

export default MWAdminTextLayout;
