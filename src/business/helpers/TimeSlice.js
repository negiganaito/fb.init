/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import performanceNow from "fbjs/lib/performanceNow";
import removeFromArray from "fbjs/lib/removeFromArray";

import Env from "./Env";
import IntervalTrackingBoundedBuffer from "./IntervalTrackingBoundedBuffer";

const DEFAULT_GUARD_NAME = "<anonymous guard>";
let skipGuardGlobal = false;
const TAALOpcode = {
  PREVIOUS_FILE: 1,
  PREVIOUS_FRAME: 2,
  PREVIOUS_DIR: 3,
  FORCED_KEY: 4,
};
const ERROR_TYPES = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5,
};
const metadataBuffer = [];
const guardStack = [];
const RE_EXN_ID = "RE_EXN_ID";

const guardState = {
  pushGuard(guard) {
    guardStack.unshift(guard);
  },
  popGuard() {
    guardStack.shift();
  },
  inGuard() {
    return guardStack.length !== 0;
  },
  cloneGuardList() {
    return guardStack.map((guard) => guard.name);
  },
  findDeferredSource() {
    for (let i = 0; i < guardStack.length; i++) {
      const guard = guardStack[i];
      if (guard.deferredSource !== null) {
        return guard.deferredSource;
      }
    }
    return null;
  },
};

function createError(message, ...params) {
  const error = new Error(message);
  if (error.stack === undefined) {
    try {
      throw error;
    } catch (e) {}
  }
  error.messageFormat = message;
  error.messageParams = params.map(String);
  error.taalOpcodes = [TAALOpcode.PREVIOUS_FRAME];
  return error;
}

function getErrorSafe(error) {
  let safeError = null;
  if (error === null || typeof error !== "object") {
    safeError = createError(`Non-object thrown: ${String(error)}`);
  } else if (Object.prototype.hasOwnProperty.call(error, RE_EXN_ID)) {
    safeError = createError(
      `Rescript exception thrown: ${JSON.stringify(error)}`
    );
  } else if (typeof error.then === "function") {
    safeError = createError(`Promise thrown: ${JSON.stringify(error)}`);
  } else if (typeof error.message !== "string") {
    safeError = createError(
      `Non-error thrown: ${String(error)}, keys: ${JSON.stringify(
        Object.keys(error).sort()
      )}`
    );
  } else if (
    error.messageFormat !== null &&
    typeof error.messageFormat !== "string"
  ) {
    safeError = createError(
      `Error with non-string messageFormat thrown: ${String(
        error.message
      )}, ${String(error)}, keys: ${JSON.stringify(Object.keys(error).sort())}`
    );
  } else if (Object.isExtensible && !Object.isExtensible(error)) {
    safeError = createError(`Non-extensible thrown: ${String(error.message)}`);
  }
  if (safeError !== null) {
    safeError.taalOpcodes = safeError.taalOpcodes || [];
    safeError.taalOpcodes.push(TAALOpcode.PREVIOUS_FRAME);
    return safeError;
  }
  return error;
}

class Metadata {
  constructor() {
    this.metadata = [...metadataBuffer];
  }

  addEntries(...entries) {
    this.metadata.push(...entries);
    return this;
  }

  addEntry(key, value, context) {
    this.metadata.push([key, value, context]);
    return this;
  }

  isEmpty() {
    return this.metadata.length === 0;
  }

  clearEntries() {
    this.metadata = [];
  }

  format() {
    return this.metadata.map((entry) =>
      entry && entry.length
        ? entry
            .map((item) =>
              item !== null ? String(item).replace(/:/g, "_") : ""
            )
            .join(":")
        : null
    );
  }

  getAll() {
    return this.metadata;
  }
}

