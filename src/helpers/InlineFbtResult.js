/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";
import recoverableViolation from "recoverableViolation";

import FbtHooksImpl from "./FbtHooks";
import FbtReactUtil from "./FbtReactUtil";
import FbtResultBase from "./FbtResultBase";

const InlineFbtResultComponent = ({
  content,
  hash,
  inlineMode,
  translation,
}) => {
  if (hash === null) {
    recoverableViolation(
      `Fbt string hash should not be null for translated string "${translation}" [inlineMode=${inlineMode}]`,
      "internationalization"
    );
  }
  return (
    <span
      data-intl-hash={hash}
      data-intl-translation={translation}
      data-intl-trid=""
    >
      {content}
    </span>
  );
};

InlineFbtResultComponent.displayName = `${InlineFbtResultComponent.name}`;

class InlineFbtResultImplComet extends FbtResultBase {
  // eslint-disable-next-line max-params
  constructor(content, inlineMode, translation, hash) {
    super(content, FbtHooksImpl.getErrorListener({ hash, translation }));
    this.$$typeof = FbtReactUtil.REACT_ELEMENT_TYPE;
    this.key = null;
    this.ref = null;
    this.type = InlineFbtResultComponent;
    this.props = { content, hash, inlineMode, translation };
  }
}

export default InlineFbtResultImplComet;
