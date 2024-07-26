/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useEffect, useMemo } from "react";
import CurrentMessengerUser from "CurrentMessengerUser";
import Env from "Env";
import FBLogger from "FBLogger";
import fbt from "fbt";
import gkx from "gkx";
import I64 from "I64";
import Int64Hooks from "Int64Hooks";
import LSAuthorityLevel from "LSAuthorityLevel";
import LSContactBlockedByViewerStatus from "LSContactBlockedByViewerStatus";
import LSContactGender from "LSContactGender";
import LSContactIdType from "LSContactIdType";
import LSContactType from "LSContactType";
import LSContactViewerRelationship from "LSContactViewerRelationship";
import LSContactWorkForeignEntityType from "LSContactWorkForeignEntityType";
import LSFactory from "LSFactory";
import LSVerifyContactRowExistsStoredProcedure from "LSVerifyContactRowExistsStoredProcedure";
import nullthrows from "nullthrows";
import Promise from "Promise";
import promiseDone from "promiseDone";
import ReQL from "ReQL";
import ReQLSuspense from "ReQLSuspense";
import { useReStore } from "useReStore";

const platformName = Env.isMessengerDotComOnComet
  ? "Messenger"
  : gkx("22979")
  ? "Instagram"
  : "Facebook";

const substitutionText = fbt
  ._("__JHASH__9kaBCOd2SjE__JHASH__", [
    fbt._param("Platform Name", platformName),
  ])
  .toString();
const substitutionRegex = /(\$?)\$([a-zA-Z_]+)(?:\((.*?)\))?/g;
const mentionRegex = /()(@)(?:(\d*?)@msgr)/g;

function verifyContactRowExists(context, id) {
  return LSVerifyContactRowExistsStoredProcedure(LSFactory(context), {
    authorityLevel: I64.of_int32(LSAuthorityLevel.OPTIMISTIC),
    blockedByViewerStatus: I64.of_int32(
      LSContactBlockedByViewerStatus.UNBLOCKED
    ),
    contactIdType: I64.of_int32(LSContactIdType.FBID),
    contactType: I64.of_int32(LSContactType.USER),
    contactViewerRelationship: I64.of_int32(
      LSContactViewerRelationship.UNKNOWN
    ),
    gender: I64.of_int32(LSContactGender.UNKNOWN),
    id,
    isBlocked: false,
    isMemorialized: false,
    isSelf: id === CurrentMessengerUser.getID(),
    workForeignEntityType: I64.of_int32(LSContactWorkForeignEntityType.UNKNOWN),
  });
}

function binarySearch(arr, x) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (arr[mid][0] < x) start = mid + 1;
    else end = mid - 1;
  }
  return end;
}

// eslint-disable-next-line max-params
function applySubstitutions(text, ranges, regex, callback) {
  const substitutions = [[-1, 0]];
  text = text.replace(regex, (...args) => {
    const [match, prefix, key, param] = args;
    const substitution = callback(match, prefix, key, param);
    if (substitution.length === match.length) return substitution;
    substitutions.push([
      param,
      match.length -
        substitution.length +
        substitutions[substitutions.length - 1][1],
    ]);
    return substitution;
  });

  if (substitutions.length === 1)
    return { textWithSubstitutions: text, updatedRanges: ranges };

  const updatedRanges = ranges.map((range) => {
    const index = binarySearch(substitutions, range.offset);
    return {
      ...range,
      length:
        range.length -
        (substitutions[index + 1] &&
        substitutions[index + 1][0] <= range.offset + range.length
          ? substitutions[index + 1][1] - substitutions[index][1]
          : 0),
      offset: range.offset - substitutions[index][1],
    };
  });

  return { textWithSubstitutions: text, updatedRanges };
}

