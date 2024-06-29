/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import __debug from "__debug";
import BootloaderConfig from "BootloaderConfig";
import BootloaderDocumentInserter from "BootloaderDocumentInserter";
import BootloaderEndpoint from "BootloaderEndpoint";
import BootloaderEvents from "BootloaderEvents";
import BootloaderEventsManager from "BootloaderEventsManager";
import BootloaderPreloader from "BootloaderPreloader";
import BootloaderRetryTracker from "BootloaderRetryTracker";
import clearTimeout from "clearTimeout";
import ClientConsistency from "ClientConsistency";
import CSRBitMap from "CSRBitMap";
import CSRIndexUtil from "CSRIndexUtil";
import CSSLoader from "CSSLoader";
import err from "err";
import ErrorPubSub from "ErrorPubSub";
import ExecutionEnvironment from "ExecutionEnvironment";
import fbError from "fb-error";
import FBLogger from "FBLogger";
import ifRequireable from "ifRequireable";
import ifRequired from "ifRequired";
import invariant from "invariant";
import JSResourceReferenceImpl from "JSResourceReferenceImpl";
import JSScheduler from "JSScheduler";
import MakeHasteTranslations from "MakeHasteTranslations";
import NetworkStatus from "NetworkStatus";
import nullthrows from "nullthrows";
import performanceAbsoluteNow from "performanceAbsoluteNow";
import performanceNow from "performanceNow";
import promiseDone from "promiseDone";
import RequireDeferredReference from "RequireDeferredReference";
import ResourceHasher from "ResourceHasher";
import ResourceTimingsStore from "ResourceTimingsStore";
import setTimeoutAcrossTransitions from "setTimeoutAcrossTransitions";
import SiteData from "SiteData";
import TimeSlice from "TimeSlice";
import TrustedTypesBootloaderDataURIScriptURLPolicy from "TrustedTypesBootloaderDataURIScriptURLPolicy";
import TrustedTypesMetaURIScriptURLPolicy from "TrustedTypesMetaURIScriptURLPolicy";

let j;
let k;
let l;
const m = () => {};
const n = new Set();
let o = !!BootloaderConfig.deferBootloads;
o &&
  !window.__comet_ssr_is_server_env_DO_NOT_USE &&
  setTimeoutAcrossTransitions(() => {
    Bootloader.undeferBootloads(true);
  }, 15000);
const p = [];
const q = new Map();
const r = new Map();
const s = new Map();
const t = new Map();
const u = new Map();
const v = new Map();
const w = new Map();
const x = new Map();
const y = new Map();
const z = new Set();
let A = false;
const B = new Set();
let C = false;
const D = new BootloaderEventsManager();
const E = new BootloaderRetryTracker({
  retries: BootloaderConfig.jsRetries,
  abortNum: BootloaderConfig.jsRetryAbortNum,
  abortTime: BootloaderConfig.jsRetryAbortTime,
  abortCallback: () => {
    FBLogger("bootloader", "js_retry_abort").info("JS retry abort");
  },
});

ErrorPubSub.unshiftListener((a) => {
  const b = [];
  for (const [g, _v1] of r) {
    if (s.has(g)) continue;
    const f = I(g);
    if (f.type === "csr" || f.type === "async") continue;
    b.push(f.src);
  }
  a.loadingUrls = b;
});

const F = (a) => {
  if (o || !C) return false;
  for (const d of a) {
    const dResource = u.get(d);
    if (!dResource) return false;
    const dependencies = [
      dResource.r,
      dResource.rdfds?.r || [],
      dResource.rds?.r || [],
    ];
    for (const e of dependencies) {
      for (const h of e) {
        if (!v.has(h)) return false;
      }
    }
  }
  return true;
};

const G = (a) => {
  const b = u.get(a);
  if (!b)
    throw fbError.TAAL.blameToPreviousFile(
      err(`Bootloader: ${a} is not in the component map`)
    );
  return b;
};

const H = (a) => {
  const b = G(a);
  if (b.be) {
    delete b.be;
    Bootloader.done(ResourceHasher.getAsyncHash(a));
  }
};

const I = (a) => {
  const b = v.get(a);
  if (!b)
    throw fbError.TAAL.blameToPreviousFile(
      err(`No resource entry for hash: ${a}`)
    );
  return b;
};

