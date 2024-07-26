/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

// __d(
//   "AsyncRequest",
//   [
//     "errorCode",
//     "fbt",
//     "invariant",
//     "Arbiter",
//     "AsyncDOM",
//     "AsyncRequestConfig",
//     "AsyncResponse",
//     "Bootloader",
//     "CSS",
//     "DTSG",
//     "DTSG_ASYNC",
//     "Deferred",
//     "Env",
//     "ErrorGuard",
//     "Event",
//     "FBLogger",
//     "FetchStreamTransport",
//     "HTTPErrors",
//     "HasteResponse",
//     "PHPQuerySerializer",
//     "Parent",
//     "Promise",
//     "ResourceTimingsStore",
//     "ResourceTypes",
//     "Run",
//     "ScriptPath",
//     "ServerJS",
//     "SessionName",
//     "TimeSlice",
//     "URI",
//     "UserAgent_DEPRECATED",
//     "ZeroRewrites",
//     "bind",
//     "clearTimeout",
//     "emptyFunction",
//     "executeAfter",
//     "fb-error",
//     "ge",
//     "getAsyncHeaders",
//     "getAsyncParams",
//     "gkx",
//     "goURI",
//     "isBulletinDotComURI",
//     "isEmpty",
//     "isFacebookURI",
//     "isHorizonDotMetaDotComURI",
//     "isInternalFBURI",
//     "isMessengerDotComURI",
//     "isSparkDotMetaDotComURI",
//     "isWorkDotMetaDotComURI",
//     "isWorkplaceDotComURI",
//     "isWorkroomsDotComURI",
//     "performanceAbsoluteNow",
//     "promiseDone",
//     "replaceTransportMarkers",
//     "setTimeout",
//     "setTimeoutAcrossTransitions",
//     "unrecoverableViolation",
//     "uriIsRelativePath",
//   ],
//   (a, b, c, d, e, f, g, h, i, j) => {
//     let k;
//     let l;
//     let m;
//     let n;
//     let o;
//     let p;
//     let q;
//     f = 19e3;
//     h = 500;
//     let r = 1006;
//     let s = 1004;
//     let t = 1010;
//     let u = new Set([h, t, s, r]);
//     let v = !1;
//     d("Run").onAfterUnload(() => {
//       v = !0;
//     });
//     function w() {
//       return v;
//     }
//     function x(a) {
//       return "onprogress" in a;
//     }
//     function y(a) {
//       return "upload" in a && "onprogress" in a.upload;
//     }
//     function z(a) {
//       return "withCredentials" in a;
//     }
//     function A(a) {
//       return a.status in { 0: 1, 12029: 1, 12030: 1, 12031: 1, 12152: 1 };
//     }
//     function B(a) {
//       a = !a || typeof a === "function";
//       a ||
//         c("FBLogger")("asyncresponse").mustfix(
//           "AsyncRequest response handlers must be functions. Pass a function, or use bind() to build one."
//         );
//       return a;
//     }
//     let C = 2;
//     let D = C;
//     let E = !1;
//     c("Arbiter").subscribe("page_transition", (a, b) => {
//       !E ? (D = b.id) : (E = !1);
//     });
//     let F = "for (;;);";
//     let G = F.length;
//     let H = (function () {
//       function a(b) {
//         let e = this;
//         let f;
//         this._allowIrrelevantRequests = !1;
//         this._delayPreDisplayJS = !1;
//         this._shouldReplaceTransportMarkers = !1;
//         this._dispatchErrorResponse = function (a, b) {
//           let d = a.getError();
//           e.clearStatusIndicator();
//           if (!e._isRelevant() || d === t) {
//             e.abort();
//             return;
//           }
//           if (e._isServerDialogErrorCode(d)) {
//             let f = d == 1357008 || d == 1357007;
//             e.interceptHandler(a);
//             d == 1357041
//               ? e._solveQuicksandChallenge(a)
//               : d == 1357007
//               ? e._displayServerDialog(a, f, !0)
//               : e._displayServerDialog(a, f);
//           } else if (e.initialHandler(a) !== !1) {
//             c("clearTimeout")(e.timer);
//             try {
//               b(a);
//             } catch (b) {
//               e.finallyHandler(a);
//               throw b;
//             }
//             e.finallyHandler(a);
//           }
//         };
//         this._onStateChange = function () {
//           let b = e.transport;
//           if (!b) return;
//           try {
//             a._inflightCount--;
//             d("ResourceTimingsStore").measureResponseReceived(
//               c("ResourceTypes").XHR,
//               e.resourceTimingStoreUID
//             );
//             try {
//               b.getResponseHeader("X-FB-Debug") &&
//                 ((e._xFbServer = b.getResponseHeader("X-FB-Debug")),
//                 c("fb-error").ErrorXFBDebug.add(e._xFbServer));
//             } catch (a) {}
//             if (b.status >= 200 && b.status < 300)
//               (a.lastSuccessTime = Date.now()), e._handleXHRResponse(b);
//             else if (
//               d("UserAgent_DEPRECATED").webkit() &&
//               typeof b.status === "undefined"
//             )
//               e._invokeErrorHandler(1002);
//             else if (
//               c("AsyncRequestConfig").retryOnNetworkError &&
//               A(b) &&
//               e.remainingRetries > 0 &&
//               !e._requestTimeout
//             ) {
//               e.remainingRetries--;
//               delete e.transport;
//               e.send(!0);
//               return;
//             } else e._invokeErrorHandler();
//             e.getOption("asynchronous_DEPRECATED") !== !1 && delete e.transport;
//           } catch (a) {
//             if (w()) return;
//             delete e.transport;
//             e.remainingRetries > 0
//               ? (e.remainingRetries--, e.send(!0))
//               : (e.getOption("suppressErrorAlerts") ||
//                   c("FBLogger")("AsyncRequest")
//                     .catching(a)
//                     .mustfix(
//                       "AsyncRequest exception when attempting to handle a state change"
//                     ),
//                 e._invokeErrorHandler(1007));
//           }
//         };
//         this._handleTimeout = function () {
//           e.continuation.last(() => {
//             e._requestTimeout = !0;
//             let a = e.timeoutHandler;
//             e.abandon();
//             a && a(e);
//             c("setTimeout")(() => {
//               c("Arbiter").inform("AsyncRequest/timeout", { request: e });
//             }, 0);
//           });
//         };
//         this.continuation = c("TimeSlice").getPlaceholderReusableContinuation();
//         this.transport = null;
//         this.method = "POST";
//         this.uri = "";
//         this.timeout = null;
//         this.timer = null;
//         this.initialHandler = f = c("emptyFunction");
//         this.handler = null;
//         this.uploadProgressHandler = null;
//         this.errorHandler = c("AsyncResponse").defaultErrorHandler;
//         this.transportErrorHandler = null;
//         this.timeoutHandler = null;
//         this.interceptHandler = f;
//         this.finallyHandler = f;
//         this.abortHandler = f;
//         this.serverDialogCancelHandler = null;
//         this.relativeTo = null;
//         this.statusElement = null;
//         this.statusClass = "";
//         this.data = {};
//         this.headers = {};
//         this.file = null;
//         this.context = {};
//         this.readOnly = !1;
//         this.writeRequiredParams = [];
//         this.remainingRetries = 0;
//         this.userActionID = "-";
//         this.resourceTimingStoreUID = d("ResourceTimingsStore").getUID(
//           c("ResourceTypes").XHR,
//           b != null ? b.toString() : ""
//         );
//         this.flushedResponseTextParseIndex = 0;
//         this.option = {
//           asynchronous_DEPRECATED: !0,
//           suppressErrorHandlerWarning: !1,
//           suppressEvaluation: !1,
//           suppressErrorAlerts: !1,
//           retries: 0,
//           bundle: !1,
//           useIframeTransport: !1,
//           handleErrorAfterUnload: !1,
//           useFetchWithIframeFallback: !1,
//         };
//         this.transportErrorHandler = c("bind")(this, "errorHandler");
//         b !== void 0 && this.setURI(b);
//         this.setAllowCrossPageTransition(
//           c("AsyncRequestConfig").asyncRequestsSurviveTransitionsDefault || !1
//         );
//       }
//       let f = a.prototype;
//       f._dispatchResponse = function (a) {
//         this.clearStatusIndicator();
//         if (!this._isRelevant()) {
//           this._invokeErrorHandler(t);
//           return;
//         }
//         if (this.initialHandler(a) === !1) return;
//         c("clearTimeout")(this.timer);
//         let b;
//         let d = this.getHandler();
//         if (d)
//           try {
//             b = this._shouldSuppressJS(d(a));
//           } catch (b) {
//             a.is_last && this.finallyHandler(a);
//             throw b;
//           }
//         b || this._handleJSResponse(a);
//         a.is_last && this.finallyHandler(a);
//       };
//       f._shouldSuppressJS = function (b) {
//         return b === a.suppressOnloadToken;
//       };
//       f._handlePreDisplayServerJS = function (a, b) {
//         let d = !1;
//         let e = [];
//         let f = function () {
//           if (d) {
//             c("FBLogger")("AsyncResponse").warn(
//               "registerToBlockDisplayUntilDone_DONOTUSE called after AsyncResponse display started. This is a no-op."
//             );
//             return function () {};
//           }
//           let a;
//           let b = new (c("Deferred"))();
//           e.push(b.getPromise());
//           return c("TimeSlice").guard(
//             () => {
//               a && c("clearTimeout")(a), b.resolve();
//             },
//             "AsyncRequestDisplayBlockingEvent",
//             { propagationType: c("TimeSlice").PropagationType.EXECUTION }
//           );
//         };
//         a.handle(b, {
//           bigPipeContext: { registerToBlockDisplayUntilDone_DONOTUSE: f },
//         });
//         d = !0;
//         return e;
//       };
//       f._hasEvalDomOp = function (a) {
//         return a && a.length
//           ? a.some((a) => {
//               return a[0] === "eval";
//             })
//           : !1;
//       };
//       f._handleJSResponse = function (a) {
//         let b = this.getRelativeTo();
//         let e = a.domops;
//         let f = a.dtsgToken;
//         let g = a.dtsgAsyncGetToken;
//         let h = a.jsmods;
//         let i = a.savedServerJSInstance;
//         i && i instanceof c("ServerJS") ? (i = i) : (i = new (c("ServerJS"))());
//         i.setRelativeTo(b);
//         if (h) {
//           var j = {
//             define: h.define,
//             instances: h.instances,
//             markup: h.markup,
//           };
//           delete h.define;
//           delete h.instances;
//           delete h.markup;
//           this._hasEvalDomOp(e) &&
//             ((j.elements = h.elements), delete h.elements);
//           i.handle(j);
//         }
//         j = new (m || (m = c("URI")))(this.uri);
//         ((!j.getDomain() && !j.getProtocol()) ||
//           document.location.origin === j.getOrigin()) &&
//           (f && d("DTSG").setToken(f), g && d("DTSG_ASYNC").setToken(g));
//         e &&
//           (q || (q = c("ErrorGuard"))).applyWithGuard(
//             () => {
//               return d("AsyncDOM").invoke(e, b);
//             },
//             null,
//             [],
//             { errorType: "warn" }
//           );
//         h && i.handle(h);
//         this._handleJSRegisters(a, "onload");
//         this._handleJSRegisters(a, "onafterload");
//       };
//       f._handleJSRegisters = function (a, b) {
//         a = a[b];
//         if (a)
//           for (b = 0; b < a.length; b++) {
//             let d = null;
//             let e = a[b];
//             let f = e.match(/^\"caller:([^\"]+?)\";(.*)/);
//             f != null && ((d = f[1]), (e = f[2]));
//             (q || (q = c("ErrorGuard"))).applyWithGuard(
//               new Function(e),
//               this,
//               []
//             );
//             c("FBLogger")("comet_infra").info(
//               "Detected dynamic new Function(...) call in AsyncRequest._handleJSRegisters(...).",
//               new (m || (m = c("URI")))(this.uri).getPath(),
//               d
//             );
//           }
//       };
//       f.invokeResponseHandler = function (a) {
//         let e = this;
//         if (typeof a.redirect !== "undefined") {
//           c("setTimeout")(() => {
//             e.setURI(a.redirect, !0).send();
//           }, 0);
//           return;
//         }
//         if (a.bootloadOnly !== void 0) {
//           var f =
//             typeof a.bootloadOnly === "string"
//               ? JSON.parse(a.bootloadOnly)
//               : a.bootloadOnly;
//           var g = function (a) {
//             c("TimeSlice").guard(
//               () => {
//                 c("Bootloader").loadPredictedResourceMap(a);
//               },
//               "Bootloader.loadPredictedResourceMap",
//               { root: !0 }
//             )();
//           };
//           for (f of f) g(f);
//           return;
//         }
//         if (
//           !this.handler &&
//           !this.errorHandler &&
//           !this.transportErrorHandler &&
//           !this.preBootloadHandler &&
//           this.initialHandler === c("emptyFunction") &&
//           this.finallyHandler === c("emptyFunction")
//         )
//           return;
//         let h = a.asyncResponse;
//         if (typeof h !== "undefined") {
//           if (!this._isRelevant()) {
//             this._invokeErrorHandler(t);
//             return;
//           }
//           h.updateScriptPath &&
//             c("ScriptPath").set(
//               h.updateScriptPath.path,
//               h.updateScriptPath.token,
//               h.updateScriptPath.extra_info
//             );
//           h.lid && ((this._responseTime = Date.now()), (this.lid = h.lid));
//           d("HasteResponse").handleSRPayload((g = h.hsrp) != null ? g : {});
//           let i;
//           let j;
//           if (h.getError() && !h.getErrorIsWarning()) {
//             f = this.getErrorHandler().bind(this);
//             i = (q || (q = c("ErrorGuard"))).guard(
//               this._dispatchErrorResponse,
//               {
//                 name:
//                   "AsyncRequest#_dispatchErrorResponse for " + this.getURI(),
//               }
//             );
//             i = i.bind(this, h, f);
//             j = "error";
//           } else {
//             i = (q || (q = c("ErrorGuard"))).guard(
//               this._dispatchResponse.bind(this),
//               { name: "AsyncRequest#_dispatchResponse for " + this.getURI() }
//             );
//             i = i.bind(this, h);
//             j = "response";
//             g = h.domops;
//             if (
//               !this._delayPreDisplayJS &&
//               h.jsmods &&
//               h.jsmods.pre_display_requires &&
//               !this._hasEvalDomOp(g)
//             ) {
//               f = h.jsmods;
//               g = {
//                 define: f.define,
//                 instances: f.instances,
//                 markup: f.markup,
//               };
//               delete f.define;
//               delete f.instances;
//               delete f.markup;
//               g.pre_display_requires = f.pre_display_requires;
//               delete f.pre_display_requires;
//               f = new (c("ServerJS"))();
//               f.setRelativeTo(this.getRelativeTo());
//               h.savedServerJSInstance = f;
//               let k = this._handlePreDisplayServerJS(f, g);
//               if (k && k.length) {
//                 let m = i;
//                 i = function () {
//                   c("promiseDone")((l || (l = b("Promise"))).all(k).then(m));
//                 };
//               }
//             }
//           }
//           let o = (n || (n = c("performanceAbsoluteNow")))();
//           i = c("executeAfter")(i, () => {
//             c("Arbiter").inform("AsyncRequest/" + j, {
//               request: e,
//               response: h,
//               ts: o,
//             });
//           });
//           this.preBootloadHandler && this.preBootloadHandler(h);
//           c("Bootloader").loadResources((f = h.allResources) != null ? f : [], {
//             onAll: c("AsyncRequestConfig").immediateDispatch
//               ? i
//               : function () {
//                   c("setTimeout")(i, 0);
//                 },
//           });
//         } else
//           typeof a.transportError !== "undefined"
//             ? this._xFbServer
//               ? this._invokeErrorHandler(1008)
//               : this._invokeErrorHandler(1012)
//             : this._invokeErrorHandler(1007);
//       };
//       f._invokeErrorHandler = function (a) {
//         let b = this;
//         let d = this.transport;
//         if (!d) return;
//         let e;
//         if (this.responseText === "") e = 1002;
//         else if (this._requestAborted) e = 1011;
//         else {
//           try {
//             e = a || d.status || s;
//           } catch (a) {
//             e = 1005;
//           }
//           !1 === navigator.onLine && (e = r);
//         }
//         let f;
//         let g;
//         a = !0;
//         if (e === r)
//           (g = i._("No Network Connection")),
//             (f = i._(
//               "Your browser appears to be offline. Please check your internet connection and try again."
//             ));
//         else if (e >= 300 && e <= 399) {
//           g = i._("Redirection");
//           f = i._(
//             "Your access to Facebook was redirected or blocked by a third party at this time, please contact your ISP or reload."
//           );
//           var h = d.getResponseHeader("Location");
//           h && c("goURI")(h, !0);
//           a = !0;
//         } else
//           (g = i._("Oops")),
//             (f = i._(
//               "Something went wrong. We're working on getting this fixed as soon as we can. You may be able to try again."
//             ));
//         let j = new (c("AsyncResponse"))(this, d);
//         Object.assign(j, {
//           error: e,
//           errorSummary: g,
//           errorDescription: f,
//           silentError: a,
//         });
//         c("setTimeout")(() => {
//           c("Arbiter").inform("AsyncRequest/error", {
//             request: b,
//             response: j,
//           });
//         }, 0);
//         if (w() && !this.getOption("handleErrorAfterUnload")) return;
//         if (!this.transportErrorHandler) {
//           c("FBLogger")("asyncresponse").mustfix(
//             "Async request to %s failed with a %d error, but there was no error handler available to deal with it.",
//             this.getURI(),
//             e
//           );
//           return;
//         }
//         h = this.getTransportErrorHandler().bind(this);
//         !(this.getOption("suppressErrorAlerts") || u.has(e))
//           ? c("FBLogger")("asyncresponse")
//               .addToCategoryKey(String(e))
//               .mustfix(
//                 "Async request failed with error %s: %s when requesting %s",
//                 e,
//                 f.toString(),
//                 this.getURI()
//               )
//           : u.has(e) &&
//             c("FBLogger")("asyncresponse")
//               .addToCategoryKey(String(e))
//               .warn(
//                 "Async request failed with error %s: %s when requesting %s",
//                 e,
//                 f.toString(),
//                 this.getURI()
//               );
//         (q || (q = c("ErrorGuard"))).applyWithGuard(
//           this._dispatchErrorResponse,
//           this,
//           [j, h]
//         );
//       };
//       f._isServerDialogErrorCode = function (a) {
//         return (
//           a == 1357008 ||
//           a == 1357007 ||
//           a == 1357041 ||
//           a == 1442002 ||
//           a == 1357001
//         );
//       };
//       f._solveQuicksandChallenge = function (a) {
//         let b = this;
//         let d = a.getPayload();
//         c("Bootloader").loadModules(
//           ["QuickSandSolver"],
//           (a) => {
//             a.solveAndSendRequestBack(b, d);
//           },
//           "AsyncRequest"
//         );
//       };
//       f._displayServerDialog = function (a, b, d) {
//         let e = this;
//         d === void 0 && (d = !1);
//         let f = a.getPayload();
//         if (f.__dialog !== void 0) {
//           this._displayServerLegacyDialog(a, b);
//           return;
//         }
//         b = f.__dialogx;
//         new (c("ServerJS"))().handle(b);
//         if (f.__should_use_mwa_reauth === !0) {
//           c("Bootloader").loadModules(
//             ["MWADeveloperReauthBarrier"],
//             (b) => {
//               b.registerRequest(f.__dialogID, e, a);
//             },
//             "AsyncRequest"
//           );
//           return;
//         }
//         c("Bootloader").loadModules(
//           ["ConfirmationDialog"],
//           (b) => {
//             b.setupConfirmation(a, e, d);
//           },
//           "AsyncRequest"
//         );
//       };
//       f._displayServerLegacyDialog = function (a, b) {
//         let d = this;
//         let e = a.getPayload().__dialog;
//         if (c("gkx")("20935")) {
//           let f;
//           c("FBLogger")("comet_infra")
//             .addMetadata("COMET_INFRA", "ERROR_CODE", a.getError().toString())
//             .addMetadata(
//               "COMET_INFRA",
//               "ERROR_URL",
//               (f = (f = a.request) == null ? void 0 : f.getURI()) != null
//                 ? f
//                 : "unknown"
//             )
//             .mustfix("AsyncRequest._displayServerLegacyDialog called in Comet");
//         }
//         c("Bootloader").loadModules(
//           ["Dialog"],
//           (c) => {
//             c = new c(e);
//             b && c.setHandler(d._displayConfirmationHandler.bind(d, c));
//             c.setCancelHandler(() => {
//               let b = d.getServerDialogCancelHandler();
//               try {
//                 b && b(a);
//               } catch (a) {
//                 throw a;
//               } finally {
//                 d.finallyHandler(a);
//               }
//             })
//               .setCausalElement(d.relativeTo)
//               .show();
//           },
//           "AsyncRequest"
//         );
//       };
//       f._displayConfirmationHandler = function (a) {
//         (this.data.confirmed = 1),
//           Object.assign(this.data, a.getFormData()),
//           this.send();
//       };
//       f._setJSONPTransport = function (a) {
//         a.subscribe("response", this._handleJSONPResponse.bind(this)),
//           a.subscribe("abort", this._handleJSONPAbort.bind(this)),
//           (this.transport = a);
//       };
//       f._handleJSONPResponse = function (a, b) {
//         a = this.transport;
//         if (!a) return;
//         b.bootloadOnly || (this.is_first = this.is_first === void 0);
//         b = this._interpretResponse(b);
//         b.asyncResponse &&
//           ((b.asyncResponse.is_first = this.is_first),
//           (b.asyncResponse.is_last = a.hasFinished()));
//         this.invokeResponseHandler(b);
//         a.hasFinished() && delete this.transport;
//       };
//       f._handleJSONPAbort = function () {
//         this._invokeErrorHandler(), delete this.transport;
//       };
//       f._handleXHRResponse = function (a) {
//         let b;
//         if (this.getOption("suppressEvaluation"))
//           b = { asyncResponse: new (c("AsyncResponse"))(this, a) };
//         else
//           try {
//             this._handleFlushedResponse();
//             a = a.responseText;
//             a = this._filterOutFlushedText(a);
//             a = this._unshieldResponseText(a);
//             a = JSON.parse(a);
//             b = this._interpretResponse(a);
//           } catch (a) {
//             (b = a.message),
//               c("FBLogger")("async_request")
//                 .catching(a)
//                 .warn("Failed to handle response");
//           }
//         this.invokeResponseHandler(b);
//       };
//       f._handleFlushedResponse = function () {
//         let a = this.flushedResponseHandler;
//         let b = this.transport;
//         if (a && b) {
//           let c = b.responseText.indexOf(F);
//           c = c === -1 ? b.responseText.length : c;
//           a(b.responseText.substring(this.flushedResponseTextParseIndex, c));
//           this.flushedResponseTextParseIndex = c;
//         }
//       };
//       f._unshieldResponseText = function (a) {
//         if (a.length <= G) throw new Error("Response too short on async");
//         let b = 0;
//         while (a.charAt(b) == " " || a.charAt(b) == "\n") b++;
//         b && a.substring(b, b + G) == F;
//         return a.substring(b + G);
//       };
//       f._filterOutFlushedText = function (a) {
//         if (!this.flushedResponseHandler) return a;
//         let b = a.indexOf(F);
//         return b < 0 ? a : a.substr(b);
//       };
//       f._interpretResponse = function (a) {
//         if (a.redirect) return { redirect: a.redirect };
//         if (a.bootloadOnly) return { bootloadOnly: a.bootloadOnly };
//         let b = a.error && this._isServerDialogErrorCode(a.error);
//         this._shouldReplaceTransportMarkers &&
//           a.payload &&
//           !b &&
//           c("replaceTransportMarkers")(
//             { relativeTo: this.getRelativeTo(), bigPipeContext: null },
//             a.payload
//           );
//         b = new (c("AsyncResponse"))(this);
//         if (a.__ar != 1)
//           c("FBLogger")("AsyncRequest").warn(
//             "AsyncRequest to endpoint %s returned a JSON response, but it is not properly formatted. The endpoint needs to provide a response using the AsyncResponse class in PHP.",
//             this.getURI()
//           ),
//             (b.payload = a);
//         else {
//           Object.assign(b, a);
//           a = this.transport;
//           a &&
//             a.getAllResponseHeaders !== void 0 &&
//             (b.responseHeaders = a.getAllResponseHeaders());
//         }
//         return { asyncResponse: b };
//       };
//       f._isMultiplexable = function () {
//         if (
//           this.getOption("useIframeTransport") ||
//           this.getOption("useFetchWithIframeFallback")
//         ) {
//           c("FBLogger")("AsyncRequest").mustfix(
//             "You cannot bundle AsyncRequest that uses iframe transport."
//           );
//           return !1;
//         }
//         if (!c("isFacebookURI")(new (m || (m = c("URI")))(this.uri))) {
//           c("FBLogger")("AsyncRequest").mustfix(
//             "You can not bundle AsyncRequest sent to non-facebook URIs.  Uri: %s",
//             this.getURI()
//           );
//           return !1;
//         }
//         if (!this.getOption("asynchronous_DEPRECATED")) {
//           c("FBLogger")("AsyncRequest").mustfix(
//             "We cannot bundle synchronous AsyncRequests"
//           );
//           return !1;
//         }
//         return !0;
//       };
//       f.handleResponse = function (a) {
//         a = this._interpretResponse(a);
//         this.invokeResponseHandler(a);
//       };
//       f.setMethod = function (a) {
//         this.method = a.toString().toUpperCase();
//         return this;
//       };
//       f.getMethod = function () {
//         return this.method;
//       };
//       f.setData = function (a) {
//         this.data = a;
//         return this;
//       };
//       f.setRequestHeader = function (a, b) {
//         this.headers[a] = b;
//         return this;
//       };
//       f.setRawData = function (a) {
//         this.rawData = a;
//         return this;
//       };
//       f.getData = function () {
//         return this.data;
//       };
//       f.setContextData = function (a, b, c) {
//         c = c === void 0 ? !0 : c;
//         c && (this.context["_log_" + a] = b);
//         return this;
//       };
//       f._setUserActionID = function () {
//         this.userActionID = (d("SessionName").getName() || "-") + "/-";
//       };
//       f.setURI = function (a, b) {
//         b === void 0 && (b = !1);
//         typeof a === "string" &&
//           a.match(/^\/?u_\d+_\d+/) &&
//           c("FBLogger")("asyncrequest").warn("Invalid URI %s", a);
//         let e = new (m || (m = c("URI")))(a);
//         if (
//           (this.getOption("useIframeTransport") ||
//             this.getOption("useFetchWithIframeFallback")) &&
//           !c("isFacebookURI")(e)
//         ) {
//           b && j(0, 45284);
//           return this;
//         }
//         if (
//           !this._allowCrossOrigin &&
//           !this.getOption("useIframeTransport") &&
//           !this.getOption("useFetchWithIframeFallback") &&
//           !e.isSameOrigin() &&
//           !c("uriIsRelativePath")(e)
//         ) {
//           b && j(0, 45285);
//           return this;
//         }
//         this._setUserActionID();
//         if (!a || e.isEmpty()) {
//           c("FBLogger")("async_request").mustfix("URI cannot be empty");
//           return this;
//         }
//         this.uri = d("ZeroRewrites").rewriteURI(e);
//         return this;
//       };
//       f.getURI = function () {
//         return this.uri.toString();
//       };
//       f.delayPreDisplayJS = function (a) {
//         a === void 0 && (a = !0);
//         this._delayPreDisplayJS = a;
//         return this;
//       };
//       f.setInitialHandler = function (a) {
//         this.initialHandler = a;
//         return this;
//       };
//       f.setPayloadHandler = function (a) {
//         this.setHandler((b) => {
//           a(b.payload);
//         });
//         return this;
//       };
//       f.setHandler = function (a) {
//         B(a) && (this.handler = a);
//         return this;
//       };
//       f.setFlushedResponseHandler = function (a) {
//         B(a) && (this.flushedResponseHandler = a);
//         return this;
//       };
//       f.getHandler = function () {
//         return this.handler || c("emptyFunction");
//       };
//       f.setProgressHandler = function (a) {
//         B(a) && (this.progressHandler = a);
//         return this;
//       };
//       f.setUploadProgressHandler = function (a) {
//         B(a) && (this.uploadProgressHandler = a);
//         return this;
//       };
//       f.setErrorHandler = function (a) {
//         B(a) && (this.errorHandler = a);
//         return this;
//       };
//       f.setTransportErrorHandler = function (a) {
//         this.transportErrorHandler = a;
//         return this;
//       };
//       f.getErrorHandler = function () {
//         return this.errorHandler || c("emptyFunction");
//       };
//       f.getTransportErrorHandler = function () {
//         return this.transportErrorHandler || c("emptyFunction");
//       };
//       f.setTimeoutHandler = function (a, b) {
//         B(b) && ((this.timeout = a), (this.timeoutHandler = b));
//         return this;
//       };
//       f.resetTimeout = function (a) {
//         if (!(this.timeoutHandler === null))
//           if (a === null)
//             (this.timeout = null),
//               c("clearTimeout")(this.timer),
//               (this.timer = null);
//           else {
//             let b = !this._allowCrossPageTransition;
//             this.timeout = a;
//             c("clearTimeout")(this.timer);
//             b
//               ? (this.timer = c("setTimeout")(
//                   this._handleTimeout.bind(this),
//                   this.timeout
//                 ))
//               : (this.timer = c("setTimeoutAcrossTransitions")(
//                   this._handleTimeout.bind(this),
//                   this.timeout
//                 ));
//           }
//         return this;
//       };
//       f.setNewSerial = function () {
//         this.id = ++C;
//         return this;
//       };
//       f.setInterceptHandler = function (a) {
//         this.interceptHandler = a;
//         return this;
//       };
//       f.setFinallyHandler = function (a) {
//         this.finallyHandler = a;
//         return this;
//       };
//       f.setAbortHandler = function (a) {
//         this.abortHandler = a;
//         return this;
//       };
//       f.getServerDialogCancelHandler = function () {
//         return this.serverDialogCancelHandler;
//       };
//       f.setServerDialogCancelHandler = function (a) {
//         this.serverDialogCancelHandler = a;
//         return this;
//       };
//       f.setPreBootloadHandler = function (a) {
//         this.preBootloadHandler = a;
//         return this;
//       };
//       f.setReadOnly = function (a) {
//         typeof a !== "boolean" || (this.readOnly = a);
//         return this;
//       };
//       f.getReadOnly = function () {
//         return this.readOnly;
//       };
//       f.setRelativeTo = function (a) {
//         this.relativeTo = a;
//         return this;
//       };
//       f.getRelativeTo = function () {
//         return this.relativeTo;
//       };
//       f.setStatusClass = function (a) {
//         this.statusClass = a;
//         return this;
//       };
//       f.setStatusElement = function (a) {
//         this.statusElement = a;
//         return this;
//       };
//       f.getStatusElement = function () {
//         return c("ge")(this.statusElement);
//       };
//       f._isRelevant = function () {
//         if (this._allowCrossPageTransition) return !0;
//         return !this.id ? !0 : this.id > D;
//       };
//       f.clearStatusIndicator = function () {
//         let a = this.getStatusElement();
//         a &&
//           (d("CSS").removeClass(a, "async_saving"),
//           d("CSS").removeClass(a, this.statusClass));
//       };
//       f._addStatusIndicator = function () {
//         let a = this.getStatusElement();
//         a &&
//           (d("CSS").addClass(a, "async_saving"),
//           d("CSS").addClass(a, this.statusClass));
//       };
//       f.specifiesWriteRequiredParams = function () {
//         let a = this;
//         return this.writeRequiredParams.every((b) => {
//           a.data[b] =
//             a.data[b] || (o || (o = c("Env")))[b] || (c("ge")(b) || {}).value;
//           return a.data[b] !== void 0 ? !0 : !1;
//         });
//       };
//       f.setOption = function (a, b) {
//         typeof this.option[a] !== "undefined" && (this.option[a] = b);
//         return this;
//       };
//       f.getOption = function (a) {
//         typeof this.option[a] === "undefined";
//         return this.option[a];
//       };
//       f.abort = function () {
//         let a = this;
//         this.continuation.last(() => {
//           let b = a.transport;
//           if (b) {
//             let d = a.getTransportErrorHandler();
//             a.setOption("suppressErrorAlerts", !0);
//             a.setTransportErrorHandler(c("emptyFunction"));
//             a._requestAborted = !0;
//             b.abort();
//             a.setTransportErrorHandler(d);
//           }
//           a.abortHandler();
//           K.unschedule(a);
//         });
//       };
//       f.abandon = function () {
//         let a = this;
//         this.continuation.last(() => {
//           let b;
//           c("clearTimeout")(a.timer);
//           a.setOption("suppressErrorAlerts", !0)
//             .setHandler((b = c("emptyFunction")))
//             .setErrorHandler(b)
//             .setTransportErrorHandler(b)
//             .setProgressHandler(b)
//             .setUploadProgressHandler(b);
//           b = a.transport;
//           b &&
//             ((a._requestAborted = !0),
//             x(b) && delete b.onprogress,
//             y(b) && delete b.upload.onprogress,
//             b.abort());
//           a.abortHandler();
//           K.unschedule(a);
//         });
//       };
//       f.setNectarModuleDataSafe = function (a) {
//         let b = this.setNectarModuleData;
//         b && b.call(this, a);
//         return this;
//       };
//       f.setAllowCrossPageTransition = function (a) {
//         this._allowCrossPageTransition = !!a;
//         this.timer && this.resetTimeout(this.timeout);
//         return this;
//       };
//       f.getAllowIrrelevantRequests = function () {
//         return this._allowIrrelevantRequests;
//       };
//       f.setAllowIrrelevantRequests = function (a) {
//         this._allowIrrelevantRequests = a;
//         return this;
//       };
//       f.setAllowCrossOrigin = function (a) {
//         this._allowCrossOrigin = a;
//         return this;
//       };
//       f.setAllowCredentials = function (a) {
//         this._allowCredentials = a;
//         return this;
//       };
//       f.setIsBackgroundRequest = function (a) {
//         this._isBackgroundRequest = a;
//         return this;
//       };
//       f.setReplaceTransportMarkers = function (a) {
//         a === void 0 && (a = !0);
//         this._shouldReplaceTransportMarkers = a;
//         return this;
//       };
//       f.sendAndReturnAbortHandler = function () {
//         let a = this;
//         this.send();
//         return function () {
//           return a.abort();
//         };
//       };
//       f.send = function (b) {
//         let f = this;
//         b = b || !1;
//         if (!this.uri) return !1;
//         this.errorHandler || !this.getOption("suppressErrorHandlerWarning");
//         (this.getOption("useIframeTransport") ||
//           this.getOption("useFetchWithIframeFallback")) &&
//           this.method != "GET" &&
//           this.setMethod("GET");
//         this.timeoutHandler !== null &&
//           (this.getOption("useIframeTransport") ||
//             this.getOption("useFetchWithIframeFallback"));
//         if (!this.getReadOnly()) {
//           this.specifiesWriteRequiredParams();
//           if (this.method != "POST") return !1;
//         }
//         if (document.location.search.toString().includes(this.uri.toString()))
//           return !1;
//         if (
//           this.uri.toString().includes("/../") ||
//           this.uri.toString().includes("\\../") ||
//           this.uri.toString().includes("/..\\") ||
//           this.uri.toString().includes("\\..\\")
//         )
//           return !1;
//         Object.assign(this.data, c("getAsyncParams")(this.method));
//         (p || (p = c("isEmpty")))(this.context) ||
//           (Object.assign(this.data, this.context), (this.data.ajax_log = 1));
//         (o || (o = c("Env"))).force_param &&
//           Object.assign(this.data, (o || (o = c("Env"))).force_param);
//         this._setUserActionID();
//         if (this.getOption("bundle") && this._isMultiplexable()) {
//           K.schedule(this);
//           return !0;
//         }
//         this.setNewSerial();
//         this.getOption("asynchronous_DEPRECATED") ||
//           this.uri.addQueryData({ __sjax: 1 });
//         c("Arbiter").inform("AsyncRequest/send", {
//           request: this,
//           ts: (n || (n = c("performanceAbsoluteNow")))(),
//         });
//         let g;
//         let h;
//         this.method == "GET" &&
//           this.uri.addQueryData({ fb_dtsg_ag: d("DTSG_ASYNC").getToken() });
//         this.method == "GET" || this.rawData
//           ? ((g = this.uri.addQueryData(this.data).toString()),
//             (h = this.rawData || ""))
//           : (this._allowCrossOrigin && this.uri.addQueryData({ __a: 1 }),
//             (g = this.uri.toString()),
//             (h = (k || (k = d("PHPQuerySerializer"))).serialize(this.data)));
//         if (this.transport) return !1;
//         if (this.getOption("useFetchWithIframeFallback"))
//           try {
//             var i = new (c("FetchStreamTransport"))(this.uri);
//             this._setJSONPTransport(i);
//             this._markRequestSent();
//             i.send();
//             this.setOption("useIframeTransport", !1);
//             return !0;
//           } catch (a) {
//             this.setOption("useFetchWithIframeFallback", !1),
//               this.setOption("useIframeTransport", !0);
//           }
//         if (this.getOption("useIframeTransport")) {
//           e(["JSONPTransport"], (a) => {
//             a = new a(f.uri);
//             f._setJSONPTransport(a);
//             f._markRequestSent();
//             a.send();
//           });
//           return !0;
//         }
//         this.flushedResponseHandler && (this.flushedResponseTextParseIndex = 0);
//         let j;
//         try {
//           j = d("ZeroRewrites").getTransportBuilderForURI(this.uri)();
//         } catch (a) {
//           throw c("unrecoverableViolation")(
//             a.message,
//             "comet_infra",
//             {},
//             { blameToPreviousFrame: 1 }
//           );
//         }
//         if (!j) return !1;
//         this.schedule("AsyncRequest.send");
//         j.onreadystatechange = function () {
//           let a = f.transport;
//           a &&
//             a.readyState >= 2 &&
//             a.readyState <= 3 &&
//             f._handleFlushedResponse();
//           j.readyState === 4 && f.continuation.last(f._onStateChange);
//         };
//         this.progressHandler &&
//           x(j) &&
//           (j.onprogress = function () {
//             for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++)
//               b[c] = arguments[c];
//             f.continuation(() => {
//               f.progressHandler && f.progressHandler.apply(f, b);
//             });
//           });
//         this.uploadProgressHandler &&
//           y(j) &&
//           (j.upload.onprogress = function () {
//             for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++)
//               b[c] = arguments[c];
//             f.continuation(() => {
//               f.uploadProgressHandler && f.uploadProgressHandler.apply(f, b);
//             });
//           });
//         b || (this.remainingRetries = this.getOption("retries"));
//         this.transport = j;
//         try {
//           j.open(
//             this.method,
//             g,
//             c("gkx")("25571") ? !0 : this.getOption("asynchronous_DEPRECATED")
//           );
//         } catch (a) {
//           return !1;
//         }
//         if (
//           !this.uri.isSameOrigin() &&
//           !c("uriIsRelativePath")(this.uri) &&
//           !this.getOption("useIframeTransport") &&
//           !this.getOption("useFetchWithIframeFallback")
//         ) {
//           if (!z(j)) return !1;
//           this._canSendCredentials() && (j.withCredentials = !0);
//         }
//         this.method == "POST" &&
//           !this.rawData &&
//           j.setRequestHeader(
//             "Content-Type",
//             "application/x-www-form-urlencoded"
//           );
//         this._isBackgroundRequest &&
//           j.setRequestHeader("X-FB-BACKGROUND-STATE", "1");
//         let l = c("getAsyncHeaders")(this.uri);
//         Object.keys(l).forEach((a) => {
//           j && j.setRequestHeader(a, l[a]);
//         });
//         c("Arbiter").inform("AsyncRequest/will_send", { request: this });
//         if (j)
//           for (i in this.headers)
//             Object.prototype.hasOwnProperty.call(this.headers, i) &&
//               j.setRequestHeader(i, this.headers[i]);
//         this._addStatusIndicator();
//         this._markRequestSent();
//         j.send(h);
//         this.timeout !== null && this.resetTimeout(this.timeout);
//         a._inflightCount++;
//         return !0;
//       };
//       f.schedule = function (a) {
//         this.continuation = c("TimeSlice").getReusableContinuation(a);
//       };
//       f._canSendCredentials = function () {
//         if (this._allowCredentials === !1) return !1;
//         let a = new (m || (m = c("URI")))(this.uri);
//         return (
//           c("isBulletinDotComURI")(a) ||
//           c("isFacebookURI")(a) ||
//           c("isInternalFBURI")(a) ||
//           c("isMessengerDotComURI")(a) ||
//           c("isWorkplaceDotComURI")(a) ||
//           c("isWorkroomsDotComURI")(a) ||
//           c("isWorkDotMetaDotComURI")(a) ||
//           c("isHorizonDotMetaDotComURI")(a) ||
//           c("isSparkDotMetaDotComURI")(a)
//         );
//       };
//       f._markRequestSent = function () {
//         let a = new (m || (m = c("URI")))(this.getURI())
//           .getQualifiedURI()
//           .toString();
//         d("ResourceTimingsStore").updateURI(
//           c("ResourceTypes").XHR,
//           this.resourceTimingStoreUID,
//           a
//         );
//         d("ResourceTimingsStore")
//           .annotate(c("ResourceTypes").XHR, this.resourceTimingStoreUID)
//           .addStringAnnotation("uri", a);
//         d("ResourceTimingsStore").measureRequestSent(
//           c("ResourceTypes").XHR,
//           this.resourceTimingStoreUID
//         );
//       };
//       f.promisePayload = function (a) {
//         return this.exec().then(
//           (a) => {
//             return a.payload;
//           },
//           (a) => {
//             throw a.toError();
//           }
//         );
//       };
//       f.exec = function (a) {
//         let d = this;
//         if (
//           this.getHandler() !== c("emptyFunction") ||
//           this.getErrorHandler() !== c("AsyncResponse").defaultErrorHandler
//         )
//           throw new Error(
//             "exec is an async function and does not allow previously set handlers"
//           );
//         return new (l || (l = b("Promise")))((b, c) => {
//           d.setHandler(b).setErrorHandler(c).send(a);
//         });
//       };
//       a.bootstrap = function (b, e, f) {
//         let g = "GET";
//         let h = !0;
//         let i = {};
//         (f || (e && e.rel == "async-post")) &&
//           ((g = "POST"),
//           (h = !1),
//           b &&
//             ((b = new (m || (m = c("URI")))(b)),
//             (i = b.getQueryData()),
//             b.setQueryData({})));
//         f = d("Parent").byClass(e, "stat_elem") || e;
//         if (f && d("CSS").hasClass(f, "async_saving")) return !1;
//         b = new a(b)
//           .setReadOnly(h)
//           .setMethod(g)
//           .setData(i)
//           .setNectarModuleDataSafe(e)
//           .setRelativeTo(e);
//         e &&
//           (b.setHandler((a) => {
//             c("Event").fire(e, "success", { response: a });
//           }),
//           b.setErrorHandler((a) => {
//             c("Event").fire(e, "error", { response: a }) !== !1 &&
//               c("AsyncResponse").defaultErrorHandler(a);
//           }));
//         if (f instanceof HTMLElement) {
//           b.setStatusElement(f);
//           h = f.getAttribute("data-status-class");
//           h && b.setStatusClass(h);
//         }
//         b.send();
//         return !1;
//       };
//       a.bootstrap_UNSAFE_LET_ANYONE_IMPERSONATE_THE_USER_FOR_THESE_WRITES =
//         function (b, c, d) {
//           a.bootstrap(b, c, d);
//         };
//       a.post = function (b, c) {
//         new a(b).setReadOnly(!1).setMethod("POST").setData(c).send();
//         return !1;
//       };
//       a.post_UNSAFE_LET_ANYONE_IMPERSONATE_THE_USER_FOR_THESE_WRITES =
//         function (b, c) {
//           a.post(b, c);
//         };
//       a.getLastID = function () {
//         return C;
//       };
//       a.ignoreUpdate = function () {
//         E = !0;
//       };
//       a.getInflightCount = function () {
//         return this._inflightCount;
//       };
//       return a;
//     })();
//     H._inflightCount = 0;
//     let I;
//     let J = [];
//     var K = (function () {
//       function a() {
//         this._requests = [];
//       }
//       let b = a.prototype;
//       b.add = function (a) {
//         this._requests.push(a);
//       };
//       b.remove = function (a) {
//         let b = this._requests;
//         let c = this._requestsSent;
//         for (let d = 0, e = b.length; d < e; d++)
//           b[d] === a && (c ? (b[d] = null) : b.splice(d, 1));
//       };
//       b.send = function () {
//         this._requestsSent && j(0, 4390);
//         this._requestsSent = !0;
//         this._wrapperRequest = null;
//         let a = this._requests;
//         if (!a.length) return;
//         let b;
//         if (a.length === 1) b = a[0];
//         else {
//           a = a.filter(Boolean).map((a) => {
//             return [
//               a.uri.getPath(),
//               (k || (k = d("PHPQuerySerializer"))).serialize(a.data),
//             ];
//           });
//           b = this._wrapperRequest = new H("/ajax/proxy.php")
//             .setAllowCrossPageTransition(!0)
//             .setData({ data: a })
//             .setHandler(this._handler.bind(this))
//             .setTransportErrorHandler(this._transportErrorHandler.bind(this));
//         }
//         b && b.setOption("bundle", !1).send();
//       };
//       b._handler = function (a) {
//         let b = this;
//         let c = a.getPayload().responses;
//         if (c.length !== this._requests.length) return;
//         a = function (a) {
//           let d = b._requests[a];
//           if (!d) return "continue";
//           let e = d.uri.getPath();
//           b._wrapperRequest && (d.id = b._wrapperRequest.id);
//           if (c[a][0] !== e) {
//             d.continuation.last(() => {
//               d.invokeResponseHandler({
//                 transportError:
//                   "Wrong response order in bundled request to " + e,
//               });
//             });
//             return "continue";
//           }
//           d.continuation.last(() => {
//             d.handleResponse(c[a][1]);
//           });
//         };
//         for (let d = 0; d < this._requests.length; d++) {
//           let e = a(d);
//           if (e === "continue") continue;
//         }
//         J.splice(J.indexOf(this, 1));
//       };
//       b._transportErrorHandler = function (a) {
//         let b = this;
//         let c = { transportError: a.errorDescription };
//         a = this._requests.filter(Boolean).map((a) => {
//           b._wrapperRequest && (a.id = b._wrapperRequest.id);
//           a.invokeResponseHandler(c);
//           return a.uri.getPath();
//         });
//       };
//       a.schedule = function (b) {
//         b.schedule("AsyncMultiplex.schedule");
//         I ||
//           ((I = new a()),
//           J.push(I),
//           c("TimeSlice").guard(
//             () => {
//               c("setTimeoutAcrossTransitions")(() => {
//                 I && (I.send(), (I = null));
//               }, 0);
//             },
//             "AsyncMultiplex.schedule",
//             { propagationType: c("TimeSlice").PropagationType.ORPHAN }
//           )());
//         I.add(b);
//         return I;
//       };
//       a.unschedule = function (a) {
//         J.forEach((b) => {
//           b.remove(a);
//         });
//       };
//       return a;
//     })();
//     H.suppressOnloadToken = {};
//     a.AsyncRequest = H;
//     g["default"] = H;
//   },
//   226
// );

