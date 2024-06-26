/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from "react";

const fn = function (...a) {};

/**
 * @typedef {import("./types").HeroInteractionContextValue}
 */
const defaultContextValue = {
  consumeBootload: fn,
  hold: () => "",
  logHeroRender: fn,
  logMetadata: fn,
  logPageletVC: fn,
  logReactCommit: fn,
  logReactPostCommit: fn,
  logReactRender: fn,
  pageletStack: [],
  registerPlaceholder: fn,
  removePlaceholder: fn,
  suspenseCallback: fn,
  unhold: fn,
};

const heroInteractionContext = createContext(defaultContextValue);

export const HeroInteractionContext = {
  Context: heroInteractionContext,
  DEFAULT_CONTEXT_VALUE: defaultContextValue,
};