const J = (a, b) => {
  const c = ResourceHasher.getAsyncHash(a);
  if (!v.has(c)) v.set(c, { type: "async", module: a, blocking: !!b });
  else {
    const aResource = I(c);
    invariant(aResource.type === "async");
    if (aResource.blocking && !b) aResource.blocking = false;
  }
  return c;
};

const K = (a) => !V(a);

// const f = (a) => {
//   if (!K(a)) return false;
//   const aResource = G(a);
//   return !!aResource.be;
// };

const L = (a, b, d) => {
  const e = (j || (j = performanceAbsoluteNow))();
  const f = b.src;
  const g = ResourceTimingsStore.getUID("js", f);
  ResourceTimingsStore.annotate("js", g)
    .addStringAnnotation("name", a)
    .addStringAnnotation("source", f);
  ResourceTimingsStore.measureRequestSent("js", g);
  nullthrows(this.bl_worker_import_wrapper)(f)
    .then(() => {
      const b = E.getNumRetriesForSource(f);
      if (b > 0)
        FBLogger("bootloader").info(
          `JS retry success [${a}] at ${f} | time: ${
            (j || (j = performanceAbsoluteNow))() - e
          } | retries: ${b}`
        );
      ResourceTimingsStore.measureResponseReceived("js", g);
      d();
    })
    .catch((h) => {
      ResourceTimingsStore.measureResponseReceived("js", g);
      const i = (j || (j = performanceAbsoluteNow))();
      E.maybeScheduleRetry(
        f,
        () => L(a, b, d),
        () => {
          t.set(a, i);
          FBLogger("bootloader")
            .catching(h)
            .warn(
              `JS loading error [${a}] at ${f} | time: ${
                i - e
              } | retries: ${E.getNumRetriesForSource(f)} | concurrency: ${
                r.size - s.size
              }`
            );
          NetworkStatus.reportError();
          d();
        }
      );
    });
};

// eslint-disable-next-line max-params
const M = (a, b, d, e) => {
  if ((k || (k = ExecutionEnvironment)).isInWorker) {
    L(a, b, d);
    return;
  }
  const f = document.createElement("script");
  if (b.d)
    f.src = TrustedTypesBootloaderDataURIScriptURLPolicy.createScriptURL(b.src);
  else f.src = TrustedTypesMetaURIScriptURLPolicy.createScriptURL(b.src);
  f.async = true;
  if (!b.nc) f.crossOrigin = "anonymous";
  if (b.m !== null) f.dataset.btmanifest = b.m;
  if (b.tsrc !== null) f.dataset.tsrc = b.tsrc;
  f.dataset.bootloaderHashClient = a;
  N(f, a, b, d);
  nullthrows(e).appendChild(f);
};

// eslint-disable-next-line max-params
const N = (a, b, d, e) => {
  const f = a.src;
  const g = (j || (j = performanceAbsoluteNow))();
  const h = TimeSlice.getGuardedContinuation("Bootloader script.onresponse");
  const i = ResourceTimingsStore.getUID("js", f);
  ResourceTimingsStore.annotate("js", i)
    .addStringAnnotation("name", b)
    .addStringAnnotation("source", f);
  ifRequireable("TimeSliceInteraction", (a) => {
    a.informGlobally("bootloader._loadJS")
      .addStringAnnotation("source", f)
      .addStringAnnotation("name", b);
  });
  ResourceTimingsStore.measureRequestSent("js", i);
  a.onload = h.bind(void 0, () => {
    const a = E.getNumRetriesForSource(f);
    if (a > 0)
      FBLogger("bootloader").info(
        `JS retry success [${b}] at ${f} | time: ${
          (j || (j = performanceAbsoluteNow))() - g
        } | retries: ${a}`
      );
    ResourceTimingsStore.measureResponseReceived("js", i);
    e();
  });
  a.onerror = h.bind(void 0, () => {
    ResourceTimingsStore.measureResponseReceived("js", i);
    const h = (j || (j = performanceAbsoluteNow))();
    E.maybeScheduleRetry(
      f,
      () => {
        const c = a.parentNode;
        if (c) {
          c.removeChild(a);
          M(b, d, e, c);
        }
      },
      () => {
        t.set(b, h);
        FBLogger("bootloader").warn(
          `JS loading error [${b}] at ${f} | time: ${
            h - g
          } | retries: ${E.getNumRetriesForSource(f)} | concurrency: ${
            r.size - s.size
          }`
        );
        NetworkStatus.reportError();
        e();
      }
    );
  });
};