import Arbiter from "Arbiter";
import AsyncDOM from "AsyncDOM";
import AsyncRequestConfig from "AsyncRequestConfig";
import AsyncResponse from "AsyncResponse";
import { bind } from "bind";
import Bootloader from "Bootloader";
import CSS from "CSS";
import Deferred from "Deferred";
import DTSG from "DTSG";
import DTSG_ASYNC from "DTSG_ASYNC";
import emptyFunction from "emptyFunction";
import Env from "Env";
import errorCode from "errorCode";
import ErrorGuard from "ErrorGuard";
import Event from "Event";
import executeAfter from "executeAfter";
import { FBError } from "fb-error";
import FBLogger from "FBLogger";
import fbt from "fbt";
import FetchStreamTransport from "FetchStreamTransport";
import ge from "ge";
import getAsyncHeaders from "getAsyncHeaders";
import getAsyncParams from "getAsyncParams";
import gkx from "gkx";
import goURI from "goURI";
import HasteResponse from "HasteResponse";
import HTTPErrors from "HTTPErrors";
import invariant from "invariant";
import Parent from "Parent";
import performanceAbsoluteNow from "performanceAbsoluteNow";
import PHPQuerySerializer from "PHPQuerySerializer";
import Promise from "Promise";
import promiseDone from "promiseDone";
import replaceTransportMarkers from "replaceTransportMarkers";
import ResourceTimingsStore from "ResourceTimingsStore";
import ResourceTypes from "ResourceTypes";
import Run from "Run";
import ScriptPath from "ScriptPath";
import ServerJS from "ServerJS";
import SessionName from "SessionName";
import {
  clearTimeout,
  setTimeout,
  setTimeoutAcrossTransitions,
} from "setTimeout";
import TimeSlice from "TimeSlice";
import unrecoverableViolation from "unrecoverableViolation";
import URI from "URI";
import {
  isBulletinDotComURI,
  isEmpty,
  isFacebookURI,
  isHorizonDotMetaDotComURI,
  isInternalFBURI,
  isMessengerDotComURI,
  isSparkDotMetaDotComURI,
  isWorkDotMetaDotComURI,
  isWorkplaceDotComURI,
  isWorkroomsDotComURI,
  uriIsRelativePath,
} from "uriUtils";
import UserAgent_DEPRECATED from "UserAgent_DEPRECATED";
import ZeroRewrites from "ZeroRewrites";

