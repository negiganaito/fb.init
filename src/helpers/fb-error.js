/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
__d(
  "fb-error",
  ["performanceNowSinceAppStart", "removeFromArray"],
  (a, b, c, d, e, f) => {
    let g = {
      PREVIOUS_FILE: 1,
      PREVIOUS_FRAME: 2,
      PREVIOUS_DIR: 3,
      FORCED_KEY: 4,
    };
    function h(b) {
      let a = new Error(b);
      if (a.stack === void 0)
        try {
          throw a;
        } catch (a) {}
      a.messageFormat = b;
      for (
        var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), e = 1;
        e < c;
        e++
      )
        d[e - 1] = arguments[e];
      a.messageParams = d.map((a) => {
        return String(a);
      });
      a.taalOpcodes = [g.PREVIOUS_FRAME];
      return a;
    }
    let i = !1;
    let j = {
      errorListener: function (b) {
        let c = a.console;
        let d = c[b.type] ? b.type : "error";
        if (b.type === "fatal" || (d === "error" && !i)) {
          d = b.message;
          c.error(
            "ErrorUtils caught an error:\n\n" +
              d +
              "\n\nSubsequent non-fatal errors won't be logged; see https://fburl.com/debugjs."
          );
          i = !0;
        }
      },
    };
    let k = { access_token: null };
    let l = 6;
    let m = 6e4;
    let n = 10 * m;
    let o = new Map();
    let p = 0;
    function q() {
      let a = b("performanceNowSinceAppStart")();
      if (a > p + m) {
        let c = a - n;
        for (
          var d = o,
            e = Array.isArray(d),
            f = 0,
            d = e
              ? d
              : d[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
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
          let h = g[0];
          g = g[1];
          g.lastAccessed < c && o["delete"](h);
        }
        p = a;
      }
    }
    function r(a) {
      q();
      let c = b("performanceNowSinceAppStart")();
      let d = o.get(a);
      if (d == null) {
        o.set(a, { dropped: 0, logged: [c], lastAccessed: c });
        return 1;
      }
      a = d.dropped;
      let e = d.logged;
      d.lastAccessed = c;
      while (e[0] < c - m) e.shift();
      if (e.length < l) {
        d.dropped = 0;
        e.push(c);
        return a + 1;
      } else {
        d.dropped++;
        return null;
      }
    }
    let s = {
      shouldLog: function (a) {
        return r(a.hash);
      },
    };
    let t = "RE_EXN_ID";
    function u(a) {
      let b = null;
      a == null || typeof a !== "object"
        ? (b = h("Non-object thrown: %s", String(a)))
        : Object.prototype.hasOwnProperty.call(a, t)
        ? (b = h("Rescript exception thrown: %s", JSON.stringify(a)))
        : typeof (a === null || a === void 0 ? void 0 : a.then) === "function"
        ? (b = h("Promise thrown: %s", JSON.stringify(a)))
        : typeof a.message !== "string"
        ? (b = h(
            "Non-error thrown: %s, keys: %s",
            String(a),
            JSON.stringify(Object.keys(a).sort())
          ))
        : a.messageFormat != null && typeof a.messageFormat !== "string"
        ? (b = h(
            "Error with non-string messageFormat thrown: %s, %s, keys: %s",
            String(a.message),
            String(a),
            JSON.stringify(Object.keys(a).sort())
          ))
        : Object.isExtensible &&
          !Object.isExtensible(a) &&
          (b = h("Non-extensible thrown: %s", String(a.message)));
      if (b != null) {
        b.taalOpcodes = b.taalOpcodes || [];
        b.taalOpcodes.push(g.PREVIOUS_FRAME);
        return b;
      }
      return a;
    }
    let aa =
      typeof window === "undefined" ? "<self.onerror>" : "<window.onerror>";
    let v;
    function ba(a) {
      let b = a.error != null ? u(a.error) : h(a.message || "");
      b.fileName == null && a.filename != null && (b.fileName = a.filename);
      b.line == null && a.lineno != null && (b.line = a.lineno);
      b.column == null && a.colno != null && (b.column = a.colno);
      b.guardList = [aa];
      b.loggingSource = "ONERROR";
      (a = v) === null || a === void 0 ? void 0 : a.reportError(b);
    }
    let w = {
      setup: function (b) {
        if (typeof a.addEventListener !== "function") return;
        if (v != null) return;
        v = b;
        a.addEventListener("error", ba);
      },
    };
    let x = [];
    let y = {
      pushGuard: function (a) {
        x.unshift(a);
      },
      popGuard: function () {
        x.shift();
      },
      inGuard: function () {
        return x.length !== 0;
      },
      cloneGuardList: function () {
        return x.map((a) => {
          return a.name;
        });
      },
      findDeferredSource: function () {
        for (let a = 0; a < x.length; a++) {
          let b = x[a];
          if (b.deferredSource != null) return b.deferredSource;
        }
      },
    };
    function ca(a) {
      if (a.type != null) return a.type;
      if (a.loggingSource == "GUARDED" || a.loggingSource == "ERROR_BOUNDARY")
        return "fatal";
      if (a.name == "SyntaxError") return "fatal";
      if (
        a.loggingSource == "ONERROR" &&
        a.message.indexOf("ResizeObserver loop") >= 0
      )
        return "warn";
      return a.stack != null && a.stack.indexOf("chrome-extension://") >= 0
        ? "warn"
        : "error";
    }
    let z = [];
    let A = (function () {
      function a() {
        this.metadata = [].concat(z);
      }
      let b = a.prototype;
      b.addEntries = function () {
        let a;
        (a = this.metadata).push.apply(a, arguments);
        return this;
      };
      b.addEntry = function (a, b, c) {
        this.metadata.push([a, b, c]);
        return this;
      };
      b.isEmpty = function () {
        return this.metadata.length === 0;
      };
      b.clearEntries = function () {
        this.metadata = [];
      };
      b.format = function () {
        let a = [];
        this.metadata.forEach((b) => {
          if (b && b.length) {
            b = b
              .map((a) => {
                return a != null ? String(a).replace(/:/g, "_") : "";
              })
              .join(":");
            a.push(b);
          }
        });
        return a;
      };
      b.getAll = function () {
        return this.metadata;
      };
      a.addGlobalMetadata = function (a, b, c) {
        z.push([a, b, c]);
      };
      a.getGlobalMetadata = function () {
        return z;
      };
      a.unsetGlobalMetadata = function (a, b) {
        z = z.filter((c) => {
          return !(Array.isArray(c) && c[0] === a && c[1] === b);
        });
      };
      return a;
    })();
    let B = { debug: 1, info: 2, warn: 3, error: 4, fatal: 5 };
    function c(a, b) {
      if (Object.isFrozen(a)) return;
      b.type && (!a.type || B[a.type] > B[b.type]) && (a.type = b.type);
      let c = b.metadata;
      if (c != null) {
        var d;
        d = (d = a.metadata) !== null && d !== void 0 ? d : new A();
        c != null && d.addEntries.apply(d, c.getAll());
        a.metadata = d;
      }
      b.project != null && (a.project = b.project);
      b.errorName != null && (a.errorName = b.errorName);
      b.componentStack != null && (a.componentStack = b.componentStack);
      b.deferredSource != null && (a.deferredSource = b.deferredSource);
      b.blameModule != null && (a.blameModule = b.blameModule);
      b.loggingSource != null && (a.loggingSource = b.loggingSource);
      d = (c = a.messageFormat) !== null && c !== void 0 ? c : a.message;
      c = (c = a.messageParams) !== null && c !== void 0 ? c : [];
      if (d !== b.messageFormat && b.messageFormat != null) {
        var e;
        d += " [Caught in: " + b.messageFormat + "]";
        c.push.apply(
          c,
          (e = b.messageParams) !== null && e !== void 0 ? e : []
        );
      }
      a.messageFormat = d;
      a.messageParams = c;
      e = b.forcedKey;
      d = a.forcedKey;
      c =
        e != null && d != null
          ? e + "_" + d
          : e !== null && e !== void 0
          ? e
          : d;
      a.forcedKey = c;
    }
    function d(a) {
      let b;
      return da(
        (b = a.messageFormat) !== null && b !== void 0 ? b : a.message,
        a.messageParams || []
      );
    }
    function da(a, b) {
      let c = 0;
      a = String(a);
      a = a.replace(/%s/g, () => {
        return c < b.length ? b[c++] : "NOPARAM";
      });
      c < b.length && (a += " PARAMS" + JSON.stringify(b.slice(c)));
      return a;
    }
    function f(a) {
      return (a !== null && a !== void 0 ? a : []).map((a) => {
        return String(a);
      });
    }
    let C = { aggregateError: c, toReadableMessage: d, toStringParams: f };
    let ea = 5;
    let D = [];
    function E(a) {
      D.push(a), D.length > ea && D.shift();
    }
    function F(a) {
      let b = a.getAllResponseHeaders();
      if (b != null && b.indexOf("X-FB-Debug") >= 0) {
        b = a.getResponseHeader("X-FB-Debug");
        b && E(b);
      }
    }
    function fa() {
      return D;
    }
    let G = { add: E, addFromXHR: F, getAll: fa };
    let ga = "abcdefghijklmnopqrstuvwxyz012345";
    function H() {
      let a = 0;
      for (var b = arguments.length, c = new Array(b), d = 0; d < b; d++)
        c[d] = arguments[d];
      for (let e = 0; e < c.length; e++) {
        let f = c[e];
        if (f != null) {
          let g = f.length;
          for (let h = 0; h < g; h++) a = (a << 5) - a + f.charCodeAt(h);
        }
      }
      let i = "";
      for (let j = 0; j < 6; j++) (i = ga.charAt(a & 31) + i), (a >>= 5);
      return i;
    }
    let I = [
      /\(([^\s\)\()]+):(\d+):(\d+)\)$/,
      /@([^\s\)\()]+):(\d+):(\d+)$/,
      /^([^\s\)\()]+):(\d+):(\d+)$/,
      /^at ([^\s\)\()]+):(\d+):(\d+)$/,
    ];
    let ha = /^\w+:\s.*?\n/g;
    Error.stackTraceLimit != null &&
      Error.stackTraceLimit < 80 &&
      (Error.stackTraceLimit = 80);
    function ia(a) {
      let b = a.name;
      let c = a.message;
      a = a.stack;
      if (a == null) return null;
      if (b != null && c != null && c !== "") {
        var d = b + ": " + c + "\n";
        if (a.startsWith(d)) return a.substr(d.length);
        if (a === b + ": " + c) return null;
      }
      if (b != null) {
        d = b + "\n";
        if (a.startsWith(d)) return a.substr(d.length);
      }
      if (c != null && c !== "") {
        b = ": " + c + "\n";
        d = a.indexOf(b);
        c = a.substring(0, d);
        if (/^\w+$/.test(c)) return a.substring(d + b.length);
      }
      return a.replace(ha, "");
    }
    function J(a) {
      a = a.trim();
      let b;
      a;
      let c;
      let d;
      let e;
      if (a.includes("charset=utf-8;base64,")) b = "<inlined-file>";
      else {
        let f;
        for (let g = 0; g < I.length; g++) {
          var h = I[g];
          f = a.match(h);
          if (f != null) break;
        }
        f != null && f.length === 4
          ? ((c = f[1]),
            (d = parseInt(f[2], 10)),
            (e = parseInt(f[3], 10)),
            (b = a.substring(0, a.length - f[0].length)))
          : (b = a);
        b = b.replace(/^at /, "").trim();
      }
      h = { identifier: b, script: c, line: d, column: e };
      h.text = K(h);
      return h;
    }
    function ja(a) {
      return a == null || a === "" ? [] : a.split(/\n\n/)[0].split("\n").map(J);
    }
    function ka(a) {
      a = ia(a);
      return ja(a);
    }
    function la(a) {
      if (a == null || a === "") return null;
      a = a.split("\n");
      a.splice(0, 1);
      return a.map((a) => {
        return a.trim();
      });
    }
    function K(a) {
      let b = a.identifier;
      let c = a.script;
      let d = a.line;
      a = a.column;
      b = "    at " + (b !== null && b !== void 0 ? b : "<unknown>");
      c != null &&
        d != null &&
        a != null &&
        (b += " (" + c + ":" + d + ":" + a + ")");
      return b;
    }
    function L(c) {
      let d;
      let e;
      let f;
      let h;
      let i;
      let j;
      let k = ka(c);
      d = (d = c.taalOpcodes) !== null && d !== void 0 ? d : [];
      let l = c.framesToPop;
      if (l != null) {
        l = Math.min(l, k.length);
        while (l-- > 0) d.unshift(g.PREVIOUS_FRAME);
      }
      l = (l = c.messageFormat) !== null && l !== void 0 ? l : c.message;
      e = ((e = c.messageParams) !== null && e !== void 0 ? e : []).map((a) => {
        return String(a);
      });
      let m = la(c.componentStack);
      let n = m == null ? null : m.map(J);
      let o = c.metadata ? c.metadata.format() : new A().format();
      o.length === 0 && (o = void 0);
      let p = k
        .map((a) => {
          return a.text;
        })
        .join("\n");
      f = (f = c.errorName) !== null && f !== void 0 ? f : c.name;
      let q = ca(c);
      let r = c.loggingSource;
      let s = c.project;
      h = (h = c.lineNumber) !== null && h !== void 0 ? h : c.line;
      i = (i = c.columnNumber) !== null && i !== void 0 ? i : c.column;
      j = (j = c.fileName) !== null && j !== void 0 ? j : c.sourceURL;
      let t = k.length > 0;
      t && h == null && (h = k[0].line);
      t && i == null && (i = k[0].column);
      t && j == null && (j = k[0].script);
      n = {
        blameModule: c.blameModule,
        column: i == null ? null : String(i),
        clientTime: Math.floor(Date.now() / 1e3),
        componentStackFrames: n,
        deferredSource: c.deferredSource != null ? L(c.deferredSource) : null,
        extra: (t = c.extra) !== null && t !== void 0 ? t : {},
        fbtrace_id: c.fbtrace_id,
        guardList: (i = c.guardList) !== null && i !== void 0 ? i : [],
        hash: H(f, p, q, s, r),
        isNormalizedError: !0,
        line: h == null ? null : String(h),
        loggingSource: r,
        message: C.toReadableMessage(c),
        messageFormat: l,
        messageParams: e,
        metadata: o,
        name: f,
        page_time: Math.floor(b("performanceNowSinceAppStart")()),
        project: s,
        reactComponentStack: m,
        script: j,
        serverHash: c.serverHash,
        stack: p,
        stackFrames: k,
        type: q,
        xFBDebug: G.getAll(),
      };
      c.forcedKey != null && (n.forcedKey = c.forcedKey);
      d.length > 0 && (n.taalOpcodes = d);
      t = a.location;
      t && (n.windowLocationURL = t.href);
      for (i in n) n[i] == null && delete n[i];
      return n;
    }
    function ma(a) {
      return a != null && typeof a === "object" && a.isNormalizedError === !0
        ? a
        : null;
    }
    let M = { formatStackFrame: K, normalizeError: L, ifNormalizedError: ma };
    let na = "<global.react>";
    let N = [];
    let O = [];
    let P = 50;
    let Q = !1;
    var R = {
      history: O,
      addListener: function (a, b) {
        b === void 0 && (b = !1),
          N.push(a),
          b ||
            O.forEach((b) => {
              return a(
                b,
                (b = b.loggingSource) !== null && b !== void 0
                  ? b
                  : "DEPRECATED"
              );
            });
      },
      unshiftListener: function (a) {
        N.unshift(a);
      },
      removeListener: function (a) {
        b("removeFromArray")(N, a);
      },
      reportError: function (a) {
        a = M.normalizeError(a);
        R.reportNormalizedError(a);
      },
      reportNormalizedError: function (b) {
        if (Q) return !1;
        let a = y.cloneGuardList();
        b.componentStackFrames && a.unshift(na);
        a.length > 0 && (b.guardList = a);
        if (b.deferredSource == null) {
          a = y.findDeferredSource();
          a != null && (b.deferredSource = M.normalizeError(a));
        }
        O.length > P && O.splice(P / 2, 1);
        O.push(b);
        Q = !0;
        for (a = 0; a < N.length; a++)
          try {
            var c;
            N[a](
              b,
              (c = b.loggingSource) !== null && c !== void 0 ? c : "DEPRECATED"
            );
          } catch (a) {}
        Q = !1;
        return !0;
      },
    };
    R.addListener(j.errorListener);
    let oa = "<anonymous guard>";
    let S = !1;
    var T = {
      applyWithGuard: function (a, b, c, d) {
        y.pushGuard({
          name:
            ((d === null || d === void 0 ? void 0 : d.name) != null
              ? d.name
              : null) ||
            (a.name ? "func_name:" + a.name : null) ||
            oa,
          deferredSource:
            d === null || d === void 0 ? void 0 : d.deferredSource,
        });
        if (S)
          try {
            return a.apply(b, c);
          } finally {
            y.popGuard();
          }
        try {
          return Function.prototype.apply.call(a, b, c);
        } catch (h) {
          try {
            b =
              d !== null && d !== void 0
                ? d
                : babelHelpers["extends"]({}, null);
            let e = b.deferredSource;
            let f = b.onError;
            b = b.onNormalizedError;
            let g = u(h);
            e = {
              deferredSource: e,
              loggingSource: "GUARDED",
              project:
                (e = d === null || d === void 0 ? void 0 : d.project) !==
                  null && e !== void 0
                  ? e
                  : "ErrorGuard",
              type: d === null || d === void 0 ? void 0 : d.errorType,
            };
            C.aggregateError(g, e);
            d = M.normalizeError(g);
            g == null &&
              a &&
              ((d.extra[a.toString().substring(0, 100)] = "function"),
              c != null &&
                c.length &&
                (d.extra[Array.from(c).toString().substring(0, 100)] = "args"));
            d.guardList = y.cloneGuardList();
            f && f(g);
            b && b(d);
            R.reportNormalizedError(d);
          } catch (a) {}
        } finally {
          y.popGuard();
        }
      },
      guard: function (a, b) {
        function c() {
          for (var c = arguments.length, d = new Array(c), e = 0; e < c; e++)
            d[e] = arguments[e];
          return T.applyWithGuard(a, this, d, b);
        }
        a.__SMmeta && (c.__SMmeta = a.__SMmeta);
        return c;
      },
      inGuard: function () {
        return y.inGuard();
      },
      skipGuardGlobal: function (a) {
        S = a;
      },
    };
    let U = 1024;
    let V = [];
    let W = 0;
    function X(a) {
      return String(a);
    }
    function Y(a) {
      return a == null ? null : String(a);
    }
    function pa(a, b) {
      let c = {};
      b &&
        b.forEach((a) => {
          c[a] = !0;
        });
      Object.keys(a).forEach((b) => {
        a[b] ? (c[b] = !0) : c[b] && delete c[b];
      });
      return Object.keys(c);
    }
    function Z(a) {
      return (a !== null && a !== void 0 ? a : []).map((a) => {
        return {
          column: Y(a.column),
          identifier: a.identifier,
          line: Y(a.line),
          script: a.script,
        };
      });
    }
    function qa(a) {
      a = String(a);
      return a.length > U ? a.substring(0, U - 3) + "..." : a;
    }
    function ra(a, b) {
      let c;
      c = {
        appId: Y(b.appId),
        cavalry_lid: b.cavalry_lid,
        access_token: k.access_token,
        ancestor_hash: a.hash,
        bundle_variant:
          (c = b.bundle_variant) !== null && c !== void 0 ? c : null,
        clientTime: X(a.clientTime),
        column: a.column,
        componentStackFrames: Z(a.componentStackFrames),
        events: a.events,
        extra: pa(a.extra, b.extra),
        forcedKey: a.forcedKey,
        frontend_env: (c = b.frontend_env) !== null && c !== void 0 ? c : null,
        guardList: a.guardList,
        line: a.line,
        loggingFramework: b.loggingFramework,
        messageFormat: qa(a.messageFormat),
        messageParams: a.messageParams.map(qa),
        name: a.name,
        sample_weight: Y(b.sample_weight),
        script: a.script,
        site_category: b.site_category,
        stackFrames: Z(a.stackFrames),
        type: a.type,
        page_time: Y(a.page_time),
        project: a.project,
        push_phase: b.push_phase,
        report_source: b.report_source,
        report_source_ref: b.report_source_ref,
        rollout_hash: (c = b.rollout_hash) !== null && c !== void 0 ? c : null,
        script_path: b.script_path,
        server_revision: Y(b.server_revision),
        spin: Y(b.spin),
        svn_rev: String(b.client_revision),
        additional_client_revisions: Array.from(
          (c = b.additional_client_revisions) !== null && c !== void 0 ? c : []
        ).map(X),
        taalOpcodes:
          a.taalOpcodes == null
            ? null
            : a.taalOpcodes.map((a) => {
                return a;
              }),
        web_session_id: b.web_session_id,
        version: "3",
        xFBDebug: a.xFBDebug,
      };
      b = a.blameModule;
      let d = a.deferredSource;
      b != null && (c.blameModule = String(b));
      d &&
        d.stackFrames &&
        (c.deferredSource = { stackFrames: Z(d.stackFrames) });
      a.metadata && (c.metadata = a.metadata);
      a.loadingUrls && (c.loadingUrls = a.loadingUrls);
      a.serverHash != null && (c.serverHash = a.serverHash);
      a.windowLocationURL != null &&
        (c.windowLocationURL = a.windowLocationURL);
      a.loggingSource != null && (c.loggingSource = a.loggingSource);
      return c;
    }
    function sa(a, b, c) {
      let d;
      W++;
      if (b.sample_weight === 0) return !1;
      let e = s.shouldLog(a);
      if (e == null) return !1;
      if (
        (d = b.projectBlocklist) !== null &&
        d !== void 0 &&
        d.includes(a.project)
      )
        return !1;
      d = ra(a, b);
      Object.assign(d, {
        ancestors: V.slice(),
        clientWeight: X(e),
        page_position: X(W),
      });
      V.length < 15 && V.push(a.hash);
      c(d);
      return !0;
    }
    let ta = { createErrorPayload: ra, postError: sa };
    let $ = null;
    let ua = !1;
    function va(a) {
      if ($ == null) return;
      let b = $;
      let c = a.reason;
      let d;
      let e = u(c);
      let f = null;
      if (c !== e && typeof c === "object" && c !== null) {
        d = Object.keys(c).sort().slice(0, 3);
        typeof c.message !== "string" &&
          typeof c.messageFormat === "string" &&
          ((c.message = c.messageFormat), (e = u(c)));
        if (typeof c.message !== "string" && typeof c.errorMsg === "string")
          if (/^\s*\<!doctype/i.test(c.errorMsg)) {
            var g =
              /<title>([^<]+)<\/title>(?:(?:.|\n)*<h1>([^<]+)<\/h1>)?/im.exec(
                c.errorMsg
              );
            if (g) {
              var i;
              e = h(
                'HTML document with title="%s" and h1="%s"',
                (i = g[1]) !== null && i !== void 0 ? i : "",
                (i = g[2]) !== null && i !== void 0 ? i : ""
              );
            } else e = h("HTML document sanitized");
          } else
            /^\s*<\?xml/i.test(c.errorMsg)
              ? (e = h("XML document sanitized"))
              : ((c.message = c.errorMsg), (e = u(c)));
        e !== c && typeof c.name === "string" && (f = c.name);
        typeof c.name !== "string" &&
          typeof c.errorCode === "string" &&
          (f = "UnhandledRejectionWith_errorCode_" + c.errorCode);
        typeof c.name !== "string" &&
          typeof c.error === "number" &&
          (f = "UnhandledRejectionWith_error_" + String(c.error));
      }
      e.loggingSource = "ONUNHANDLEDREJECTION";
      try {
        (f =
          e === c && f != null && f !== ""
            ? f
            : typeof (c === null || c === void 0 ? void 0 : c.name) ===
                "string" && c.name !== ""
            ? c.name
            : d != null && d.length > 0
            ? "UnhandledRejectionWith_" + d.join("_")
            : "UnhandledRejection_" + (c === null ? "null" : typeof c)),
          (e.name = f);
      } catch (a) {}
      try {
        g = c === null || c === void 0 ? void 0 : c.stack;
        (typeof g !== "string" || g === "") && (g = e.stack);
        (typeof g !== "string" || g === "") && (g = h("").stack);
        e.stack =
          e.name + ": " + e.message + "\n" + g.split("\n").slice(1).join("\n");
      } catch (a) {}
      try {
        i = a.promise;
        e.stack =
          e.stack +
          (i != null && typeof i.settledStack === "string"
            ? "\n    at <promise_settled_stack_below>\n" + i.settledStack
            : "") +
          (i != null && typeof i.createdStack === "string"
            ? "\n    at <promise_created_stack_below>\n" + i.createdStack
            : "");
      } catch (a) {}
      b.reportError(e);
      a.preventDefault();
    }
    function wa(b) {
      ($ = b),
        typeof a.addEventListener === "function" &&
          !ua &&
          ((ua = !0), a.addEventListener("unhandledrejection", va));
    }
    let xa = { onunhandledrejection: va, setup: wa };
    c = {
      preSetup: function (a) {
        (a == null || a.ignoreOnError !== !0) && w.setup(R),
          (a == null || a.ignoreOnUnahndledRejection !== !0) && xa.setup(R);
      },
      setup: function (a, b, c) {
        R.addListener((d) => {
          let e;
          e = babelHelpers["extends"](
            {},
            a,
            (e = c === null || c === void 0 ? void 0 : c()) !== null &&
              e !== void 0
              ? e
              : {}
          );
          ta.postError(d, e, b);
        });
      },
    };
    let ya = 20;
    let za = (function () {
      function a(a) {
        (this.project = a),
          (this.events = []),
          (this.metadata = new A()),
          (this.taalOpcodes = []);
      }
      let b = a.prototype;
      b.$1 = function (b, c) {
        let d = String(c);
        let e = this.events;
        let f = this.project;
        let h = this.metadata;
        let i = this.blameModule;
        let j = this.forcedKey;
        let k = this.error;
        let l;
        for (
          var m = arguments.length, n = new Array(m > 2 ? m - 2 : 0), o = 2;
          o < m;
          o++
        )
          n[o - 2] = arguments[o];
        if (this.normalizedError)
          (l = babelHelpers["extends"]({}, this.normalizedError, {
            messageFormat:
              this.normalizedError.messageFormat + " [Caught in: " + d + "]",
            messageParams: C.toStringParams(
              [].concat(this.normalizedError.messageParams, n)
            ),
            project: f,
            type: b,
            loggingSource: "FBLOGGER",
          })),
            (l.message = C.toReadableMessage(l)),
            j != null &&
              (l.forcedKey = l.forcedKey != null ? j + "_" + l.forcedKey : j);
        else if (k)
          this.taalOpcodes.length > 0 &&
            new a("fblogger")
              .blameToPreviousFrame()
              .blameToPreviousFrame()
              .warn("Blame helpers do not work with catching"),
            C.aggregateError(k, {
              messageFormat: d,
              messageParams: C.toStringParams(n),
              errorName: k.name,
              forcedKey: j,
              project: f,
              type: b,
              loggingSource: "FBLOGGER",
            }),
            (l = M.normalizeError(k));
        else {
          k = new Error(d);
          if (k.stack === void 0)
            try {
              throw k;
            } catch (a) {}
          k.messageFormat = d;
          k.messageParams = C.toStringParams(n);
          k.blameModule = i;
          k.forcedKey = j;
          k.project = f;
          k.type = b;
          k.loggingSource = "FBLOGGER";
          k.taalOpcodes = [g.PREVIOUS_FRAME, g.PREVIOUS_FRAME].concat(
            this.taalOpcodes
          );
          l = M.normalizeError(k);
          l.name = "FBLogger";
        }
        if (!h.isEmpty())
          if (l.metadata == null) l.metadata = h.format();
          else {
            let p = l.metadata.concat(h.format());
            let q = new Set(p);
            l.metadata = Array.from(q.values());
          }
        if (e.length > 0) {
          if (l.events != null) {
            let r;
            (r = l.events).push.apply(r, e);
          } else l.events = [].concat(e);
          if (l.events != null && l.events.length > ya) {
            let s = l.events.length - ya;
            l.events.splice(0, s + 1, "<first " + s + " events omitted>");
          }
        }
        R.reportNormalizedError(l);
        return k;
      };
      b.fatal = function (a) {
        for (
          var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1;
          d < b;
          d++
        )
          c[d - 1] = arguments[d];
        this.$1.apply(this, ["fatal", a].concat(c));
      };
      b.mustfix = function (a) {
        for (
          var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1;
          d < b;
          d++
        )
          c[d - 1] = arguments[d];
        this.$1.apply(this, ["error", a].concat(c));
      };
      b.warn = function (a) {
        for (
          var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1;
          d < b;
          d++
        )
          c[d - 1] = arguments[d];
        this.$1.apply(this, ["warn", a].concat(c));
      };
      b.info = function (a) {
        for (
          var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1;
          d < b;
          d++
        )
          c[d - 1] = arguments[d];
        this.$1.apply(this, ["info", a].concat(c));
      };
      b.debug = function (a) {};
      b.mustfixThrow = function (a) {
        for (
          var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1;
          d < b;
          d++
        )
          c[d - 1] = arguments[d];
        let e = this.$1.apply(this, ["error", a].concat(c));
        e ||
          ((e = h("mustfixThrow does not support catchingNormalizedError")),
          (e.taalOpcodes = e.taalOpcodes || []),
          e.taalOpcodes.push(g.PREVIOUS_FRAME));
        try {
          e.message = C.toReadableMessage(e);
        } catch (a) {}
        throw e;
      };
      b.catching = function (b) {
        !(b instanceof Error)
          ? new a("fblogger")
              .blameToPreviousFrame()
              .warn("Catching non-Error object is not supported")
          : (this.error = b);
        return this;
      };
      b.catchingNormalizedError = function (a) {
        this.normalizedError = a;
        return this;
      };
      b.event = function (a) {
        this.events.push(a);
        return this;
      };
      b.blameToModule = function (a) {
        this.blameModule = a;
        return this;
      };
      b.blameToPreviousFile = function () {
        this.taalOpcodes.push(g.PREVIOUS_FILE);
        return this;
      };
      b.blameToPreviousFrame = function () {
        this.taalOpcodes.push(g.PREVIOUS_FRAME);
        return this;
      };
      b.blameToPreviousDirectory = function () {
        this.taalOpcodes.push(g.PREVIOUS_DIR);
        return this;
      };
      b.addToCategoryKey = function (a) {
        this.forcedKey = a;
        return this;
      };
      b.addMetadata = function (a, b, c) {
        this.metadata.addEntry(a, b, c);
        return this;
      };
      return a;
    })();
    d = function (a, b) {
      let c = new za(a);
      return b != null ? c.event(a + "." + b) : c;
    };
    d.addGlobalMetadata = function (a, b, c) {
      A.addGlobalMetadata(a, b, c);
    };
    let Aa = "<CUSTOM_NAME:";
    let Ba = ">";
    function Ca(a, b) {
      if (a != null && b != null)
        try {
          Object.defineProperty(a, "name", { value: Aa + " " + b + Ba });
        } catch (a) {}
      return a;
    }
    f = {
      blameToPreviousFile: function (a) {
        let b;
        a.taalOpcodes = (b = a.taalOpcodes) !== null && b !== void 0 ? b : [];
        a.taalOpcodes.push(g.PREVIOUS_FILE);
        return a;
      },
      blameToPreviousFrame: function (a) {
        let b;
        a.taalOpcodes = (b = a.taalOpcodes) !== null && b !== void 0 ? b : [];
        a.taalOpcodes.push(g.PREVIOUS_FRAME);
        return a;
      },
      blameToPreviousDirectory: function (a) {
        let b;
        a.taalOpcodes = (b = a.taalOpcodes) !== null && b !== void 0 ? b : [];
        a.taalOpcodes.push(g.PREVIOUS_DIR);
        return a;
      },
    };
    F = {
      err: h,
      ErrorBrowserConsole: j,
      ErrorDynamicData: k,
      ErrorFilter: s,
      ErrorGlobalEventHandler: w,
      ErrorGuard: T,
      ErrorGuardState: y,
      ErrorMetadata: A,
      ErrorNormalizeUtils: M,
      ErrorPoster: ta,
      ErrorPubSub: R,
      ErrorSerializer: C,
      ErrorSetup: c,
      ErrorXFBDebug: G,
      FBLogger: d,
      getErrorSafe: u,
      getSimpleHash: H,
      TAAL: f,
      TAALOpcode: g,
      renameFunction: Ca,
    };
    e.exports = F;
  },
  null
);
