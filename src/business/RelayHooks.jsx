__d(
  "RelayHooks",
  [
    "RelayFBEnvironmentActorID",
    "configureRelayForWWW",
    "react-relay/relay-hooks/EntryPointContainer.react",
    "react-relay/relay-hooks/RelayEnvironmentProvider",
    "react-relay/relay-hooks/loadEntryPoint",
    "react-relay/relay-hooks/loadQuery",
    "react-relay/relay-hooks/preloadQuery_DEPRECATED",
    "react-relay/relay-hooks/prepareEntryPoint_DEPRECATED",
    "react-relay/relay-hooks/useClientQuery",
    "react-relay/relay-hooks/useEntryPointLoader",
    "react-relay/relay-hooks/useFragment",
    "react-relay/relay-hooks/useLazyLoadQuery",
    "react-relay/relay-hooks/usePaginationFragment",
    "react-relay/relay-hooks/usePreloadedQuery",
    "react-relay/relay-hooks/useQueryLoader",
    "react-relay/relay-hooks/useRefetchableFragment",
    "react-relay/relay-hooks/useRelayEnvironment",
    "react-relay/relay-hooks/useSubscribeToInvalidationState",
    "relay-runtime",
    "relay-runtime/query/PreloadableQueryRegistry",
    "useFBMutation",
    "useFBSubscription",
  ],
  function (a, b, c, d, e, f) {
    "use strict";
    a = b("RelayFBEnvironmentActorID").useActorID;
    c = b("react-relay/relay-hooks/loadQuery").loadQuery;
    d = b("relay-runtime").fetchQuery;
    f = b("relay-runtime").graphql;
    var g = b("relay-runtime").readInlineData;
    b("configureRelayForWWW")();
    e.exports = {
      EntryPointContainer: b(
        "react-relay/relay-hooks/EntryPointContainer.react"
      ),
      PreloadableQueryRegistry: b(
        "relay-runtime/query/PreloadableQueryRegistry"
      ),
      RelayEnvironmentProvider: b(
        "react-relay/relay-hooks/RelayEnvironmentProvider"
      ),
      fetchQuery: d,
      graphql: f,
      loadQuery: c,
      loadEntryPoint: b("react-relay/relay-hooks/loadEntryPoint"),
      preloadQuery_DEPRECATED: b(
        "react-relay/relay-hooks/preloadQuery_DEPRECATED"
      ),
      prepareEntryPoint_DEPRECATED: b(
        "react-relay/relay-hooks/prepareEntryPoint_DEPRECATED"
      ),
      readInlineData: g,
      useActorID: a,
      useClientQuery: b("react-relay/relay-hooks/useClientQuery"),
      useFragment: b("react-relay/relay-hooks/useFragment"),
      useLazyLoadQuery: b("react-relay/relay-hooks/useLazyLoadQuery"),
      useEntryPointLoader: b("react-relay/relay-hooks/useEntryPointLoader"),
      useQueryLoader: b("react-relay/relay-hooks/useQueryLoader"),
      usePaginationFragment: b("react-relay/relay-hooks/usePaginationFragment"),
      useMutation: b("useFBMutation"),
      usePreloadedQuery: b("react-relay/relay-hooks/usePreloadedQuery"),
      useRefetchableFragment: b(
        "react-relay/relay-hooks/useRefetchableFragment"
      ),
      useRelayEnvironment: b("react-relay/relay-hooks/useRelayEnvironment"),
      useSubscribeToInvalidationState: b(
        "react-relay/relay-hooks/useSubscribeToInvalidationState"
      ),
      useSubscription: b("useFBSubscription"),
    };
  },
  null
);

import { useActorID as useActorIDFromRelayFBEnvironmentActorID } from "RelayFBEnvironmentActorID";
import { configureRelayForWWW } from "configureRelayForWWW";
import { EntryPointContainer } from "react-relay/relay-hooks/EntryPointContainer.react";
import { RelayEnvironmentProvider } from "react-relay/relay-hooks/RelayEnvironmentProvider";
import { loadEntryPoint } from "react-relay/relay-hooks/loadEntryPoint";
import { loadQuery as loadQueryFromRelayHooks } from "react-relay/relay-hooks/loadQuery";
import { preloadQuery_DEPRECATED } from "react-relay/relay-hooks/preloadQuery_DEPRECATED";
import { prepareEntryPoint_DEPRECATED } from "react-relay/relay-hooks/prepareEntryPoint_DEPRECATED";
import { useClientQuery } from "react-relay/relay-hooks/useClientQuery";
import { useEntryPointLoader } from "react-relay/relay-hooks/useEntryPointLoader";
import { useFragment } from "react-relay/relay-hooks/useFragment";
import { useLazyLoadQuery } from "react-relay/relay-hooks/useLazyLoadQuery";
import { usePaginationFragment } from "react-relay/relay-hooks/usePaginationFragment";
import { usePreloadedQuery } from "react-relay/relay-hooks/usePreloadedQuery";
import { useQueryLoader } from "react-relay/relay-hooks/useQueryLoader";
import { useRefetchableFragment } from "react-relay/relay-hooks/useRefetchableFragment";
import { useRelayEnvironment } from "react-relay/relay-hooks/useRelayEnvironment";
import { useSubscribeToInvalidationState } from "react-relay/relay-hooks/useSubscribeToInvalidationState";
import { fetchQuery } from "relay-runtime";
import { graphql } from "relay-runtime";
import { readInlineData } from "relay-runtime";
import { PreloadableQueryRegistry } from "relay-runtime/query/PreloadableQueryRegistry";
import { useFBMutation } from "useFBMutation";
import { useFBSubscription } from "useFBSubscription";

configureRelayForWWW();

const RelayHooks = {
  EntryPointContainer,
  PreloadableQueryRegistry,
  RelayEnvironmentProvider,
  fetchQuery,
  graphql,
  loadQuery: loadQueryFromRelayHooks,
  loadEntryPoint,
  preloadQuery_DEPRECATED,
  prepareEntryPoint_DEPRECATED,
  readInlineData,
  useActorID: useActorIDFromRelayFBEnvironmentActorID,
  useClientQuery,
  useFragment,
  useLazyLoadQuery,
  useEntryPointLoader,
  useQueryLoader,
  usePaginationFragment,
  useMutation: useFBMutation,
  usePreloadedQuery,
  useRefetchableFragment,
  useRelayEnvironment,
  useSubscribeToInvalidationState,
  useSubscription: useFBSubscription,
};

export default RelayHooks;
