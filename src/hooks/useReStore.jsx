/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext } from "react";

import { setDisplayName } from "../business/helpers/PromiseAnnotate";
import suspendOrThrowIfUsedInSSR from "../business/helpers/suspendOrThrowIfUsedInSSR";
import { LSDatabaseSingleton } from "../faang/components/LSDatabaseSingleton";
import {
  getFromCollection,
  makeCollection,
} from "../faang/components/LSSuspense";
import { useReStoreTrackInRender } from "../faang/components/ReQLSuspenseSupportedContextTracking";
import { ReStoreProvider } from "../faang/components/ReStoreProvider.react";

const collection = makeCollection();

export default function useReStore() {
  useReStoreTrackInRender();
  const context = useContext(ReStoreProvider.context);

  if (context !== null) {
    return context;
  }

  suspendOrThrowIfUsedInSSR(
    "useReStore: LSDB is not available in SSR. Switching to client side render"
  );

  setDisplayName(LSDatabaseSingleton, "LSDatabaseSingleton");

  return getFromCollection(
    collection,
    LSDatabaseSingleton,
    () => LSDatabaseSingleton
  );
}