function aggregateError(targetError, sourceError) {
  if (Object.isFrozen(targetError)) return;
  if (
    sourceError.type &&
    (!targetError.type ||
      ERROR_TYPES[targetError.type] > ERROR_TYPES[sourceError.type])
  ) {
    targetError.type = sourceError.type;
  }
  if (sourceError.metadata !== null) {
    const metadata = targetError.metadata ?? new Metadata();
    metadata.addEntries(...sourceError.metadata.getAll());
    targetError.metadata = metadata;
  }
  if (sourceError.project !== null) {
    targetError.project = sourceError.project;
  }
  if (sourceError.errorName !== null) {
    targetError.errorName = sourceError.errorName;
  }
  if (sourceError.componentStack !== null) {
    targetError.componentStack = sourceError.componentStack;
  }
  if (sourceError.deferredSource !== null) {
    targetError.deferredSource = sourceError.deferredSource;
  }
  if (sourceError.blameModule !== null) {
    targetError.blameModule = sourceError.blameModule;
  }
  if (sourceError.loggingSource !== null) {
    targetError.loggingSource = sourceError.loggingSource;
  }
  if (
    sourceError.messageFormat !== null &&
    sourceError.messageFormat !== targetError.messageFormat
  ) {
    targetError.messageFormat = `${targetError.messageFormat} [Caught in: ${sourceError.messageFormat}]`;
    targetError.messageParams.push(...(sourceError.messageParams ?? []));
  }
  targetError.messageFormat ??= sourceError.messageFormat;
  targetError.messageParams ??= sourceError.messageParams;
  if (sourceError.forcedKey !== null) {
    targetError.forcedKey =
      targetError.forcedKey !== null
        ? `${sourceError.forcedKey}_${targetError.forcedKey}`
        : sourceError.forcedKey;
  }
}

function toReadableMessage(error) {
  return formatMessage(
    error.messageFormat ?? error.message,
    error.messageParams ?? []
  );
}

function formatMessage(format, params) {
  let index = 0;
  return (
    String(format).replace(/%s/g, () =>
      index < params.length ? params[index++] : "NOPARAM"
    ) +
    (index < params.length
      ? ` PARAMS${JSON.stringify(params.slice(index))}`
      : "")
  );
}

function toStringParams(params) {
  return (params ?? []).map(String);
}

const ErrorSerializer = {
  aggregateError,
  toReadableMessage,
  toStringParams,
};

const STACK_TRACE_LINE_PATTERNS = [
  /\(([^\s\)\()]+):(\d+):(\d+)\)$/,
  /@([^\s\)\()]+):(\d+):(\d+)$/,
  /^([^\s\)\()]+):(\d+):(\d+)$/,
  /^at ([^\s\)\()]+):(\d+):(\d+)$/,
];

const HTML_DOC_PATTERN = /^\s*\<!doctype/i;

function parseStackTrace(stack) {
  const lines = stack.trim().split("\n");
  return lines.map(parseStackTraceLine);
}

function parseStackTraceLine(line) {
  const trimmedLine = line.trim();
  if (HTML_DOC_PATTERN.test(trimmedLine)) {
    return { identifier: "<inlined-file>" };
  }
  for (const pattern of STACK_TRACE_LINE_PATTERNS) {
    const match = trimmedLine.match(pattern);
    if (match) {
      return {
        identifier: match[1],
        script: match[1],
        line: parseInt(match[2], 10),
        column: parseInt(match[3], 10),
      };
    }
  }
  return { identifier: trimmedLine };
}

function parseComponentStack(stack) {
  if (!stack) return null;
  const lines = stack.trim().split("\n");
  return lines.map(parseStackTraceLine);
}

const HASH_CHARS = "abcdefghijklmnopqrstuvwxyz012345";

function getSimpleHash(...inputs) {
  let hash = 0;
  for (const input of inputs) {
    if (input !== null) {
      for (const char of String(input)) {
        hash = (hash << 5) - hash + char.charCodeAt(0);
      }
    }
  }
  let hashString = "";
  for (let i = 0; i < 6; i++) {
    hashString = HASH_CHARS.charAt(hash & 31) + hashString;
    hash >>= 5;
  }
  return hashString;
}

function formatStackFrame(frame) {
  let { identifier, script, line, column } = frame;
  let result = `    at ${
    identifier !== null && identifier !== undefined ? identifier : "<unknown>"
  }`;
  if (script !== null && line !== null && column !== null) {
    result += ` (${script}:${line}:${column})`;
  }
  return result;
}

function normalizeError(error) {
  const stackTrace = parseStackTrace(error.stack);
  const normalizedError = {
    name: error.name,
    message: ErrorSerializer.toReadableMessage(error),
    stack: stackTrace.map(formatStackFrame).join("\n"),
    stackFrames: stackTrace,
    metadata: error.metadata?.format() ?? new Metadata().format(),
    messageFormat: error.messageFormat ?? error.message,
    messageParams: error.messageParams ?? [],
    errorName: error.name,
    componentStackFrames: parseComponentStack(error.componentStack),
    loggingSource: error.loggingSource,
    project: error.project,
    type: error.type,
    guardList: error.guardList ?? [],
    script: error.fileName,
    line: error.line,
    column: error.column,
    clientTime: Math.floor(Date.now() / 1000),
    page_time: Math.floor(performanceNow()),
    hash: getSimpleHash(
      error.name,
      error.stack,
      error.type,
      error.project,
      error.loggingSource
    ),
  };
  return normalizedError;
}

