/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import AsyncRequestConfig from "AsyncRequestConfig";
import AsyncResponse from "AsyncResponse";
import CSS from "CSS";
import Deferred from "Deferred";
import DTSG from "DTSG";
import DTSG_ASYNC from "DTSG_ASYNC";
import ErrorGuard from "ErrorGuard";
import Event from "Event";
import emptyFunction from "fbjs/lib/emptyFunction";
import invariant from "fbjs/lib/invariant";
import isEmpty from "fbjs/lib/isEmpty";
import fbt from "fbt";
import FetchStreamTransport from "FetchStreamTransport";
import HasteResponse from "HasteResponse";
import Parent from "Parent";
import Promise from "Promise";
import ResourceTimingsStore from "ResourceTimingsStore";
import ResourceTypes from "ResourceTypes";
import ScriptPath from "ScriptPath";
import ServerJS from "ServerJS";
import SessionName from "SessionName";
import {
  bind,
  executeAfter,
  fbError,
  ge,
  getAsyncHeaders,
  getAsyncParams,
  goURI,
  isArDotMetaDotComURI,
  isBulletinDotComURI,
  isHorizonDotMetaDotComURI,
  isMessengerDotComURI,
  isSparkDotMetaDotComURI,
  isWorkDotMetaDotComURI,
  isWorkplaceDotComURI,
  isWorkroomsDotComURI,
  performanceAbsoluteNow,
  replaceTransportMarkers,
  setTimeout,
  setTimeoutAcrossTransitions,
  uriIsRelativePath,
} from "someModule";
import UserAgent_DEPRECATED from "UserAgent_DEPRECATED";
import ZeroRewrites from "ZeroRewrites";

import Arbiter from "./Arbiter";
import AsyncDOM from "./AsyncDOM";
import Bootloader from "./Bootloader";
import Env from "./Env";
import FBLogger from "./FBLogger";
import gkx from "./gkx";
import isFacebookURI from "./isFacebookURI";
import isInternalFBURI from "./isInternalFBURI";
import PHPQuerySerializer from "./PHPQuerySerializer";
import promiseDone from "./promiseDone";
import { onAfterUnload } from "./Run";
import TimeSlice from "./TimeSlice";
import unrecoverableViolation from "./unrecoverableViolation";
import URI from "./URI";

let isPageTransitioning = false;

const REQUEST_ABORT_ERROR = 1010;
const defaultErrorCodes = new Set([500, REQUEST_ABORT_ERROR, 1004, 1006]);

onAfterUnload(() => {
  isPageTransitioning = true;
});

function isPageTransition() {
  return isPageTransitioning;
}

function hasProgressEvent(transport) {
  return "onprogress" in transport;
}

function hasUploadProgressEvent(transport) {
  return "upload" in transport && "onprogress" in transport.upload;
}

function hasCredentials(transport) {
  return "withCredentials" in transport;
}

function isNetworkError(transport) {
  return transport.status in { 0: 1, 12029: 1, 12030: 1, 12031: 1, 12152: 1 };
}

function isFunction(handler) {
  return !handler || typeof handler === "function";
}

const lastId = 2;
let currentId = lastId;
let ignoreUpdate = false;

Arbiter.subscribe("page_transition", (event, data) => {
  !ignoreUpdate ? (currentId = data.id) : (ignoreUpdate = false);
});

const SENTINEL_STRING = "for (;;);";
const SENTINEL_STRING_LENGTH = SENTINEL_STRING.length;
class AsyncRequest {
  static _inflightCount = 0;
  static suppressOnloadToken = {};

