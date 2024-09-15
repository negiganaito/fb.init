/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import {
  EntryPointContainer,
  loadEntryPoint,
  loadQuery as relayLoadQuery,
  ProfilerContext,
  RelayEnvironmentProvider,
  useClientQuery,
  useEntryPointLoader,
  useFragment,
  useIsParentQueryActive,
  useLazyLoadQuery,
  usePaginationFragment,
  usePreloadedQuery,
  useQueryLoader,
  useRefetchableFragment,
  useRelayEnvironment,
  useSubscribeToInvalidationState,
} from "react-relay/hooks";
import { install as installCometRelayQueryProfiler } from "CometRelayQueryProfiler";
import configureRelayForWWW from "configureRelayForWWW";
import { enqueueMutation } from "enqueueMutation";
import { isRelayFBLocalEnvironment } from "isRelayFBLocalEnvironment";
import {
  applyOptimisticMutation,
  commitLocalUpdate,
  commitMutation,
  ConnectionHandler,
  createPayloadFor3DField,
  fetchQuery,
  generateUniqueClientID,
  graphql,
  MutationTypes,
  RangeOperations,
  readInlineData,
  RelayFeatureFlags,
  requestSubscription,
  VIEWER_ID,
} from "relay-runtime";
import { addFBisms as addFBismsToMutation } from "RelayFBCometMutations";
import { getActorID } from "RelayFBEnvironmentActorID";
import { MatchContainer } from "RelayFBMatchContainer";
import { getModuleId, read, readAll } from "RelayFBModuleResource";
import { addFBisms as addFBismsToSubscription } from "RelayFBSubscription";
import { useFBMutation, useFBSubscription } from "useFBMutation";

// Initializing Relay for WWW
configureRelayForWWW();
installCometRelayQueryProfiler();

// Adding FBisms to Relay Subscription

const ModuleResource = {
  getModuleId,
  read,
  readAll,
};

export default {
  ConnectionHandler,
  EntryPointContainer,
  MatchContainer,
  ModuleResource,
  MutationTypes,
  ProfilerContext,
  RangeOperations: RangeOperations,
  RelayEnvironmentProvider,
  RelayFeatureFlags,
  VIEWER_ID,
  applyOptimisticMutation,
  commitLocalUpdate,
  commitMutation: addFBismsToMutation(commitMutation),
  createPayloadFor3DField,
  enqueueMutation: addFBismsToMutation(enqueueMutation.enqueueMutation),
  fetchQuery,
  generateUniqueClientID,
  getActorID,
  graphql,
  isLocalEnvironment: isRelayFBLocalEnvironment,
  loadEntryPoint,
  loadQuery: relayLoadQuery,
  readInlineData,
  requestSubscription: addFBismsToSubscription(requestSubscription),
  useClientQuery,
  useEntryPointLoader,
  useFragment,
  useIsParentQueryActive,
  useLazyLoadQuery,
  useMutation: useFBMutation,
  usePaginationFragment,
  usePreloadedQuery,
  useQueryLoader,
  useRefetchableFragment,
  useRelayEnvironment,
  useSubscribeToInvalidationState,
  useSubscription: useFBSubscription,
};
