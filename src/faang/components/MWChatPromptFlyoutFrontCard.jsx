/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import fbt from "fbt";

import useReStore from "../../hooks/useReStore";

import BaseTextArea from "./BaseTextArea";
import CometPlaceholder from "./CometPlaceholder.react";
import MWChatPollFacepile from "./MWChatPollFacepile";
import { useActor } from "./MWPActor.react";
import { ReQL } from "./ReQL";
import { useFirst } from "./ReQLSuspense";

const styles = {
  textarea: {
    backgroundColor: "x9bbmet",
    borderTopStyle: "x1ejq31n",
    borderEndStyle: "xd10rxx",
    borderBottomStyle: "x1sy0etr",
    borderStartStyle: "x17r0tee",
    color: "xzsf02u",
    display: "x1lliihq",
    flexGrow: "x1iyjqo2",
    fontSize: "x6prxxf",
    fontWeight: "x1xlr1w8",
    marginTop: "x1xmf6yo",
    marginEnd: "x1emribx",
    marginBottom: "x1e56ztr",
    marginStart: "x1i64zmx",
    paddingTop: "x1y1aw1k",
    textAlign: "x2b8uid",
    ,
  },
};

function PollFacepileComponent() {
  const store = useReStore();
  const actor = useActor();
  const profilePictureUrl = useFirst(
    () =>
      ReQL.fromTableAscending(store.tables.contacts)
        .getKeyRange(actor)
        .map((contact) => contact.profilePictureUrl),
    [store, actor],
    `${module.id}:69`
  );

  const contacts =
    profilePictureUrl !== null
      ? [{ profile_picture_url: profilePictureUrl }]
      : [];

  return (
    <MWChatPollFacepile
      contacts={contacts}
      direction="reversed"
      gap="negative"
      size="mediumLarge"
    />
  );
}

PollFacepileComponent.displayName = `${PollFacepileComponent.name} [from ${module.id}]`;

function MWChatPromptFlyoutFrontCard({ onChange, value }) {
  return (
    <div className="x9bbmet xfh8nwu xoqspk4 x12v9rci x138vmkv xi1c1fh x78zum5 xdt5ytf x1iyjqo2 x2lah0s x1gslohp x12nagc x1shn012 relative x6vytul x1vjfegm">
      <BaseTextArea
        aria-label={fbt("__JHASH__M7osj0aoSaL__JHASH__")}
        maxLength={50}
        onChange={onChange}
        placeholder={fbt("__JHASH__Ao4BEMABb3X__JHASH__")}
        suppressFocusRing
        unresizable
        value={value}
        xstyle={styles.textarea}
      />
      <CometPlaceholder fallback={null}>
        <div className="x1gryazu xkrivgy x1l90r2v">
          <PollFacepileComponent />
        </div>
      </CometPlaceholder>
    </div>
  );
}

MWChatPromptFlyoutFrontCard.displayName = `${MWChatPromptFlyoutFrontCard.name} [from ${module.id}]`;

export default MWChatPromptFlyoutFrontCard;