  constructor(uri) {
    this._allowIrrelevantRequests = false;
    this._delayPreDisplayJS = false;
    this._shouldReplaceTransportMarkers = false;

    this._dispatchErrorResponse = (asyncResponse, errorHandler) => {
      const errorCode = asyncResponse.getError();
      this.clearStatusIndicator();

      if (!this._isRelevant() || errorCode === REQUEST_ABORT_ERROR) {
        this.abort();
        return;
      }

      if (this._isServerDialogErrorCode(errorCode)) {
        const isRetryable = errorCode === 1357008 || errorCode === 1357007;
        this.interceptHandler(asyncResponse);

        if (errorCode === 1357041) {
          this._solveQuicksandChallenge(asyncResponse);
        } else {
          this._displayServerDialog(
            asyncResponse,
            isRetryable,
            errorCode === 1357007
          );
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
    };
    this._onStateChange = () => {
      const transport = this.transport;
      if (!transport) return;

      try {
        AsyncRequest._inflightCount--;
        ResourceTimingsStore.measureResponseReceived(
          ResourceTypes.XHR,
          this.resourceTimingStoreUID
        );

        try {
          const fbDebugHeader = transport.getResponseHeader("X-FB-Debug");
          if (fbDebugHeader) {
            this._xFbServer = fbDebugHeader;
            fbError.ErrorXFBDebug.add(this._xFbServer);
          }
        } catch (error) {
          // Ignore errors while fetching the X-FB-Debug header
        }

        if (transport.status >= 200 && transport.status < 300) {
          AsyncRequest.lastSuccessTime = Date.now();
          this._handleXHRResponse(transport);
        } else if (
          UserAgent_DEPRECATED.webkit() &&
          typeof transport.status === "undefined"
        ) {
          this._invokeErrorHandler(1002);
        } else if (
          AsyncRequestConfig.retryOnNetworkError &&
          isNetworkError(transport) &&
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
        if (isPageTransition()) return;

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
          this._invokeErrorHandler(1007);
        }
      }
    };
    this._handleTimeout = () => {
      this.continuation.last(() => {
        this._requestTimeout = true;
        const timeoutHandler = this.timeoutHandler;

        this.abandon();

        if (timeoutHandler) {
          timeoutHandler(this);
        }

        setTimeout(() => {
          Arbiter.inform("AsyncRequest/timeout", { request: this });
        }, 0);
      });
    };

    this.continuation = TimeSlice.getPlaceholderReusableContinuation();
    this.transport = null;
    this.method = "POST";
    this.uri = "";
    this.timeout = null;
    this.timer = null;
    this.initialHandler = emptyFunction;
    this.handler = null;
    this.uploadProgressHandler = null;
    this.errorHandler = AsyncResponse.defaultErrorHandler;
    this.transportErrorHandler = null;
    this.timeoutHandler = null;
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
      uri !== null ? uri.toString() : ""
    );
    this.flushedResponseTextParseIndex = 0;
    this.option = {
      asynchronous_DEPRECATED: true,
      suppressErrorHandlerWarning: false,
      suppressEvaluation: false,
      suppressErrorAlerts: false,
      retries: 0,
      bundle: false,
      handleErrorAfterUnload: false,
      useFetchTransport: false,
    };
    this.transportErrorHandler = bind(this, "errorHandler");

    if (uri !== void 0) this.setURI(uri);
    this.setAllowCrossPageTransition(
      AsyncRequestConfig.asyncRequestsSurviveTransitionsDefault || false
    );
  }

  _dispatchResponse(asyncResponse) {
    this.clearStatusIndicator();
    if (!this._isRelevant()) {
      this._invokeErrorHandler(1010);
      return;
    }
    if (this.initialHandler(asyncResponse) === false) return;
    clearTimeout(this.timer);
    let suppressJS;
    const handler = this.getHandler();
    if (handler)
      try {
        suppressJS = this._shouldSuppressJS(handler(asyncResponse));
      } catch (error) {
        asyncResponse.is_last && this.finallyHandler(asyncResponse);
        throw error;
      }
    suppressJS || this._handleJSResponse(asyncResponse);
    asyncResponse.is_last && this.finallyHandler(asyncResponse);
  }

  _shouldSuppressJS(handlerResult) {
    return handlerResult === AsyncRequest.suppressOnloadToken;
  }

  _handlePreDisplayServerJS(serverJS, jsMods) {
    let displayStarted = false;
    const promises = [];
    const registerToBlockDisplay = () => {
      if (displayStarted) {
        FBLogger.FBLogger("AsyncResponse").warn(
          "registerToBlockDisplayUntilDone_DONOTUSE called after AsyncResponse display started. This is a no-op."
        );
        return () => {};
      }
      const deferred = new Deferred();
      promises.push(deferred.getPromise());
      return TimeSlice.guard(
        () => {
          deferred.resolve();
        },
        "AsyncRequestDisplayBlockingEvent",
        { propagationType: TimeSlice.PropagationType.EXECUTION }
      );
    };

    serverJS.handle(jsMods, {
      bigPipeContext: {
        registerToBlockDisplayUntilDone_DONOTUSE: registerToBlockDisplay,
      },
    });

    displayStarted = true;
    return promises;
  }

  _hasEvalDomOp(domops) {
    return domops && domops.length
      ? domops.some((op) => {
          return op[0] === "eval";
        })
      : false;
  }

  _handleJSResponse(asyncResponse) {
    const relativeTo = this.getRelativeTo();
    const { domops, dtsgToken, dtsgAsyncGetToken, jsmods } = asyncResponse;
    let serverJS = asyncResponse.savedServerJSInstance;
    if (!serverJS || !(serverJS instanceof ServerJS)) {
      serverJS = new ServerJS();
    }
    serverJS.setRelativeTo(relativeTo);

    if (jsmods) {
      const initialMods = {
        define: jsmods.define,
        instances: jsmods.instances,
        markup: jsmods.markup,
      };
      delete jsmods.define;
      delete jsmods.instances;
      delete jsmods.markup;
      if (this._hasEvalDomOp(domops)) {
        initialMods.elements = jsmods.elements;
        delete jsmods.elements;
      }
      serverJS.handle(initialMods);
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
        () => {
          AsyncDOM.invoke(domops, relativeTo);
        },
        null,
        [],
        { errorType: "warn" }
      );
    }

    if (jsmods) {
      serverJS.handle(jsmods);
    }

    this._handleJSRegisters(asyncResponse, "onload");
    this._handleJSRegisters(asyncResponse, "onafterload");
  }

