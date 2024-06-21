/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";
import { usePreloadedQuery } from "react-relay";
import { BusinessCometAccountSwitcherPrefetcherQuery } from "BusinessCometAccountSwitcherPrefetcherQuery.graphql";

import BizKitAccountSwitcherPrefetcherShared from "./BizKitAccountSwitcherPrefetcherShared.react";

const BusinessCometAccountSwitcherPrefetcher = ({
  businessCometAccountSwitcherPrefetcherQueryReference,
}) => {
  const data = usePreloadedQuery(
    BusinessCometAccountSwitcherPrefetcherQuery,
    businessCometAccountSwitcherPrefetcherQueryReference
  );

  return data?.viewer === null ? null : (
    <BizKitAccountSwitcherPrefetcherShared viewer={data.viewer} />
  );
};

BusinessCometAccountSwitcherPrefetcher.displayName = `BusinessCometAccountSwitcherPrefetcher`;

export default BusinessCometAccountSwitcherPrefetcher;