const O = (a, b, d) => () => {
  FBLogger("bootloader").warn(
    `CSS timeout [${a}] at ${b.src} | concurrency: ${r.size - s.size}`
  );
  t.set(a, (j || (j = performanceAbsoluteNow))());
  NetworkStatus.reportError();
  d();
};

// eslint-disable-next-line max-params
const P = (a, b, c, d) => {
  if (!b.includes("/rsrc.php") || b.includes("/intern/rsrc.php")) return [];
  const regexResult = b.match(/(.*\/)([^.]+)(\.)/);
  const base64String = regexResult ? regexResult[2] : null;
  if (!base64String) return [];
  const filtered =
    base64String.match(/.{1,11}/g)?.filter((b, e) => !c.has(e) && a[e] > d) ||
    [];
  return filtered;
};

const Q = (a, b) => {
  let c = a.replace(/\/y[a-zA-Z0-9_-]\//, "/");
  if (
    c.includes("/intern/rsrc.php") ||
    c.includes("/intern/rsrc-translations.php")
  ) {
    return c.replace(
      /(!)(.+)(\.(?:css|js)(?:$|\?))/,
      // eslint-disable-next-line max-params
      (a, c, d, e) =>
        `${c}${d
          .split(",")
          .filter((a, c) => !b.has(c))
          .join(",")}${e}`
    );
  } else if (c.includes("/rsrc.php") || c.includes("/rsrc-translations.php")) {
    return c.replace(
      /(.*\/)([^.]+)(\.)/,
      // eslint-disable-next-line max-params
      (a, c, d, e) =>
        `${c}${d
          .match(/.{1,11}/g)
          .filter((a, c) => !b.has(c))
          .join("")}${e}`
    );
  } else {
    return a;
  }
};

// eslint-disable-next-line complexity, max-params
const R = (a, b, e, f) => {
  if (r.has(a)) return;
  r.set(a, (j || (j = performanceAbsoluteNow))());
  const g = [];
  if (
    (b.type === "js" || b.type === "css") &&
    b.p !== null &&
    b.d !== 1 &&
    BootloaderConfig.hypStep4
  ) {
    const i = CSRIndexUtil.parseCSRIndexes(b.p);
    const l = new Set();
    let m = 0;
    i.forEach((b, c) => {
      if (b !== CSRIndexUtil.UNKNOWN_RESOURCE_INDEX && w.get(b) !== a) {
        l.add(c);
      } else if (b > m) {
        m = b;
      }
    });
    if (m > BootloaderConfig.btCutoffIndex) {
      const n = P(i, b.src, l, BootloaderConfig.btCutoffIndex);
      BootloaderConfig.deferLongTailManifest
        ? g.push(n)
        : BootloaderEvents.notifyResourceInLongTailBTManifest(n, f);
    }
    if (l.size === i.length) return;
    if (l.size > 0) {
      b.src = Q(b.src, l);
      if (b.type === "js" && b.tsrc !== null && b.tsrc.trim() !== "") {
        b.tsrc = Q(nullthrows(b.tsrc), l);
      }
    }
  }
  if (b.type === "js" && b.tsrc !== null && b.tsrc.trim() !== "") {
    promiseDone(
      MakeHasteTranslations.genFetchAndProcessTranslations(
        a,
        nullthrows(b.tsrc)
      )
    );
  }
  BootloaderPreloader.preloadResource(b, e);
  switch (b.type) {
    case "js":
      M(
        a,
        b,
        () => {
          Bootloader.done(a);
          for (const c of g) {
            BootloaderEvents.notifyResourceInLongTailBTManifest(c, f);
          }
        },
        e
      );
      break;
    case "css":
      // eslint-disable-next-line no-case-declarations
      const n = () => Bootloader.done(a);
      if ((k || (k = ExecutionEnvironment)).isInWorker) {
        n();
        break;
      }
      CSSLoader.loadStyleSheet(a, b.src, nullthrows(e), !b.nc, n, O(a, b, n));
      break;
    case "async":
      BootloaderEndpoint.load(b.module, b.blocking, a);
      break;
    default:
      invariant(false);
  }
};

// eslint-disable-next-line max-params
const S = (a, b, e, f, g) => {
  const i = new Map();
  const j = g !== null ? g : BootloaderEvents.newResourceMapSet();
  const gArr = [];
  const kArr = [];
  const lArr = [];
  for (const [p, o] of W(a)) {
    let q;
    switch (o.type) {
      case "css":
        q = o.nonblocking ? "nonblocking" : "blocking";
        break;
      case "js":
        q = "default";
        break;
      case "async":
        q = o.blocking ? "blocking" : "nonblocking";
        break;
      default:
        invariant(false);
    }
    j[q].set(p, o);
    const s = D.rsrcDone(p);
    lArr.push(s);
    if (q !== "nonblocking") {
      kArr.push(s);
      if (q === "blocking") {
        gArr.push(s);
      }
    }
    if (!r.has(p)) {
      i.set(p, o);
    }
  }
  const t = JSScheduler ? JSScheduler.scheduleLoggingPriCallback : (a) => a();
  const u = JSScheduler
    ? JSScheduler.getUserBlockingRunAtCurrentPriCallbackScheduler_DO_NOT_USE()
    : (a) => a();
  const v = b.onBlocking;
  const w = b.onAll;
  const x = b.onLog;
  if (v) {
    D.registerCallback(() => {
      u(v);
    }, gArr);
  }
  if (w) {
    D.registerCallback(() => {
      u(w);
    }, kArr);
  }
  if (x) {
    D.registerCallback(() => {
      t(() => x(j));
    }, lArr);
  }
  for (const [m, a] of i) {
    R(m, a, e, f);
  }
};

const T = (a, b) => {
  v.set(a, b);
  if (b.type === "async" || b.type === "csr") return;
  const f = b.p;
  if (f) {
    const fArr = CSRIndexUtil.parseCSRIndexes(f);
    for (const i of fArr) {
      if (i === CSRIndexUtil.UNKNOWN_RESOURCE_INDEX) continue;
      if (!w.has(i) || b.c) w.set(i, a);
      if (BootloaderConfig.phdOn ? b.c === 2 : b.c) CSRBitMap.add(i);
    }
  }
};

const U = (a, b) => {
  const e = D.bootload(b);
  if (z.has(e)) return [e, null];
  z.add(e);
  const f = (j || (j = performanceAbsoluteNow))();
  b = {
    ref: a,
    components: b,
    timesliceContext: TimeSlice.getContext(),
    startTime: q.get(e) ?? f,
    fetchStartTime: f,
    callbackStart: 0,
    callbackEnd: 0,
    tierOne: BootloaderEvents.newResourceMapSet(),
    tierTwo: BootloaderEvents.newResourceMapSet(),
    tierThree: BootloaderEvents.newResourceMapSet(),
    beRequests: new Map(),
  };
  BootloaderEvents.notifyBootloadStart(b);
  return [e, b];
};

const aa = (a) =>
  ifRequired(
    a,
    () => true,
    () => false
  );

const V = (a) =>
  ifRequireable(
    a,
    () => true,
    () => false
  );

// eslint-disable-next-line max-params
const ba = (a, b, f, g) => {
  if (!y.has(a)) {
    y.set(a, {
      firstBootloadStart: (j || (j = performanceAbsoluteNow))(),
      logData: new Set(),
    });
  }
  if (g) nullthrows(y.get(a)).logData.add(g);
  const h = G(a);
  const i = h.r;
  const k = h.rdfds;
  const l = h.rds;
  const hBe = h.be;
  const hRes = K(a) ? J(a, hBe) : null;
  if (hRes === null) D.notify(D.beDone(a));
  S(
    hRes !== null ? [hRes, ...i] : i,
    {
      onAll: () => D.notify(D.tierOne(a)),
      onLog: () => D.notify(D.tierOneLog(a)),
    },
    f,
    a,
    g?.tierOne
  );
  const m = k?.m ?? [];
  const n = (d) => {
    S(
      k?.r ?? [],
      {
        onBlocking: () => RequireDeferredReference.unblock(m, "css"),
        onAll: () =>
          D.registerCallback(() => {
            D.notify(D.tierTwoStart(a));
            // eslint-disable-next-line no-useless-call
            this.call(
              null,
              m.map(RequireDeferredReference.getRDModuleName_DO_NOT_USE),
              () => D.notify(D.tierTwo(a))
            );
          }, [D.tierOne(a), b]),
        onLog: () => D.notify(D.tierTwoLog(a)),
      },
      d,
      a,
      g?.tierTwo
    );
  };
  if (
    BootloaderConfig.tieredLoadingFromTier !== null &&
    BootloaderConfig.tieredLoadingFromTier <= 2
  ) {
    D.registerCallback(
      () => BootloaderDocumentInserter.batchDOMInsert(n),
      [D.tierOne(a)]
    );
  } else {
    n(f);
  }
  const o = l?.m ?? [];
  const p = (b) => {
    S(
      l?.r ?? [],
      {
        onBlocking: () => RequireDeferredReference.unblock(o, "css"),
        onAll: () =>
          D.registerCallback(() => {
            D.notify(D.tierThreeStart(a));
            // eslint-disable-next-line no-useless-call
            this.call(
              null,
              o.map(RequireDeferredReference.getRDModuleName_DO_NOT_USE),
              () => D.notify(D.tierThree(a))
            );
          }, [D.tierTwo(a)]),
        onLog: () => D.notify(D.tierThreeLog(a)),
      },
      b,
      a,
      g?.tierThree
    );
  };
  if (
    BootloaderConfig.tieredLoadingFromTier !== null &&
    BootloaderConfig.tieredLoadingFromTier <= 3
  ) {
    D.registerCallback(
      () => BootloaderDocumentInserter.batchDOMInsert(p),
      [D.tierTwo(a)]
    );
  } else {
    p(f);
  }
};

const W = (a) => {
  const b = new Map();
  for (const f of a) {
    const g = v.get(f);
    if (!g) {
      FBLogger("bootloader").mustfix(`Unable to resolve resource ${f}.`);
      continue;
    }
    let i;
    if (g.type === "csr") {
      i = CSRIndexUtil.parseCSRIndexes(g.src);
    } else if (g.p) {
      i = CSRIndexUtil.parseCSRIndexes(g.p);
      if (i.includes(CSRIndexUtil.UNKNOWN_RESOURCE_INDEX)) b.set(f, g);
      i = i.filter((a) => a !== CSRIndexUtil.UNKNOWN_RESOURCE_INDEX);
    } else {
      b.set(f, g);
      continue;
    }
    for (const j of i) {
      const k = w.get(j);
      if (k === null) {
        const l = JSON.stringify(
          a.map((b) => {
            const a = I(b);
            let c;
            if (a.type === "js" || a.type === "css") {
              c = a.d ? "" : a.src.split("?")[0];
            } else {
              c = a.src;
            }
            return JSON.stringify({
              ...{ hash: b, rev: x.get(b) },
              ...a,
              src: c,
              tsrc: null,
            });
          })
        );
        throw FBLogger("bootloader", "missing-index-map").mustfixThrow(
          `No hash for rsrcIndex ${j} (rev: ${SiteData.client_revision}, cohort: ${SiteData.pkg_cohort}). ${l}`
        );
      }
      const jResource = I(k);
      invariant(jResource.type === "csr");
      b.set(k, jResource);
    }
  }
  return b.entries();
};

// eslint-disable-next-line complexity
const X = (a) => {
  const b = a.getAttribute("data-bootloader-hash");
  if (b === null) return;
  const e = ResourceHasher.getValidResourceHash(b);
  if (a.id) {
    if (B.has(a.id)) return;
    B.add(a.id);
  }
  const bData =
    a.tagName === "SCRIPT"
      ? { src: a.src, type: "js" }
      : { src: a.href, type: "css" };
  if (a.crossOrigin === null) bData.nc = 1;
  if (
    bData.type === "js" &&
    a.dataset.tsrc !== null &&
    a.dataset.tsrc.trim() !== ""
  ) {
    bData.tsrc = a.dataset.tsrc;
    promiseDone(
      MakeHasteTranslations.genFetchAndProcessTranslations(e, bData.tsrc)
    );
  }
  if (bData.type === "css" && a.getAttribute("data-nonblocking"))
    bData.nonblocking = 1;
  const f = a.getAttribute("data-c");
  if (f === "1") bData.c = 1;
  else if (f === "2") bData.c = 2;
  const fAttr = a.getAttribute("data-p");
  if (fAttr !== null) {
    bData.p = fAttr;
    const fArr = CSRIndexUtil.parseCSRIndexes(fAttr);
    const maxF = Math.max(...fArr);
    if (maxF > BootloaderConfig.btCutoffIndex) {
      BootloaderEvents.notifyResourceInLongTailBTManifest(
        P(fArr, bData.src, new Set(), BootloaderConfig.btCutoffIndex),
        "pickupPageResource"
      );
    }
  }
  const g = a.getAttribute("data-btmanifest");
  if (g !== null) bData.m = g;
  if (v.has(e) && !BootloaderConfig.silentDups) {
    FBLogger("bootloader").warn(`Duplicate resource [${e}]: ${bData.src}`);
  }
  T(e, bData, true);
  r.set(e, (j || (j = performanceAbsoluteNow))());
  const fFunc = () => Bootloader.done(e);
  const gAttr =
    bData.type === "js"
      ? !a.getAttribute("async")
      : a.parentNode?.tagName === "HEAD";
  if (gAttr || (window._btldr && window._btldr[e])) {
    fFunc();
  } else if (bData.type === "js") {
    N(a, e, bData, fFunc);
  } else {
    CSSLoader.setupEventListeners(
      e,
      bData.src,
      BootloaderDocumentInserter.getDOMContainerNode(),
      fFunc,
      O(e, bData, fFunc),
      null
    );
  }
};

const Y = () => {
  if (A) return;
  A = true;
  if (!ExecutionEnvironment.canUseDOM || ExecutionEnvironment.isInWorker)
    return;
  Array.from(document.getElementsByTagName("link")).forEach((a) => X(a));
  Array.from(document.getElementsByTagName("script")).forEach((a) => X(a));
};

const Z = () => {
  C = true;
  const a = p;
  p.length = 0;
  a.forEach(([b, c, d, e]) => {
    e(() => {
      Bootloader.loadModules(b, c, d);
    });
  });
};

const Bootloader = {
  loadModules: (a, b = m, f = "loadModules: unknown caller") => {
    const g = a;
    let h;
    let i = false;
    const k = (...args) => {
      clearTimeout(h);
      if (!i) b(...args);
    };
    const aObj = {
      remove: () => {
        i = true;
      },
    };
    if (BootloaderConfig.fastPathForAlreadyRequired && g.every((a) => V(a))) {
      e(g, (...args) => {
        k(...args);
      });
      return aObj;
    }
    if (!F(g)) {
      const l = "Deferred: Bootloader.loadModules";
      const lFunc = TimeSlice.getGuardedContinuation(l);
      p.push([g, k, f, lFunc]);
      const lRes = D.bootload(g);
      q.set(lRes, q.get(lRes) ?? (j || (j = performanceAbsoluteNow))());
      return aObj;
    }
    const [n, o] = U(f, g);
    D.registerCallback(
      e.bind(null, g, (...args) => {
        if (o) {
          o.callbackStart = (j || (j = performanceAbsoluteNow))();
        }
        k(...args);
        if (o) {
          o.callbackEnd = (j || (j = performanceAbsoluteNow))();
        }
        D.notify(n);
      }),
      g.map((a) => D.tierOne(a))
    );
    BootloaderDocumentInserter.batchDOMInsert((b) => {
      for (const a of g) {
        ba(a, n, b, o);
      }
    });
    if (o) {
      const lSet = new Set([n]);
      for (const r of g) {
        lSet.add(D.beDone(r));
        lSet.add(D.tierThree(r));
        lSet.add(D.tierOneLog(r));
        lSet.add(D.tierTwoLog(r));
        lSet.add(D.tierThreeLog(r));
      }
      D.registerCallback(
        () => BootloaderEvents.notifyBootload(o),
        Array.from(lSet)
      );
      ifRequireable("TimeSliceInteraction", (a) => {
        a.informGlobally("Bootloader.loadResources")
          .addSetAnnotation(
            "requested_hashes",
            Array.from(BootloaderEvents.flattenResourceMapSet(o.tierOne).keys())
          )
          .addSetAnnotation(
            "rdfd_requested_hashes",
            Array.from(BootloaderEvents.flattenResourceMapSet(o.tierTwo).keys())
          )
          .addSetAnnotation(
            "rd_requested_hashes",
            Array.from(
              BootloaderEvents.flattenResourceMapSet(o.tierThree).keys()
            )
          )
          .addStringAnnotation("bootloader_reference", f)
          .addSetAnnotation("requested_components", g);
      });
      h = setTimeoutAcrossTransitions(() => {
        BootloaderEvents.notifyBootloaderCallbackTimeout(o);
      }, BootloaderConfig.timeout);
    }
    return aObj;
  },
  loadResources: (a, b) => {
    Y();
    BootloaderDocumentInserter.batchDOMInsert((c) => {
      S(
        a.map((a) => ResourceHasher.getValidResourceHash(a)),
        b || Object.freeze({}),
        c,
        "loadResources"
      );
    });
  },
  requestJSResource_UNSAFE_NEEDS_REVIEW_BY_SECURITY_AND_XFN: (a) => {
    const b = ResourceHasher.createExternalJSHash();
    T(b, { type: "js", src: a, nc: 1 }, false);
    Bootloader.loadResources([b]);
  },
  done: (a) => {
    s.set(a, (j || (j = performanceAbsoluteNow))());
    D.notify(D.rsrcDone(a));
  },
  beDone: (a, b, c) => {
    const dSet = y.get(a)?.logData ?? new Set();
    for (const g of dSet) {
      g.beRequests.set(b, c);
    }
    D.notify(D.beDone(a));
  },
  handlePayload: (a, b) => {
    const e = a.rsrcTags ?? [];
    for (const h of e) {
      X(document.getElementById(h));
    }
    const f = a.consistency?.rev ?? null;
    Bootloader.setResourceMap(a.rsrcMap ?? {}, a.sotUpgrades, f, b);
    const hArr = a.csrUpgrade ? CSRIndexUtil.parseCSRIndexes(a.csrUpgrade) : [];
    const g = hArr.find((a) => !w.has(a));
    if (hArr.length && f !== null && f !== SiteData.client_revision) {
      FBLogger("bootloader", "csr-mismatch").warn(
        `CSR upgrades included on mismatched rev ${f} (client rev: ${SiteData.client_revision}, cohort: ${SiteData.pkg_cohort}).`
      );
    } else if (g !== null && A) {
      FBLogger("bootloader", "missing-csr-upgrade").warn(
        `CSR upgrades included unknown rsrcIndex ${g} (client rev: ${SiteData.client_revision}, cohort: ${SiteData.pkg_cohort}).`
      );
    } else {
      hArr.forEach(CSRBitMap.add);
    }
    if (a.compMap) {
      Bootloader.enableBootload(a.compMap, b);
    }
  },
  enableBootload: (a, b) => {
    // eslint-disable-next-line guard-for-in
    for (const c in a) {
      if (b) b.comp++;
      if (!u.has(c)) {
        u.set(c, a[c]);
        if (n.has(c)) {
          n.delete(c);
          H(c);
        }
      } else {
        if (b) b.dup_comp++;
      }
    }
    Y();
    if (!o) Z();
  },
  undeferBootloads: (a = false) => {
    if (window.location.search.includes("&__deferBootloads=")) return;
    if (a && o) {
      BootloaderEvents.notifyDeferTimeout({
        componentMapSize: u.size,
        pending: p.map(([b, c, d]) => ({ components: b, ref: d })),
        time: (l || (l = performanceNow))(),
      });
    }
    o = false;
    if (u.size) Z();
  },
  markComponentsAsImmediate: (a) => {
    for (const c of a) {
      if (u.has(c)) H(c);
      else n.add(c);
    }
  },
  // eslint-disable-next-line max-params
  setResourceMap: (a, b, e, f) => {
    let g = false;
    // eslint-disable-next-line guard-for-in
    for (const h in a) {
      if (f) f.rsrc++;
      const validHash = ResourceHasher.getValidResourceHash(h);
      if (e !== null) x.set(validHash, e);
      const i = a[validHash];
      const j = v.get(validHash);
      if (!j) {
        if (i.type === "js") g = true;
        T(validHash, i, false);
      } else {
        if (f) f.dup_rsrc++;
        if (
          (j.type === "js" && i.type === "js") ||
          (j.type === "css" && i.type === "css")
        ) {
          if (i.d && !j.d) {
            if (i.type === "js") g = true;
            j.src = i.src;
            j.d = 1;
          }
        }
      }
    }
    if (g && e !== null) ClientConsistency.addAdditionalRevision(e);
    if (b) {
      for (const f of b) {
        const g = v.get(f);
        if (g) T(f, g, true);
      }
    }
  },
  getURLToHashMap: () => {
    const a = new Map();
    for (const [f, e] of v) {
      if (e.type === "async" || e.type === "csr") continue;
      a.set(e.src, f);
    }
    return a;
  },
  loadPredictedResourceMap: (a, b, c) => {
    Bootloader.setResourceMap(a, null, c);
    Bootloader.loadResources(Object.keys(a), b);
  },
  getCSSResources: (a) => {
    const b = [];
    for (const [f, e] of W(a)) {
      if (e.type === "css") b.push(f);
    }
    return b;
  },
  getBootloadPendingComponents: () => {
    const a = new Map();
    for (const [e, _f] of y) {
      if (!aa(e)) a.set(e, Bootloader.getComponentDebugState(e));
    }
    return a;
  },
  getComponentDebugState: (a) => {
    const b = (a) => !!D.getEventTime(a);
    return {
      phases: {
        tierOne: b(D.tierOne(a)),
        tierTwo: b(D.tierTwo(a)),
        tierThree: b(D.tierThree(a)),
        beDone: b(D.beDone(a)),
      },
      unresolvedDeps: __debug.debugUnresolvedDependencies([a]),
      nonJSDeps: __debug.modulesMap[a]?.nonJSDeps,
      hasError: __debug.modulesMap[a]?.hasError,
    };
  },
  getBootloadedComponents: () => {
    const a = new Map();
    for (const [f, e] of y) {
      a.set(f, e.firstBootloadStart);
    }
    return a;
  },
  notifyManuallyLoadedResourcesInWorker: (a, b) => {
    // eslint-disable-next-line guard-for-in
    for (const e in a) {
      const f = ResourceHasher.getValidResourceHash(e);
      const g = a[f];
      if (g.type === "js" || g.type === "css") {
        if (v.has(f) && !BootloaderConfig.silentDups) {
          FBLogger("bootloader").warn(
            `Duplicate manual resource [${f}]: ${g.src}`
          );
        }
        T(f, g, true);
        if (g.type === "js" && g.tsrc !== null && g.tsrc.trim() !== "") {
          promiseDone(
            MakeHasteTranslations.genFetchAndProcessTranslations(
              f,
              nullthrows(g.tsrc)
            )
          );
        }
        r.set(f, (j || (j = performanceAbsoluteNow))());
        const h = () => Bootloader.done(f);
        const eRes = b[f];
        if (g.type === "js" && eRes) {
          promiseDone(eRes, h, () => {
            L(f, g, h);
          });
        } else {
          h();
        }
      }
    }
  },
  getResourceState: (a) => ({
    loadStart: r.get(a),
    loadEnd: s.get(a),
    loadError: t.get(a),
  }),
  getComponentTiming: (a) => {
    let b;
    // eslint-disable-next-line no-return-assign
    return {
      tierTwoStart: (b = D.getEventTime(D.tierTwoStart(a))) !== null ? b : 0,
      tierTwoEnd: (b = D.getEventTime(D.tierTwo(a))) !== null ? b : 0,
      tierThreeStart:
        (b = D.getEventTime(D.tierThreeStart(a))) !== null ? b : 0,
      tierThreeEnd: (b = D.getEventTime(D.tierThree(a))) !== null ? b : 0,
    };
  },
  getLoadedResourceCount: () => s.size,
  getErrorCount: () => t.size,
  forceFlush: () => {
    BootloaderEndpoint.forceFlush();
  },
  __debug: {
    componentMap: u,
    requested: r,
    resources: v,
    riMap: w,
    retries: E.getAllRetryAttempts_FOR_DEBUG_ONLY(),
    errors: t,
    loaded: s,
    bootloaded: y,
    queuedToMarkAsImmediate: n,
    _resolveCSRs: W,
    revMap: x,
    _getQueuedLoadModules: () => p,
    _dequeueLoadModules: (a) => {
      const aRes = p.splice(a, 1);
      if (!aRes.length) return;
      const [b, c, d, e] = aRes[0];
      const oState = o;
      const CState = C;
      o = false;
      C = true;
      e(() => {
        Bootloader.loadModules(b, c, d);
      });
      o = oState;
      C = CState;
    },
  },
};

JSResourceReferenceImpl.setBootloader(Bootloader);
export default Bootloader;
