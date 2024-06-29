// __d(
//   "CometRelayMultiActorEnvironment",
//   ["relay-runtime/multi-actor-environment"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h = new Map();
//     function a(a) {
//       var b = function (b, c, d) {
//         a(String(b), c, d);
//       };
//       for (
//         var c = h.values(),
//           d = Array.isArray(c),
//           e = 0,
//           c = d
//             ? c
//             : c[
//                 typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
//               ]();
//         ;

//       ) {
//         var f;
//         if (d) {
//           if (e >= c.length) break;
//           f = c[e++];
//         } else {
//           e = c.next();
//           if (e.done) break;
//           f = e.value;
//         }
//         f = f;
//         f.commitMultiActorUpdate(b);
//       }
//     }
//     function b(a) {
//       var b = a.actorEnvironmentKey,
//         c = a.actorID;
//       a = a.createMultiActorEnvironmentConfig;
//       b = (b = b) != null ? b : null;
//       var e = h.get(b);
//       e == null &&
//         ((e = new (d(
//           "relay-runtime/multi-actor-environment"
//         ).MultiActorEnvironment)(a({ actorEnvironmentKey: b }))),
//         h.set(b, e));
//       return e.forActor(c);
//     }
//     g.commitMultiActorUpdate = a;
//     g.forActor = b;
//   },
//   98
// );

import { MultiActorEnvironment } from "relay-runtime/multi-actor-environment";

type CommitMultiActorUpdateCallback = (
  b: string,
  c: unknown,
  d: unknown
) => void;

const environmentMap = new Map<string | null, MultiActorEnvironment>();

export function commitMultiActorUpdate(
  callback: CommitMultiActorUpdateCallback
): void {
  const commitUpdate = (b: unknown, c: unknown, d: unknown) => {
    callback(String(b), c, d);
  };

  for (const environment of environmentMap.values()) {
    environment.commitMultiActorUpdate(commitUpdate);
  }
}

interface ActorEnvironmentConfig {
  actorEnvironmentKey?: string | null;
  actorID: string;
  createMultiActorEnvironmentConfig: (config: {
    actorEnvironmentKey: string | null;
  }) => unknown;
}

export function forActor(
  config: ActorEnvironmentConfig
): MultiActorEnvironment {
  const { actorEnvironmentKey, actorID, createMultiActorEnvironmentConfig } =
    config;
  const key = actorEnvironmentKey ?? null;
  let environment = environmentMap.get(key);

  if (environment == null) {
    environment = new MultiActorEnvironment(
      createMultiActorEnvironmentConfig({ actorEnvironmentKey: key })
    );
    environmentMap.set(key, environment);
  }

  return environment.forActor(actorID);
}
