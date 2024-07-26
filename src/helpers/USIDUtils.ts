// __d(
//   "USIDUtils",
//   ["Cookie", "Random", "WebStorage"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h,
//       i = 4294967295,
//       j = 36,
//       k = "usidt",
//       l = "usida",
//       m = 1,
//       n = 6;
//     function a() {
//       var a = [];
//       (h || (h = c("WebStorage"))).isLocalStorageQuotaExceeded() &&
//         a.push("LSF");
//       (h || (h = c("WebStorage"))).isSessionStorageQuotaExceeded() &&
//         a.push("SSF");
//       return a;
//     }
//     function o(a) {
//       var b = Math.floor(Date.now() / 1e3),
//         c = Math.floor(d("Random").random() * i);
//       a = a + Number(b & i).toString(j) + c.toString(j);
//       return a;
//     }
//     function p(a, b, c) {
//       if (a == null) return { ver: m, id: o(c) };
//       a = a.getItem(b);
//       if (a == null) return { ver: m, id: o(c) };
//       b = JSON.parse(a);
//       return b.ver !== m ? { ver: m, id: o(c) } : b;
//     }
//     function q(a, b, d) {
//       if (a == null) return;
//       (h || (h = c("WebStorage"))).setItemGuarded(a, b, JSON.stringify(d));
//     }
//     function r(a, b) {
//       if (c("Cookie") == null) return { ver: m, id: o(b) };
//       a = c("Cookie").get(a);
//       if (a == null || a == "") return { ver: m, id: o(b) };
//       var d;
//       try {
//         d = JSON.parse(a);
//       } catch (b) {
//         d = JSON.parse(atob(a));
//       }
//       return d.ver !== m ? { ver: m, id: o(b) } : d;
//     }
//     function s(a, b) {
//       if (c("Cookie") == null) return;
//       c("Cookie").set(a, btoa(JSON.stringify(b)));
//     }
//     function b() {
//       var a = p(
//         (h || (h = c("WebStorage"))).getSessionStorageForRead(),
//         k,
//         "T"
//       );
//       return a.id;
//     }
//     function e(a) {
//       q((h || (h = c("WebStorage"))).getSessionStorage(), k, { ver: m, id: a });
//     }
//     function t() {
//       var a,
//         b = r(l, "A");
//       return {
//         id: b.id,
//         time: (a = b.time) != null ? a : 0,
//         startTime: (a = b.startTime) != null ? a : 0,
//       };
//     }
//     function f(a) {
//       s(l, { ver: m, id: a.id, time: a.time });
//       var b = t();
//       return b.id === a.id && b.time === a.time;
//     }
//     g.VERSION = n;
//     g.getFlags = a;
//     g.generateId = o;
//     g.getExistingTabId = b;
//     g.writeTabId = e;
//     g.getExistingActivityInfo = t;
//     g.writeActivityInfo = f;
//   },
//   98
// );

// USIDUtils.ts

import { Cookie } from "Cookie";
import { Random } from "Random";
import { WebStorage } from "WebStorage";

const MAX_UINT32 = 4294967295;
const BASE36 = 36;
const TAB_STORAGE_KEY = "usidt";
const ACTIVITY_STORAGE_KEY = "usida";
const VERSION = 1;
const GLOBAL_VERSION = 6;

type ActivityInfo = {
  ver?: number;
  id: string;
  time?: number;
  startTime?: number;
};

function getFlags(): string[] {
  const flags: string[] = [];
  if (WebStorage.isLocalStorageQuotaExceeded()) {
    flags.push("LSF");
  }
  if (WebStorage.isSessionStorageQuotaExceeded()) {
    flags.push("SSF");
  }
  return flags;
}

function generateId(prefix: string): string {
  const currentTime = Math.floor(Date.now() / 1000);
  const randomPart = Math.floor(Random.random() * MAX_UINT32);
  return (
    prefix +
    Number(currentTime & MAX_UINT32).toString(BASE36) +
    randomPart.toString(BASE36)
  );
}

function getItemWithFallback(
  storage: Storage | null,
  key: string,
  prefix: string
): ActivityInfo {
  if (!storage) return { ver: VERSION, id: generateId(prefix) };
  const item = storage.getItem(key);
  if (!item) return { ver: VERSION, id: generateId(prefix) };
  const parsed = JSON.parse(item);
  return parsed.ver !== VERSION
    ? { ver: VERSION, id: generateId(prefix) }
    : parsed;
}

function setItemGuarded(
  storage: Storage | null,
  key: string,
  value: ActivityInfo
): void {
  if (!storage) return;
  WebStorage.setItemGuarded(storage, key, JSON.stringify(value));
}

function getCookieWithFallback(
  cookieKey: string,
  prefix: string
): ActivityInfo {
  if (!Cookie) return { ver: VERSION, id: generateId(prefix) };
  const cookieValue = Cookie.get(cookieKey);
  if (!cookieValue) return { ver: VERSION, id: generateId(prefix) };
  let parsed;
  try {
    parsed = JSON.parse(cookieValue);
  } catch (e) {
    parsed = JSON.parse(atob(cookieValue));
  }
  return parsed.ver !== VERSION
    ? { ver: VERSION, id: generateId(prefix) }
    : parsed;
}

function setCookie(cookieKey: string, value: ActivityInfo): void {
  if (!Cookie) return;
  Cookie.set(cookieKey, btoa(JSON.stringify(value)));
}

function getExistingTabId(): string {
  const tabInfo = getItemWithFallback(
    WebStorage.getSessionStorageForRead(),
    TAB_STORAGE_KEY,
    "T"
  );
  return tabInfo.id;
}

function writeTabId(tabId: string): void {
  setItemGuarded(WebStorage.getSessionStorage(), TAB_STORAGE_KEY, {
    ver: VERSION,
    id: tabId,
  });
}

function getExistingActivityInfo(): ActivityInfo {
  const activityInfo = getCookieWithFallback(ACTIVITY_STORAGE_KEY, "A");
  return {
    id: activityInfo.id,
    time: activityInfo.time ?? 0,
    startTime: activityInfo.startTime ?? 0,
  };
}

function writeActivityInfo(activityInfo: ActivityInfo): boolean {
  setCookie(ACTIVITY_STORAGE_KEY, {
    ver: VERSION,
    id: activityInfo.id,
    time: activityInfo.time,
  });
  const updatedInfo = getExistingActivityInfo();
  return (
    updatedInfo.id === activityInfo.id && updatedInfo.time === activityInfo.time
  );
}

export const USIDUtils = {
  VERSION: GLOBAL_VERSION,
  getFlags,
  generateId,
  getExistingTabId,
  writeTabId,
  getExistingActivityInfo,
  writeActivityInfo,
};
