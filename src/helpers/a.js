/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
__d(
  "Bootloader",
  [
    "invariant",
    "BootloaderConfig",
    "BootloaderDocumentInserter",
    "BootloaderEndpoint",
    "BootloaderEvents",
    "BootloaderEventsManager",
    "BootloaderPreloader",
    "BootloaderRetryTracker",
    "CSRBitMap",
    "CSRIndexUtil",
    "CSSLoader",
    "ClientConsistency",
    "ErrorPubSub",
    "ExecutionEnvironment",
    "FBLogger",
    "JSResourceReferenceImpl",
    "MakeHasteTranslations",
    "NetworkStatus",
    "RequireDeferredReference",
    "ResourceHasher",
    "ResourceTimingsStore",
    "SiteData",
    "TimeSlice",
    "TrustedTypesBootloaderDataURIScriptURLPolicy",
    "TrustedTypesMetaURIScriptURLPolicy",
    "__debug",
    "clearTimeout",
    "cr:696703",
    "err",
    "fb-error",
    "ifRequireable",
    "ifRequired",
    "nullthrows",
    "performanceAbsoluteNow",
    "performanceNow",
    "promiseDone",
    "setTimeoutAcrossTransitions",
  ],
  (a, b, c, d, e, f, g, h) => {
    let i;
    let j;
    let k;
    let l;
    let m = function () {};
    let n = new Set();
    let o = !!c("BootloaderConfig").deferBootloads;
    o &&
      !a.__comet_ssr_is_server_env_DO_NOT_USE &&
      c("setTimeoutAcrossTransitions")(() => {
        $.undeferBootloads(!0);
      }, 15e3);
    let p = [];
    let q = new Map();
    let r = new Map();
    let s = new Map();
    let t = new Map();
    let u = new Map();
    let v = new Map();
    let w = new Map();
    let x = new Map();
    let y = new Map();
    let z = new Set();
    let A = !1;
    let B = new Set();
    let C = !1;
    let D = new (c("BootloaderEventsManager"))();
    let E = new (c("BootloaderRetryTracker"))({
      retries: c("BootloaderConfig").jsRetries,
      abortNum: c("BootloaderConfig").jsRetryAbortNum,
      abortTime: c("BootloaderConfig").jsRetryAbortTime,
      abortCallback: function () {
        c("FBLogger")("bootloader", "js_retry_abort").info("JS retry abort");
      },
    });
    (i || (i = c("ErrorPubSub"))).unshiftListener((a) => {
      let b = [];
      for (
        var c = r,
          d = Array.isArray(c),
          e = 0,
          c = d
            ? c
            : c[
                typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
              ]();
        ;

      ) {
        var f;
        if (d) {
          if (e >= c.length) break;
          f = c[e++];
        } else {
          e = c.next();
          if (e.done) break;
          f = e.value;
        }
        f = f;
        let g = f[0];
        f[1];
        if (s.has(g)) continue;
        f = I(g);
        if (f.type === "csr" || f.type === "async") continue;
        b.push(f.src);
      }
      a.loadingUrls = b;
    });
    function F(a) {
      if (o || !C) return !1;
      for (let b = 0; b < a.length; b++) {
        var c;
        let d = a[b];
        d = u.get(d);
        if (!d) return !1;
        d = [
          d.r,
          ((c = d.rdfds) == null ? void 0 : c.r) || [],
          ((c = d.rds) == null ? void 0 : c.r) || [],
        ];
        for (c = 0; c < d.length; c++) {
          var e = d[c];
          for (
            var e = e,
              f = Array.isArray(e),
              g = 0,
              e = f
                ? e
                : e[
                    typeof Symbol === "function"
                      ? Symbol.iterator
                      : "@@iterator"
                  ]();
            ;

          ) {
            var h;
            if (f) {
              if (g >= e.length) break;
              h = e[g++];
            } else {
              g = e.next();
              if (g.done) break;
              h = g.value;
            }
            h = h;
            if (!v.has(h)) return !1;
          }
        }
      }
      return !0;
    }
    function G(a) {
      let b = u.get(a);
      if (!b)
        throw c("fb-error").TAAL.blameToPreviousFile(
          c("err")("Bootloader: %s is not in the component map", a)
        );
      return b;
    }
    function H(a) {
      let b = G(a);
      b.be && (delete b.be, $.done(d("ResourceHasher").getAsyncHash(a)));
    }
    function I(a) {
      let b = v.get(a);
      if (!b)
        throw c("fb-error").TAAL.blameToPreviousFile(
          c("err")("No resource entry for hash: %s", a)
        );
      return b;
    }
    function J(a, b) {
      let c = d("ResourceHasher").getAsyncHash(a);
      if (!v.has(c)) v.set(c, { type: "async", module: a, blocking: !!b });
      else {
        a = I(c);
        a.type === "async" || h(0, 21557);
        a.blocking && !b && (a.blocking = !1);
      }
      return c;
    }
    function K(a) {
      return !V(a);
    }
    function f(a) {
      if (!K(a)) return !1;
      a = G(a);
      a = a.be;
      return !!a;
    }
    function L(a, b, d) {
      let e = (j || (j = c("performanceAbsoluteNow")))();
      let f = b.src;
      let g = c("ResourceTimingsStore").getUID("js", f);
      c("ResourceTimingsStore")
        .annotate("js", g)
        .addStringAnnotation("name", a)
        .addStringAnnotation("source", f);
      c("ResourceTimingsStore").measureRequestSent("js", g);
      c("nullthrows")(self.bl_worker_import_wrapper)(f)
        .then(() => {
          let b = E.getNumRetriesForSource(f);
          b > 0 &&
            c("FBLogger")("bootloader").info(
              "JS retry success [%s] at %s | time: %s | retries: %s",
              a,
              f,
              (j || (j = c("performanceAbsoluteNow")))() - e,
              b
            );
          c("ResourceTimingsStore").measureResponseReceived("js", g);
          d();
        })
        ["catch"]((h) => {
          c("ResourceTimingsStore").measureResponseReceived("js", g);
          let i = (j || (j = c("performanceAbsoluteNow")))();
          E.maybeScheduleRetry(
            f,
            () => {
              L(a, b, d);
            },
            () => {
              t.set(a, i),
                c("FBLogger")("bootloader")
                  .catching(h)
                  .warn(
                    "JS loading error [%s] at %s | time: %s | retries: %s | concurrency: %s",
                    a,
                    f,
                    i - e,
                    E.getNumRetriesForSource(f),
                    r.size - s.size
                  ),
                c("NetworkStatus").reportError(),
                d();
            }
          );
        });
    }
    function M(a, b, d, e) {
      if ((k || (k = c("ExecutionEnvironment"))).isInWorker) {
        L(a, b, d);
        return;
      }
      e = c("nullthrows")(e);
      let f = document.createElement("script");
      b.d
        ? (f.src = c(
            "TrustedTypesBootloaderDataURIScriptURLPolicy"
          ).createScriptURL(b.src))
        : (f.src = c("TrustedTypesMetaURIScriptURLPolicy").createScriptURL(
            b.src
          ));
      f.async = !0;
      b.nc || (f.crossOrigin = "anonymous");
      b.m != null && (f.dataset.btmanifest = b.m);
      b.tsrc != null && (f.dataset.tsrc = b.tsrc);
      f.dataset.bootloaderHashClient = a;
      N(f, a, b, d);
      e.appendChild(f);
      return;
    }
    function N(a, b, d, e) {
      let f = a.src;
      let g = (j || (j = c("performanceAbsoluteNow")))();
      let h = c("TimeSlice").getGuardedContinuation(
        "Bootloader script.onresponse"
      );
      let i = c("ResourceTimingsStore").getUID("js", f);
      c("ResourceTimingsStore")
        .annotate("js", i)
        .addStringAnnotation("name", b)
        .addStringAnnotation("source", f);
      c("ifRequireable")("TimeSliceInteraction", (a) => {
        a.informGlobally("bootloader._loadJS")
          .addStringAnnotation("source", f)
          .addStringAnnotation("name", b);
      });
      c("ResourceTimingsStore").measureRequestSent("js", i);
      a.onload = h.bind(void 0, () => {
        let a = E.getNumRetriesForSource(f);
        a > 0 &&
          c("FBLogger")("bootloader").info(
            "JS retry success [%s] at %s | time: %s | retries: %s",
            b,
            f,
            (j || (j = c("performanceAbsoluteNow")))() - g,
            a
          );
        c("ResourceTimingsStore").measureResponseReceived("js", i);
        e();
      });
      a.onerror = h.bind(void 0, () => {
        c("ResourceTimingsStore").measureResponseReceived("js", i);
        let h = (j || (j = c("performanceAbsoluteNow")))();
        E.maybeScheduleRetry(
          f,
          () => {
            let c = a.parentNode;
            c && (c.removeChild(a), M(b, d, e, c));
          },
          () => {
            t.set(b, h),
              c("FBLogger")("bootloader").warn(
                "JS loading error [%s] at %s | time: %s | retries: %s | concurrency: %s",
                b,
                f,
                h - g,
                E.getNumRetriesForSource(f),
                r.size - s.size
              ),
              c("NetworkStatus").reportError(),
              e();
          }
        );
      });
    }
    function O(a, b, d) {
      return function () {
        c("FBLogger")("bootloader").warn(
          "CSS timeout [%s] at %s | concurrency: %s",
          a,
          b.src,
          r.size - s.size
        ),
          t.set(a, (j || (j = c("performanceAbsoluteNow")))()),
          c("NetworkStatus").reportError(),
          d();
      };
    }
    function P(a, b, c, d) {
      if (!b.includes("/rsrc.php") || b.includes("/intern/rsrc.php")) return [];
      b = ((b = b.match(/(.*\/)([^.]+)(\.)/)) != null ? b : [])[2];
      return b == null
        ? []
        : (b =
            (b = b.match(/.{1,11}/g)) == null
              ? void 0
              : b.filter((b, e) => {
                  return !c.has(e) && a[e] > d;
                })) != null
        ? b
        : [];
    }
    function Q(a, b) {
      let c = a.replace(/\/y[a-zA-Z0-9_-]\//, "/");
      if (
        c.includes("/intern/rsrc.php") ||
        c.includes("/intern/rsrc-translations.php")
      )
        return c.replace(/(!)(.+)(\.(?:css|js)(?:$|\?))/, (a, c, d, e) => {
          return (
            c +
            d
              .split(",")
              .filter((a, c) => {
                return !b.has(c);
              })
              .join(",") +
            e
          );
        });
      else if (c.includes("/rsrc.php") || c.includes("/rsrc-translations.php"))
        return c.replace(/(.*\/)([^.]+)(\.)/, (a, c, d, e) => {
          return (
            c +
            d
              .match(/.{1,11}/g)
              .filter((a, c) => {
                return !b.has(c);
              })
              .join("") +
            e
          );
        });
      else return a;
    }
    function R(a, b, e, f) {
      if (r.has(a)) return;
      r.set(a, (j || (j = c("performanceAbsoluteNow")))());
      let g = [];
      if (
        (b.type === "js" || b.type === "css") &&
        b.p != null &&
        b.d !== 1 &&
        c("BootloaderConfig").hypStep4
      ) {
        let i = d("CSRIndexUtil").parseCSRIndexes(b.p);
        let l = new Set();
        let m = 0;
        i.forEach((b, c) => {
          b !== d("CSRIndexUtil").UNKNOWN_RESOURCE_INDEX && w.get(b) !== a
            ? l.add(c)
            : b > m && (m = b);
        });
        if (m > c("BootloaderConfig").btCutoffIndex) {
          var n = P(i, b.src, l, c("BootloaderConfig").btCutoffIndex);
          c("BootloaderConfig").deferLongTailManifest
            ? g.push(n)
            : d("BootloaderEvents").notifyResourceInLongTailBTManifest(n, f);
        }
        if (l.size === i.length) return;
        else
          l.size > 0 &&
            ((b.src = Q(b.src, l)),
            b.type === "js" &&
              b.tsrc != null &&
              b.tsrc.trim() !== "" &&
              (b.tsrc = Q(c("nullthrows")(b.tsrc), l)));
      }
      b.type === "js" &&
        b.tsrc != null &&
        b.tsrc.trim() !== "" &&
        c("promiseDone")(
          d("MakeHasteTranslations").genFetchAndProcessTranslations(
            a,
            c("nullthrows")(b.tsrc)
          )
        );
      d("BootloaderPreloader").preloadResource(b, e);
      switch (b.type) {
        case "js":
          M(
            a,
            b,
            () => {
              $.done(a);
              for (let b = 0; b < g.length; b++) {
                let c = g[b];
                d("BootloaderEvents").notifyResourceInLongTailBTManifest(c, f);
              }
            },
            e
          );
          break;
        case "css":
          n = function () {
            return $.done(a);
          };
          if ((k || (k = c("ExecutionEnvironment"))).isInWorker) {
            n();
            break;
          }
          c("CSSLoader").loadStyleSheet(
            a,
            b.src,
            c("nullthrows")(e),
            !b.nc,
            n,
            O(a, b, n)
          );
          break;
        case "async":
          c("BootloaderEndpoint").load(b.module, b.blocking, a);
          break;
        default:
          b.type, h(0, 3721);
      }
    }
    function S(a, c, e, f, g) {
      let i = new Map();
      let j = (g = g) != null ? g : d("BootloaderEvents").newResourceMapSet();
      g = [];
      let k = [];
      let l = [];
      for (
        var a = W(a),
          m = Array.isArray(a),
          n = 0,
          a = m
            ? a
            : a[
                typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
              ]();
        ;

      ) {
        var o;
        if (m) {
          if (n >= a.length) break;
          o = a[n++];
        } else {
          n = a.next();
          if (n.done) break;
          o = n.value;
        }
        o = o;
        var p = o[0];
        o = o[1];
        var q = void 0;
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
            o.type, h(0, 3721);
        }
        j[q].set(p, o);
        var s = D.rsrcDone(p);
        l.push(s);
        q !== "nonblocking" && (k.push(s), q === "blocking" && g.push(s));
        r.has(p) || i.set(p, o);
      }
      let t;
      let u;
      !b("cr:696703")
        ? (t = u =
            function (a) {
              return a();
            })
        : ((u = b("cr:696703").scheduleLoggingPriCallback),
          (t =
            b(
              "cr:696703"
            ).getUserBlockingRunAtCurrentPriCallbackScheduler_DO_NOT_USE()));
      let v = c.onBlocking;
      let w = c.onAll;
      let x = c.onLog;
      v &&
        D.registerCallback(() => {
          t(v);
        }, g);
      w &&
        D.registerCallback(() => {
          t(w);
        }, k);
      x &&
        D.registerCallback(() => {
          u(() => {
            return x(j);
          });
        }, l);
      for (
        q = i,
          s = Array.isArray(q),
          p = 0,
          q = s
            ? q
            : q[
                typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
              ]();
        ;

      ) {
        if (s) {
          if (p >= q.length) break;
          o = q[p++];
        } else {
          p = q.next();
          if (p.done) break;
          o = p.value;
        }
        n = o;
        m = n[0];
        a = n[1];
        R(m, a, e, f);
      }
    }
    function T(a, b, e) {
      v.set(a, b);
      if (b.type === "async" || b.type === "csr") return;
      var f = b.p;
      if (f)
        for (
          var f = d("CSRIndexUtil").parseCSRIndexes(f),
            g = Array.isArray(f),
            h = 0,
            f = g
              ? f
              : f[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
          var i;
          if (g) {
            if (h >= f.length) break;
            i = f[h++];
          } else {
            h = f.next();
            if (h.done) break;
            i = h.value;
          }
          i = i;
          if (i === d("CSRIndexUtil").UNKNOWN_RESOURCE_INDEX) continue;
          (!w.has(i) || e) && w.set(i, a);
          (c("BootloaderConfig").phdOn ? b.c == 2 : b.c) &&
            d("CSRBitMap").add(i);
        }
    }
    function U(a, b) {
      let e = D.bootload(b);
      if (z.has(e)) return [e, null];
      z.add(e);
      let f = (j || (j = c("performanceAbsoluteNow")))();
      b = {
        ref: a,
        components: b,
        timesliceContext: c("TimeSlice").getContext(),
        startTime: (a = q.get(e)) != null ? a : f,
        fetchStartTime: f,
        callbackStart: 0,
        callbackEnd: 0,
        tierOne: d("BootloaderEvents").newResourceMapSet(),
        tierTwo: d("BootloaderEvents").newResourceMapSet(),
        tierThree: d("BootloaderEvents").newResourceMapSet(),
        beRequests: new Map(),
      };
      d("BootloaderEvents").notifyBootloadStart(b);
      return [e, b];
    }
    function aa(a) {
      return c("ifRequired").call(
        null,
        a,
        () => {
          return !0;
        },
        () => {
          return !1;
        }
      );
    }
    function V(a) {
      return c("ifRequireable").call(
        null,
        a,
        () => {
          return !0;
        },
        () => {
          return !1;
        }
      );
    }
    function ba(a, b, f, g) {
      y.has(a) ||
        y.set(a, {
          firstBootloadStart: (j || (j = c("performanceAbsoluteNow")))(),
          logData: new Set(),
        });
      g && c("nullthrows")(y.get(a)).logData.add(g);
      let h = G(a);
      let i = h.r;
      let k = h.rdfds;
      let l = h.rds;
      h = h.be;
      h = K(a) ? J(a, h) : null;
      h == null && D.notify(D.beDone(a));
      S(
        h != null ? [h].concat(i) : i,
        {
          onAll: function () {
            return D.notify(D.tierOne(a));
          },
          onLog: function () {
            return D.notify(D.tierOneLog(a));
          },
        },
        f,
        a,
        g == null ? void 0 : g.tierOne
      );
      let m = (k == null ? void 0 : k.m) || [];
      let n = function (d) {
        S(
          (k == null ? void 0 : k.r) || [],
          {
            onBlocking: function () {
              return c("RequireDeferredReference").unblock(m, "css");
            },
            onAll: function () {
              return D.registerCallback(() => {
                D.notify(D.tierTwoStart(a)),
                  e.call(
                    null,
                    m.map(
                      c("RequireDeferredReference").getRDModuleName_DO_NOT_USE
                    ),
                    () => {
                      return D.notify(D.tierTwo(a));
                    }
                  );
              }, [D.tierOne(a), b]);
            },
            onLog: function () {
              return D.notify(D.tierTwoLog(a));
            },
          },
          d,
          a,
          g == null ? void 0 : g.tierTwo
        );
      };
      c("BootloaderConfig").tieredLoadingFromTier != null &&
      c("BootloaderConfig").tieredLoadingFromTier <= 2
        ? D.registerCallback(() => {
            return d("BootloaderDocumentInserter").batchDOMInsert(n);
          }, [D.tierOne(a)])
        : n(f);
      let o = (l == null ? void 0 : l.m) || [];
      let p = function (b) {
        S(
          (l == null ? void 0 : l.r) || [],
          {
            onBlocking: function () {
              return c("RequireDeferredReference").unblock(o, "css");
            },
            onAll: function () {
              return D.registerCallback(() => {
                D.notify(D.tierThreeStart(a)),
                  e.call(
                    null,
                    o.map(
                      c("RequireDeferredReference").getRDModuleName_DO_NOT_USE
                    ),
                    () => {
                      return D.notify(D.tierThree(a));
                    }
                  );
              }, [D.tierTwo(a)]);
            },
            onLog: function () {
              return D.notify(D.tierThreeLog(a));
            },
          },
          b,
          a,
          g == null ? void 0 : g.tierThree
        );
      };
      c("BootloaderConfig").tieredLoadingFromTier != null &&
      c("BootloaderConfig").tieredLoadingFromTier <= 3
        ? D.registerCallback(() => {
            return d("BootloaderDocumentInserter").batchDOMInsert(p);
          }, [D.tierTwo(a)])
        : p(f);
    }
    function W(a) {
      let b = new Map();
      for (let e = 0; e < a.length; e++) {
        let f = a[e];
        let g = v.get(f);
        if (!g) {
          c("FBLogger")("bootloader").mustfix(
            "Unable to resolve resource %s.",
            f
          );
          continue;
        }
        let i = void 0;
        if (g.type === "csr") i = d("CSRIndexUtil").parseCSRIndexes(g.src);
        else if (g.p)
          (i = d("CSRIndexUtil").parseCSRIndexes(g.p)),
            i.includes(d("CSRIndexUtil").UNKNOWN_RESOURCE_INDEX) && b.set(f, g),
            (i = i.filter((a) => {
              return a !== d("CSRIndexUtil").UNKNOWN_RESOURCE_INDEX;
            }));
        else {
          b.set(f, g);
          continue;
        }
        for (
          f = i,
            g = Array.isArray(f),
            i = 0,
            f = g
              ? f
              : f[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
          var j;
          if (g) {
            if (i >= f.length) break;
            j = f[i++];
          } else {
            i = f.next();
            if (i.done) break;
            j = i.value;
          }
          j = j;
          let k = w.get(j);
          if (k == null) {
            let l = JSON.stringify(
              a.map((b) => {
                let a = I(b);
                let c;
                a.type === "js" || a.type === "css"
                  ? (c = a.d ? "" : a.src.split("?")[0])
                  : (c = a.src);
                return JSON.stringify(
                  babelHelpers["extends"]({ hash: b, rev: x.get(b) }, a, {
                    src: c,
                    tsrc: null,
                  })
                );
              })
            );
            throw c("FBLogger")("bootloader", "missing-index-map").mustfixThrow(
              "No hash for rsrcIndex " +
                j +
                " (rev: " +
                c("SiteData").client_revision +
                ", cohort: " +
                c("SiteData").pkg_cohort +
                "). " +
                l
            );
          }
          j = I(k);
          j.type !== "csr" || h(0, 20056, k);
          b.set(k, j);
        }
      }
      return b.entries();
    }
    function X(a) {
      let b = a.getAttribute("data-bootloader-hash");
      if (b == null) return;
      let e = d("ResourceHasher").getValidResourceHash(b);
      if (a.id) {
        if (B.has(a.id)) return;
        B.add(a.id);
      }
      b =
        a.tagName === "SCRIPT"
          ? { src: a.src, type: "js" }
          : { src: a.href, type: "css" };
      a.crossOrigin == null && (b.nc = 1);
      b.type === "js" &&
        a.dataset.tsrc != null &&
        a.dataset.tsrc.trim() !== "" &&
        ((b.tsrc = a.dataset.tsrc),
        c("promiseDone")(
          d("MakeHasteTranslations").genFetchAndProcessTranslations(e, b.tsrc)
        ));
      b.type === "css" &&
        a.getAttribute("data-nonblocking") &&
        (b.nonblocking = 1);
      let f = a.getAttribute("data-c");
      f == "1" ? (b.c = 1) : f == "2" && (b.c = 2);
      f = a.getAttribute("data-p");
      if (f != null) {
        b.p = f;
        f = d("CSRIndexUtil").parseCSRIndexes(f);
        var g = Math.max.apply(Math, f);
        g > c("BootloaderConfig").btCutoffIndex &&
          d("BootloaderEvents").notifyResourceInLongTailBTManifest(
            P(f, b.src, new Set(), c("BootloaderConfig").btCutoffIndex),
            "pickupPageResource"
          );
      }
      g = a.getAttribute("data-btmanifest");
      g != null && (b.m = g);
      v.has(e) &&
        !c("BootloaderConfig").silentDups &&
        c("FBLogger")("bootloader").warn(
          "Duplicate resource [%s]: %s",
          e,
          b.src
        );
      T(e, b, !0);
      r.set(e, (j || (j = c("performanceAbsoluteNow")))());
      f = function () {
        return $.done(e);
      };
      g =
        b.type === "js"
          ? !a.getAttribute("async")
          : ((g = a.parentNode) == null ? void 0 : g.tagName) === "HEAD";
      g || (window._btldr && window._btldr[e])
        ? f()
        : b.type === "js"
        ? N(a, e, b, f)
        : c("CSSLoader").setupEventListeners(
            e,
            b.src,
            d("BootloaderDocumentInserter").getDOMContainerNode(),
            f,
            O(e, b, f),
            null
          );
    }
    function Y() {
      if (A) return;
      A = !0;
      if (
        !(k || (k = c("ExecutionEnvironment"))).canUseDOM ||
        (k || (k = c("ExecutionEnvironment"))).isInWorker
      )
        return;
      Array.from(document.getElementsByTagName("link")).forEach((a) => {
        return X(a);
      });
      Array.from(document.getElementsByTagName("script")).forEach((a) => {
        return X(a);
      });
    }
    function Z() {
      C = !0;
      let a = p;
      p = [];
      a.forEach((a) => {
        let b = a[0];
        let c = a[1];
        let d = a[2];
        a = a[3];
        a(() => {
          $.loadModules.apply($, [b, c, d]);
        });
      });
    }
    var $ = {
      loadModules: function (a, b, f) {
        b === void 0 && (b = m);
        f === void 0 && (f = "loadModules: unknown caller");
        let g = a;
        let h;
        let i = !1;
        let k = function () {
          c("clearTimeout")(h), i || b.apply(void 0, arguments);
        };
        a = {
          remove: function () {
            i = !0;
          },
        };
        if (
          c("BootloaderConfig").fastPathForAlreadyRequired &&
          g.every((a) => {
            return V(a);
          })
        ) {
          e.call(null, g, function () {
            k.apply(void 0, arguments);
          });
          return a;
        }
        if (!F(g)) {
          var l = "Deferred: Bootloader.loadModules";
          l = c("TimeSlice").getGuardedContinuation(l);
          p.push([g, k, f, l]);
          l = D.bootload(g);
          q.set(
            l,
            (l = q.get(l)) != null
              ? l
              : (j || (j = c("performanceAbsoluteNow")))()
          );
          return a;
        }
        l = U(f, g);
        let n = l[0];
        let o = l[1];
        D.registerCallback(
          e.bind(null, g, function () {
            o && (o.callbackStart = (j || (j = c("performanceAbsoluteNow")))()),
              k.apply(void 0, arguments),
              o && (o.callbackEnd = (j || (j = c("performanceAbsoluteNow")))()),
              D.notify(n);
          }),
          g.map((a) => {
            return D.tierOne(a);
          })
        );
        d("BootloaderDocumentInserter").batchDOMInsert((b) => {
          for (let c = 0; c < g.length; c++) {
            let a = g[c];
            ba(a, n, b, o);
          }
        });
        if (o) {
          l = new Set([n]);
          for (let r = 0; r < g.length; r++) {
            let s = g[r];
            l.add(D.beDone(s));
            l.add(D.tierThree(s));
            l.add(D.tierOneLog(s));
            l.add(D.tierTwoLog(s));
            l.add(D.tierThreeLog(s));
          }
          D.registerCallback(() => {
            return d("BootloaderEvents").notifyBootload(o);
          }, Array.from(l));
          c("ifRequireable")("TimeSliceInteraction", (a) => {
            a.informGlobally("Bootloader.loadResources")
              .addSetAnnotation(
                "requested_hashes",
                Array.from(
                  d("BootloaderEvents").flattenResourceMapSet(o.tierOne).keys()
                )
              )
              .addSetAnnotation(
                "rdfd_requested_hashes",
                Array.from(
                  d("BootloaderEvents").flattenResourceMapSet(o.tierTwo).keys()
                )
              )
              .addSetAnnotation(
                "rd_requested_hashes",
                Array.from(
                  d("BootloaderEvents")
                    .flattenResourceMapSet(o.tierThree)
                    .keys()
                )
              )
              .addStringAnnotation("bootloader_reference", f)
              .addSetAnnotation("requested_components", g);
          });
          h = c("setTimeoutAcrossTransitions")(() => {
            d("BootloaderEvents").notifyBootloaderCallbackTimeout(o);
          }, c("BootloaderConfig").timeout);
        }
        return a;
      },
      loadResources: function (a, b) {
        Y(),
          d("BootloaderDocumentInserter").batchDOMInsert((c) => {
            let e;
            return S(
              a.map((a) => {
                return d("ResourceHasher").getValidResourceHash(a);
              }),
              (e = b) != null ? e : Object.freeze({}),
              c,
              "loadResources"
            );
          });
      },
      requestJSResource_UNSAFE_NEEDS_REVIEW_BY_SECURITY_AND_XFN: function (a) {
        let b = d("ResourceHasher").createExternalJSHash();
        T(b, { type: "js", src: a, nc: 1 }, !1);
        $.loadResources([b]);
      },
      done: function (a) {
        s.set(a, (j || (j = c("performanceAbsoluteNow")))()),
          D.notify(D.rsrcDone(a));
      },
      beDone: function (a, b, c) {
        for (
          var d =
              (d = (d = y.get(a)) == null ? void 0 : d.logData) != null
                ? d
                : [],
            e = Array.isArray(d),
            f = 0,
            d = e
              ? d
              : d[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
          var d;
          var g;
          if (e) {
            if (f >= d.length) break;
            g = d[f++];
          } else {
            f = d.next();
            if (f.done) break;
            g = f.value;
          }
          g = g;
          g.beRequests.set(b, c);
        }
        D.notify(D.beDone(a));
      },
      handlePayload: function (a, b) {
        for (
          var e = (e = a.rsrcTags) != null ? e : [],
            f = Array.isArray(e),
            g = 0,
            e = f
              ? e
              : e[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
          var e;
          var h;
          if (f) {
            if (g >= e.length) break;
            h = e[g++];
          } else {
            g = e.next();
            if (g.done) break;
            h = g.value;
          }
          h = h;
          X(document.getElementById(h));
        }
        f =
          (g = (h = a.consistency) == null ? void 0 : h.rev) != null ? g : null;
        $.setResourceMap((e = a.rsrcMap) != null ? e : {}, a.sotUpgrades, f, b);
        h =
          a.csrUpgrade != null
            ? d("CSRIndexUtil").parseCSRIndexes(a.csrUpgrade)
            : [];
        g = h.find((a) => {
          return !w.has(a);
        });
        h.length && f !== null && f !== c("SiteData").client_revision
          ? c("FBLogger")("bootloader", "csr-mismatch").warn(
              "CSR upgrades included on mismatched rev %s (client rev: %s, cohort: %s).",
              f,
              c("SiteData").client_revision,
              c("SiteData").pkg_cohort
            )
          : g != null && A
          ? c("FBLogger")("bootloader", "missing-csr-upgrade").warn(
              "CSR upgrades included unknown rsrcIndex %d (client rev: %s, cohort: %s).",
              g,
              c("SiteData").client_revision,
              c("SiteData").pkg_cohort
            )
          : h.forEach(d("CSRBitMap").add);
        a.compMap && $.enableBootload(a.compMap, b);
      },
      enableBootload: function (a, b) {
        for (let c in a)
          b && b.comp++,
            !u.has(c)
              ? (u.set(c, a[c]), n.has(c) && (n["delete"](c), H(c)))
              : b && b.dup_comp++;
        Y();
        o || Z();
      },
      undeferBootloads: function (a) {
        a === void 0 && (a = !1);
        if (window.location.search.indexOf("&__deferBootloads=") !== -1) return;
        a &&
          o &&
          d("BootloaderEvents").notifyDeferTimeout({
            componentMapSize: u.size,
            pending: p.map((a) => {
              let b = a[0];
              a[1];
              let c = a[2];
              a[3];
              return { components: b, ref: c };
            }),
            time: (l || (l = c("performanceNow")))(),
          });
        o = !1;
        u.size && Z();
      },
      markComponentsAsImmediate: function (a) {
        for (let b = 0; b < a.length; b++) {
          let c = a[b];
          u.has(c) ? H(c) : n.add(c);
        }
      },
      setResourceMap: function (a, b, e, f) {
        let g = !1;
        for (var h in a) {
          f && f.rsrc++;
          h = d("ResourceHasher").getValidResourceHash(h);
          e != null && x.set(h, e);
          var i = a[h];
          var j = v.get(h);
          !j
            ? (i.type === "js" && (g = !0), T(h, i, !1))
            : (f && f.dup_rsrc++,
              ((j.type === "js" && i.type === "js") ||
                (j.type === "css" && i.type === "css")) &&
                i.d &&
                !j.d &&
                (i.type === "js" && (g = !0), (j.src = i.src), (j.d = 1)));
        }
        g && e != null && c("ClientConsistency").addAdditionalRevision(e);
        if (b)
          for (
            i = b,
              j = Array.isArray(i),
              h = 0,
              i = j
                ? i
                : i[
                    typeof Symbol === "function"
                      ? Symbol.iterator
                      : "@@iterator"
                  ]();
            ;

          ) {
            if (j) {
              if (h >= i.length) break;
              a = i[h++];
            } else {
              h = i.next();
              if (h.done) break;
              a = h.value;
            }
            f = a;
            g = v.get(f);
            g && T(f, g, !0);
          }
      },
      getURLToHashMap: function () {
        let a = new Map();
        for (
          var b = v,
            c = Array.isArray(b),
            d = 0,
            b = c
              ? b
              : b[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
          var e;
          if (c) {
            if (d >= b.length) break;
            e = b[d++];
          } else {
            d = b.next();
            if (d.done) break;
            e = d.value;
          }
          e = e;
          let f = e[0];
          e = e[1];
          if (e.type === "async" || e.type === "csr") continue;
          a.set(e.src, f);
        }
        return a;
      },
      loadPredictedResourceMap: function (a, b, c) {
        $.setResourceMap(a, null, c), $.loadResources(Object.keys(a), b);
      },
      getCSSResources: function (a) {
        let b = [];
        for (
          var a = W(a),
            c = Array.isArray(a),
            d = 0,
            a = c
              ? a
              : a[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
          var e;
          if (c) {
            if (d >= a.length) break;
            e = a[d++];
          } else {
            d = a.next();
            if (d.done) break;
            e = d.value;
          }
          e = e;
          let f = e[0];
          e = e[1];
          e.type === "css" && b.push(f);
        }
        return b;
      },
      getBootloadPendingComponents: function () {
        let a = new Map();
        for (
          var b = y,
            c = Array.isArray(b),
            d = 0,
            b = c
              ? b
              : b[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
          var e;
          if (c) {
            if (d >= b.length) break;
            e = b[d++];
          } else {
            d = b.next();
            if (d.done) break;
            e = d.value;
          }
          e = e;
          e = e[0];
          aa(e) || a.set(e, $.getComponentDebugState(e));
        }
        return a;
      },
      getComponentDebugState: function (a) {
        let b = function (a) {
          return !!D.getEventTime(a);
        };
        return {
          phases: {
            tierOne: b(D.tierOne(a)),
            tierTwo: b(D.tierTwo(a)),
            tierThree: b(D.tierThree(a)),
            beDone: b(D.beDone(a)),
          },
          unresolvedDeps: c("__debug").debugUnresolvedDependencies([a]),
          nonJSDeps:
            (b = c("__debug").modulesMap[a]) == null ? void 0 : b.nonJSDeps,
          hasError:
            (b = c("__debug").modulesMap[a]) == null ? void 0 : b.hasError,
        };
      },
      getBootloadedComponents: function () {
        let a = new Map();
        for (
          var b = y,
            c = Array.isArray(b),
            d = 0,
            b = c
              ? b
              : b[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
          var e;
          if (c) {
            if (d >= b.length) break;
            e = b[d++];
          } else {
            d = b.next();
            if (d.done) break;
            e = d.value;
          }
          e = e;
          let f = e[0];
          e = e[1];
          a.set(f, e.firstBootloadStart);
        }
        return a;
      },
      notifyManuallyLoadedResourcesInWorker: function (a, b) {
        let e = function (e) {
          let f = d("ResourceHasher").getValidResourceHash(e);
          let g = a[f];
          if (g.type === "js" || g.type === "css") {
            v.has(f) &&
              !c("BootloaderConfig").silentDups &&
              c("FBLogger")("bootloader").warn(
                "Duplicate manual resource [%s]: %s",
                f,
                g.src
              );
            T(f, g, !0);
            g.type === "js" &&
              g.tsrc != null &&
              g.tsrc.trim() !== "" &&
              c("promiseDone")(
                d("MakeHasteTranslations").genFetchAndProcessTranslations(
                  f,
                  c("nullthrows")(g.tsrc)
                )
              );
            r.set(f, (j || (j = c("performanceAbsoluteNow")))());
            let h = function () {
              return $.done(f);
            };
            e = b[f];
            g.type === "js" && e
              ? c("promiseDone")(e, h, () => {
                  L(f, g, h);
                })
              : h();
          }
        };
        for (let f in a) e(f);
      },
      getResourceState: function (a) {
        return { loadStart: r.get(a), loadEnd: s.get(a), loadError: t.get(a) };
      },
      getComponentTiming: function (a) {
        let b;
        return {
          tierTwoStart: (b = D.getEventTime(D.tierTwoStart(a))) != null ? b : 0,
          tierTwoEnd: (b = D.getEventTime(D.tierTwo(a))) != null ? b : 0,
          tierThreeStart:
            (b = D.getEventTime(D.tierThreeStart(a))) != null ? b : 0,
          tierThreeEnd: (b = D.getEventTime(D.tierThree(a))) != null ? b : 0,
        };
      },
      getLoadedResourceCount: function () {
        return s.size;
      },
      getErrorCount: function () {
        return t.size;
      },
      forceFlush: function () {
        c("BootloaderEndpoint").forceFlush();
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
        _getQueuedLoadModules: function () {
          return p;
        },
        _dequeueLoadModules: function (a) {
          a = p.splice(a, 1);
          if (!a.length) return;
          a = a[0];
          let b = a[0];
          let c = a[1];
          let d = a[2];
          a = a[3];
          let e = o;
          let f = C;
          o = !1;
          C = !0;
          a(() => {
            $.loadModules.apply($, [b, c, d]);
          });
          o = e;
          C = f;
        },
      },
    };
    c("JSResourceReferenceImpl").setBootloader($);
    f = $;
    g["default"] = f;
  },
  98
);
