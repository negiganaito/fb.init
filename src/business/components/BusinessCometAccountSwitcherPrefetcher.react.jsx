/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

// import { usePreloadedQuery } from "react-relay";
// import { BusinessCometAccountSwitcherPrefetcherQuery } from "BusinessCometAccountSwitcherPrefetcherQuery.graphql";
import BizKitAccountSwitcherPrefetcherShared from "./BizKitAccountSwitcherPrefetcherShared.react";

const BusinessCometAccountSwitcherPrefetcher = ({
  businessCometAccountSwitcherPrefetcherQueryReference,
}) => {
  // const data = usePreloadedQuery(
  //   BusinessCometAccountSwitcherPrefetcherQuery,
  //   businessCometAccountSwitcherPrefetcherQueryReference
  // );

  const data = {
    viewer: {
      __fragments: {
        BizKitAccountSwitcherPrefetcherShared_viewer: {},
      },
      __id: "client:root:viewer",
      __fragmentOwner: {
        identifier: "7464360957015918{}",
        node: {
          fragment: {
            argumentDefinitions: [],
            kind: "Fragment",
            metadata: null,
            name: "BusinessCometAccountSwitcherPrefetcherQuery",
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "Viewer",
                kind: "LinkedField",
                name: "viewer",
                plural: false,
                selections: [
                  {
                    args: null,
                    kind: "FragmentSpread",
                    name: "BizKitAccountSwitcherPrefetcherShared_viewer",
                  },
                ],
                storageKey: null,
              },
            ],
            type: "Query",
            abstractKey: null,
          },
          kind: "Request",
          operation: {
            argumentDefinitions: [],
            kind: "Operation",
            name: "BusinessCometAccountSwitcherPrefetcherQuery",
            selections: [
              {
                alias: null,
                args: null,
                concreteType: "Viewer",
                kind: "LinkedField",
                name: "viewer",
                plural: false,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: "XFBGQLBusinessAccountSwitchInfo",
                    kind: "LinkedField",
                    name: "current_user_info",
                    plural: false,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "name",
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "profile_url",
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "user_type",
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "contact_point",
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "active_session",
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "uid",
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: "ScalarField",
                        name: "cuid",
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                  {
                    alias: null,
                    args: null,
                    kind: "ScalarField",
                    name: "is_eligible_for_account_switcher_m2",
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
            ],
          },
          params: {
            id: "7464360957015918",
            metadata: {},
            name: "BusinessCometAccountSwitcherPrefetcherQuery",
            operationKind: "query",
            text: null,
          },
        },
        variables: {},
        cacheConfig: {},
      },
    },
  };

  return data?.viewer === null ? null : (
    <BizKitAccountSwitcherPrefetcherShared viewer={data.viewer} />
  );
};

BusinessCometAccountSwitcherPrefetcher.displayName = `BusinessCometAccountSwitcherPrefetcher`;

export default BusinessCometAccountSwitcherPrefetcher;
