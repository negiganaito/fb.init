// __d(
//   "USIDCore",
//   ["DateConsts", "USIDUtils", "asyncParams"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h = 30,
//       i = d("DateConsts").MIN_PER_HOUR * 5,
//       j = 2,
//       k = "__usid";
//     function l() {
//       return Math.floor(Date.now() / d("DateConsts").MS_PER_SEC);
//     }
//     a = (function () {
//       function a(a, b, c, e, f, g) {
//         this.$1 = a;
//         this.$2 = b;
//         this.$3 = c;
//         this.$8 = e;
//         this.$9 = f;
//         this.$4 = g.activityTrigger;
//         this.$5 = ((b = g.activityTimeoutInMin) != null ? b : h) * 60;
//         this.$6 = ((c = g.activityMaxTimeInMin) != null ? c : i) * 60;
//         this.$7 = ((e = g.activityCacheTimeoutInMin) != null ? e : j) * 60;
//         this.$10 = 0;
//         d("USIDUtils").writeTabId(a);
//         this.triggerActivity();
//       }
//       var b = a.prototype;
//       b.getFlags = function () {
//         return this.$9;
//       };
//       b.getRequestVersion = function () {
//         return this.$8;
//       };
//       b.getSessionVersion = function () {
//         return d("USIDUtils").VERSION;
//       };
//       b.getTabId = function () {
//         return this.$1;
//       };
//       b.getPageId = function () {
//         return this.$2;
//       };
//       b.getTransitionId = function () {
//         return this.$3;
//       };
//       b.getActivityId = function () {
//         var a = this.$11();
//         return a.id;
//       };
//       b.getActivityTimeOut = function () {
//         var a = d("USIDUtils").getExistingActivityInfo(),
//           b = l();
//         return this.$5 - (b - a.time);
//       };
//       b.getActivityMaxTime = function () {
//         var a = d("USIDUtils").getExistingActivityInfo(),
//           b = l();
//         return this.$6 - (b - a.startTime);
//       };
//       b.getSessionID = function () {
//         return (
//           this.getTabId() +
//           ":" +
//           this.getPageId() +
//           ":" +
//           this.getTransitionId() +
//           "-" +
//           this.getActivityId()
//         );
//       };
//       b.serializeForRequest = function () {
//         this.$4 === "request" && this.triggerActivity();
//         return this.$12();
//       };
//       b.$12 = function () {
//         var a = this.getSessionVersion(),
//           b = this.getSessionID(),
//           c = this.getRequestVersion(),
//           d = this.getFlags().join(",");
//         return a + "-" + b + "-RV=" + c + ":F=" + d;
//       };
//       b.contextData = function () {
//         return { usid_override: "" };
//       };
//       b.$11 = function () {
//         var a = d("USIDUtils").getExistingActivityInfo(),
//           b = this.$13(a);
//         b && this.$14(a);
//         return a;
//       };
//       b.$14 = function (a) {
//         a = d("USIDUtils").writeActivityInfo(a);
//         a && d("asyncParams").add(k, this.$12());
//       };
//       b.$13 = function (a) {
//         var b = l();
//         if (b - a.time > this.$5) {
//           a.id = d("USIDUtils").generateId("A");
//           a.time = b;
//           a.startTime = b;
//           return !0;
//         }
//         return !1;
//       };
//       b.triggerActivity = function () {
//         var a = l();
//         if (a - this.$10 > this.$7) {
//           var b = this.$11();
//           b.time = a;
//           this.$14(b);
//           this.$10 = a;
//         }
//       };
//       b.nextTransition = function () {
//         this.triggerActivity(), this.$3++;
//       };
//       return a;
//     })();
//     g["default"] = a;
//   },
//   98
// );

// USIDCore.ts

import { DateConsts } from "DateConsts";
import { USIDUtils } from "USIDUtils";
import { asyncParams } from "asyncParams";

const DEFAULT_ACTIVITY_TIMEOUT_MIN = 30;
const DEFAULT_ACTIVITY_MAX_TIME_MIN = DateConsts.MIN_PER_HOUR * 5;
const DEFAULT_ACTIVITY_CACHE_TIMEOUT_MIN = 2;
const USID_PARAM_KEY = "__usid";

function getCurrentTimestamp(): number {
  return Math.floor(Date.now() / DateConsts.MS_PER_SEC);
}

type USIDOptions = {
  activityTrigger: string;
  activityTimeoutInMin?: number;
  activityMaxTimeInMin?: number;
  activityCacheTimeoutInMin?: number;
};