const DEFAULT_TIMEOUT = 19000;
const RESPONSE_CODES = {
  PROGRESS: 500,
  CLIENT_ERROR: 1006,
  SERVER_ERROR: 1004,
  TIMEOUT_ERROR: 1010,
};
const KNOWN_ERROR_CODES = new Set([
  RESPONSE_CODES.PROGRESS,
  RESPONSE_CODES.TIMEOUT_ERROR,
  RESPONSE_CODES.SERVER_ERROR,
  RESPONSE_CODES.CLIENT_ERROR,
]);

let inflightCount = 0;
let lastSuccessTime = null;
let lastId = 2;
let pageTransitionInProgress = false;

Run.onAfterUnload(() => {
  pageTransitionInProgress = true;
});

class AsyncRequest {
  constructor(uri) {
    this._allowIrrelevantRequests = false;
    this._delayPreDisplayJS = false;
    this._shouldReplaceTransportMarkers = false;
    this._requestTimeout = false;
    this._allowCrossOrigin = false;
    this._allowCredentials = false;
    this._isBackgroundRequest = false;
    this._xFbServer = null;
    this._markRequestSent = null;
    this._canSendCredentials = null;
    this._transportErrorHandler = bind(this, "errorHandler");
    this._dispatchErrorResponse = this._dispatchErrorResponse.bind(this);
    this._onStateChange = this._onStateChange.bind(this);
    this._handleTimeout = this._handleTimeout.bind(this);
    this.continuation = TimeSlice.getPlaceholderReusableContinuation();
    this.transport = null;
    this.method = "POST";
    this.uri = uri ? new URI(uri) : "";
    this.timeout = null;
    this.timer = null;
    this.initialHandler = emptyFunction;
    this.handler = null;
    this.uploadProgressHandler = null;
    this.errorHandler = AsyncResponse.defaultErrorHandler;
    this.interceptHandler = emptyFunction;
    this.finallyHandler = emptyFunction;
    this.abortHandler = emptyFunction;
    this.serverDialogCancelHandler = null;
    this.relativeTo = null;
    this.statusElement = null;
    this.statusClass = "";
    this.data = {};
    this.headers = {};
    this.file = null;
    this.context = {};
    this.readOnly = false;
    this.writeRequiredParams = [];
    this.remainingRetries = 0;
    this.userActionID = "-";
    this.resourceTimingStoreUID = ResourceTimingsStore.getUID(
      ResourceTypes.XHR,
      uri ? uri.toString() : ""
    );
    this.flushedResponseTextParseIndex = 0;
    this.option = {
      asynchronous_DEPRECATED: true,
      suppressErrorHandlerWarning: false,
      suppressEvaluation: false,
      suppressErrorAlerts: false,
      retries: 0,
      bundle: false,
      useIframeTransport: false,
      handleErrorAfterUnload: false,
      useFetchWithIframeFallback: false,
    };
    if (uri !== undefined) {
      this.setURI(uri);
    }
    this.setAllowCrossPageTransition(
      AsyncRequestConfig.asyncRequestsSurviveTransitionsDefault || false
    );
  }