  _handleJSRegisters(asyncResponse, event) {
    const jsCode = asyncResponse[event];
    if (jsCode) {
      jsCode.forEach((code) => {
        const matchedCode = code.match(/^"caller:([^"]+?)";(.*)/);
        let caller = null;
        if (matchedCode !== null) {
          caller = matchedCode[1];
          code = matchedCode[2];
        }
        // eslint-disable-next-line no-new-func
        ErrorGuard.applyWithGuard(new Function(code), this, []);
        FBLogger("comet_infra").info(
          "Detected dynamic new Function(...) call in AsyncRequest._handleJSRegisters(...).",
          new URI(this.uri).getPath(),
          caller
        );
      });
    }
  }

  // eslint-disable-next-line complexity
  invokeResponseHandler(responseData) {
    if (typeof responseData.redirect !== "undefined") {
      setTimeout(() => {
        this.setURI(responseData.redirect, true).send();
      }, 0);
      return;
    }
    if (responseData.bootloadOnly !== void 0) {
      const bootloadOnlyData =
        typeof responseData.bootloadOnly === "string"
          ? JSON.parse(responseData.bootloadOnly)
          : responseData.bootloadOnly;
      bootloadOnlyData.forEach((resourceMap) => {
        TimeSlice.guard(
          () => {
            Bootloader.loadPredictedResourceMap(resourceMap);
          },
          "Bootloader.loadPredictedResourceMap",
          { root: true }
        )();
      });
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

    const asyncResponse = responseData.asyncResponse;
    if (typeof asyncResponse !== "undefined") {
      if (!this._isRelevant()) {
        this._invokeErrorHandler(1010);
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
      let handleError;
      let responseHandler;

      if (asyncResponse.getError() && !asyncResponse.getErrorIsWarning()) {
        handleError = this.getErrorHandler().bind(this);
        responseHandler = ErrorGuard.guard(this._dispatchErrorResponse, {
          name: "AsyncRequest#_dispatchErrorResponse for " + this.getURI(),
        }).bind(this, asyncResponse, handleError);
      } else {
        responseHandler = ErrorGuard.guard(this._dispatchResponse.bind(this), {
          name: "AsyncRequest#_dispatchResponse for " + this.getURI(),
        }).bind(this, asyncResponse);

        if (
          !this._delayPreDisplayJS &&
          asyncResponse.jsmods &&
          asyncResponse.jsmods.pre_display_requires &&
          !this._hasEvalDomOp(asyncResponse.domops)
        ) {
          const preDisplayJS = {
            define: asyncResponse.jsmods.define,
            instances: asyncResponse.jsmods.instances,
            markup: asyncResponse.jsmods.markup,
            pre_display_requires: asyncResponse.jsmods.pre_display_requires,
          };
          delete asyncResponse.jsmods.define;
          delete asyncResponse.jsmods.instances;
          delete asyncResponse.jsmods.markup;
          delete asyncResponse.jsmods.pre_display_requires;

          const serverJS = new ServerJS();
          serverJS.setRelativeTo(this.getRelativeTo());
          asyncResponse.savedServerJSInstance = serverJS;

          const displayPromises = this._handlePreDisplayServerJS(
            serverJS,
            preDisplayJS
          );
          if (displayPromises && displayPromises.length) {
            const originalHandler = responseHandler;
            responseHandler = () => {
              promiseDone(Promise.all(displayPromises).then(originalHandler));
            };
          }
        }
      }
      const timestamp = performanceAbsoluteNow();
      responseHandler = executeAfter(responseHandler, () => {
        Arbiter.inform(
          "AsyncRequest/" + (asyncResponse.getError() ? "error" : "response"),
          {
            request: this,
            response: asyncResponse,
            ts: timestamp,
          }
        );
      });

      if (this.preBootloadHandler) {
        this.preBootloadHandler(asyncResponse);
      }
      Bootloader.loadResources(asyncResponse.allResources || [], {
        onAll: AsyncRequestConfig.immediateDispatch
          ? responseHandler
          : () => {
              setTimeout(responseHandler, 0);
            },
      });
    } else {
      if (typeof responseData.transportError !== "undefined") {
        this._xFbServer
          ? this._invokeErrorHandler(1008)
          : this._invokeErrorHandler(1012);
      } else {
        this._invokeErrorHandler(1007);
      }
    }
  }

  // eslint-disable-next-line complexity
  _invokeErrorHandler(errorCode) {
    let handler;
    if (!this.transport) return;

    let error;
    if (this.responseText === "") error = 1002;
    else if (this._requestAborted) error = 1011;
    else {
      try {
        error = errorCode || this.transport.status || 1004;
      } catch (ex) {
        error = 1005;
      }
      if (navigator.onLine === false) error = 1006;
    }

    let errorSummary;
    let errorDescription;
    let silentError = true;

    switch (error) {
      case 1006:
        errorSummary = fbt._("__JHASH__zia6hGr6i8P__JHASH__");
        errorDescription = fbt._("__JHASH__PjKFkAw4Nck__JHASH__");
        break;
      case 300:
      case 301:
      case 302:
      case 303:
      case 304:
      case 305:
      case 306:
      case 307:
      case 308:
        errorSummary = fbt._("__JHASH__SUtyZBh0Rzk__JHASH__");
        errorDescription = fbt._("__JHASH__StinKHRkRou__JHASH__");
        // eslint-disable-next-line no-case-declarations
        const locationHeader = this.transport.getResponseHeader("Location");
        if (locationHeader) goURI(locationHeader, true);
        silentError = true;
        break;
      default:
        errorSummary = fbt._("__JHASH__zR4dpqEC6W7__JHASH__");
        errorDescription = fbt._("__JHASH__7UBdKMXdKi6__JHASH__");
        break;
    }

    const asyncResponse = new AsyncResponse(this, this.transport);
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

    if (isPageTransition() && !this.getOption("handleErrorAfterUnload")) return;
    if (!this.transportErrorHandler) {
      FBLogger("asyncresponse").mustfix(
        `Async request to ${this.getURI()} failed with a ${error} error, but there was no error handler available to deal with it.`
      );
      return;
    }

    handler = this.getTransportErrorHandler().bind(this);
    if (
      !(this.getOption("suppressErrorAlerts") || defaultErrorCodes.has(error))
    ) {
      FBLogger("asyncresponse")
        .addToCategoryKey(String(error))
        .mustfix(
          `Async request failed with error ${error}: ${errorDescription.toString()} when requesting ${this.getURI()}`
        );
    } else if (defaultErrorCodes.has(error)) {
      FBLogger("asyncresponse")
        .addToCategoryKey(String(error))
        .warn(
          `Async request failed with error ${error}: ${errorDescription.toString()} when requesting ${this.getURI()}`
        );
    }

    ErrorGuard.applyWithGuard(this._dispatchErrorResponse, this, [
      asyncResponse,
      handler,
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

  _displayServerDialog(asyncResponse, showRetry, isModal) {
    isModal = isModal === void 0 ? false : isModal;
    const payload = asyncResponse.getPayload();
    if (payload.__dialog !== void 0) {
      this._displayServerLegacyDialog(asyncResponse, showRetry);
      return;
    }
    const dialogData = payload.__dialogx;
    new ServerJS().handle(dialogData);
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
        ConfirmationDialog.setupConfirmation(asyncResponse, this, isModal);
      },
      "AsyncRequest"
    );
  }

  _displayServerLegacyDialog(asyncResponse, showRetry) {
    const dialogData = asyncResponse.getPayload().__dialog;
    if (gkx("20935")) {
      FBLogger("comet_infra")
        .addMetadata(
          "COMET_INFRA",
          "ERROR_CODE",
          asyncResponse.getError().toString()
        )
        .addMetadata(
          "COMET_INFRA",
          "ERROR_URL",
          asyncResponse.request?.getURI() || "unknown"
        )
        .mustfix("AsyncRequest._displayServerLegacyDialog called in Comet");
    }
    Bootloader.loadModules(
      ["Dialog"],
      (Dialog) => {
        const dialog = new Dialog(dialogData);
        if (showRetry)
          dialog.setHandler(
            this._displayConfirmationHandler.bind(this, dialog)
          );
        dialog
          .setCancelHandler(() => {
            const cancelHandler = this.getServerDialogCancelHandler();
            try {
              cancelHandler && cancelHandler(asyncResponse);
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

  initializeJSONPTransport = (transport) => {
    transport.subscribe("response", this._handleJSONPResponse.bind(this));
    transport.subscribe("abort", this._handleJSONPAbort.bind(this));
    this.transport = transport;
  };

  _handleJSONPResponse = (transport, response) => {
    const currentTransport = this.transport;
    if (!currentTransport) return;

    if (!response.bootloadOnly) {
      this.isFirstResponse = this.isFirstResponse === undefined;
    }

    const interpretedResponse = this._interpretResponse(response);
    if (interpretedResponse.asyncResponse) {
      interpretedResponse.asyncResponse.isFirstResponse = this.isFirstResponse;
      interpretedResponse.asyncResponse.isLastResponse =
        currentTransport.hasFinished();
    }

    this.invokeResponseHandler(interpretedResponse);
    if (currentTransport.hasFinished()) {
      delete this.transport;
    }
  };

  _handleJSONPAbort = () => {
    this._invokeErrorHandler();
    delete this.transport;
  };

  _handleXHRResponse = (transport) => {
    let response;
    if (this.getOption("suppressEvaluation")) {
      response = { asyncResponse: new AsyncResponse(this, transport) };
    } else {
      try {
        this._handleFlushedResponse();
        let responseText = transport.responseText;
        responseText = this._filterOutFlushedText(responseText);
        responseText = this._unshieldResponseText(responseText);
        responseText = JSON.parse(responseText);
        response = this._interpretResponse(responseText);
      } catch (error) {
        response = error.message;
        FBLogger("async_request")
          .catching(error)
          .warn("Failed to handle response");
      }
    }
    this.invokeResponseHandler(response);
  };

  _handleFlushedResponse = () => {
    const flushedResponseHandler = this.flushedResponseHandler;
    const currentTransport = this.transport;

    if (flushedResponseHandler && currentTransport) {
      let flushIndex = currentTransport.responseText.indexOf(SENTINEL_STRING);
      flushIndex =
        flushIndex === -1 ? currentTransport.responseText.length : flushIndex;
      flushedResponseHandler(
        currentTransport.responseText.substring(
          this.flushedResponseTextParseIndex,
          flushIndex
        )
      );
      this.flushedResponseTextParseIndex = flushIndex;
    }
  };

  _unshieldResponseText = (responseText) => {
    if (responseText.length <= SENTINEL_STRING_LENGTH) {
      throw new Error("Response too short on async");
    }

    let index = 0;
    while (
      responseText.charAt(index) === " " ||
      responseText.charAt(index) === "\n"
    ) {
      index++;
    }

    if (
      index &&
      responseText.substring(index, index + SENTINEL_STRING_LENGTH) ===
        SENTINEL_STRING
    ) {
      return responseText.substring(index + SENTINEL_STRING_LENGTH);
    }

    return responseText.substring(index + SENTINEL_STRING_LENGTH);
  };

  _filterOutFlushedText = (responseText) => {
    if (!this.flushedResponseHandler) return responseText;

    const flushIndex = responseText.indexOf(SENTINEL_STRING);
    return flushIndex < 0 ? responseText : responseText.substr(flushIndex);
  };

  _interpretResponse = (response) => {
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
        `AsyncRequest to endpoint ${this.getURI()} returned a JSON response, but it is not properly formatted. The endpoint needs to provide a response using the AsyncResponse class in PHP.`
      );
      asyncResponse.payload = response;
    } else {
      Object.assign(asyncResponse, response);
      const currentTransport = this.transport;
      if (
        currentTransport &&
        typeof currentTransport.getAllResponseHeaders !== "undefined"
      ) {
        asyncResponse.responseHeaders =
          currentTransport.getAllResponseHeaders();
      }
    }
    return { asyncResponse };
  };

  _isMultiplexable = () => {
    if (this.getOption("useFetchTransport")) {
      FBLogger("AsyncRequest").mustfix(
        "You cannot bundle AsyncRequest that uses iframe transport."
      );
      return false;
    }

    const uri = new URI(this.uri);
    if (!isFacebookURI(uri)) {
      FBLogger("AsyncRequest").mustfix(
        `You cannot bundle AsyncRequest sent to non-facebook URIs. Uri: ${this.getURI()}`
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
  };

  handleResponse = (response) => {
    const interpretedResponse = this._interpretResponse(response);
    this.invokeResponseHandler(interpretedResponse);
  };

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

  setRequestHeader(header, value) {
    this.headers[header] = value;
    return this;
  }

  setRawData(rawData) {
    this.rawData = rawData;
    return this;
  }

  getData() {
    return this.data;
  }

  setContextData(key, value, log = true) {
    if (log) {
      this.context["_log_" + key] = value;
    }
    return this;
  }

  _setUserActionID() {
    this.userActionID = (SessionName.getName() || "-") + "/-";
  }

  setURI(uri, shouldLog = false) {
    if (typeof uri === "string" && uri.match(/^\/?u_\d+_\d+/)) {
      FBLogger("asyncrequest").warn("Invalid URI %s", uri);
    }

    const uriObject = new URI(uri);

    if (this.getOption("useFetchTransport") && !isFacebookURI(uriObject)) {
      if (shouldLog) invariant(0, 45284);
      return this;
    }

    if (
      !this._allowCrossOrigin &&
      !this.getOption("useFetchTransport") &&
      !uriObject.isSameOrigin() &&
      !uriIsRelativePath(uriObject)
    ) {
      if (shouldLog) invariant(0, 45285);
      return this;
    }

    this._setUserActionID();
    if (!uri || uriObject.isEmpty()) {
      FBLogger("async_request").mustfix("URI cannot be empty");
      return this;
    }
    this.uri = ZeroRewrites.rewriteURI(uriObject);
    return this;
  }

  getURI() {
    return this.uri.toString();
  }

  delayPreDisplayJS(shouldDelay = true) {
    this._delayPreDisplayJS = shouldDelay;
    return this;
  }

  setInitialHandler(handler) {
    this.initialHandler = handler;
    return this;
  }

  setPayloadHandler(handler) {
    this.setHandler((response) => {
      handler(response.payload);
    });
    return this;
  }

  setHandler(handler) {
    if (isFunction(handler)) this.handler = handler;
    return this;
  }

  setFlushedResponseHandler(handler) {
    if (isFunction(handler)) this.flushedResponseHandler = handler;
    return this;
  }

  getHandler() {
    return this.handler || emptyFunction;
  }

  setProgressHandler(handler) {
    if (isFunction(handler)) this.progressHandler = handler;
    return this;
  }

  setUploadProgressHandler(handler) {
    if (isFunction(handler)) this.uploadProgressHandler = handler;
    return this;
  }

  setErrorHandler(handler) {
    if (isFunction(handler)) this.errorHandler = handler;
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
    if (isFunction(handler)) {
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
      const isImmediate = !this._allowCrossPageTransition;
      this.timeout = timeout;
      clearTimeout(this.timer);
      if (isImmediate) {
        this.timer = setTimeout(this._handleTimeout, this.timeout);
      } else {
        this.timer = setTimeoutAcrossTransitions(
          this._handleTimeout,
          this.timeout
        );
      }
    }
    return this;
  }

  setNewSerial() {
    this.id = ++currentId;
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

  setReadOnly(isReadOnly) {
    if (typeof isReadOnly === "boolean") {
      this.readOnly = isReadOnly;
    }
    return this;
  }

  getReadOnly() {
    return this.readOnly;
  }

  setRelativeTo(relativeTo) {
    this.relativeTo = relativeTo;
    return this;
  }

  getRelativeTo() {
    return this.relativeTo;
  }

  setStatusClass(statusClass) {
    this.statusClass = statusClass;
    return this;
  }

  setStatusElement(statusElement) {
    this.statusElement = statusElement;
    return this;
  }

  getStatusElement() {
    return ge(this.statusElement);
  }

  _isRelevant() {
    if (this._allowCrossPageTransition) return true;
    return !this.id ? true : this.id > currentId;
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
      return this.data[param] !== void 0 ? true : false;
    });
  }

  setOption(option, value) {
    if (typeof this.option[option] !== "undefined") {
      this.option[option] = value;
    }
    return this;
  }

  getOption(option) {
    return this.option[option];
  }

  abort() {
    this.continuation.last(() => {
      if (this.transport) {
        const currentErrorHandler = this.getTransportErrorHandler();
        this.setOption("suppressErrorAlerts", true);
        this.setTransportErrorHandler(emptyFunction);
        this._requestAborted = true;
        this.transport.abort();
        this.setTransportErrorHandler(currentErrorHandler);
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
      if (this.transport) {
        this._requestAborted = true;
        if (hasProgressEvent(this.transport)) delete this.transport.onprogress;
        if (hasUploadProgressEvent(this.transport))
          delete this.transport.upload.onprogress;
        this.transport.abort();
      }
      this.abortHandler();
      AsyncMultiplex.unschedule(this);
    });
  }

  setNectarModuleDataSafe(nectarData) {
    const setNectarModuleData = this.setNectarModuleData;
    if (setNectarModuleData) {
      setNectarModuleData.call(this, nectarData);
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
  send(isRetry = false) {
    if (!this.uri) return false;

    if (!this.errorHandler && !this.getOption("suppressErrorHandlerWarning")) {
      return false;
    }

    if (this.getOption("useFetchTransport") && this.method !== "GET") {
      this.setMethod("GET");
    }

    if (this.timeoutHandler !== null && this.getOption("useFetchTransport")) {
      return false;
    }

    if (!this.getReadOnly()) {
      if (!this.specifiesWriteRequiredParams() || this.method !== "POST") {
        return false;
      }
    }

    if (document.location.search.includes(this.uri.toString())) {
      return false;
    }

    if (
      this.uri.toString().includes("/../") ||
      this.uri.toString().includes("\\../") ||
      this.uri.toString().includes("/..\\") ||
      this.uri.toString().includes("\\..\\")
    ) {
      return false;
    }

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

    let uriString;
    let postData;

    if (this.method === "GET") {
      this.uri.addQueryData({ fb_dtsg_ag: DTSG_ASYNC.getToken() });
      uriString = this.uri.addQueryData(this.data).toString();
      postData = this.rawData || "";
    } else {
      if (this._allowCrossOrigin) {
        this.uri.addQueryData({ __a: 1 });
      }
      uriString = this.uri.toString();
      postData = PHPQuerySerializer.serialize(this.data);
    }

    if (this.transport) return false;

    if (this.getOption("useFetchTransport")) {
      try {
        const fetchTransport = new FetchStreamTransport(this.uri);
        this._initializeFetchTransport(fetchTransport);
        this._markRequestSent();
        fetchTransport.send();
        return true;
      } catch (error) {
        this.setOption("useFetchTransport", false);
      }
    }

    if (this.flushedResponseHandler) {
      this.flushedResponseTextParseIndex = 0;
    }

    try {
      this.transport = ZeroRewrites.getTransportBuilderForURI(this.uri)();
    } catch (error) {
      throw unrecoverableViolation(
        error.message,
        "comet_infra",
        {},
        { blameToPreviousFrame: 1 }
      );
    }

    if (!this.transport) return false;

    this.schedule("AsyncRequest.send");

    this.transport.onreadystatechange = () => {
      const transport = this.transport;
      if (transport && transport.readyState >= 2 && transport.readyState <= 3) {
        this._handleFlushedResponse();
      }
      if (this.transport.readyState === 4) {
        this.continuation.last(this._onStateChange);
      }
    };

    if (this.progressHandler && hasProgressEvent(this.transport)) {
      this.transport.onprogress = (...args) => {
        this.continuation(() => {
          if (this.progressHandler) {
            this.progressHandler.apply(this, args);
          }
        });
      };
    }

    if (this.uploadProgressHandler && hasUploadProgressEvent(this.transport)) {
      this.transport.upload.onprogress = (...args) => {
        this.continuation(() => {
          if (this.uploadProgressHandler) {
            this.uploadProgressHandler.apply(this, args);
          }
        });
      };
    }

    if (!isRetry) {
      this.remainingRetries = this.getOption("retries");
    }

    try {
      this.transport.open(
        this.method,
        uriString,
        gkx("25571") ? true : this.getOption("asynchronous_DEPRECATED")
      );
    } catch (error) {
      return false;
    }

    if (
      !this.uri.isSameOrigin() &&
      !uriIsRelativePath(this.uri) &&
      !this.getOption("useFetchTransport")
    ) {
      if (!hasCredentials(this.transport)) return false;
      if (this._canSendCredentials()) {
        this.transport.withCredentials = true;
      }
    }

    if (this.method === "POST" && !this.rawData) {
      this.transport.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
    }

    if (
      this.uri.toString().includes("adsmanager") &&
      gkx("1221") &&
      this.method.toLowerCase() === "get"
    ) {
      this.transport.setRequestHeader(
        "x-fb-tenant-routing-control",
        "ads_manager_read_regions"
      );
    }

    if (this._isBackgroundRequest) {
      this.transport.setRequestHeader("X-FB-BACKGROUND-STATE", "1");
    }

    const asyncHeaders = getAsyncHeaders(this.uri);
    Object.keys(asyncHeaders).forEach((header) => {
      this.transport.setRequestHeader(header, asyncHeaders[header]);
    });

    Arbiter.inform("AsyncRequest/will_send", { request: this });

    if (this.transport) {
      for (const header in this.headers) {
        if (Object.prototype.hasOwnProperty.call(this.headers, header)) {
          this.transport.setRequestHeader(header, this.headers[header]);
        }
      }
    }

    this._addStatusIndicator();
    this._markRequestSent();
    this.transport.send(postData);
    if (this.timeout !== null) {
      this.resetTimeout(this.timeout);
    }
    AsyncRequest._inflightCount++;
    return true;
  }

  schedule(eventName) {
    this.continuation = TimeSlice.getReusableContinuation(eventName);
  }

  _canSendCredentials() {
    if (this._allowCredentials === false) return false;
    const uriObject = new URI(this.uri);
    return (
      isBulletinDotComURI(uriObject) ||
      isFacebookURI(uriObject) ||
      isInternalFBURI(uriObject) ||
      isMessengerDotComURI(uriObject) ||
      isWorkplaceDotComURI(uriObject) ||
      isWorkroomsDotComURI(uriObject) ||
      isWorkDotMetaDotComURI(uriObject) ||
      isHorizonDotMetaDotComURI(uriObject) ||
      isSparkDotMetaDotComURI(uriObject) ||
      isArDotMetaDotComURI(uriObject)
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

  promisePayload(isRetry) {
    return this.exec(isRetry).then(
      (response) => response.payload,
      (error) => {
        throw error.toError();
      }
    );
  }

  exec(isRetry) {
    if (
      this.getHandler() !== emptyFunction ||
      this.getErrorHandler() !== AsyncResponse.defaultErrorHandler
    ) {
      throw new Error(
        "exec is an async function and does not allow previously set handlers"
      );
    }
    return new Promise((resolve, reject) => {
      this.setHandler(resolve).setErrorHandler(reject).send(isRetry);
    });
  }

  static bootstrap(uri, element, isPost) {
    let method = "GET";
    let readOnly = true;
    let formData = {};
    if (isPost || (element && element.rel === "async-post")) {
      method = "POST";
      readOnly = false;
      if (uri) {
        uri = new URI(uri);
        formData = uri.getQueryData();
        uri.setQueryData({});
      }
    }

    const statusElement = Parent.byClass(element, "stat_elem") || element;
    if (statusElement && CSS.hasClass(statusElement, "async_saving"))
      return false;

    const request = new AsyncRequest(uri)
      .setReadOnly(readOnly)
      .setMethod(method)
      .setData(formData)
      .setNectarModuleDataSafe(element)
      .setRelativeTo(element);

    if (element) {
      request.setHandler((response) => {
        Event.fire(element, "success", { response });
      });
      request.setErrorHandler((response) => {
        if (Event.fire(element, "error", { response }) !== false) {
          AsyncResponse.defaultErrorHandler(response);
        }
      });
    }

    if (statusElement instanceof HTMLElement) {
      request.setStatusElement(statusElement);
      const statusClass = statusElement.getAttribute("data-status-class");
      if (statusClass) {
        request.setStatusClass(statusClass);
      }
    }

    request.send();
    return false;
  }

  static bootstrap_UNSAFE_LET_ANYONE_IMPERSONATE_THE_USER_FOR_THESE_WRITES(
    uri,
    element,
    isPost
  ) {
    AsyncRequest.bootstrap(uri, element, isPost);
  }

  static post(uri, data) {
    new AsyncRequest(uri)
      .setReadOnly(false)
      .setMethod("POST")
      .setData(data)
      .send();
    return false;
  }

  static post_UNSAFE_LET_ANYONE_IMPERSONATE_THE_USER_FOR_THESE_WRITES(
    uri,
    data
  ) {
    AsyncRequest.post(uri, data);
  }

  static getLastID() {
    return currentId;
  }

  static ignoreUpdate() {
    ignoreUpdate = true;
  }

  static getInflightCount() {
    return this._inflightCount;
  }
}

let activeMultiplex;
let activeMultiplexQueue = [];

class AsyncMultiplex {
  constructor() {
    this._requests = [];
    this._requestsSent = false;
    this._wrapperRequest = null;
  }

  add(request) {
    this._requests.push(request);
  }

  remove(request) {
    const requests = this._requests;
    const requestsSent = this._requestsSent;
    for (let i = 0, len = requests.length; i < len; i++) {
      if (requests[i] === request) {
        if (requestsSent) {
          requests[i] = null;
        } else {
          requests.splice(i, 1);
        }
      }
    }
  }

  send() {
    if (this._requestsSent) invariant(0, 4390);
    this._requestsSent = true;

    const requests = this._requests;
    if (!requests.length) return;

    let multiplexRequest;
    if (requests.length === 1) {
      multiplexRequest = requests[0];
    } else {
      const multiplexData = requests
        .filter(Boolean)
        // eslint-disable-next-line no-return-assign
        .map((req) => [
          req.uri.getPath(),
          PHPQuerySerializer.serialize(req.data),
        ]);

      multiplexRequest = this._wrapperRequest = new AsyncRequest(
        "/ajax/proxy.php"
      )
        .setAllowCrossPageTransition(true)
        .setData({ data: multiplexData })
        .setHandler(this._handler.bind(this))
        .setTransportErrorHandler(this._transportErrorHandler.bind(this));
    }

    if (multiplexRequest) {
      multiplexRequest.setOption("bundle", false).send();
    }
  }

  _handler(asyncResponse) {
    const responses = asyncResponse.getPayload().responses;
    if (responses.length !== this._requests.length) return;

    for (let i = 0; i < this._requests.length; i++) {
      const request = this._requests[i];
      if (!request) continue;

      const requestPath = request.uri.getPath();
      if (this._wrapperRequest) {
        request.id = this._wrapperRequest.id;
      }

      if (responses[i][0] !== requestPath) {
        request.continuation.last(() => {
          request.invokeResponseHandler({
            transportError:
              "Wrong response order in bundled request to " + requestPath,
          });
        });
        continue;
      }

      request.continuation.last(() => {
        request.handleResponse(responses[i][1]);
      });
    }

    activeMultiplexQueue.splice(activeMultiplexQueue.indexOf(this), 1);
  }

  _transportErrorHandler(asyncResponse) {
    const errorDescription = asyncResponse.errorDescription;
    const errorResponse = { transportError: errorDescription };

    this._requests.filter(Boolean).forEach((request) => {
      if (this._wrapperRequest) {
        request.id = this._wrapperRequest.id;
      }
      request.invokeResponseHandler(errorResponse);
    });
  }

  static schedule(request) {
    request.schedule("AsyncMultiplex.schedule");

    if (!activeMultiplex) {
      activeMultiplex = new AsyncMultiplex();
      activeMultiplexQueue.push(activeMultiplex);

      TimeSlice.guard(
        () => {
          setTimeoutAcrossTransitions(() => {
            if (activeMultiplex) {
              activeMultiplex.send();
              activeMultiplex = null;
            }
          }, 0);
        },
        "AsyncMultiplex.schedule",
        { propagationType: TimeSlice.PropagationType.ORPHAN }
      )();
    }

    activeMultiplex.add(request);
    return activeMultiplex;
  }

  static unschedule(request) {
    activeMultiplexQueue.forEach((multiplex) => {
      multiplex.remove(request);
    });
  }
}

AsyncRequest.AsyncMultiplex = AsyncMultiplex;
AsyncRequest.AsyncRequest = AsyncRequest;

export default AsyncRequest;
