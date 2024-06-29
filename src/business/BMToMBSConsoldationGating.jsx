// __d(
//   "BMToMBSConsoldationGating",
//   ["BizKitConfigDynamicFields", "WebStorage", "gkx", "qex"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h;
//     function a() {
//       return d("BizKitConfigDynamicFields").is_ig_login ||
//         d("BizKitConfigDynamicFields").is_mma_login
//         ? !1
//         : c("qex")._("449") === !0;
//     }
//     function b() {
//       return d("BizKitConfigDynamicFields").is_ig_login ||
//         d("BizKitConfigDynamicFields").is_mma_login
//         ? !1
//         : c("qex")._("502") === !0;
//     }
//     function e(a) {
//       if (
//         d("BizKitConfigDynamicFields").is_ig_login ||
//         d("BizKitConfigDynamicFields").is_mma_login
//       )
//         return !1;
//       return a === !0 ? c("qex")._("963") === !0 : c("qex")._("660") === !0;
//     }
//     function f() {
//       return d("BizKitConfigDynamicFields").is_ig_login ||
//         d("BizKitConfigDynamicFields").is_mma_login
//         ? !1
//         : c("qex")._("680") === !0;
//     }
//     function i() {
//       return d("BizKitConfigDynamicFields").is_ig_login ||
//         d("BizKitConfigDynamicFields").is_mma_login
//         ? !1
//         : c("qex")._("351") === !0;
//     }
//     function j() {
//       var a = c("gkx")("3181");
//       if (a === !1) return !1;
//       a = "bm_settings_redirect_migration_storage_key";
//       var b = new URLSearchParams(window.location.search),
//         d = b.get("bm_redirect_migration");
//       b = b.get("nav_ref");
//       var e = !1,
//         f = (h || (h = c("WebStorage"))).getSessionStorage();
//       (f == null ? void 0 : f.getItem(a)) === "1" && (e = !0);
//       e === !1 &&
//         (d === "true" ||
//           b === "bm_settings_redirect_migration" ||
//           b === "bm_home_redirect") &&
//         (f == null ? void 0 : f.setItem(a, "1"), (e = !0));
//       e && (e = i());
//       return e;
//     }
//     g.getEligibleForBMToMBSLeftNav = a;
//     g.getEligibleForBMToMBSBizLevelHome = b;
//     g.getEligibleForBMToMBSJewelNotif = e;
//     g.getEligibleForBMToMBSScoping2 = f;
//     g.getEligibleForBMToMBSSettings = i;
//     g.getEnableBMSCIntegration = j;
//   },
//   98
// );

import BizKitConfigDynamicFields from "BizKitConfigDynamicFields";
import WebStorage from "WebStorage";
import gkx from "gkx";
import qex from "qex";

let sessionStorageInstance: Storage | null;

function getEligibleForBMToMBSLeftNav(): boolean {
  return (
    !BizKitConfigDynamicFields.is_ig_login &&
    !BizKitConfigDynamicFields.is_mma_login &&
    qex._("449") === true
  );
}

function getEligibleForBMToMBSBizLevelHome(): boolean {
  return (
    !BizKitConfigDynamicFields.is_ig_login &&
    !BizKitConfigDynamicFields.is_mma_login &&
    qex._("502") === true
  );
}

function getEligibleForBMToMBSJewelNotif(enableFlag: boolean): boolean {
  if (
    BizKitConfigDynamicFields.is_ig_login ||
    BizKitConfigDynamicFields.is_mma_login
  ) {
    return false;
  }
  return enableFlag ? qex._("963") === true : qex._("660") === true;
}

function getEligibleForBMToMBSScoping2(): boolean {
  return (
    !BizKitConfigDynamicFields.is_ig_login &&
    !BizKitConfigDynamicFields.is_mma_login &&
    qex._("680") === true
  );
}

function getEligibleForBMToMBSSettings(): boolean {
  return (
    !BizKitConfigDynamicFields.is_ig_login &&
    !BizKitConfigDynamicFields.is_mma_login &&
    qex._("351") === true
  );
}

function getEnableBMSCIntegration(): boolean {
  if (gkx("3181") === false) {
    return false;
  }

  const storageKey = "bm_settings_redirect_migration_storage_key";
  const urlParams = new URLSearchParams(window.location.search);
  const bmRedirectMigration = urlParams.get("bm_redirect_migration");
  const navRef = urlParams.get("nav_ref");

  let isEligible = false;
  if (!sessionStorageInstance) {
    sessionStorageInstance = WebStorage.getSessionStorage();
  }

  if (sessionStorageInstance?.getItem(storageKey) === "1") {
    isEligible = true;
  } else if (
    bmRedirectMigration === "true" ||
    navRef === "bm_settings_redirect_migration" ||
    navRef === "bm_home_redirect"
  ) {
    sessionStorageInstance?.setItem(storageKey, "1");
    isEligible = true;
  }

  if (isEligible) {
    isEligible = getEligibleForBMToMBSSettings();
  }

  return isEligible;
}

export {
  getEligibleForBMToMBSLeftNav,
  getEligibleForBMToMBSBizLevelHome,
  getEligibleForBMToMBSJewelNotif,
  getEligibleForBMToMBSScoping2,
  getEligibleForBMToMBSSettings,
  getEnableBMSCIntegration,
};