  static suppressOnloadToken = {};

  static getInflightCount() {
    return inflightCount;
  }

  static getLastID() {
    return lastId;
  }

  static ignoreUpdate() {
    lastId++;
  }

  static post(uri, data) {
    new AsyncRequest(uri)
      .setReadOnly(false)
      .setMethod("POST")
      .setData(data)
      .send();
    return false;
  }

  static bootstrap(uri, element, isPost) {
    let method = "GET";
    let isReadOnly = true;
    let data = {};
    if (isPost || (element && element.rel === "async-post")) {
      method = "POST";
      isReadOnly = false;
      if (uri) {
        uri = new URI(uri);
        data = uri.getQueryData();
        uri.setQueryData({});
      }
    }
    const targetElement = Parent.byClass(element, "stat_elem") || element;
    if (targetElement && CSS.hasClass(targetElement, "async_saving"))
      return false;
    const request = new AsyncRequest(uri)
      .setReadOnly(isReadOnly)
      .setMethod(method)
      .setData(data)
      .setNectarModuleDataSafe(element)
      .setRelativeTo(element);
    if (element) {
      request.setHandler((response) =>
        Event.fire(element, "success", { response })
      );
      request.setErrorHandler((response) => {
        if (Event.fire(element, "error", { response }) !== false) {
          AsyncResponse.defaultErrorHandler(response);
        }
      });
    }
    if (targetElement instanceof HTMLElement) {
      request.setStatusElement(targetElement);
      const statusClass = targetElement.getAttribute("data-status-class");
      if (statusClass) {
        request.setStatusClass(statusClass);
      }
    }
    request.send();
    return false;
  }