const substitutionHandlers = {
  CONTACT_FIRST_NAME: [
    (context) => (id) =>
      ReQL.fromTableAscending(context.tables.contacts, [
        "name",
        "firstName",
        "id",
      ])
        .getKeyRange(id)
        .map(({ firstName, name }) => firstName ?? name),
    () => substitutionText,
    verifyContactRowExists,
  ],
  CONTACT_FULL_NAME: [
    (context) => (id) =>
      ReQL.fromTableAscending(context.tables.contacts, ["name"])
        .getKeyRange(id)
        .map(({ name }) => name),
    () => substitutionText,
    verifyContactRowExists,
  ],
  PARTICIPANT_FIRST_NAME: [
    (context) =>
      (id, { threadKey }) =>
        ReQL.fromTableAscending(context.tables.contacts, [
          "name",
          "firstName",
          "id",
        ])
          .getKeyRange(id)
          .map(({ firstName, id, name }) => {
            const nickname =
              threadKey === null
                ? null
                : ReQLSuspense.first(
                    ReQL.fromTableAscending(context.tables.participants, [
                      "nickname",
                    ]).getKeyRange(threadKey, id)
                  );
            return nickname?.nickname ?? firstName ?? name;
          }),
    () => substitutionText,
    verifyContactRowExists,
  ],
  PARTICIPANT_FULL_NAME: [
    (context) =>
      (id, { threadKey }) =>
        ReQL.fromTableAscending(context.tables.contacts, ["name", "id"])
          .getKeyRange(id)
          .map(({ id, name }) => {
            const nickname =
              threadKey === null
                ? null
                : ReQLSuspense.first(
                    ReQL.fromTableAscending(context.tables.participants, [
                      "nickname",
                    ]).getKeyRange(threadKey, id)
                  );
            return nickname?.nickname ?? name;
          }),
    () => substitutionText,
    verifyContactRowExists,
  ],
};

// eslint-disable-next-line max-params
function useStringWithSubstitutions(
  text,
  threadKey,
  context = substitutionRegex,
  handlers = substitutionHandlers,
  logErrors = true
) {
  const reStore = useReStore();
  const int64ThreadKey = Int64Hooks.useMemoInt64(
    () => ({ threadKey }),
    [threadKey]
  );

  const substitutions = useMemo(() => {
    if (text === null) return [];
    const results = [];
    let count = 0;

    context.lastIndex = 0;
    let match;
    while ((match = context.exec(text)) !== null) {
      const [fullMatch, prefix, key, param] = match;
      if (!prefix) {
        const id = I64.of_string_opt(param);
        if (id === null) {
          logErrors &&
            FBLogger("messenger_e2ee_web").mustfix(
              `Invalid user id for substitution key ${key}: ${param}`
            );
        } else {
          const handler = handlers[key];
          if (handler) {
            results.push([
              handler[0](reStore)(id, int64ThreadKey)
                .take(1)
                .map((res) => [count, res]),
              () => handler[2](reStore, param),
            ]);
            count++;
          }
        }
      }
    }
    return results;
  }, [int64ThreadKey, reStore, text, context, handlers, logErrors]);

  const data = ReQLSuspense.useArray(() => {
    if (substitutions.length === 0) return ReQL.empty();
    if (substitutions.length === 1) return substitutions[0][0];
    return ReQL.union(...substitutions.map(([query]) => query));
  }, [substitutions]);

  const dataMap = useMemo(() => new Map(data), [data]);

  useEffect(() => {
    const queries = substitutions
      .map(([_, query]) => (dataMap.has(count) ? null : query))
      .filter(Boolean);
    if (queries.length > 0) {
      promiseDone(
        reStore.runInTransaction(
          (tx) => Promise.all(queries.map((query) => query(tx))),
          "readwrite"
        )
      );
    }
  }, [reStore, substitutions, dataMap]);

  return useMemo(() => {
    if (text === null) return null;
    let count = 0;
    return applySubstitutions(
      text,
      [],
      context,
      // eslint-disable-next-line max-params
      (fullMatch, prefix, key, param) => {
        const handler = handlers[key];
        const id = I64.of_string_opt(param);
        return prefix || handler === null || id === null
          ? fullMatch
          : dataMap.get(count++) ?? handler[1](param);
      }
    );
  }, [text, context, dataMap, handlers]);
}

// eslint-disable-next-line max-params
function useStringWithMentionSubstitutionsAndUpdatedRanges(
  text,
  ranges,
  contactIds,
  context = mentionRegex,
  logErrors = true
) {
  const handlers = useMemo(
    () => ({
      "@": [
        (reStore) => (id) =>
          contactIds.has(I64.to_string(id))
            ? ReQL.fromTableAscending(reStore.tables.contacts, ["name"])
                .getKeyRange(id)
                .map(({ name }) => `@${name}`)
            : ReQL.empty(),
        (id) => (contactIds.has(id) ? `@${substitutionText}` : `@${id}@msgr`),
        verifyContactRowExists,
      ],
    }),
    [contactIds]
  );

  return useStringWithSubstitutions(
    text,
    ranges,
    undefined,
    context,
    handlers,
    logErrors
  );
}

export {
  useStringWithMentionSubstitutionsAndUpdatedRanges,
  useStringWithSubstitutions,
};
