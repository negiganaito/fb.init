/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { forwardRef, useContext, useMemo } from "react";
import { html as strictHtml } from "react-strict-dom";
import unrecoverableViolation from "unrecoverableViolation";

import BaseHeadingContext from "./BaseHeadingContext";
import { useBaseTextContext } from "./BaseTextContext";

const styles = {
  root: {
    color: "x1heor9g",
    fontSize: "x1qlqyl8",
    fontWeight: "x1pd3egz",
    outline: "x1a2a7pz",
    $$css: true,
  },
};

const headingTags = {
  1: strictHtml.h1,
  2: strictHtml.h2,
  3: strictHtml.h3,
  4: strictHtml.h4,
  5: strictHtml.h5,
  6: strictHtml.h6,
};

const BaseHeading = forwardRef((props, ref) => {
  const { children, isPrimaryHeading = false, testid, xstyle, ...rest } = props;
  const headingLevel = useContext(BaseHeadingContext);

  const HeadingTag = useMemo(() => {
    if (isPrimaryHeading) return strictHtml.h1;
    const level = Math.max(Math.min(headingLevel, 6), 2);
    return headingTags[level.toString()];
  }, [isPrimaryHeading, headingLevel]);

  if (!HeadingTag) {
    throw unrecoverableViolation(
      "Failed to retrieve a heading tag, this should not be possible",
      "comet_ui"
    );
  }

  const textContext = useBaseTextContext();
  const isNested = textContext?.nested === true;

  return (
    <HeadingTag
      {...rest}
      data-testid={testid}
      dir={isNested ? undefined : "auto"}
      ref={ref}
      style={[styles.root, [xstyle]]}
    >
      {children}
    </HeadingTag>
  );
});

BaseHeading.displayName = `${BaseHeading.name} [from ${BaseHeading.id}]`;

export default BaseHeading;