  setMethod(method) {
    this.method = method.toString().toUpperCase();
    return this;
  }

  getMethod() {
    return this.method;
  }

  setData(data) {
    this.data = data;
    return this;
  }

  setRequestHeader(name, value) {
    this.headers[name] = value;
    return this;
  }

  setRawData(data) {
    this.rawData = data;
    return this;
  }

  getData() {
    return this.data;
  }

  setContextData(key, value, log = true) {
    if (log) {
      this.context[`_log_${key}`] = value;
    }
    return this;
  }

  _setUserActionID() {
    this.userActionID = `${SessionName.getName() || "-"}/-`;
  }

  setURI(uri, forceCrossOrigin = false) {
    if (typeof uri === "string" && uri.match(/^\/?u_\d+_\d+/)) {
      FBLogger("asyncrequest").warn("Invalid URI %s", uri);
    }
    const parsedURI = new URI(uri);
    if (
      (this.getOption("useIframeTransport") ||
        this.getOption("useFetchWithIframeFallback")) &&
      !isFacebookURI(parsedURI)
    ) {
      if (forceCrossOrigin) invariant(0, 45284);
      return this;
    }
    if (
      !this._allowCrossOrigin &&
      !this.getOption("useIframeTransport") &&
      !this.getOption("useFetchWithIframeFallback") &&
      !parsedURI.isSameOrigin() &&
      !uriIsRelativePath(parsedURI)
    ) {
      if (forceCrossOrigin) invariant(0, 45285);
      return this;
    }
    this._setUserActionID();
    if (!uri || parsedURI.isEmpty()) {
      FBLogger("async_request").mustfix("URI cannot be empty");
      return this;
    }
    this.uri = ZeroRewrites.rewriteURI(parsedURI);
    return this;
  }

  getURI() {
    return this.uri.toString();
  }

  delayPreDisplayJS(delay = true) {
    this._delayPreDisplayJS = delay;
    return this;
  }

  setInitialHandler(handler) {
    this.initialHandler = handler;
    return this;
  }

  setPayloadHandler(handler) {
    this.setHandler((response) => handler(response.payload));
    return this;
  }

  setHandler(handler) {
    if (this._validateHandler(handler)) {
      this.handler = handler;
    }
    return this;
  }

  setFlushedResponseHandler(handler) {
    if (this._validateHandler(handler)) {
      this.flushedResponseHandler = handler;
    }
    return this;
  }

  getHandler() {
    return this.handler || emptyFunction;
  }

  setProgressHandler(handler) {
    if (this._validateHandler(handler)) {
      this.progressHandler = handler;
    }
    return this;
  }

  setUploadProgressHandler(handler) {
    if (this._validateHandler(handler)) {
      this.uploadProgressHandler = handler;
    }
    return this;
  }

  setErrorHandler(handler) {
    if (this._validateHandler(handler)) {
      this.errorHandler = handler;
    }
    return this;
  }

  setTransportErrorHandler(handler) {
    this.transportErrorHandler = handler;
    return this;
  }

  getErrorHandler() {
    return this.errorHandler || emptyFunction;
  }

  getTransportErrorHandler() {
    return this.transportErrorHandler || emptyFunction;
  }

  setTimeoutHandler(timeout, handler) {
    if (this._validateHandler(handler)) {
      this.timeout = timeout;
      this.timeoutHandler = handler;
    }
    return this;
  }

  resetTimeout(timeout) {
    if (this.timeoutHandler === null) return this;
    if (timeout === null) {
      this.timeout = null;
      clearTimeout(this.timer);
      this.timer = null;
    } else {
      this.timeout = timeout;
      clearTimeout(this.timer);
      this.timer = this._allowCrossPageTransition
        ? setTimeoutAcrossTransitions(
            this._handleTimeout.bind(this),
            this.timeout
          )
        : setTimeout(this._handleTimeout.bind(this), this.timeout);
    }
    return this;
  }

  setNewSerial() {
    this.id = ++lastId;
    return this;
  }

  setInterceptHandler(handler) {
    this.interceptHandler = handler;
    return this;
  }

  setFinallyHandler(handler) {
    this.finallyHandler = handler;
    return this;
  }

  setAbortHandler(handler) {
    this.abortHandler = handler;
    return this;
  }

  getServerDialogCancelHandler() {
    return this.serverDialogCancelHandler;
  }

  setServerDialogCancelHandler(handler) {
    this.serverDialogCancelHandler = handler;
    return this;
  }

  setPreBootloadHandler(handler) {
    this.preBootloadHandler = handler;
    return this;
  }

  setReadOnly(readOnly) {
    if (typeof readOnly === "boolean") {
      this.readOnly = readOnly;
    }
    return this;
  }

  getReadOnly() {
    return this.readOnly;
  }

  setRelativeTo(element) {
    this.relativeTo = element;
    return this;
  }

  getRelativeTo() {
    return this.relativeTo;
  }

  setStatusClass(statusClass) {
    this.statusClass = statusClass;
    return this;
  }

  setStatusElement(element) {
    this.statusElement = element;
    return this;
  }

  getStatusElement() {
    return ge(this.statusElement);
  }

  _isRelevant() {
    return this._allowCrossPageTransition ? true : this.id > lastId;
  }

  clearStatusIndicator() {
    const statusElement = this.getStatusElement();
    if (statusElement) {
      CSS.removeClass(statusElement, "async_saving");
      CSS.removeClass(statusElement, this.statusClass);
    }
  }

  _addStatusIndicator() {
    const statusElement = this.getStatusElement();
    if (statusElement) {
      CSS.addClass(statusElement, "async_saving");
      CSS.addClass(statusElement, this.statusClass);
    }
  }

  specifiesWriteRequiredParams() {
    return this.writeRequiredParams.every((param) => {
      this.data[param] =
        this.data[param] || Env[param] || (ge(param) || {}).value;
      return this.data[param] !== undefined;
    });
  }

  setOption(option, value) {
    if (typeof this.option[option] !== "undefined") {
      this.option[option] = value;
    }
    return this;
  }

  getOption(option) {
    if (typeof this.option[option] === "undefined") {
      return this.option[option];
    }
    return this.option[option];
  }

  abort() {
    this.continuation.last(() => {
      const transport = this.transport;
      if (transport) {
        const originalTransportErrorHandler = this.getTransportErrorHandler();
        this.setOption("suppressErrorAlerts", true);
        this.setTransportErrorHandler(emptyFunction);
        this._requestAborted = true;
        transport.abort();
        this.setTransportErrorHandler(originalTransportErrorHandler);
      }
      this.abortHandler();
      AsyncMultiplex.unschedule(this);
    });
  }

