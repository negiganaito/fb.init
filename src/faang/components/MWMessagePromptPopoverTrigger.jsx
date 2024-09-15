/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useRef } from "react";
import emptyFunction from "fbjs/lib/emptyFunction";

import { useMWShowMessagePromptPopoverContext } from "../../context/MWShowMessagePromptPopoverContext";
import { equal } from "../../helpers/I64";
import { useShouldAllowRollCallForMessage } from "../../hooks/useShouldAllowRollCallForMessage";

import JSResourceForInteraction from "./JSResourceForInteraction";
import { useActor } from "./MWPActor.react";
import MWXLazyPopoverTrigger from "./MWXLazyPopoverTrigger";

const MWMessagePromptPopover = JSResourceForInteraction(
  "MWMessagePromptPopover.react"
).__setRef("MWMessagePromptPopoverTrigger.react");

function MWMessagePromptPopoverTrigger({ attachments, children, message }) {
  const shouldAllowRollCall = useShouldAllowRollCallForMessage(
    message,
    attachments
  );
  const hasShownPopover = useRef(false);
  const actor = useActor();
  const [, setShowPopover] = useMWShowMessagePromptPopoverContext();

  if (!shouldAllowRollCall) {
    return children;
  }

  return (
    <MWXLazyPopoverTrigger
      align="middle"
      popoverProps={{ message, onClose: emptyFunction }}
      popoverResource={MWMessagePromptPopover}
      position={equal(actor, message.senderId) ? "start" : "end"}
    >
      {(triggerRef, handlePopoverOpen) => {
        if (!hasShownPopover.current) {
          hasShownPopover.current = true;
          setShowPopover(handlePopoverOpen);
        }
        return <div ref={triggerRef}>{children}</div>;
      }}
    </MWXLazyPopoverTrigger>
  );
}

MWMessagePromptPopoverTrigger.displayName = `${MWMessagePromptPopoverTrigger.name} [from ${module.id}]`;

export default MWMessagePromptPopoverTrigger;