class USIDCore {
  private tabId: string;
  private pageId: string;
  private transitionId: string;
  private requestVersion: string;
  private flags: string[];
  private activityTrigger: string;
  private activityTimeout: number;
  private activityMaxTime: number;
  private activityCacheTimeout: number;
  private lastActivityTimestamp: number;

  constructor(
    tabId: string,
    pageId: string,
    transitionId: string,
    requestVersion: string,
    flags: string[],
    options: USIDOptions
  ) {
    this.tabId = tabId;
    this.pageId = pageId;
    this.transitionId = transitionId;
    this.requestVersion = requestVersion;
    this.flags = flags;
    this.activityTrigger = options.activityTrigger;
    this.activityTimeout =
      (options.activityTimeoutInMin ?? DEFAULT_ACTIVITY_TIMEOUT_MIN) * 60;
    this.activityMaxTime =
      (options.activityMaxTimeInMin ?? DEFAULT_ACTIVITY_MAX_TIME_MIN) * 60;
    this.activityCacheTimeout =
      (options.activityCacheTimeoutInMin ??
        DEFAULT_ACTIVITY_CACHE_TIMEOUT_MIN) * 60;
    this.lastActivityTimestamp = 0;
    USIDUtils.writeTabId(tabId);
    this.triggerActivity();
  }

  getFlags(): string[] {
    return this.flags;
  }

  getRequestVersion(): string {
    return this.requestVersion;
  }

  getSessionVersion(): string {
    return USIDUtils.VERSION;
  }

  getTabId(): string {
    return this.tabId;
  }

  getPageId(): string {
    return this.pageId;
  }

  getTransitionId(): string {
    return this.transitionId;
  }

  getActivityId(): string {
    const activityInfo = this.updateActivityInfoIfNeeded();
    return activityInfo.id;
  }

  getActivityTimeOut(): number {
    const activityInfo = USIDUtils.getExistingActivityInfo();
    const currentTimestamp = getCurrentTimestamp();
    return this.activityTimeout - (currentTimestamp - activityInfo.time);
  }

  getActivityMaxTime(): number {
    const activityInfo = USIDUtils.getExistingActivityInfo();
    const currentTimestamp = getCurrentTimestamp();
    return this.activityMaxTime - (currentTimestamp - activityInfo.startTime);
  }

  getSessionID(): string {
    return `${this.getTabId()}:${this.getPageId()}:${this.getTransitionId()}-${this.getActivityId()}`;
  }

  serializeForRequest(): string {
    if (this.activityTrigger === "request") {
      this.triggerActivity();
    }
    return this.generateUSIDParam();
  }

  private generateUSIDParam(): string {
    const sessionVersion = this.getSessionVersion();
    const sessionID = this.getSessionID();
    const requestVersion = this.getRequestVersion();
    const flags = this.getFlags().join(",");
    return `${sessionVersion}-${sessionID}-RV=${requestVersion}:F=${flags}`;
  }

  contextData() {
    return { usid_override: "" };
  }

  private updateActivityInfoIfNeeded() {
    const activityInfo = USIDUtils.getExistingActivityInfo();
    if (this.shouldUpdateActivityInfo(activityInfo)) {
      this.writeActivityInfo(activityInfo);
    }
    return activityInfo;
  }

  private writeActivityInfo(activityInfo: any) {
    const updatedActivityInfo = USIDUtils.writeActivityInfo(activityInfo);
    if (updatedActivityInfo) {
      asyncParams.add(USID_PARAM_KEY, this.generateUSIDParam());
    }
  }

  private shouldUpdateActivityInfo(activityInfo: any): boolean {
    const currentTimestamp = getCurrentTimestamp();
    if (currentTimestamp - activityInfo.time > this.activityTimeout) {
      activityInfo.id = USIDUtils.generateId("A");
      activityInfo.time = currentTimestamp;
      activityInfo.startTime = currentTimestamp;
      return true;
    }
    return false;
  }

  triggerActivity() {
    const currentTimestamp = getCurrentTimestamp();
    if (
      currentTimestamp - this.lastActivityTimestamp >
      this.activityCacheTimeout
    ) {
      const activityInfo = this.updateActivityInfoIfNeeded();
      activityInfo.time = currentTimestamp;
      this.writeActivityInfo(activityInfo);
      this.lastActivityTimestamp = currentTimestamp;
    }
  }

  nextTransition() {
    this.triggerActivity();
    this.transitionId = (parseInt(this.transitionId, 10) + 1).toString();
  }
}

export default USIDCore;