  abandon() {
    this.continuation.last(() => {
      clearTimeout(this.timer);
      this.setOption("suppressErrorAlerts", true)
        .setHandler(emptyFunction)
        .setErrorHandler(emptyFunction)
        .setTransportErrorHandler(emptyFunction)
        .setProgressHandler(emptyFunction)
        .setUploadProgressHandler(emptyFunction);
      const transport = this.transport;
      if (transport) {
        this._requestAborted = true;
        if ("onprogress" in transport) delete transport.onprogress;
        if ("upload" in transport && "onprogress" in transport.upload)
          delete transport.upload.onprogress;
        transport.abort();
      }
      this.abortHandler();
      AsyncMultiplex.unschedule(this);
    });
  }

  setNectarModuleDataSafe(data) {
    const setNectarModuleData = this.setNectarModuleData;
    if (setNectarModuleData) {
      setNectarModuleData.call(this, data);
    }
    return this;
  }

  setAllowCrossPageTransition(allow) {
    this._allowCrossPageTransition = !!allow;
    if (this.timer) {
      this.resetTimeout(this.timeout);
    }
    return this;
  }

  getAllowIrrelevantRequests() {
    return this._allowIrrelevantRequests;
  }

  setAllowIrrelevantRequests(allow) {
    this._allowIrrelevantRequests = allow;
    return this;
  }

  setAllowCrossOrigin(allow) {
    this._allowCrossOrigin = allow;
    return this;
  }

  setAllowCredentials(allow) {
    this._allowCredentials = allow;
    return this;
  }

  setIsBackgroundRequest(isBackground) {
    this._isBackgroundRequest = isBackground;
    return this;
  }

  setReplaceTransportMarkers(replace = true) {
    this._shouldReplaceTransportMarkers = replace;
    return this;
  }

  sendAndReturnAbortHandler() {
    this.send();
    return () => this.abort();
  }

  // eslint-disable-next-line complexity
  send(retry = false) {
    if (!this.uri) return false;
    if (!this.errorHandler && !this.getOption("suppressErrorHandlerWarning"))
      return false;
    if (
      (this.getOption("useIframeTransport") ||
        this.getOption("useFetchWithIframeFallback")) &&
      this.method !== "GET"
    ) {
      this.setMethod("GET");
    }
    if (
      this.timeoutHandler !== null &&
      (this.getOption("useIframeTransport") ||
        this.getOption("useFetchWithIframeFallback"))
    )
      return false;
    if (
      !this.getReadOnly() &&
      (this.method !== "POST" || !this.specifiesWriteRequiredParams())
    )
      return false;
    if (document.location.search.toString().includes(this.uri.toString()))
      return false;
    if (
      this.uri.toString().includes("/../") ||
      this.uri.toString().includes("\\../") ||
      this.uri.toString().includes("/..\\") ||
      this.uri.toString().includes("\\..\\")
    )
      return false;
    Object.assign(this.data, getAsyncParams(this.method));
    if (!isEmpty(this.context)) {
      Object.assign(this.data, this.context);
      this.data.ajax_log = 1;
    }
    if (Env.force_param) {
      Object.assign(this.data, Env.force_param);
    }
    this._setUserActionID();
    if (this.getOption("bundle") && this._isMultiplexable()) {
      AsyncMultiplex.schedule(this);
      return true;
    }
    this.setNewSerial();
    if (!this.getOption("asynchronous_DEPRECATED")) {
      this.uri.addQueryData({ __sjax: 1 });
    }
    Arbiter.inform("AsyncRequest/send", {
      request: this,
      ts: performanceAbsoluteNow(),
    });
    let url;
    let postData;
    if (this.method === "GET" || this.rawData) {
      url = this.uri.addQueryData(this.data).toString();
      postData = this.rawData || "";
    } else {
      if (this._allowCrossOrigin) {
        this.uri.addQueryData({ __a: 1 });
      }
      url = this.uri.toString();
      postData = PHPQuerySerializer.serialize(this.data);
    }
    if (this.transport) return false;
    if (this.getOption("useFetchWithIframeFallback")) {
      try {
        const transport = new FetchStreamTransport(this.uri);
        this._setJSONPTransport(transport);
        this._markRequestSent();
        transport.send();
        this.setOption("useIframeTransport", false);
        return true;
      } catch (error) {
        this.setOption("useFetchWithIframeFallback", false);
        this.setOption("useIframeTransport", true);
      }
    }
    if (this.getOption("useIframeTransport")) {
      import("JSONPTransport").then((module) => {
        // eslint-disable-next-line new-cap
        const transport = new module.default(this.uri);
        this._setJSONPTransport(transport);
        this._markRequestSent();
        transport.send();
      });
      return true;
    }
    if (this.flushedResponseHandler) {
      this.flushedResponseTextParseIndex = 0;
    }
    let transport;
    try {
      transport = ZeroRewrites.getTransportBuilderForURI(this.uri)();
    } catch (error) {
      throw unrecoverableViolation(
        error.message,
        "comet_infra",
        {},
        { blameToPreviousFrame: 1 }
      );
    }
    if (!transport) return false;
    this.schedule("AsyncRequest.send");
    transport.onreadystatechange = () => {
      const currentTransport = this.transport;
      if (
        currentTransport &&
        currentTransport.readyState >= 2 &&
        currentTransport.readyState <= 3
      ) {
        this._handleFlushedResponse();
      }
      if (transport.readyState === 4) {
        this.continuation.last(this._onStateChange);
      }
    };
    if (this.progressHandler && "onprogress" in transport) {
      transport.onprogress = (...args) => {
        this.continuation(() => {
          if (this.progressHandler) {
            this.progressHandler(...args);
          }
        });
      };
    }
    if (
      this.uploadProgressHandler &&
      "upload" in transport &&
      "onprogress" in transport.upload
    ) {
      transport.upload.onprogress = (...args) => {
        this.continuation(() => {
          if (this.uploadProgressHandler) {
            this.uploadProgressHandler(...args);
          }
        });
      };
    }
    if (!retry) {
      this.remainingRetries = this.getOption("retries");
    }
    this.transport = transport;
    try {
      transport.open(
        this.method,
        url,
        gkx("25571") ? true : this.getOption("asynchronous_DEPRECATED")
      );
    } catch (error) {
      return false;
    }
    if (
      !this.uri.isSameOrigin() &&
      !uriIsRelativePath(this.uri) &&
      !this.getOption("useIframeTransport") &&
      !this.getOption("useFetchWithIframeFallback")
    ) {
      if (!("withCredentials" in transport)) return false;
      if (this._canSendCredentials()) transport.withCredentials = true;
    }
    if (this.method === "POST" && !this.rawData) {
      transport.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
    }
    if (this._isBackgroundRequest) {
      transport.setRequestHeader("X-FB-BACKGROUND-STATE", "1");
    }
    const asyncHeaders = getAsyncHeaders(this.uri);
    Object.keys(asyncHeaders).forEach((header) => {
      if (transport) transport.setRequestHeader(header, asyncHeaders[header]);
    });
    Arbiter.inform("AsyncRequest/will_send", { request: this });
    if (transport) {
      Object.keys(this.headers).forEach((header) => {
        if (Object.prototype.hasOwnProperty.call(this.headers, header)) {
          transport.setRequestHeader(header, this.headers[header]);
        }
      });
    }
    this._addStatusIndicator();
    this._markRequestSent();
    transport.send(postData);
    if (this.timeout !== null) {
      this.resetTimeout(this.timeout);
    }
    inflightCount++;
    return true;
  }

  schedule(name) {
    this.continuation = TimeSlice.getReusableContinuation(name);
  }

  _canSendCredentials() {
    if (this._allowCredentials === false) return false;
    const parsedURI = new URI(this.uri);
    return (
      isBulletinDotComURI(parsedURI) ||
      isFacebookURI(parsedURI) ||
      isInternalFBURI(parsedURI) ||
      isMessengerDotComURI(parsedURI) ||
      isWorkplaceDotComURI(parsedURI) ||
      isWorkroomsDotComURI(parsedURI) ||
      isWorkDotMetaDotComURI(parsedURI) ||
      isHorizonDotMetaDotComURI(parsedURI) ||
      isSparkDotMetaDotComURI(parsedURI)
    );
  }

  _markRequestSent() {
    const qualifiedURI = new URI(this.getURI()).getQualifiedURI().toString();
    ResourceTimingsStore.updateURI(
      ResourceTypes.XHR,
      this.resourceTimingStoreUID,
      qualifiedURI
    );
    ResourceTimingsStore.annotate(
      ResourceTypes.XHR,
      this.resourceTimingStoreUID
    ).addStringAnnotation("uri", qualifiedURI);
    ResourceTimingsStore.measureRequestSent(
      ResourceTypes.XHR,
      this.resourceTimingStoreUID
    );
  }

  _validateHandler(handler) {
    const isValid = !handler || typeof handler === "function";
    if (!isValid) {
      FBLogger("asyncresponse").mustfix(
        "AsyncRequest response handlers must be functions. Pass a function, or use bind() to build one."
      );
    }
    return isValid;
  }

  _dispatchErrorResponse(asyncResponse, errorHandler) {
    const error = asyncResponse.getError();
    this.clearStatusIndicator();
    if (!this._isRelevant() || error === RESPONSE_CODES.TIMEOUT_ERROR) {
      this.abort();
      return;
    }
    if (this._isServerDialogErrorCode(error)) {
      const isPermanentError = error === 1357008 || error === 1357007;
      this.interceptHandler(asyncResponse);
      if (error === 1357041) {
        this._solveQuicksandChallenge(asyncResponse);
      } else if (error === 1357007) {
        this._displayServerDialog(asyncResponse, isPermanentError, true);
      } else {
        this._displayServerDialog(asyncResponse, isPermanentError);
      }
    } else if (this.initialHandler(asyncResponse) !== false) {
      clearTimeout(this.timer);
      try {
        errorHandler(asyncResponse);
      } catch (error) {
        this.finallyHandler(asyncResponse);
        throw error;
      }
      this.finallyHandler(asyncResponse);
    }
  }

  _onStateChange() {
    const transport = this.transport;
    if (!transport) return;
    try {
      inflightCount--;
      ResourceTimingsStore.measureResponseReceived(
        ResourceTypes.XHR,
        this.resourceTimingStoreUID
      );
      try {
        const debugHeader = transport.getResponseHeader("X-FB-Debug");
        if (debugHeader) {
          this._xFbServer = debugHeader;
          FBError.ErrorXFBDebug.add(this._xFbServer);
        }
      } catch (error) {}
      if (transport.status >= 200 && transport.status < 300) {
        lastSuccessTime = Date.now();
        this._handleXHRResponse(transport);
      } else if (
        UserAgent_DEPRECATED.webkit() &&
        typeof transport.status === "undefined"
      ) {
        this._invokeErrorHandler(RESPONSE_CODES.CLIENT_ERROR);
      } else if (
        AsyncRequestConfig.retryOnNetworkError &&
        this._isNetworkError(transport) &&
        this.remainingRetries > 0 &&
        !this._requestTimeout
      ) {
        this.remainingRetries--;
        delete this.transport;
        this.send(true);
        return;
      } else {
        this._invokeErrorHandler();
      }
      if (this.getOption("asynchronous_DEPRECATED") !== false) {
        delete this.transport;
      }
    } catch (error) {
      if (pageTransitionInProgress) return;
      delete this.transport;
      if (this.remainingRetries > 0) {
        this.remainingRetries--;
        this.send(true);
      } else {
        if (!this.getOption("suppressErrorAlerts")) {
          FBLogger("AsyncRequest")
            .catching(error)
            .mustfix(
              "AsyncRequest exception when attempting to handle a state change"
            );
        }
        this._invokeErrorHandler(RESPONSE_CODES.SERVER_ERROR);
      }
    }
  }

  _handleTimeout() {
    this.continuation.last(() => {
      this._requestTimeout = true;
      const timeoutHandler = this.timeoutHandler;
      this.abandon();
      if (timeoutHandler) timeoutHandler(this);
      setTimeout(() => {
        Arbiter.inform("AsyncRequest/timeout", { request: this });
      }, 0);
    });
  }