function ifNormalizedError(error) {
  return error?.isNormalizedError ? error : null;
}

const ErrorNormalizeUtils = {
  formatStackFrame(stackFrame) {
    const { identifier, script, line, column } = stackFrame;
    let frame = `    at ${identifier ?? "<unknown>"}`;
    if (script && line && column) {
      frame += ` (${script}:${line}:${column})`;
    }
    return frame;
  },
  normalizeError,
  ifNormalizedError,
};

const ERROR_HISTORY_LIMIT = 50;
const errorHistory = [];

const ErrorPubSub = {
  history: errorHistory,
  addListener(listener, retroactive = false) {
    errorHistory.push(listener);
    if (!retroactive) {
      errorHistory.forEach((error) =>
        listener(error, error.loggingSource ?? "DEPRECATED")
      );
    }
  },
  unshiftListener(listener) {
    errorHistory.unshift(listener);
  },
  removeListener(listener) {
    removeFromArray(errorHistory, listener);
  },
  reportError(error) {
    const normalizedError = ErrorNormalizeUtils.normalizeError(error);
    ErrorPubSub.reportNormalizedError(normalizedError);
  },
  reportNormalizedError(error) {
    error.guardList = error.guardList ?? [];
    error.componentStackFrames && error.guardList.unshift("<global.react>");
    ErrorPubSub.history.length > ERROR_HISTORY_LIMIT &&
      ErrorPubSub.history.splice(ERROR_HISTORY_LIMIT / 2, 1);
    ErrorPubSub.history.push(error);
    for (const listener of errorHistory) {
      try {
        listener(error, error.loggingSource ?? "DEPRECATED");
      } catch (e) {}
    }
  },
};

// eslint-disable-next-line max-params
export function applyWithGuard(fn, context, args, guardOptions) {
  guardOptions?.name &&
    (guardOptions.deferredSource = guardOptions.deferredSource ?? {});
  guardOptions.deferredSource = guardOptions.deferredSource ?? {};

  const guard = {
    name: guardOptions?.name ?? fn.name ?? DEFAULT_GUARD_NAME,
    deferredSource: guardOptions?.deferredSource,
  };
  guardState.pushGuard(guard);

  if (skipGuardGlobal) {
    try {
      return fn.apply(context, args);
    } finally {
      guardState.popGuard();
    }
  }

  try {
    return Function.prototype.apply.call(fn, context, args);
  } catch (error) {
    const safeError = getErrorSafe(error);
    ErrorSerializer.aggregateError(safeError, {
      deferredSource: guardOptions?.deferredSource,
      loggingSource: "GUARDED",
      project: guardOptions?.project ?? "ErrorGuard",
      type: guardOptions?.errorType,
    });

    const normalizedError = ErrorNormalizeUtils.normalizeError(safeError);
    guardState.cloneGuardList();
    ErrorPubSub.reportNormalizedError(normalizedError);
  } finally {
    guardState.popGuard();
  }
}

function guard(fn, guardOptions) {
  const guardedFn = (...args) =>
    // eslint-disable-next-line no-invalid-this
    applyWithGuard(fn, this, args, guardOptions);
  if (fn.__SMmeta) {
    guardedFn.__SMmeta = fn.__SMmeta;
  }
  return guardedFn;
}

const bufferSize = Env.timesliceBufferSize ?? 5000;
const buffer = new IntervalTrackingBoundedBuffer(bufferSize);

const TimeSlice = {
  PropagationType: {
    CONTINUATION: 0,
    EXECUTION: 1,
    ORPHAN: 2,
  },
  guard(fn, context) {
    return guard(fn, {
      name: `TimeSlice${context ? `: ${context}` : ""}`,
    });
  },
  copyGuardForWrapper(fn, context) {
    return fn;
  },
  checkCoverage() {},
  setLogging(a, b) {},
  getContext() {
    return null;
  },
  getGuardedContinuation(fn) {
    function continuation(...args) {
      return fn(args);
    }
    return continuation;
  },
  getReusableContinuation(fn) {
    return this.getPlaceholderReusableContinuation();
  },
  getPlaceholderReusableContinuation() {
    const continuation = (fn) => fn();
    continuation.last = continuation;
    return continuation;
  },
  getGuardNameStack() {
    return [];
  },
  registerExecutionContextObserver(observer) {},
  catchUpOnDemandExecutionContextObservers(observer) {},
  getBuffer() {
    return buffer;
  },
};

export default TimeSlice;