  _dispatchResponse(asyncResponse) {
    this.clearStatusIndicator();
    if (!this._isRelevant()) {
      this._invokeErrorHandler(RESPONSE_CODES.TIMEOUT_ERROR);
      return;
    }
    if (this.initialHandler(asyncResponse) === false) return;
    clearTimeout(this.timer);
    let suppressJS;
    const handler = this.getHandler();
    if (handler) {
      try {
        suppressJS = this._shouldSuppressJS(handler(asyncResponse));
      } catch (error) {
        if (asyncResponse.is_last) this.finallyHandler(asyncResponse);
        throw error;
      }
    }
    if (!suppressJS) this._handleJSResponse(asyncResponse);
    if (asyncResponse.is_last) this.finallyHandler(asyncResponse);
  }

  _shouldSuppressJS(result) {
    return result === AsyncRequest.suppressOnloadToken;
  }

  _handlePreDisplayServerJS(serverJS, payload) {
    let isDisplayStarted = false;
    const promises = [];
    const registerToBlockDisplayUntilDone = () => {
      if (isDisplayStarted) {
        FBLogger("AsyncResponse").warn(
          "registerToBlockDisplayUntilDone_DONOTUSE called after AsyncResponse display started. This is a no-op."
        );
        return () => {};
      }
      const deferred = new Deferred();
      promises.push(deferred.getPromise());
      return TimeSlice.guard(
        () => {
          if (deferred) {
            clearTimeout(deferred);
            deferred.resolve();
          }
        },
        "AsyncRequestDisplayBlockingEvent",
        { propagationType: TimeSlice.PropagationType.EXECUTION }
      );
    };
    serverJS.handle(payload, {
      bigPipeContext: {
        registerToBlockDisplayUntilDone_DONOTUSE:
          registerToBlockDisplayUntilDone,
      },
    });
    isDisplayStarted = true;
    return promises;
  }

  _hasEvalDomOp(domOps) {
    return domOps && domOps.length
      ? domOps.some((domOp) => domOp[0] === "eval")
      : false;
  }

  _handleJSResponse(asyncResponse) {
    const relativeTo = this.getRelativeTo();
    const {
      domops,
      dtsgToken,
      dtsgAsyncGetToken,
      jsmods,
      savedServerJSInstance,
    } = asyncResponse;
    let serverJSInstance = savedServerJSInstance;
    if (!serverJSInstance || !(serverJSInstance instanceof ServerJS)) {
      serverJSInstance = new ServerJS();
    }
    serverJSInstance.setRelativeTo(relativeTo);
    if (jsmods) {
      const jsmodsSubset = {
        define: jsmods.define,
        instances: jsmods.instances,
        markup: jsmods.markup,
      };
      delete jsmods.define;
      delete jsmods.instances;
      delete jsmods.markup;
      if (this._hasEvalDomOp(domops)) {
        jsmodsSubset.elements = jsmods.elements;
        delete jsmods.elements;
      }
      serverJSInstance.handle(jsmodsSubset);
    }
    const requestURI = new URI(this.uri);
    if (
      (!requestURI.getDomain() && !requestURI.getProtocol()) ||
      document.location.origin === requestURI.getOrigin()
    ) {
      if (dtsgToken) DTSG.setToken(dtsgToken);
      if (dtsgAsyncGetToken) DTSG_ASYNC.setToken(dtsgAsyncGetToken);
    }
    if (domops) {
      ErrorGuard.applyWithGuard(
        () => AsyncDOM.invoke(domops, relativeTo),
        null,
        [],
        { errorType: "warn" }
      );
    }
    if (jsmods) serverJSInstance.handle(jsmods);
    this._handleJSRegisters(asyncResponse, "onload");
    this._handleJSRegisters(asyncResponse, "onafterload");
  }

  _handleJSRegisters(asyncResponse, registerType) {
    const registers = asyncResponse[registerType];
    if (registers) {
      for (const register of registers) {
        let caller = null;
        let code = register;
        const matches = register.match(/^"caller:([^"]+?)";(.*)/);
        if (matches !== null) {
          caller = matches[1];
          code = matches[2];
        }
        // eslint-disable-next-line no-new-func
        ErrorGuard.applyWithGuard(new Function(code), this, []);
        FBLogger("comet_infra").info(
          "Detected dynamic new Function(...) call in AsyncRequest._handleJSRegisters(...).",
          new URI(this.uri).getPath(),
          caller
        );
      }
    }
  }

  // eslint-disable-next-line complexity
  invokeResponseHandler(response) {
    if (response.redirect !== undefined) {
      setTimeout(() => {
        this.setURI(response.redirect, true).send();
      }, 0);
      return;
    }
    if (response.bootloadOnly !== undefined) {
      const bootloadOnlyData =
        typeof response.bootloadOnly === "string"
          ? JSON.parse(response.bootloadOnly)
          : response.bootloadOnly;
      for (const data of bootloadOnlyData) {
        TimeSlice.guard(
          () => Bootloader.loadPredictedResourceMap(data),
          "Bootloader.loadPredictedResourceMap",
          { root: true }
        )();
      }
      return;
    }
    if (
      !this.handler &&
      !this.errorHandler &&
      !this.transportErrorHandler &&
      !this.preBootloadHandler &&
      this.initialHandler === emptyFunction &&
      this.finallyHandler === emptyFunction
    )
      return;
    const asyncResponse = response.asyncResponse;
    if (asyncResponse !== undefined) {
      if (!this._isRelevant()) {
        this._invokeErrorHandler(RESPONSE_CODES.TIMEOUT_ERROR);
        return;
      }
      if (asyncResponse.updateScriptPath) {
        ScriptPath.set(
          asyncResponse.updateScriptPath.path,
          asyncResponse.updateScriptPath.token,
          asyncResponse.updateScriptPath.extra_info
        );
      }
      if (asyncResponse.lid) {
        this._responseTime = Date.now();
        this.lid = asyncResponse.lid;
      }
      HasteResponse.handleSRPayload(asyncResponse.hsrp || {});
      let responseHandler;
      let errorHandler;
      let event;
      if (asyncResponse.getError() && !asyncResponse.getErrorIsWarning()) {
        responseHandler = this.getErrorHandler().bind(this);
        errorHandler = ErrorGuard.guard(this._dispatchErrorResponse, {
          name: `AsyncRequest#_dispatchErrorResponse for ${this.getURI()}`,
        });
        errorHandler = errorHandler.bind(this, asyncResponse, responseHandler);
        event = "error";
      } else {
        responseHandler = ErrorGuard.guard(this._dispatchResponse.bind(this), {
          name: `AsyncRequest#_dispatchResponse for ${this.getURI()}`,
        });
        responseHandler = responseHandler.bind(this, asyncResponse);
        event = "response";
        const domOps = asyncResponse.domops;
        if (
          !this._delayPreDisplayJS &&
          asyncResponse.jsmods &&
          asyncResponse.jsmods.pre_display_requires &&
          !this._hasEvalDomOp(domOps)
        ) {
          const jsmods = asyncResponse.jsmods;
          const jsmodsSubset = {
            define: jsmods.define,
            instances: jsmods.instances,
            markup: jsmods.markup,
          };
          delete jsmods.define;
          delete jsmods.instances;
          delete jsmods.markup;
          jsmodsSubset.pre_display_requires = jsmods.pre_display_requires;
          delete jsmods.pre_display_requires;
          const serverJS = new ServerJS();
          serverJS.setRelativeTo(this.getRelativeTo());
          asyncResponse.savedServerJSInstance = serverJS;
          const preDisplayPromises = this._handlePreDisplayServerJS(
            serverJS,
            jsmodsSubset
          );
          if (preDisplayPromises && preDisplayPromises.length) {
            const originalResponseHandler = responseHandler;
            responseHandler = () => {
              promiseDone(
                Promise.all(preDisplayPromises).then(originalResponseHandler)
              );
            };
          }
        }
      }
      const requestTime = performanceAbsoluteNow();
      responseHandler = executeAfter(responseHandler, () => {
        Arbiter.inform(`AsyncRequest/${event}`, {
          request: this,
          response: asyncResponse,
          ts: requestTime,
        });
      });
      if (this.preBootloadHandler) this.preBootloadHandler(asyncResponse);
      Bootloader.loadResources(asyncResponse.allResources || [], {
        onAll: AsyncRequestConfig.immediateDispatch
          ? responseHandler
          : () => {
              setTimeout(responseHandler, 0);
            },
      });
    } else if (response.transportError !== undefined) {
      if (this._xFbServer) {
        this._invokeErrorHandler(RESPONSE_CODES.CLIENT_ERROR);
      } else {
        this._invokeErrorHandler(RESPONSE_CODES.SERVER_ERROR);
      }
    } else {
      this._invokeErrorHandler(RESPONSE_CODES.SERVER_ERROR);
    }
  }

  _invokeErrorHandler(errorCode = RESPONSE_CODES.SERVER_ERROR) {
    const transport = this.transport;
    if (!transport) return;
    let error;
    if (this.responseText === "") {
      error = RESPONSE_CODES.CLIENT_ERROR;
    } else if (this._requestAborted) {
      error = RESPONSE_CODES.TIMEOUT_ERROR;
    } else {
      try {
        error = errorCode || transport.status || RESPONSE_CODES.SERVER_ERROR;
      } catch (error) {
        // eslint-disable-next-line no-ex-assign
        error = RESPONSE_CODES.CLIENT_ERROR;
      }
      if (!navigator.onLine) {
        error = RESPONSE_CODES.PROGRESS;
      }
    }
    let errorSummary;
    let errorDescription;
    let silentError = true;
    if (error === RESPONSE_CODES.PROGRESS) {
      errorSummary = fbt._("No Network Connection");
      errorDescription = fbt._(
        "Your browser appears to be offline. Please check your internet connection and try again."
      );
    } else if (error >= 300 && error <= 399) {
      errorSummary = fbt._("Redirection");
      errorDescription = fbt._(
        "Your access to Facebook was redirected or blocked by a third party at this time, please contact your ISP or reload."
      );
      const redirectLocation = transport.getResponseHeader("Location");
      if (redirectLocation) goURI(redirectLocation, true);
      silentError = true;
    } else {
      errorSummary = fbt._("Oops");
      errorDescription = fbt._(
        "Something went wrong. We're working on getting this fixed as soon as we can. You may be able to try again."
      );
    }
    const asyncResponse = new AsyncResponse(this, transport);
    Object.assign(asyncResponse, {
      error,
      errorSummary,
      errorDescription,
      silentError,
    });
    setTimeout(() => {
      Arbiter.inform("AsyncRequest/error", {
        request: this,
        response: asyncResponse,
      });
    }, 0);
    if (pageTransitionInProgress && !this.getOption("handleErrorAfterUnload"))
      return;
    if (!this.transportErrorHandler) {
      FBLogger("asyncresponse").mustfix(
        "Async request to %s failed with a %d error, but there was no error handler available to deal with it.",
        this.getURI(),
        error
      );
      return;
    }
    const errorHandler = this.getTransportErrorHandler().bind(this);
    if (
      !this.getOption("suppressErrorAlerts") ||
      !KNOWN_ERROR_CODES.has(error)
    ) {
      FBLogger("asyncresponse")
        .addToCategoryKey(String(error))
        .mustfix(
          "Async request failed with error %s: %s when requesting %s",
          error,
          errorDescription.toString(),
          this.getURI()
        );
    } else if (KNOWN_ERROR_CODES.has(error)) {
      FBLogger("asyncresponse")
        .addToCategoryKey(String(error))
        .warn(
          "Async request failed with error %s: %s when requesting %s",
          error,
          errorDescription.toString(),
          this.getURI()
        );
    }
    ErrorGuard.applyWithGuard(this._dispatchErrorResponse, this, [
      asyncResponse,
      errorHandler,
    ]);
  }

  _isServerDialogErrorCode(errorCode) {
    return (
      errorCode === 1357008 ||
      errorCode === 1357007 ||
      errorCode === 1357041 ||
      errorCode === 1442002 ||
      errorCode === 1357001
    );
  }

  _solveQuicksandChallenge(asyncResponse) {
    const payload = asyncResponse.getPayload();
    Bootloader.loadModules(
      ["QuickSandSolver"],
      (QuickSandSolver) => {
        QuickSandSolver.solveAndSendRequestBack(this, payload);
      },
      "AsyncRequest"
    );
  }

  _displayServerDialog(
    asyncResponse,
    isPermanentError,
    useMWAReauthBarrier = false
  ) {
    const payload = asyncResponse.getPayload();
    if (payload.__dialog !== undefined) {
      this._displayServerLegacyDialog(asyncResponse, isPermanentError);
      return;
    }
    const dialogX = payload.__dialogx;
    new ServerJS().handle(dialogX);
    if (payload.__should_use_mwa_reauth === true) {
      Bootloader.loadModules(
        ["MWADeveloperReauthBarrier"],
        (MWADeveloperReauthBarrier) => {
          MWADeveloperReauthBarrier.registerRequest(
            payload.__dialogID,
            this,
            asyncResponse
          );
        },
        "AsyncRequest"
      );
      return;
    }
    Bootloader.loadModules(
      ["ConfirmationDialog"],
      (ConfirmationDialog) => {
        ConfirmationDialog.setupConfirmation(
          asyncResponse,
          this,
          useMWAReauthBarrier
        );
      },
      "AsyncRequest"
    );
  }

  _displayServerLegacyDialog(asyncResponse, isPermanentError) {
    const payload = asyncResponse.getPayload().__dialog;
    if (gkx("20935")) {
      let errorCode;
      FBLogger("comet_infra")
        .addMetadata(
          "COMET_INFRA",
          "ERROR_CODE",
          asyncResponse.getError().toString()
        )
        .addMetadata(
          "COMET_INFRA",
          "ERROR_URL",
          (errorCode =
            (errorCode = asyncResponse.request) === null
              ? void 0
              : errorCode.getURI()) !== null
            ? errorCode
            : "unknown"
        )
        .mustfix("AsyncRequest._displayServerLegacyDialog called in Comet");
    }
    Bootloader.loadModules(
      ["Dialog"],
      (Dialog) => {
        const dialog = new Dialog(payload);
        if (isPermanentError) {
          dialog.setHandler(
            this._displayConfirmationHandler.bind(this, dialog)
          );
        }
        dialog
          .setCancelHandler(() => {
            const cancelHandler = this.getServerDialogCancelHandler();
            try {
              if (cancelHandler) cancelHandler(asyncResponse);
              // eslint-disable-next-line no-useless-catch
            } catch (error) {
              throw error;
            } finally {
              this.finallyHandler(asyncResponse);
            }
          })
          .setCausalElement(this.relativeTo)
          .show();
      },
      "AsyncRequest"
    );
  }

  _displayConfirmationHandler(dialog) {
    this.data.confirmed = 1;
    Object.assign(this.data, dialog.getFormData());
    this.send();
  }

  _setJSONPTransport(transport) {
    transport.subscribe("response", this._handleJSONPResponse.bind(this));
    transport.subscribe("abort", this._handleJSONPAbort.bind(this));
    this.transport = transport;
  }

  _handleJSONPResponse(_, response) {
    const transport = this.transport;
    if (!transport) return;
    if (!response.bootloadOnly) {
      this.is_first = this.is_first === undefined;
    }
    const interpretedResponse = this._interpretResponse(response);
    if (interpretedResponse.asyncResponse) {
      interpretedResponse.asyncResponse.is_first = this.is_first;
      interpretedResponse.asyncResponse.is_last = transport.hasFinished();
    }
    this.invokeResponseHandler(interpretedResponse);
    if (transport.hasFinished()) {
      delete this.transport;
    }
  }

  _handleJSONPAbort() {
    this._invokeErrorHandler();
    delete this.transport;
  }

  _handleXHRResponse(transport) {
    let interpretedResponse;
    if (this.getOption("suppressEvaluation")) {
      interpretedResponse = {
        asyncResponse: new AsyncResponse(this, transport),
      };
    } else {
      try {
        this._handleFlushedResponse();
        let responseText = transport.responseText;
        responseText = this._filterOutFlushedText(responseText);
        responseText = this._unshieldResponseText(responseText);
        responseText = JSON.parse(responseText);
        interpretedResponse = this._interpretResponse(responseText);
      } catch (error) {
        interpretedResponse = error.message;
        FBLogger("async_request")
          .catching(error)
          .warn("Failed to handle response");
      }
    }
    this.invokeResponseHandler(interpretedResponse);
  }

  _handleFlushedResponse() {
    const flushedResponseHandler = this.flushedResponseHandler;
    const transport = this.transport;
    if (flushedResponseHandler && transport) {
      const endIndex = transport.responseText.indexOf(
        AsyncRequest.SUPPRESS_ONLOAD_TOKEN
      );
      const parseIndex =
        endIndex === -1 ? transport.responseText.length : endIndex;
      flushedResponseHandler(
        transport.responseText.substring(
          this.flushedResponseTextParseIndex,
          parseIndex
        )
      );
      this.flushedResponseTextParseIndex = parseIndex;
    }
  }

  _unshieldResponseText(responseText) {
    if (responseText.length <= AsyncRequest.SUPPRESS_ONLOAD_TOKEN.length) {
      throw new Error("Response too short on async");
    }
    let startIndex = 0;
    while (
      responseText.charAt(startIndex) === " " ||
      responseText.charAt(startIndex) === "\n"
    ) {
      startIndex++;
    }
    if (
      startIndex &&
      responseText.substring(
        startIndex,
        startIndex + AsyncRequest.SUPPRESS_ONLOAD_TOKEN.length
      ) === AsyncRequest.SUPPRESS_ONLOAD_TOKEN
    ) {
      return responseText.substring(
        startIndex + AsyncRequest.SUPPRESS_ONLOAD_TOKEN.length
      );
    }
    return responseText.substring(
      startIndex + AsyncRequest.SUPPRESS_ONLOAD_TOKEN.length
    );
  }

  _filterOutFlushedText(responseText) {
    if (!this.flushedResponseHandler) return responseText;
    const flushIndex = responseText.indexOf(AsyncRequest.SUPPRESS_ONLOAD_TOKEN);
    return flushIndex < 0 ? responseText : responseText.substr(flushIndex);
  }

  _interpretResponse(response) {
    if (response.redirect) return { redirect: response.redirect };
    if (response.bootloadOnly) return { bootloadOnly: response.bootloadOnly };
    const isServerDialogError =
      response.error && this._isServerDialogErrorCode(response.error);
    if (
      this._shouldReplaceTransportMarkers &&
      response.payload &&
      !isServerDialogError
    ) {
      replaceTransportMarkers(
        { relativeTo: this.getRelativeTo(), bigPipeContext: null },
        response.payload
      );
    }
    const asyncResponse = new AsyncResponse(this);
    if (response.__ar !== 1) {
      FBLogger("AsyncRequest").warn(
        "AsyncRequest to endpoint %s returned a JSON response, but it is not properly formatted. The endpoint needs to provide a response using the AsyncResponse class in PHP.",
        this.getURI()
      );
      asyncResponse.payload = response;
    } else {
      Object.assign(asyncResponse, response);
      const transport = this.transport;
      if (transport && transport.getAllResponseHeaders !== undefined) {
        asyncResponse.responseHeaders = transport.getAllResponseHeaders();
      }
    }
    return { asyncResponse };
  }

  _isNetworkError(transport) {
    return transport.status in { 0: 1, 12029: 1, 12030: 1, 12031: 1, 12152: 1 };
  }

  _isMultiplexable() {
    if (
      this.getOption("useIframeTransport") ||
      this.getOption("useFetchWithIframeFallback")
    ) {
      FBLogger("AsyncRequest").mustfix(
        "You cannot bundle AsyncRequest that uses iframe transport."
      );
      return false;
    }
    if (!isFacebookURI(new URI(this.uri))) {
      FBLogger("AsyncRequest").mustfix(
        "You can not bundle AsyncRequest sent to non-facebook URIs.  Uri: %s",
        this.getURI()
      );
      return false;
    }
    if (!this.getOption("asynchronous_DEPRECATED")) {
      FBLogger("AsyncRequest").mustfix(
        "We cannot bundle synchronous AsyncRequests"
      );
      return false;
    }
    return true;
  }

  handleResponse(response) {
    const interpretedResponse = this._interpretResponse(response);
    this.invokeResponseHandler(interpretedResponse);
  }

  promisePayload() {
    return this.exec().then(
      (response) => response.payload,
      (error) => {
        throw error.toError();
      }
    );
  }

  exec(retry) {
    if (
      this.getHandler() !== emptyFunction ||
      this.getErrorHandler() !== AsyncResponse.defaultErrorHandler
    ) {
      throw new Error(
        "exec is an async function and does not allow previously set handlers"
      );
    }
    return new Promise((resolve, reject) => {
      this.setHandler(resolve).setErrorHandler(reject).send(retry);
    });
  }

  static bootstrap_UNSAFE_LET_ANYONE_IMPERSONATE_THE_USER_FOR_THESE_WRITES(
    uri,
    element,
    isPost
  ) {
    AsyncRequest.bootstrap(uri, element, isPost);
  }

  static post_UNSAFE_LET_ANYONE_IMPERSONATE_THE_USER_FOR_THESE_WRITES(
    uri,
    data
  ) {
    AsyncRequest.post(uri, data);
  }
}

class AsyncMultiplex {
  constructor() {
    this._requests = [];
  }

  add(request) {
    this._requests.push(request);
  }

  remove(request) {
    const index = this._requests.indexOf(request);
    if (index !== -1) {
      if (this._requestsSent) {
        this._requests[index] = null;
      } else {
        this._requests.splice(index, 1);
      }
    }
  }

  send() {
    if (this._requestsSent) invariant(0, 4390);
    this._requestsSent = true;
    this._wrapperRequest = null;
    if (!this._requests.length) return;
    let request;
    if (this._requests.length === 1) {
      request = this._requests[0];
    } else {
      const requestData = this._requests
        .filter(Boolean)
        .map((req) => [
          req.uri.getPath(),
          PHPQuerySerializer.serialize(req.data),
        ]);
      request = this._wrapperRequest = new AsyncRequest("/ajax/proxy.php")
        .setAllowCrossPageTransition(true)
        .setData({ data: requestData })
        .setHandler(this._handler.bind(this))
        .setTransportErrorHandler(this._transportErrorHandler.bind(this));
    }
    if (request) {
      request.setOption("bundle", false).send();
    }
  }

  _handler(response) {
    const { responses } = response.getPayload();
    if (responses.length !== this._requests.length) return;
    for (let i = 0; i < this._requests.length; i++) {
      const req = this._requests[i];
      if (!req) continue;
      const path = req.uri.getPath();
      if (this._wrapperRequest) req.id = this._wrapperRequest.id;
      if (responses[i][0] !== path) {
        req.continuation.last(() => {
          req.invokeResponseHandler({
            transportError: `Wrong response order in bundled request to ${path}`,
          });
        });
        continue;
      }
      req.continuation.last(() => {
        req.handleResponse(responses[i][1]);
      });
    }
    AsyncMultiplex.instances.splice(AsyncMultiplex.instances.indexOf(this), 1);
  }

  _transportErrorHandler(error) {
    const errorData = { transportError: error.errorDescription };
    const paths = this._requests.filter(Boolean).map((req) => {
      if (this._wrapperRequest) req.id = this._wrapperRequest.id;
      req.invokeResponseHandler(errorData);
      return req.uri.getPath();
    });
  }

  static schedule(request) {
    request.schedule("AsyncMultiplex.schedule");
    if (!AsyncMultiplex.instance) {
      AsyncMultiplex.instance = new AsyncMultiplex();
      AsyncMultiplex.instances.push(AsyncMultiplex.instance);
      TimeSlice.guard(
        () => {
          setTimeoutAcrossTransitions(() => {
            if (AsyncMultiplex.instance) {
              AsyncMultiplex.instance.send();
              AsyncMultiplex.instance = null;
            }
          }, 0);
        },
        "AsyncMultiplex.schedule",
        { propagationType: TimeSlice.PropagationType.ORPHAN }
      )();
    }
    AsyncMultiplex.instance.add(request);
    return AsyncMultiplex.instance;
  }

  static unschedule(request) {
    AsyncMultiplex.instances.forEach((instance) => {
      instance.remove(request);
    });
  }
}

AsyncRequest.AsyncMultiplex = AsyncMultiplex;
export default AsyncRequest;
